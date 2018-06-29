/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Component from '@zippytech/react-class';
import assign from '../../common/assign';
import { Flex } from '../../Flex';
import join from '../../common/join';
import getTransitionEnd from './getTransitionEnd';
import TabStrip from './TabStrip';
import Body from './Body';
import assignDefined from './assignDefined';
import cleanProps from '../../common/cleanProps';

import TAB_POSITION_MAP from './tabPositions';
import bemFactory from './bemFactory';

const clone = (child, fn) => {
  const childProps = child.props;
  child = cloneElement(child, assign({}, childProps, fn(childProps, child)));
  return child;
};

const cloneDisplayNone = child =>
  clone(child, childProps => {
    const childStyle = childProps ? childProps.style : null;
    return {
      style: assign({}, childStyle, { display: 'none' })
    };
  });

const cloneWithClassName = (className, child) =>
  clone(child, childProps => {
    return {
      className: join(childProps && childProps.className, className)
    };
  });

const STRATEGIES = {
  one: (children, activeIndex) => children[activeIndex],
  all: (children, activeIndex) => {
    return children.map((child, index) => {
      if (index !== activeIndex) {
        child = cloneDisplayNone(child);
      }
      return child;
    });
  }
};

class Tab extends Component {
  render() {
    return <div {...cleanProps(this.props, Tab.propTypes)} />;
  }
}

Tab.defaultProps = {
  isTabPanelTab: true
};

Tab.propTypes = {
  isTabPanelTab: PropTypes.bool,
  title: PropTypes.node
};

