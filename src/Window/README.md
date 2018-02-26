react-window
============

## [x] Props

* captureTabNavigation: Bool - doen’t let focus leave window, when last element loses focus, first focusable node inside window is focused. Defaults to `false`, when window is a moda, has `modal` true, `customTabNavigation` defaults to `true`
* enableResizeProxy: Bool - whether to use a proxy when resizing. In this case `onSizeChange` will be called only when dragging stops. It can be customized with css, using `.react-window__proxy` selector. Defaults to `false`.
* visible: Bool - whether the window is visible. If true, `react-window--invisible` className will be added. Defaults to `false`.
* defaultVisible: Bool - uncontrolled version of `visible`, it changes when close (`x`) button is clicked.
* renderNullWhenInvisible: Bool - when `true` and `visible` is `false` the component will return `null` from render.
* onFocus: (event) => Void - called when one of it's children recives focus
* style: Object - inline style applied on root window root element
* className: String - className added on window root element
* shadow: Bool - whether to add a shadow. If true `react-window--shadow` className will be addded.
* borderRadius - inline border-radius style applied on menu, defaults to `0`
* url: String - if specified an iframe will be rendered inside the body of the window
* enableMoveProxy: bool - if true body will have display `none` when window is in `dragging` state.

## [x] Relative Position

* enableRelativeToViewportToggle: Bool - if true, a pin icon will be rendered in title bar, this will toggle `relativeToViewport` property
* relativeToViewport: Bool - whether window should have position `fixed`, defaults to `true`.
* defaultRelativeToViewPort: Bool - uncontrolled version of `relativeToViewport`
* onRelativeToViewportChange: (relativeToViewport) => void - called when `relativeToViewport` changes
* pinUpIcon: node - customize pin up icon
* pinDownIcon: Node - customize pin down icon
* renderPinButton: ({ domProps, relativeToViewport, props, toggleRelativeToViewport }) => Node

### [x] Modal
If window is a modal, it renders a wrapper (.react-window__modal-wrapper) that has the position same the same as window. To have a modal that overlays everything, make sure  `relativeToViewport` is set to `true`.

* modal: Bool - whether the window is a mode, defaults to `false`.

### [x] Size

* resizeHandles: Bool/String[] - if true, all the handles that apply to the current resize directions are visible. If String[], only the specified handles are displayed, so resizing can only be done via those handles
* size/defaultSize: { width, height }: Object|Number - controlled and uncontrolled props to control window size. When is a number, both dimensions are the same.
* resizeHandles: Bool/String[] - if true, all the handles that apply to the current resize directions are visible. If String[], only the specified handles are displayed, so resizing can only be done via those handles. Posibile positions are:
  - l - left
  - r - right
  - t - top
  - b - bottom
  - bl - bottom-left
  - br - bottom-right
  - tl - top-left
  - tr - top-right
* showHandlesOnOver: Bool - If `false` resize handles are displayed all the time, not only when the window is hovered , defaults to `true`.
* renderResizeHandle: ({domProps, handle, props}) => JSX|Null - custom render for handles. `domProps` can be mutated to add or modify props that get applied body icon.
* handleWidth: Number - in `px`, the size of the resize handlers, defaults to `5`
* mobileHandleWidth: number - in `px` the size of a handle
* handlesOutside: bool - whether to render resize handles outside or inside the window, on desktop defaults to `false`
* mobileHandlesOutside: bool - whether to render resize handles outside or inside the window, on desktop defaults to `true`
* handleStyle: Object - inline style applied on handle.
* resizable: Bool/Object { width, height } - defaults to false. If object, it is resizable only on the dimensions with `true` as value.
* keepAspectRatio: Bool - whether window to keep aspect ration while resizing, defaults to `false`
* aspectRatioPrecision: Number - to how many decimal to calculate aspect ratio, defaults to `5`.
* minSize/maxSize: String|Number|{ width: String|Number, height: String|Number } - specify min/max size for window (minWidth, minHeight). `minSize` defaults to `200`, and `maxSize` to null.

Note. `resizable` and `resizeHandlers` interact with one in other to determine what handlers are rendered. They both must validate an handler to be rendered.

```jsx
// E.g.
// In this case only `top` resize handler will be rendered, because only top is valid for both props.
<ReactWindow
  resizable={{ height: true }}
  resizeHandlers={['t', 'r']}
/>
```

#### [x] Events

* onResize: ({ width, height }) => Void - called when window changes size.
* onResizeStart: ({ width, height }) => Void - called when window starts to change size, when a handle starts to be dragged.
* onResizeStop: ({ width, height }) => Void - called when resize stops.

