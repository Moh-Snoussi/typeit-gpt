"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeItGpt = void 0;
require("./index.css");
var defaultOptions = {
    messageContainer: document.getElementById('message-container'),
    shouldType: function (message) { return !message.includes('<'); },
    waitLongerChar: [',', '.', '?'],
    timings: {
        charInterval: 50,
        // @ts-ignore
        waitLongerInterval: function (timeBefore) { return Math.random() * 50 * timeBefore; },
        // @ts-ignore
        spaceInterval: function (timeBefore) { return Math.random() * 5 * timeBefore; },
    },
    startEmpty: true,
};
var TypeItGpt = /** @class */ (function () {
    function TypeItGpt(userOptions) {
        if (userOptions === void 0) { userOptions = defaultOptions; }
        this.userOptions = userOptions;
        this.stopTyping = false;
        this.options = defaultOptions;
        this.options = __assign(__assign({}, defaultOptions), userOptions);
        if (!this.options.messageContainer || !(this.options.messageContainer instanceof HTMLElement)) {
            console.warn('messageContainer is not an element');
        }
    }
    TypeItGpt.typeCursor = function (message, userOptions) {
        if (userOptions === void 0) { userOptions = defaultOptions; }
        var typeCursor = new TypeItGpt(userOptions);
        typeCursor.typeCursor(message, userOptions.startEmpty, userOptions.onEnd || (function () {
        }));
        return typeCursor;
    };
    /**
     * Types a message char by char
     *
     * @param message the message to type
     * @param startEmpty if the message should start empty, or append to the previous message
     * @param onEnd a callback that is called when the message is typed
     *
     */
    TypeItGpt.prototype.typeCursor = function (message, startEmpty, onEnd) {
        if (startEmpty === void 0) { startEmpty = true; }
        if (onEnd === void 0) { onEnd = function () {
        }; }
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
    };
    /**
     * Call this function to write all the message at ones and stop the typing,
     * this is useful if a new message needs to be typed
     */
    TypeItGpt.prototype.setStopTyping = function () {
        this.stopTyping = true;
    };
    TypeItGpt.prototype.recursiveTypeCursor = function (message, timeoutOrigin, onEnd) {
        var _this = this;
        var _a, _b, _c;
        if (timeoutOrigin === void 0) { timeoutOrigin = 150; }
        if (onEnd === void 0) { onEnd = function () {
        }; }
        if (message.length === 0 || this.stopTyping) {
            this.addMessage(message);
            this.setBlinking(false);
            onEnd();
            return;
        }
        var timeout = timeoutOrigin;
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
        setTimeout(function () {
            _this.recursiveTypeCursor(message, timeoutOrigin, onEnd);
        }, timeout);
    };
    TypeItGpt.prototype.addMessage = function (message) {
        if (!this.options.messageContainer)
            return;
        this.options.messageContainer.innerHTML += message;
    };
    TypeItGpt.prototype.setBlinking = function (blink) {
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
    };
    return TypeItGpt;
}());
exports.TypeItGpt = TypeItGpt;
"\n# options\n\n| Option | Type | Default | Description |\n| --- | --- | --- | --- |\n| messageContainer | HTMLElement | document.getElementById( 'message-container' ) as HTMLElement | the element that will contain the message |\n| shouldType | ( message: string ) => boolean | ( message: string ) => !message.includes( '<' ) | a callback that is called on every char typed, on false the message will be added directly on true the message will be typed char by char |\n| onType | ( message: string ) => void | undefined | a callback that is called after every char typed |\n| onEnd | () => void | undefined | a callback that is called when the message is typed |\n| waitLongerChar | Array<string> | [ ',', '.', '?' ] | if the first char is currently typed, add a longer timeout |\n| timings.charInterval | number | 50 | the time between each char typed |\n| timings.waitLongerInterval | ( timeBefore: number ) => number | ( timeBefore: number ) => Math.random() * 50 * timeBefore | the time between each char typed |\n| timings.spaceInterval | ( timeBefore: number ) => number | ( timeBefore: number ) => Math.random() * 5 * timeBefore | the time between each char typed |\n| startEmpty | boolean | true | if the message should start empty, or append to the previous message |\n\n# methods\n\n| Method | Description |\n| --- | --- |\n| TypeCursor.typeCursor( message: string, userOptions: TypeOptions = defaultOptions, ) | types a message char by char |\n| setStopTyping() | call this function to write all the message at ones and stop the typing, this is useful if a new message needs to be typed |\n| typeCursor( message: string, startEmpty: boolean = true, onEnd: () => void = () => { } ) | types a message char by char |\n\n\n## Typescript\nThe project is developed using typescript, so weather you use typescript or javascript, you will get documentation and type checking.\n";
//# sourceMappingURL=TypeItGpt.js.map