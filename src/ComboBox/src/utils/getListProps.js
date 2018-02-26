/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
