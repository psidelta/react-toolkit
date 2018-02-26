# react-tooltip

React Tooltip uses zippyui-react-overlay, it supports all it's props.
The difference is that it uses the following defaults.

```js
{
  rootClassName: 'react-tooltip',
  hideOnScroll: true,

  // style
  arrowSize: 7,

  // fade
  fade: true,
  showDelay: 100,
  hideDelay: 300,
  fadeInDuration: 150,
  fadeOutDuration: 50,

  // events
  showEvent: ['mouseenter'],
  hideEvent: ['mouseleave'],
}

```

## Usage

### shared tooltip
```jsx
<Tooltip target=".tooltip" />
<button className="tooltip" data-target="text" />
<button className="tooltip" data-target="text2" />

<Tooltip target=".tooltip">
  ({ targetNode }) => {
    return <div>{targetNode.dataset.tootip}</div>
  }
</Tooltip>
<button className="tooltip" data-target="text" />
<button className="tooltip" data-target="text2" />
```

### single tooltip
```jsx
<button className="tooltip">
  <Tooltip> Hello world </Tooltip>
  ok
</button>
```
