"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
var getDefaultConfig = function getDefaultConfig(props) {
  var stacking = props.stacking,
      clearOpacityOnMouseEnter = props.clearOpacityOnMouseEnter,
      hideOnClick = props.hideOnClick,
      delayAutoHideOnMouseOver = props.delayAutoHideOnMouseOver,
      cancelAutoHideOnClick = props.cancelAutoHideOnClick,
      nonBlocking = props.nonBlocking,
      rtl = props.rtl,
      title = props.title,
      titleEllipsis = props.titleEllipsis,
      closeButton = props.closeButton,
      pinButton = props.pinButton,
      icon = props.icon,
      content = props.content,
      theme = props.theme,
      position = props.position,
      border = props.border,
      style = props.style,
      padding = props.padding,
      height = props.height,
      width = props.width,
      minSize = props.minSize,
      maxSize = props.maxSize,
      opacity = props.opacity,
      shadow = props.shadow,
      borderRadius = props.borderRadius,
      offset = props.offset,
      push = props.push,
      autoHideDelay = props.autoHideDelay,
      moveTransition = props.moveTransition,
      showAnimation = props.showAnimation,
      hideAnimation = props.hideAnimation,
      hideTransitionDuration = props.hideTransitionDuration,
      showTransitionDuration = props.showTransitionDuration,
      background = props.background;


  return {
    stacking: stacking,
    clearOpacityOnMouseEnter: clearOpacityOnMouseEnter,
    hideOnClick: hideOnClick,
    delayAutoHideOnMouseOver: delayAutoHideOnMouseOver,
    cancelAutoHideOnClick: cancelAutoHideOnClick,
    nonBlocking: nonBlocking,
    rtl: rtl,

    // subcomponents
    title: title,
    titleEllipsis: titleEllipsis,
    closeButton: closeButton,
    pinButton: pinButton,
    icon: icon,
    content: content,

    // style
    theme: theme,
    position: position,
    border: border,
    style: style,
    padding: padding,
    height: height,
    width: width,
    minSize: minSize,
    maxSize: maxSize,
    opacity: opacity,
    shadow: shadow,
    borderRadius: borderRadius,

    offset: offset,
    push: push,
    autoHideDelay: autoHideDelay,
    moveTransition: moveTransition,
    showAnimation: showAnimation,
    hideAnimation: hideAnimation,
    hideTransitionDuration: hideTransitionDuration,
    showTransitionDuration: showTransitionDuration,
    background: background,

    visible: false
  };
};

exports.default = getDefaultConfig;