# React Color Picker

## Description

Color picker is composed of two components, HueSpectrum and SaturationSpectrum.
Both these components can be used independently.

## Props

Prop | Type | Default | Description
--- | --- | --- | --
saturationWidth|number|300|with of the saturation spectrum
saturationHeight|number|300|height of the saturation spectrum
alphaHeight|number|300|height of the alpha
alphaWidth|number|30|width of the alpha
alphaStyle|Object|-|inline style applied on alpha
hueWidth|Number|30|width of the hue spectrum
hueheight|Number|null|the height of the hue spectrum
hueStyle|Object|-|inline style applied on hue spectrum

ColorPicker, the HueSpectrum and the SaturationSpectrum all accept:

Prop | Type | Default | Description
--- | --- | --- | --
onDrag|(color: string) => void|called when color pointer is dragged
onChange|(value: string, color: Object) => void|called when value changes


## HueSpectrum

You can use only the hue spectrum if that is what you need.

```jsx
import React from 'react'
import { HueSpectrum } from 'react-toolkit/color-picker'

<HueSpectrum value={color} width={100}/>
<HueSpectrum defaultValue="red" />
```

## SaturationSpectrum

You can use only the saturation spectrum if that is what you need.

```jsx
import React from 'react'
import { SaturationSpectrum } from 'react-toolkit/color-picker'

<SaturationSpectrum value={color} height={400}/>
<SaturationSpectrum defaultValue="red" />
```

## AlphaSpectrum


You can use only AlphaSpectrum.
```jsx
  import React from 'react'
  import { AlphaSpectrum } from 'react-toolkit/color-picker'

  <AlphaSpectrum value={color} height={400}/>
  <AlphaSpectrum defaultValue="red" />
```


## RGBA

A component that splits the color into 4 inputs, for each color (rgba).

Prop | Type | Default | Description
--- | --- | --- | --
value|String/Object|-|string or object color value
defaultValue|String/Object|-|uncontrolled value for value
onChange|(color) => void|-|event called when color changes

## LICENSE

#### [Apache2](./LICENSE)
