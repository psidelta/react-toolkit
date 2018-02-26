'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _assign = require('../../../common/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getMinMaxSize = require('../../../common/getMinMaxSize');

var _getMinMaxSize2 = _interopRequireDefault(_getMinMaxSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareStyle(props, state) {
  var style = {};

  if (props.subMenu) {
    (0, _assign2.default)(style, props.submenuStyle);
  } else {
    (0, _assign2.default)(style, props.style);
  }

  if (props.at) {
    var isArray = Array.isArray(props.at);
    var coords = {
      left: isArray ? props.at[0] : props.at.left === undefined ? props.at.x || props.at.pageX : props.at.left,

      top: isArray ? props.at[1] : props.at.top === undefined ? props.at.y || props.at.pageY : props.at.top
    };

    (0, _assign2.default)(style, coords);
  }

  if (state.positionStyle) {
    style = _extends({}, style, state.positionStyle);
  }

  var minMaxSize = (0, _getMinMaxSize2.default)(props);
  (0, _assign2.default)(style, minMaxSize);

  if (props.padding) {
    (0, _assign2.default)(style, { padding: props.padding });
  }

  if (props.border) {
    (0, _assign2.default)(style, { border: props.border });
  }

  if (typeof props.shadow === 'string') {
    (0, _assign2.default)(style, { boxShadow: props.shadow });
  }
  if (props.borderRadius) {
    (0, _assign2.default)(style, { borderRadius: props.borderRadius });
  }
  if (props.width) {
    (0, _assign2.default)(style, { width: props.width });
  }

  if (props.enableAnimation && (state.transitionEnded || state.transitionStart)) {
    (0, _assign2.default)(style, {
      transitionDuration: props.fadeDuration + 'ms',
      transitionTimingFunction: props.transitionTimingFunction
    });
  }

  return style;
}

exports.default = prepareStyle;