/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import isMobile from '../../common/isMobile';

import cleanProps from '../../common/cleanProps';
import assign from '../../common/assign';
import debounce from '../../common/debounce';
import join from '../../common/join';

import { Flex } from '../../Flex';
import { NotifyResize } from '../../NotifyResize';
import { InertialManager } from '../../InertialScroller';
import { IS_MS_BROWSER } from '../../common/ua';
import ScrollContainer from '@zippytech/react-scroll-container';

import Arrow from './Arrow';

const VIEW_STYLE_VERTICAL = { maxHeight: '100%' };
const VIEW_STYLE_HORIZONTAL = { maxWidth: '100%' };

const callAll = (...fns) => (...args) => {
  fns.forEach(fn => {
    fn && fn(...args);
  });
};

const pint = global.parseInt;
const raf = global.requestAnimationFrame;
const getCompStyle = global.getComputedStyle;

const NO_SCROLLBARS = () => false;

class ZippyArrowScroller extends Component {
  constructor(props) {
    super(props);

    this.scrollInfo = {
      scrollPos: 0,
      hasStartScroll: false,
      hasEndScroll: false,
      scrollerSize: {
        start: 0,
        end: 0
      }
    };

    this.state = {
      scrolling: false,
      activeScroll: 0
    };

    this.onScrollIntoView = this.onScrollIntoView.bind(this);

    this.handleResize = debounce(this.handleResize.bind(this), 50, {
      leading: false,
      trailing: true
    });

    this.updateScrollInfo = this.updateScrollInfo.bind(this);
    this.rafUpdateScrollInfo = this.rafUpdateScrollInfo.bind(this);
    this.onContainerScroll = this.onContainerScroll.bind(this);
    this.setStripRef = ref => {
      this.strip = findDOMNode(ref);
    };
    this.refScrollContainer = scrollContainer => {
      this.scrollerTarget = scrollContainer;
    };

    this.setRootRef = ref => {
      this.root = findDOMNode(ref);
      if (!this.props.nativeScroll) {
        this.scrollerTarget = this.root;
      }
    };
  }

  onScrollIntoView(event) {
    const node = this.root;

    const eventTarget = event.target;
    if (event.target != node) {
      return;
    }

    const { scrollLeft, scrollTop } = node;

    if (scrollLeft) {
      node.scrollLeft = 0;

      // TODO - we should trigger our scroll, but for now
      // this results in an infinite loop
      /*
      global.requestAnimationFrame(() => {
        if (this.unmounted) {
          return;
        }

        this.scrollerTarget.scrollLeft += scrollLeft;
      });*/
    }
    if (scrollTop && eventTarget) {
      node.scrollTop = 0;

      // TODO - we should trigger our scroll, but for now
      // this results in an infinite loop
      /*
      global.requestAnimationFrame(() => {
        if (this.unmounted) {
          return;
        }

        this.scrollerTarget.scrollTop += scrollTop;
      });
      */
    }
  }

  setupPassiveScrollListener(node) {
    node.addEventListener('scroll', this.onScrollIntoView, {
      passive: true
    });
  }

  removePassiveScrollListener(node = findDOMNode(this)) {
    if (node) {
      node.removeEventListener('scroll', this.onScrollIntoView, {
        passive: true
      });
    }
  }

  componentDidMount() {
    const node = findDOMNode(this);

    this.setupPassiveScrollListener(node);

    raf(() => {
      const name = this.getOffsetSizeName();

      this.scrollInfo.scrollerSize = {
        start:
          this.props.scroller === (true || 'auto') ? this.start[name] : null,
        end: this.props.scroller === (true || 'auto') ? this.end[name] : null
      };

      this.syncScroll({ force: true });
      this.componentIsMounted = true;

      this.inertialManager = new InertialManager({
        arrowSelector: `.${this.props.rootClassName}__arrow`,
        node: this.root,
        viewNode: this.strip,
        setScrollPosition: () => raf(() => this.setScrollPosition()),
        enableMouseDrag: false
      });
    });
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
    this.unmounted = true;
    this.removePassiveScrollListener();
    if (this.inertialManager) {
      this.inertialManager.removeEventListeners();
    }
  }

