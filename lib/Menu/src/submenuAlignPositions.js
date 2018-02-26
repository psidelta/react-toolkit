'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var alignPositionLTR = [
// align to right
'tl-tr', 'bl-br',

// align to left
'tr-tl', 'br-bl'];

var alignPositionRTL = [
// align to left
'tr-tl', 'br-bl',

// align to right
'tl-tr', 'bl-br'];

var alignOffsetLTR = [{ x: -7, y: 5 }, // ok
{ x: -7, y: -5 }, // ok
{ x: 7, y: 5 }, // ok
{ x: 7, y: -5 // ok
}];
var alignOffsetRTL = [{ x: 7, y: 5 }, // ok
{ x: 7, y: -5 }, // ok
{ x: -7, y: 5 }, // ok
{ x: -7, y: -5 // ok
}];

exports.alignPositionLTR = alignPositionLTR;
exports.alignPositionRTL = alignPositionRTL;
exports.alignOffsetLTR = alignOffsetLTR;
exports.alignOffsetRTL = alignOffsetRTL;