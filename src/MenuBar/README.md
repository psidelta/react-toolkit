# MenuBar

## Description
This component uses `ToolBar` and `DropdownButton` components.

## Props


Prop | Type | Default | Description
--- | --- | --- | --
items|Object[]|-|items inside the menu, see `Items` section
renderDropdownButton|({ domProps, items }) => JSX/null|custom render for overflow `DropdownButton`
dropdownButtonProps|Object|-|props applied on `DropdownButton`
menuProps|Object|-|props added on Menu

### Items
An item has the folowing shape:
```js
{
  label: JSX, // the content of the DropdownButton
  arrow,
  disabled,
  style, // any valid prop that can be added on `DropdownButton`

  items: {
    label: JSX
  }[], // prop forwarded to Menu
}[]
```

## LICENSE

#### [Apache2](./LICENSE)