  render() {
    const { props } = this;
    const {
      useTransformOnScroll,
      nativeScroll,
      vertical,
      rootClassName,
      rtl,
      theme
    } = props;
    const scrollInfo = this.scrollInfo;

    const scrollValue = rtl ? scrollInfo.scrollPos : -scrollInfo.scrollPos;

    const innerWrapperClassName = join(
      `${rootClassName}__inner-wrapper`,
      `${rootClassName}__inner-wrapper--direction-${
        vertical ? 'column' : 'row'
      }`
    );

    const className = join(
      props.className,
      rootClassName,
      !vertical && `${rootClassName}--direction-horizontal`,
      vertical && `${rootClassName}--direction-vertical`,
      rtl && `${rootClassName}--rtl`,
      nativeScroll && `${rootClassName}--native-scroll`,
      theme && `${rootClassName}--theme-${theme}`
    );

    let transformValue;
    let moveStyle = {};

    if (useTransformOnScroll) {
      moveStyle.transform = 'translate3d(0px, 0px, 0px)';
    }
    if (vertical) {
      if (useTransformOnScroll) {
        moveStyle.transform = `translate3d(0px, ${scrollValue}px, 0px)`;
      } else {
        moveStyle.top = scrollValue;
      }
    } else {
      if (useTransformOnScroll) {
        moveStyle.transform = `translate3d(${scrollValue}px, 0px, 0px)`;
      } else {
        moveStyle.left = scrollValue;
      }
    }

    const resizer = (
      <NotifyResize
        key="resizer"
        notifyOnMount
        onResize={this.handleResize}
        notifyResizeDelay={props.notifyResizeDelay}
      />
    );
    const children = [...React.Children.toArray(props.children), resizer];

    const content = (
      <Flex
        key="content"
        wrap={false}
        {...props.childProps}
        className={innerWrapperClassName}
        ref={this.setStripRef}
        children={children}
        style={nativeScroll ? null : moveStyle}
      />
    );

    let finalChildren = [
      resizer,
      content,
      this.renderScroller(-1),
      this.renderScroller(1)
    ];

    if (nativeScroll) {
      const { scrollContainerProps } = this.props;
      let viewStyle = vertical ? VIEW_STYLE_VERTICAL : VIEW_STYLE_HORIZONTAL;
      if (scrollContainerProps && scrollContainerProps.viewStyle) {
        viewStyle = { ...scrollContainerProps.viewStyle, ...viewStyle };
      }
      finalChildren = (
        <ScrollContainer
          style={{ maxHeight: '100%' }}
          shouldAllowScrollbars={NO_SCROLLBARS}
          dragToScroll={false}
          emptyScrollOffset={0}
          viewStyle={viewStyle}
          ref={this.refScrollContainer}
          onResize={
            scrollContainerProps && scrollContainerProps.onResize
              ? callAll(scrollContainerProps.onResize, this.rafUpdateScrollInfo)
              : this.rafUpdateScrollInfo
          }
          children={finalChildren}
          onContainerScroll={this.onContainerScroll}
        />
      );
    }

    return (
      <Flex
        {...cleanProps(props, ZippyArrowScroller.propTypes)}
        ref={this.setRootRef}
        className={className}
        alignItems="start"
        children={finalChildren}
      />
    );
  }

