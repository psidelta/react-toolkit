'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icons = require('./Icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToggleButton = function ToggleButton(_ref) {
  var onToggle = _ref.onToggle,
      className = _ref.className,
      toggleIcon = _ref.toggleIcon,
      size = _ref.size,
      expanded = _ref.expanded;

  var toggleIconProps = {
    className: className,
    size: size,
    expanded: expanded,
    onClick: function onClick(event) {
      // don't lose focus
      event.preventDefault();
      onToggle();
    }
  };

  var toggleButtonEl = void 0;
  if (toggleIcon) {
    var params = {
      onToggle: onToggle,
      expanded: expanded,
      domProps: toggleIconProps
    };

    toggleButtonEl = typeof toggleIcon === 'function' ? toggleIcon(params) : toggleIcon;
  }

  if (toggleButtonEl === true || toggleButtonEl == undefined) {
    toggleButtonEl = _react2.default.createElement(_Icons.ToggleIcon, toggleIconProps);
  }

  return toggleButtonEl;
}; /**
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

ToggleButton.defaultProps = {
  size: 10
};

ToggleButton.propTypes = {
  expanded: _propTypes2.default.bool,
  size: _propTypes2.default.number
};

exports.default = ToggleButton;