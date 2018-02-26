# react-tree-view
A carefully crafted tree component for React


## Props

### General

- style: Object - style object added on component
- loading: Bool - whether the tree-view is loading, if true it will display a loading component.
- dataSource: Object[], Promise => Object[], (props) => Object[] - information used to render tree nodes, defaults to `null`.
- pathSeparator: String - a string to concatinate path identifiers, it defaults to '/'
- pathProperty: String/(node) => String - this prop specifies the name of the property in each node that is used for building the path. Can also be a function. If not specified, the `index` will be used.
- idProperty: String/(node) => String - same as pathProperty, but insted of constructing a path of identifiers, it uses only this identifier to identify itself, as it should indicate an unique string. This prop overwrites `pathProperty`, they should not be both set.
- transition: Bool - whether expand/collapse is animated
- transitionDuration: Number - `transition` duratio in ms
- rtl: Bool - whether the tree view is rendered from right to left, it also reverses the behaviour of arrow navigation with arrow left and right. Defaults to `false`.
- loading: Bool - whether the TreeView is loading. When true a loader will be rendered ('Loading...').

-enableHoverStyle: Bool - if true, adds a `react-tree-view--enable-hover-style` on tree-vew. Default theme will add a hover style, defaults to `true`.
-enableScrollNodeIntoView: Bool - whether when navigating and tree-view has scroll, should bring active node into view, defaults to `true`.
-filter: Function(nodeProps) controls which node get rendered. If a parent node does not match the filter, and yet it has children that match the filter, it will be included in the tree rendering, and will be expanded.

#### Styling
- className: String - class added on component
- theme: String - select theme name, defaults to `default`
- style: Object - applied on treeview component
- nodeStyle: Object|({ node, checked, selected, collapsed })  => Object - style applied on the node - to the wrapper that contains both the node label/text and the node children
- labelStyle: Object|({ node, checked, selected, collapsed })  => Object - a style object applied to the node label/text. NOT applied to the wrapper that contains the children of the node. This is overwritten by node.labelStyle
- contentStyle: Object/({ node, checked, selected, collapsed })  => Object - style applied to the wrapper that contains the children of the node. Overwritten by node.contentStyle

- nodeClassName: String|(nodeProps: { node, checked, selected, collapsed }) => String - className added to node component
- labelClassName: String|(nodeProps: { node, checked, selected, collapsed }) => String - className added on label
- contentClassName: String|(nodeProps: { node, checked, selected, collapsed }) => String - classname added on content

### Collapsed
- collapsed: idMap|pathMap - Object control collapse state of the entire tree. It is an object with keys that identify a particular node (see path section), and it's value specifies whether the node is collapsed.
`idMap|pathMap` is whether the component use `idProperty` or `pathProperty`, see this props and `path` section for more details.
- defaultCollapsed: idMap|pathMap - the uncontrolled version of `collapsed`, it sets the initial state of the component.
- isNodeCollapsed: (nodeProps: { node, path, collapsedMap }) - a function that can intercept and modify the collapsed state for each Node. defaults to null, it uses `collapsed` as it's source of truth.
- expandTool: JSX|String|({domProps: { onClick, className }, nodeProps: { collapsed, selected ..}}) => JSX - used to specify custom expand tool. If it is a JSX, it will be cloned and injected `onClick` and `collapsed`, in this case you should call.
- expandToolSize: Number - sets the size of the expandTool, this dimension is also used to position the treelines, defaults to `14`
- `onClick` when component is clicked. If string, it will be wrapped inside a div, and it will be turned 90deg with css property transform: rotate.
- expandOnToolOnly: Bool - whether to expand/collapse node only on click on expander, defaults to `false`
- expandOnDoubleClick: Bool - whether expand/collapse should happen on double click

### Collapsed depth
Control from which level the tree is collapsed.
If `null` all tree will be expanded. To expand only the first level, set `collapsedDepth` to 0.

- collapsedDepth - tells from which depth level the tree should be collapsed, e.g. `0` first level will be collapsed, if 1, first level is expanded, and the rest are collapsed, defaults to `null`.
- defaultCollapsedDepth - uncontrolled version of coallapseDepth
- onCollapsedDepthChange: (null) => void - called when tree changes collapse state of a node.

