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

const getClassNames = (props, state, CLASS_NAME) => {
  const {
    className,
    theme,
    orientation,
    rtl,
    showButtons,
    tickBarPosition
  } = props;
  const { focused } = state;

  return join(
    CLASS_NAME,
    className,
    `${CLASS_NAME}--${orientation}-orientation`,
    tickBarPosition === `${tickBarPosition}`
      ? `${CLASS_NAME}--tick-bar-${orientation}-${tickBarPosition}`
      : '',
    `${CLASS_NAME}--theme-${theme}`,
    focused && `${CLASS_NAME}--focused`,
    rtl && `${CLASS_NAME}--rtl`,
    showButtons && `${CLASS_NAME}--with-buttons`
  );
};

export default getClassNames;
