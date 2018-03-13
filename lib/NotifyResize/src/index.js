'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotifyResize = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _shallowequal = require('../../common/shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _debounce = require('../../common/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HUGE_NUMBER = Math.pow(10, 10);

var emptyFn = function emptyFn() {};
var immediateFn = function immediateFn(fn) {
  return fn();
};

var notifyResizeStyle = {
  contain: 'strict',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  overflow: 'hidden',
  display: 'block',
  pointerEvents: 'none',
  opacity: 0,
  direction: 'ltr',
  textAlign: 'start'
};

var expandToolStyle = {
  contain: 'strict',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto'
};

var contractToolStyle = {
  contain: 'strict',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto'
};

var contractToolInnerStyle = {
  contain: 'strict',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '200%',
  height: '200%'
};

var ZippyNotifyResize = function (_React$Component) {
  _inherits(ZippyNotifyResize, _React$Component);

  function ZippyNotifyResize(props) {
    _classCallCheck(this, ZippyNotifyResize);

    var _this = _possibleConstructorReturn(this, (ZippyNotifyResize.__proto__ || Object.getPrototypeOf(ZippyNotifyResize)).call(this, props));

    _this.checkResize = _this.checkResize.bind(_this);
    _this.onResize = _this.onResize.bind(_this);

    if (props.notifyResizeDelay > 0) {
      _this.onResize = (0, _debounce2.default)(_this.onResize, props.notifyResizeDelay);
    }

    if (props.checkResizeDelay > 0) {
      _this.checkResize = (0, _debounce2.default)(_this.checkResize, props.checkResizeDelay);
    }

    _this.refNotifyResize = function (node) {
      _this.notifyResizeNode = node;
    };
    _this.refContractTool = function (node) {
      _this.contractToolNode = node;
    };
    _this.refExpandTool = function (node) {
      _this.expandToolNode = node;
    };
    _this.refExpandToolInner = function (node) {
      _this.expandToolInnerNode = node;
    };

    _this.state = {
      notifyResizeWidth: 0,
      notifyResizeHeight: 0,

      expandToolWidth: 0,
      expandToolHeight: 0,

      contractToolWidth: 0,
      contractToolHeight: 0
    };
    return _this;
  }

  _createClass(ZippyNotifyResize, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (typeof nextProps.shouldComponentUpdate === 'function') {
        return nextProps.shouldComponentUpdate(nextProps, this.props, nextState, this.state);
      }

      return !(0, _shallowequal2.default)(nextState, this.state) || !(0, _shallowequal2.default)(nextProps, this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.__willUnmount = true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (typeof this.props.onMount === 'function') {
        this.props.onMount(this);
      }

      this.resetResizeTool(function () {
        if (_this2.props.notifyOnMount) {
          var _state = _this2.state,
              width = _state.notifyResizeWidth,
              height = _state.notifyResizeHeight;

          _this2.onResize({ width: width, height: height });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          ref: this.refNotifyResize,
          style: notifyResizeStyle,
          onScroll: this.checkResize
        },
        this.renderExpandTool(),
        this.renderContractTool()
      );
    }
  }, {
    key: 'renderExpandTool',
    value: function renderExpandTool() {
      return _react2.default.createElement(
        'div',
        { ref: this.refExpandTool, style: expandToolStyle },
        _react2.default.createElement('div', {
          ref: this.refExpandToolInner,
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: this.state.expandToolWidth,
            height: this.state.expandToolHeight
          }
        })
      );
    }
  }, {
    key: 'renderContractTool',
    value: function renderContractTool() {
      return _react2.default.createElement(
        'div',
        { ref: this.refContractTool, style: contractToolStyle },
        _react2.default.createElement('div', { ref: 'contractInner', style: contractToolInnerStyle })
      );
    }
  }, {
    key: 'resetResizeTool',
    value: function resetResizeTool(callback) {
      var _this3 = this;

      this.setDimensions(function () {
        _this3.scrollToBottomExpandTool();
        if (typeof callback == 'function') {
          callback();
        }
      });
    }
  }, {
    key: 'setDimensions',
    value: function setDimensions(callback) {
      var _this4 = this;

      this.getDimensions(function (size) {
        var notifyResizeWidth = size.notifyResizeWidth,
            notifyResizeHeight = size.notifyResizeHeight;

        // Resize tool will be bigger than its parent by 1 pixel in each direction

        _this4.setState({
          notifyResizeWidth: notifyResizeWidth,
          notifyResizeHeight: notifyResizeHeight,
          expandToolWidth: notifyResizeWidth + 1,
          expandToolHeight: notifyResizeHeight + 1
        }, callback);
      });
    }
  }, {
    key: 'getDimensions',
    value: function getDimensions(callback) {
      var _this5 = this;

      if (!callback || typeof callback != 'function') {
        callback = emptyFn;
      }
      var notifyResize = this.notifyResizeNode;
      if (!notifyResize) {
        return;
      }
      var node = notifyResize.parentElement || notifyResize;

      var size = void 0;

      var fn = this.props.useRaf ? requestAnimationFrame : immediateFn;

      fn(function () {
        // if (this.props.useWillChange && !this.willChangeUsed) {
        //   node.style.willChange = 'transform';
        //   node.style.opacity = 1;
        //   this.willChangeUsed = true;
        // }

        if (typeof _this5.props.measureSize == 'function') {
          size = _this5.props.measureSize(node, notifyResize);
        } else {
          size = {
            width: node.offsetWidth,
            height: node.offsetHeight
          };
        }

        callback({
          notifyResizeWidth: size.width,
          notifyResizeHeight: size.height
        });
      });
    }
  }, {
    key: 'scrollToBottomExpandTool',
    value: function scrollToBottomExpandTool(callback) {
      var _this6 = this;

      // so the scroll moves when element resizes
      if (this.notifyResizeNode) {
        requestAnimationFrame(function () {
          // scroll to bottom
          var expandTool = _this6.expandToolNode;
          var contractTool = _this6.contractToolNode;

          var expandToolScrollHeight = void 0;
          var expandToolScrollWidth = void 0;

          var contractToolScrollHeight = void 0;
          var contractToolScrollWidth = void 0;

          if (expandTool) {
            expandToolScrollHeight = expandTool.scrollHeight;
            expandToolScrollWidth = expandTool.scrollWidth;
          }

          if (contractTool) {
            contractToolScrollHeight = contractTool.scrollHeight;
            contractToolScrollWidth = contractTool.scrollWidth;
          }

          if (expandTool) {
            expandTool.scrollTop = expandToolScrollHeight;
            expandTool.scrollLeft = expandToolScrollWidth;
          }

          if (contractTool) {
            contractTool.scrollTop = contractToolScrollHeight;
            contractTool.scrollLeft = contractToolScrollWidth;
          }

          if (typeof callback == 'function') {
            callback();
          }
        });
      }
    }
  }, {
    key: 'checkResize',
    value: function checkResize() {
      var _this7 = this;

      this.getDimensions(function (_ref) {
        var notifyResizeWidth = _ref.notifyResizeWidth,
            notifyResizeHeight = _ref.notifyResizeHeight;

        if (notifyResizeWidth !== _this7.state.notifyResizeWidth || notifyResizeHeight !== _this7.state.notifyResizeHeight) {
          _this7.onResize({
            width: notifyResizeWidth,
            height: notifyResizeHeight
          });
          // reset resizeToolDimensions
          _this7.resetResizeTool();
        }
      });
    }
  }, {
    key: 'onResize',
    value: function onResize(_ref2) {
      var width = _ref2.width,
          height = _ref2.height;

      if (this.__willUnmount) {
        return;
      }
      if (typeof this.props.onResize === 'function') {
        this.props.onResize({ width: width, height: height });
      }
    }
  }]);

  return ZippyNotifyResize;
}(_react2.default.Component);

