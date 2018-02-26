'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../../common/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

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

function PinButton(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === undefined ? 14 : _ref$size,
      className = _ref.className,
      pinned = _ref.pinned,
      rest = _objectWithoutProperties(_ref, ['size', 'className', 'pinned']);

  return _react2.default.createElement(
    'div',
    _extends({}, rest, { className: className }),
    _react2.default.createElement(_Icon2.default, { type: pinned ? 'pin-down' : 'pin-up', size: size })
  );
}

exports.default = PinButton;