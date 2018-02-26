'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [prepareClassName description]
 * @param  {Object} states
 * @param  {Object} classNames
 * @return {String}
 */
function prepareClassName() {
  var states = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var classNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var disabled = states.disabled,
      icon = states.icon,
      active = states.active,
      pressed = states.pressed,
      over = states.over,
      children = states.children,
      focused = states.focused,
      iconFirst = states.iconFirst,
      rtl = states.rtl,
      ellipsis = states.ellipsis,
      align = states.align,
      verticalAlign = states.verticalAlign,
      wrap = states.wrap,
      overflow = states.overflow,
      iconPosition = states.iconPosition;
  var className = classNames.className,
      rootClassName = classNames.rootClassName,
      disabledClassName = classNames.disabledClassName,
      activeClassName = classNames.activeClassName,
      pressedClassName = classNames.pressedClassName,
      overClassName = classNames.overClassName,
      focusedClassName = classNames.focusedClassName,
      theme = classNames.theme;


  var preparedClassname = (0, _join2.default)(className, rootClassName, theme && rootClassName + '--theme-' + theme, disabled && disabledClassName, disabled && rootClassName + '--disabled', active && activeClassName, active && rootClassName + '--active', pressed && pressedClassName, pressed && rootClassName + '--pressed', over && overClassName, over && rootClassName + '--over', focused && focusedClassName, focused && rootClassName + '--focused', rtl ? rootClassName + '--rtl' : rootClassName + '--ltr', ellipsis && rootClassName + '--ellipsis', align && rootClassName + '--align-' + align, !children && rootClassName + '--no-children', verticalAlign && rootClassName + '--vertical-align-' + verticalAlign, overflow === true && rootClassName + '--overflow-visible', overflow === false && rootClassName + '--overflow-hidden', wrap === true && rootClassName + '--wrap', wrap === false && rootClassName + '--nowrap', icon && rootClassName + '--has-icon', iconPosition && rootClassName + '--icon-position-' + iconPosition, iconFirst ? rootClassName + '--icon-first' : rootClassName + '--icon-last');

  return preparedClassname;
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

exports.default = prepareClassName;