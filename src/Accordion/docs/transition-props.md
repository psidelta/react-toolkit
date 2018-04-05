## Transition props

Transition props specifiy the animation parameters of both the collapse/expand transition
of the tabs, as well as the rotation of the arrows of the tab titles.

### transition

`Boolean, default: true`

Transition enables animation while collapsing or expanding tabs. Setting **transition=false** will disable transitions and animations.

When **transition=true**, the **transitionDuration** and **transitionFunction** props will control the animation. 

### transitionDuration

`Number, default: 300`

Specifies the duration in miliseconds (css `transition-duration` prop) for the expand/collapse animation. Only makes sense when **transition=true**. 

### transitionFunction

`String, default: 'ease'`

Specifies the `transition-timing-function` css property. Can be any valid transition string (like `ease-in-out`, `linear` or cusotm bezier curve).