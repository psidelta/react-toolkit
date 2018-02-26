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

import join from './join';

function getRootClassName({ props = {}, state = {}, computed = {} }) {
  const {
    rootClassName,
    className,
    rtl,
    shadow,
    showShadowOnMouseOver,
    disabled,
    readOnly,
    emptyClassName,
    disabledClassName,
    focusedClassName,
    inlineFlex,
    theme
  } = props;

  const { over, focus } = state;

  const { value } = computed;

  const showShadow = showShadowOnMouseOver ? over && shadow : shadow;

  return join(
    rootClassName,
    className,
    rtl ? `${rootClassName}--rtl` : `${rootClassName}--ltr`,
    showShadow && `${rootClassName}--shadow`,
    disabled && `${rootClassName}--disabled`,
    readOnly && `${rootClassName}--readOnly`,
    theme && `${rootClassName}--theme-${theme}`,
    inlineFlex && `${rootClassName}--inlineFlex`,
    focus && `${rootClassName}--focus`,
    !value && emptyClassName,
    disabled && disabledClassName,
    focus && focusedClassName
  );
}

export default getRootClassName;
