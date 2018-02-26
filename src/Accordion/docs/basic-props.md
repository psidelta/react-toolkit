## Basic props

### collapsible

`Boolean, default: false`

Setting **collapsible=true** will allow collapsing all opened tabs. If left to default value or falsy value, the last opened tab won't be closable. 

### multiExpand

`Boolean, default: false`

Setting **multiExpand=true** will allow expanding more than one tab at once. While in this mode, the layout will **NOT stretch** to full height/width of the parent. 

### horizontal

`Boolean, default: false`

By default the accordion will render vertically, so tabs will show up one under the other. 

Setting **horizontal=true** will change the layout and flow of the accordion. Instead of rendering
the tabs one under the other, the layout will render each tab side by side and will also rotate the tab titles to `titleRotate` degress. 

### defaultActiveIndex

`Array||Number, default: 0||[0]`

Specifies the default active tabs. If in multiExpand mode, an array should be provided. If in single mode, just a number. Specifiying **null** will disable expanded tabs on first render allowing accordion instances that mount completele collapsed by default. 

### activeIndex

`Array||Number, default: 0||[0]`

Controlled version of `defaultActiveIndex`. Setting an active index will prevent expanding/collapsing via user interaction. Changing the activeIndex dynamically will expand/collapse tabs
accordingly. 

### locked

`Boolean, default: false`

If set to **true** will prevent any interaction on tabs. It won't even call onActivate. Tabs can overwrite this. If a tab has the **locked={false}** or **tabProps={{locked:false}}**, that individual tab will still work.

Use in combination with `onActivate` callback to handle user interaction in accordion. 

### rtl (right to left)

`Boolean, default: false`

Enables `rtl` mode.

When `rtl=false`, `tabTitleAlign='start'` means tab titles are aligned to the **left**. 
When `rtl=true`, `tabTitleAlign='start'` means tab titles are aligned to the **right**.

Similarly, for `expandToolPosition`.
When `rtl=false`, `expandToolPosition='start'` means the expandTool is positioned to the **left** of the tab title.
When `rtl=true`, `expandToolPosition='start'` means the expandTool is positioned to the **right** of the tab title.

### enableKeyboardNavigation

`Boolean, default: true`

Controlls the ability to interact with the accordion with the keyboard. 