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

export default function getDeltaValueBasedOnKeyDownEvent(event, config) {
  let diff = null;
  const { key, shiftKey } = event;

  const {
    currentValue,
    step,
    largeStep,
    horizontal,
    isRevered,
    getValueModifier,
    endValue,
    startValue
  } = config;

  const computedStep = getValueModifier(event, config);

  switch (key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      diff = -computedStep;
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      diff = computedStep;
      break;
    case 'PageUp':
      diff = -largeStep;
      break;
    case 'PageDown':
      diff = largeStep;
      break;

    case 'End':
      diff = endValue;
      break;
    case 'Home':
      diff = -endValue;
      break;
  }

  if (diff !== null) {
    diff *= isRevered ? -1 : 1;
  }

  return diff;
}

const getValueModifier = (event, config) => {
  const { shiftKey } = event;
  const { largeStep, step } = config;
  return shiftKey ? largeStep : step;
};

export { getValueModifier };
