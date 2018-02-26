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

function getMinMaxSize(props) {
  let sizeType;
  let single;

  const style = props.style || {};
  const result = {};

  if (props.minSize) {
    sizeType = typeof props.minSize;
    single = sizeType == 'number' || sizeType == 'string';

    if (single) {
      result.minWidth = props.minSize;
      result.minHeight = props.minSize;
    } else {
      if (props.minSize.width) {
        result.minWidth = props.minSize.width;
      }
      if (props.minSize.height) {
        result.minHeight = props.minSize.height;
      }
    }
  }

  if (props.maxSize) {
    sizeType = typeof props.maxSize;
    single = sizeType == 'number' || sizeType == 'string';

    if (single) {
      result.maxWidth = props.maxSize;
      result.maxHeight = props.maxSize;
    } else {
      if (props.maxSize.width) {
        result.maxWidth = props.maxSize.width;
      }
      if (props.maxSize.height) {
        result.maxHeight = props.maxSize.height;
      }
    }
  }

  if (result.minWidth == undefined && style.minWidth != undefined) {
    result.minWidth = style.minWidth;
  }

  if (result.maxWidth == undefined && style.maxWidth != undefined) {
    result.maxWidth = style.maxWidth;
  }

  if (result.minHeight == undefined && style.minHeight != undefined) {
    result.minHeight = style.minHeight;
  }

  if (result.maxHeight == undefined && style.maxHeight != undefined) {
    result.maxHeight = style.maxHeight;
  }

  return result;
}

export default getMinMaxSize;