ZippyNotifyResize.defaultProps = {
  useWillChange: false,
  useRaf: true
};

ZippyNotifyResize.propTypes = {
  onResize: _propTypes.func,
  onMount: _propTypes.func,
  useWillChange: _propTypes.bool,
  useRaf: _propTypes.bool,
  notifyOnMount: _propTypes.bool,
  notifyResizeDelay: _propTypes.number,
  checkResizeDelay: _propTypes.number
};

/*
const notifyResize = Cmp =>
  class NotifyResizeWrapper extends React.Component {
    constructor(props) {
      super(props);
      autoBind(this);

      this.refComponent = c => {
        this.component = c;
      };
    }
    componentDidMount() {
      const component = this.component;

      // check if they are mounted
      if (!this.notifyResize && showWarnings) {
        console.warn(
          'For notifyResize to work you must render resizeTool from {props.resizeTool}'
        );
      }
    }

    onNotifyResizeMount(notifier) {
      this.notifyResize = notifier;
    }

    onResize(...args) {
      if (typeof this.props.onResize === 'function') {
        this.props.onResize(...args);
      }

      if (typeof this.component.onResize === 'function') {
        this.component.onResize(...args);
      }
    }

    render() {
      const resizeTool = (
        <ZippyNotifyResize
          onResize={this.onResize}
          onMount={this.onNotifyResizeMount}
          notifyOnMount={this.props.notifyOnMount}
        />
      );

      return (
        <Cmp ref={this.refComponent} {...this.props} resizeTool={resizeTool} />
      );
    }
  };
*/

exports.default = ZippyNotifyResize;
exports.NotifyResize = ZippyNotifyResize;