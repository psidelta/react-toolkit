# react-progress-bar

> A carefully crafted progress bar for React

## Install

```sh
$ npm install --save react-progress-bar
```

## Usage
```jsx
import style from 'react-progress-bar/style.css'
<ProgressBar value={20} transitionDuration="2s" indeterminate />
```
## Documentation

### General
Prop|Type|Default|Description
--- | --- | --- | ---
`min`|Number|`0`|min value of progress, min can be any numeric value smaller than `max`
`max`|Number|`100`|max value of progress, max cen be any numeric value greater than `min`
`value`|Number/String|-|value can be from `min` to `max` (defaults to `0 - 100`). Value can be ' 100%' this will evaluate to `max`
`label`|JSX/Func/String|`value`|control display of label, if null it won't be rendered, [label](#label)
`labelStyle`|Object|-|style applied to label
`labelClassName`|String|`end`|set custom label className
`labelPosition`|String|`end`|set label position [label](#label)
`rotateLabel`|Bool/Number:deg|false| if bool it is rotated `90deg`
`direction`|Number:1/-1|`1`|set completed direction, default is from left to right, or in case of vertical from bottom up
`style`|Object|-|style applied on progress bar body
`fillColor`|String|-|set color, is overwritten by `fillStyle`
`remainingColor`|String|-|set color, is overwritten by `remainingStyle`
`labelFillColor`|String|`remainingColor`| color of fill label
`labelRemainingColor`|String|`fillColor`| color of remaining label
`remainingStyle`|String|-|set color, can be overwritten by `remainingStyle`
`fillStyle`|Object/Function|-|style applied on competed portion of progress bar, `background` overwrites
`remainingStyle`|Object/Function|-|style applied to incomplete portion
`indeterminate`|Bool|`false`|controls indeterminate state
`rtl`|Bool|false|it is alias for direction -1
`transition`|Bool|`true`|whether to animate collapse/expand transition, defaults to undefined. If transitionDuration is specified, transition will be considered true.
`springConfig`|Object/Array|null| it uses react-motion for transition, it is used to send `config` to spring, click [here](https://github.com/chenglou/react-motion#--spring-val-number-config-springhelperconfig--opaqueconfig) for more
`shouldComponentUpdate(this, nextProps, nextState)`|Function|shallowEqual| by default shouldComponentUpdate uses a shallowEqual, to check if state or pros has changed. It can be overwritten by setting this prop.

#### Label
If a function it gets as param a copy of global `props`.
It can retrun something new, or can modify the existing component by modifying the passed props. It is ok to modify props in this case because they are a copy.


##### Posibile positions for label are: (`labelPosition`)
* `start` - absolute start; eg. for horizontal, label is on the absolute left part of the progress bar
* `center` - absolute center; eg. for horizontal, label is on the absolute center part of the progress bar
* `end` - absolute end; eg. for horizontal, label is on the absolute right part of the progress bar
* `fillCenter` - placed center relative to fill portion
* `fillEnd` - placed at the end of fill portion, in this case it will follow the progress bar
* `remainingStart` - placed at the start of unfill portion, follows unfill portion
* `remainingCenter` - placed center relative to unfill portion

### Step
Progress bar can grow to a specified value.

Prop|Type|Default|Description
--- | --- | --- | ---
`showSteps`|Bool|`true`|whether to render an element for reach step. These elements are rendered on top of the progress-bar, to help identify them.
`step`|Number/Function(props, state) -> Number|null|size of step, it has to be in the min-max interval. Steps can have same length, using a single value, or variable lengths with an array of numbers
`incrementInSteps`|Bool|`showSteps`| whether progress is made in steps. E.g. step is 20, and value is 25, progress is only until the first step.
`renderStep`|Funciton|-|controll or modify how the steps are rendered


## Ticks
Progress bar can have bars, that are agnostic of steps. By default they take values defined for step.

Prop|Type|Default|Description
--- | --- | --- | ---
`showTicks`| Bool | `enableSteps` | whether ticks are rendered
`tick`|Number/Number[]|`step`|size of tick, it has to be in the min-max interval. Ticks can have same length, using a single value, or variable lengths with an array of numbers  defaults to step
`renderTick`|Function(props)/JSX| - | custom render for ticks, it can be used for example to render a tooltip above the tick. Props can be modified as they are a shallow copy


### Class Index
```scss
  .react-progress-bar__fill {}
  .react-progress-bar__remaining {}
  .react-progress-bar__label {}
  .react-progress-bar__barsWrapper {}

  .react-progress-bar__label__remaining-label-wrapper {}
  .react-progress-bar__label__fill-label-wrapper {}

  .react-progress-bar__tick {}
  .react-progress-bar__ticks {}

  .react-progress-bar__step {}
  .react-progress-bar__steps {}

  .react-progress-bar__indeterminate {}
```
