type TypeItGptOptions = {
    // the element that will contain the message
    // default is document.getElementById( 'message-container' ) as HTMLElement
    messageContainer?: HTMLElement | null;

    backgroundColor?: string;

    textColor?: string;

    cursorColor?: string;

    timings: {
        blinkBeforeStart?: number;
        blinkAfterEnd?: number;
        blinkInterval?: number;
        charInterval: number;
        waitLongerInterval: (timeBefore: number) => number;
        spaceInterval: (timeBefore: number) => number;
    }

    cursorWidth: string;

    startEmpty?: boolean;


    waitLongerChar: Array<string>;

    // a callback that is called on every char typed, on false the message will be added directly
    // on true the message will be typed char by char
    shouldType: (message: string) => boolean;

    // a callback that is called when the message is typed
    // this is useful if you want to scroll to the bottom of the message container
    onType?: (oldMessage: string, char: string) => void;


    // a callback that is called when the message is typed
    onEnd?: () => void;

    removeClassAfterEnd?: boolean;
}

export const defaultOptions: TypeItGptOptions = {
    messageContainer: document.getElementById('message-container') as HTMLElement,
    shouldType: (message: string) => !message.includes('<'),
    backgroundColor: '',
    waitLongerChar: [',', '.', '?'],
    textColor: 'white',
    cursorWidth: '0.75rem',
    cursorColor: 'white',
    timings: {
        blinkBeforeStart: 1500,
        blinkAfterEnd: 1500,
        blinkInterval: 500,
        charInterval: 50,
        // @ts-ignore
        waitLongerInterval: (timeBefore) => Math.random() * 50 * timeBefore,

        // @ts-ignore
        spaceInterval: (timeBefore) => Math.random() * 5 * timeBefore,
    },
    startEmpty: true,
    removeClassAfterEnd: false,
};

export class TypeItGpt {
    stopTyping = false;
    options: TypeItGptOptions = defaultOptions;
    private message: string = '';

    constructor(userOptions: {} | TypeItGptOptions = defaultOptions) {
        this.options = { ...defaultOptions, ...userOptions };
        if ("timings" in userOptions) {
            this.options.timings = { ...defaultOptions.timings, ...userOptions.timings };
        }

        if (this.options.messageContainer instanceof HTMLElement) {
            this.setStyles();
        }
    }

    private static insts: Array<TypeItGpt> = [];

    static typeCursor(message: string, userOptions: TypeItGptOptions = defaultOptions,): TypeItGpt {
        TypeItGpt.setStopAllTyping();
        const typeCursor = new TypeItGpt(userOptions);
        typeCursor.typeCursor(message, userOptions.startEmpty, userOptions.onEnd || (() => {
        }));
        TypeItGpt.insts.push(typeCursor);
        return typeCursor;
    }

    static setStopAllTyping() {
        TypeItGpt.insts.forEach(inst => inst.setStopTyping());
        TypeItGpt.insts = [];
    }

    /**
     * Types a message char by char
     *
     * @param message the message to type
     * @param startEmpty if the message should start empty, or append to the previous message
     * @param onEnd a callback that is called when the message is typed
     *
     */
    typeCursor(message: string, startEmpty: boolean = true, onEnd: () => void = () => {
    }) {
        // check if message there is a html string
        this.setBlinking(true);
        this.stopTyping = false;
        if (startEmpty) {
            this.clearMessage();
        }
        if (!this.options.shouldType(message)) {
            setTimeout(() => this.addMessage(message)
                , this.options.timings.blinkBeforeStart || 0);

            this.addMessage(message);
            setTimeout(() => {
                this.setBlinking(false);
                onEnd();
            }, this.options.timings.blinkAfterEnd || 0);
        } else {
            setTimeout(() => {
                if (startEmpty) {
                    this.clearMessage();
                }
                this.setBlinking(true);
                this.stopTyping = false;
                this.recursiveTypeCursor(message, this.options.timings.charInterval, onEnd);
            },
                this.options.timings.blinkBeforeStart || 0);
        }
    }
    clearMessage() {
        this.message = '';
        if (this.options.messageContainer) {
            this.options.messageContainer!.innerHTML = '';
        }
    }

    /**
     * Call this function to write all the message at ones and stop the typing,
     * this is useful if a new message needs to be typed
     */
    setStopTyping() {
        this.stopTyping = true;
    }


    private setStyles() {
        this.options.messageContainer?.style.setProperty('--type-it-gpt-blink-interval', `${this.options.timings.blinkInterval}ms`);
        this.options.messageContainer?.style.setProperty('--type-it-gpt-cursor-width', this.options.cursorWidth);
        this.options.messageContainer?.style.setProperty('--type-it-gpt-cursor-color', this.options.cursorColor!);
        this.options.messageContainer?.style.setProperty('--type-it-gpt-text-color', this.options.textColor!);
        if (this.options.backgroundColor !== '') {
            this.options.messageContainer?.style.setProperty('--type-it-gpt-background-color', this.options.backgroundColor!);
        }
        this.options.messageContainer!.classList.add('type-it-gpt');
    }

    private recursiveTypeCursor(message: string, timeoutOrigin: number = 150, onEnd: () => void = () => {
    }) {
        if (message.length === 0 || this.stopTyping) {
            this.addMessage(message);
            setTimeout(() => {
                this.setBlinking(false);
                onEnd();
                if (this.options.removeClassAfterEnd) {
                    this.options.messageContainer?.classList.remove('type-it-gpt');
                }
            }, this.stopTyping? 0 : this.options.timings.blinkAfterEnd || 0);
            return;
        }
        let timeout = timeoutOrigin;
        // if the first char is a comma, point, or question mark, add a longer timeout
        if (this.options.waitLongerChar?.includes(message[0])) {
            timeout = this.options.timings?.waitLongerInterval(timeoutOrigin);
        }

        if (message[0] === ' ') {
            timeout = this.options.timings?.spaceInterval(timeoutOrigin);
        }

        this.addMessage(message[0]);
        message = message.slice(1);
        if (this.options.onType) {
            this.options.onType(this.message, message[0]);
        }
        setTimeout(() => {
            this.recursiveTypeCursor(message, timeoutOrigin, onEnd);
        }, this.stopTyping ? 1 : timeout);
    }

    private addMessage(message: string): void {
        this.message += message;
        if (!this.options.messageContainer) return;

        this.options.messageContainer.innerHTML += message;
    }

    private setBlinking(blink: boolean) {
        if (!this.options.messageContainer) return;
        this.options.messageContainer.classList[blink ? 'add' : 'remove']('cursor');
    }
}
