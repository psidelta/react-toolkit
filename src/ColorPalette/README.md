# ColorPallet

Prop | Type | Default | Description
--- | --- | --- | ---
rtl|Bool|false|right to left
onChange|(color, index) => void|-|called when a color is selected
palette|String[]/|default|an array of colors, or a predefined color pallet
itemSize|Number/{ width, height }|{ width: 20, height: 10 }|the size in px of the color item
renderItem|({ color: String, onChange: Func, domProps: Object, active: Bool }) => JSX|-|custom render for color item, the default implementation can be overwritten by eather retirning a JSX or by mutating `domProps`.
value|String|-|color value
defaultValue|String|-|uncontrolled `value`
onItemClick|(color, event, index) => void|-|called when a color item is clicked

#### Predefined color pallets
- default
- gray


## LICENSE

#### [Apache2](./LICENSE)
