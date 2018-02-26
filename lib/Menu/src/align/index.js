'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getConstrainRegion = require('../../../common/getConstrainRegion');

var _getConstrainRegion2 = _interopRequireDefault(_getConstrainRegion);

var _prepareAlignOffset = require('../utils/prepareAlignOffset');

var _prepareAlignOffset2 = _interopRequireDefault(_prepareAlignOffset);

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

exports.default = function (props, subMenuRegion, targetAlignRegion, constrainTo, domNode) {
  var constrainRegion = _getConstrainRegion2.default.call(undefined, constrainTo, domNode);
  // if (!constrainRegion) {
  //   return;
  // }

  if (typeof props.alignSubMenu === 'function') {
    props.alignSubMenu(subMenuRegion, targetAlignRegion, constrainRegion);
  } else {
    var alignPositions = props.alignPositions;

    var offset = props.rtl ? props.rtlSubmenuAlignOffset : props.submenuAlignOffset;

    offset = (0, _prepareAlignOffset2.default)(offset, alignPositions.length);

    var pos = subMenuRegion.alignTo(targetAlignRegion, alignPositions, {
      offset: offset,
      constrain: constrainRegion
    });

    return pos == 'tl-tr' || pos == 'tr-tl' ? // align downwards
    1 : // align upwards
    -1;
  }
};