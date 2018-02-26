# Values

As with most react input components, the slide can be initialised in either the controlled or uncontrolled state.

If we want to use the component in the controlled state we need to specify a
value prop, and then update that value based on our business logic.

## Listening to changes

### onChange

Similar to a standard change event, the `onChange` callback will take a function
and run it when the value of the slider has changed. If we are in a controlled instance, the change event will fire without updating the value of the input, leaving that responsability to the logic of the parent which needs to update the input value via the `value` prop.

```jsx

handleChange (value) {
	console.log('change', value);
	this.setState(value);
}

<span>Value from slider: {value}</span>
<Slider value={this.state.value} onChange={handleChange}/>

```

[see controlled slider example](http://zippiui.github.io/react-slider/#controlledSlider)

### onDrag

If you also want to do something wile the user is dragging the handlers, you can use `onDrag` which is similar to `onChange` but gets triggered more often. It takes the same parameter, the `value`. It's not a good idea to set the value during the drag, unless you are simply passing the value of drag back to the component.

### onDragStart, onDragEnd

Called when dragging starts or ends.