export default class ZippyTabPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldActiveIndex: null,
      activeIndex: props.defaultActiveIndex || 0,
      focusedIndex: props.defaultFocusedIndex || 0
    };
  }

  prepareClassName(props) {
    return join(
      props.className,
      props.rootClassName,
      `${props.rootClassName}--orientation-${
        props.vertical ? 'vertical' : 'horizontal'
      }`,
      `${props.rootClassName}--theme-${props.theme}`,
      `${props.rootClassName}--tab-align-${props.tabAlign}`,
      `${props.rootClassName}--tab-position-${props.tabPosition}`
    );
  }

  prepareProps(thisProps) {
    const props = assign({}, thisProps);
    let tabStrip = {};
    let tabBody;
    let tabStripIndex;
    let tabBodyIndex;

    let children = [];

    let tabs = [];

    React.Children.toArray(props.children).forEach((child, index) => {
      if (!child) {
        return;
      }
      const childProps = child.props;

      if (childProps) {
        if (childProps.isTabStrip) {
          tabStrip = childProps;
          tabStripIndex = index;
          return;
        }

        if (childProps.isTabBody) {
          tabBody = childProps;
          tabBodyIndex = index;
          return;
        }
      }
    });

    const addTab = child => {
      if (!child) {
        return null;
      }

      const childProps = child.props || {};

      if (childProps.isTabPanelTab) {
        children.push(child);

        if (props.transition && child.props.children) {
          console.warn(
            'You must only have one child in a Tab component when `transition` is true.'
          );
        }
      } else {
        children.push(child);
      }

      let tab;
      if (childProps.isTabPanelTab) {
        tab = assign({}, childProps, {
          children: null
        });
      } else {
        tab = assign(
          {
            title: childProps.tabTitle || '',
            disabled: childProps.disabled
          },
          childProps.tabProps
        );
      }

      tabs.push(tab);
    };

    const { contentStyle, contentClassName } = this.props;

    React.Children.toArray(tabBody ? tabBody.children : props.children).forEach(
      addTab
    );

    children = children.map(child => {
      if (contentStyle || contentClassName) {
        const initialChildStyle = (child.props || {}).style;
        const initialChildClassName = (child.props || {}).className;

        const childStyle = contentStyle
          ? { ...contentStyle, ...initialChildStyle }
          : { ...initialChildStyle };

        const childClassName = contentClassName
          ? join(initialChildClassName, contentClassName)
          : initialChildClassName;

        child = cloneElement(child, {
          style: childStyle,
          className: childClassName
        });
      }
      if (typeof child.type === 'string') {
        const childProps = { ...child.props };
        const Comp = child.type;
        delete childProps.tabTitle;
        delete childProps.tabProps;
        return <Comp {...childProps} />;
      }

      return child;
    });

    props.tabs = tabs;

    props.activeIndex = this.prepareActiveIndex(props);
    props.focusedIndex = this.prepareFocusedIndex(props);
    props.tabPosition = this.prepareTabPosition(props, {
      tabStripIndex,
      tabBodyIndex
    });

    props.vertical =
      props.vertical &&
      (props.tabPosition == 'left' || props.tabPosition == 'right');
    props.tabStrip = tabStrip;
    props.tabBody = tabBody;
    props.children = children;

    if (props.transition) {
      props.initialStrategy = props.strategy;
      props.strategy = this.transitionStrategy;
    }

    return props;
  }

  componentDidMount() {
    this.body.addEventListener(getTransitionEnd(), this.onBodyTransitionEnd);
  }

  componentWillUnmount() {
    this.body &&
      this.body.removeEventListener(
        getTransitionEnd(),
        this.onBodyTransitionEnd
      );
  }

  onBodyTransitionEnd() {
    if (!this.state.transitioning) {
      return;
    }

    this.setState({
      transitioning: null,
      transitionInProgress: false,
      wrapperStyle: null,
      oldActiveIndex: null
    });
  }

  componentWillUpdate(nextProps, nextState) {
    const activeIndex = this.p.activeIndex;
    const newActiveIndex = this.prepareActiveIndex(nextProps, nextState);

    if (newActiveIndex != activeIndex && nextProps.transition) {
      if (!this.wrapper) {
        return;
      }

      const dir = newActiveIndex > activeIndex ? 1 : -1;

      const getActiveChild = () => {
        return this.p.initialStrategy == 'one'
          ? this.wrapper.firstChild
          : this.wrapper.children[activeIndex];
      };
      const getOtherChild = () => {
        return this.p.initialStrategy == 'one'
          ? dir == 1
            ? this.wrapper.lastChild
            : this.wrapper.firstChild
          : this.wrapper.children[newActiveIndex];
      };

      const childHeight = () => {
        const child = getActiveChild();
        return child && child.offsetHeight;
      };

      const activeChild = getActiveChild();

      // at this point only 1 child should be rendered
      const currentChildHeight = (activeChild && activeChild.offsetHeight) || 0;

      const wrapperStyle = {
        height: this.wrapper.offsetHeight
      };

      if (this.state.transitioning) {
        this.onBodyTransitionEnd();
      }

      this.setState(
        {
          transitioning: dir,
          wrapperStyle: {
            height: wrapperStyle.height
          },
          oldActiveIndex: activeIndex
        },
        () => {
          if (!this.wrapper) {
            this.onBodyTransitionEnd();
          }

          const otherChild = getOtherChild();

          const wrapperHeight =
            wrapperStyle.height -
            currentChildHeight +
            ((otherChild && otherChild.offsetHeight) || 0);

          this.setState({
            transitioning: dir,
            transitionInProgress: true,
            wrapperStyle: { height: wrapperHeight }
          });
        }
      );
    }
  }

  transitionStrategy(children, activeIndex) {
    const strategy = this.p.initialStrategy;
    const strategyFn = STRATEGIES[strategy];

    if (!strategyFn) {
      console.warn('Strategy not supported for transition');
    }

    const IN_CLASS_NAME = `${this.props.rootClassName}__content--in`;
    const OUT_CLASS_NAME = `${this.props.rootClassName}__content--out`;

    if (this.state.oldActiveIndex != null) {
      if (strategy == 'one') {
        const indexes = [this.state.oldActiveIndex, activeIndex];

        // render them in the correct order
        indexes.sort();

        const firstIndex = indexes[0];
        const firstIn = firstIndex == activeIndex;

        const secondIndex = indexes[1];

        const firstClassName = firstIn ? IN_CLASS_NAME : OUT_CLASS_NAME;
        const secondClassName = firstIn ? OUT_CLASS_NAME : IN_CLASS_NAME;

        children = [
          clone(children[firstIndex], childProps => ({
            style: this.addTransitionDuration(childProps && childProps.style),
            className: join(childProps && childProps.className, firstClassName)
          })),

          clone(children[secondIndex], childProps => ({
            style: this.addTransitionDuration(childProps && childProps.style),
            className: join(childProps && childProps.className, secondClassName)
          }))
        ];
      } else {
        // strategy == 'all'
        children = children.map((child, index) => {
          if (index != activeIndex && index != this.state.oldActiveIndex) {
            child = cloneDisplayNone(child);
          } else {
            const className =
              index == activeIndex ? IN_CLASS_NAME : OUT_CLASS_NAME;

            child = clone(child, childProps => ({
              className: join(childProps && childProps.className, className),
              style: this.addTransitionDuration(childProps.style)
            }));
          }

          return child;
        });
      }
    } else {
      children = strategyFn(children, activeIndex);
    }

    const wrapperStyle = this.addTransitionDuration(this.state.wrapperStyle);
    const transitionWrapperClassName = `${
      this.props.rootClassName
    }__transition-wrapper`;
    return (
      <div
        ref={c => (this.wrapper = c)}
        style={wrapperStyle}
        className={join(
          transitionWrapperClassName,
          this.props.vertical ? `${transitionWrapperClassName}--vertical` : ''
        )}
        children={children}
      />
    );
  }

  addTransitionDuration(style) {
    if (this.props.transitionDuration) {
      style = assign({}, style, {
        transitionDuration: this.props.transitionDuration
      });
    }

    return style;
  }

  prepareTabPosition(props, { tabStripIndex, tabBodyIndex }) {
    let tabPosition =
      props.tabPosition in TAB_POSITION_MAP ? props.tabPosition : 'top';

    if (
      !props.tabPosition &&
      tabStripIndex !== undefined &&
      tabBodyIndex !== undefined &&
      tabStripIndex > tabBodyIndex
    ) {
      tabPosition = 'bottom';
    }

    return tabPosition;
  }

  prepareActiveIndex(props, state) {
    return props.activeIndex == null
      ? (state || this.state).activeIndex
      : props.activeIndex;
  }

  prepareFocusedIndex(props, state) {
    return props.focusedIndex == null
      ? (state || this.state).focusedIndex
      : props.focusedIndex;
  }

  render() {
    const props = (this.p = this.prepareProps(this.props));

    const className = this.prepareClassName(props);

    const tabStripFirst =
      props.tabPosition == 'top' || props.tabPosition == 'left';
    const row = props.tabPosition == 'left' || props.tabPosition == 'right';

    const rowColConfig = {
      [row ? 'row' : 'column']: true
    };

    return (
      <Flex
        wrap={false}
        alignItems="stretch"
        {...rowColConfig}
        inline
        {...cleanProps(props, ZippyTabPanel.propTypes)}
        tabIndex={null}
        className={className}
      >
        {tabStripFirst && this.renderTabStrip()}
        {this.renderBody()}
        {!tabStripFirst && this.renderTabStrip()}
      </Flex>
    );
  }

  onActivate(activeIndex) {
    if (this.props.activeIndex == null) {
      this.setState({
        activeIndex
      });
    }

    this.props.onActivate(activeIndex);
  }
  onFocusedIndexChange(focusedIndex) {
    if (this.props.focusedIndex == null) {
      this.setState({
        focusedIndex
      });
    }

    this.props.onFocusedIndexChange(focusedIndex);
  }

  renderTabStrip() {
    const tabs = this.p.tabs;

    const {
      activeIndex,
      focusedIndex,
      activateOnFocus,
      activateEvent,
      onAddNew,
      onCloseTab,
      closeable,
      closeableOnOver,
      scroller,
      scrollSpringConfig,
      scrollOnClick,
      tabFactory,
      tabStripFactory,
      theme,
      tabAlign,
      tabClassName,
      tabActiveClassName,
      tabDisabledClassName,
      tabFocusedClassName,
      tabStyle,
      tabDisabledStyle,
      tabActiveStyle,
      tabPosition,
      tabEllipsis,
      tabIndex,
      vertical,
      enableKeyboardNavigation,
      rootClassName
    } = this.p;

    const newTabStripProps = {
      activateEvent,
      activateOnFocus,
      onActivate: this.onActivate,
      onFocusedIndexChange: this.onFocusedIndexChange,
      activeIndex,
      focusedIndex,
      tabFactory,
      tabAlign,
      theme,
      defaultTabs: tabs,
      tabPosition,
      enableKeyboardNavigation,
      inTabPanel: true
    };

    assignDefined(newTabStripProps, {
      onAddNew,
      onCloseTab,
      closeable,
      closeableOnOver,
      scroller,
      scrollSpringConfig,
      scrollOnClick,
      vertical,
      tabStyle,
      tabDisabledStyle,
      tabActiveStyle,
      tabClassName,
      tabActiveClassName,
      tabDisabledClassName,
      tabFocusedClassName,
      tabEllipsis,
      tabIndex
    });

    const tabStripProps = assign(
      { tabFactory },
      this.p.tabStrip,
      newTabStripProps,
      {
        rootClassName: `${rootClassName}__tab-strip`,
        topRootClassName: rootClassName
      }
    );

    let tabStrip;

    if (tabStripFactory) {
      tabStrip = tabStripFactory(tabStripProps);
    }

    if (tabStrip === undefined) {
      tabStrip = <TabStrip {...tabStripProps} />;
    }

    return tabStrip;
  }

  applyRenderStrategy({ activeIndex, children, strategy }) {
    let fn = STRATEGIES[strategy];

    if (typeof fn != 'function') {
      fn = typeof strategy == 'function' ? strategy : STRATEGIES.all;
    }

    return fn(children, activeIndex);
  }

  renderBody() {
    const {
      tabBodyStyle,
      activeIndex,
      transition,
      vertical,
      rootClassName,
      tabBodyClassName
    } = this.p;
    const bodyChildren = this.applyRenderStrategy(this.p);
    const tabBody = this.p.tabBody || {};

    const bodyStyle = {
      ...tabBody.style,
      ...tabBodyStyle
    };
    const bodyClassName = join(tabBody.className, tabBodyClassName);
    const bodyProps = assign({}, this.p.tabBody, {
      vertical,
      transition,
      transitionInProgress: this.state.transitionInProgress,
      stretchTabContent: this.props.stretchTabContent,
      scrollTabContent: this.props.scrollTabContent,
      activeIndex,
      className: bodyClassName,
      style: bodyStyle,
      tabPosition: this.p.tabPosition,
      renderContent: this.p.renderContent,
      children: bodyChildren
    });

    return (
      <Body
        ref={b => (this.body = findDOMNode(b))}
        transitioning={this.state.transitioning}
        rootClassName={`${rootClassName}__body`}
        {...bodyProps}
        {...this.state.bodyProps}
      />
    );
  }
}