###  [x] Maximized

* maximizable: Bool -wether the window can be maximized, if true it will render a `maxmize` icon in top right, defaults to `false`
* maximized: Bool - whether the window is maximized
* defaultMaximized: Bool - uncontrolled version of `maximized`
* maximizeOnDoubleClick: Bool - whether to toggle `maximized` when title is double clicked
* restoreIcon: Node - customize restore icon, `domProps` can be mutated to add or modify props that get applied body icon.
* onMaximizeChange: (maxmized: Bool) => Bool - uncontrolled version of `maximized`
* onMaximize: () => Void - called when `maximized` changes to `true`
* onRestore: () => Void - called when `maximized` changes to `false`
* maximizeIcon: Node - customize maximize icon
* renderMaximizeButton: ({ domProps, maximized, toggleMaximized, restore, maximize }) => Node - custom render for maximize and restore button


## [x] Collapsible

* collapsible: bool
* onCollapse: () => void
* onCollapseChange: (collapse) => void
* onExpand: () => void
* collapseIcon: node
* expandIcon: node
* renderCollapseButton: ({ domProps, collapsed, props, collapse, expand }) => node
* collapsed
* defaultCollapsed

## [x] Closeable

* closeable: Bool - defaults to false. If true, will render a close icon.
* onClose: () => Void - called when closeButton is clicked
* renderCloseButton: ({domProps, props, close}) => Node
* closeIcon: node

### [x] Position

* position/defaultPosition: { top?: Bool, bottom?: Bool, left?: Bool, right?: Bool } - controlled and uncontrolled props for setting position
* draggable: Bool|{ horizontal: Bool, vertical: Bool} - wether the window can be moved, defaults to `true`. Window can be conditioned to move only on vertical or horizontal axis.

#### Position events

* onPositionChange: ({ left?, right?, top?, bottom? }) => Void - called when window is moved eather by dragging or by resizing window.
* onMoveStart: ({ left?, right?, top?, bottom? }) => Void - called when window starts moving. If no `position/defaultPosition`, first time window is moved it will return `null`.
* onMoveStop: ({ left?, right?, top?, bottom? }) => Void - called when window stops moving.

#### Note

Window can be positioned with any of the four sides (top, left, right, bottom). Only positions set in `position/defaultPosition` will be used to position the window.
If positions for one direction are not set they will default to `left` and `right`.

e.g.

* 1. `position: { top: 100, bottom: 200 }` will use `top` and `bottom` to positon
* 2. `position: { top: 100, bottom: 200 }` will use `top`, `bottom` and `left` to positon


### [x] Centered

* centered: Bool - whether the window is centered. When is controlled and `true` draggint the title will not cause the window to change.
* defaultCentered: Bool - uncontrolled version of centered
* onCenteredChange(Bool) => Void - called when the centered changes. When a window is centered, when window is dragged/resized, onCenteredChange(false) will be called.
* keepCenteredOnResize: Bool - whether when resizing window should keep it's centered position. When true, when a resize handle is dragged, the window will resize also in the opposite direction. When false, it will change dimension only in the direction dragged. Also position can change if a handle in a direction used for positioning is dragged (e.g If default position is { left: 200}, and left handle is dragged 10px, the size of the window changes and new position will be { left: 190 }). Defaults to `true`.

### [-] `position` and `size` constrains

Diaglog's size and position can be constrained to a particular region using `constrainTo`. To handle region logic, `react-window` uses `region` npm package

* constrainTo: Region|selector:Object|node:DomNode - select region to which window's size and position is constrained.
* constrainTitleOnly: Bool - whether only the title or the whole window is constrained to `constrainTo`

Window size and position can be modified by `constrainTo`. There are two cases in which `constrainTo` can influence position/size:
- when it mounts and it doesn't fit into `constrainTo`
- when window changes size and window no longer fits into `constrainTo`

* keepPositionOnConstrain: Bool - whether position doesn't change when it doesn't fit inside `constrainTo`, defaults to `false`
* keepSizeOnConstrain: Bool - whether window changes size to fit into `constrainTo`
* constrainOnWindowResize: Bool - whether to change window size and position when window changes size, defaults to true
* constrainOnWindowResizeDelay: Number - throttle how frequent window should check if it fits into it's container when window changes size
* constrainOnWindowScroll: Bool - whether to change window position when window changes size, defaults to true
* constrainOnWindowScrollDelay: Bool - whether to change window position when window changes size, defaults to true



### [x] Titlebar

