type TypeItGptOptions = {
    messageContainer?: HTMLElement | null;
    timings: {
        charInterval: number;
        waitLongerInterval: (timeBefore: number) => number;
        spaceInterval: (timeBefore: number) => number;
    };
    startEmpty?: boolean;
    waitLongerChar: Array<string>;
    shouldType: (message: string) => boolean;
    onType?: (message: string) => void;
    onEnd?: () => void;
};
export declare class TypeItGpt {
    private userOptions;
    stopTyping: boolean;
    options: TypeItGptOptions;
    constructor(userOptions?: {} | TypeItGptOptions);
    static typeCursor(message: string, userOptions?: TypeItGptOptions): TypeItGpt;
    /**
     * Types a message char by char
     *
     * @param message the message to type
     * @param startEmpty if the message should start empty, or append to the previous message
     * @param onEnd a callback that is called when the message is typed
     *
     */
    typeCursor(message: string, startEmpty?: boolean, onEnd?: () => void): void;
    /**
     * Call this function to write all the message at ones and stop the typing,
     * this is useful if a new message needs to be typed
     */
    setStopTyping(): void;
    private recursiveTypeCursor;
    private addMessage;
    private setBlinking;
}
export {};
//# sourceMappingURL=TypeItGpt.d.ts.map