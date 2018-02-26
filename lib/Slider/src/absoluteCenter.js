'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = absoluteCenter;
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
function absoluteCenter(style) {
  style = style || {};

  style.margin = 'auto';
  style.position = 'absolute';
  style.top = style.bottom = style.left = style.right = 0;

  return style;
}