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

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import cleanProps from '../../../common/cleanProps';
/**
 * Stand in component for the real Virtual List (pro)
 */
class FakeVirtualList extends Component {
  constructor(props) {
    super(props);

    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.targetRef = node => {
      if (!node) {
        this.targetNode = null;
      }
      this.targetNode = node;
    };
  }
  render() {
    const { props } = this;
    const count = this.props.count;

    const list = [];
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        list.push(props.renderRow({ index: i }));
      }
    }

    const listProps = {
      ref: this.targetRef,
      children: list,
      ...cleanProps(props, FakeVirtualList.propTypes),
      onScroll: this.handleOnScroll
    };

    let result;

    if (this.props.renderListScroller) {
      result = this.props.renderListScroller(listProps);
    }

    if (result === undefined) {
      result = <div {...listProps} />;
    }

    return result;
  }

  getContainerNode() {
    return this.targetNode && this.targetNode.getContainerTargetNode
      ? this.targetNode.getContainerTargetNode()
      : this.targetNode;
  }

  getRootNode() {
    return findDOMNode(this.targetNode);
  }

  getScrollerNode() {
    return this.targetNode && this.targetNode.getScrollerNode
      ? this.targetNode.getScrollerNode()
      : this.targetNode;
  }

  scrollToIndex(index) {
    const containerNode = this.getContainerNode();
    const rootNode = this.getRootNode();
    const scrollerNode = this.getScrollerNode();

    if (!containerNode) {
      return null;
    }
    if (containerNode && !containerNode.childNodes.length) {
      return null;
    }
    const itemNode = containerNode.childNodes[index];
    if (!itemNode) {
      return null;
    }

    const itemHeight = itemNode.offsetHeight;
    const itemOffsetTop = itemNode.offsetTop;
    const scrollTop = scrollerNode.scrollTop;
    const containerHeight = rootNode.offsetHeight;

    // at the top and have to scroll to itemOffsetTop
    if (scrollTop > itemOffsetTop) {
      scrollerNode.scrollTop = itemOffsetTop;
    }

    // at the bottom, have to scroll more
    if (scrollTop + containerHeight < itemHeight + itemOffsetTop) {
      scrollerNode.scrollTop = itemOffsetTop + itemHeight - containerHeight;
    }

    return true;
  }

  handleOnScroll(event) {
    const rootNode = this.getRootNode();
    const scrollTop = event.target.scrollTop;
    const listHeight = rootNode.offsetHeight;
    const scrollHeight = rootNode.scrollHeight;

    if (scrollTop + listHeight + 5 >= scrollHeight) {
      this.props.scrollProps.onContainerScrollVerticalMax();
    }
  }
}

FakeVirtualList.propTypes = {
  autoHide: PropTypes.bool,
  count: PropTypes.number,
  renderRow: PropTypes.func,
  minRowHeight: PropTypes.number,
  tagIndex: PropTypes.number,
  shouldComponentUpdate: PropTypes.func,
  renderListScroller: PropTypes.func,
  scrollProps: PropTypes.object,
  virtualized: PropTypes.bool
};

export default FakeVirtualList;