  renderScroller(direction) {
    const { scroller, vertical, rootClassName, nativeScroll } = this.props;
    if (!scroller) {
      return null;
    }

    const arrowName = vertical
      ? direction == (this.props.rtl ? 1 : -1)
        ? 'up'
        : 'down'
      : direction == (this.props.rtl ? 1 : -1)
        ? 'left'
        : 'right';

    const scrollInfo = this.scrollInfo;
    const disabled =
      direction == -1 ? !scrollInfo.hasStartScroll : !scrollInfo.hasEndScroll;

    const arrowRootClassName = `${rootClassName}__arrow`;

    const className = join(
      arrowRootClassName,
      `${arrowRootClassName}--auto`,
      `${arrowRootClassName}--direction-${arrowName}`,
      this.state.activeScroll == direction && `${arrowRootClassName}--active`,
      scroller === 'auto' && disabled && `${arrowRootClassName}--hidden`,
      scroller === 'auto' && !disabled && `${arrowRootClassName}--visible`,
      scroller === true && disabled && `${arrowRootClassName}--disabled`,
      nativeScroll && `${arrowRootClassName}--native-scroll`
    );

    const onClick =
      !disabled && this.props.scrollOnClick
        ? this.handleClick.bind(this, direction)
        : null;

    const onMouseDown =
      !disabled && (!this.props.scrollOnClick || isMobile)
        ? this.startScroll.bind(this, direction)
        : null;

    const onMouseEnter =
      !disabled && this.props.scrollOnMouseEnter
        ? this.startMouseOverScroll.bind(this, direction)
        : null;

    const onMouseLeave =
      !this.props.scrollOnClick || isMobile || this.props.scrollOnMouseEnter
        ? this.stopMouseOverScroll.bind(this, direction)
        : null;

    const onDoubleClick = !disabled
      ? this.handleScrollMax.bind(this, direction)
      : null;

    const scrollerName = direction == -1 ? 'start' : 'end';

    const domProps = {
      ref: ref => {
        this[scrollerName] = ref;
      },
      key: `scroller-${direction}`,
      disabled,
      className,
      onClick,
      onDoubleClick,
      onMouseDown: !isMobile ? onMouseDown : null,
      onTouchStart: isMobile ? onMouseDown : null,
      onTouchEnd: isMobile ? onMouseLeave : null,
      onMouseEnter: !isMobile ? onMouseEnter : null,
      onMouseLeave: !isMobile ? onMouseLeave : null,
      children: this.renderArrowIcon(arrowName)
    };

    let result;

    if (typeof this.props.renderScroller === 'function') {
      result = this.props.renderScroller({ domProps, direction });
    }

    if (result === undefined) {
      result = <div {...domProps} />;
    }

    return result;
  }

  renderArrowIcon(name) {
    const { props } = this;
    return (
      <Arrow
        name={name}
        size={props.arrowSize}
        height={props.arrowHeight}
        width={props.arrowWidth}
        className={`${this.props.rootClassName}__arrow-icon`}
      />
    );
  }

  getOffsetSizeName() {
    return this.props.vertical ? 'offsetHeight' : 'offsetWidth';
  }

  getBorderAndPaddingSize(node = this.root, side) {
    const computedStyle = getCompStyle(node);

    let start;
    let end;
    if (this.props.vertical) {
      start =
        pint(computedStyle.borderTopWidth) + pint(computedStyle.paddingTop);
      end =
        pint(computedStyle.borderBottomWidth) +
        pint(computedStyle.paddingBottom);
      return start + end;
    } else {
      start =
        pint(computedStyle.borderLeftWidth) + pint(computedStyle.paddingLeft);
      end =
        pint(computedStyle.borderRightWidth) + pint(computedStyle.paddingRight);
    }
    return side ? (side == 'start' ? start : end) : start + end;
  }

  getSizeName() {
    return this.props.vertical ? 'height' : 'width';
  }

  /**
   * Cache the available width on this instance.
   * It will be invalidated by handleResize
   *
   * @return {Number}
   */
  getAvailableSize() {
    // if there is no wrapper it will take the root node as wrapper
    if (!this.root) {
      return null;
    }
    const size =
      this.availableSize ||
      (this.props.nativeScroll
        ? this.props.vertical
          ? this.scrollerTarget.scrollTopMax
          : this.scrollerTarget.scrollLeftMax
        : this.root[this.getOffsetSizeName()] - this.getBorderAndPaddingSize());

    this.availableSize = size;

    return size;
  }

