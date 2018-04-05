# Slide props

### trackFillPosition

type: `oneOf('start', 'end')`

Defaults to `start`, can be `start` or `end`; Only for the `Slider`; 

Specifies  component from which side of the slider will the fill component start. By default, it will start from the start position, meaning the top or left in normal rendering mode, or right if `rtl` is set to true. 

Setting `trackFillPosition to `end` will render the fill position from the other end of the slider. 

```jsx
<Slider trackFillPosition='end'/>
```

[track fill position end example](http://zippiui.github.io/react-slider/#trackFillPositionEnd)

### noFill

- defaults to false
- can be `true|false`

When set to `true` it will disable rendering the fill bar. Useful if the slide doens't need a fill.


[no fill example](http://zippiui.github.io/react-slider/#noFillExample)