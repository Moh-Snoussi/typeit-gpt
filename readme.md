# TypeItGpt

A simple library to type a message char by char, with a blinking cursor, that looks like the chatGPT answer.

## Demo

[Demo](https://moh-snoussi.github.io/typeit-gpt/)

## Installation

### NPM

```bash
npm install typeit-gpt --save
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/typeit-gpt/src/index.css" />
<div id="message-container""></div>

<script type="module">
    import TypeItGpt from 'https://cdn.skypack.dev/typeit-gpt';
    TypeItGpt.typeCursor('Hello World');
</script>
```

## Usage

```html
<!--with default options the library expects a div with id="message-container" to be present in the DOM    -->
<div id="message-container"></div>
```

```typescript
import { TypeItGpt } from "typeit-gpt";

// simple usage
TypeCursor.typeCursor("Hello World");

// with options
TypeCursor.typeCursor("Hello World", options);
```

# options

| Option                     | Type                             | Default                                                       | Description                                                                                                                               |
| -------------------------- | -------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| messageContainer           | HTMLElement                      | document.getElementById( 'message-container' ) as HTMLElement | the element that will contain the message                                                                                                 |
| shouldType                 | ( message: string ) => boolean   | ( message: string ) => !message.includes( '<' )               | a callback that is called on every char typed, on false the message will be added directly on true the message will be typed char by char |
| onType                     | (oldMessage: string, currentChar: string ) => void      | undefined                                                     | a callback that is called after every char typed                                                                                          |
| onEnd                      | () => void                       | undefined                                                     | a callback that is called when the message is typed                                                                                       |
| waitLongerChar             | Array<string>                    | [ ',', '.', '?' ]                                             | if the first char is currently typed, add a longer timeout                                                                                |
| timings.charInterval       | number                           | 50                                                            | the time between each char typed                                                                                                          |
| timings.waitLongerInterval | ( timeBefore: number ) => number | ( timeBefore: number ) => Math.random() _ 50 _ timeBefore     | the time between each char typed                                                                                                          |
| timings.spaceInterval      | ( timeBefore: number ) => number | ( timeBefore: number ) => Math.random() _ 5 _ timeBefore      | the time between each char typed                                                                                                          |
| startEmpty                 | boolean                          | true                                                          | if the message should start empty, or append to the previous message                                                                      |
| cursorWidth                | string                           | '1rem'                                                        | the width of the cursor                                                                                                                   |
| cursorColor                | string                           | 'white'                                                       | the color of the cursor                                                                                                                   |
| removeClassAfterEnd        | boolean                           | false                                                  | if the type-it-gpt class should be removed from the message after the typing is done                                                        |

# methods

| Method                                                                                   | Description                                                                                                                |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| TypeCursor.typeCursor( message: string, userOptions: TypeOptions = defaultOptions, )     | types a message char by char                                                                                               |
| typeCursor( message: string, startEmpty: boolean = true, onEnd: () => void = () => { } ) | types a message char by char                                                                                               |
| setStopTyping()                                                                          | call this function to write all the message at ones and stop the typing, this is useful if a new message needs to be typed |

## Typescript

The project is developed using typescript, so weather you use typescript or javascript, you will get documentation and type checking.
