/**
 * Remove false keys from an object.
 * It mutates the object!.
 * @param  {Object} props
 * @return {Void}
 */
function cleanUpFalseProps(props) {
  Object.keys(props).forEach(path => {
    if (props[path] === false) {
      delete props[path];
    }
  });
}

export default cleanUpFalseProps;
