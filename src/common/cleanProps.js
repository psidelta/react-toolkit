/**
 * Remove props that are present in proptypes
 * @param Object props
 * @param Object defaultProps
 */
function cleanProps(props, propTypes) {
  if (!props) {
    return props;
  }
  const newProps = Object.keys(props).reduce((acc, propName) => {
    if (!propTypes[propName]) {
      acc[propName] = props[propName];
    }
    return acc;
  }, {});

  return newProps;
}

export default cleanProps;