ZippyTabPanel.propTypes = {
  activeIndex: PropTypes.number,
  focusedIndex: PropTypes.number,
  defaultFocusedIndex: PropTypes.number,
  onFocusedIndexChange: PropTypes.func,
  activateOnFocus: PropTypes.bool,
  contentClassName: PropTypes.string,
  defaultActiveIndex: PropTypes.number,
  enableKeyboardNavigation: PropTypes.bool,
  initialStrategy: PropTypes.string,
  onActivate: PropTypes.func,
  onCloseTab: PropTypes.func,
  renderContent: PropTypes.func,
  rootClassName: PropTypes.string,
  tabAlign: PropTypes.string,
  tabBody: PropTypes.any,
  tabStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  tabDisabledStyle: PropTypes.shape({}),
  tabActiveStyle: PropTypes.shape({}),
  tabClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  tabActiveClassName: PropTypes.string,
  tabDisabledClassName: PropTypes.string,
  tabFocusedClassName: PropTypes.string,
  tabBodyStyle: PropTypes.any,
  contentStyle: PropTypes.object,

  tabBodyClassName: PropTypes.string,
  tabEllipsis: PropTypes.bool,
  tabFactory: PropTypes.func,
  tabFactory: PropTypes.func,
  tabPosition: PropTypes.string,
  tabStrip: PropTypes.any,
  tabStripFactory: PropTypes.func,
  tabs: PropTypes.array,
  theme: PropTypes.string,
  transition: PropTypes.bool,
  closeableOnOver: PropTypes.bool,
  closeable: PropTypes.bool,
  stretchTabContent: PropTypes.bool,
  scrollTabContent: PropTypes.bool,
  scroller: PropTypes.oneOf([true, false, 'auto']),
  vertical: PropTypes.bool,
  strategy: PropTypes.oneOfType([
    PropTypes.oneOf(['one', 'all']),
    PropTypes.func
  ])
};

ZippyTabPanel.defaultProps = {
  rootClassName: 'zippy-react-toolkit-tab-panel',
  scrollTabContent: true,
  theme: 'default',
  tabAlign: 'start',
  onActivate: () => {},
  onCloseTab: () => {},
  onFocusedIndexChange: () => {},
  strategy: 'one',
  activateOnFocus: false
};

export { Tab, TabStrip, Body as TabBody };
