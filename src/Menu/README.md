react-menus
===========

> A carefully crafted menu for React


## Usage

```jsx
var items = [
    {
        label: 'hello',
        onClick: function(itemProps, index, event) {
            console.log('well, hello')
        }
    },
    '-', // show separator
    {
        label: 'hi'
    },
    {
		label: 'export',
		disabled: true
	}
]

function onClick(event, props, index){

}

<Menu items={items} onClick={onClick}/>
```

For rendering separators, just use a `'-'` in the items array.

## Props

### Global
* items: Object[] - an array of objects that describe an menu item
* onClick: Function(event, props, index) - Called on a click on a direct menu item. For clicks on menu items at any level of nesting, use `onChildClick`
* dismissOnClick: Bool - whether when an item is clicked in a subMenu, the submenu closes
* onChildClick: (event, props) - Called when a menu item at any level of nesting was clicked
* columns: String[]|Object[] - defaults to ['label']
* expander: Bool|React.Node|(props) => JSX - an expander tool to use when a menu item has other subitems. Defaults svg arrow.
* visible: Bool - whether the menu should be visible, if is set to false it will have the css propetry 'visibility: hidden', defaults to true
* shouldComponentUpdate: (this, nextProps, nextState) => bool - overwrite default shouldCOmponentUpdate, by defalt it uses shallowequal.
* enableAnimation - whether **submenu** has an animation when is rendered, defaults to `false`
* fadeDuration: Number - in ms, duration of fade in animation, defaults to 300
* fadeTransitionFunction: String - fade in transition function, defaults to `ease`
* enableRootAnimation: Bool - whether the root menu should have animation when mounting, defaults to `false`
* rtl - Bool - whether the menu is right-to-left, defaults to `false`
* enableKeyboardNavigation: Bool - whether to enable keyboard navigation, defaults to `true`
* simulateClickOnEnterKeyPress: bool - whether to simulate click when `Enter` is pressed on a focused item.
* autoFocus: Bool - whether the menu should receive focus on first render, defaults to `false`
* disableScroller: Bool - disable scroller, defaults to `false`
* tableClassName: String - the menu is implemented using `table`, this is added as className on the table, defaults to 0
* showSubMenuDelay: Number - delay in ms from when mouse has entered an item with submenu until the submenu is rendered, defaults to 0
* hideSubMenuDelay: Number - delay in ms from when mouse has left an item until it's submenu is hidden, defaults to 0
* inTriangleWaitDelay: Number - delay in ms in which the smart triangle algorithm is valid, see *Smart submenus* section, defaults to `350`.
* padding: Number/String - inline padding added on root element, defaults to null
* submenuProps: Object - props added on submenu

### Items

For every item in the items property, a row will be rendered, with all the columns specified in `props.columns`.

Item can have the following attributes:
* onClick(event, itemProps, index) - called when an item is clicked
* disabled: Bool - whether the menu item is disabled, in this case a `onClick` is not registered
* style: Object -  applied on menu item, overwrites `itemStyle`
* className: String -  applied on menu item - ie, on the 'tr'
* overStyle: Object - applied when menu item has hover, overwrites `itemOverStyle`
* overClassName: String - applied when menu item has hover
* disabledStyle: Object - applied when menu item is disabled, *disabled* prop or attribute is true, overwrites `itemDisabledStyle`
* disabledClassName: String - TODO to implement
* expandedStyle: Object - applied when menu item is expanded, overwrites `itemExpandedStyle`
* expandedClassName: String - TODO to implement
* cellStyle: Object - overwrites global `cellStyle`
* cellClassName: Object - applied to all cells in this item
* expander: String/JSX - overwrites global expander
* isTitle: Bool - mark the item as a title; a title cannot be clicked, navigation jumps over it
* secondaryLabel: Node - if this key is set on the item a new column will be introduced, the text in this column will have a lighter color.
* icon: Node - if specified a column will be introduced at the beginning of the item
* menuProps: Object - props to configure the submenu for this item

* secondaryLabelStyle: Object - inline style applied on `secondaryLabel`
* labelStyle: Object - inline style applied on `label`
* titleStyle: Object - inline style applied on the row (`tr`) that has `isTitle=true`