### Selection
- enableSelection: Bool - whether the treeview nodes can be selected. If nodes are selected using `selected` and `enableSelection` is `false` nodes will not appear as selected.
- selected: idMap|pathMap - an object with keys being the node ids/paths as string, to denote the paths to render as selected. The keys are the selected paths. Here and in all other similar objects.
- singleSelect: Bool - whether there can be only one node selected at one time
- checkBeforeIcon: Bool - whether to render check before icon, defaults to true

### Check
- enableChecked: Bool - whether the nodes can be checked, it renders an checkbox inbetween expandTool and label text.
- checked: idMap|pathMap - Object control check state of the entire tree. It is an object with keys that identify a particular node (see path section), and it's value specifies whether the node is collapsed.
- defaultChecked: idMap|pathMap - uncontrolled version of checked
- isNodeChecked: (nodeprops: { node, path, checkedMap }) - a function that can intercept and modify the collapsed state for each Node. defaults to null, it uses `checked` as it's source of truth.
- checkNodesRecursive: Bool - defaults to `true`, it applies for nodes that have children or is a child of another node:
 - if it's children are all checked, it will be also checked
 - if some of it's children are checked, it will have undeterminated state, and checked false
 - if some of the children are checked and it's changes check to true, it's children will be checked
 - if all of it's children are checked and it's unchecked, it's children will be unchecked
- checkOnSelect: Bool - whether when an node is checked when is selected, defaults to `false`
- checkOnClick: Bool - whether when clicking the node, triggers onChange on checkbox, defaults to true.

### Disabled
If a node is disabled all actions are prevented (collapse, active, navigation, check).
Also a `disabled` node is always collapsed, event if isNodeCollapsed is `true`.

- disabled: idMap/pathMap - specify what nodes are disabled
- isNodeDisabled: (nodeProps: { index, collapsed, selected ..}) => Bool - function called
to intercept and specify if a node is disabled, it overwrites `disabled`.

### Navigation
- enableKeyboardNavigation: Bool - whether tree is navigable with arrows
- activeNode: path|id - indicate which node is active
- defaultActiveNode: path|id - uncontrolled version of `activeNode`
- onActiveNodeChange: ({ index, node, activeNode, collapsed }) - called when active node changes

If `enableKeyboardNavigation` props is set to true, nodes can be navigated:
- PageUp - jumps to first sibling
- PageDown - jumps to last sibling
- Home - jumps to first rendered node
- End - jump to the last rendered node
- Space - checks the node
- Enter - toggles active node collapse state

PageDown will expand the focused node, and PageUp will close the focused node.
Space will toggle expand/collapse.

### Async Nodes
Async nodes can load it’s children asynchronous.
A node is considered asynchronous if:
- when only `loadNodeOnce` is specified:
  - the node is async if `node.nodes === null` (if node.nodes is undefined, it’s a leaf, and if node.nodes is an empty array it is an empty root node). Once an async node has been expanded, the loadNodeOnce will no longer be called on subsequent expands of the node, and the node is considered NOT-async, even if it has `node.nodes === null`.
  - `isNodeAsync` function prop returns true for the node. Again, on subsequent expands of the node, it is considered NOT-async, since it has already been expanded once.
- when `loadNode` is specified
  - all nodes are considered async by default
  - `isNodeAsync` ultimately determines if a node is async or not.


When a async node is expanded, one of the following props will be called:
- loadNode: ({ node, id, path, pathString }): Function => Promise/Array/null. - specified for async trees. Called with the node to be expanded. Should return an array of child nodes, or null
- loadNodeOnce({ node, id, path, pathString }) - same as loadNode, but caches the result of loadNode and does not call it on previously expanded nodes.
- onNodeLoad: ({ node, id, pathString, nodes: Array<Node>, path: String[] }) => void -  called when promise resolves
- isNodeAsync: (nodeProps) => async: Bool - whether the node is async or not.  Called if `loadNode` or `loadNodeOnce` is defined
- loadTool


### Leaf Nodes
A leaf node is considered a node that has ‘nodes’  attribute null or undefined.
When a node is a leaf, expand tool is not rendered.
A node with an empty array, is not a leaf, because you can have node that is expandable without children (e.g. a folder with no files).

If a node is aync and it's nodes are `undefined`, it is considered to `haveChildren`.

