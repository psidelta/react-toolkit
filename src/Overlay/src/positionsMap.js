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
 * Mapping between positions and Region api.
 * Offset must be normalized so it behaves in a nice way.
 * E.g. position top, with offset { x: 10, y: 10 }
 * will mean, from center will be right offset with 10px
 * and 10 px above the target.
 * And offset passed to region.align to will be
 * { x: 10, y: -10 }
 */
const positionMap = {
  // align to right
  top: {
    alias: 'top',
    position: 'bc-tc',
    offset: {
      x: 1,
      y: -1,
      resetNumeric: 'x'
    }
  },

  'bc-tc': {
    alias: 'top',
    position: 'bc-tc',
    offset: {
      x: 1,
      y: -1,
      resetNumeric: 'x'
    }
  },

  // top aligned left
  'bl-tl': {
    alias: 'topAlignedLeft',
    position: 'bl-tl',
    offset: {
      x: 1,
      y: -1,
      resetNumeric: 'x'
    }
  },

  // top aligned right
  'br-tr': {
    alias: 'topAlignedRight',
    position: 'br-tr',
    offset: {
      x: 1,
      y: -1,
      resetNumeric: 'x'
    }
  },

  // top left
  'br-tl': {
    alias: 'topLeft',
    position: 'br-tl',
    offset: {
      x: -1,
      y: -1
    }
  },

  // right
  right: {
    position: 'lc-rc',
    alias: 'right',
    offset: {
      x: 1,
      y: 1,
      resetNumeric: 'y'
    }
  },

  // right
  'lc-rc': {
    position: 'lc-rc',
    alias: 'right',
    offset: {
      x: 1,
      y: 1,
      resetNumeric: 'y'
    }
  },

  // right aligned top
  'tl-tr': {
    position: 'tl-tr',
    alias: 'rightAlignedTop',
    offset: {
      x: 1,
      y: 1,
      resetNumeric: 'y'
    }
  },

  // right alined bottom
  'bl-br': {
    position: 'bl-br',
    alias: 'rightAlignedBottom',
    offset: {
      x: 1,
      y: 1,
      resetNumeric: 'y'
    }
  },

  // bottom right
  'tl-br': {
    position: 'tl-br',
    alias: 'bottomRight',
    offset: {
      x: 1,
      y: 1
    }
  },

  // bottom
  bottom: {
    position: 'tc-bc',
    alias: 'bottom',
    offset: {
      x: 1,
      y: 1,
      resetNumeric: 'x'
    }
  },

  // bottom
  'tc-bc': {
    position: 'tc-bc',
    alias: 'bottom',
    offset: {
      x: 1,
      y: 1,
      resetNumeric: 'x'
    }
  },

  // bottom aligned left
  'tl-bl': {
    position: 'tl-bl',
    alias: 'bottomAlinedLeft',
    offset: {
      x: 1,
      y: 1,
      resetNumeric: 'x'
    }
  },

  // bottom aligned right
  'tr-br': {
    position: 'tr-br',
    alias: 'bottomAlignedRight',
    offset: {
      x: 1,
      y: 1,
      resetNumeric: 'x'
    }
  },

  // bottom left
  'tr-bl': {
    position: 'tr-bl',
    alias: 'bottomLeft',
    offset: {
      x: -1,
      y: 1
    }
  },

  // left
  left: {
    position: 'rc-lc',
    alias: 'left',
    offset: {
      x: -1,
      y: 1,
      resetNumeric: 'y'
    }
  },

  // left
  'rc-lc': {
    position: 'rc-lc',
    alias: 'left',
    offset: {
      x: -1,
      y: 1,
      resetNumeric: 'y'
    }
  },

  // left aligned top
  'tr-tl': {
    position: 'tr-tl',
    alias: 'leftAlignedTop',
    offset: {
      x: -1,
      y: 1,
      resetNumeric: 'y'
    }
  },

  // left aligned bottom
  'br-bl': {
    position: 'br-bl',
    alias: 'leftAlignedBottom',
    offset: {
      x: -1,
      y: 1,
      resetNumeric: 'y'
    }
  }
};

const posiblePositions = Object.keys(positionMap);

export { posiblePositions };
export default positionMap;
