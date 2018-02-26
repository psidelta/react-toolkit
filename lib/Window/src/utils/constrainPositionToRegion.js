"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

/**
 * Constrains a position to it's constrain.
 * @param  {region} region    region of the window/titlebar
 * @param  {region} constrain region to which the region is constrained
 * @param  {{ top?: number, ...}} position
 * @return {{ top?: number, ...}}           constrained posiiton
 */
function constrainPositionToRegion(_ref) {
  var region = _ref.region,
      constrain = _ref.constrain,
      position = _ref.position;

  var newPosition = _extends({}, position);

  // constrain top
  if (position.top !== undefined && position.top < constrain.top) {
    newPosition.top = constrain.top;
  }

  if (position.top !== undefined && position.top + region.height > constrain.bottom) {
    newPosition.top = constrain.bottom - region.height;
  }

  // constrain left
  if (position.left !== undefined && position.left < constrain.left) {
    newPosition.left = constrain.left;
  }

  if (position.left !== undefined && position.left + region.width > constrain.right) {
    newPosition.left = constrain.right - region.width;
  }

  // constrain bottom
  if (position.bottom !== undefined && position.bottom > constrain.bottom - region.height) {
    newPosition.bottom = constrain.bottom - region.height;
  }

  if (position.bottom !== undefined && position.bottom < 0) {
    newPosition.bottom = 0; // to be ajusted when relative
  }

  // constrian right
  if (position.right !== undefined && position.right < 0) {
    newPosition.right = 0;
  }

  if (position.right !== undefined && position.right > constrain.right - region.width) {
    newPosition.right = constrain.right - region.width;
  }

  return newPosition;
}

exports.default = constrainPositionToRegion;