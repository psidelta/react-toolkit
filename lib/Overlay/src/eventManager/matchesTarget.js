'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matchesSelector = require('../../../common/matchesSelector');

var _matchesSelector2 = _interopRequireDefault(_matchesSelector);

var _containsNode = require('../../../common/containsNode');

var _containsNode2 = _interopRequireDefault(_containsNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if node matches target, it mathces if:
 * - it is the same element
 * - is a string and matches the selector
 * (target: String, node: HtmlElement) => Bool
 */
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

function matchesTarget(target, node) {
  if (node === document) {
    return null;
  }

  if (target === node) {
    return true;
  }

  if (typeof target === 'string' && (0, _matchesSelector2.default)(node, target)) {
    return true;
  }

  if ((0, _containsNode2.default)(target, node)) {
    return true;
  }

  return false;
}

exports.default = matchesTarget;