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

import Menu from '../Menu';

/**
 * Give an wrapper instance from enzyme.mount
 * it will return it's submenu
 */
function getSubMenu(wrapper) {
  const subMenu = wrapper.find(Menu).reduce(
    (acc, menu) => {
      if (menu.props().subMenu) {
        acc = menu;
      }

      return acc;
    },
    null
  );

  return subMenu;
}

export default getSubMenu;
