##Accordion Styling Props

Styling of tabs, tab tiltes and the accordion container itself can be set on multiple levels. A style applied on one of the custom props on the accordion level will propagate to all tabs or tabtitles, and can be overwriten by props of the same type on the individual tab level.

##Tab Style Props applied directly on Accordion component

This props are set directly on the accordion tag and will apply to all tabs in the component. 

```jsx
<Accordion
		tabStyle={{padding:20}}
		tabClassName='my-custom-class-name'
	>
	{...}
</Accordion>
```


### tabStyle 

`Object, default: {}`

A style object to be applyed to all tab content wrappers. The tab content warpper is the wrapper of the content of the tabs, which contains the hidden content of collapsed tabs, or the full stretched dimmensions of the expanded tabs. 

This is a perfect spot for adding padding and backgrounds for spacing content and adding a full width/height backgorund. 

```jsx
<Accordion
		tabStyle={{padding:20}}
	>
	<div>Will have padding 20px applied on the wrapper of this element</div>
</Accordion>
```


### tabClassName

`String, default: undefined`

A `className string` to be applied to the tab content wrapper which also gets the `tabStyle` property. This prop is usefull if you prefer to keep stlying in CSS instead on each tab. 

```jsx
<Accordion
		tabClassName='my-custom-class'
	>
	<div>Will have 'my-cusotm-class' applied on the wrapper of this element</div>
</Accordion>
```

### stretchTabContent

`Boolean, default: false`

By default, the tab content is wrapped into a container which will flex to fill the size given by the accordion or the parent node of the accordion. This means that the content will not necesarlly be as large or as tall as the wrapper. In order to force the content to have the size of the wrapper, set **stretchTabContent=true**. 

```jsx
<Accordion
		style={{height:300}}
		stretchTabContent={true}
	>
	<div tabTitle='tab1'>Will have content stretch to full height</div>
	<div tabTitle='tab2'>Will have content stretch to full height</div>
</Accordion>
```

##Tab Title Style Props applied directly on Accordion component

This props are set directly on the accordion tag and will apply to all tab titles in the component. 

### tabTitleStyle
`Object, default: {}`

A style object to be applyed to all tab title wrappers. The wrapper contains both the title and the expand/collapse arrow and should not have any margin. This is the place to add fixed heights/widths to tabs, backgorund that will contain the entire tab title layout, border and so on. 

```jsx
<Accordion
		tabTitleStyle={{height:150}}
	>
	<div tabTitle='title will have height 150'>...</div>
</Accordion>
```

### tabTitleEllipsis

`Boolean, default: true`

By default, titles are forced on one line of text and ellispis is added if the overflow. Setting **tabTitleEllipsis=false** will disable this behavior, making the text of the title break on multiple lines. 

```jsx
<Accordion
		tabTitleStyle={{width:10}}
		tabTitleEllipsis={false}
	>
	<div tabTitle='title will break line'>...</div>
</Accordion>
```

### tabTitleAlign

`String 'start'||'end'||'center'||'top'||'left'||'botom'||'right', default: 'start'`

Specifies the alignment the text of the title on the main axis. Defaults to `start`. Will map `top`, `left` to `start`, and `right`, `bottom` to `end`.

### tabTitleVerticalAlign

`String 'top'||'bottom'||'middle', default: 'middle'`

Specifies the alignment the text of the title on the secondary axis. Defaults to `middle`. Useful for tab titles that have fixed height (given by custom css styling or `tabTitleStyle` prop). 

### expandToolPosition

See: [expand tool props page](./expand-tool-props.md#expandtoolposition)

### renderTabTitle

`Function`

Providing the `renderTabTitle` prop will delegate the rendering of each tab title content to this function. This function gets all the necesary DOM props in order to render the content with a simple `<div {...domProps}/>` and a secondary parameter containing all the props seen in the [expand tool function](./expand-tool-props.md#expandtool)

```jsx

function customRenderTabTitle(domProps, configProps) {
	console.log(domProps); // will contain children (the tab content) and className and ref
	console.log(configProps); // will contain details about this title and the state of the accordion
	return <div {...domProps}/>;
}

<Accordion
		renderTabTitle={customRenderTabTitle}
	>
	<div tabTitle='tab1'>Some content</div>
</Accordion>
```




