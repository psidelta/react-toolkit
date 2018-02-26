# react-overlay

## Gemeral

- captureTabNavigation: Bool - doen’t let focus leave overlay, when last element loses focus, first focusable node inside overlay is focused. Defaults to false, when overlay is a modal, has modal true, customTabNavigation defaults to true.

## Target
- target: String|DOMElement|null - selector or dom element, on which to listen for events and against overlay should position itself.

When target is `undefined`, it use as a target it's direct parent.

### Usage

```jsx
  // target - string
  // tooltip is shared for all elements that match this selector
  <Tooltip target=".tooltip" />
  <button className="tooltip" data-tooltip="This is a ok action">Ok</button>
  <button className="tooltip" data-tooltip="This is a cancel action">Cancel</button>


  // target a dom element
  <Tooltip target={document.getElementById('okButton')} />
  <button id="okButton" data-tooltip="This is a ok action">Ok</button>

  // target it it's parent, usecase whe it is used a popover
  <button id="okButton">
    <Tooltip>
      This is a okAction
    </Tooltip>
    Ok
  </button>
```

## Content/Children
- children: JSX|(childrenParams) => JSX

`childrenParams` is an object with the following keys:
 - targetNode: DOMElement
 - visible: Bool

If children are not set, it will render the `data-tooltip` attribute set on target.
`data-tooltip` can be an html string.

`data-tooltip`: String - added on target node, it is used as defaut for `children`.

### Usage

**data-tooltip**

```jsx
  <Tooltip target=".tooltip" />

  <button className="tooltip" data-tooltip="<div style='color: red'> Tooltip Text </div>">push</button>
```


**children as jsx**
```jsx
  <Tooltip target=".tooltip">
    Jsx for tooltip
  </Tooltip>

  <button className="tooltip">push</button>
```

**children as function**
```jsx
  <Tooltip>
    ({ targetNode, visible }) => {
      if (targetNode) { // will be null when there is no active node
        return targetNode.dataset.valueSetOnDataAttr
      }
    }
  </Tooltip>
```

## Style
The component is made of three elements.
The wrapper, a div to hold the content and an arrow.
The arrow sits between the wrapper and the content div.
The wrapper has only a border, the same border that is applied on the arrow.
To add border radius, add both border radius value on content and on wrapper.

- className: String - className added on wrapper
- background: String - background color, same color will be used for arrow
- padding: Number - in px added on content
- contentClassName: String - className added on content div
- style: Object - inline style applied on wrapper
- contentStyle: Object - inline style applied to content div
- border: String - inline border style added on wrapper and arrow
- height: Number - used as height inline style, default to `null`
- width: Number - used as width inline style, default to `null`
- minSize/maxSize: String|Number|{ width: String|Number, height: String|Number } - specify min/max size for window (minWidth, minHeight). `minSize` defaults to `200`, and `maxSize` to null.
- zIndex: Number - inline css zIndex style, defaults to `100`

## Visibility
Visibility of the component is controlled by `visible` prop. This prop is toggled when uncontrolled by `showEvent` and `hideEvent`. Common events in `showEvent` and `hideEvent` will toggle `visible`.

- visible: Bool -  whether the it is visible, this value when uncontrolled is toggled by `hideEvent, showEvent`
- defaultVisible: Bool - uncontrolled `visible`, defaults to `false`
- hideOnClickOutside: Bool - whether to hide on click outside the component, defaults to `true`
- hideOnEscape: Bool - whether to hide when escape key is pressed, defaults to `true`
- showEvent: String|String[] - event to listen on target, when triggered it will show the component, defaults to `['mouseenter']`
- hideEvent: String|String[] - event to llisten on target, when triggered hides the component, defaults to `['mouseleave']`
- hideOnScroll: Bool - calls onDismiss when window scrolls, defaults to `false`
- hideDelay|showDelay: Number: time, in ms, from when the event is regitered until `visible` change is triggered

Note. If Mouseleave is used as `hideEvent`, as this is the usual use case, when
entering the overlay with the mouse it will trigger onShow (so onHide will be canceled),
and `onHide` when mouse leaves the overlay

## Arrow
- arrow: Bool - whether to render an arrow, defaults to `true`
- arrowClassName: String - class added on arrow
- arrowStyle: Object - inline style applied on arrow
- arrowSize: Number - width and height of the arrow, default to 11.

## Animation
Overlay changes opacity when it's visibility changes.

- fade: Bool - enable/disable fade trasition while it changes visibility, defaults to false.
- fadeDuration: Number - animation duration in ms, defaults to `300`. If specified, and no `fade` (bool) is specified, `fade` is considered to be true.
- fadeInDuration: Number - in ms, defaults to `fadeDuration`
- fadeOutDuration: Number - in ms, defaults to `fadeDuration`
- fadeTransitionFunction: String - css transition timing function, defaults to `ease`.
- fadeInTransitionFunction/FadeOutTransitionFunction: String - defaults to `fadeTransitionFunction`

## Events
- onFadeInStart|onFadeOutStart: (props) => void - called when fade transition starts
- onFadeInEnd|onFadeOutEnd: (props) => void - called just when fade transition is over

- onHide: (props) =>  void - called after hideDelay has elapsed
- onShow: (props) => void - called after `showDelay` has elapsed
- onVisibleChange: (newVisible: Bool) => void - called when visibility changes, after `showDelay` and `hideDelay`

## Position
- positions: String|String[] - specify position of the overlay. If an array of positions are provided, the overlay will try them one by one to check if it fits in `constrainTo` (by default in viewport).
- relativeToViewport: Bool - whether overlay should use `fixed` position, defaults to `true`. If `false` it will use absolute position.
- updatePositionOnScroll - whether to trigger position change when window scrolls, this is usefull when `relativeToViewport` is `true` for overlay to keep it's position relative to the target. Defaults to `false`.

Position is set using two substrings joined by a `-` caracter. First substrig represents which side of the overlay should align to which side of the target.

**Posible substring values are:**
- tc - top center
- tl - top left
- tr - top right
- rc - right center
- bc - bottom center
- br - bottom right
- bl - bottom left
- lc - left

There are 4 common predefined aliases for this positions:
top, left, right, bottom.

Posible values are:

top
- bc-tc - top
- bl-tl - top aligned left
- br-tr - top aligned right
- br-tl - top left

right
- lc-rc - right
- tl-tr - right aligned top
- bl-br - right aligned bottom
- tl-br - bottom right

bottom
- tc-bc - bottom
- tl-bl - bottom aligned left
- tr-br - bottom aligned right
- tr-bl - bottom left

left
- rc-lc - left
- tr-tl - left aligned top
- br-bl - left aligned bottom


Defaults to above values in order.

**Offset**
- offset: Number|Number[]|{ x: Number, y: Number }[] - set distance from target, defaults to 10.
The offset is ajusted for each position. For example:
- offset of 10 for position top, will only influence the y axis, by positioning the overlay 10px above the target
- offset of { x: 10, y: 10} for position left, overlay whould be posinioned 10 px from the target in the left direction and 10px down.

## Methods
show - triggers visible change to `true`
hide - triggers visible change to `false`
