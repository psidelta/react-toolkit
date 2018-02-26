# ColorPickerInput

## Props

### General

Prop | Type | Default | Description
--- | --- | --- | ---
value|String|-|valid color value
defaultValue|String|-|uncontrolled version of `value`
expanded|Bool|-|whether the dropdown is expanded
expandOnFocus|Bool|true|whether to expand when the component receives focus
defaultExpanded|Bool|false|uncontrolled version of `expanded`
onExpandChange|(expanded: Bool)|-|called when `expanded` changes
onChange|(value) => void|-|called when color `color` is changed
collapseOnValueChange|Bool|true|whether to collapse overlay when `value` changed
collapseOnClickOutside|Bool|true|collapses when there is a click outside
renderExpandButton|({ buttonProps, expanded, onClick, expand, collapse }) => {}|custom render for expand button, overwrite by returning JSX or by mutating `domProps`
rtl|Bool|false|right to left

## Color Text Input

Prop | Type | Default | Description
--- | --- | --- | ---
colorTextInputProps|Object|-|any valid props from  **[ColorTextInput](https://github.com/zippyui/react-toolkit/tree/master/src/ColorPickerInput)**
onTextChange|(text) => void|-|called when text changes
text|String|-|`ColorTextInput` text
defaultText|String|-|uncontrolled version of `text`
renderColorTextInput|({ colorTextInputProps, onChange, value }) => JSX|-|custom render for `ColorTextInput`, it can be overwritten by returning new `JSX` or by mutating the `textinputProps`

## Color Palette

Prop | Type | Default | Description
--- | --- | --- | ---
showColorPalette|Bool|true|whether to show color pallete
colorPaletteProps|Object|-|any valid props from **[ColorPalette](https://github.com/zippyui/react-toolkit/tree/master/src/ColorPalette)**
colorPalette|String/String[]|'default'|an array of colors or a predefined color palette ('default', 'gray')
renderColorPalette|({ paletteProps, value, palette, onChange }) => JSX|-|custom render for `ColorPalette`, it can be overwritten by returning JSX or by mutating `domProps`

## Custom Color Palette

When a empty color is clicked `ColorPicker` will be rendered to select a custom color.
By clicking the `CustomColor` button, `ColorPicker` will be rendered to select a custom color, the color selected will be placed in the next empty space, if there is no empty space left the first will be changed.

Prop | Type | Default | Description
--- | --- | --- | ---
showCustomPalette|Bool|true|whether to show custom color palette
customPalette|String[]|-|a list of custom colors
defaultCustomPalette|String[]|-|uncontrolled version of `customPalette`
customPaletteLength|Number|10|number of custom colors
onCustomPaletteChange|(newColors: String[])|-|called when a new color is added, or a custom color is eddited
renderCustomColorButton|({ buttonProps, onClick }) => JSX/null|-|custom renderer for custom color button, it can be overwritten by returning new `JSX` or by mutating `buttonProps`

## ColorPicker
Prop | Type | Default | Description
--- | --- | --- | ---
renderColorPicker|({ colorPickerProps, onChange, onDismiss }) => JSX/null|-|custom renderer for `ColorPicker`,
renderOkButton|({ buttonProps, color, stringColor, onChange }) => JSX/null|-|custom render for `ColorPicker` ok button, to overwrite return a new jsx and call `onChange` of the new `color`, or mutate `buttonProps`
renderCancelButton|({ buttonProps, color, stringColor, onDismiss }) => JSX/null|-|custom render for `ColorPicker` cancel button, to overwrite return a new jsx and call `onDismiss` to close `ColorPickers`, or mutate `buttonProps`
colorPickerProps|Object|-|any valid prop from **[ColorPicker](https://github.com/zippyui/react-toolkit/tree/master/src/ColorPicker)**


## LICENSE

#### [Apache2](./LICENSE)
