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

import { render, findDOMNode, unmountComponentAtNode } from 'react-dom';

const renderInDOM = (comp, domTarget = document.body) => {
  const target = document.createElement('div');
  domTarget.appendChild(target);

  const wrapper = render(comp, target);

  return {
    wrapper,
    wrapperNode: findDOMNode(wrapper),
    target,
    unmount: () => {
      unmountComponentAtNode(target);
      document.body.removeChild(target);
    }
  };
};

export default renderInDOM;
