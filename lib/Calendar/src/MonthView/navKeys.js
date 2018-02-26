'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = {
  ArrowUp: -7,
  ArrowDown: 7,
  ArrowLeft: -1,
  ArrowRight: 1,

  PageUp: function PageUp(mom) {
    return mom.add(-1, 'month');
  },
  PageDown: function PageDown(mom) {
    return mom.add(1, 'month');
  },
  Home: function Home(mom) {
    return mom.startOf('month');
  },
  End: function End(mom) {
    return mom.endOf('month');
  }
};