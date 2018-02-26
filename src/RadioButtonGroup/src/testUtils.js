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

import ReactDOM from 'react-dom';

const render = cmp => {
  const targetNode = document.createElement('div');

  targetNode.style.height = '600px';
  targetNode.style.width = '1000px';
  document.body.appendChild(targetNode);

  const instance = ReactDOM.render(cmp, targetNode);

  instance.rerender = cmp => {
    return ReactDOM.render(cmp, targetNode);
  };

  instance.unmount = () => {
    ReactDOM.unmountComponentAtNode(targetNode);
    document.body.removeChild(targetNode);
  };

  return instance;
};

export default render;
export { render };
