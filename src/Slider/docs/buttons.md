# Buttons

Sliders have the option of rendering buttons to increment/decrement the value.
The RangeSlider does not support buttons at this moment.

## Button props

### showButtons

- defaults to `false`
- can be `true|false`

If set to true, it will enable the button rendering for the Slide component.

```jsx
<Slider showButtons orientation='vertical'/>
```
[buttons example](http://zippiui.github.io/react-slider/#buttonsExample)

### incrementButton

- default to boilerplate jsx
- can be a jsx component

The button used to increment the value. It will have a parent that applies listeners and handles all interaction so it needs no domProps to be exapnded or anything like that.

### decrementButton

- default to boilerplate jsx
- can be a jsx component

The button used to decrement the value. It will have a parent that applies listeners and handles all interaction so it needs no domProps to be exapnded or anything like that.

```jsx
<Slider showButtons incremebtButton={'a'} decrementButton={'b'}/>
```
[custom buttons example](http://zippiui.github.io/react-slider/#custonButtonsExample)
