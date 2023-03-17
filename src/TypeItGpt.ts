type TypeItGptOptions = {
    // the element that will contain the message
    // default is document.getElementById( 'message-container' ) as HTMLElement
    messageContainer?: HTMLElement | null;

    timings: {
        charInterval: number;
        waitLongerInterval: ( timeBefore : number ) => number;
        spaceInterval: ( timeBefore : number ) => number;
    }

    startEmpty?: boolean;


    waitLongerChar: Array<string>;

    // a callback that is called on every char typed, on false the message will be added directly
    // on true the message will be typed char by char
    shouldType: ( message: string ) => boolean;

    // a callback that is called when the message is typed
    // this is useful if you want to scroll to the bottom of the message container
    onType?: ( message: string ) => void;


    // a callback that is called when the message is typed
    onEnd?: () => void;
}

const defaultOptions: TypeItGptOptions = {
    messageContainer: document.getElementById( 'message-container' ) as HTMLElement,
    shouldType: ( message: string ) => !message.includes( '<' ),
    waitLongerChar: [ ',', '.', '?' ],
    timings: {
        charInterval: 50,
        // @ts-ignore
        waitLongerInterval: ( timeBefore ) => Math.random() * 50 * timeBefore,

        // @ts-ignore
        spaceInterval: ( timeBefore ) => Math.random() * 5 * timeBefore,
    },
    startEmpty: true,
};

export class TypeItGpt {
    stopTyping = false;
    options: TypeItGptOptions = defaultOptions;

    constructor( private userOptions: {} | TypeItGptOptions = defaultOptions ) {
        this.options = { ...defaultOptions, ...userOptions };

        if ( !this.options.messageContainer || !( this.options.messageContainer instanceof HTMLElement ) ) {
            console.warn( 'messageContainer is not an element' );
        }
    }

    static typeCursor( message: string, userOptions: TypeItGptOptions = defaultOptions, ): TypeItGpt {
        const typeCursor = new TypeItGpt( userOptions );
        typeCursor.typeCursor( message, userOptions.startEmpty, userOptions.onEnd || ( () => {
        } ) );
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
    typeCursor( message: string, startEmpty: boolean = true, onEnd: () => void = () => {
    } ) {
        // check if message there is a html string
        this.setBlinking( true );
        this.stopTyping = false;
        if ( startEmpty ) {
            this.options.messageContainer!.innerHTML = '';
        }
        if ( !this.options.shouldType( message ) ) {
            this.addMessage( message );
            onEnd();
        } else {
            this.recursiveTypeCursor( message, this.options.timings.charInterval, onEnd );
        }
    }

    /**
     * Call this function to write all the message at ones and stop the typing,
     * this is useful if a new message needs to be typed
     */
    setStopTyping() {
        this.stopTyping = true;
    }

    private recursiveTypeCursor( message: string, timeoutOrigin: number = 150, onEnd: () => void = () => {
    } ) {
        if ( message.length === 0 || this.stopTyping ) {
            this.addMessage( message );
            this.setBlinking( false );
            onEnd();
            return;
        }
        let timeout = timeoutOrigin;
        // if the first char is a comma, point, or question mark, add a longer timeout
        if ( this.options.waitLongerChar?.includes( message[ 0 ] ) ) {
            timeout = this.options.timings?.waitLongerInterval( timeoutOrigin );
        }

        if ( message[ 0 ] === ' ' ) {
            timeout = this.options.timings?.spaceInterval( timeoutOrigin );
        }

        this.addMessage( message[ 0 ] );
        message = message.slice( 1 );
        if ( this.options.onType ) {
            this.options.onType( message );
        }
        setTimeout( () => {
            this.recursiveTypeCursor( message, timeoutOrigin, onEnd );
        }, timeout );
    }

    private addMessage( message: string ): void {
        if ( !this.options.messageContainer ) return;

        this.options.messageContainer.innerHTML += message;
    }

    private setBlinking( blink: boolean ) {
        if ( !this.options.messageContainer ) return;
        if ( blink ) {
            this.options.messageContainer.classList.add( 'typing' );
            this.options.messageContainer.classList.add( 'blink' );
        } else {
            this.options.messageContainer.classList.remove( 'typing' );
            this.options.messageContainer.classList.remove( 'blink' );
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
`
