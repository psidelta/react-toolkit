/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cleanProps from '../../common/cleanProps';
import join from '../../common/join';
import CloseButton from './CloseButton';
import PinButton from './PinButton';
import getMinMaxSize from './utils/getMinMaxSize';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.setRootRef = el => {
      this.rootNode = el;
    };

    this.state = {
      hover: false
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handlePinButtonClick = this.handlePinButtonClick.bind(this);
    this.hide = this.hide.bind(this);

    this.widthMeasured = props.width === undefined;
    this.heightMeasured = props.height === undefined;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.handleVisibleChange(nextProps.visible);
    }
  }

  componentDidMount() {
    // onsize change needs to be done after a delayed
    // so notification board gets to be mounted and have a ref to
    // rootNode.
    // At this point in time NotificationBoard doesn't have a ref to it's root.
    // A reference is needed when positioning Notifications relative to an element.
    setTimeout(() => {
      this.onSizeChange();
    }, 0);

    this.componentIsMounted = true;
    if (this.props.autoHideDelay) {
      this.startAutoHideDelay();
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = null;
  }

  render() {
    const props = this.props;
    const {
      content,
      stacking,
      moveTransition,
      icon,
      shadow,
      nonBlocking,
      rootClassName,
      rtl,
      relativeToViewport,
      theme,
      title
    } = props;

    const normalizedStacking = Array.isArray(stacking) && stacking.join('-');

    let className = join(
      rootClassName,
      props.className,
      !title && `${rootClassName}__content-no-title`,
      rtl && `${rootClassName}--rtl`,
      theme && `${rootClassName}--theme-${theme}`,
      shadow && `${rootClassName}--shadow`,
      nonBlocking && `${rootClassName}--non-blocking`,
      relativeToViewport && `${rootClassName}--relative-to-viewport`,
      this.getVisible() && `${rootClassName}--visible`
    );

    const contentClass = `${rootClassName}__content`;

    if (this.isInShowHideTransition()) {
      className = this.getTransitionClassName(className);
    } else {
      className = join(
        className,
        normalizedStacking &&
          `${rootClassName}--stacking-${normalizedStacking}`,
        moveTransition && `${rootClassName}--move-transition`
      );
    }

    const style = this.prepareStyle(props);

    return (
      <div
        {...cleanProps(props, Notification.propTypes)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleOnClick}
        className={className}
        style={style}
        ref={this.setRootRef}
      >
        <div
          className={
            title
              ? `${rootClassName}__header`
              : `${rootClassName}__header-no-title`
          }
        >
          {icon}
          {this.renderTitle() || (
            <div className={`${rootClassName}__header__spacer`} />
          )}
          {this.renderPinButton()}
          {this.renderCloseButton()}
        </div>
        <div className={contentClass}>{content}</div>
      </div>
    );
  }

  renderTitle() {
    if (!this.props.title) {
      return null;
    }

    const titleProps = {
      className: join(
        `${this.props.rootClassName}__title`,
        this.props.titleEllipsis &&
          `${this.props.rootClassName}__title--ellipsis`
      ),
      children: this.props.title
    };

    let result;
    if (typeof this.props.title === 'function') {
      result = this.props.title(titleProps, this.props);
    }

    if (result == null) {
      result = <div {...titleProps} />;
    }

    return result;
  }

  renderCloseButton() {
    if (!this.props.closeButton) {
      return null;
    }

    const rtlClass = this.props.rtl
      ? `${this.props.rootClassName}__close-button--rtl`
      : `${this.props.rootClassName}__close-button`;

    const closeButtonProps = {
      className: rtlClass,
      onClick: this.hide
    };

    let result;
    if (this.props.closeButton !== true) {
      result =
        typeof this.props.closeButton === 'function'
          ? this.props.closeButton(closeButtonProps, this.props)
          : this.props.closeButton;
    }

    if (result == null) {
      result = <CloseButton {...closeButtonProps} />;
    }

    return result;
  }

  renderPinButton() {
    if (!this.props.pinButton) {
      return null;
    }

    const rtlClass = join(
      this.props.rtl
        ? `${this.props.rootClassName}__pin-button--rtl`
        : `${this.props.rootClassName}__pin-button`,
      this.state.pinned && `${this.props.rootClassName}__pin-button--active`
    );

    const pinButtonProps = {
      className: rtlClass,
      pinned: this.state.pinned,
      onClick: this.handlePinButtonClick
    };

    let result;
    if (this.props.pinButton !== true) {
      result =
        typeof this.props.pinButton === 'function'
          ? this.props.pinButton(pinButtonProps, {
              ...this.props,
              ...this.state
            })
          : this.props.pinButton;
    }

    if (result == null) {
      result = <PinButton {...pinButtonProps} />;
    }

    return result;
  }

  handlePinButtonClick(event) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    const newPinned = !this.state.pinned;
    this.setState({
      pinned: newPinned
    });

    if (newPinned) {
      this.cancelAutoHide();
      this.autoHideCanceledByPin = true;
    } else {
      this.autoHideCanceledByPin = false;
      this.startAutoHideDelay();
    }
  }

  prepareStyle(props) {
    props = props || this.props;
    const { border } = props;
    const style = {};

    if (props.border) {
      style.border = props.border;
    }

    if (props.background) {
      style.background = props.background;
    }

    if (props.padding) {
      style.padding = props.padding;
    }

    if (props.borderRadius) {
      style.borderRadius = props.borderRadius;
    }

    if (props.width && !this.widthMeasured) {
      style.width = props.width;
    }

    if (props.height && !this.heightMeasured) {
      style.height = props.height;
    }

    const isInTransition = this.isInShowHideTransition();
    if (props.opacity !== undefined) {
      const cleanOpacity =
        (this.props.clearOpacityOnMouseEnter && this.state.hover) ||
        this.state.pinned;
      const opacity = cleanOpacity ? 1 : props.opacity;
      if (isInTransition) {
        style.opacity = this.getTransitionOpacity();
      } else {
        style.opacity = opacity;
      }
    }

    const minMaxSize = getMinMaxSize(props);

    const position = {
      top: props.position.top,
      left: props.position.left,
      right: props.position.right,
      bottom: props.position.bottom
    };
    if (
      props.stacking &&
      props.stacking.indexOf('center') !== -1 &&
      props.width
    ) {
      if (props.stacking[0] === 'top' || props.stacking[0] === 'bottom') {
        position.left = '50%';
        position.marginLeft = -props.width / 2;
      }
      if (props.stacking[0] === 'left' || props.stacking[0] === 'right') {
        position.top = '50%';
        position.marginTop = -props.height / 2;
      }
    }

    return {
      ...minMaxSize,
      ...style,
      ...props.style,
      ...position,
      ...this.getTransitionStyle()
    };
  }

  getTransitionStyle() {
    if (!this.hasTransition()) {
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

  getTransitionClassName(className) {
    const { rootClassName } = this.props;
    const {
      transitionEnter,
      transitionEnterActive,
      transitionLeave,
      transitionLeaveActive
    } = this.state;

    const showAnimation = this.getShowAnimation();
    let showTransitionClassName = '';
    if (showAnimation) {
      if (transitionEnterActive) {
        showTransitionClassName = `zippy-animation-${showAnimation}--active`;
      }

      if (transitionEnter) {
        showTransitionClassName += ` zippy-animation-${showAnimation}`;
      }
    }

    const hideAnimation = this.getHideAnimation();
    let hideTransitionClassName = '';
    if (hideAnimation) {
      if (transitionLeaveActive) {
        hideTransitionClassName = `zippy-animation-${hideAnimation}--active`;
      }

      if (transitionLeave) {
        hideTransitionClassName += ` zippy-animation-${hideAnimation}`;
      }
    }

    return join(
      className,
      `${this.props.rootClassName}--has-transition`,
      transitionEnter && `${rootClassName}--transition-enter`,
      transitionEnterActive && `${rootClassName}--transition-enter-active`,
      transitionLeave && `${rootClassName}--transition-leave`,
      transitionLeaveActive && `${rootClassName}--transition-leave-active`,
      showTransitionClassName,
      hideTransitionClassName
    );
  }

  /**
   * If an opacity is set and show/hide animation is fade.
   * Then it should fadeIn to that value and start fadeOut from that value
   */
  getTransitionOpacity(opacity = this.props.opacity) {
    if (
      this.state.transitionEnterActive &&
      this.getShowAnimation() === 'fade-in'
    ) {
      return opacity;
    }

    if (
      this.state.transitionLeaveActive &&
      this.getHideAnimation() === 'fade-out'
    ) {
      return 0;
    }

    if (this.state.transitionLeave && this.getHideAnimation() === 'fade-out') {
      return opacity;
    }

    return null;
  }

  getShowAnimation() {
    let showAnimation = this.props.showAnimation;
    if (showAnimation === true) {
      showAnimation = 'fade-in';
    }

    return showAnimation;
  }

  getHideAnimation() {
    let hideAnimation = this.props.hideAnimation;
    if (hideAnimation === true) {
      hideAnimation = 'fade-out';
    }
    return hideAnimation;
  }

  getVisible() {
    return this.props.visible;
  }

  onSizeChange() {
    const node = this.rootNode;
    const width = this.props.width || node.offsetWidth;
    const height = this.props.height || node.offsetHeight;

    this.props.onSizeChange({
      id: this.props.id,
      stacking: this.props.stacking,
      changes: {
        width,
        height,
        visible: true
      }
    });
  }

  hide() {
    this.props.onHide({ id: this.props.id });

    // close immediately if it doen't have a transition
    if (!this.props.hideAnimation) {
      this.close();
    }
  }

  close() {
    this.props.onClose(this.props.id);
  }

  show() {
    this.props.onShow(this.props.id);
  }

  // transition
  handleVisibleChange(visible) {
    if (visible) {
      this.props.showAnimation && this.setupEnterTransition();
    } else {
      this.props.hideAnimation && this.setupLeaveTransition();
    }
  }

  hasTransition() {
    return this.props.showAnimation || this.props.hideAnimation;
  }

  isInShowHideTransition() {
    const {
      transitionEnter,
      transitionEnterActive,
      transitionLeave,
      transitionLeaveActive
    } = this.state;

    return (
      transitionEnter ||
      transitionEnterActive ||
      transitionLeave ||
      transitionLeaveActive
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
        setTimeout(() => {
          if (this.componentIsMounted) {
            this.setState(
              {
                transitionLeaveActive: true
              },
              () => {
                setTimeout(() => {
                  if (this.componentIsMounted) {
                    // cleanup
                    this.setState({
                      transitionLeave: false,
                      transitionLeaveActive: false
                    });
                    this.close();
                  }
                }, this.props.hideTransitionDuration);
              },
              16
            );
          }
        });
      }
    );
  }

  setupEnterTransition() {
    this.setState(
      {
        transitionEnter: true,
        transitionEnterActive: false,

        // reset leave
        transitionLeave: false,
        transitionLeaveActive: false
      },
      () => {
        setTimeout(() => {
          if (this.componentIsMounted) {
            this.setState(
              {
                transitionEnterActive: true
              },
              () => {
                setTimeout(() => {
                  if (this.componentIsMounted) {
                    // clean up
                    this.setState({
                      transitionEnter: false,
                      transitionEnterActive: false
                    });
                  }
                }, this.props.showTransitionDuration);
              }
            );
          }
        }, 16);
      }
    );
  }

  // events
  handleMouseEnter(event) {
    this.setState({ hover: true });
    this.props.onMouseLeave(event);

    if (this.props.delayAutoHideOnMouseOver && this.hideTimeoutId) {
      this.cancelAutoHide();
    }
  }

  handleMouseLeave(event) {
    this.setState({ hover: false });
    this.props.onMouseEnter(event);

    if (
      this.props.delayAutoHideOnMouseOver &&
      !this.hideTimeoutId &&
      !this.autoHideCanceledByClick &&
      !this.autoHideCanceledByPin
    ) {
      this.startAutoHideDelay();
    }
  }

  handleOnClick(event) {
    if (this.props.hideOnClick) {
      this.hide();
    } else if (this.props.cancelAutoHideOnClick) {
      if (this.props.pinButton && !this.state.pinned) {
        this.handlePinButtonClick();
      } else {
        this.cancelAutoHide();
        this.autoHideCanceledByClick = true;
      }
    }

    this.props.onClick(event);
  }

  // autoHideDelay
  cancelAutoHide() {
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = null;
    }
  }

  startAutoHideDelay() {
    if (!this.props.autoHideDelay) {
      return null;
    }

    this.hideTimeoutId = setTimeout(() => {
      this.hide();
    }, this.props.autoHideDelay);
  }
}

