# Basics

Slider and RangeSlider are input components that allow interaction via drag, mouse wheel and keyboard keys. They update the value or range of values based on the user input and have an `onChange` event which gets triggered when their value changes.

Like all other components from our component suite, `value` and `defaultValue` can be used to supply either the controlled version of the value or the intial value.

## Basic usage

Creating a basic slider is very streigh forward:

```jsx
<Slider/>
```

[basic slider example](http://zippiui.github.io/react-slider/#sliderBasic)

Similarly, a range slider can be created this way:

```jsx
<RangeSlider/>
```

[basic range slider example](http://zippiui.github.io/react-slider/#rangeSliderBasic)

## Basic props

### orientation

- Defaults to `horizontal`
- Can be either `horizontal` or `vertical`

This prop sets the layout mode of the component. In `horizontal` the slider will
work horizontally and will be influenced by the `rtl` prop.

The slider will render from top to bottom in `vertical` mode. Interacting with
the vertical slider works the same way as it does with the horizontal one, but the
movement of the handler will be on the vertical axis.

```jsx
<Slider orientation='vertical'/>
```

[vertical slider example](http://zippiui.github.io/react-slider/#verticalSlider1)

### startValue

Specifies the start limit of the slider. It defaults to 0. The slider will never go beyond this value. Use this to limit the start value (either left or top) of the slider.

### endValue

Specifies the end limit of the slider. It defaults to 100. Similar to startValue, it limits the other end of the available values that can be picked on this slider.

```jsx
<RangeSlider startValue={-100} endValue={100}/>
```

[limited slider example](http://zippiui.github.io/react-slider/#limitedSlider)

Start and end values can be reversed. The start value does not have to be smaller than
the endValue. Specifing a `startValue` that is higher than the `endValue` will inverse the way the slider works. Sliding to the left will increase the value; sliding to the rgiht will decrease it.

```jsx
<RangeSlider startValue={100} endValue={-100}/>
```

[limited inverted slider example](http://zippiui.github.io/react-slider/#limitedSliderInversed)

### defaultValue

type: `number|arrayOf(Number)`

The intial value of the slider, or range slider. This is undefined by default and assumed as `startValue` for Slider and as the range [`startValue`, `endValue`] for the range slider.

Setting the default value for the slider is simple. The value used, if found in between `startValue` and `endValue` will be used as the initial position of the slider.

```jsx
<Slider defaultValue={35}/>
```

[default value for slider example](http://zippiui.github.io/react-slider/#sliderDefaultValue)

We need to use an array of numbers for the range slider default value. If we have `startValue=300` and `endValue=200`, then we expect the first number in the default value to be bigger than the second number, like `[250, 220]`. If on the other hand, `startValue=200` and `endValue=300`, a valid `defaultValue` for the slider would be `[220, 250]`.

```jsx
<RangeSlider startValue={300} endValue={200} defaultValue={[250, 220]}/>
```

[default value for range slider example](http://zippiui.github.io/react-slider/#rangeSliderDefaultValue)


### step

- defaults to `1`

The smalles unit on the slide. The increment and decrement action will alter the value based on the `step` value.

Clicking or dragging will also move the slider by multiples of `step`.

```jsx
<Slider step={10} defaultValue={50}/>
```

[slider step example](http://zippiui.github.io/react-slider/#sliderStep5)

### largeStep

- defaults to `10`

Similar to `step` it dictates the increment and decrement ammounts. This prop works when the `SHIFT` key is pressed while using the arrow keys or the mouse wheel.

```jsx
<Slider largeStep={10} defaultValue={50}/>
```

(press shift and mouse wheel after focusing the next example)

[slider large step example](http://zippiui.github.io/react-slider/#sliderLargeStep10)

### rtl

- defaults to `false`
- can be `true|false`

Will set `direction` to to rtl in css and reverse the order of ticks and the position of track fill in horizontal orientation. In vertical orientation it will just apply the CSS `direction` property leaving the slide layout intact.

Buttons wil also be reversed in rtl mode due to the nature of the css flex layout which will reverse the start and end positions when `direction:rtl` is applied.

```jsx
<Slider rtl/>
```

[rtl example](http://zippiui.github.io/react-slider/#rtlExample)


### statefulDrag

- defaults to `true`
- can be `true|false`

When dragging it would be nice to prevent multiple change events from triggering. This property (enabled by default) will set internal state while the slider is being dragged.

Setting it to false will make the component trigger change events for each update during the drag, which might make it slugish or break the functionality if in the onChange event we set a controlled value that is not under the dragging pointer.
