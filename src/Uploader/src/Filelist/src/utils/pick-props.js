export default function pickProps(props, targetProps) {
  const pickedProps = {};
  Object.keys(targetProps).forEach(key => {
    if (props[key]) {
      pickedProps[key] = props[key];
    }
  });

  return pickedProps;
}
