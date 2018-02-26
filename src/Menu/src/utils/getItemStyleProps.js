export default props => {
  const {
    itemStyle,
    itemOverStyle,
    itemOverClassName,
    itemActiveStyle,
    itemActiveClassName,
    itemDisabledStyle,
    itemDisabledClassName,
    itemExpandedStyle,
    itemExpandedClassName,
    cellStyle,
    itemFocusedStyle,
    itemFocusedClassName,
    itemOverFocusedStyle
  } = props;

  return {
    style: itemStyle,
    overStyle: itemOverStyle,
    overClassName: itemOverClassName,
    activeStyle: itemActiveStyle,
    activeClassName: itemActiveClassName,
    disabledStyle: itemDisabledStyle,
    disabledClassName: itemDisabledClassName,
    expandedStyle: itemExpandedStyle,
    expandedClassName: itemExpandedClassName,
    focusedStyle: itemFocusedStyle,
    focusedClassName: itemFocusedClassName,
    overFocusedStyle: itemOverFocusedStyle,
    cellStyle
  };
};
