'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _join = require('../../../common/join');

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getClassNames = function getClassNames(props) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      checked = _ref.checked;

  var rtl = props.rtl,
      inlineBlock = props.inlineBlock,
      readOnly = props.readOnly,
      readOnlyClassName = props.readOnlyClassName,
      theme = props.theme,
      disabled = props.disabled,
      disabledClassName = props.disabledClassName,
      focusedClassName = props.focusedClassName,
      className = props.className,
      childrenPosition = props.childrenPosition;
  var focused = state.focused;


  return (0, _join2.default)(props.rootClassName, className, childrenPosition && props.rootClassName + '--children-position-' + childrenPosition, rtl ? props.rootClassName + '--rtl' : props.rootClassName + '--ltr', readOnly && (0, _join2.default)(props.rootClassName + '--read-only', readOnlyClassName), focused && (0, _join2.default)(props.rootClassName + '--focused', focusedClassName), disabled && (0, _join2.default)(props.rootClassName + '--disabled', disabledClassName), inlineBlock && props.rootClassName + '--inline-block', checked === true ? props.rootClassName + '--checked' : checked === false ? props.rootClassName + '--unchecked' : props.rootClassName + '--indeterminate', theme && props.rootClassName + '--theme-' + theme);
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