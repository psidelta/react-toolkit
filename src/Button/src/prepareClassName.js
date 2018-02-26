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

import join from '../../common/join';

/**
 * [prepareClassName description]
 * @param  {Object} states
 * @param  {Object} classNames
 * @return {String}
 */
function prepareClassName(states = {}, classNames = {}) {
  const {
    disabled,
    icon,
    active,
    pressed,
    over,
    children,
    focused,
    iconFirst,
    rtl,
    ellipsis,
    align,
    verticalAlign,
    wrap,
    overflow,
    iconPosition
  } = states;

  const {
    className,
    rootClassName,
    disabledClassName,
    activeClassName,
    pressedClassName,
    overClassName,
    focusedClassName,
    theme
  } = classNames;

  const preparedClassname = join(
    className,
    rootClassName,
    theme && `${rootClassName}--theme-${theme}`,
    disabled && disabledClassName,
    disabled && `${rootClassName}--disabled`,
    active && activeClassName,
    active && `${rootClassName}--active`,
    pressed && pressedClassName,
    pressed && `${rootClassName}--pressed`,
    over && overClassName,
    over && `${rootClassName}--over`,
    focused && focusedClassName,
    focused && `${rootClassName}--focused`,
    rtl ? `${rootClassName}--rtl` : `${rootClassName}--ltr`,
    ellipsis && `${rootClassName}--ellipsis`,
    align && `${rootClassName}--align-${align}`,
    !children && `${rootClassName}--no-children`,
    verticalAlign && `${rootClassName}--vertical-align-${verticalAlign}`,
    overflow === true && `${rootClassName}--overflow-visible`,
    overflow === false && `${rootClassName}--overflow-hidden`,
    wrap === true && `${rootClassName}--wrap`,
    wrap === false && `${rootClassName}--nowrap`,
    icon && `${rootClassName}--has-icon`,
    iconPosition && `${rootClassName}--icon-position-${iconPosition}`,
    iconFirst ? `${rootClassName}--icon-first` : `${rootClassName}--icon-last`
  );

  return preparedClassname;
}

export default prepareClassName;
