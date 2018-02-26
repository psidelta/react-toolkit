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

import assign from '../../../common/assign';
import getMinMaxSize from '../../../common/getMinMaxSize';

function prepareStyle(props, state) {
  var style = {};

  if (props.subMenu) {
    assign(style, props.submenuStyle);
  } else {
    assign(style, props.style);
  }

  if (props.at) {
    var isArray = Array.isArray(props.at);
    var coords = {
      left: isArray
        ? props.at[0]
        : props.at.left === undefined
          ? props.at.x || props.at.pageX
          : props.at.left,

      top: isArray
        ? props.at[1]
        : props.at.top === undefined
          ? props.at.y || props.at.pageY
          : props.at.top
    };

    assign(style, coords);
  }

  if (state.positionStyle) {
    style = { ...style, ...state.positionStyle };
  }

  const minMaxSize = getMinMaxSize(props);
  assign(style, minMaxSize);

  if (props.padding) {
    assign(style, { padding: props.padding });
  }

  if (props.border) {
    assign(style, { border: props.border });
  }

  if (typeof props.shadow === 'string') {
    assign(style, { boxShadow: props.shadow });
  }
  if (props.borderRadius) {
    assign(style, { borderRadius: props.borderRadius });
  }
  if (props.width) {
    assign(style, { width: props.width });
  }

  if (
    props.enableAnimation &&
    (state.transitionEnded || state.transitionStart)
  ) {
    assign(style, {
      transitionDuration: `${props.fadeDuration}ms`,
      transitionTimingFunction: props.transitionTimingFunction
    });
  }

  return style;
}

export default prepareStyle;
