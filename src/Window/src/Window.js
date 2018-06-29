/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autoBind } from '@zippytech/react-class';
import Region from '@zippytech/region';
import DragHelper from '@zippytech/drag-helper';

import Panel from '../../Panel';
import Button from '../../Button';
import Icon from '../../common/Icon';
import toUpperFirst from '../../common/toUpperFirst';

import assign from '../../common/assign';
import isMobile from '../../common/isMobile';
import cleanProps from '../../common/cleanProps';
import throttle from '../../common/throttle';
import isEqual from '../../common/shallowequal';
import pxToFloat from '../../common/pxToFloat';
import containsNode from '../../common/containsNode';
import getOffsetParent from '../../common/getOffsetParent';
import getParentWithTranslate from '../../common/getParentWithTranslate';
import getConstrainRegion from '../../common/getConstrainRegion';
import getRelativeRegion from './utils/getRelativeRegion';
import getMinMaxSize from '../../common/getMinMaxSize';
import isEventDoubleTap from '../../common/isEventDoubleTap';
import getFocusableElements from '../../common/getFocusableElements';
import getViewportRegion from '../../common/getViewportRegion';
import join from '../../common/join';
import updateSizeWithDirection from './utils/updateSizeWithDirection';
import getDefaultMobileHandleConfig from './utils/getDefaultMobileHandleConfig';
import getPositionRelativeToNewRegion from './utils/getPositionRelativeToNewRegion';

import getHandles from './getHandles';
import onResizeDrag from './utils/onResizeDrag';
import manager from './manager';

function emptyFn() {}

const raf = global.requestAnimationFrame;

const returnNull = () => null;

