'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icons = require('./Icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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