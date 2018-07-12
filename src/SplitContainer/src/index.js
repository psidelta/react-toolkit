/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import autoBind from '@zippytech/react-class/autoBind';
import { Flex, Item } from '../../Flex';
import uglified from '@zippytech/uglified';

import join from '../../common/join';
import clamp from '../../common/clamp';
import isMobile from '../../common/isMobile';
import cleanProps from '../../common/cleanProps';
import shouldComponentUpdate from '../../common/shouldComponentUpdate';

import Splitter from './Splitter';

import isNumber from './isNumber';

import getTransitionEnd from './getTransitionEnd';

const emptyFn = () => {};
const returnFalse = () => false;

const raf = global ? global.requestAnimationFrame : setTimeout;
const cancelRaf = global ? global.cancelAnimationFrame : clearTimeout;

const PERCENTAGE_RE = /%/;

const minMax = (min, max) => {
  return {
    min: Math.min(min, max),
    max: Math.max(min, max)
  };
};

const isPercentage = n => {
  if (isNumber(n)) {
    return false;
  }

  return typeof n == 'string' && isNumber(n.replace(PERCENTAGE_RE, ''));
};

const getSizeName = props =>
  props.orientation == 'horizontal' ? 'height' : 'width';

const getOtherSizeName = props =>
  props.orientation == 'horizontal' ? 'width' : 'height';

const getMaxSizeName = props =>
  props.orientation == 'horizontal' ? 'maxHeight' : 'maxWidth';

const getMinSizeName = props =>
  props.orientation == 'horizontal' ? 'minHeight' : 'minWidth';

const getPositionNames = props =>
  props.orientation == 'horizontal' ? ['top', 'bottom'] : ['left', 'right'];

const toUpperFirst = str =>
  typeof str === 'string' ? str[0].toUpperCase() + str.substring(1) : '';

const getOffsetSizeName = props => {
  const sizeName = getSizeName(props);

  return `client${toUpperFirst(sizeName)}`;
};

const getOffsetSize = node => {
  if (node.getBoundingClientRect) {
    const rect = node.getBoundingClientRect();

    return {
      width: rect.width,
      height: rect.height
    };
  }

  return {
    width: node.offsetWidth,
    height: node.offsetHeight
  };
};

const getMinMaxSizes = function() {
  const node = findDOMNode(this);
  const rect = node.getBoundingClientRect();
  const sizeName = getSizeName(this.props);
  const totalSize = rect[sizeName];
  const splitterSize = isMobile
    ? this.p.mobileSplitterSize || this.p.splitterSize
    : this.p.splitterSize;

  const maxSizes = this.p.maxSize || [];
  const minSizes = this.p.minSize || [];

  const minValues = [0, 1].map(index => {
    const minSize = minSizes[index];
    if (minSize) {
      if (isPercentage(minSize)) {
        return parseFloat(minSize, 10) * totalSize / 100 - splitterSize / 2;
      }
      return minSize;
    }
  });

  const maxValues = [0, 1]
    .map(index => {
      const maxSize = maxSizes[index];
      if (maxSize) {
        if (isPercentage(maxSize)) {
          return parseFloat(maxSize, 10) * totalSize / 100 - splitterSize / 2;
        }
        return maxSize;
      }
    })
    .map((max, index) => {
      if (max) {
        const min = minValues[index];
        const otherMin = minValues[1 - index] || 0;
        max = clamp(max, min, totalSize - otherMin - splitterSize);
      }

      return max;
    });

  return {
    minValues,
    maxValues
  };
};

/**
 * node is the flex wrapper, node.firstChild is the Side, and node.firstChild.firstChild is the actual node
 * we are measuring the auto size for
 */
const getAutoSize = node => {
  // node.firstChild.firstChild may be a comment node,
  // so we're using node.firstChild.children[0],
  // since children does not contain comment nodes
  const targetNode = node.firstChild.children[0];
  if (!targetNode) {
    return {
      width: 0,
      height: 0
    };
  }

  const size = getOffsetSize(targetNode);
  const borderPadding = getBorderPaddingSize(node.firstChild);

  const result = {
    width: size.width + borderPadding.left + borderPadding.right,
    height: size.height + borderPadding.top + borderPadding.bottom
  };

  return result;
};

const toNumber = n => parseInt(n, 10);

const getBorderPaddingSize = node => {
  const computedStyle = global.getComputedStyle(node);

  return {
    left:
      toNumber(computedStyle.borderLeftWidth) +
      toNumber(computedStyle.paddingLeft),
    right:
      toNumber(computedStyle.borderRightWidth) +
      toNumber(computedStyle.paddingRight),
    top:
      toNumber(computedStyle.borderTopWidth) +
      toNumber(computedStyle.paddingTop),
    bottom:
      toNumber(computedStyle.borderBottomWidth) +
      toNumber(computedStyle.paddingBottom)
  };
};

class SplitSide extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = shouldComponentUpdate(this, nextProps, nextState);

    return shouldUpdate;
  }
  render() {
    let Factory = Item;
    const actualProps = cleanProps(this.props, SplitSide.propTypes);

    if (
      this.props.orientation == 'vertical' &&
      this.props.children &&
      this.props.children.props &&
      this.props.children.props.isSplitContainer
    ) {
      Factory = Flex;
      actualProps.flexGrow = 1;
      actualProps.flexShrink = 1;
      actualProps.alignItems = 'stretch';
    }

    if (
      this.props.showWarnings &&
      this.props.fill &&
      React.Children.toArray(this.props.children).length > 1
    ) {
      console.warn(
        `The side at index ${
          this.props.index
        } is configured with "fillSides", but has multiple children. Please only use one child when using "fillSides"`
      );
    }
    return (
      <Factory
        {...actualProps}
        children={this.props.children}
        index={this.props.index}
      />
    );
  }
}

