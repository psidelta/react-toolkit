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

import join from '../../../common/join';

const getClassNames = (props, state = {}, { checked } = {}) => {
  const {
    rtl,

    inlineBlock,
    readOnly,
    readOnlyClassName,
    theme,
    disabled,
    disabledClassName,
    focusedClassName,
    className,
    childrenPosition
  } = props;
  const { focused } = state;

  return join(
    props.rootClassName,
    className,
    childrenPosition &&
      `${props.rootClassName}--children-position-${childrenPosition}`,
    rtl ? `${props.rootClassName}--rtl` : `${props.rootClassName}--ltr`,
    readOnly && join(`${props.rootClassName}--read-only`, readOnlyClassName),
    focused && join(`${props.rootClassName}--focused`, focusedClassName),
    disabled && join(`${props.rootClassName}--disabled`, disabledClassName),
    inlineBlock && `${props.rootClassName}--inline-block`,
    checked === true
      ? `${props.rootClassName}--checked`
      : checked === false
        ? `${props.rootClassName}--unchecked`
        : `${props.rootClassName}--indeterminate`,
    theme && `${props.rootClassName}--theme-${theme}`
  );
};

export default getClassNames;
