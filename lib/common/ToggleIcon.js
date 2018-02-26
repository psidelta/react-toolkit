"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
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

function ToggleIcon(_ref) {
  var onClick = _ref.onClick,
      className = _ref.className,
      expanded = _ref.expanded,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? 17 : _ref$size,
      rest = _objectWithoutProperties(_ref, ["onClick", "className", "expanded", "size"]);

  return _react2.default.createElement(
    "div",
    _extends({}, rest, {
      className: className,
      onClick: onClick
    }),
    _react2.default.createElement(
      "svg",
      {
        height: size,
        width: size,
        viewBox: "0 0 24 24"
      },
      expanded ? _react2.default.createElement("path", { d: "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" }) : _react2.default.createElement("path", { d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" })
    )
  );
}

exports.default = ToggleIcon;