Every **column** displays the value in item[&lt;column_name&gt;]. Or it can be an object with the following properties:
* name: String - name of property from item to render
* style: Object|({ item, items, index, columns }) -> style: Object - style object applied on the column (on every cell belonging to this column), it is overwritten, if the item has a style prop
* className: String - className applied on the column cells. It is appended to the existing classNames the column cells may already have.
* colSpan: Number - set colSpan n on column
* align: 'start', 'end', 'center', 'left', 'right' - inline text-align style appled on column
* render: (item, { column, columns, item, index }) - if defined, instead of rendering item[columnName], the column.render function is called

#### Separator

Separators can be added by adding `-` string, instead of an object.

### Styling

* style: Object - style applied on root menu and not on submenus
* submenuStyle: Object - style applied on submenu
* itemStyle - style to be applied to menu items.
* itemOverStyle - style to be applied to menu items on mouse over. Overrides `theme.overStyle`
* itemActiveStyle - style to be applied to menu items on mouse down on the item. Overrides `theme.activeStyle`
* itemExpandedStyle - style to be applied to menu items when the item is expanded. Overrides `theme.expandedStyle`
* itemDisabledStyle - style to be applied to disabled menu items.
* cellStyle - style to be applied to menu item cells (expect the expander cell).
* itemHeight - inline height style added on menu item
* menuSeparatorStyle - style applied on separator
* itemFocusedStyle
* itemOverFocusedStyle
* border - inline border style applied on menu, defaults to `null`
* borderRadius - inline border-radius style applied on menu, defaults to `0`
* minSize/maxSize: String|Number|{ width: String|Number, height: String|Number } - specify min/max size for window (minWidth, minHeight). minSize defaults to 200, and maxSize to null

### Scrolling
If menu is taller than it's scrollHeight, it will have scroll bars and arrows.

* maxHeight: Number - maximum height of the menu in px
* submenuMaxHeight: Number - maximum height of sumenu in px
* scrollProps: Object - props object passed to react-scroll-container
* scrollOnMouseEnter: bool - whether to scroll when mouse is over arrow

```jsx
<Menu maxHeight={200} items={items}/>
```

### Navigation

If `enableKeyboardNavigation` is `true` menu can be navigated using arrows.
Enter key press a focused item will trigger a `onClick` event.

##### Custom arrows
Navigation arrows can be customized using render function, either by returning JSX or by modifying the props. In this case mutating props is allowed as it is a shallow copy of the actual props.

* renderScroller: (props: Object, direction: 1|-1) => JSX | null

Props can have the following attributes:
* className: String - applied on arrow button
* size: Number - the size of the svg arrow, it will set the height and size, defaults to 17
* fill: String - valid color for arrow, added on the svg, defaults to `#000`
* svgProps: Object - props added on scroll arrows (up and down)
* buttonProps: Object - button props


### Smart submenus

