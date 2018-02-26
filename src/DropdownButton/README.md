# DropdownButton

## Description
DropdownButton button is composed by the `Button` and `Menu` components.

## Props

The DropdownButton button contains two items: the button and the menu. Those items are wrapped inside a `<div>`, called the **wrapper**.

Prop | Type | Default | Description
--- | --- | --- | ---
`arrow`|JSX/(expanded) => JSX|-|custom arrow
`disabled`|Bool|false|disable button
`arrowPosition`|'left', 'right'|'right'|arrow position
`alignPositions`|String/String[]|'tl-bl'|you can specify how you want the menu to be aligned to the button
`buttonProps`|Object|-|props passed to button component
`renderButton`|(buttonProps) => JSX/null|-|custom render for `Button`, customize by returning JSX or by mutating `menuProps` and returning undefined.
`defaultExpanded`|Bool|false|uncontrolled version of `expanded`
`expanded`|Bool|-|whether the menu is expanded
`items`|Array|-| an array of menu items for the menu of this drop-down button
`hideMenuOnClick`|Bool|true|whether to hide menu when button is clicked
`hideMenuOnClickOutside`|Bool|true|whether to close submenu on click outside
`menuProps`|Object|-|props passed to menu component
`menu`|ReactElement|-|instead of `menuProps`, you can directly pass in a menu instance
`renderMenu`|(menuProps)|-|custom render for `Menu`, customize by returning JSX or by mutating `menuProps` and returning undefined.
`onMenuClick`|(event, itemProps) => void|-| called when a menu item, at any nesting level has been clicked.
`onExpandedChange`|(expanded) => void|called when expanded changes
`style`|Object|-| inline style applied on wrapper
`onClick`|(event) => void|-|called when button is clicked
`onDismis`|() =>|-|called when dropdown list is closed, by clicking outside or the dropdown button
`rtl`|Bool|false|right to left
`dismissOnScroll`|Bool|false| dismisses menu on window scroll, usefull when menu is positioned fixed

## LICENSE

#### [Apache2](./LICENSE)
