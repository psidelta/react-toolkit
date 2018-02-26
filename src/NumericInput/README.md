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

* `allowFloat: Boolean` - defaults to `true`. Specify `false` to only allow integers.
* `allowNegative: Boolean` - defaults to `true`. Whether to allow negative numbers.
* `minValue: Number` - Specifies the minimum value.
* `maxValue` - Specifies the maximum value.
* `step: Number` - defaults to 1. Specifies the step which value is changed within wheel scrolling or arrows clicking.
* `shiftStep: Number` - defaults to 10. Specifies the step in which the value is changed while the `shift` key is pressed.
* `stepDelay: Number` - defaults to 60 milliseconds. Delay between increments/decrements of the field value, when mouse is down over the spinner arrow.
* `stepOnWheel: Boolean` - defaults to `true`. Whether to change the value with mouse wheel.
* `requireFocusOnStep: Boolean` - defaults to `true`. Whether the component should have focus when value is changed on mouse wheel.
* `onChange(value, event)` - By default, the `onChange` handler will be called with the value as the first arg. If you use a `factory` function that calls `onChange` with other args, those will be passed to the `onChange`.
* `arrowColor: String` - Specifies the color of the arrows.
* `arrowSize: Number` - Specifies the size of the arrows.
* `arrowPadding: Number` - padding to be applied to the left and right of the arrows.
* `arrowStyle: Object` - Customize the style of the up and down arrows.
* `arrowUpStyle: Object` - Customize the up arrow.
* `arrowDownStyle: Object` - Customize the down arrow.
* `toolPosition: String` - It can takes `"start"` or `"end"` as values. Specifies the position of the clear button and the arrows. Defaults to `"end"`.
* `enableSpinnerTools: Boolean` - defaults to `true`. Enables the arrows buttons.
* `wrapperProps: Object` - Specifies the props that can be adeed directly to the wrapper that hold the input, clear button and arrows.
* `clearButtonSize: Number` - default to 21 px. Specifies the size of the clear button.
* `enableClearButton: Boolean`- default to `true`. Enables a clear button.


## Methods

* `getNumericValue` - Will return the current numeric value of the field.
* `getValue` - Will return the current string value of the field.


## Development

```sh
$ npm run dev
```

## License

#### MIT