### Node props (props added on dataSource[n])
- style: Object|(domProps, nodeProps: { node, checked, selected, collapsed }) => Object: style applied on the node - to the wrapper that contains both the node label|tdomProps, nodeProps: ext and the node children
- contentStyle: Object|(nodeProps: { node, checked, selected, collapsed }) - style applied to the wrapper that contains the children of the node
- labelStyle: Object|(nodeProps: { node, checked, selected, collapsed })  => Object- a style object applied to the node label/text. !!! NOT applied to the wrapper that contains the children of the node.
- className: String|(nodeProps: { node, checked, selected, collapsed }) => String - className added to node component
- labelClassName: String|(nodeProps: { node, checked, selected, collapsed }) => String - className added on label
- contentClassName: String|(nodeProps: { node, checked, selected, collapsed }) => String - classname added on content

#### Path
A path string representing the path from root to a specific node. This is used to uniquely identify the node.
If `idProperty` is specified, the path is just that property, as it already uniquely identifies the node.

```jsx
const dataSource = [
  {
    id: 'root1',
    label: 'Parent 1',
    nodes: [
      {
        id: 'child1'
        label: 'Child 1'
      },
      {
        id: 'child2',
        label: 'Child 2'
      }
    ]
  }
]

/**
 - [ ] Case default
 - [ ] In this case the path (by default) for the node with id of `child2`, will be '0/1'
 */
<TreeView dataSource={dataSource} />

/**
 - [ ] Case `pathProperty` is specified
 - [ ] In this case the path (by default) for the node with id of `child2`, will be 'Parent 1/Child 2'
 */
<TreeView dataSource={dataSource} pathProperty="label" />

/**
 - [ ] Case `idProperty` is specified
 - [ ] In this case the path (by default) for the node with id of `child2`, will be 'child2'
 */
<TreeView dataSource={dataSource} idProperty="id" />

```


#### Render functions
- renderLabel: ({domProps, nodeProps}) => jsx - A function that can be used to intercept the node labels for all nodes.
- renderNode: ({domProps, nodeProps}) => JSX|null - Custom render for node.
- renderContent: ({domProps, nodeProps}) => jsx - custom render for content.
- renderIcon: (nodeProps) => jsx - custom render for icon.
- renderLoader: (props) => jsx - custom render for loader.
- renderNodeText: ({domProps, nodeProps}) => jsx - custom render for label text, `labelTextProps`. can be mutated to add or modified props that get applied div that contains the text. The text is node.label.
- renderCheck: (domProps, nodeProps) => JSX|null - custom render function for Check. `domProps` can be mutated, if returns null, these props will be applied on default check component (`react-checkbox`). The returned component should emulate check api, it should call onChange with new `checked` state. T

`domProps` ca be mutated, to add new or change props that get applied on DOM node.

`nodeProps` parameter has the following props:
- node
- children
- hasChildren
- collapse
- renderLabel
- index
- key
- path


```jsx
 // Example renderCheck
 <TreeView
  renderCheck={(domProps, nodeProps) => {
    return <CustomCheckBox onChange={(checked) => {
       // call treeview onChange
       nodeProps.onChange(checked)
      }}
  }}
 />
```

### Icon
- nodeIcon: String|JSX - will render an image with src if is a string, or jsx, it can be modified or overwriten with `renderIcon`
- nodeCollapsedIcon: String|JSX - will render an image with src if is a string, or jsx, it can be modified or overwriten with `renderIcon`
- leafNodeIcon: String|JSX - will render an image with src if is a string, or jsx, it can be modified or overwriten with `renderIcon`

### Events

- onDataSourceLoad: (data) => void - called when dataSource is a promise and resolves
- onNodeCollapseChange: ({ getUpdatedDataSource, collapsedMap, node, collapsed, ...nodeProps }) - called when a node changes collapse state.
- onSelectionChange({ getUpdatedDataSource, selectedMap, node, selected, ...nodeProps }) - called when a node changes selection
- onCheckedChange(({ getUpdatedDataSource, checkedMap, node, selected, ...nodeProps })) - called when a node changes check state
- onCollapsedChange(collapsedMap) - should be called whenever a collapse/expand happens, either on a node or via expandAll/collapseAll/setCollapsed methods


#### nodeProps
Are the props passed to Node:
- collapsed
- selected
- className
- active
- disabled
- node
- ...

#### getUpdatedDataSource

