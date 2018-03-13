function getRootStyle({ props, state }) {
  const style = {};

  return {
    ...style,
    ...props.style
  };
}

export default getRootStyle;
