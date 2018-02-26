'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Give an wrapper instance from enzyme.mount
 * it will return it's submenu
 */
function getSubMenu(wrapper) {
  var subMenu = wrapper.find(_Menu2.default).reduce(function (acc, menu) {
    if (menu.props().subMenu) {
      acc = menu;
    }

    return acc;
  }, null);

  return subMenu;
} /**
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

exports.default = getSubMenu;