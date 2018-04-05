##Expand Tool Props

The expand tool is by defaut the little arrow that rotates when tabs expand/collapse. This tool can
be configured or disabled via the following props.

### expandTool

`String||JSX||Function||null`

The `expandTool` prop specifies what to render in the expandTool area. By default, the accordion will use its internal function to render and animate the tooltip. 

- **null**: disabled the expand tool, so no tool will pe rendered. 
	```jsx
<Accordion
		expandTool={null}
	>
	{...}
</Accordion>
	```

- **string**: will render the given string.
	```jsx
<Accordion
		expandTool='x'
	>
	{...}
</Accordion>
	```
- **JSX**: will render the given jsx.

	```jsx
<Accordion
		expandTool={
			<svg fill="#000000" width={24} height={24} viewBox="0 0 24 24">
				<path d="M7 10l5 5 5-5z"/>
				<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		}
	>
	{...}
</Accordion>
	```
- **function**: will call the given function with the following arguments:
	- `expanded`: `boolean`, if the tab title containing the current tooltip is expanded or not
	- `index`: `number` index of the current tab title
	- `activeIndex`:  `number||array(number)` what other tabs are active right now. This will always exist, even if the accordion does not have an activeIndex set. It will represent the currently expanded tabs.
	- `disabled`: `boolean`, if the tab is disabled or not.
	- `multiExpand`: `boolean` if the accordion is in multiExpand mode or not.
	- `collapsible`: `boolean` if the accordion is collapsible.
	- `focused`: `boolean` if the tab title is focused,
	- `transition`: `boolean` if the animation is enabled 
	- `transitionDuration`: `number` the animation duration in ms
	- `transitionFunction`: `string` the animation transition function

	will render whatever the function returns (either a string, null or JSX). This is useful for writing custom animations and transitions for the tool.

The default expandTool function looks like this:

```jsx

function defaultRenderExpandTool (params) {
	const EXPAND_TOOL_SIZE = 24;
	let style = {
		width:EXPAND_TOOL_SIZE,
		height:EXPAND_TOOL_SIZE,
		transition: params.transition ? `all ${params.transitionDuration}ms ${params.transitionFunction}` : '',
		transform: params.expanded ?'rotate(180deg)':'rotate(0deg)'
	};

	return (
		<div style={style} className={`${CLASS_NAME}__expand-tool`}>
			 <svg fill="#000000" width={EXPAND_TOOL_SIZE} height={EXPAND_TOOL_SIZE} viewBox="0 0 24 24">
				<path d="M7 10l5 5 5-5z"/>
				<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</div>
	);
}

<Accordion
		expandTool={defaultRenderExpandTool}
	>
	<div tabTitle='tab1'>Some content</div>
</Accordion>
```

### expandOnToolOnly

`Boolean, default: false`

If true, it will only trigger expand/collapse on click on the expandTool, and nowhere else in the title bar. Don't use this in combination with expandTool={null}.

### expandToolPosition

`String 'start'||'end', default: 'end'`

Will configure the position of the expand tool in relation to the title content. Uses flexbox for layout. Is influenced by `rtl` prop.

