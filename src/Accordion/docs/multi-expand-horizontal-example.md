#Multi expand horizontal example

Since the horizontal multi expand will overflow on the horizontal axis, the best way to
handle the overflow is on the parent of the accordion. 

Here's how NOT to do it:

```jsx
<Accordion
    style={{
    	width: THE_WIDTH_OF_THE_ACCORDION, 
    	height:THE_DESIRED_HEIGHT',
    	overflow: 'auto'
	}}
    horizontal
    multiExpand
  >
  ...
</Accordion>
```

If we set a fixed `width`, we will get scrollbars **inside** the accordion wrapper. This means that while tabs expand and push for scrollbars, the height available for the tabs will
change based on the presence of scrollbars.

In order to avoid this changing height issue, we can wrap the accordion into a parent that has the fixed width and height:


```jsx
<div style={{overflow:'auto', width: WIDTH_IMPOSED_BY_YOUR_APPLICATION_LAYOUT }}>
	<div
		style={{
	    	width: THE_WIDTH_OF_THE_ACCORDION, 
	    	height:THE_DESIRED_HEIGHT',
	    	overflow: 'visible'
		}}
	>	
		<Accordion
		    horizontal
		    multiExpand
		  >
		  ...
		</Accordion>
	</div>
</div>

```

This way, when the content overflows and is handled by an outside container, and the accordion will always have the same height. The scrollbars will show up OUTSIDE the allocated height set on the wrapper div. 