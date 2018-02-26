'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _join = require('../../../common/join');

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getClassNames = function getClassNames(props, state, CLASS_NAME) {
  var className = props.className,
      theme = props.theme,
      orientation = props.orientation,
      rtl = props.rtl,
      showButtons = props.showButtons,
      tickBarPosition = props.tickBarPosition;
  var focused = state.focused;


  return (0, _join2.default)(CLASS_NAME, className, CLASS_NAME + '--' + orientation + '-orientation', tickBarPosition === '' + tickBarPosition ? CLASS_NAME + '--tick-bar-' + orientation + '-' + tickBarPosition : '', CLASS_NAME + '--theme-' + theme, focused && CLASS_NAME + '--focused', rtl && CLASS_NAME + '--rtl', showButtons && CLASS_NAME + '--with-buttons');
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

exports.default = getClassNames;