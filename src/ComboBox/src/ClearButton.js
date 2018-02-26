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

import React from 'react';
import { CloseIcon } from './Icons';

const ClearButton = ({ onClear, className, closeIcon, size }) => {
  const closeIconProps = {
    className,
    size,
    onClick: event => {
      // don't lose focus
      event.preventDefault();
      event.stopPropagation();
      onClear();
    }
  };

  let closeIconEl;
  if (closeIcon && closeIcon !== true) {
    const closeIconParams = {
      onClear,
      domProps: closeIconProps
    };

    closeIconEl =
      typeof closeIcon === 'function' ? closeIcon(closeIconParams) : closeIcon;
  }

  if (closeIconEl === undefined) {
    closeIconEl = <CloseIcon {...closeIconProps} />;
  }

  return closeIconEl;
};

ClearButton.defaultProps = {
  size: 10
};

export default ClearButton;
