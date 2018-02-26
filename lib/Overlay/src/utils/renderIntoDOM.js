'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var renderInDOM = function renderInDOM(comp) {
  var domTarget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

  var target = document.createElement('div');
  domTarget.appendChild(target);

  var wrapper = (0, _reactDom.render)(comp, target);

  return {
    wrapper: wrapper,
    wrapperNode: (0, _reactDom.findDOMNode)(wrapper),
    target: target,
    unmount: function unmount() {
      (0, _reactDom.unmountComponentAtNode)(target);
      document.body.removeChild(target);
    }
  };
}; /**
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

exports.default = renderInDOM;