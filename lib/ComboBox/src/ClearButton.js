'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icons = require('./Icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClearButton = function ClearButton(_ref) {
  var onClear = _ref.onClear,
      className = _ref.className,
      closeIcon = _ref.closeIcon,
      size = _ref.size;

  var closeIconProps = {
    className: className,
    size: size,
    onClick: function onClick(event) {
      // don't lose focus
      event.preventDefault();
      event.stopPropagation();
      onClear();
    }
  };

  var closeIconEl = void 0;
  if (closeIcon && closeIcon !== true) {
    var closeIconParams = {
      onClear: onClear,
      domProps: closeIconProps
    };

    closeIconEl = typeof closeIcon === 'function' ? closeIcon(closeIconParams) : closeIcon;
  }

  if (closeIconEl === undefined) {
    closeIconEl = _react2.default.createElement(_Icons.CloseIcon, closeIconProps);
  }

  return closeIconEl;
};

ClearButton.defaultProps = {
  size: 10
};

exports.default = ClearButton;