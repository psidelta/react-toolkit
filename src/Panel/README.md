# react-panel

## Props
* title: JSX|(domProps, panelProps) => {} - title to display on Panel.
* titleClassName: String - className added on title
* titleBarPosition: 'top'|'left'|'right'|'bottom' - title bar position
* titleAlign: 'start'|'center'|'end' -  Other supported values: ‘left’ and ‘right’ are just aliases for ‘start’, ‘end’, defaults to `null`.
* titleRotate: 90|-90 - set rotate direction when `titleBarPosition` is `left` or `right`. Defaults to:
 *  `90` when `titleBarPosition` is `right`
 * `-90` when `titleBarPosition` is `left`.
* bodyStyle: Object - overwrites the inline-style on body
* bodyClassName: String - className added on body/content wrapper
* children: JSX - content inside body
* renderTitleBar: (domProps, props) => JSX/JSX/false - if false, no title bar will be rendered - come up with some drag utility that can be reused. also as a named export. `domProps` can be mutated to introduce/modify props applied on `titleBar`.

### Custom renderers
* renderBeforeTitle: (props) => JSX - can be used to render different icons/jsx in the title bar before the title text
* renderAfterTitle: (props) => JSX - can be used to render different icons/jsx in the title bar after the title text
* renderBody: (domProps, props) - control render of body. `domProps` can be mutated to add or modified props that get applied body wrapper.
* renderFooter: (props) - render hook after body
