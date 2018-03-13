'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Region = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _autoBind = require('@zippytech/react-class/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _ToolbarRegion = require('./ToolbarRegion');

var _ToolbarRegion2 = _interopRequireDefault(_ToolbarRegion);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var emptyFn = function emptyFn() {};

function isRegion(child) {
  return child && child.props && child.props.isToolbarRegion;
}

function toAlign(index, regions) {
  if (index == 0) {
    return 'start';
  }

  if (index == regions.length - 1) {
    return 'end';
  }

  return 'center';
}

var ZippySimpleToolbar = function (_React$Component) {
  _inherits(ZippySimpleToolbar, _React$Component);

  function ZippySimpleToolbar() {
    _classCallCheck(this, ZippySimpleToolbar);

    return _possibleConstructorReturn(this, (ZippySimpleToolbar.__proto__ || Object.getPrototypeOf(ZippySimpleToolbar)).apply(this, arguments));
  }

  _createClass(ZippySimpleToolbar, [{
    key: 'render',
    value: function render() {
      var props = this.props;


      var children = this.prepareChildren(props);
      var className = (0, _join2.default)(props.className, 'zippy-react-simple-toolbar', 'zippy-react-simple-toolbar--orientation-' + props.orientation, props.theme ? 'zippy-react-simple-toolbar--theme-' + props.theme : null);

      return _react2.default.createElement('div', _extends({}, (0, _cleanProps2.default)(props, ZippySimpleToolbar.propTypes), {
        children: children,
        className: className
      }));
    }
  }, {
    key: 'prepareChildren',
    value: function prepareChildren(props) {
      var _this2 = this;

      var regionCount = 0;

      var children = [];
      var regions = [];

      _react2.default.Children.forEach(props.children, function (child) {
        if (isRegion(child)) {
          regions.push(child);
          regionCount++;
        }
      });

      var regionIndex = -1;
      _react2.default.Children.forEach(props.children, function (child) {
        if (isRegion(child)) {
          regionIndex++;
          child = _this2.prepareRegion(child, regionIndex, regions);
        }

        children.push(child);
      });

      if (!regionCount) {
        var Factory = props.regionFactory || _ToolbarRegion2.default;
        return this.prepareRegion(_react2.default.createElement(
          Factory,
          null,
          children
        ));
      }

      return children;
    }
  }, {
    key: 'prepareRegion',
    value: function prepareRegion(region) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var regions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var props = this.props;
      var regionStyle = _extends({}, props.regionStyle);

      if (props.padding) {
        regionStyle.padding = props.padding;
      }

      var style = _extends({}, regionStyle, region.props.style);
      var align = region.props.align || toAlign(index, regions) || 'center';
      var theme = region.props.theme || props.theme;

      return (0, _react.cloneElement)(region, {
        style: style,
        theme: theme,
        orientation: props.orientation,
        align: align
      });
    }
  }]);

  return ZippySimpleToolbar;
}(_react2.default.Component);

ZippySimpleToolbar.propTypes = {
  isReactToolbar: _propTypes2.default.bool,
  orientation: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  padding: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  theme: _propTypes2.default.string,
  regionFactory: _propTypes2.default.func
};

ZippySimpleToolbar.defaultProps = {
  isReactToolbar: true,
  orientation: 'horizontal',
  theme: 'default'
};

ZippySimpleToolbar.Region = _ToolbarRegion2.default;

exports.default = ZippySimpleToolbar;
exports.Region = _ToolbarRegion2.default;