  /**
   * Cache the current list width on this instance.
   *
   * It will be invalidated by handleResize
   *
   * @return {Number}
   */
  getCurrentListSize() {
    if (!this.strip) {
      return null;
    }

    return (this.currentListSize =
      this.currentListSize || this.strip[this.getOffsetSizeName()]);
  }

  // events
  handleResize() {
    if (!this.componentIsMounted) {
      return;
    }

    delete this.currentListSize;
    delete this.availableSize;
    this.syncScroll({ force: true });
  }

  handleScrollMax(direction, event) {
    event.stopPropagation();
    event.preventDefault();

    const maxPos = direction == -1 ? 0 : this.scrollInfo.maxScrollPos;

    raf(() => {
      this.setScrollPosition(maxPos);
    });
  }

  handleClick(direction) {
    const offset = this.getAvailableSize();
    this.scrollBy(offset, direction);
  }

  // methods
  stopScroll() {
    global.clearInterval(this.scrollInterval);

    this.setState({
      scrolling: false,
      activeScroll: 0
    });
  }

  rafUpdateScrollInfo() {
    raf(this.updateScrollInfo);
  }

  updateScrollInfo() {
    if (this.componentIsMounted === false) {
      return;
    }
    const availableSize = this.getAvailableSize();
    const listSize = this.getCurrentListSize();
    const scrollInfo = assign(this.scrollInfo, {
      availableSize,
      listSize
    });

    if (this.props.nativeScroll) {
      scrollInfo.maxScrollPos = this.props.vertical
        ? this.scrollerTarget.scrollTopMax
        : this.scrollerTarget.scrollLeftMax;
    } else {
      if (listSize > availableSize) {
        scrollInfo.maxScrollPos = listSize - availableSize;
      } else {
        scrollInfo.maxScrollPos = 0;
      }
    }

    const offsetWidthOrHeight = this.props.vertical
      ? this.root
        ? this.root.offsetHeight
        : 0
      : this.root
      ? this.root.offsetWidth
      : 0;

    scrollInfo.hasStartScroll =
      scrollInfo.scrollPos != 0 &&
      offsetWidthOrHeight < listSize + availableSize;
    scrollInfo.hasEndScroll =
      scrollInfo.scrollPos < scrollInfo.maxScrollPos &&
      offsetWidthOrHeight < listSize + availableSize;

    const hasScroll = listSize > availableSize;
    if (hasScroll !== this.state.hasScroll) {
      this.props.onHasScrollChange(hasScroll);
    }
    this.setState({
      hasScroll
    });
  }

  startScroll(direction, event) {
    const eventName = isMobile ? 'touchend' : 'mouseup';
    event.preventDefault();
    const mouseUpListener = () => {
      this.stopScroll();
      global.removeEventListener(eventName, mouseUpListener);
    };

    global.addEventListener(eventName, mouseUpListener);

    this.scrollInterval = global.setInterval(
      this.doScroll.bind(this, direction),
      this.props.scrollSpeed
    );

    this.setState({
      scrolling: true,
      activeScroll: direction
    });
  }

  onContainerScroll({ scrollTop, scrollLeft }) {
    this.setScrollPosition(this.props.vertical ? scrollTop : scrollLeft, {
      skip: true
    });
  }

  startMouseOverScroll(direction, event) {
    event.preventDefault();
    global.clearInterval(this.mouseOverScrollInterval);
    this.mouseOverScrollInterval = global.setInterval(
      this.doScroll.bind(this, direction),
      this.props.mouseoverScrollSpeed
    );

    this.setState({
      scrolling: true,
      activeScroll: direction
    });
  }

  stopMouseOverScroll() {
    this.stopScroll();
    global.clearInterval(this.mouseOverScrollInterval);
  }

