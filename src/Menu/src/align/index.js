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

import getConstrainRegion from '../../../common/getConstrainRegion';

import prepareAlignOffset from '../utils/prepareAlignOffset';

export default (
  props,
  subMenuRegion,
  targetAlignRegion,
  constrainTo,
  domNode
) => {
  const constrainRegion = getConstrainRegion.call(this, constrainTo, domNode);
  // if (!constrainRegion) {
  //   return;
  // }

  if (typeof props.alignSubMenu === 'function') {
    props.alignSubMenu(subMenuRegion, targetAlignRegion, constrainRegion);
  } else {
    const alignPositions = props.alignPositions;

    let offset = props.rtl
      ? props.rtlSubmenuAlignOffset
      : props.submenuAlignOffset;

    offset = prepareAlignOffset(offset, alignPositions.length);

    const pos = subMenuRegion.alignTo(targetAlignRegion, alignPositions, {
      offset,
      constrain: constrainRegion
    });

    return pos == 'tl-tr' || pos == 'tr-tl'
      ? // align downwards
        1
      : // align upwards
        -1;
  }
};
