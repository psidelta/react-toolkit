# TabBar

## Description

A container in which multiple components can be rendered, overflowed components will be handled in one of two ways:
- with scroll
- render the extra components inside the a button

## Props

Prop | Type | Default | Description
--- | --- | --- | --
children|Node|-|components rendered inside TabBar
overflowStrategy|'scroll', 'dropdown'|dropdown|`scroll` will render arrow to scroll the overflowed items; `dropdown` will hide the overflowed items inside a `DropdownButton`
dropdownButtonProps|Object|-|props applied on dropdown button
renderDropdownButton|({ domProps, items }) => JSX/null|custom render for `DropdownButton`, if it returns null domProps can be mutated, they will be applied on the `DropdownButton`


## LICENSE

#### [Apache2](./LICENSE)
