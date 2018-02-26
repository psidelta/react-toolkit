react-number-field
==================

## Install

```sh
$ npm i --save react-number-field
```

## Usage

```jsx
import NumberField from 'react-number-field'

let value = 3


<NumberField value={value} onChange={onChange} />
<NumberField defaultValue={value}/>

```

## Props

 * `allowFloat: Boolean` - defaults to true. Specify `false` to only allow integers
 * `allowNegative: Boolean` - defaults to true
 * `minValue`
 * `maxValue`
 * `step: Number` - defaults to 1
 * `shiftStep`: Number - defaults to 10
 * `stepDelay`: Number - defaults to 40 milliseconds. Delay between increments/decrements of the field value, when mouse is down over the spinner arrow
 * `stepOnWheel: Boolean` - defaults to true
 * `requireFocusOnStep: Boolean` - defaults to true
 * `onChange(value, event)` - By default, the `onChange` handler will be called with the value as the first arg. If you use a `factory` function that calls `onChange` with other args, those will be passed to the `onChange`.
 * `getNumericValue` - api method, will return the current numeric value of the field
 * `getValue` - api method, will return the current string value of the field

 * `clearTool`: Boolean - defaults to true. If false, it won't show a clear tool when value is not empty
 * `arrowColor`: String
 * `arrowSize`: Number
 * `arrowPadding`: Number - padding to be applied to the left and right of the arrows
 * `enableArrows`
 * `arrowStyle`
 * `arrowUpStyle`
 * `arrowDownStyle`
 * `toolPosition`
* `enableSpinnerTools`
* `wrapperProps`


## Development

```sh
$ npm run dev
```

## License

#### MIT
