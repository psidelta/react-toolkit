## Tab Styling Props

This props are declared on each individual tab instance and overwrite the props declared on at the accordion level. 

Styling each individual tab will merge styles and concatenate classes with the props comming from the accordion level.

```jsx
<Accordion
    titleEllipsis={false}
  >
  <div tabTitle='tab1' tabProps={{
    titleEllipsis: true,
  }}>Will have titleEllipsis=true</div>
</Accordion>
```

All styling props on the individual tab level are grouped in one object, `tabProps`, suporting the following params:

  - disabled: `Boolean`, indicates if the tab is disabled or not
  - locked: `Boolean`, indicates if the tab is locked or not

  - style: `Object`, will merge style with [tabStyle](./accordion-styling-props.md#tabstyle)
  - className: `String`, will concatenate with [tabClassName](./accordion-styling-props.md#tabclassname)
  - stretchTabContent: `Boolean`, will overwrite with [top level stretchTabContent](./accordion-styling-props.md#stretchtabcontent)

  - title: `String|JSX|Function`, will use this one to render the content of the tab instead of the default `tabTitle` prop.

  - titleStyle: `Object`, will merge style with [tabTitleStyle](./accordion-styling-props.md#tabtitlestyle)
  - titleEllipsis: `Boolean`, will overwrite [tabTitleEllipsis](./accordion-styling-props.md#tabtitleellipsis)
  - titleAlign: `String`, will overwrite [tabTitleAlign](./accordion-styling-props.md#tabtitlealign)
  - titleVerticalAlign: `String`, will overwrite [tabTitleVerticalAlign](./accordion-styling-props.md#tabtitleverticalalign)