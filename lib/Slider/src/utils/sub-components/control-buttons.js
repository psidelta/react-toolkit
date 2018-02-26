'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDecrementButton = exports.renderIncrementButton = exports.renderControlButtonsWrapper = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _join = require('../../../../common/join');

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getControllButtonProps = function getControllButtonProps(config) {
  var disabled = config.disabled;

  return {
    disabled: disabled
  };
};

var renderIncrementButton = function renderIncrementButton(domProps) {
  return _react2.default.createElement('button', domProps);
};
var renderDecrementButton = function renderDecrementButton(domProps) {
  return _react2.default.createElement('button', domProps);
};

var renderControlButtonsWrapper = function renderControlButtonsWrapper(input, config, startIncrement, startDecrement, CLASS_NAME) {
  var renderIncrementButton = config.renderIncrementButton,
      renderDecrementButton = config.renderDecrementButton,
      incrementButton = config.incrementButton,
      decrementButton = config.decrementButton;


  var buttonConfig = getControllButtonProps(config);

  return [renderIncrementButton(_extends({}, buttonConfig, {
    key: 'decrementButton',
    children: decrementButton,
    onMouseDown: startDecrement,
    className: (0, _join2.default)(CLASS_NAME + '__control-button', CLASS_NAME + '__decrement-button')
  })), _react2.default.createElement(
    'div',
    { key: 'inputWrapper', className: CLASS_NAME + '__input-wrapper' },
    input
  ), renderDecrementButton(_extends({}, buttonConfig, {
    key: 'incrementButton',
    children: incrementButton,
    onMouseDown: startIncrement,
    className: (0, _join2.default)(CLASS_NAME + '__control-button', CLASS_NAME + '__increment-button')
  }))];
};

exports.renderControlButtonsWrapper = renderControlButtonsWrapper;
exports.renderIncrementButton = renderIncrementButton;
exports.renderDecrementButton = renderDecrementButton;