export default function whichTransitionEvent() {
  const el = document.createElement('fakeelement');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  }

  const t = Object.keys(transitions).find((key) => {
    return el.style[transitions[key]] !== undefined;
  })

  if (t) {
    return transitions[t];
  }

  return 'transitionend';
}
