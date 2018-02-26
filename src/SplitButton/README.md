# Split Button

## Description
SplitButton is composed of DropdownButton, Menus and Button.

SplitButton is a component comprised of a `Button` and a `DropdownButton`

## Props

The submcomponents are wrapped inside a `<div>`, called **wrapper**

Prop | Type | Default | Description
--- | --- | --- | ---
rtl
buttonProps|Object|-| props for the button
dropdownButtonProps|Object|-| props for button inside dropdown button, it sets buttonProps on dropdownbutton
dropdownButtonWrapperProps|Object|-| props for the dropdownbutton props
disabled|Bool|false| applied to the button and the arrow
expanded|Book|-|whether the menu is expanded
defaultExpanded|Bool|false|uncontrolled version of `expanded`
onExpandedChange|(expanded)=> void|-|called when the button is toggled
onDropdownButtonClick|(event) => void|-| called when the arrow is clicked
onMenuClick|(event, itemProps) => void|-| called when a menu item is clicked
onClick|(event) => void|-| function to be called when the button is clicked (not the arrow!)
items|Object[]|-|an array of menu items to build the menu
menu|ReactComponent/({ items }) => JSX|-|custom component for menu
menuProps|Object|-|props for menu
theme|String|`default`|a theme to apply the button and the arrow
`renderMenu`|(menuProps)|-|custom render for `Menu`, customize by returning JSX or by mutating `menuProps` and returning undefined

## LICENSE

#### [Apache2](./LICENSE)
