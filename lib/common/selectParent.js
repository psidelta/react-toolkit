'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matchesSelector = require('./matchesSelector');

var _matchesSelector2 = _interopRequireDefault(_matchesSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectParent(selector, node) {
  node = node.parentElement;
  while (node) {
    if ((0, _matchesSelector2.default)(node, selector)) {
      return node;
    }
    node = node.parentElement;
  }

  return false;
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
exports.default = selectParent;