getUpdatedDataSource(updateNode) => newDataSource: Array

A helper function to insert a modified node inside `dataSource`.
It does not mutate the original dataSource. It taks an `updateNode` function as parameter, used to create or modify the node to be inserted.

updateNode({ node, collapsed|selected|checked, nodeProps }) => node|null

`updateNode` It can return a new node, or it can modify the node passed as parameter and return null. The mutated node will be inserted. `node` is a shallow copy and it is safe to mutate.


```jsx
// with mutation
<TreeView
  dataSource={this.state.dataSource}
  onNodeCollapseChange={({ collapsedMap, getUpdatedDataSource }) => {
    const newDataSource = getUpdatedDataSource(({ node, collapsed }) => {
      node.collapsed = collapsed
    })

    this.setState({
      dataSource: newDataSource
    })
  }}
/>

// without mutation
<TreeView
  dataSource={this.state.dataSource}
  onNodeCollapseChange={({ collapsedMap, getUpdatedDataSource }) => {
    const newDataSource = getUpdatedDataSource(({ node, collapsed }) => {
      return Object.assign(node, { collapsed: true })
    })

    this.setState({
      dataSource: newDataSource
    })
  }}
/>

```

### Methods

Note. Triggering a change with methods will trigger the associated events. Events will to be triggered for global actions as `collapseAll`.

- collapseNode: (path: path|id) => collapsed: Object - collapses node at specified path. See `path` section for more details. It returns new `collapsed` state.
- expandNode: (path: path|id) => collapsed: Object - expands node at specified path. See `path` section for more details. It returns new `collapsed` state.
- checkNode: (path: path|id) => checked: Object - checks node at specified path.
- uncheckNode: (path: path|id) => checked: Object - unchecks node at specified path.
- setActiveNode: (path: path|id) => activeNode: String - change active node.
- setSelected: (idMap|pathMap: Object) => idMap|pathMap|null - changes selected state, if selection is not enabled it will return `null`. This method will not trigger events.
- selectNode: (path|id) => selected - selects node at path, will return null, if `enableSelection`
- deselectNode: (path|id) => selected - deselects node at path

- selectAll: (void) => newSelected: Object|null - selects all nodes, will return null, if `enableSelection` is false.
- deselectAll: (void) => newSelected: Object|null - deselects all nodes, will return null, if `enableSelection` is false.
- collapseAll() => collapsedMap: idMap|pathMap - collapses all nodes. If collapsed is uncontrolled, the TreeView will update itself. This will not trigger `onNodeCollapseChange`.
- expandAll: () => collapsedMap: idMap|pathMap - expands all nodes. If collapsed is uncontrolled, the TreeView will update itself. This will not trigger `onNodeCollapseChange`.
- checkAll: (void) => newChecked: Object|null - checks all nodes, will return null, if `enableChecked` is false.
- uncheckAll: (void) => newChecked: Object|null - unchecks all nodes, will return null, if `enableChecked` is false.
- setCollapsed: (newCollapsedState) => newCollapsedState: Object| null - changes collapsed state to  `newCollapsedState`.

Note. When TreeView has is controlled, when using a global method (collapseAll, checkAll ...), the returned map from one of these methods has to be set on TreeView (collapsed, checked), to have effect.

## Search Tree View

Search Tree View, is a tree-view with an text input with which it can be filtered, and matched test is highlighted. Text will search `label` field on `node`.
Search Tree View constructs a `filter` function based on `searchValue` and `node.label`.

New props besides those from tree-view:
- searchText: String - search value
- defaultSearchText: String - uncontrolled search
- renderInput: False|({ domProps, props }) => JSX|Void - if returns undefined, domProps can be mutated to modify props applied on default input. If JSX is returned, it must call `domProps.onChange` with new `searchValue`.  
- onSearchTextChange: (newSearchQuery: String) => void -  called when search changes

Methods:
- getTreeViewInstance: () => ref - returns a ref to TreeView

Modified props:
- renderNodeText: (domProps, nodeProps) => JSX|null
nodeProps, will have a new attribute matchText?, an array of the form:
```
matchText: [ 'Hello',  { label: 'matched search text' }, 'ZippyUI' ]
```
This is used to construct the highlighted text.
domProps, and mathText can be mutated if `renderLabel` doesn't return JSX.

## LICENSE

#### [Apache2](./LICENSE)