class ZippyWindow extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      dragging: false,
      resizing: false,
      size: props.defaultSize,
      position: props.defaultPosition,
      maximized: props.defaultMaximized,
      centered: props.defaultCentered,
      collapsed: props.defaultCollapsed,
      visible:
        props.visible !== undefined ? props.visible : props.defaultVisible,
      relativeToViewport: props.defaultRelativeToViewport
    };

    this.setupPanelRefs = node => {
      this.node = node && node.getDOMRootNode();
      this.titleBarNode = node && node.getDOMTitleBarNode();
      this.bodyNode = node && node.getBodyNode();
    };

    this.getProxyRef = node => {
      this.proxy = node;
    };

    this.handleTitleDragThrottle = throttle(this.handleTitleDrag, 16);
  }

  componentDidMount() {
    const domNode = this.node;

    this.props.onMount(this, domNode);
    if (this.props.constrainOnWindowResize) {
      this.setupWindowResizeListener();
    }
    if (this.props.constrainOnWindowScroll) {
      this.setupWindowScrollListener();
    }
    this.register();

    this.componentIsMounted = true;

    if (this.isAutoFocus()) {
      raf(() => {
        if (this.isAutoFocus() && this.componentIsMounted) {
          this.focus();
        }
      });
    }
  }

  isAutoFocus() {
    return this.props.autoFocus || this.props.autofocus;
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.isMaximizedControlled() &&
      this.props.maximized !== nextProps.maximized
    ) {
      this.handleMaximizedChange(nextProps.maximized);
    }

    if (
      this.isRelativeToViewportControlled() &&
      this.props.relativeToViewport !== nextProps.relativeToViewport
    ) {
      this.updatePositionWithOffsetParentChange(nextProps.relativeToViewport);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.modal != prevProps.modal) {
      this.refreshZIndex();
    }

    if (this.props.visible !== prevProps.visible) {
      this.handleVisibleChange(this.props.visible);
      if (this.isAutoFocus()) {
        raf(() => {
          if (this.props.visible) {
            this.focus();
          }
        });
      }
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = null;
    if (this.windowResizeListener) {
      this.detachWindowResizeListener();
    }
    if (this.windowScrollListener) {
      this.detachWindowScrollListener();
    }

    this.layer = null;
    this.unRegister();
  }

  render() {
    const state = this.state;
    const props = this.props;

    if (!this.getVisible() && props.renderNullWhenInvisible) {
      return null;
    }

    const rootClassName = this.props.rootClassName;
    const className = this.getClassNames();
    const style = this.prepareStyle(props, state);

    const scrollerClassName = join(
      props.bodyClassName,
      `${rootClassName}__body`,
      props.bodyScrollable && `${rootClassName}__body--scrollable`
    );

    const footerClassName = join(
      `${rootClassName}__body-footer`,
      props.bodyScrollable && `${rootClassName}__body-footer--scrollable`
    );

    const bodyClassName =
      props.renderFooter === undefined ? scrollerClassName : footerClassName;

    const children = props.enableMoveProxy
      ? [
          state.dragging && !props.keepChildrenOnMove ? null : props.children,
          <div
            key="proxy"
            className={join(
              `${rootClassName}__body-move-proxy`,
              state.dragging && `${rootClassName}__body-move-proxy--visible`
            )}
          />
        ]
      : props.children;

    const panel = (
      <Panel
        {...cleanProps(props, ZippyWindow.propTypes)}
        {...this.getToolBarProps()}
        tabIndex={0}
        style={style}
        renderFooter={
          this.getCollapsed() ? returnNull : this.props.renderFooter
        }
        renderTitleBar={this.renderTitleBar}
        onKeyDown={this.onWindowKeyDown}
        ref={this.setupPanelRefs}
        className={className}
        rootClassName={rootClassName}
        onMouseDown={this.handleWindowMouseDown}
        onTouchStart={this.handleWindowTouchStart}
        onFocus={this.onWindowFocus}
        onBlur={this.onWindowBlur}
        onMouseEnter={this.onWindowMouseEnter}
        onMouseLeave={this.onWindowMouseLeave}
        directChildren={[
          this.renderResizeHandles(props, this.state),
          props.enableResizeProxy && this.renderResizeProxy()
        ]}
        /**
         * panel direct props
         * that have propTypes on window
         * they are removed by cleanProps
         */
        titleClassName={props.titleClassName}
        bodyClassName={bodyClassName}
        titleStyle={props.titleStyle}
        bodyStyle={this.prepareBodyStyle(props)}
        bodyScrollable={props.bodyScrollable}
      >
        {props.url ? this.renderIFrame() : children}
      </Panel>
    );

    if (props.modal && this.state.visible) {
      return this.renderModalWrapper(panel, style);
    }
    return panel;
  }

  renderIFrame() {
    const { props } = this;
    const style = {};
    const domProps = {
      style
    };
    return (
      <iframe
        className={`${props.rootClassName}__iframe`}
        src={props.url}
        {...domProps}
      />
    );
  }

  renderModalWrapper(panel, style) {
    // Wrapper must have the same position as window
    let wrapperStyle = {
      ...this.getTransitionStyle()
    };
    if (style) {
      if (style.position) {
        wrapperStyle.position = style.position;
      }
      if (style.zIndex) {
        wrapperStyle.zIndex = style.zIndex;
      }
    }

    const className = join(
      `${this.props.rootClassName}__modal-wrapper`,
      `${this.props.rootClassName}__modal-wrapper--theme-${this.props.theme}`,
      this.state.isTopModal &&
        `${this.props.rootClassName}__modal-wrapper--top`,
      !this.isVisible() &&
        `${this.props.rootClassName}__modal-wrapper--invisible`,
      this.getRelativeToViewport() &&
        `${this.props.rootClassName}__modal-wrapper--fixed`,
      this.getTransitionClassNames(this.props.rootClassName)
    );

    return (
      <div style={wrapperStyle} className={className}>
        {panel}
      </div>
    );
  }

  getCenteredClassName() {
    let className = null;
    const centered = this.getCentered();
    const { rootClassName } = this.props;

    if (centered === true) {
      className = `${rootClassName}--centered`;
    } else if (centered === 'vertical') {
      className = `${rootClassName}--centered-vertical`;
    } else if (centered === 'horizontal') {
      className = `${rootClassName}--centered-horizontal`;
    }

    return className;
  }

  prepareRegion(props, state) {
    return state.region;
  }

  // style
  prepareStyle(props, state) {
    let style = {
      ...this.getTransitionStyle()
    };

    let maximizedStyle = null;
    if (props.maximizable && props.maximizeTransition) {
      maximizedStyle = this.getMaximizedStyle();
      assign(style, maximizedStyle);
    }

    if (!this.getMaximized() && !maximizedStyle) {
      let size = this.getSizeStyle(props, state);
      assign(style, size, maxMinSize);

      let maxMinSize = getMinMaxSize(props);
      assign(style, maxMinSize);
    }

    const centered = this.getCentered();
    if (!this.getMaximized() && centered !== true) {
      // position
      const positionStyle = this.getPositionStyle(props, state);

      if (centered === 'vertical' && positionStyle) {
        delete positionStyle.top;
        delete positionStyle.bottom;
      }

      if (centered === 'horizontal' && positionStyle) {
        delete positionStyle.left;
        delete positionStyle.right;
      }

      assign(style, positionStyle);
    }

    if (props.border) {
      style.border = props.border;
    }

    if (props.borderRadius) {
      style.borderRadius = props.borderRadius;
    }

    if (state.zIndex) {
      style.zIndex = state.zIndex;
    }

    assign(style, props.style);

    if (this.getCollapsed()) {
      if (
        this.props.titleBarPosition === 'top' ||
        this.props.titleBarPosition === 'bottom'
      ) {
        delete style.height;
        delete style.minHeight;
        if (this.titleBarNode) {
          style.height = this.titleBarNode.offsetHeight;
        }
      }

      if (
        this.props.titleBarPosition === 'left' ||
        this.props.titleBarPosition === 'right'
      ) {
        delete style.width;
        delete style.minWidth;
        if (this.titleBarNode) {
          style.width = this.titleBarNode.offsetHeight;
        }
      }
    }

    return style;
  }

  getMaximizedStyle() {
    const { state } = this;
    // return;
    if (state.transitionMaximizeEnter && !state.transitionMaximizeEnterActive) {
      // add all directions
      const position = this.getComputedStylePosition();
      return {
        ...position,
        transition: 'all 300ms ease'
      };
    }

    if (state.transitionMaximizeEnterActive) {
      return {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: 'all 300ms ease'
      };
    }

    if (state.transitionRestoreEnter && !state.transitionRestoreEnterActive) {
      return {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: 'all 300ms ease',
        width: 'none',
        height: 'none',
        minHeight: 'none',
        maxHeight: 'none'
      };
    }

    if (state.transitionRestoreEnterActive) {
      const position = this.positionBeforeMaximize;

      return {
        ...position,
        transition: 'all 300ms ease'
      };
    }
  }

  getTransitionStyle() {
    if (!this.props.transition) {
      return null;
    }

    if (this.state.transitionEnterActive) {
      return {
        transitionDuration: `${this.props.showTransitionDuration}ms`
      };
    }

    if (this.state.transitionLeaveActive) {
      return {
        transitionDuration: `${this.props.hideTransitionDuration}ms`
      };
    }
    return null;
  }

  getClassNames() {
    const { state, props } = this;
    const { rootClassName } = props;

    const shadow = props.shadow == null ? !props.modal : props.shadow;
    let className = join(
      props.className,
      `${rootClassName}--theme-${this.props.theme}`,
      !this.isVisible() && `${rootClassName}--invisible`,
      props.rtl && `${rootClassName}--rtl`,
      this.getRelativeToViewport() && `${rootClassName}--fixed`,
      this.getCenteredClassName(),
      // stacking and modal
      state.isTop && `${rootClassName}--is-top`,
      state.isTopModal && `${rootClassName}--is-top-modal`,
      props.modal && `${rootClassName}--modal`,
      state.hover && `${rootClassName}--hover`,
      shadow && `${rootClassName}--shadow`,
      state.dragging && `${rootClassName}--dragging`,
      props.keepCenteredOnResize && `${rootClassName}--keep-position-centered`,
      // states
      props.collapsible && `${rootClassName}--collapsible`,
      this.getCollapsed() && `${rootClassName}--collapsed`,
      props.draggable && `${rootClassName}--draggable`,
      props.resizable && `${rootClassName}--resizable`,
      props.closeable && `${rootClassName}--closeable`,
      props.maximizable && `${rootClassName}--maximizable`,
      this.getMaximized() && `${rootClassName}--maximized`,
      this.maximizeTransition && `${rootClassName}--maximized-transition`,
      this.getTransitionClassNames(rootClassName),
      state.focus && `${rootClassName}--focus`,
      props.url && `${rootClassName}--has-iframe`,
      props.enableMoveProxy && `${rootClassName}--has-move-proxy`
    );

    return className;
  }

  getTransitionClassNames(rootClassName) {
    const { props, state } = this;
    // animation
    return join(
      props.transition && `${rootClassName}--has-transition`,
      state.transitionEnter && `${rootClassName}--transition-enter`,
      state.transitionEnterActive &&
        `${rootClassName}--transition-enter-active`,
      state.transitionLeave && `${rootClassName}--transition-leave`,
      state.transitionLeaveActive && `${rootClassName}--transition-leave-active`
    );
  }

  // root events
  onWindowKeyDown(event) {
    // let event pass through
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    if (this.getCaptureTabNavigation() && event.key === 'Tab') {
      this.captureTabNavigation(event);
    }

    if (event.target === this.node) {
      event.preventDefault();
      this.handleKeyBoardNavigation(event);
      if (event.key === 'Escape') {
        this.close();
      }
    }

    // let event propagate
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  captureTabNavigation(event) {
    const shiftKey = event.shiftKey;
    const nodes = getFocusableElements(this.bodyNode);
    const firstNode = nodes[0];
    const lastNode = nodes[nodes.length - 1];

    if (lastNode === event.target && !shiftKey) {
      firstNode.focus();
      event.preventDefault();
      event.stopPropagation();
    }

    if (firstNode === event.target && shiftKey) {
      lastNode.focus();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  handleWindowMouseDown(event) {
    if (!this.state.isTop) {
      this.bringToFront();
    }
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  }

  handleWindowTouchStart(event) {
    if (!this.state.isTop) {
      this.bringToFront();
    }

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  }

  onWindowFocus(event) {
    if (this.props.modal && !this.state.isTopModal) {
      event.stopPropagation();
      return;
    }
    if (!this.state.isTop) {
      this.bringToFront(this.id);
    }

    if (!this.state.focus) {
      this.setState({ focus: true });
    }

    this.props.onFocus(event);
  }

  onWindowBlur(event) {
    // at this moment the body will have focus then it will jump
    // to next item when navigating with tab key
    raf(() => {
      if (
        this.componentIsMounted &&
        !this.hasGeneralFocus() &&
        !this.hasFocus()
      ) {
        this.setState({ focus: false });
      }
    });

    this.props.onBlur(event);
  }

  onWindowMouseEnter(event) {
    this.setState({ hover: true });
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  }

  onWindowMouseLeave(event) {
    this.setState({ hover: false });
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  }

  // handlers
  renderResizeHandles(props, state) {
    if (this.getMaximized()) {
      return null;
    }

    if (!props.resizable) {
      return null;
    }

    if (this.getCollapsed()) {
      return null;
    }

    if (!isMobile && (props.showHandlesOnOver && !state.hover)) {
      return null;
    }

    const handles = this.prepareResizeHandles(props, state).map(
      this.renderHandle.bind(this, props)
    );

    return handles;
  }

  renderHandle(props, handle) {
    let result;
    let domProps = {
      onMouseDown: this.handleHandleMouseDown.bind(this, props, handle),
      onTouchStart: this.handleHandleTouchStart.bind(this, props, handle),
      key: handle.name,
      style: handle.style,
      className: join(
        `${props.rootClassName}__handle`,
        `${props.rootClassName}__handle--${handle.name}`
      )
    };

    if (this.props.renderResizeHandle) {
      result = this.props.renderResizeHandle({
        domProps,
        handle: handle.name,
        props
      });
    }

    if (typeof result === 'undefined') {
      result = <div {...domProps} />;
    }

    return result;
  }

  handleHandleMouseDown(props, handle, event) {
    event.preventDefault();

    if (event.nativeEvent.which === 1) {
      // not right click
      this.setupResizeEvents(handle, event);
    }
  }

  handleHandleTouchStart(props, handle, event) {
    event.preventDefault();
    event.stopPropagation();
    this.setupResizeEvents(handle, event);
  }

  setupResizeEvents(handle, event) {
    const constrainRegion = this.getConstrainRegion();
    DragHelper(event, {
      constrainTo: constrainRegion,
      scope: this,
      onDragStart(event, config) {
        this.handleResizeDragStart({ event, config, handle, constrainRegion });
      },
      onDrag(event, config) {
        this.handleResizeDrag(event, config);
      },
      onDrop(event, config) {
        this.handleResizeDrop(event, config);
      }
    });
  }

  handleResizeDragStart({ event, config, handle, constrainRegion }) {
    const props = this.props;
    const region = this.getRegion();

    this.setState({
      resizing: true,
      activeHandle: handle
    });

    let defaultConfig = this.getResizeDefaultConfig({
      handle,
      constrainRegion,
      region
    });

    if (this.getCentered()) {
      this.adjustCenteredPosition(
        region,
        defaultConfig.initialComputedStylePosition
      );

      /**
       * Only change position when
       * keepCenteredOnResize is false
       */
      if (!this.props.keepCenteredOnResize) {
        this.setCentered(false);
        let position = this.getNormalizedPosition(
          defaultConfig.initialComputedStylePosition
        );

        this.setPosition(position);
      }
    }

    assign(config, defaultConfig);

    if (this.props.enableResizeProxy) {
      this.setState({
        showResizeProxy: true
      });
    }

    this.props.onResizeStart(this.getSize());
  }

  handleResizeDrag(event, config) {
    const region = config.initialResizeRegion;

    /**
     * If it is centered and keepCenteredOnResize
     * is true, diff must be doubled
     */
    if (this.getCentered() && this.props.keepCenteredOnResize) {
      this.ajustCenteredSize(config);
    }

    const {
      resizeRegion,
      position,
      size,
      proxyPosition
    } = this.getResizeDimensions(config);

    /**
     * Used to set when resize stops
     * to set/trigger size/position change
     */
    this.position = position;
    this.size = size;

    if (this.props.enableResizeProxy) {
      this.setProxyDimensions({ size, position: proxyPosition });
    } else if (this.props.useDirectDomPositionSizeChange) {
      this.setDOMSize(size);

      /**
       * Move Window only when it should
       * not keep it's position while resizing/popsition change
       */
      if (!this.props.keepCenteredOnResize || !this.getCentered()) {
        this.setDOMPosition(position);
      }
    } else {
      this.setPosition(position);
      this.setSize(size);
    }

    this.props.onResizeDrag(size);
  }

  handleResizeDrop(event, config) {
    const diff = config ? config.diff : {};
    let region = config.initialResizeRegion;

    this.setState({
      resizing: false,
      activeHandle: null
    });

    if (!region || !diff || (!diff.top && !diff.left)) {
      return null;
    }

    this.props.onResizeStop(this.size);
    this.setSize(this.size);
    this.setPosition(this.position);
    this.size = null;
    this.position = null;

    // reset proxy state
    this.setState({
      showResizeProxy: null
    });
  }

  /**
   * Calculates new size and position
   * based on a handle drag
   * @param {Object} config a config that has information
   *                 about handle, the ammount the handle
   *                 has been dragged (see getResizeDefaultConfig)
   * @param {Region} region
   * @return {Object} {
   *   - region
   *   - size
   *   - position
   * }
   */
  getResizeDimensions(config) {
    const resizeRegion = onResizeDrag(config);

    let newRegion;

    if (!config.initialResizeRegion) {
      return null;
    }

    const initialRegion = config.initialResizeRegion.clone();

    const newSize = {
      width: resizeRegion.width,
      height: resizeRegion.height
    };

    const positionDiff = {
      left: resizeRegion.left - initialRegion.left,
      top: resizeRegion.top - initialRegion.top,
      bottom: resizeRegion.bottom - initialRegion.bottom,
      right: resizeRegion.right - initialRegion.right
    };

    const newPosition = this.getResizeDiffPosition(
      positionDiff,
      config.initialComputedStylePosition
    );

    let proxyPosition;

    if (this.props.enableResizeProxy) {
      proxyPosition = this.getResizeDiffPosition(positionDiff, {
        top: 0,
        left: 0,
        /**
         *  these are dummy not used by proxy, because proxy is always
         *  positioned absolute to top,left
         */
        right: 0,
        bottom: 0
      });
    }

    return {
      resizeRegion,
      position: newPosition,
      size: newSize,
      proxyPosition
    };
  }

  /**
   * Mutates config, it doubles
   * the difference so when it is
   * centered it resizees corectr
   * @return {void}
   */
  ajustCenteredSize(config) {
    const centered = this.getCentered();
    if (centered === true) {
      config.diff.left = config.diff.left * 2;
      config.diff.top = config.diff.top * 2;
    } else if (centered === 'horizontal') {
      config.diff.left = config.diff.left * 2;
    } else if (centered === 'vertical') {
      config.diff.top = config.diff.top * 2;
    }
  }

  /**
   * Prepares configuration objects for each handle
   * @return {Array} handleConfigurations
   */
  prepareResizeHandles(props, state) {
    const allHandles = this.getAllHandlers();

    let configHandles = this.filterValidHandlers(allHandles);

    if (!configHandles) {
      return [];
    }

    return Object.keys(configHandles).map(handleName => {
      let handle = configHandles[handleName];
      let style = handle.style;

      assign(handle, {
        style,
        name: handleName
      });

      return handle;
    });
  }

  getAllHandlers() {
    const props = this.props;

    const width = isMobile ? props.mobileHandleWidth : props.handleWidth;
    const outside = isMobile
      ? props.mobileHandlesOutside
      : props.handlesOutside;

    let config = isMobile;
    if (isMobile) {
      config =
        props.mobileHandleConfig !== undefined
          ? props.mobileHandleConfig
          : getDefaultMobileHandleConfig(props.titleBarPosition);
    } else {
      config = props.handleConfig;
    }

    return getHandles({
      ...config,
      width,
      outside,
      handleStyle: props.handleStyle
    });
  }

  /**
   * Makes the intersection of
   * resizeHanders and resizable(object)
   * @param {Array} allHandlers
   * @instance props.resizeHandles
   * @instance props.resizable
   */
  filterValidHandlers(allHandles) {
    let filteredHandles = {};
    const resizeHandles = this.props.resizeHandles;
    const resizableValidHandles = this.getResizableValidHandles();

    if (resizeHandles === true && resizableValidHandles === true) {
      // all are valid
      return allHandles;
    }

    if (resizeHandles === false && resizableValidHandles === false) {
      return null;
    }

    /**
     * both props can be true
     * and both can have values
     * `resizable` is normalized to `resizableValidHandles`
     */
    filteredHandles = Object.keys(allHandles).reduce((acc, handleName) => {
      // when both are set
      if (
        resizableValidHandles &&
        resizableValidHandles.length &&
        resizeHandles &&
        resizeHandles.length
      ) {
        const isValidInResizeHandlers =
          resizeHandles.indexOf(handleName) !== -1;
        const isValidInResizableValidHandles =
          resizableValidHandles.indexOf(handleName) !== -1;
        if (isValidInResizeHandlers && isValidInResizableValidHandles) {
          acc[handleName] = allHandles[handleName];
        }
      }

      // only resizeHandles is set
      if (
        resizeHandles &&
        resizeHandles.length &&
        !Array.isArray(resizableValidHandles)
      ) {
        const isValidInResizeHandlers =
          resizeHandles.indexOf(handleName) !== -1;
        if (isValidInResizeHandlers) {
          acc[handleName] = allHandles[handleName];
        }
      }

      // only resizeHandles is set
      if (
        resizableValidHandles &&
        resizableValidHandles.length &&
        !Array.isArray(resizeHandles)
      ) {
        const isValidInResizableValidHandles =
          resizableValidHandles.indexOf(handleName) !== -1;
        if (isValidInResizableValidHandles) {
          acc[handleName] = allHandles[handleName];
        }
      }

      return acc;
    }, {});

    return filteredHandles;
  }

  /**
   * Retruns a list of valid directions
   * if all directions are valid then
   * it returns null
   * @instance props.resizable
   * @return {Array|null}
   */
  getResizableValidHandles() {
    let validHandles = [];

    if (this.props.resizable === true) {
      return true;
    }

    if (this.props.resizable && this.props.resizable.height) {
      validHandles = [...validHandles, 't', 'b'];
    }

    if (this.props.resizable && this.props.resizable.width) {
      validHandles = [...validHandles, 'l', 'r'];
    }

    // if both directions
    if (
      this.props.resizable &&
      this.props.resizable.height &&
      this.props.resizable.width
    ) {
      validHandles = true;
    }

    return validHandles;
  }

  // position

  getPositionStyle(props, state) {
    let style = this.getPosition(props, state);
    return style;
  }

  getPosition(props, state) {
    props = props || this.props;
    state = state || this.state;

    return this.isPositionControlled() ? props.position : state.position;
  }

  // get a valid position, fill empty spaces with actualPosition
  getValidNormalizedPosition() {
    return { ...this.getPosition, ...this.getActualPosition() };
  }

  isPositionControlled() {
    return this.props.position != null;
  }

  // size

  getSizeStyle(props, state) {
    let result = {};
    let size = this.getSize();

    if (!size) {
      return null;
    }

    let sizeType = typeof size;
    let single = sizeType == 'number' || sizeType == 'string' || size === null;
    let width = single ? size : size.width;
    let height = single ? size : size.height;

    if (width != null) {
      result.width = width;
    }

    if (height != null) {
      result.height = height;
    }

    return result;
  }

  isSizeControlled() {
    return !!this.props.size;
  }

  isResizeOrDrag(state) {
    state = state || this.state;
    return state.resizing || state.dragging;
  }

  getSize() {
    return this.isSizeControlled() ? this.props.size : this.state.size;
  }

  // renderers
  renderTitleBar(domProps) {
    if (
      this.props.renderTitleBar === false ||
      this.props.renderTitleBar === null
    ) {
      return null;
    }

    domProps.onMouseDown = this.handleTitleMouseDown;
    domProps.onTouchStart = this.handleTitleTouchStart;
    domProps.onDoubleClick = this.onTitleDoubleClick;
    domProps.className = join(
      domProps.className,
      `${this.props.rootClassName}__title-bar--align-${this.props.titleAlign}`,
      `${this.props.rootClassName}__title-bar--position-${
        this.props.titleBarPosition
      }`
    );

    const { titleRotate, titleBarPosition, borderRadius } = this.props;

    if (borderRadius) {
      domProps.style = domProps.style || {};
      if (
        titleBarPosition == 'top' ||
        (titleRotate == -90 && titleBarPosition == 'left') ||
        (titleRotate == 90 && titleBarPosition == 'right')
      ) {
        domProps.style.borderTopLeftRadius = borderRadius;
        domProps.style.borderTopRightRadius = borderRadius;
        domProps.style.borderBottomLeftRadius = 0;
        domProps.style.borderBottomRightRadius = 0;
      } else {
        domProps.style.borderTopLeftRadius = 0;
        domProps.style.borderTopRightRadius = 0;
        domProps.style.borderBottomLeftRadius = borderRadius;
        domProps.style.borderBottomRightRadius = borderRadius;
      }
    }

    if (typeof this.props.renderTitleBar === 'function') {
      return this.props.renderTitleBar(domProps, this.props);
    }
  }

  onTitleDoubleClick() {
    if (this.props.maximizeOnDoubleClick && this.props.maximizable) {
      this.toggleMaximized();
    }
  }

  getToolBarProps() {
    let toolBarPosition;
    if (this.props.titlePosition === 'start') {
      toolBarPosition = 'renderAfterTitle';
    } else {
      toolBarPosition = 'renderBeforeTitle';
    }

    return {
      [toolBarPosition]: (...args) =>
        this.renderTitleBarTools({
          args,
          toolBarPosition
        })
    };
  }

  renderTitleBarTools({ args, toolBarPosition }) {
    const { props } = this;
    const domProps = {
      className: `${props.rootClassName}__tools`,
      onMouseDown: event => event.stopPropagation(),
      onDoubleClick: event => event.stopPropagation(),
      children: [
        props.enableRelativeToViewportToggle &&
          this.renderRelativeToViewportTool(),
        props.collapsible && !this.getMaximized() && this.renderCollapseTool(),
        props.maximizable && this.renderMaximizableTool(),
        props.closeable && this.renderCloseTool()
      ]
    };

    if (props.toolbarButtons) {
      let toolbarButtons = Array.isArray(props.toolbarButtons)
        ? props.toolbarButtons
        : [props.toolbarButtons];
      toolbarButtons = toolbarButtons.map((child, index) => {
        return React.cloneElement(child, {
          key: child.props.key || `tool-${index}`,
          className: join(child.props.className, `${props.rootClassName}__tool`)
        });
      });
      domProps.children = [...toolbarButtons, ...domProps.children];
    }

    let result;
    // you don't want to overwrite panel renderBefore or renderAfter
    // they are extended

    if (props.renderToolBar) {
      result = props.renderToolBar(domProps, props);
    }

    if (result == null) {
      result = <div key="tools" {...domProps} />;
    }

    if (props[toolBarPosition]) {
      const tools = props[toolBarPosition](domProps, props);
      result = Array.isArray(result) ? result : [result];
      result =
        toolBarPosition === 'renderBeforeTitle'
          ? [...result, tools]
          : [tools, ...result];
    }

    return result;
  }

  renderCloseTool() {
    const { props } = this;
    const icon = props.closeIcon || (
      <Icon
        size={props.closeIconSize}
        type="close"
        className={join(
          `${props.rootClassName}__close-icon`,
          `${props.rootClassName}__icon`
        )}
      />
    );

    let domProps = {
      className: `${props.rootClassName}__tool`,
      theme: null,
      key: 'closeable',
      children: icon
    };

    if (isMobile) {
      domProps.onTouchStart = event => {
        event.stopPropagation();
        this.close();
      };
    } else {
      domProps.onClick = () => this.close();
    }

    let result;
    if (props.renderCloseButton) {
      result = props.renderCloseButton({ domProps, props, close: this.close });
    }

    if (result === undefined) {
      result = <Button {...domProps} />;
    }

    return result;
  }

  renderCollapseTool() {
    const { props } = this;
    const domProps = {
      key: 'collapsetool',
      className: `${props.rootClassName}__tool`,
      theme: null
    };

    const collapsed = this.getCollapsed();

    if (isMobile) {
      domProps.onTouchStart = event => {
        event.stopPropagation();
        event.preventDefault();
        (collapsed ? this.expand : this.collapse)();
      };
    } else {
      domProps.onClick = collapsed ? this.expand : this.collapse;
    }

    const maximized = this.getMaximized();

    let icon;
    if (collapsed && props.expandIcon) {
      icon = props.expandIcon;
    }
    if (!collapsed && props.collapseIcon) {
      icon = props.collapseIcon;
    }

    if (!icon) {
      const type = 'collapse';
      const size = collapsed ? props.expandIconSize : props.collapseIconSize;

      const collapsedOrExpanded = collapsed
        ? `${props.rootClassName}__expand-icon`
        : `${props.rootClassName}__collapse-icon`;
      const className = join(
        collapsedOrExpanded,
        `${this.props.rootClassName}__icon`
      );
      icon = <Icon size={size} type={type} className={className} />;
    }

    domProps.children = icon;

    let result;
    if (props.renderCollapseButton) {
      result = props.renderCollapseButton({
        domProps,
        collapsed,
        props,
        collapse: this.collapse,
        expand: this.expand
      });
    }

    if (result === undefined) {
      result = <Button {...domProps} />;
    }

    return result;
  }

  renderMaximizableTool() {
    if (this.getCollapsed()) {
      return null;
    }

    const { props } = this;
    const domProps = {
      key: 'maximizeIcon',
      className: `${props.rootClassName}__tool`,
      theme: null
    };

    if (isMobile) {
      domProps.onTouchStart = event => {
        this.toggleMaximized();
        event.stopPropagation();
        event.preventDefault();
      };
    } else {
      domProps.onClick = () => this.toggleMaximized();
    }

    const maximized = this.getMaximized();

    let icon;
    if (maximized && props.restoreIcon) {
      icon = props.restoreIcon;
    }
    if (!maximized && props.maximizeIcon) {
      icon = props.maximizeIcon;
    }

    if (!icon) {
      const type = maximized ? 'exitFullScreen' : 'fullScreen';
      const size = maximized ? props.restoreIconSize : props.maximizeIconSize;
      const className = join(
        maximized && `${props.rootClassName}__restore-icon`,
        !maximized && `${props.rootClassName}__maximized-icon`,
        `${this.props.rootClassName}__icon`
      );
      icon = <Icon size={size} type={type} className={className} />;
    }

    domProps.children = icon;

    let result;
    if (props.renderMaximizeButton) {
      result = props.renderMaximizeButton({
        domProps,
        maximized,
        props,
        toggleMaximized: this.toggleMaximized,
        restore: this.restore,
        maximize: this.maximize
      });
    }

    if (result === undefined) {
      result = <Button {...domProps} />;
    }

    return result;
  }

  renderRelativeToViewportTool() {
    const { props } = this;
    const domProps = {
      key: 'relativeToViewportTool',
      className: `${props.rootClassName}__tool`,
      theme: null
    };

    const toggleRelativeToViewport = () =>
      this.setRelativeToViewport(!this.getRelativeToViewport());

    if (isMobile) {
      domProps.onTouchStart = event => {
        event.stopPropagation();
        event.preventDefault();
        toggleRelativeToViewport();
      };
    } else {
      domProps.onClick = () => toggleRelativeToViewport();
    }

    const relativeToViewport = this.getRelativeToViewport();

    let icon;
    if (relativeToViewport && props.pinUpIcon) {
      icon = props.pinUpIcon;
    }
    if (!relativeToViewport && props.pinDownIcon) {
      icon = props.pinDownIcon;
    }

    if (!icon) {
      const type = 'pin';
      const size = relativeToViewport
        ? props.pinUpIconSize
        : props.pinDownIconSize;

      const pinUpOrDown = relativeToViewport
        ? `${props.rootClassName}__pin-up-icon`
        : `${props.rootClassName}__pin-down-icon`;
      const className = join(
        pinUpOrDown,
        `${props.rootClassName}__pin-icon`,
        `${props.rootClassName}__icon`
      );
      icon = <Icon size={size} type={type} className={className} />;
    }

    domProps.children = icon;

    let result;
    if (props.renderPinButton) {
      result = props.renderPinButton({
        domProps,
        relativeToViewport,
        props,
        toggleRelativeToViewport
      });
    }

    if (result === undefined) {
      result = <Button {...domProps} />;
    }

    return result;
  }

  renderResizeProxy() {
    if (!this.state.resizing || !this.state.showResizeProxy) {
      return null;
    }

    const size = this.size;
    const position = this.position;

    let style = assign(
      {
        position: 'absolute'
      },
      size
    );

    if (!this.getCentered()) {
      style = {
        ...style,
        top: 0,
        left: 0
      };
    }

    return (
      <div
        style={style}
        ref={this.getProxyRef}
        key="resize-proxy"
        className={`${this.props.rootClassName}__proxy`}
      />
    );
  }

  handleTitleMouseDown(event) {
    if (
      this.props.draggable &&
      event.nativeEvent.which === 1 &&
      !this.getMaximized()
    ) {
      this.setupTitleDrag(event);
    }

    if (!this.state.isTop) {
      this.bringToFront();
    }
  }

  handleTitleTouchStart(event) {
    if (this.props.draggable && !this.getMaximized()) {
      event.preventDefault();
      this.setupTitleDrag(event);
    }

    if (isEventDoubleTap(event)) {
      this.onTitleDoubleClick();
    }
  }

  setupTitleDrag(event) {
    /**
     * If centered and centered is controlled
     * don't allow window to be moved
     */
    if (this.getCentered() && this.isCenteredControlled()) {
      this.setCentered(false);
      return null;
    }

    const constrainTo = this.getConstrainRegion();
    let region = this.getDragRegion();
    let computedStylePosition = this.getComputedStylePosition();

    event.preventDefault();
    event.stopPropagation();

    // because event is stoped, focus must be manualy added back
    if (!this.hasGeneralFocus()) {
      this.focus();
    }

    DragHelper(event, {
      region,
      constrainTo,
      scope: this,
      onDragStart(event, config) {
        this.handleTitleDragStart({
          event,
          config,
          region,
          computedStylePosition
        });
      },

      onDrag(event, config) {
        this.handleTitleDragThrottle(event, config);
      },

      onDrop(event, config) {
        this.handleTitleDragDrop(event, config);
      }
    });
  }

  handleTitleDragStart({ event, config, region, computedStylePosition }) {
    if (this.getCentered()) {
      const rootRegion = this.props.constrainTitleOnly
        ? this.getRegion()
        : region;
      const offset = {
        width: rootRegion.width,
        height: rootRegion.height
      };

      this.adjustCenteredPosition(offset, computedStylePosition);
      this.setPosition(this.getNormalizedPosition(computedStylePosition));
      this.setCentered(false);
    }

    config.initialRegion = region;
    config.initialComputedStylePosition = computedStylePosition;

    this.setState({ dragging: true });

    this.props.onMoveStart(this.getPosition());
  }

  handleTitleDrag(event, config) {
    let diff = assign({}, config.diff);
    if (typeof this.props.draggable === 'object') {
      if (!this.props.draggable.horizontal) {
        diff.left = 0;
      }
      if (!this.props.draggable.vertical) {
        diff.top = 0;
      }
    }
    const newPosition = this.getDiffPosition(
      diff,
      config.initialComputedStylePosition
    );

    this.position = newPosition;
    if (this.props.useDirectDomPositionSizeChange) {
      this.setDOMPosition(this.position);
    } else {
      this.setPosition(this.position);
    }
  }

  handleTitleDragDrop(event, config) {
    var diff = config ? config.diff : {};
    this.setState({ dragging: false });

    if (!diff || (!diff.top && !diff.left)) {
      return;
    }

    this.setPosition(this.position);
    this.props.onMoveStop(this.position);
    this.position = null;
  }

  prepareBodyStyle(props) {
    let bodyStyle = assign(
      {
        padding: props.bodyPadding,
        border: props.bodyBorder
      },
      props.bodyStyle
    );

    if (this.getCollapsed()) {
      bodyStyle.overflow = 'hidden';
      bodyStyle.padding = 0;

      if (
        this.props.titleBarPosition === 'top' ||
        this.props.titleBarPosition === 'bottom'
      ) {
        bodyStyle.height = 0;
        bodyStyle.maxHeight = 0;
        bodyStyle.maxWidth = '100%';
      }

      if (
        this.props.titleBarPosition === 'left' ||
        this.props.titleBarPosition === 'right'
      ) {
        bodyStyle.width = 0;
        bodyStyle.maxWidth = 0;
        bodyStyle.maxHeight = '100%';
        bodyStyle.height = this.getRegion().height;
      }
    }

    return bodyStyle;
  }

  getBorderRadius() {
    const { borderRadius } = this.props;
    return typeof borderRadius === 'boolean' ? 3 : borderRadius;
  }

  // dynamic setters

  /**
   * Checks on resize wether position or size should change
   */
  checkFitToConstrain() {
    let initialRegion = this.getRegion();
    let constrainRegion;

    if (this.props.keepPositionOnConstrain) {
      constrainRegion = this.ajustRegionToPosition(this.getConstrainRegion());
    } else {
      constrainRegion = this.getConstrainRegion();
    }

    // constrainedRegion is mutated by constrainTo
    let constrainedRegion = initialRegion.clone();
    const isConstrained = constrainedRegion.constrainTo(constrainRegion);

    if (isConstrained) {
      let isSizeChanged =
        initialRegion.width !== constrainedRegion.width ||
        initialRegion.height !== constrainedRegion.height;

      if (isSizeChanged && !this.props.keepSizeOnConstrain) {
        const { position: newPosition, size } = this.getNewSizeConstrain({
          initialRegion,
          constrainRegion,
          constrainedRegion
        });

        this.setPosition(newPosition);
        this.setSize(size);
      } else {
        /**
         * Window fits into new region
         * only have to move
         */
        const diff = {
          left: constrainedRegion.left - initialRegion.left,
          top: constrainedRegion.top - initialRegion.top
        };
        let newPosition = this.getDiffPosition(
          diff,
          this.getComputedStylePosition()
        );
        this.setPosition(newPosition);
      }
    }
  }

  getNewSizeConstrain({ initialRegion, constrainRegion, constrainedRegion }) {
    const diffs = [
      {
        name: 'right',
        handle: 'r',
        diffSide: 'left',
        diff: constrainedRegion.right - initialRegion.right
      },
      {
        name: 'left',
        handle: 'l',
        diffSide: 'left',
        diff: constrainedRegion.left - initialRegion.left
      },
      {
        name: 'top',
        handle: 't',
        diffSide: 'top',
        diff: constrainedRegion.top - initialRegion.top
      },
      {
        name: 'bottom',
        handle: 'b',
        diffSide: 'top',
        diff: constrainedRegion.bottom - initialRegion.bottom
      }
    ];

    let newSize;
    let newPosition;
    /**
     * Iterate over each position/size change
     * and get last position/size
     */
    diffs.forEach(config => {
      if (config.diff === 0) {
        return null;
      }

      const handle = this.getAllHandlers()[config.handle];
      const defaultDragConfig = this.getResizeDefaultConfig({
        handle,
        constrainedRegion,
        region: initialRegion
      });

      let diff = { [config.diffSide]: config.diff };
      const dragConfig = assign({}, defaultDragConfig, { diff });

      const { position, size } = this.getResizeDimensions(
        dragConfig,
        initialRegion
      );

      newSize = size;
      newPosition = position;
    });

    return {
      size: newSize,
      position: newPosition
    };
  }

  /**
   * Restricts region to position
   * e.g if position left is set
   * then new region should not inclue
   * the area from the left part of the window
   * to the left edge of the constrainer
   *
   * @param {Region}
   * @instance {Function} getPosition
   * @return {Region} ajusted region to position
   */
  ajustRegionToPosition(region) {
    const position = this.getRegion();
    const newRegion = region.clone();

    if (position.top) {
      newRegion.addTop(position.top);
    }

    if (position.bottom) {
      newRegion.addBottom(-position.bottom);
    }

    if (position.left) {
      newRegion.addLeft(position.left);
    }

    if (position.right) {
      newRegion.addRight(-position.right);
    }

    console.group();
    console.log('region', region);
    console.log('newRegion', newRegion);
    console.log('position', position);
    console.groupEnd();

    return newRegion;
  }

  // seters

  /**
   * Called whe posiiton changes
   * sets position and calls props.onMove
   * @param {Object} size
   * @return {Object} size
   */
  setPosition(position) {
    if (isEqual(position, this.getPosition())) {
      return null;
    }
    if (!this.isPositionControlled()) {
      this.setState({ position });
    }

    this.props.onPositionChange(position);

    return position;
  }

  setProxyDimensions({ size, position, resizeRegion }) {
    if (this.proxy) {
      this.setDOMSize(size, this.proxy);
      /**
       * Don't move dialog when it is resized
       * and keepPositionOnConstrain is true
       */
      if (this.props.keepCenteredOnResize && this.getCentered()) {
        return null;
      }

      this.setDOMPosition(position, this.proxy);
    }
  }

  /**
   * Called when size changes
   * sets size and calls props.onResize
   * @param {Object} size
   * @return {Object} size
   */
  setSize(size) {
    if (!this.isSizeControlled()) {
      this.setState({ size });
    }

    this.props.onResize(size);

    return size;
  }

  /**
   * Sets position directy on dom element
   * on live position change.
   * This way it doesn't trigger
   * setState on each drag event.
   * @param {Object} { top, left, right, bottom }
   */
  setDOMPosition(position, node = this.node) {
    if (node) {
      if (position.top !== undefined) {
        node.style.top = `${position.top}px`;
      }
      if (position.left !== undefined) {
        node.style.left = `${position.left}px`;
      }
      if (position.right !== undefined) {
        node.style.right = `${position.right}px`;
      }
      if (position.bottom !== undefined) {
        node.style.bottom = `${position.bottom}px`;
      }
    }
  }

  /**
   * Sets position directy on dom element
   * on live position change.
   * This way it doesn't trigger
   * setState on each drag event.
   * @param {Object} { width, height }
   */
  setDOMSize(size, node = this.node) {
    if (node) {
      node.style.width = `${size.width}px`;
      node.style.height = `${size.height}px`;
    }
  }

  // getters

  /**
   * Returns only positions that are provided
   * on this.props.position || this.props.defaultPosition
   * if not, it will default to
   * - top
   * - left
   *
   * There always must be a x position and a y position
   * @param {Object}
   * @return {Object} newPosition
   */
  getNormalizedPosition(newPosition) {
    const initialPosition = this.getPosition();
    let positions = initialPosition && Object.keys(initialPosition);

    if (!positions) {
      positions = ['top', 'left'];
    } else {
      if (positions.indexOf('left') == -1 && positions.indexOf('right') == -1) {
        positions.push('left');
      }
      if (positions.indexOf('top') == -1 && positions.indexOf('bottom') == -1) {
        positions.push('top');
      }
    }

    return positions.reduce((acc, position) => {
      acc[position] = newPosition[position];
      return acc;
    }, {});
  }

  /**
   * Calculates new position after resize
   * relative to offsetParent
   * @param {Object} diff holds diffs for all sides
   * @param {Object} computedStylePosition
   */
  getResizeDiffPosition(diff, computedStylePosition) {
    let position = {};

    position.top = computedStylePosition.top + diff.top;
    position.left = computedStylePosition.left + diff.left;

    position.bottom = computedStylePosition.bottom - diff.bottom;
    position.right = computedStylePosition.right - diff.right;

    return this.getNormalizedPosition(position);
  }

  /**
   * Returns new position, using getComputedStyle
   * @param {Object} diff - top, left diff
   * @param {Object} computedStylePosition
   */
  getDiffPosition(diff, computedStylePosition) {
    let position = {};

    position.top = computedStylePosition.top + diff.top;
    position.bottom = computedStylePosition.bottom - diff.top;
    position.left = computedStylePosition.left + diff.left;
    position.right = computedStylePosition.right - diff.left;

    return this.getNormalizedPosition(position);
  }

  /**
   * Using getComputedStyle returns an object of the form
   * { top: Number, left: Number, right: Number, bottom: Number}
   * @instance {Node} this.node
   * @global {Function} getComputedStyle
   * @return {Object}
   */
  getComputedStylePosition(node) {
    node = node || this.node;
    if (!node) {
      return null;
    }

    let computedStyle;
    if (global.getComputedStyle) {
      computedStyle = global.getComputedStyle(node);
    }
    if (!computedStyle) {
      return null;
    }

    const centered = this.getCentered();

    return ['top', 'left', 'right', 'bottom'].reduce((acc, position) => {
      acc[position] = pxToFloat(computedStyle[position]);
      if (
        centered === true ||
        (centered === 'horizontal' &&
          (position == 'left' || position == 'right')) ||
        (centered === 'vertical' && (position == 'top' || position == 'bottom'))
      ) {
        var oldValue = acc[position];
        // if we are centered, marginTop is really the value for top, ...etc
        var newValue = pxToFloat(
          computedStyle['margin' + toUpperFirst(position)]
        );

        // in FF, oldValue is not 0, but newValue is 0, so treat this separately
        if (oldValue && !newValue) {
          // skip FF
        } else {
          acc[position] = newValue;
        }
      }
      if (computedStyle[position] === 'auto') {
        // tablet fix
        acc[position] = this.node[
          `offset${position[0].toUpperCase()}${position.slice(1)}`
        ];

        if (acc[position] === undefined) {
          const offsetParent = node.offsetParent || global;
          const offfsetParentWidth =
            offsetParent.offsetWidth || offsetParent.innerWidth;
          const offfsetParentHeight =
            offsetParent.offsetHeight || offsetParent.innerHeight;
          if (position === 'right') {
            acc[position] =
              offfsetParentWidth -
              node.offsetLeft +
              pxToFloat(computedStyle.width);
          }
          if (position === 'bottom') {
            acc[position] =
              offfsetParentHeight -
              node.offsetTop +
              pxToFloat(computedStyle.height);
          }
        }
      }
      return acc;
    }, {});
  }

  /**
   * The difference between this and this.getPosition
   * is that this reads it from the dom
   * and this.getPosition is stored position from
   * state or props
   * @instance getComputedStylePosition
   * @instance getNormalizedPosition
   * @return actualPosition
   */
  getActualPosition() {
    return this.getNormalizedPosition(this.getComputedStylePosition());
  }

  /**
   * Setups a config object for resize
   * It is used when a handle is dragged
   * but also when the window must
   * be constrained
   * @instance props
   * @param {Object} config
   */
  getResizeDefaultConfig({ handle, constrainRegion, region }) {
    const props = this.props;

    let config = {
      keepAspectRatio: props.keepAspectRatio,
      horizontalResizeOnly: props.horizontalResizeOnly,
      verticalResizeOnly: props.verticalResizeOnly,
      constrainRegion,
      activeHandle: handle,
      initialComputedStylePosition: this.getComputedStylePosition(),
      sizeContraints: getMinMaxSize(props),
      initialResizeRegion: region
    };

    if (props.keepAspectRatio) {
      config.aspectRatio =
        (region.width / region.height).toFixed(props.aspectRatioPrecision) * 1;
    }

    return config;
  }

  /**
   * Ajust position and computed style when is centered.
   * Because it is translated -50% on both axex.
   * Note! it mutates
   * @param {Region} region
   * @param {Object} computedStylePosition
   * @return {Void}
   */
  adjustCenteredPosition({ width, height }, computedStylePosition) {
    const centered = this.getCentered();
    const verticalAjust = 0;
    const horizontalAjust = 0;

    if (centered !== 'horizontal') {
      computedStylePosition.top -= verticalAjust;
      computedStylePosition.bottom += verticalAjust;
    }

    if (centered !== 'vertical') {
      computedStylePosition.left -= horizontalAjust;
      computedStylePosition.right += horizontalAjust;
    }
  }

  getRelativeRegion() {
    return getRelativeRegion(this.node);
  }

  getRegion(domNode) {
    return Region.from(domNode || this.node);
  }

  getTitleRegion(domNode) {
    return Region.from(domNode || this.titleBarNode);
  }

  getConstrainRegion(props) {
    props = props || this.props;
    return getConstrainRegion(props.constrainTo, this.node);
  }

  /**
   * Can be the entire window or only the title region
   */
  getDragRegion() {
    return this.props.constrainTitleOnly
      ? this.getTitleRegion()
      : this.getRegion();
  }

  getCaptureTabNavigation() {
    let captureTabNavigation = this.props.captureTabNavigation;

    if (captureTabNavigation === undefined) {
      if (this.props.modal === true) {
        captureTabNavigation = true;
      } else {
        captureTabNavigation = false;
      }
    }

    return captureTabNavigation;
  }

  getVisible() {
    return this.state.visible;
  }

  isVisible() {
    return this.props.visible != null ? this.props.visible : this.state.visible;
  }

  // maxmized
  isMaximizedControlled(props = this.props) {
    return props.maximized !== undefined;
  }

  getMaximized(props = this.props) {
    return this.isMaximizedControlled(props)
      ? props.maximized
      : this.state.maximized;
  }

  setMaximized(maximized) {
    if (!this.props.maximizable) {
      return null;
    }

    if (!this.isMaximizedControlled()) {
      this.setState({
        maximized
      });
      this.handleMaximizedChange(maximized);
    }

    if (maximized) {
      this.props.onMaximize(maximized);
    } else {
      this.props.onRestore(maximized);
    }

    this.props.onMaximizeChange(maximized);
  }

  toggleMaximized() {
    this.setMaximized(!this.getMaximized());
  }

  // centered
  isCenteredControlled() {
    return this.props.centered !== undefined;
  }

  getCentered() {
    return this.isCenteredControlled()
      ? this.props.centered
      : this.state.centered;
  }

  setCentered(centered) {
    if (!this.isCenteredControlled()) {
      this.setState({
        centered
      });
    }

    this.props.onCenteredChange(centered);
  }

  // collapsed
  isCollapsedControlled() {
    return this.props.collapsed !== undefined;
  }

  setCollapsed(collapsed) {
    if (!this.isCollapsedControlled()) {
      this.setState({ collapsed });
    }

    if (collapsed) {
      this.props.onCollapse();
    } else {
      this.props.onExpand();
    }

    this.props.onCollapseChange(collapsed);
  }

  getCollapsed() {
    return this.isCollapsedControlled()
      ? this.props.collapsed
      : this.state.collapsed;
  }

  expand() {
    this.setCollapsed(false);
  }

  collapse() {
    this.setCollapsed(true);
  }

  // relativeToViewport
  isRelativeToViewportControlled() {
    return this.props.relativeToViewport !== undefined;
  }

  getRelativeToViewport() {
    if (this.props.relativeToViewportWhenMaximized && this.getMaximized()) {
      return true;
    }
    return this.isRelativeToViewportControlled()
      ? this.props.relativeToViewport
      : this.state.relativeToViewport;
  }

  setRelativeToViewport(relativeToViewport) {
    if (!this.isRelativeToViewportControlled()) {
      this.setState({ relativeToViewport });
      this.updatePositionWithOffsetParentChange(relativeToViewport);
    }

    this.props.onRelativeToViewportChange(relativeToViewport);
  }

  updatePositionWithOffsetParentChange(relativeToViewport) {
    if (this.props.shouldUpdatePositionWithOffsetParentChange === false) {
      return;
    }
    const offsetParent = getOffsetParent(this.node);
    const parentWithTranslate = getParentWithTranslate(this.node);
    const viewportRegion = getViewportRegion();

    let finalRegion;
    let initialRegion;

    // from absolute to fixed
    if (relativeToViewport) {
      initialRegion = offsetParent;
      finalRegion = parentWithTranslate || viewportRegion;

      // from fixed to absolute
    } else {
      initialRegion = parentWithTranslate || viewportRegion;
      finalRegion = offsetParent;
    }

    initialRegion = Region.from(initialRegion);
    finalRegion = Region.from(finalRegion);

    const newPosition = getPositionRelativeToNewRegion({
      initialPosition: this.getComputedStylePosition(),
      finalRegion,
      initialRegion
    });

    this.setPosition(this.getNormalizedPosition(newPosition));
  }

  // animation
  handleVisibleChange(visible) {
    if (visible) {
      // bring a window to front when it becomes visible
      this.bringToFront();
    } else {
      this.sendToBack();
    }
    if (!this.props.transition) {
      this.setState({ visible });
      return null;
    }

    if (visible) {
      this.setupEnterTransition();
    } else {
      this.setupLeaveTransition();
    }
  }

  handleMaximizedChange(maximized) {
    if (maximized) {
      this.setupMaxmizeTransition();
    } else {
      this.setupRestoreTransition();
    }
  }

  close() {
    this.props.onClose();
    // if visible is undefined, toggle visible
    if (this.props.visible === undefined && this.state.visible !== false) {
      this.handleVisibleChange(false);
    }
  }

  show() {
    this.props.onShow();
    if (this.props.visible === undefined && this.state.visible !== true) {
      this.handleVisibleChange(true);
    }
  }

  setupEnterTransition() {
    this.setState(
      {
        visible: true,
        transitionEnter: true,
        transitionEnterActive: false,

        // reset leave
        transitionLeave: false,
        transitionLeaveActive: false
      },
      () => {
        raf(() => {
          if (this.componentIsMounted) {
            this.setState({
              transitionEnterActive: true
            });
          }
        });
      }
    );
  }

  setupLeaveTransition() {
    this.setState(
      {
        transitionLeave: true,
        transitionLeaveActive: false,

        // reset enter
        transitionEnter: false,
        transitionEnterActive: false
      },
      () => {
        raf(() => {
          if (!this.componentIsMounted) {
            return;
          }
          this.setState(
            {
              transitionLeaveActive: true
            },
            () => {
              setTimeout(() => {
                if (!this.componentIsMounted) {
                  return;
                }
                this.setState({
                  visible: false,
                  transitionLeave: false,
                  transitionLeaveActive: false
                });
              }, this.props.hideTransitionDuration);
            }
          );
        });
      }
    );
  }

  setupMaxmizeTransition() {
    this.positionBeforeMaximize = this.getComputedStylePosition();

    this.setState(
      {
        transitionMaximizeEnter: true,
        transitionMaximizeEnterActive: false,

        transitionRestoreEnter: false,
        transitionRestoreEnterActive: false
      },
      () => {
        raf(() => {
          if (!this.componentIsMounted) {
            return;
          }
          this.setState({
            transitionMaximizeEnterActive: true
          });
        });
      }
    );
  }

  setupRestoreTransition() {
    this.setState(
      {
        transitionRestoreEnter: true,
        transitionRestoreEnterActive: false,

        transitionMaximizeEnter: false,
        transitionMaximizeEnterActive: false
      },
      () => {
        raf(() => {
          if (!this.componentIsMounted) {
            return;
          }
          this.setState(
            {
              transitionRestoreEnterActive: true
            },
            () => {
              if (!this.componentIsMounted) {
                return;
              }
              setTimeout(() => {
                this.setState({
                  transitionRestoreEnter: false,
                  transitionRestoreEnterActive: false,
                  transitionMaximizeEnter: false,
                  transitionMaximizeEnterActive: false
                });
              }, 300);
            }
          );
        });
      }
    );
  }

  // window on resize
  setupWindowResizeListener() {
    if (this.props.constrainTo && !this.windowResizeListener) {
      this.windowResizeListener = throttle(
        this.onWindowResize,
        this.props.constrainOnWindowResizeDelay
      );
      global.addEventListener('resize', this.windowResizeListener, false);
    }
  }

  setupWindowScrollListener() {
    if (this.props.constrainTo && !this.windowScrollListener) {
      this.windowScrollListener = throttle(
        this.onWindowScroll,
        this.props.constrainOnWindowScrollDelay
      );
      global.addEventListener('scroll', this.windowScrollListener, false);
    }
  }

  detachWindowResizeListener() {
    window.removeEventListener('resize', this.windowResizeListener);
    this.windowResizeListener = null;
  }

  detachWindowScrollListener() {
    if (this.windowScrollListener) {
      window.removeEventListener('resize', this.windowScrollListener);
    }
    this.windowScrollListener = null;
  }

  onWindowResize() {
    this.checkFitToConstrain();
  }

  onWindowScroll() {
    this.checkFitToConstrain();
  }

  // layer manager

  register() {
    this.id = this.getManager().register(this, this.props.nameSpace);
  }

  unRegister() {
    this.getManager().unRegister(this.getId(), this.props.nameSpace);
  }

  getManager() {
    return this.props.manager || manager;
  }

  setZIndex({ zIndex, isTop, isTopModal }) {
    if (isTop != undefined) {
      this.setState({ isTop });
    }
    if (isTopModal != undefined) {
      this.setState({ isTopModal });
    }
    if (zIndex != undefined) {
      const newZIndex = zIndex + this.props.startFromZIndex;
      this.setState({ zIndex: newZIndex });
    }
  }

  getId() {
    return this.id;
  }

  refreshZIndex() {
    this.getManager().refreshWindow(this.getId(), this.props.nameSpace);
  }

  // methods
  bringToFront() {
    this.getManager().bringToFront(this.id, this.props.nameSpace);
    return this;
  }

  sendToBack() {
    this.getManager().sendToBack(this.id, this.props.nameSpace);
    return this;
  }

  sendBackwards() {
    this.getManager().sendBackwards(this.id, this.props.nameSpace);
    return this;
  }

  bringForwards() {
    this.getManager().bringForwards(this.id, this.props.nameSpace);
    return this;
  }

  maximize() {
    this.setMaximized(true);
    return this;
  }

  restore() {
    this.setMaximized(false);
    return this;
  }

  center() {
    this.setCentered(true);
    return this;
  }

  focus() {
    if (this.node) {
      this.node.focus();
    }
  }

  hasGeneralFocus() {
    return this.hasChildFocus() || this.hasFocus();
  }

  hasChildFocus() {
    return containsNode(
      this.node,
      global.document && global.document.activeElement
    );
  }

  hasFocus() {
    return this.node === (global.document && global.document.activeElement);
  }

  // arrows navigation
  handleKeyBoardNavigation(event) {
    const mapping = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    };
    const direction = mapping[event.key];
    if (event.ctrlKey || event.metaKey) {
      event.stopPropagation();
      this.handleWindowResizeWithKeys(direction);
    } else {
      this.handleWindowMoveWithKeys(direction);
    }
  }

  handleWindowResizeWithKeys(direction) {
    if (!this.props.enableKeyboardSizeChange) {
      return;
    }
    const position = this.getValidNormalizedPosition();
    const region = this.getRegion();
    const initialSize = {
      width: region.width,
      height: region.height
    };

    const { size: newSize, position: newPosition } = updateSizeWithDirection({
      position,
      size: initialSize,
      step: this.props.keyboardSizeChangeStep,
      direction
    });

    this.setPosition(newPosition);
    this.setSize(newSize);
  }

  handleWindowMoveWithKeys(direction) {
    if (!this.props.enableKeyboardPositionChange) {
      return;
    }

    const step = this.props.keyboardPositionChangeStep;
    const shift = { left: 0, top: 0 };
    if (direction === 'up') {
      shift.top -= step;
    }
    if (direction === 'down') {
      shift.top += step;
    }
    if (direction === 'left') {
      shift.left -= step;
    }
    if (direction === 'right') {
      shift.left += step;
    }

    const position = this.getComputedStylePosition();
    const originalRegion = this.getRegion();
    const region = this.getRegion().clone();
    const constrain = this.getConstrainRegion();

    region.shift(shift);
    region.constrainTo(constrain);

    let newPosition = this.getDiffPosition(
      {
        top: region.top - originalRegion.top,
        left: region.left - originalRegion.left
      },
      position
    );

    newPosition = this.getNormalizedPosition(newPosition);
    this.setPosition(newPosition);
  }
}

ZippyWindow.propTypes = {
  border: PropTypes.string,
  shadow: PropTypes.bool,
  borderRadius: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  autofocus: PropTypes.bool,
  autoFocus: PropTypes.bool,
  url: PropTypes.string,
  enableMoveProxy: PropTypes.bool,
  keepChildrenOnMove: PropTypes.bool,

  // animation
  transition: PropTypes.bool,
  hideTransitionDuration: PropTypes.number,
  showTransitionDuration: PropTypes.number,

  // stacking and modal
  manager: PropTypes.object,
  nameSpace: PropTypes.string, // used for stacking, not documented
  startFromZIndex: PropTypes.number, // not documented

  // title
  titlePosition: PropTypes.oneOf(['start', 'end']),
  renderToolBar: PropTypes.func,
  toolbarButtons: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),

  // misc
  captureTabNavigation: PropTypes.bool,

  // events
  onMount: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  // centered
  centered: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['vertical', 'horizontal'])
  ]),
  defaultCentered: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['vertical', 'horizontal'])
  ]),
  onCenteredChange: PropTypes.func,
  keepCenteredOnResize: PropTypes.bool,

  // size
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number
  ]),
  defaultSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number
  ]),
  onResize: PropTypes.func,
  onResizeStart: PropTypes.func,
  onResizeStop: PropTypes.func,
  onResizeDrag: PropTypes.func,
  minSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ]),
  maxSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ]),
  resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),

  // proxy
  enableResizeProxy: PropTypes.bool,

  // display
  enableRelativeToViewportToggle: PropTypes.bool,
  relativeToViewport: PropTypes.bool,
  relativeToViewportWhenMaximized: PropTypes.bool,
  defaultRelativeToViewport: PropTypes.bool,
  onRelativeToViewportChange: PropTypes.func,
  pinUpIconSize: PropTypes.number,
  pinDownIconSize: PropTypes.number,
  pinUpIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  pinDownIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderPinButton: PropTypes.func,

  // visibility
  visible: PropTypes.bool,
  renderNullWhenInvisible: PropTypes.bool,
  defaultVisible: PropTypes.bool,

  // domWrite
  useDirectDomPositionSizeChange: PropTypes.bool,

  // position/move
  onMove: PropTypes.func,
  onPositionChange: PropTypes.func,
  onMoveStart: PropTypes.func,
  onMoveStop: PropTypes.func,
  position: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  defaultPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  draggable: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  aspectRatioPrecision: PropTypes.number,
  keepAspectRatio: PropTypes.bool,

  // constrain relation to size/position
  constrainOnWindowResize: PropTypes.bool,
  keepPositionOnConstrain: PropTypes.bool,
  keepSizeOnConstrain: PropTypes.bool,
  constrainOnWindowScroll: PropTypes.bool,

  // constrains
  constrainTitleOnly: PropTypes.bool,
  constrainTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.bool,
    PropTypes.object
  ]),
  constrainOnWindowResizeDelay: PropTypes.number,
  constrainOnWindowScrollDelay: PropTypes.number,

  // maximize
  maximizable: PropTypes.bool,
  maximizeOnDoubleClick: PropTypes.bool,
  maximizeIconSize: PropTypes.number,
  maximized: PropTypes.bool,
  defaultMaximized: PropTypes.bool,
  maximizeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  restoreIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  restoreIconSize: PropTypes.number,
  onMaximizeChange: PropTypes.func,
  onMaximize: PropTypes.func,
  onRestore: PropTypes.func,
  maximizeTransition: PropTypes.bool,
  renderMaximizeButton: PropTypes.func,

  shouldUpdatePositionWithOffsetParentChange: PropTypes.bool,

  // closeable
  closeable: PropTypes.bool,
  onClose: PropTypes.func,
  onShow: PropTypes.func,
  closeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  closeIconSize: PropTypes.number,
  renderCloseButton: PropTypes.func,

  // collapsible
  collapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  collapsible: PropTypes.bool,
  onCollapse: PropTypes.func,
  onCollapseChange: PropTypes.func,
  onExpand: PropTypes.func,
  collapseIconSize: PropTypes.number,
  expandIconSize: PropTypes.number,
  expandIcon: PropTypes.node,
  collapseIcon: PropTypes.node,
  renderCollapseButton: PropTypes.func,

  // handles
  handleStyle: PropTypes.object,
  showHandlesOnOver: PropTypes.bool,
  handleWidth: PropTypes.number,
  mobileHandleWidth: PropTypes.number,
  resizeHandles: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  handlesOutside: PropTypes.bool,
  mobileHandlesOutside: PropTypes.bool,
  renderResizeHandle: PropTypes.func,
  mobileHandleConfig: PropTypes.object,
  handleConfig: PropTypes.object,

  // modal
  modal: PropTypes.bool,

  // body
  bodyStyle: PropTypes.object,
  bodyPadding: PropTypes.number,
  bodyClassName: PropTypes.string,
  bodyBorder: PropTypes.string,
  bodyScrollable: PropTypes.bool,

  // keyboard navigation
  enableKeyboardPositionChange: PropTypes.bool,
  enableKeyboardSizeChange: PropTypes.bool,
  keyboardSizeChangeStep: PropTypes.number,
  keyboardPositionChangeStep: PropTypes.number,

  // title
  titleStyle: PropTypes.object,
  titleClassName: PropTypes.string
};

