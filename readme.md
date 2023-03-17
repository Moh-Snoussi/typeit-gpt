# TypeIt

A simple library to type a message char by char, with a blinking cursor.

## Installation

```bash
npm install typeit
```

## Usage
```html
<!--with default options the library expects a div with id="message-container" to be present in the DOM    -->
<div id="message-container"></div>
```

```typescript
import { TypeCursor } from 'typeit';

// simple usage
TypeCursor.typeCursor( 'Hello World' );

// with options
TypeCursor.typeCursor('Hello World', options);

``` 
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
| typeCursor( message: string, startEmpty: boolean = true, onEnd: () => void = () => { } ) | types a message char by char |
| setStopTyping() | call this function to write all the message at ones and stop the typing, this is useful if a new message needs to be typed |


## Typescript
The project is developed using typescript, so weather you use typescript or javascript, you will get documentation and type checking.
