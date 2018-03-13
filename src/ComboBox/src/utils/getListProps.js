function getListProps({ props, state = {}, computed }) {
  return {
    ...computed,
    style: props.listStyle,
    relativeToViewport: props.relativeToViewport,
    virtualListFactory: props.virtualListFactory,
    renderListScroller: props.renderListScroller,
    renderVirtualList: props.renderVirtualList,
    className: props.listClassName,
    rootClassName: `${props.rootClassName}__list`,
    emptyText: props.listEmptyText,
    maxHeight: props.listMaxHeight,
    minHeight: props.listMinHeight,
    positions: props.positions,
    constrainTo: props.constrainTo,
    offset: props.offset,
    highlightFirst: props.highlightFirst,
    loadingText: props.listLoadingText,
    groups: state.groups,
    renderGroup: props.renderGroup,
    renderFooter: props.renderFooter,
    renderHeader: props.renderHeader,
    renderItem: props.renderItem,
    activeItemIndex: state.activeItemIndex,
    newCustomTagText: props.newCustomTagText,
    autoPosition: props.autoPosition,
    itemProps: {
      background: props.itemBackground,
      disabledStyle: props.disabledItemStyle,
      disabledClassName: props.disabledItemClassName,
      activeStyle: props.activeItemStyle,
      activeClassName: props.activeItemClassName,
      selectedStyle: props.selectedStyle,
      selectedClassName: props.selectedClassName
    }
  };
}

export default getListProps;