ZippyWindow.defaultProps = {
  // stacking and modal
  manager,
  nameSpace: 'all',
  startFromZIndex: 100,
  enableMoveProxy: true,
  keepChildrenOnMove: true,

  onMount: emptyFn,
  rootClassName: 'zippy-react-toolkit-window',
  theme: 'default',
  shadow: undefined,
  borderRadius: 0,
  autofocus: false,
  autoFocus: false,
  onBlur: emptyFn,
  onFocus: emptyFn,

  useDirectDomPositionSizeChange: true,

  // animation
  transition: true,
  hideTransitionDuration: 300,
  showTransitionDuration: 300,

  // display
  defaultRelativeToViewport: false,
  enableRelativeToViewportToggle: false,
  relativeToViewportWhenMaximized: true,
  pinUpIconSize: 21,
  pinDownIconSize: 21,
  onRelativeToViewportChange: emptyFn,

  // title
  titlePosition: 'start',
  titleStyle: {},
  titleBarPosition: 'top',

  // visibility
  defaultVisible: true,
  renderNullWhenInvisible: false,

  // size
  onResizeStart: emptyFn,
  onResizeStop: emptyFn,
  onResizeDrag: emptyFn,
  onResize: emptyFn,
  enableResizeProxy: true,

  onMoveStart: emptyFn,
  onMoveStop: emptyFn,
  onPositionChange: emptyFn,
  onMaximizeChange: emptyFn,
  onMaximize: emptyFn,
  onRestore: emptyFn,

  // position
  position: null,

  // size
  size: null,
  defaultSize: { width: 300, height: 200 },
  minSize: 200,

  // maximized
  maximizable: true,
  defaultMaximized: false,
  maximizeTransition: false,
  maximizeOnDoubleClick: true,
  maximizeIconSize: 21,
  restoreIconSize: 21,

  // closeable
  closeable: true,
  onClose: emptyFn,
  onShow: emptyFn,
  closeIconSize: 21,

  // collapsible
  collapsible: true,
  defaultCollapsed: false,
  onCollapse: emptyFn,
  onExpand: emptyFn,
  onCollapseChange: emptyFn,
  collapseIconSize: 18,
  expandIconSize: 18,

  // resize
  aspectRatioPrecision: 5,
  keepAspectRatio: false,
  resizeHandles: true,
  resizable: true,
  draggable: true,

  // handles
  handleWidth: 5,
  mobileHandleWidth: 30,
  handleStyle: null,
  showHandlesOnOver: true,
  renderResizeHandle: emptyFn,
  handlesOutside: false,
  mobileHandlesOutside: false,

  // constrains
  constrainTo: true,
  constrainTitleOnly: false,

  // centered
  defaultCentered: false,
  onCenteredChange: emptyFn,
  keepCenteredOnResize: true,

  // modal
  modal: false,

  // constrain relation to size/position
  constrainOnWindowResizeDelay: 16,
  constrainOnWindowScrollDelay: 16,
  constrainOnWindowResize: false,
  keepPositionOnConstrain: false,
  keepSizeOnConstrain: false,
  constrainOnWindowScroll: false,

  // body
  bodyStyle: null,
  bodyPadding: 10,
  bodyClassName: '',
  bodyScrollable: true,

  // keyboard navigation
  enableKeyboardPositionChange: true,
  enableKeyboardSizeChange: true,

  keyboardSizeChangeStep: 10,
  keyboardPositionChangeStep: 10
};

export default ZippyWindow;