SplitSide.propTypes = {
  shouldComponentUpdate: PropTypes.func,
  fill: PropTypes.bool,
  isSplitContainerSide: PropTypes.bool,
  orientation: PropTypes.string.isRequired,
  index: PropTypes.number,
  splitAtValue: PropTypes.any,
  splitAtIndex: PropTypes.number,
  children: (props, propsName) => {
    if (
      props.index == props.splitAtIndex &&
      props.splitAtValue == 'auto' &&
      React.Children.toArray(props.children).length > 1
    ) {
      return new Error(
        `The SplitContainer side at index ${
          props.splitAtIndex
        } has "auto" splitValue but has multiple children. It should only have 1 child!`
      );
    }
  }
};

class Side extends React.Component {
  render() {
    return null;
  }
}

Side.defaultProps = {
  isSplitContainerSide: true
};

export { Splitter, Side, isMobile };

const TRANSITION_DURATION = '0.4s';

let SPLIT_CONTAINER_INSTANCE_FOCUSED = false;

export default class SplitContainer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.refSplitter = s => {
      this.splitter = s;
    };

    let collapsedIndex = props.defaultCollapsedIndex;

    if (collapsedIndex != 0 && collapsedIndex != 1) {
      collapsedIndex = null;
    }

    this.state = {
      focused: false,
      dragging: false,
      splitAt: props.defaultSplitAt,
      collapsedIndex
    };
  }

  onTransitionEnd(event) {
    event &&
      event.target &&
      event.target.removeEventListener(
        getTransitionEnd(),
        this.onTransitionEnd,
        false
      );

    this.setState({
      collapsing: false,
      expanding: false,

      collapsingIndex: null,
      expandingIndex: null,
      constrainingIndex: null,

      styles: null,

      expandStyle: null,
      collapseStyle: null,

      splitterStyle: null
    });
  }

  hasTransition(props = this.props) {
    if (props.transition === false) {
      return false;
    }
    return !!(props.transition || props.transitionDuration);
  }

  componentWillReceiveProps(nextProps) {
    const props = this.p;

    const collapsedIndex = props.collapsedIndex;
    const nextCollapsedIndex = this.prepareCollapsedIndex(nextProps);

    this.doTransition(nextProps, collapsedIndex, nextCollapsedIndex);
  }

  doTransition(props, oldCollapsed, newCollapsed) {
    const collapsing =
      oldCollapsed == null && (newCollapsed == 0 || newCollapsed == 1);
    const expanding =
      (oldCollapsed == 0 || oldCollapsed == 1) && newCollapsed == null;

    if (collapsing) {
      this.transitionCollapse(props, newCollapsed);
    } else if (expanding) {
      this.transitionExpand(props, oldCollapsed);
    }
  }

  getNodes(nodes) {
    if (nodes) {
      return nodes.map(findDOMNode);
    }

    return [
      findDOMNode(this.first),
      findDOMNode(this.second),
      findDOMNode(this.splitter)
    ];
  }

  transitionExpand(props, expandIndex) {
    const nodes = this.getNodes();

    const transitionDuration = {
      transitionDuration: props.transitionDuration || TRANSITION_DURATION
    };

    const constrainingIndex = 1 - expandIndex;

    const sizeName = getSizeName(props);
    const otherSizeName = getOtherSizeName(props);

    const sideName =
      props.orientation == 'horizontal'
        ? constrainingIndex == 1
          ? 'top'
          : 'bottom'
        : constrainingIndex == 1
          ? 'left'
          : 'right';

    const otherSideName =
      props.orientation == 'horizontal'
        ? constrainingIndex == 1
          ? 'left'
          : 'right'
        : constrainingIndex == 1
          ? 'top'
          : 'bottom';

    const marginName = `margin${toUpperFirst(sideName)}`;

    const { splitAtIndex, asPercentage } = this.p;
    let { splitAtValue } = this.p;

    const sizes = nodes.map(getOffsetSize);

    if (splitAtValue == 'auto') {
      sizes[splitAtIndex] = getAutoSize(nodes[splitAtIndex]);
    }

    const styles = [];
    const totalSize =
      getOffsetSize(nodes[0])[sizeName] + getOffsetSize(nodes[1])[sizeName];

    if (splitAtValue == 'auto') {
      splitAtValue = sizes[splitAtIndex][sizeName];
    }

    let expandSize = splitAtValue;

    if (asPercentage) {
      expandSize = splitAtValue * totalSize / 100;
    }

    if (expandIndex == 1) {
      expandSize = totalSize - expandSize;
    }

    if (splitAtIndex == 1) {
      expandSize = totalSize - expandSize;
    }

    styles[constrainingIndex] = {
      [marginName]: sizes[2][sizeName],
      // keep the size so in case everything is autosized it wont be collapsed to a smaller size
      [otherSizeName]: sizes[2][otherSizeName]
    };

    const { minValues, maxValues } = getMinMaxSizes.call(this);

    expandSize = clamp(
      expandSize,
      minValues[expandIndex],
      maxValues[expandIndex]
    );

    styles[expandIndex] = {
      position: 'absolute',
      zIndex: props.animationZIndex,
      [otherSizeName]: sizes[2][otherSizeName],
      [sizeName]: expandSize,
      [sideName]: -expandSize,
      [otherSideName]: 0
    };

    const splitterStyle = {
      position: 'absolute',
      zIndex: props.animationZIndex,
      [sideName]: 0,
      [otherSideName]: 0
    };

    this.setState(
      {
        expandingIndex: expandIndex,
        styles,
        skipUpdate: true,
        splitterStyle
      },
      () => {
        raf(() => {
          if (!expandSize) {
            if (props.splitAtValue == 'auto') {
              props.showWarnings &&
                console &&
                console.warn &&
                console.warn(
                  `You are using 'splitAt="auto"' but your content in side ${constrainingIndex} is probably 'display:"block"'.
              Use 'display: "inline-block"' for transitions on expand/collapse to work properly.`
                );
            }

            return this.onTransitionEnd();
          }

          const expandNode = nodes[expandIndex];

          expandNode.addEventListener(
            getTransitionEnd(),
            this.onTransitionEnd,
            false
          );

          raf(() => {
            styles[expandIndex] = {
              ...styles[expandIndex],
              [sizeName]: expandSize,
              [sideName]: 0,
              ...transitionDuration
            };

            this.setState({
              skipUpdate: false,
              splitterStyle: {
                ...splitterStyle,
                [sideName]: expandSize,
                ...transitionDuration
              },

              styles
            });
          });
        });
      }
    );
  }

  transitionCollapse(props, nextCollapsedIndex) {
    const nodes = this.getNodes();

    const expandIndex = 1 - nextCollapsedIndex;
    const collapsingIndex = nextCollapsedIndex;

    const sizeName = getSizeName(props);
    const otherSizeName = getOtherSizeName(props);

    const sideName =
      props.orientation == 'horizontal'
        ? nextCollapsedIndex == 1
          ? 'bottom'
          : 'top'
        : nextCollapsedIndex == 1
          ? 'right'
          : 'left';
    const otherSideName =
      props.orientation == 'horizontal'
        ? nextCollapsedIndex == 1
          ? 'right'
          : 'left'
        : nextCollapsedIndex == 1
          ? 'bottom'
          : 'top';

    const marginName = `margin${toUpperFirst(sideName)}`;

    const transitionDuration = {
      transitionDuration: props.transitionDuration || TRANSITION_DURATION,
      transitionProperty: sideName
    };

    const sizes = nodes.map(getOffsetSize);

    const styles = [];

    styles[expandIndex] = {
      [marginName]: sizes[2][sizeName],
      // keep the size so in case everything is autosized, this wont collapse to a smaller size
      [otherSizeName]: sizes[expandIndex][otherSizeName]
    };

    styles[collapsingIndex] = {
      position: 'absolute',
      zIndex: props.animationZIndex,
      [otherSizeName]: sizes[collapsingIndex][otherSizeName],

      [sizeName]: sizes[collapsingIndex][sizeName],

      [sideName]: 0,
      [otherSideName]: 0
    };

    const splitterStyle = {
      position: 'absolute',
      zIndex: props.animationZIndex,

      width: sizes[2].width,
      height: sizes[2].height,

      [sideName]: sizes[collapsingIndex][sizeName],
      [otherSideName]: 0
    };

    this.setState(
      {
        collapsing: true,

        collapsingIndex,

        sizes,
        styles,

        splitterStyle
      },
      () => {
        raf(() => {
          const collapseNode = nodes[collapsingIndex];

          collapseNode.addEventListener(
            getTransitionEnd(),
            this.onTransitionEnd,
            false
          );

          raf(() => {
            styles[collapsingIndex] = {
              ...styles[collapsingIndex],
              [sideName]: -sizes[collapsingIndex][sizeName],
              ...transitionDuration
            };

            this.setState({
              splitterStyle: {
                ...splitterStyle,
                [sideName]: 0,
                ...transitionDuration
              },
              styles
            });
          });
        });
      }
    );
  }

  prepareChildren(props) {
    let splitterProps;
    let firstProps;
    let secondProps;

    const children = [];

    let i = -1;
    React.Children.toArray(props.children).forEach(child => {
      if (child) {
        if (child.props && child.props.isSplitter) {
          splitterProps = child.props;
          return;
        }
        i++;
      }
      if (child && child.props) {
        if (child.props.isSplitter) {
          splitterProps = child.props;
          return;
        }

        if (child.props.isSplitContainerSide) {
          if (i == 1) {
            secondProps = child.props;
          }
          if (i == 0) {
            firstProps = child.props;
          }

          children.push(child.props.children);

          return;
        }
      }

      children.push(child);
    });

    return {
      children,
      firstProps,
      secondProps,
      splitterProps
    };
  }

  prepareCollapsedIndex(props, state = this.state) {
    let collapsedIndex =
      props.collapsedIndex === undefined
        ? state.collapsedIndex
        : props.collapsedIndex;

    if (collapsedIndex !== 0 && collapsedIndex !== 1) {
      collapsedIndex = undefined;
    }

    return collapsedIndex;
  }

  prepareClassNames(props) {
    const { children, collapsedIndex } = props;

    const firstClassName =
      children[0] && children[0].props && children[0].props.className;
    const secondClassName =
      children[1] && children[1].props && children[1].props.className;

    const expandingIndex = this.state.expandingIndex;
    const constrainingIndex = this.state.constrainingIndex;

    const { fillSides } = props;
    const fillFirst = Array.isArray(fillSides)
      ? fillSides[0] === true
      : fillSides === true;
    const fillSecond = Array.isArray(fillSides)
      ? fillSides[1] === true
      : fillSides === true;

    return [
      join(
        firstClassName,
        `${props.rootClassName}__side`,
        `${props.rootClassName}__side--first`,
        collapsedIndex == 0
          ? this.state.collapsing
            ? `${props.rootClassName}__side--collapsing`
            : `${props.rootClassName}__side--collapsed`
          : '',
        expandingIndex == 0 && `${props.rootClassName}__side--expanding`,
        constrainingIndex == 0 && `${props.rootClassName}__side--constraining`,
        `${props.rootClassName}__side--orientation-${props.orientation}`,
        fillFirst && `${props.rootClassName}__side--fill`
      ),

      join(
        secondClassName,
        `${props.rootClassName}__side`,
        `${props.rootClassName}__side--second`,
        collapsedIndex == 1
          ? this.state.collapsing
            ? `${props.rootClassName}__side--collapsing`
            : `${props.rootClassName}__side--collapsed`
          : '',
        expandingIndex == 1 && `${props.rootClassName}__side--expanding`,
        constrainingIndex == 1 && `${props.rootClassName}__side--constraining`,
        `${props.rootClassName}__side--orientation-${props.orientation}`,
        fillSecond && `${props.rootClassName}__side--fill`
      )
    ];
  }

  prepareSplitAt(props) {
    const result = props.splitAt == null ? this.state.splitAt : props.splitAt;

    if (result == null) {
      return 'auto';
    }

    return result;
  }

  prepareProps(thisProps) {
    const props = (this.p = { ...thisProps });

    const prepareChildrenResult = this.prepareChildren(props);
    const { children, firstProps, secondProps } = prepareChildrenResult;

    const splitterProps = {
      iconSize: props.splitIconSize,
      size: props.splitterSize,
      mobileSize: props.mobileSplitterSize,
      mobileSplitterDragArea: props.mobileSplitterDragArea,
      ...props.splitterProps,
      ...prepareChildrenResult.splitterProps
    };

    props.collapsedIndex = this.prepareCollapsedIndex(props);

    if (props.collapsedIndex !== 0 && props.collapsedIndex !== 1) {
      delete props.collapsedIndex;
    } else {
      props.notCollapsedIndex = 1 - props.collapsedIndex;
    }

    if (firstProps) {
      props.firstProps = firstProps;
    }

    if (secondProps) {
      props.secondProps = secondProps;
    }

    props.children = children;
    props.splitterProps = splitterProps;

    props.horizontal = props.orientation == 'horizontal';
    props.vertical = !props.horizontal;

    props.splitAt = this.prepareSplitAt(props);
    props.className = this.prepareClassName(props);

    props.sizeName = getSizeName(props);
    props.otherSizeName = getOtherSizeName(props);
    props.minSizeName = getMinSizeName(props);
    props.maxSizeName = getMaxSizeName(props);

    props.asPercentage = isPercentage(props.splitAt);

    const { splitAt } = props;

    let splitAtIndex = 0;
    let splitAtValue;

    if (splitAt == 'auto') {
      splitAtValue = 'auto';
    } else if (splitAt == '-auto') {
      splitAtValue = 'auto';
      splitAtIndex = 1;
    } else {
      if (1 / splitAt == -Infinity) {
        // we need to check for -0
        // becase otherwise, when splitAt="-30%" and the user is dragging the splitter
        // max to the right, splitAt becomes -0
        // so unless we check for this, the left side will be minimized,
        // instead of the right side
        splitAtIndex = 1;
        splitAtValue = 0;
      }

      splitAtValue = parseFloat(splitAt, 10);

      if (splitAtValue < 0) {
        if (props.asPercentage) {
          splitAtValue = 100 - (100 + splitAtValue);
        } else {
          splitAtValue *= -1;
        }

        splitAtIndex = 1;
      }
    }

    props.splitAtIndex = splitAtIndex;
    props.splitAtValue = splitAtValue;
    props.splitterSize = splitterProps.size;
    props.mobileSplitterSize = splitterProps.mobileSize;

    let { fixedIndex } = props;

    if (fixedIndex != 0 && fixedIndex != 1) {
      fixedIndex = -1;
    }

    let flexIndex = 1 - fixedIndex;

    props.fixedIndex = fixedIndex;
    props.flexIndex = flexIndex;

    props.styles = this.prepareStyles(props);
    props.classNames = this.prepareClassNames(props);
    props.splitterStyle = this.prepareSplitterStyle(props);

    return props;
  }

  prepareSplitterStyle(props) {
    const style = this.state.splitterStyle;

    return style;
  }

  prepareStyles(props) {
    const styles = [{}, {}];

    const sizeProps = (props.sizeProps = [
      {
        flex: 'none'
      },
      {
        flex: 'none'
      }
    ]);

    const {
      collapsedIndex,
      notCollapsedIndex,
      splitAtIndex,
      splitAtValue
    } = props;

    const otherIndex = 1 - splitAtIndex;
    const hasCollapsed = collapsedIndex != undefined;

    let minSize = props.minSize;
    let maxSize = props.maxSize;

    const splitterSize = props.splitterSize;

    const maybePercentage = v =>
      isPercentage(v) ? `calc(${v} - ${splitterSize / 2}px)` : v;

    if (minSize != null && !Array.isArray(minSize)) {
      minSize = [minSize, minSize];
    }
    if (maxSize != null && !Array.isArray(maxSize)) {
      maxSize = [maxSize, maxSize];
    }

    if (minSize) {
      if (minSize[0] != null && collapsedIndex != 0) {
        styles[0][getMinSizeName(props)] = maybePercentage(minSize[0]);
      }
      if (minSize[1] != null && collapsedIndex != 1) {
        styles[1][getMinSizeName(props)] = maybePercentage(minSize[1]);
      }
    }

    if (maxSize) {
      if (maxSize[0] != null && notCollapsedIndex != 0) {
        styles[0][getMaxSizeName(props)] = maybePercentage(maxSize[0]);
      }
      if (maxSize[1] != null && notCollapsedIndex != 1) {
        styles[1][getMaxSizeName(props)] = maybePercentage(maxSize[1]);
      }
    }

    props.minSize = minSize;
    props.maxSize = maxSize;

    // splitAt specified as percentage?
    if (props.asPercentage) {
      sizeProps[splitAtIndex].flex = splitAtValue;
      // also add the flex as inline style
      styles[splitAtIndex].flex = splitAtValue;

      sizeProps[otherIndex].flex = 100 - splitAtValue;
      // also add the flex as inline style
      styles[otherIndex].flex = 100 - splitAtValue;
    } else {
      sizeProps[splitAtIndex].flex = 'none';
      sizeProps[otherIndex].flex = 1;

      styles[splitAtIndex][props.sizeName] = splitAtValue;
    }

    if (hasCollapsed) {
      styles[collapsedIndex][props.sizeName] = 0;
      styles[collapsedIndex][props.sizeName] = 0;

      sizeProps[collapsedIndex].flex = 'none';
      styles[collapsedIndex].flex = 'none';
      sizeProps[notCollapsedIndex].flex = 1;
    }

    if (this.state.expandingIndex != null) {
      sizeProps[1 - this.state.expandingIndex].flex = 1;
    }

    const stateStyles = this.state.styles;

    if (stateStyles) {
      if (stateStyles[0]) {
        styles[0] = { ...stateStyles[0] };
      }

      if (stateStyles[1]) {
        styles[1] = { ...stateStyles[1] };
      }
    }

    styles[0].overflow = 'hidden';
    styles[1].overflow = 'hidden';

    sizeProps[0].style = styles[0];
    sizeProps[1].style = styles[1];

    return styles;
  }

  prepareClassName(props) {
    const rootClassName = props.rootClassName;
    return join(
      rootClassName,
      props.className,
      `${rootClassName}--${props.orientation}`,
      `${rootClassName}--orientation-${props.orientation}`,
      props.theme && `${rootClassName}--theme-${props.theme}`,
      props.locked && `${rootClassName}--locked`,
      props.bordered && `${rootClassName}--bordered`,
      this.isFocused() && `${rootClassName}--focused`,
      (props.collapsedIndex == 0 || props.collapsedIndex == 1) &&
        this.state.collapsingIndex == null &&
        `${rootClassName}--collapsed`,
      this.state.collapsingIndex != null && `${rootClassName}--collapsing`,
      this.state.expandingIndex != null && `${rootClassName}--expanding`,
      this.state.dragging && `${rootClassName}--resizing`,
      this.state.constrained && `${rootClassName}--constrained`
    );
  }

  render() {
    const props = (this.p = this.prepareProps(this.props));

    const row = props.vertical;
    const column = props.horizontal;

    const { splitterProps, collapsedIndex, fillSides } = props;

    const sizeProps = props.sizeProps;

    const fillFirst = Array.isArray(fillSides)
      ? fillSides[0] === true
      : fillSides === true;
    const fillSecond = Array.isArray(fillSides)
      ? fillSides[1] === true
      : fillSides === true;

    const newProps = [
      {
        flex: null,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 'auto',
        className: join(
          props.classNames[0],
          props.firstProps ? props.firstProps.className : null
        ),
        children: this.renderFirst()
      },
      {
        flex: null,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 'auto',
        className: join(
          props.classNames[1],
          props.secondProps ? props.secondProps.className : null
        ),
        children: this.renderSecond()
      }
    ];

    if (
      props.splitAtValue == 'auto' &&
      props.splitAtIndex === collapsedIndex &&
      this.state.collapsingIndex == null
    ) {
      // when we have auto size for a region, in case it is collapsed
      // we need the Item to have flex none to allow the content be sized as is
      // and not wrap to another size
      newProps[props.splitAtIndex].flex = 'none';
      delete newProps[props.splitAtIndex].flexGrow;
    }

    const splitterStyle = {
      ...(splitterProps || {}).style,
      ...props.splitterStyle
    };

    const keyboardNavigationProps = {};

    if (this.props.enableKeyboardNavigation) {
      keyboardNavigationProps.tabIndex = 0;
      keyboardNavigationProps.onKeyDown = this.onKeyDown;
    }

    let sCU;

    if (
      (this.props.skipUpdateOnDrag && this.state.dragging) ||
      (this.props.skipUpdateOnAnimate &&
        (this.state.collapsingIndex != null || this.state.skipUpdate))
    ) {
      sCU = returnFalse;
    }

    return (
      <Flex
        {...keyboardNavigationProps}
        {...cleanProps(this.props, SplitContainer.propTypes)}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        inline={props.inlineFlex}
        children={props.children}
        draggable={null}
        row={row}
        column={column}
        wrap={false}
        alignItems="stretch"
        className={props.className}
      >
        <Flex
          {...sizeProps[0]}
          alignSelf="stretch"
          alignItems="stretch"
          ref={c => {
            this.first = c;
          }}
        >
          <SplitSide
            {...props.firstProps}
            {...newProps[0]}
            index={0}
            shouldComponentUpdate={sCU}
            fill={fillFirst}
            orientation={props.orientation}
            splitAtValue={props.splitAtValue}
            splitAtIndex={props.splitAtIndex}
          />
        </Flex>

        <Splitter
          {...splitterProps}
          size={
            splitterProps.size == null
              ? SplitContainer.defaultProps.splitterSize
              : splitterProps.size
          }
          style={splitterStyle}
          ref={this.refSplitter}
          onDragStart={this.handleSplitterDragStart}
          onDrag={this.handleSplitterDrag}
          onDrop={this.handleSplitterDrop}
          onCollapse={this.handleCollapse}
          onExpand={this.handleExpand}
          orientation={props.orientation}
          locked={props.locked}
          draggable={props.draggable}
          constrained={!props.resizeProxy && this.state.constrained}
          collapsedIndex={props.collapsedIndex}
          collapsible={props.collapsible}
          rootClassName={`${props.rootClassName}__splitter`}
        />

        <Flex
          {...sizeProps[1]}
          alignSelf="stretch"
          alignItems="stretch"
          ref={c => (this.second = c)}
        >
          <SplitSide
            {...props.secondProps}
            {...newProps[1]}
            shouldComponentUpdate={sCU}
            orientation={props.orientation}
            index={1}
            fill={fillSecond}
            splitAtValue={props.splitAtValue}
            splitAtIndex={props.splitAtIndex}
          />
        </Flex>

        {this.props.resizeProxy && this.renderResizeProxy()}
        {this.renderCover()}
      </Flex>
    );
  }

  onKeyDown(event) {
    const { key } = event;

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    if (!this.props.enableKeyboardNavigation) {
      return;
    }

    if (key == 'Escape' && this.props.blurOnEscape && this.isFocused()) {
      this.blur();
      event.stopPropagation();
      event.preventDefault();

      return;
    }

    if (!SPLIT_CONTAINER_INSTANCE_FOCUSED) {
      // no SplitContainer instance is focused, so we don't handle keyboard navigation
      return;
    }

    // a SplitContainer instance is focused - although the event
    // may have occured lower in the hierarchy - so in child SplitContainer instances

    // but if the event was not handled - and no corresponding collapse/expand
    // action was possible for the child instance
    // the event comes up to this instance, which tries to handle the event

    const ctrlKey = event.ctrlKey || event.metaKey;
    const shiftKey = event.shiftKey;

    let handled = false;

    if (ctrlKey) {
      if (this.props.orientation == 'horizontal') {
        if (key === 'ArrowUp') {
          if (this.isCollapsed(1)) {
            if (this.isExpandable(1)) {
              this.expand(1);
              handled = true;
            }
          } else if (this.isCollapsible(0)) {
            this.collapse(0);
            handled = true;
          }
        }

        if (key === 'ArrowDown') {
          if (this.isCollapsed(0)) {
            if (this.isExpandable(0)) {
              this.expand(0);
              handled = true;
            }
          } else if (this.isCollapsible(1)) {
            this.collapse(1);
            handled = true;
          }
        }
      } else if (this.props.orientation == 'vertical') {
        if (key === 'ArrowLeft') {
          if (this.isCollapsed(1)) {
            if (this.isExpandable(1)) {
              this.expand(1);
              handled = true;
            }
          } else if (this.isCollapsible(0)) {
            this.collapse(0);
            handled = true;
          }
        }

        if (key === 'ArrowRight') {
          if (this.isCollapsed(0)) {
            if (this.isExpandable(0)) {
              this.expand(0);
              handled = true;
            }
          } else if (this.isCollapsible(1)) {
            this.collapse(1);
            handled = true;
          }
        }
      }

      if (
        key === 'ArrowLeft' ||
        key === 'ArrowRight' ||
        key === 'ArrowUp' ||
        key === 'ArrowDown'
      ) {
        event.preventDefault();
        if (handled) {
          event.stopPropagation();
        }
      }

      return;
    }

    if (shiftKey && this.props.draggable) {
      if (!this.isCollapsed()) {
        if (this.props.orientation == 'horizontal') {
          if (key == 'ArrowUp') {
            this.handleSplitterDragStart();
            this.handleSplitterDrop({
              top: -this.props.shiftResizeStep
            });
            handled = true;
          }

          if (key == 'ArrowDown') {
            this.handleSplitterDragStart();
            this.handleSplitterDrop({
              top: this.props.shiftResizeStep
            });
            handled = true;
          }
        }

        if (this.props.orientation == 'vertical') {
          if (key == 'ArrowLeft') {
            this.handleSplitterDragStart();
            this.handleSplitterDrop({
              left: -this.props.shiftResizeStep
            });
            handled = true;
          }

          if (key == 'ArrowRight') {
            this.handleSplitterDragStart();
            this.handleSplitterDrop({
              left: this.props.shiftResizeStep
            });
            handled = true;
          }
        }
      }

      if (
        key === 'ArrowLeft' ||
        key === 'ArrowRight' ||
        key === 'ArrowUp' ||
        key === 'ArrowDown'
      ) {
        event.preventDefault();
        if (handled) {
          event.stopPropagation();
        }
      }

      return;
    }
  }

  onFocus(event) {
    if (findDOMNode(this) == event.target) {
      if (this.props.skipUpdateOnFocus) {
        this.focused = true;

        const node = findDOMNode(this);

        const focusedClassName = `${this.props.rootClassName}--focused`;
        if (
          node &&
          node.classList &&
          !node.classList.contains(focusedClassName)
        ) {
          node.classList.add(focusedClassName);
        }
      } else {
        this.setState({
          focused: true
        });
      }

      SPLIT_CONTAINER_INSTANCE_FOCUSED = true;
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  focus() {
    findDOMNode(this).focus();
  }

  blur() {
    findDOMNode(this).blur();
  }

  isFocused() {
    if (this.props.skipUpdateOnFocus) {
      return this.focused;
    }
    return this.state.focused;
  }

  onBlur(event) {
    if (findDOMNode(this) == event.target) {
      if (this.props.skipUpdateOnFocus) {
        this.focused = false;

        const node = findDOMNode(this);

        const focusedClassName = `${this.props.rootClassName}--focused`;
        if (
          node &&
          node.classList &&
          node.classList.contains(focusedClassName)
        ) {
          node.classList.remove(focusedClassName);
        }
      } else {
        this.setState({
          focused: false
        });
      }

      SPLIT_CONTAINER_INSTANCE_FOCUSED = false;
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  renderCover() {
    const props = this.props;
    if (props.renderCover) {
      return props.renderCover();
    }

    if (!props.cover) {
      return null;
    }

    const className = join(
      `${props.rootClassName}__cover`,
      this.state.dragging && `${props.rootClassName}__cover--resizing`
    );

    return (
      <div
        className={className}
        style={{
          visibility: this.state.dragging ? 'visible' : 'hidden',
          position: 'absolute',
          zIndex: props.coverZIndex || props.animationZIndex,
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        }}
      />
    );
  }

  renderResizeProxy() {
    const props = this.p;
    const positionNames = getPositionNames(props);

    const style = {
      visibility: this.state.dragging ? 'visible' : 'hidden',
      [props.otherSizeName]: '100%',
      [props.sizeName]: props.splitterSize,
      position: 'absolute',
      zIndex: props.proxyZIndex || props.animationZIndex,
      [positionNames[0]]: this.state.dragPosition,
      [props.orientation == 'horizontal' ? 'left' : 'top']: 0
    };

    const className = join(
      `${props.rootClassName}__resize-proxy`,
      this.state.constrained &&
        `${props.rootClassName}__resize-proxy--constrained`
    );

    return <div className={className} style={style} />;
  }

  renderFirst() {
    return this.renderAt(0);
  }

  renderSecond() {
    return this.renderAt(1);
  }

  renderAt(index) {
    const children = this.p.children;

    return children[index];
  }

  constrain(value, { min, max }) {
    const { constrain } = this.props;

    if (constrain === false) {
      return {
        value,
        consrained: false
      };
    }

    if (typeof constrain == 'function') {
      return this.props.constrain(value, { min, max });
    }

    const result = clamp(value, min, max);

    return {
      value: result,
      constrained: result !== value
    };
  }

  handleSplitterDragStart() {
    const props = this.p;

    const nodes = this.getNodes();
    const sizes = nodes.map(getOffsetSize);

    this.sizes = sizes;
    this.splitterPosition = sizes[0][props.sizeName];

    const available = sizes[0][props.sizeName] + sizes[1][props.sizeName];

    let splitterMin = 0;
    let splitterMax = available;

    const maybePercentage = v =>
      isPercentage(v) ? parseFloat(v, 10) * available / 100 : v;
    const minSize = (props.minSize || []).map(maybePercentage);
    const maxSize = (props.maxSize || []).map(maybePercentage);

    if (minSize[0]) {
      splitterMin += minSize[0];
    }
    if (minSize[1]) {
      splitterMax -= minSize[1];
    }

    if (maxSize[0]) {
      splitterMax = Math.min(splitterMax, maxSize[0]);
    }

    if (maxSize[1]) {
      splitterMin = Math.max(splitterMin, available - maxSize[1]);
    }

    const values = minMax(splitterMin, splitterMax);

    this.scrollValue = findDOMNode(this)[
      props.vertical ? 'scrollLeft' : 'scrollTop'
    ];
    this.splitterMin = values.min;
    this.splitterMax = values.max;
  }

  handleSplitterDrag(diff) {
    if (this.dragRafId) {
      cancelRaf(this.dragRafId);
    }

    this.dragRafId = raf(() => {
      this.dragRafId = null;
      const props = this.p;

      const positions = getPositionNames(this.props);
      const posName = positions[0];
      const offset = diff[posName];

      if (!offset) {
        return;
      }

      const dragPosition = this.splitterPosition + offset;
      const { value, constrained } = this.constrain(dragPosition, {
        min: this.splitterMin,
        max: this.splitterMax
      });

      const draggingState = { dragging: true };

      if (!props.resizeProxy) {
        this.doResize(value, { constrain: false }, newState => {
          newState = { ...newState, ...draggingState };
          if (this.state.constrained != constrained) {
            newState.constrained = constrained;
          }
          this.setState(newState);
        });
      } else {
        this.setState({
          ...draggingState,
          dragPosition: value,
          constrained
        });
      }
    });
  }

  handleSplitterDrop(diff) {
    if (this.dropRafId) {
      cancelRaf(this.dropRafId);
    }
    this.dropRafId = raf(() => {
      this.dropRafId = null;
      const props = this.p;
      const positions = getPositionNames(props);
      const posName = positions[0];

      const offset = diff[posName];
      const position = this.splitterPosition + offset;

      if (!offset) {
        return;
      }

      this.doResize(position, undefined, newState => {
        this.setState({
          ...newState,
          dragging: false,
          dragPosition: null,
          constrained: false
        });
      });
    });
  }

  doResize(at, { constrain = true } = { constrain: true }, callback) {
    const props = this.p;

    at = Math.round(at);

    let constrained = false;
    let value = at;

    if (constrain) {
      const result = this.constrain(at, {
        min: this.splitterMin,
        max: this.splitterMax
      });

      value = result.value;
      constrained = result.constrained;
    }

    const { splitAtIndex, sizeName } = props;

    const sizes = this.sizes;
    const sign = splitAtIndex == 1 ? -1 : 1;

    if (splitAtIndex == 1) {
      value = sizes[0][sizeName] + sizes[1][sizeName] - value;
    }

    const available = sizes[0][props.sizeName] + sizes[1][props.sizeName];
    if (
      props.usePercentageOnResize === true ||
      (props.usePercentageOnResize === undefined && props.asPercentage)
    ) {
      value = value * 100 / available + '%';
    }

    if (sign == -1) {
      value = typeof value == 'string' ? `-${value}` : -value;
    }

    if (callback) {
      callback({
        splitAt: value
      });
    }

    this.props.onResize(value);
  }

  collapse(index) {
    this.handleCollapse(index);
  }

  expand(index) {
    this.handleExpand(index);
  }

  isCollapsed(index) {
    if (index === undefined) {
      return this.p.collapsedIndex == 0 || this.p.collapsedIndex == 1;
    }

    return this.p.collapsedIndex == index;
  }

  handleCollapse(collapsedIndex) {
    if (!this.isCollapsible(collapsedIndex)) {
      return;
    }
    if (this.props.collapsedIndex === undefined) {
      this.setState({
        collapsedIndex
      });

      if (this.hasTransition()) {
        this.doTransition(this.p, this.p.collapsedIndex, collapsedIndex);
      }
    }

    this.props.onCollapse(collapsedIndex);
  }

  isCollapsible(index) {
    if (
      Array.isArray(this.props.collapsible) &&
      this.props.collapsible[index] !== true
    ) {
      return false;
    }

    return true;
  }

  isExpandable(index) {
    return this.p.collapsedIndex == index;
  }

  handleExpand(expandIndex) {
    const collapsedIndex = this.p.collapsedIndex;

    if (expandIndex !== collapsedIndex) {
      // invalid expand
      return;
    }

    if (!this.isExpandable(expandIndex)) {
      return;
    }

    if (this.props.collapsedIndex === undefined) {
      this.setState({
        collapsedIndex: null
      });

      if (this.hasTransition()) {
        this.doTransition(this.p, collapsedIndex, null);
      }
    }

    this.props.onExpand(expandIndex);
  }
}

const splitAtPropType = (props, propName) => {
  const value = props[propName];
  const fixedIndex = props.fixedIndex;

  if (isPercentage(value) && (fixedIndex == 0 || fixedIndex == 1)) {
    return new Error(
      '"fixedIndex" should be used when "spliAt" is expressed as a fixed number, and not as a percentage'
    );
  }
};

const numberOrString = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
]);

const sizeType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.arrayOf(numberOrString)
]);