* title: JSX|(domProps, panelProps) => {} - title to display on Panel.
* titleBarPosition: 'top'|'left'|'right'|'bottom' - title bar position
* titleAlign: 'start'|'center'|'end' -  Other supported values: ‘left’ and ‘right’ are just aliases for ‘start’, ‘end’, defaults to `null`.
* titleRotate: 90|-90 - set rotate direction when `titleBarPosition` is `left` or `right`. Defaults to:
 *  `90` when `titleBarPosition` is `right`
 * `-90` when `titleBarPosition` is `left`.
* bodyStyle: Object - overwrites the inline-style on body
* bodyClassName: String - className added on body/content wrapper
* children: JSX|(props) => JSX - if children is a function it will be called with props.

#### [x] Title

* titlePosition: 'end'|'start' - set relative position to toolbar, defaults to `end`.
* titleIcon: Node - icon added at the start of title
* title: JSX|(domProps, panelProps) => {} - title to display on Panel.
* titleClassName: String - className added on title
* titleBarPosition: 'top'|'left'|'right'|'bottom' - title bar position
* titleAlign: 'start'|'center'|'end' -  Other supported values: ‘left’ and ‘right’ are just aliases for ‘start’, ‘end’, defaults to `null`.
* titleStyle: Object
* titleRotate: 90|-90 - set rotate direction when `titleBarPosition` is `left` or `right`. Defaults to:
 *  `90` when `titleBarPosition` is `right`
 * `-90` when `titleBarPosition` is `left`.
* toolbarButtons: Node[]/Node - icons added at the start of toolbar controlls

 ### [x] Body

 * bodyStyle: Object - overwrites the inline-style on body
 * bodyClassName: String - className added on body/content wrapper
 * bodyPadding: Number - body padding
 * bodyBorder: String - inline property for body border
 * children: JSX - content inside body
 * renderTitleBar: (domProps, props) => JSX/JSX/false - if false, no title bar will be rendered - come up with some drag utility that can be reused. also as a named export. `domProps` can be mutated to introduce/modify props applied on `titleBar`.
 * bodyScrollable: Bool - whether the body adds scrollbars when content doesn't fit. Defaults to `true`.


### [x] Custom renderers
* renderBeforeTitle: (props) => JSX - can be used to render different icons/jsx in the title bar before the title text
* renderAfterTitle: (props) => JSX - can be used to render different icons/jsx in the title bar after the title text
* renderBody: (domProps, props) - control render of body. `domProps` can be mutated to add or modify props that get applied body wrapper.
* renderBody: (domProps, props) - control render of body. `domProps` can be mutated to add or modified props that get applied body wrapper.
* renderFooter: (props) - render hook after body
* renderToolBar: (domProps, props) => JSX|null - control render of toolbar, `domProps` can be mutated to add or modified props that get applied body wrapper.
* renderAfterTitle: (props) => JSX - by default it renders a toolbar with icons for close and maximize, it can be overwriten or domProps can be changed to render default `toolbar` with different props.

### [x] Panel props

Window renders a panel inside. Any props valid there are valid here with the following changes:

## Methods
* bringToFront() -> this - brings window on top of the other windows.
* sendToBack() -> this - sends window at the end of windows.
* bringForwards() -> this - send window one level up
* sendBackwards() -> this - sends window one level down
* maximize() -> this - sets `maximized` to `true`
* restore() -> this - sets `maximized` to `false`
* center() -> this - sets `centered` to `true`
* close() => Void - triggers `onClose` and if visible is uncontrolled changes it to `false`
* show() => void - triggers `onShow` and if visible is uncontrolled changes it to `true`
* collapse()
* expand
* center
* setPosition
* setSize

## Navigation
Size and position can be changed with arrows

Escape key calls `onClose`.

* enableKeyboardPositionChange: bool - enable position change with arrow keys
* enableKeyboardSizeChange: bool - enable size change with arrow keys + ctrl key
* keyboardPositionChangeStep: Number - in px, the size of the position change, defaults to `10`
* keyboardSizeChangeStep: Number - in px, the amount of the size change, defaults to `10`

## Animation when `visible` changes

- transition: Bool - whether the window should animate opacity when it changes `visible` prop
- showTransitionDuration: Number - in ms, duration of show animation, defaults to `600`
- hideTransitionDuration: Number - in ms, duration of hide animation, defaults to `200`
- maximizeTransition: Bool - whether maximize/restore should have be animated

## Note about Position, Size live change
By default window is moved/resized by manipulating the DOM, to increase performance.
When move/resize stops it causes a rerender and style is set from react.
To trigger render on each move/resize set `useDirectDomPositionSizeChange` to `false`.

- rtl !

## LICENSE

#### [Apache2](./LICENSE)
