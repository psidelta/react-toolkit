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

import Region from '@zippytech/region';

let CACHED;
let LISTENING_WINDOW_RESIZE;

const setupWindowResize = () => {
  LISTENING_WINDOW_RESIZE = true;
  global.addEventListener('resize', () => {
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

  const viewportWidth = Math.max(
    global.document.documentElement.clientWidth,
    global.innerWidth || 0
  );
  const viewportHeight = Math.max(
    global.document.documentElement.clientHeight,
    global.innerHeight || 0
  );

  return (CACHED = Region.from({
    top: 0,
    left: 0,
    width: viewportWidth,
    height: viewportHeight
  }));
}

export default getViewportRegion;
