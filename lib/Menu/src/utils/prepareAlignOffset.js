'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
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

var _range = require('../../../common/range');

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareAlignOffset(alignOffset, positionsLength) {
  // if number normalize to { x, y }
  var offset = void 0;
  if (Array.isArray(alignOffset)) {
    offset = alignOffset.map(function (alignOffsetItem) {
      // make sure it is in object
      if (typeof alignOffsetItem === 'number') {
        return {
          x: alignOffsetItem,
          y: alignOffsetItem
        };
      } else {
        return alignOffsetItem;
      }
    });
  }

  if (typeof alignOffset === 'number') {
    offset = {
      x: alignOffset,
      y: alignOffset
    };
  }

  if ((typeof alignOffset === 'undefined' ? 'undefined' : _typeof(alignOffset)) === 'object') {
    offset = alignOffset;
  }

  // have to be the same number of offsets as positions
  if (!Array.isArray(offset) && positionsLength) {
    offset = (0, _range2.default)(0, positionsLength).map(function () {
      return offset;
    });
  }

  return offset;
}

exports.default = prepareAlignOffset;