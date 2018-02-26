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

function rangeFill(length, fill = '#fff') {
  return Array.apply(null, Array(length))
    .map(() => fill)
}

/**
 * Returns a palette with empty spaces filled with white
 * @param  {Number} length
 * @param  {String[]} palette
 * @return {String[]}
 */
function getPalette({ length, palette }) {
  // check to see if palette is falsey
  // or it has length 0
  if (!palette || (palette && palette.length === 0)) {
    return rangeFill(length)
  }

  if (length >= palette && palette.length) {
    return palette
  }


  const emptyColorLength = length - palette.length
  return [
    ...palette,
    ...rangeFill(emptyColorLength)
  ]
}

export default getPalette