Showing and hiding submenus is implemented with a smart algorithm, as described [here](http://bjk5.com/post/44698559168/breaking-down-amazons-mega-dropdown). If you leave an item that has a submenu, and the mouse is moving towards it, the submenu will not close event if the mouse has moved out of the item.
The `inTriangleWaitDelay` prop specifies the delay in ms, in which the triangle algorithm is taken into calculation. If `inTriangleWaitDelay` is falsy, this optimization is not used.
Also submenu positioning is made taking into account the available space.


### Single and multi selection
Menu supports single and multiple selection.

For single selection define items, the same you would radio inputs, give them the same name (`nameProperty`), and a value (`valueProperty`).

```js
  <Menu
    selected={{
      country: 'ro'
    }}

    items={[
      { name: 'country', value: 'ro' },
      { name: 'country', value: 'de' },
      { name: 'country', value: 'es' },
      { name: 'country', value: 'uk' },
    ]}
  />
```

For multiple select define items that have different name (`nameProperty`)
```js
<Menu
  selected={{
    bold: 'bold',
    italic: 'italic',
  }}
  items={[
    { name: 'bold' },
    { name: 'italic' },
    { name: 'strikethrough' },
  ]}
/>
```

A menu can have items that have single and multiple selection.

```js
  <Menu
    selected={{
      country: 'ro',
      bold: 'bold',
      italic: 'italic',
    }}
    onSelectionChange={(newSelection) => {
      console.log(newSelection)
    }}
    items={[
      { name: 'country', value: 'ro' },
      { name: 'country', value: 'de' },
      { name: 'country', value: 'es' },
      { name: 'country', value: 'uk' },
      { name: 'bold' },
      { name: 'italic' },
      { name: 'strikethrough' },
    ]}
  />
```

#### Props that can be added only on Menu

Prop | Type | Default | Description
--- | --- | --- | --
enableSelection|Bool|false|whether to enable selection
browserNativeSelectInputs|Bool|false|whether to use browser native inputs for `radio` and `checkbox` controls
nameProperty|String|'name'|the name of the item by which it is identified when selected
valueProperty|String|'value'|used in case of single selection to atribute a value to the selected item
selected|{ [item[nameProperty]: item[valueProperty/nameProperty] }|-|selected state
defaultSelected|{ [item[nameProperty]: item[valueProperty/nameProperty] }|-|uncontrolled version of `selected`
selectOnClick|Bool|true|whether to trigger selection when item is clicked

#### Props that can be added on Menu and on Item, the item overwrites the global prop

Prop | Type | Default | Description
--- | --- | --- | --
renderCheckInput|({ checked, onChange, domProps }) => JSX|-|custom renderer for check input, to customize return JSX or mutate domProps
renderRadioInput|({ checked, onChange, domProps }) => JSX|-|custom renderer for radio input, to customize return JSX or mutate domProps
selectionInputPosition|'start','end'|'start'|position of the selection input


### Use menu as a context menu, pop-up

In this case menu can have a smart behavior, it can be constrained to a specific region and it's position
can be determined dynamic relative to a given point/area.

* constrainTo: Object | Node | Selector: String - a range, a node or a string selector, to which the submenu is constrained. Used to calculate whether it fits in the region. Defaults to undefined.
* alignTo: Function(node) | Object | Node | Selector:  a range, node or string selector, for the menu to align to. This prop can be used to create a pop-up menu (see example), using the region generated from this prop it will add left and right on the Menu.
* alignPositions: String[] - a string specifies how the submenu should be aligned to it's constrain region defined with `constrainTo`
* alignOffset: { x: Number, y: Number }|{ x: Number, y: Number }[]|Number - specifies the offset to which the menu will align itself to the `alignTo` region. It can be an object with offset fro x and y, a number with the same offset for both x and y, or an array of objects that specifies offsets for each align position (`alignPositions`).
* onDismiss: (blurEvent) - called when menu loses focus, and not if it's children submenus doesn't have focus
* submenuAlignOffset: alignOffset - submenu align offset, see `alignOffset`

`alignPositions` is a string of the form `tl-tr`, first substring `tl` specifies what side of
the submenu should be aligned to which side of the region is constrained to (`constrainTo`, the substring `tr`).

The posible substrings are:
cy: 'YCenter'
cx: 'XCenter'
t : 'Top'
tc: 'TopCenter'
tl: 'TopLeft'
tr: 'TopRight'
b : 'Bottom'
bc: 'BottomCenter
bl: 'BottomLeft'
br: 'BottomRight'
l : 'Left'
lc: 'LeftCenter'
r : 'Right'
rc: 'RightCenter'
c : 'Center'

Example

```jsx

<div onContextMenu={(event) => {
  event.preventDefault();

  this.setState({
    menuAlignTo: {
      left: event.clientX,
      top: event.clientY,
      width: 1,
      height: 1
    }
  })
}}>

  <Menu
    // need to add position absolute, so it will behave as a contextmenu
    style={{position: 'absolute'}}

    /**
     * a region/node/selector - it is used to calculate
     * how this menu should be aligned, it addes left and right on the Menu
     */
    alignTo={{
      left: this.state.menuAlignTo.left,
      top: this.state.menuAlignTo.top,
      height: 1,
      width: 1
    }}
    // needs to be set, in this case it selects the window
     constrainTo={true}
    /**
     * determine what positions to check
     * in this case it hecks if it's top-left part can fit on the center
     * of the alignTo region (this case where the mouse has right clicked)
     */
     alignPositions={['tl-c', 'bl-c', 'br-c']}
     items={longListOfItemsWithStyle}
   />
</div>
```


## LICENSE

#### [Apache2](./LICENSE)
