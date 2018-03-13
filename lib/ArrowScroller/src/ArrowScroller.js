'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _isMobile = require('../../common/isMobile');

var _isMobile2 = _interopRequireDefault(_isMobile);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _assign = require('../../common/assign');

var _assign2 = _interopRequireDefault(_assign);

var _debounce = require('../../common/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

var _Flex = require('../../Flex');

var _NotifyResize = require('../../NotifyResize');

var _InertialScroller = require('../../InertialScroller');

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pint = global.parseInt;
var raf = global.requestAnimationFrame;
var getCompStyle = global.getComputedStyle;

var ZippyArrowScroller = function (_Component) {
  _inherits(ZippyArrowScroller, _Component);

  function ZippyArrowScroller(props) {
    _classCallCheck(this, ZippyArrowScroller);

    var _this = _possibleConstructorReturn(this, (ZippyArrowScroller.__proto__ || Object.getPrototypeOf(ZippyArrowScroller)).call(this, props));

    _this.scrollInfo = {
      scrollPos: 0,
      hasStartScroll: false,
      hasEndScroll: false,
      scrollerSize: {
        start: 0,
        end: 0
      }
    };

    _this.state = {
      scrolling: false,
      activeScroll: 0
    };

    _this.handleResize = (0, _debounce2.default)(_this.handleResize.bind(_this), 50, {
      leading: false,
      trailing: true
    });
    _this.setStripRef = function (ref) {
      _this.strip = (0, _reactDom.findDOMNode)(ref);
    };
    _this.setRootRef = function (ref) {
      _this.root = (0, _reactDom.findDOMNode)(ref);
    };
    return _this;
  }

  _createClass(ZippyArrowScroller, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      raf(function () {
        var name = _this2.getOffsetSizeName();

        _this2.scrollInfo.scrollerSize = {
          start: _this2.props.scroller === (true || 'auto') ? _this2.start[name] : null,
          end: _this2.props.scroller === (true || 'auto') ? _this2.end[name] : null
        };

        _this2.syncScroll({ force: true });
        _this2.componentIsMounted = true;

        _this2.inertialManager = new _InertialScroller.InertialManager({
          arrowSelector: '.' + _this2.props.rootClassName + '__arrow',
          node: _this2.root,
          viewNode: _this2.strip,
          setScrollPosition: function setScrollPosition() {
            return raf(function () {
              return _this2.setScrollPosition();
            });
          },
          enableMouseDrag: false
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.componentIsMounted = false;
      if (this.inertialManager) {
        this.inertialManager.removeEventListeners();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var useTransformOnScroll = props.useTransformOnScroll,
          vertical = props.vertical,
          rootClassName = props.rootClassName,
          rtl = props.rtl,
          theme = props.theme;

      var scrollInfo = this.scrollInfo;

      var scrollValue = rtl ? scrollInfo.scrollPos : -scrollInfo.scrollPos;

      var innerWrapperClassName = (0, _join2.default)(rootClassName + '__inner-wrapper', rootClassName + '__inner-wrapper--direction-' + (vertical ? 'column' : 'row'));

      var className = (0, _join2.default)(props.className, rootClassName, !vertical && rootClassName + '--direction-horizontal', vertical && rootClassName + '--direction-vertical', rtl && rootClassName + '--rtl', theme && rootClassName + '--theme-' + theme);

      var transformValue = void 0;
      var moveStyle = {};

      if (useTransformOnScroll) {
        moveStyle.transform = 'translate3d(0px, 0px, 0px)';
      }
      if (vertical) {
        if (useTransformOnScroll) {
          moveStyle.transform = 'translate3d(0px, ' + scrollValue + 'px, 0px)';
        } else {
          moveStyle.top = scrollValue;
        }
      } else {
        if (useTransformOnScroll) {
          moveStyle.transform = 'translate3d(' + scrollValue + 'px, 0px, 0px)';
        } else {
          moveStyle.left = scrollValue;
        }
      }

      var resizer = _react2.default.createElement(_NotifyResize.NotifyResize, {
        key: 'resizer',
        notifyOnMount: true,
        onResize: this.handleResize,
        notifyResizeDelay: props.notifyResizeDelay
      });
      var children = [].concat(_toConsumableArray(_react2.default.Children.toArray(props.children)), [resizer]);

      return _react2.default.createElement(
        _Flex.Flex,
        _extends({}, (0, _cleanProps2.default)(props, ZippyArrowScroller.propTypes), {
          ref: this.setRootRef,
          className: className,
          alignItems: 'start'
        }),
        resizer,
        this.renderScroller(-1),
        _react2.default.createElement(_Flex.Flex, _extends({
          wrap: false
        }, props.childProps, {
          className: innerWrapperClassName,
          ref: this.setStripRef,
          children: children,
          style: moveStyle
        })),
        this.renderScroller(1)
      );
    }
  }, {
    key: 'renderScroller',
    value: function renderScroller(direction) {
      var _this3 = this;

      var _props = this.props,
          scroller = _props.scroller,
          vertical = _props.vertical,
          rootClassName = _props.rootClassName;

      if (!scroller) {
        return null;
      }

      var arrowName = vertical ? direction == (this.props.rtl ? 1 : -1) ? 'up' : 'down' : direction == (this.props.rtl ? 1 : -1) ? 'left' : 'right';

      var scrollInfo = this.scrollInfo;
      var disabled = direction == -1 ? !scrollInfo.hasStartScroll : !scrollInfo.hasEndScroll;

      var arrowRootClassName = rootClassName + '__arrow';

      var className = (0, _join2.default)(arrowRootClassName, arrowRootClassName + '--auto', arrowRootClassName + '--direction-' + arrowName, this.state.activeScroll == direction && arrowRootClassName + '--active', scroller === 'auto' && disabled && arrowRootClassName + '--hidden', scroller === 'auto' && !disabled && arrowRootClassName + '--visible', scroller === true && disabled && arrowRootClassName + '--disabled');

      var onClick = !disabled && this.props.scrollOnClick ? this.handleClick.bind(this, direction) : null;

      var onMouseDown = !disabled && (!this.props.scrollOnClick || _isMobile2.default) ? this.startScroll.bind(this, direction) : null;

      var onMouseEnter = !disabled && this.props.scrollOnMouseEnter ? this.startMouseOverScroll.bind(this, direction) : null;

      var onMouseLeave =
      // !disabled &&
      !this.props.scrollOnClick || _isMobile2.default ? this.stopMouseOverScroll.bind(this, direction) : null;

      var onDoubleClick = !disabled ? this.handleScrollMax.bind(this, direction) : null;

      var scrollerName = direction == -1 ? 'start' : 'end';

      var domProps = {
        ref: function ref(_ref) {
          _this3[scrollerName] = _ref;
        },
        disabled: disabled,
        className: className,
        onClick: onClick,
        onDoubleClick: onDoubleClick,
        onMouseDown: !_isMobile2.default ? onMouseDown : null,
        onTouchStart: _isMobile2.default ? onMouseDown : null,
        onTouchEnd: _isMobile2.default ? onMouseLeave : null,
        onMouseEnter: !_isMobile2.default ? onMouseEnter : null,
        onMouseLeave: !_isMobile2.default ? onMouseLeave : null,
        children: this.renderArrowIcon(arrowName)
      };

      var result = void 0;

      if (typeof this.props.renderScroller === 'function') {
        result = this.props.renderScroller({ domProps: domProps, direction: direction });
      }

      if (result === undefined) {
        result = _react2.default.createElement('div', domProps);
      }

      return result;
    }
  }, {
    key: 'renderArrowIcon',
    value: function renderArrowIcon(name) {
      var props = this.props;

      return _react2.default.createElement(_Arrow2.default, {
        name: name,
        size: props.arrowSize,
        height: props.arrowHeight,
        width: props.arrowWidth,
        className: this.props.rootClassName + '__arrow-icon'
      });
    }
  }, {
    key: 'getOffsetSizeName',
    value: function getOffsetSizeName() {
      return this.props.vertical ? 'offsetHeight' : 'offsetWidth';
    }
  }, {
    key: 'getBorderAndPaddingSize',
    value: function getBorderAndPaddingSize() {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
      var side = arguments[1];

      var computedStyle = getCompStyle(this.root);

      var start = void 0;
      var end = void 0;
      if (this.props.vertical) {
        start = pint(computedStyle.borderTopWidth) + pint(computedStyle.paddingTop);
        end = pint(computedStyle.borderBottomWidth) + pint(computedStyle.paddingBottom);
        return start + end;
      } else {
        start = pint(computedStyle.borderLeftWidth) + pint(computedStyle.paddingLeft);
        end = pint(computedStyle.borderRightWidth) + pint(computedStyle.paddingRight);
      }
      return side ? side == 'start' ? start : end : start + end;
    }
  }, {
    key: 'getSizeName',
    value: function getSizeName() {
      return this.props.vertical ? 'height' : 'width';
    }

    /**
     * Cache the available width on this instance.
     * It will be invalidated by handleResize
     *
     * @return {Number}
     */

  }, {
    key: 'getAvailableSize',
    value: function getAvailableSize() {
      // if there is no wrapper it will take the root node as wrapper
      if (!this.root) {
        return null;
      }
      var size = this.availableSize || this.root[this.getOffsetSizeName()] - this.getBorderAndPaddingSize();

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

  }, {
    key: 'getCurrentListSize',
    value: function getCurrentListSize() {
      if (!this.strip) {
        return null;
      }

      return this.currentListSize = this.currentListSize || this.strip[this.getOffsetSizeName()];
    }

    // events

  }, {
    key: 'handleResize',
    value: function handleResize() {
      if (!this.componentIsMounted) {
        return;
      }

      delete this.currentListSize;
      delete this.availableSize;
      this.syncScroll({ force: true });
    }
  }, {
    key: 'handleScrollMax',
    value: function handleScrollMax(direction, event) {
      var _this4 = this;

      event.stopPropagation();
      event.preventDefault();

      var maxPos = direction == -1 ? 0 : this.scrollInfo.maxScrollPos;

      raf(function () {
        _this4.setScrollPosition(maxPos);
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(direction) {
      var offset = this.getAvailableSize();
      this.scrollBy(offset, direction);
    }

    // methods

  }, {
    key: 'stopScroll',
    value: function stopScroll() {
      global.clearInterval(this.scrollInterval);

      this.setState({
        scrolling: false,
        activeScroll: 0
      });
    }
  }, {
    key: 'updateScrollInfo',
    value: function updateScrollInfo() {
      var availableSize = this.getAvailableSize();
      var listSize = this.getCurrentListSize();
      var scrollInfo = (0, _assign2.default)(this.scrollInfo, {
        availableSize: availableSize,
        listSize: listSize
      });

      if (listSize > availableSize) {
        scrollInfo.maxScrollPos = listSize - availableSize;
      } else {
        scrollInfo.maxScrollPos = 0;
      }

      scrollInfo.hasStartScroll = scrollInfo.scrollPos != 0;
      scrollInfo.hasEndScroll = scrollInfo.scrollPos < scrollInfo.maxScrollPos;

      var hasScroll = listSize > availableSize;
      if (hasScroll !== this.state.hasScroll) {
        this.props.onHasScrollChange(hasScroll);
      }
      this.setState({
        hasScroll: hasScroll
      });
    }
  }, {
    key: 'startScroll',
    value: function startScroll(direction, event) {
      var _this5 = this;

      var eventName = _isMobile2.default ? 'touchend' : 'mouseup';
      event.preventDefault();
      var mouseUpListener = function mouseUpListener() {
        _this5.stopScroll();
        global.removeEventListener(eventName, mouseUpListener);
      };

      global.addEventListener(eventName, mouseUpListener);

      this.scrollInterval = global.setInterval(this.doScroll.bind(this, direction), this.props.scrollSpeed);

      this.setState({
        scrolling: true,
        activeScroll: direction
      });
    }
  }, {
    key: 'startMouseOverScroll',
    value: function startMouseOverScroll(direction, event) {
      event.preventDefault();
      global.clearInterval(this.mouseOverScrollInterval);
      this.mouseOverScrollInterval = global.setInterval(this.doScroll.bind(this, direction), this.props.mouseoverScrollSpeed);

      this.setState({
        scrolling: true,
        activeScroll: direction
      });
    }
  }, {
    key: 'stopMouseOverScroll',
    value: function stopMouseOverScroll() {
      this.stopScroll();
      global.clearInterval(this.mouseOverScrollInterval);
    }
  }, {
    key: 'setScrollPosition',
    value: function setScrollPosition(scrollPos) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          force = _ref2.force;

      var scrollInfo = this.scrollInfo;
      if (scrollPos > scrollInfo.maxScrollPos) {
        scrollPos = scrollInfo.maxScrollPos;
      }

      if (scrollPos < 0) {
        scrollPos = 0;
      }

      if (scrollPos === scrollInfo.scrollPos && force !== true) {
        return null;
      }

      (0, _assign2.default)(scrollInfo, {
        hasStartScroll: scrollPos !== 0,
        hasEndScroll: scrollPos < scrollInfo.maxScrollPos,
        scrollPos: scrollPos
      });
      this.setState({});
    }
  }, {
    key: 'syncScroll',
    value: function syncScroll() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          force = _ref3.force;

      this.updateScrollInfo();
      this.doScroll(0, null, { force: force });
    }
  }, {
    key: 'scrollIntoView',
    value: function scrollIntoView(domNode) {
      var rootNode = this.root;
      if (!domNode || !rootNode) {
        return;
      }

      var rootComputedStyle = getCompStyle(rootNode);
      var rect = domNode.getBoundingClientRect();
      var mainRect = rootNode.getBoundingClientRect();

      var vertical = this.props.vertical;

      var startSideName = vertical ? 'top' : 'left';
      var endSideName = vertical ? 'bottom' : 'right';

      var startDiff = rect[startSideName] - (mainRect[startSideName] + this.getBorderAndPaddingSize(undefined, 'start'));

      var endDiff = rect[endSideName] - (mainRect[endSideName] - this.getBorderAndPaddingSize(undefined, 'end'));

      var scrollIntoViewOffset = this.props.scrollIntoViewOffset;

      if (startDiff < 0) {
        this.doScroll(-startDiff + scrollIntoViewOffset, -1);
      } else if (endDiff > 0) {
        this.doScroll(endDiff + scrollIntoViewOffset, 1);
      }
    }
  }, {
    key: 'doScroll',
    value: function doScroll(direction, step) {
      var _this6 = this;

      var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          force = _ref4.force;

      var scrollInfo = this.scrollInfo;
      var newScrollPos = scrollInfo.scrollPos + direction * (step || this.props.scrollStep);
      raf(function () {
        _this6.setScrollPosition(newScrollPos, { force: force });
      });
    }
  }, {
    key: 'scrollBy',
    value: function scrollBy(offset, direction) {
      var _this7 = this;

      var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          force = _ref5.force;

      var scrollInfo = this.scrollInfo;
      var newScrollPos = scrollInfo.scrollPos + direction * offset;
      raf(function () {
        _this7.setScrollPosition(newScrollPos, { force: force });
      });
    }
  }]);

  return ZippyArrowScroller;
}(_react.Component);

var emptyFn = function emptyFn() {};

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
  scrollOnMouseEnter: true,
  rtl: false,
  useTransformOnScroll: false,
  onHasScrollChange: emptyFn,
  theme: 'default'
};

ZippyArrowScroller.propTypes = {
  arrowSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
    width: _propTypes2.default.number,
    height: _propTypes2.default.number
  })]),
  theme: _propTypes2.default.string,

  scrollOnClick: _propTypes2.default.bool,
  childProps: _propTypes2.default.object,
  scrollOnMouseEnter: _propTypes2.default.bool,
  vertical: _propTypes2.default.bool,
  notifyResizeDelay: _propTypes2.default.number,
  scrollStep: _propTypes2.default.number,
  scrollSpeed: _propTypes2.default.number,
  mouseoverScrollSpeed: _propTypes2.default.number,
  scrollSpringConfig: _propTypes2.default.shape({
    stiffness: _propTypes2.default.number,
    damping: _propTypes2.default.number
  }),
  scrollIntoViewOffset: _propTypes2.default.number,
  scroller: _propTypes2.default.oneOf(['auto', false, true]),
  rootClassName: _propTypes2.default.string,
  rtl: _propTypes2.default.bool,
  useTransformOnScroll: _propTypes2.default.bool,
  onHasScrollChange: _propTypes2.default.func,
  renderScroller: _propTypes2.default.func
};

exports.default = ZippyArrowScroller;