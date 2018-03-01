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

var _Flex = require('../../Flex');

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CLASS_NAME = 'zippy-react-simple-toolbar__region';

var JUSTIFY_MAP = {
  start: 'flex-start',
  left: 'flex-start',
  end: 'flex-end',
  right: 'flex-end'
};

var TEXT_ALIGN = { start: 'start', left: 'start', right: 'end', end: 'end' };

var FLEX_FLOW = { horizontal: 'row', vertical: 'column' };

var ZippyToolbarRegion = function (_React$Component) {
  _inherits(ZippyToolbarRegion, _React$Component);

  function ZippyToolbarRegion() {
    _classCallCheck(this, ZippyToolbarRegion);

    return _possibleConstructorReturn(this, (ZippyToolbarRegion.__proto__ || Object.getPrototypeOf(ZippyToolbarRegion)).apply(this, arguments));
  }

  _createClass(ZippyToolbarRegion, [{
    key: 'render',
    value: function render() {
      var props = this.props;


      var justifyContent = JUSTIFY_MAP[props.align] || 'center';
      var textAlign = TEXT_ALIGN[props.align] || 'center';
      var flexFlow = FLEX_FLOW[props.orientation] || 'row';

      var className = (0, _join2.default)(CLASS_NAME, props.align && CLASS_NAME + '--align-' + props.align, props.theme && CLASS_NAME + '--theme-' + props.theme, textAlign && CLASS_NAME + '--text-align-' + textAlign, props.orientation && CLASS_NAME + '--orientation-' + props.orientation);

      return _react2.default.createElement(_Flex.Item, _extends({}, (0, _cleanProps2.default)(props, ZippyToolbarRegion.propTypes), {
        className: className,
        justifyContent: justifyContent,
        flexFlow: flexFlow
      }));
    }
  }]);

  return ZippyToolbarRegion;
}(_react2.default.Component);

exports.default = ZippyToolbarRegion;


ZippyToolbarRegion.propTypes = {
  align: _propTypes2.default.oneOf(['start', 'end', 'center', 'middle', 'left', 'right']),
  orientation: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  theme: _propTypes2.default.string,
  isToolbarRegion: _propTypes2.default.bool
};

ZippyToolbarRegion.defaultProps = { isToolbarRegion: true };