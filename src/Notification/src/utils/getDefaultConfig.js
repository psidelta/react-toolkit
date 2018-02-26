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
/**
 * Extracts props that are relevant for notification
 */
const getDefaultConfig = props => {
  const {
    stacking,
    clearOpacityOnMouseEnter,
    hideOnClick,
    delayAutoHideOnMouseOver,
    cancelAutoHideOnClick,
    nonBlocking,
    rtl,

    // subcomponents
    title,
    titleEllipsis,
    closeButton,
    pinButton,
    icon,
    content,

    // style
    theme,
    position,
    border,
    style,
    padding,
    height,
    width,
    minSize,
    maxSize,
    opacity,
    shadow,
    borderRadius,

    offset,
    push,
    autoHideDelay,
    moveTransition,
    showAnimation,
    hideAnimation,
    hideTransitionDuration,
    showTransitionDuration,
    background
  } = props;

  return {
    stacking,
    clearOpacityOnMouseEnter,
    hideOnClick,
    delayAutoHideOnMouseOver,
    cancelAutoHideOnClick,
    nonBlocking,
    rtl,

    // subcomponents
    title,
    titleEllipsis,
    closeButton,
    pinButton,
    icon,
    content,

    // style
    theme,
    position,
    border,
    style,
    padding,
    height,
    width,
    minSize,
    maxSize,
    opacity,
    shadow,
    borderRadius,

    offset,
    push,
    autoHideDelay,
    moveTransition,
    showAnimation,
    hideAnimation,
    hideTransitionDuration,
    showTransitionDuration,
    background,

    visible: false
  };
};

export default getDefaultConfig;
