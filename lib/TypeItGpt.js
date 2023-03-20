export const defaultOptions = {
    messageContainer: document.getElementById('message-container'),
    shouldType: (message) => !message.includes('<'),
    waitLongerChar: [',', '.', '?'],
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
class TypeItGpt {
    constructor(userOptions = defaultOptions) {
        this.stopTyping = false;
        this.options = defaultOptions;
        this.message = '';
        this.options = Object.assign(Object.assign({}, defaultOptions), userOptions);
        if ("timings" in userOptions) {
            this.options.timings = Object.assign(Object.assign({}, defaultOptions.timings), userOptions.timings);
        }
        if (this.options.messageContainer instanceof HTMLElement) {
            this.setStyles();
        }
    }
    static typeCursor(message, userOptions = defaultOptions) {
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
    typeCursor(message, startEmpty = true, onEnd = () => {
    }) {
        // check if message there is a html string
        this.setBlinking(true);
        this.stopTyping = false;
        if (startEmpty) {
            this.clearMessage();
        }
        if (!this.options.shouldType(message)) {
            setTimeout(() => this.addMessage(message), this.options.timings.blinkBeforeStart || 0);
            this.addMessage(message);
            setTimeout(() => {
                this.setBlinking(false);
                onEnd();
            }, this.options.timings.blinkAfterEnd || 0);
        }
        else {
            setTimeout(() => {
                if (startEmpty) {
                    this.clearMessage();
                }
                this.setBlinking(true);
                this.stopTyping = false;
                this.recursiveTypeCursor(message, this.options.timings.charInterval, onEnd);
            }, this.options.timings.blinkBeforeStart || 0);
        }
    }
    clearMessage() {
        this.message = '';
        if (this.options.messageContainer) {
            this.options.messageContainer.innerHTML = '';
        }
    }
    /**
     * Call this function to write all the message at ones and stop the typing,
     * this is useful if a new message needs to be typed
     */
    setStopTyping() {
        this.stopTyping = true;
    }
    setStyles() {
        var _a, _b, _c;
        (_a = this.options.messageContainer) === null || _a === void 0 ? void 0 : _a.style.setProperty('--type-it-gpt-blink-interval', `${this.options.timings.blinkInterval}ms`);
        (_b = this.options.messageContainer) === null || _b === void 0 ? void 0 : _b.style.setProperty('--type-it-gpt-cursor-width', this.options.cursorWidth);
        (_c = this.options.messageContainer) === null || _c === void 0 ? void 0 : _c.style.setProperty('--type-it-gpt-cursor-color', this.options.cursorColor);
        this.options.messageContainer.classList.add('type-it-gpt');
    }
    recursiveTypeCursor(message, timeoutOrigin = 150, onEnd = () => {
    }) {
        var _a, _b, _c;
        if (message.length === 0 || this.stopTyping) {
            this.addMessage(message);
            setTimeout(() => {
                var _a;
                this.setBlinking(false);
                onEnd();
                if (this.options.removeClassAfterEnd) {
                    (_a = this.options.messageContainer) === null || _a === void 0 ? void 0 : _a.classList.remove('type-it-gpt');
                }
            }, this.stopTyping ? 0 : this.options.timings.blinkAfterEnd || 0);
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
            this.options.onType(this.message, message[0]);
        }
        setTimeout(() => {
            this.recursiveTypeCursor(message, timeoutOrigin, onEnd);
        }, this.stopTyping ? 1 : timeout);
    }
    addMessage(message) {
        this.message += message;
        if (!this.options.messageContainer)
            return;
        this.options.messageContainer.innerHTML += message;
    }
    setBlinking(blink) {
        if (!this.options.messageContainer)
            return;
        this.options.messageContainer.classList[blink ? 'add' : 'remove']('cursor');
    }
}
TypeItGpt.insts = [];
export { TypeItGpt };
//# sourceMappingURL=TypeItGpt.js.map