# Handlers

The slider handlers are key control elements that allow dragging and changing the
current value of the slider components. 

## Handler props

### handleSize

- defaults: `{width:10, height:10}`
- must be `object` containing the `width` and `height` keys

One very important prop is the size of the handler. This is set via javascript 
instead of CSS. The size is used to figure out how much space to allow the drag
interaction to work outside the track bar. 

We can change the size of the handle bar like this:

```jsx
<RangeSlider handleSize={{width:20, height:20}} startValue={-100} endValue={100}/>
```

[larger handle size example](http://zippiui.github.io/react-slider/#handleSize1)

### handleStyle

- defaults: `{}`
- must be `object` containing valid react css declarations

Complementary to the `handleSize` prop, `handleStyles` will apply aditional styling directly to the handle nodes.

```jsx
<RangeSlider 
  handleSize={{width:15, height:15}}
  handleStyle={{borderRadius:'50%', backgroundColor:'#036'}}
/>
```

[handle size and style example](http://zippiui.github.io/react-slider/#handleSizeAndStyle)

### renderHandleContent

- defaults to `(domProps)=>(<div {...domProps}/>)`
- must be a function rendering a dom element and passing down the `domProps` property.

- receives `domProps` and `customProps` as two parameters
  - `domProps` contains the className, styles and any additional content sent by the slider to be rendered in the dom.
  - `customProps` contains additional information:
    - `dragging`: indicating if the slide is in dragging mode or not
    - `value`: the numeric value of the slide at this given moment
    - `focused`: indicating if the handle is focused or not - this is releveant in RangeSlider when only one handle could be focused.


A custom render method used to render the content of the handle. By default the handle
is a simple div without any content. We can customize and add additional content within the handler, like the current value for a normal slide component for example.

```jsx
const renderHandleContentWithValue = (domProps, customProps) => {
  const [selectionStart, selectionEnd] = customProps.value;
  let currentValue = selectionStart;
  if ( domProps.key ==='endHandler' ) {
    currentValue = selectionEnd;
  }
  return <div {...domProps} children={currentValue}/>;
}

<RangeSlider 
  renderHandleContent={renderHandleContentWithValue}
  handleSize={{width:30, height:15}}
  handleStyle={{
    fontSize:8, 
    lineHeight:'15px', 
    textAlign:'center', 
    borderRadius:'7.5px',
    color: '#fff',
    userSelect: 'none'
  }}
  tickLabels={false}
/>
```

[custom handler example](http://zippiui.github.io/react-slider/#customHandler)

## Styling the handlers 

If you want to apply different stlyes based on user interaction you have to use css classes. Let's say you want to add a different color to the handler when the slider is focused. In that case you can write a css selector to target specifically that state, like this:

```css
.my-react-slider .react-slide__handle:focus {
  background-color: red;
}
```

```jsx
<RangeSlider 
  className='my-react-slider'
  handleSize={{width:15, height:15}}
  handleStyle={{borderRadius:'50%'}}
/>
```

Start dragging on one of the handlers. Navigate by pressing tab to see how the background color changes:

[handle and css styling example](http://zippiui.github.io/react-slider/#cssClassesAndHandlers)