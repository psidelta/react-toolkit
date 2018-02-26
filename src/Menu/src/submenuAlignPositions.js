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

const alignPositionLTR = [
  // align to right
  'tl-tr',
  'bl-br',

  // align to left
  'tr-tl',
  'br-bl'
];

const alignPositionRTL = [
  // align to left
  'tr-tl',
  'br-bl',

  // align to right
  'tl-tr',
  'bl-br'
];

const alignOffsetLTR = [
  { x: -7, y: 5 }, // ok
  { x: -7, y: -5 }, // ok
  { x: 7, y: 5 }, // ok
  { x: 7, y: -5 } // ok
];
const alignOffsetRTL = [
  { x: 7, y: 5 }, // ok
  { x: 7, y: -5 }, // ok
  { x: -7, y: 5 }, // ok
  { x: -7, y: -5 } // ok
];

export { alignPositionLTR, alignPositionRTL, alignOffsetLTR, alignOffsetRTL };
