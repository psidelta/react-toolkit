const convertProcentageRangeToPositionStyles = (range, horizontal) => {
  let [start, end] = range;

  const positionStartCSSValue = `${start * 100}%`;
  const dimmensionCSSValue = `${(end - start) * 100}%`;

  if (horizontal) {
    return {
      left: positionStartCSSValue,
      width: dimmensionCSSValue
    };
  }

  return {
    top: positionStartCSSValue,
    height: dimmensionCSSValue
  };
};

export { convertProcentageRangeToPositionStyles };
