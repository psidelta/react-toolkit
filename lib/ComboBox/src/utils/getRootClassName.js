'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _join = require('./join');

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRootClassName(_ref) {
  var _ref$props = _ref.props,
      props = _ref$props === undefined ? {} : _ref$props,
      _ref$state = _ref.state,
      state = _ref$state === undefined ? {} : _ref$state,
      _ref$computed = _ref.computed,
      computed = _ref$computed === undefined ? {} : _ref$computed;
  var rootClassName = props.rootClassName,
      className = props.className,
      rtl = props.rtl,
      shadow = props.shadow,
      showShadowOnMouseOver = props.showShadowOnMouseOver,
      disabled = props.disabled,
      readOnly = props.readOnly,
      emptyClassName = props.emptyClassName,
      disabledClassName = props.disabledClassName,
      focusedClassName = props.focusedClassName,
      inlineFlex = props.inlineFlex,
      theme = props.theme;
  var over = state.over,
      focus = state.focus;
  var value = computed.value;


  var showShadow = showShadowOnMouseOver ? over && shadow : shadow;

  return (0, _join2.default)(rootClassName, className, rtl ? rootClassName + '--rtl' : rootClassName + '--ltr', showShadow && rootClassName + '--shadow', disabled && rootClassName + '--disabled', readOnly && rootClassName + '--readOnly', theme && rootClassName + '--theme-' + theme, inlineFlex && rootClassName + '--inlineFlex', focus && rootClassName + '--focus', !value && emptyClassName, disabled && disabledClassName, focus && focusedClassName);
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

exports.default = getRootClassName;