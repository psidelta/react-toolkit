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
import join from '../../../../common/join';

const getControllButtonProps = config => {
  const { disabled } = config;
  return {
    disabled
  };
};

const renderIncrementButton = domProps => <button {...domProps} />;
const renderDecrementButton = domProps => <button {...domProps} />;

const renderControlButtonsWrapper = (
  input,
  config,
  startIncrement,
  startDecrement,
  CLASS_NAME
) => {
  const {
    renderIncrementButton,
    renderDecrementButton,
    incrementButton,
    decrementButton
  } = config;

  const buttonConfig = getControllButtonProps(config);

  return [
    renderIncrementButton({
      ...buttonConfig,
      key: 'decrementButton',
      children: decrementButton,
      onMouseDown: startDecrement,
      className: join(
        `${CLASS_NAME}__control-button`,
        `${CLASS_NAME}__decrement-button`
      )
    }),

    <div key="inputWrapper" className={`${CLASS_NAME}__input-wrapper`}>
      {input}
    </div>,

    renderDecrementButton({
      ...buttonConfig,
      key: 'incrementButton',
      children: incrementButton,
      onMouseDown: startIncrement,
      className: join(
        `${CLASS_NAME}__control-button`,
        `${CLASS_NAME}__increment-button`
      )
    })
  ];
};

export {
  renderControlButtonsWrapper,
  renderIncrementButton,
  renderDecrementButton
};
