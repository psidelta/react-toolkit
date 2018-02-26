# Track

The track is the line that paints the entire range of the slider. On top of it
the track fill indicates what portion of the range is filled/selected by the current
value.

## Track Props

### trackStyle

- defaults to `{}`
- must be object with react css properties

The `trackStyle` gets applied to the wrapper of all the elements that compose the track bar.

### trackLineStyle

- defaults to `{}`
- must be object with react css properties

The `trackLineStyle` gets applied to the line that goes from one side to the other containing the full width/height depending on orientation. It can be used to style how the bar looks on the outside of the selection.

### trackFillStyle

- defaults to `{}`
- must be object with react css properties

The `trackFillStyle` gets applied to the selected interval of the slider.


[trackStyle example](http://zippiui.github.io/react-slider/#trackStyles)

## enableTrackClick

- defaults to `true`
- can be `true|false`

If set to false will ingore click on the track bar. 

[no track click example](http://zippiui.github.io/react-slider/#noTrackClick)