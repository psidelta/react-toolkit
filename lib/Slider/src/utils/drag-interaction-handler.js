'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dragHelper = require('@zippytech/drag-helper');

var _dragHelper2 = _interopRequireDefault(_dragHelper);

var _valueUtils = require('./value-utils');

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

var handleDragInteraction = function handleDragInteraction(event, config, _ref) {
  var currentValue = _ref.currentValue,
      targetRegion = _ref.targetRegion,
      constrainRegion = _ref.constrainRegion,
      dragSize = _ref.dragSize,
      onHandleDragStart = _ref.onHandleDragStart,
      onHandleDrag = _ref.onHandleDrag,
      onHandleDragEnd = _ref.onHandleDragEnd;
  var horizontal = config.horizontal;


  (0, _dragHelper2.default)(event, {
    region: targetRegion,
    constrainTo: constrainRegion,

    onDragStart: onHandleDragStart,

    onDrag: function onDrag(event, dragConfig) {
      var diff = horizontal ? dragConfig.diff.left : dragConfig.diff.top;

      var percentage = diff * 100 / dragSize;
      var diffValue = (0, _valueUtils.getValueForPercentage)(percentage, config, { noStartValue: true });

      var newValue = currentValue + diffValue;
      onHandleDrag(newValue, diffValue);
    },

    onDrop: onHandleDragEnd
  });
};

exports.default = handleDragInteraction;