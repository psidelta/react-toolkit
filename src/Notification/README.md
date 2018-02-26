# Notification


## Usage
When a NotificationBoard is mounted it registers it self under the global variable,
window.zippyui.notification.id, where `id` is the `id` prop set on Notification.

Using this global or a ref, notifications can be added.

There can be multiple NotificationBoards rendered. A notification board cannot have more than one region.


```js
import NotificationBoard from 'react-notification'

render() {
  <div>
    <button onClick={this.addNotification}>Add Notification</div>

    <NotificationBoard
      ref={node => this.notificationBoard = node}
      id="main"
      closeButton
      autoCloseDelay={3000}
    />
  </div>
}

addNotification() {
  // via global
  zippyui.notification.main.addNotification({
    // notifications props
  })

  // via ref
  this.notificationBoard.main.addNotification({
    // notifications props
  })
}

```

## Props

There are two pieces to configure, the `NotificationBoard`, and the `Notification`.
The Notification can have props that are unique for it, and some props that will be used
as defaults for `Notification`.

Notification cannot be instantiated directly. To add a notification you have to use `addNotification(notificationProps)`. This method creates a new Notification with passed `notificationProps` that are merged over the defaults set on `NotificationBoard`.

Props that are related to `region` can be added only on NotificationBoard, because it can be only one reigon per NotificationBoard.

- Props that can be added only on `NotificationBoard`
  - region
  - regionOffset
  - stackingWrap
  - maxNotificationsPerStacking

### General

- autoHideDelay: Number - time after which the notification hides, it triggers `onHide`, defaults to `2000`.
- delayAutoHideOnMouseOver: Bool - whether when mouse over `autoHideDelay` is delayed until mouse leaves notification.
- cancelAutoHideOnClick: Bool - whether to cancel `autoHideDelay` when notification is clicked, defaults to `false`.
- clearOpacityOnMouseEnter: Bool - if true and opacity is set, when mouse enters the notification opacity is changed to `1`. Defaults to `true`.
- hideOnClick: Bool - whether to trigger `onHide` when Notification is `clicked`, defaults to `false`
- nonBlocking: Bool - whether to allow events to pass through, e.g. when clicked the click should register on the elemenet behind the Notification. Defaults to `false`.
- id: String - id under which it can be globally accessed the NotificationBoard, defaults to `main`.
- removeOnHide: Bool - whether to remove the notification object from memory after the notification hides, when defaults to `true`.
- rtl: Bool - defaults to `false`
- maxNotificationsPerStacking: Number - maximum number of notifications per stacking, it can be set only on NotificationBoard.
- relativeToViewport: Bool - whether to use fixed posiiton or absolute.

### Subcomponents
- title: JSX|(titleProps, props) => JSX - title of the notification, titleProps can be mutated to add new or change existing props that are added on title.
- titleEllipsis: Bool - if the title doesn't fit on one line it will be truncated, defaults to `true`
- closeButton: JSX|(buttonprops, props) => JSX|null - custom close button, buttonProps can be mutated to add or modify props that get applied body icon.
- pinButton: JSX|(buttonprops, props) => JSX|null - custom pin button, buttonProps can be mutated to add or modify props that get applied body icon.
- icon: JSX - displayed next to the title
- content: JSX - content of the notification

### Animation

show/hideAnimation supports any animation from zippy-animation

- moveTransition: Bool - whether the notification should reorder with a transition when it changes position. It can change position when a notification is added to the beginning of the stack or when a notification is removed.
- showAnimation: Bool - whether to animate with fadeIn when notification is added
- hideAnimation: Bool - whether to animate with fadeOut when notification hides
- showTransitionDuration: Number - in ms, duration of show animation, defaults to `600`
- hideTransitionDuration: Number - in ms, duration of hide animation, defaults to `200`

## Style
- style: Object - inline style
- border: String - border style
- background: String - css background
- padding: Number - css padding
- height/width: Number - css height and width
- minSize/maxSize: String|Number|{ width: String|Number, height: String|Number } - specify min/max size for window (minWidth, minHeight). minSize defaults to 200, and maxSize to null
- opacity: Number - css opacity
- borderRadius: Number|String - inline style for border radius, defaults to `0`.

