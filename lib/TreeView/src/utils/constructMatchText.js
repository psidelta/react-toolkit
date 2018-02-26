'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Searches a string for searchValue
 * The string is split into an array,
 * where the matched words are inside an object {match: 'matchedSubstrig'}
 * @return {[type]} [description]
 */
function constructMatchText(text, regex, searchValue) {
  var searchValueLength = searchValue.length;
  var matchText = [];
  var localMatch = void 0;
  var previousLocalMatch = void 0;
  var wordIndex = 0;

  // while you find a word
  while ((localMatch = regex.exec(text)) !== null) {
    var index = localMatch.index;
    var previousSegmentIndex = previousLocalMatch ? previousLocalMatch.index + searchValueLength : 0;

    // text before match
    if (previousSegmentIndex !== index) {
      matchText.push(text.slice(previousSegmentIndex, index));
    }
    matchText.push({
      match: text.slice(localMatch.index, localMatch.index + searchValueLength)
    });

    previousLocalMatch = localMatch;
    wordIndex += 1;
  }

  // at the end we apend the rest of the string
  if (previousLocalMatch && previousLocalMatch.index + searchValueLength !== text.length) {
    matchText.push(text.slice(previousLocalMatch.index + searchValueLength));
  }

  return matchText;
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

exports.default = constructMatchText;