SplitContainer.propTypes = {
  animationZIndex: numberOrString,
  coverZIndex: numberOrString,
  proxyZIndex: numberOrString,
  fillSides: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.bool)
  ]),
  rootClassName: PropTypes.string,
  usePercentageOnResize: PropTypes.bool,

  children(props, propName) {
    var propValue = React.Children.toArray(props[propName]);

    propValue = propValue.filter(child => {
      if (child && child.props && child.props.isSplitter) {
        return null;
      }
      return child;
    });

    const isArray = Array.isArray(propValue);
    const isTwo = isArray && propValue.length == 2;

    if (!propValue || !isArray || !isTwo) {
      console.warn(
        `Please pass only 2 children. You provided ${
          isArray ? `${propValue.length} children` : propValue
        }`
      );
    }
  },

  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  fixedIndex: PropTypes.number,
  defaultCollapsedIndex: PropTypes.number,
  collapsedIndex: PropTypes.number,
  shiftResizeStep: PropTypes.number,
  transitionDuration: numberOrString,
  minSize: sizeType,
  maxSize: sizeType,

  locked: PropTypes.bool,
  theme: PropTypes.string,
  draggable: PropTypes.bool,
  cover: PropTypes.bool,
  resizeProxy: PropTypes.bool,
  bordered: PropTypes.bool,
  collapsible: PropTypes.any,
  inlineFlex: PropTypes.bool,
  transition: PropTypes.bool,
  transitionDuration: numberOrString,
  enableKeyboardNavigation: PropTypes.bool,

  onCollapse: PropTypes.func,
  onExpand: PropTypes.func,
  onResize: PropTypes.func,
  splitAtValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  splitterSize: PropTypes.number.isRequired,
  mobileSplitterSize: PropTypes.number,
  mobileSplitterDragArea: PropTypes.number,

  splitIconSize: PropTypes.number,
  splitAt: splitAtPropType,
  defaultSplitAt: splitAtPropType,
  showWarnings: PropTypes.bool,
  skipUpdateOnAnimate: PropTypes.bool,
  skipUpdateOnDrag: PropTypes.bool,
  skipUpdateOnFocus: PropTypes.bool,
  isSplitContainer: PropTypes.bool
};

SplitContainer.defaultProps = {
  theme: 'default',

  rootClassName: 'zippy-react-toolkit-split-container',

  isSplitContainer: true,
  usePercentageOnResize: undefined,

  animationZIndex: 10000,
  proxyZIndex: 10000,
  coverZIndex: 10000,

  splitterSize: isMobile ? 20 : 10,
  mobileSplitterSize: undefined,
  mobileSplitterDragArea: 54,

  fixedIndex: -1,
  orientation: 'horizontal',

  cover: true,
  draggable: true,
  locked: false,
  bordered: false,

  resizeProxy: true,
  inlineFlex: false,

  shiftResizeStep: 20,

  onCollapse: emptyFn,
  onExpand: emptyFn,
  onResize: emptyFn,

  enableKeyboardNavigation: true,
  transition: true,
  fillSides: false,
  skipUpdateOnDrag: true,
  skipUpdateOnFocus: true,
  skipUpdateOnAnimate: true,

  collapsible: [true, true],
  showWarnings: !uglified
};

SplitContainer.Side = Side;
SplitContainer.Splitter = Splitter;
