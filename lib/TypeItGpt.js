const defaultOptions = {
    messageContainer: document.getElementById('message-container'),
    shouldType: (message) => !message.includes('<'),
    waitLongerChar: [',', '.', '?'],
    timings: {
        charInterval: 50,
        // @ts-ignore
        waitLongerInterval: (timeBefore) => Math.random() * 50 * timeBefore,
        // @ts-ignore
        spaceInterval: (timeBefore) => Math.random() * 5 * timeBefore,
    },
    startEmpty: true,
};
export class TypeItGpt {
    constructor(userOptions = defaultOptions) {
        this.userOptions = userOptions;
        this.stopTyping = false;
        this.options = defaultOptions;
        this.options = Object.assign(Object.assign({}, defaultOptions), userOptions);
        if (!this.options.messageContainer || !(this.options.messageContainer instanceof HTMLElement)) {
            console.warn('messageContainer is not an element');
        }
    }
    static typeCursor(message, userOptions = defaultOptions) {
        const typeCursor = new TypeItGpt(userOptions);
        typeCursor.typeCursor(message, userOptions.startEmpty, userOptions.onEnd || (() => {
        }));
        return typeCursor;
    }
    /**
     * Types a message char by char
     *
     * @param message the message to type
     * @param startEmpty if the message should start empty, or append to the previous message
     * @param onEnd a callback that is called when the message is typed
     *
     */
    typeCursor(message, startEmpty = true, onEnd = () => {
    }) {
        // check if message there is a html string
        this.setBlinking(true);
        this.stopTyping = false;
        if (startEmpty) {
            this.options.messageContainer.innerHTML = '';
        }
        if (!this.options.shouldType(message)) {
            this.addMessage(message);
            onEnd();
        }
        else {
            this.recursiveTypeCursor(message, this.options.timings.charInterval, onEnd);
        }
    }
    /**
     * Call this function to write all the message at ones and stop the typing,
     * this is useful if a new message needs to be typed
     */
    setStopTyping() {
        this.stopTyping = true;
    }
    recursiveTypeCursor(message, timeoutOrigin = 150, onEnd = () => {
    }) {
        var _a, _b, _c;
        if (message.length === 0 || this.stopTyping) {
            this.addMessage(message);
            this.setBlinking(false);
            onEnd();
            return;
        }
        let timeout = timeoutOrigin;
        // if the first char is a comma, point, or question mark, add a longer timeout
        if ((_a = this.options.waitLongerChar) === null || _a === void 0 ? void 0 : _a.includes(message[0])) {
            timeout = (_b = this.options.timings) === null || _b === void 0 ? void 0 : _b.waitLongerInterval(timeoutOrigin);
        }
        if (message[0] === ' ') {
            timeout = (_c = this.options.timings) === null || _c === void 0 ? void 0 : _c.spaceInterval(timeoutOrigin);
        }
        this.addMessage(message[0]);
        message = message.slice(1);
        if (this.options.onType) {
            this.options.onType(message);
        }
        setTimeout(() => {
            this.recursiveTypeCursor(message, timeoutOrigin, onEnd);
        }, timeout);
    }
    addMessage(message) {
        if (!this.options.messageContainer)
            return;
        this.options.messageContainer.innerHTML += message;
    }
    setBlinking(blink) {
        if (!this.options.messageContainer)
            return;
        if (blink) {
            this.options.messageContainer.classList.add('typing');
            this.options.messageContainer.classList.add('blink');
        }
        else {
            this.options.messageContainer.classList.remove('typing');
            this.options.messageContainer.classList.remove('blink');
        }
    }
}
`
# options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| messageContainer | HTMLElement | document.getElementById( 'message-container' ) as HTMLElement | the element that will contain the message |
| shouldType | ( message: string ) => boolean | ( message: string ) => !message.includes( '<' ) | a callback that is called on every char typed, on false the message will be added directly on true the message will be typed char by char |
| onType | ( message: string ) => void | undefined | a callback that is called after every char typed |
| onEnd | () => void | undefined | a callback that is called when the message is typed |
| waitLongerChar | Array<string> | [ ',', '.', '?' ] | if the first char is currently typed, add a longer timeout |
| timings.charInterval | number | 50 | the time between each char typed |
| timings.waitLongerInterval | ( timeBefore: number ) => number | ( timeBefore: number ) => Math.random() * 50 * timeBefore | the time between each char typed |
| timings.spaceInterval | ( timeBefore: number ) => number | ( timeBefore: number ) => Math.random() * 5 * timeBefore | the time between each char typed |
| startEmpty | boolean | true | if the message should start empty, or append to the previous message |

# methods

| Method | Description |
| --- | --- |
| TypeCursor.typeCursor( message: string, userOptions: TypeOptions = defaultOptions, ) | types a message char by char |
| setStopTyping() | call this function to write all the message at ones and stop the typing, this is useful if a new message needs to be typed |
| typeCursor( message: string, startEmpty: boolean = true, onEnd: () => void = () => { } ) | types a message char by char |


## Typescript
The project is developed using typescript, so weather you use typescript or javascript, you will get documentation and type checking.
`;
//# sourceMappingURL=TypeItGpt.js.map