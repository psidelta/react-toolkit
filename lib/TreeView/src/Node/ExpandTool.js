"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ExpandTool(_ref) {
  var onClick = _ref.onClick,
      collapsed = _ref.collapsed,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? 14 : _ref$size,
      children = _ref.children,
      onDoubleClick = _ref.onDoubleClick,
      rootClassName = _ref.rootClassName;

  return _react2.default.createElement(
    "div",
    { className: className, onClick: onClick, onDoubleClick: onDoubleClick },
    children ? children : _react2.default.createElement(
      "svg",
      { height: size, width: size, viewBox: "0 0 24 24" },
      _react2.default.createElement("path", { d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" })
    )
  );
} /**
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

exports.default = ExpandTool;