# RangeSlider props

RangeSlider has a couple of props that are not shared with the Slider component.
They contorll behavior that is only encountered in the RangeSlider.

### minRange and maxRange

- minRange defaults to `1`
- maxRange defualts to `Infinity`

The two props control the min and max value that can be exist between the two handlers of the RangeSlider.

```jsx
<RangeSlider minRange={20} maxRange={50}/>
```

[min/max range slider example](http://zippiui.github.io/react-slider/#minMaxRangeSlider)

As you can see, the default value will get values in such a way that the min and max range is respected. If we set an invalid `defaultValue`, the component will force that 
value to become acceptible. 


```jsx
// breaks the maxRange constraint
<RangeSlider defaultValue={[20, 100]} minRange={20} maxRange={50}/>
```

[min/max range slider example 2](http://zippiui.github.io/react-slider/#minMaxRangeSliderContraints1)

```jsx
// breaks the minRange contraint
<RangeSlider defaultValue={[30, 40]} minRange={20} maxRange={50}/>
```

[min/max range slider example 3](http://zippiui.github.io/react-slider/#minMaxRangeSliderContraints2)