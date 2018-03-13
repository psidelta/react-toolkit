const selector = 'input, select, textarea, button, object, a[href], [tabindex]';

function getFocusableElements(node) {
  if (!node) {
    return null;
  }
  // filter out nonvisible items
  let nodes = [...node.querySelectorAll(selector)];
  // http://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
  nodes = nodes.filter(el => el.offsetParent);
  return nodes;
}

export default getFocusableElements;