function emptyFn() {}

Notification.defaultProps = {
  rootClassName: 'zippy-react-toolkit-notification',
  position: {},
  theme: 'default',
  visible: false,

  // subcomponets
  closeButton: true,

  // events
  onSizeChange: emptyFn,
  onHide: emptyFn,
  onShow: emptyFn,
  onMouseLeave: emptyFn,
  onMouseEnter: emptyFn,
  handleOnClick: emptyFn,
  onClick: emptyFn,
  /**
   * This is an internal api.
   * it calls onClose when the notification can be removed, or not rendered any more.
   * This is done whe  the transition is hide transition is done.
   */
  onClose: emptyFn,

  moveTransition: true,
  showAnimation: true,
  hideAnimation: true
};

Notification.propTypes = {
  rootClassName: PropTypes.string,
  nonBlocking: PropTypes.bool,
  closed: PropTypes.bool,
  rtl: PropTypes.bool,
  relativeToViewport: PropTypes.bool,

  // Subcomponents
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.bool, PropTypes.func]),
  titleEllipsis: PropTypes.bool,
  content: PropTypes.node,
  closeButton: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.bool
  ]),
  pinButton: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.bool
  ]),
  icon: PropTypes.node,

  position: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  }),

  push: PropTypes.oneOf(['start', 'end']),
  stacking: PropTypes.arrayOf(
    PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'center'])
  ),
  clearOpacityOnMouseEnter: PropTypes.bool,
  handleOnClick: PropTypes.func,
  maxNotificationsPerStacking: PropTypes.number,

  // show hide
  autoHideDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  delayAutoHideOnMouseOver: PropTypes.bool,
  cancelAutoHideOnClick: PropTypes.bool,
  hideOnClick: PropTypes.bool,

  // animation
  showAnimation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hideAnimation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  // style
  style: PropTypes.object,
  theme: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  background: PropTypes.string,
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  height: PropTypes.number,
  width: PropTypes.number,
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
  offset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number
    })
  ]),
  opacity: PropTypes.number,
  shadow: PropTypes.bool,

  widthMeasured: PropTypes.bool, // whether this dimension was read from the dom
  heightMeasured: PropTypes.bool, // whether this dimension was read from the dom

  // visiblity
  visible: PropTypes.bool,
  moveTransition: PropTypes.bool,

  hideTransitionDuration: PropTypes.number,
  showTransitionDuration: PropTypes.number,

  // events
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onSizeChange: PropTypes.func,
  onHide: PropTypes.func,
  onClose: PropTypes.func,
  onShow: PropTypes.func
};

export default Notification;
