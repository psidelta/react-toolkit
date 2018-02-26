# ColorTextInput

## Description

It is composed of an input and a square of the color in `value`.
It calls onChange only when the entered value is valid, when the input loses focus,
the text will return to the previous valid `value`.

## Props

Prop | Type | Default | Description
--- | --- | --- | ---
rtl|Bool|false|right to left
value|String|-|string color value, it must be a valid color
defaultValue|String|-|uncontrolled version of `value`
onChange|String|-|called only when a valid color is entered
text|String|-|input text
defaultText|String|-|uncontrolled version of `text`
onTextChange|String|-|called when input text changes, it is called even when the color is invalid
inputProps|Object|-|props added on input
inputStyle|Object|-|inline style applied on input
colorPreviewProps|Object|-[props added on color preview
colorPreviewSize|Number/{ width: number, height: number }|10|the size in px of the color preview
colorPreviewPosition|'start', 'end'|'start'|the position of the `ColorPreview`.
colorPreviewStyle|Object|-|inline style applied on `ColorPreview`
renderColorPreview|({ domProps, value }) => JSX|-|custom render for `ColorPreview`, it can be overwriten by returning `JSX` or by mutating props and returning `undefined`.


## LICENSE

#### [Apache2](./LICENSE)
