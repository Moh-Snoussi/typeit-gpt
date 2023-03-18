type TypeItGptOptions = {
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
    };
    cursorWidth: string;
    startEmpty?: boolean;
    waitLongerChar: Array<string>;
    shouldType: (message: string) => boolean;
    onType?: (oldMessage: string, char: string) => void;
    onEnd?: () => void;
};
export declare const defaultOptions: TypeItGptOptions;
export declare class TypeItGpt {
    stopTyping: boolean;
    options: TypeItGptOptions;
    private message;
    constructor(userOptions?: {} | TypeItGptOptions);
    private static insts;
    static typeCursor(message: string, userOptions?: TypeItGptOptions): TypeItGpt;
    static setStopAllTyping(): void;
    /**
     * Types a message char by char
     *
     * @param message the message to type
     * @param startEmpty if the message should start empty, or append to the previous message
     * @param onEnd a callback that is called when the message is typed
     *
     */
    typeCursor(message: string, startEmpty?: boolean, onEnd?: () => void): void;
    clearMessage(): void;
    /**
     * Call this function to write all the message at ones and stop the typing,
     * this is useful if a new message needs to be typed
     */
    setStopTyping(): void;
    private setStyles;
    private recursiveTypeCursor;
    private addMessage;
    private setBlinking;
}
export {};
//# sourceMappingURL=TypeItGpt.d.ts.map