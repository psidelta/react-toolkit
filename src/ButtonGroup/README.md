# Button Group

## Description
A component that groups one or more buttons.

## Usage

```jsx
  import { ButtonGroup, Button } from 'react-tookit'

  <ButtonGroup
    keepOnePressed
    defaultPressedIndex={2}
    onClick={({ event, index, buttonProps }) => {

    }}
  >
    <Button>on</Button>
    <Button>off</Button>
    <Button>cancel</Button>
  <ButtonGroup />
```

## Props

Prop | Type | Default | Description
--- | --- | --- | ---
rtl|Bool|false|whether to use direction rtl
keepOnePressed|Bool|false|one button is always pressed
pressedIndex|Number|-|index of the pressed button
defaultPressedIndex|Number|0|uncontrolled version of `pressedIndex`
onPressedIndexChange|(index) => {}|
onClick|({ event, index, buttonProps }) => {}|-|called when a button is clicked
borderRadius|Number/String|3|the radious of the button group
border|String|-|inline border style applied on the broup
theme - added on all buttons if not set

## LICENSE

#### [Apache2](./LICENSE)