### Stacking

There can be multiple stacks, they will overlay one another.

- offset: Number|{ top, left, top, bottom } - space between notification
- stackingWrap: bool - wether to start a stacking on next direction when the main direction is full, defaults to `true`. This can be added only to `NotificationBoard`.
- push: 'start'|'end' - when a new notification where it should be added, at the beggining of the stack or at the end.
- maxNotificationsPerStacking: number - maximum number of notifications per stacking

Stacking defines how notifications are stacked. It defines the two axes on which they
stack. First direction tells that is should first stack in that direction, when they don't fit
any more they start a new row/column in the second direction.

- stacking: 'top', 'left', 'bottom','right'[]|'center' - stacking direction. There always must be specified two directions, e.g `['bottom', 'left']`, it will stack from top to bottom and from right to left.

```
['top', 'right']
+----------------------------------------->
| +-----+ +------+
| |     | |      |
| +-----+ +------+
| +-----+
| |     |
| +-----+
| +-----+
| |     |
| +-----+
|
v first direction


['right', 'bottom']
             first direction
+----------------------------------------->
| +-----+ +------+ +-----+ +-----+ +-----+
| |     | |      | |     | |     | |     |
| +-----+ +------+ +-----+ +-----+ +-----+
| +-----+
| |     |
| +-----+
|
|
|
|
v


['top', 'right']

 ^
 |
 |first direction
 |
 |
 +------------>


['righ', 'top']

 ^
 |
 |
 |
 |         first direction
 +------------>


['down', 'left']

 <------------+
              |
              | first direction
              |
              v


['left', 'down']

  first direction
   <------------+
                |
                |
                |
                v


['left', 'down']

  +------------->
  |        first direction
  |
  |
  v


 ['down', 'left']

   +------------->
   |
   |
   |
   v first direction


 ['top', 'left']

                 ^
                 |
                 |
                 |  first direction
                 |
  <--------------+


['left', 'top']

                 ^
                 |
                 |
                 |
                 |
  <--------------+
       first direction
```

e.g When stacking is `bottom-left` and notifications shoud be rendered 20 px from top and 30 from right, `regionOffset` should be set to `{ top: 20, right: 30 }`


### Stacking on center
When stacking on center there cannot be wrapping. Posible values for center are:
- ['top', 'center']: stacks from top to bottom centered.
- ['bottom', 'center']: stacks from bottom to top centered.
- ['left', 'center']: stacks from left to right centered.
- ['right', 'center']: stacks from right to left centered.


## Region

There can be only one region per NotificationBoard.

- region: selector: String, node: DOMElement - region in which notifications are rendered, it can be set only on NotificationBoard.
- regionOffset: Number|{ top, left, top, bottom } - use to add an offset to the region, it can be set only on NotificationBoard.


## Methods
- getNotifications => notifications[] - returns an array of notification descriptor objects
- addNotification(description) => notificationId|Null - adds a notification using the description passed, this description is merged over the default props that come from `NotificationBoard`. It returns the id of the added notification. The id can be used to retrive the notification with `getNotification`. An `id` can be provided in the description object, if is not one is provided.
- removeNotification(id) => Bool - returns true if the id is valid
- getNotification(id) => Notification - returns a reference to the notification
- closeNotification(id) => Bool - returns true if id is valid
- showNotification(id) => Bool - returns true if the id is valid
- hideAll: () => null - hides all notifications
- removeAll: () => null - removes all notifications including those already closed
- getNotificationInstance(id) => Notification - returns the instance of the notification

## Methods on Notification
close: () => Bool - closes the notification, but it is still present in the notification list
show: () => Bool - makes the notification visible
hide: () => Bool - remove the notification from the list

## events
onShow: (id) => Void -  when a notification changes visible prop to `true`
onHide: (id) => Void -  when a notification changes visible prop to `false`, but is not removed from dom
onClose: (id) => Void - when a notification is closed, in this case the notifiaction is removed

## close vs hide
hide/onHide - this referes for when Notification changes `visible` prop
close/onClose - close triggers onClose, on this event it tells the NotificationBoard that is should not be rendered, that it should render null for this Notification. For the Notification to be complety removed (it's description) removeOnHide must be true
