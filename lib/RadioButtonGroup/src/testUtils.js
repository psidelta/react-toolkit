'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(cmp) {
  var targetNode = document.createElement('div');

  targetNode.style.height = '600px';
  targetNode.style.width = '1000px';
  document.body.appendChild(targetNode);

  var instance = _reactDom2.default.render(cmp, targetNode);

  instance.rerender = function (cmp) {
    return _reactDom2.default.render(cmp, targetNode);
  };

  instance.unmount = function () {
    _reactDom2.default.unmountComponentAtNode(targetNode);
    document.body.removeChild(targetNode);
  };

  return instance;
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

exports.default = render;
exports.render = render;