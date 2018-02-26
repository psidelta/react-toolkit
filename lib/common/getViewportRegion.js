'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _region = require('@zippytech/region');

var _region2 = _interopRequireDefault(_region);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CACHED = void 0; /**
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

var LISTENING_WINDOW_RESIZE = void 0;

var setupWindowResize = function setupWindowResize() {
  LISTENING_WINDOW_RESIZE = true;
  global.addEventListener('resize', function () {
    CACHED = null;
  });
};

function getViewportRegion() {
  if (CACHED) {
    return CACHED;
  }

  if (!LISTENING_WINDOW_RESIZE) {
    setupWindowResize();
  }

  var viewportWidth = Math.max(global.document.documentElement.clientWidth, global.innerWidth || 0);
  var viewportHeight = Math.max(global.document.documentElement.clientHeight, global.innerHeight || 0);

  return CACHED = _region2.default.from({
    top: 0,
    left: 0,
    width: viewportWidth,
    height: viewportHeight
  });
}

exports.default = getViewportRegion;