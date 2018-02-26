##Callbacks

Each tab interaction triggers a callback. There are two places where callbacks can be
set. On the accordion directly, or on each individual tab.

```jsx
<Accordion
		onActivate={(activeIndex)=>{console.log(activeIndex);}}
		onExpand={(index)=>{console.log(index);}}
		onCollapse={(index)=>{console.log(index);}}
	>
	<div tabTitle='tab1'>Tab1</div>
	<div 
		tabTitle='tab2'
		tabProps={{
			onExpand={(idx)=>{console.log('will get called only on second tab', idx)}}
			onCollapse={(idx)=>{console.log('will get called only on second tab', idx)}}
		}}
	>
		Tab2
	</div>
</Accordion>
```

---------

The following accordion level callbcaks are available:

##onActivate(activeIndex)

Will be called imediatly when a tab title has been 'activated' - either via click/tab, or keyboard navigation. `activeIndex` will either be an array of indexes that are now 'active' or have been requested to be 'active' in the case of **multiExpand=true** or a number when in single expand mode.

The callback will get called even in controlled mode, when `activeIndex` is set. In multiExpand mode, *the last tab in the array is the latested activated index, the one which should be handled by the new activeIndex prop`.

```jsx
<Accordion
	onActivate={(activeIndex)=>{console.log(activeIndex);}}
	>
	{...}
</Accordion>
```

##onExpand(index)

```jsx
<Accordion
	onExpand={(index)=>{console.log(index);}}
	>
	{...}
</Accordion>
```

Called when a tab has completed the expand animation. It will get called when **transition=false** imediatly when the tab gets expanded. 

Does not trigger in controlled mode.

`index` is the position the tab has in the list of tabs of the accordion.

##onCollapse(index)

```jsx
<Accordion
	onCollapse={(index)=>{console.log(index);}}
	>
	{...}
</Accordion>
```

Called when a tab has completed the collapse animation. It will get called when **transition=false** imediatly when the tab gets expanded. 

Does not trigger in controlled mode.

`index` is the position the tab has in the list of tabs of the accordion.

---------

We also have the ability to register onExpand and onCollapse on each individual tab via the `tabProps` property.


```jsx
<Accordion>
	<div tabTitle='tab1'>Tab1</div>
	<div 
		tabTitle='tab2'
		tabProps={{
			onExpand={(idx)=>{console.log('will get called only on second tab', idx)}}
			onCollapse={(idx)=>{console.log('will get called only on second tab', idx)}}
		}}
	>
		Tab2
	</div>
</Accordion>
```

---------