# Button

## Description

```jsx
  var Button = require('react-button')
  <Button onClick={() => handleClick} >Export</Button>
```

## Props

Prop | Type | Default | Description
--- | --- | --- | ---
ellipsis|Bool|true|whether the text inside the button should have ellipsis
disabled|Bool|false|whether the button is disabled
pressed|Bool|-|whether the button is pressed, it can be used as a toggle button, see `Toggle` section
defaultPressed|Bool| uncontrolled version of pressed
href|String|-|a href to navigate to when the button is clicked, if specified will render an anchor tag `a`
align|'start', 'end', 'center'|'center'|where to align content inside button
rtl|Bool|false|right to left
icon|JSX/(props) => JSX| icon rendered rendered in position specified by `iconPosition`
iconPosition|'top', 'bottom', 'start', 'end'|'left'|position of the `icon`
tagName|String/ReactClass|-|tag used to render the component. If `href` is specified, it will default to `a`. If `icon` is specified or verticalAlign is 'top' or 'bottom', `div` is used, since there are issues with buttons having flexbox attributes. Otherwise, `button` tags are used.
verticalAlign|String|'middle'| Value for vertical align. Possible values: 'top', 'middle', 'bottom' and 'center', which does the same as 'middle'. If `tagName` is 'button' and verticalAlign != 'middle', will change the tagName to a 'div', and add a default tabIndex of 0.
overflow|Boolean|-| Bool prop whether to make the button overflow or not. If ellipsis is specified, it will win over this prop. Ellipsis behaves as if this is set to true.
wrap|Boolean|-| Bool prop whether to make the button white-space wrap or not. If ellipsis is specified, it will win over this prop. Ellipsis behaves as if this is set to false.
showWarnings|Boolean|true in development, false in production| Bool that controls the printing of warning messages.
onClick|(props) => void|-|on click event handler
onToggle|(pressed: Bool, event) => void|-| called on a button that specifies either `pressed` or `defaultPressed` (as boolean values), this is called before `onClick`
onActivate|() => void|-|called on mousedown on button - button becomes active
onDeactivate|() => void|-| function called on mouseup - button becomes inactive
style|Object/(props, state) => {}|-| inline style applied on button. Fore advanced styling that takes into account hover, disabled and other states use `style` as a function
overClassName|String|-|a css class to be applied when the mouse is over the button
activeClassName|String|-| a css class to be applied when the mouse is pressed on the button (the button is in active state)
focusedClassName|String|-|a css class to be applied when the button is focused
disabledClassName|String|-| a css class to be applied when the button is disabled
pressedClassName|String|-| a css class to be applied when the button is pressed
style|Object|-| default style
disabledStyle|Object|-|style to be applied when the button is disabled. If disabled, no other over/active/pressed styles are applied.
pressedStyle|Object|-|style added when button is pressed (`pressed` is `true`)
focusedStyle|Object|-| style added when button is focused
overStyle|Object|-| style applied when mouse is over button
activeStyle|Object|-| style to be applied on active button (mousedown over button)

### Toggle

Can also be used as a toggle button:

```jsx
var pressed = true
function toggle(){
	pressed = !pressed

	//now re-render
}
//controlled behavior
<Button pressed={pressed} onClick={toggle}/>

//uncontrolled
<Button defaultPressed={true} pressedStyle={{color: 'blue'}} />
```


## LICENSE

#### [Apache2](./LICENSE)