  setScrollPosition(scrollPos, { force, skip } = {}) {
    if (!this.componentIsMounted) {
      return;
    }
    const scrollInfo = this.scrollInfo;
    if (scrollPos > scrollInfo.maxScrollPos) {
      scrollPos = scrollInfo.maxScrollPos;
    }

    if (scrollPos < 0) {
      scrollPos = 0;
    }

    if (scrollPos === scrollInfo.scrollPos && force !== true) {
      return null;
    }

    assign(scrollInfo, {
      hasStartScroll: scrollPos !== 0,
      hasEndScroll: scrollPos < scrollInfo.maxScrollPos,
      scrollPos
    });

    if (!skip && this.props.nativeScroll) {
      if (this.props.vertical) {
        this.scrollerTarget.scrollTop = scrollPos;
      } else {
        this.scrollerTarget.scrollLeft = scrollPos;
      }
    }

    this.setState({});
  }

  syncScroll({ force } = {}) {
    this.updateScrollInfo();
    this.doScroll(0, null, { force });
  }

  scrollIntoView(domNode) {
    const rootNode = this.root;
    if (!domNode || !rootNode) {
      return;
    }

    const rect = domNode.getBoundingClientRect();
    const mainRect = rootNode.getBoundingClientRect();

    const { vertical } = this.props;
    const startSideName = vertical ? 'top' : 'left';
    const endSideName = vertical ? 'bottom' : 'right';

    const startDiff =
      rect[startSideName] -
      (mainRect[startSideName] +
        this.getBorderAndPaddingSize(undefined, 'start'));

    const endDiff =
      rect[endSideName] -
      (mainRect[endSideName] - this.getBorderAndPaddingSize(undefined, 'end'));

    const scrollIntoViewOffset = this.props.scrollIntoViewOffset;

    if (startDiff < 0) {
      this.doScroll(-startDiff + scrollIntoViewOffset, -1);
    } else if (endDiff > 0) {
      this.doScroll(endDiff + scrollIntoViewOffset, 1);
    }
  }

  doScroll(direction, step, { force } = {}) {
    const scrollInfo = this.scrollInfo;
    const newScrollPos =
      scrollInfo.scrollPos + direction * (step || this.props.scrollStep);
    raf(() => {
      this.setScrollPosition(newScrollPos, { force });
    });
  }

  scrollBy(offset, direction, { force } = {}) {
    const scrollInfo = this.scrollInfo;
    const newScrollPos = scrollInfo.scrollPos + direction * offset;
    raf(() => {
      this.setScrollPosition(newScrollPos, { force });
    });
  }
}

const emptyFn = () => {};

ZippyArrowScroller.defaultProps = {
  rootClassName: 'zippy-react-toolkit-arrow-scroller',
  scroller: 'auto',
  scrollStep: 15,
  mouseoverScrollSpeed: 40,
  scrollSpeed: 10,
  scrollSpringConfig: {
    stiffness: 370,
    damping: 60
  },
  scrollIntoViewOffset: 1,
  vertical: false,
  scrollOnClick: false,
  nativeScroll: !IS_MS_BROWSER,
  scrollOnMouseEnter: true,
  rtl: false,
  useTransformOnScroll: false,
  onHasScrollChange: emptyFn,
  theme: 'default'
};

ZippyArrowScroller.propTypes = {
  arrowSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  ]),
  theme: PropTypes.string,

  scrollOnClick: PropTypes.bool,
  childProps: PropTypes.object,
  scrollOnMouseEnter: PropTypes.bool,
  vertical: PropTypes.bool,
  notifyResizeDelay: PropTypes.number,
  scrollStep: PropTypes.number,
  scrollSpeed: PropTypes.number,
  mouseoverScrollSpeed: PropTypes.number,
  scrollSpringConfig: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number
  }),
  nativeScroll: PropTypes.bool,
  scrollIntoViewOffset: PropTypes.number,
  scroller: PropTypes.oneOf(['auto', false, true]),
  rootClassName: PropTypes.string,
  rtl: PropTypes.bool,
  scrollContainerProps: PropTypes.object,
  useTransformOnScroll: PropTypes.bool,
  onHasScrollChange: PropTypes.func,
  renderScroller: PropTypes.func
};

export default ZippyArrowScroller;
