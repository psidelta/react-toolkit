'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldShowTooltip = exports.renderTooltipContent = exports.renderTooltip = exports.renderHandleContent = exports.getHandleStyle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _valueUtils = require('../value-utils');

var _join = require('../../../../common/join');

var _join2 = _interopRequireDefault(_join);

var _eventNames = require('../../../../common/eventNames');

var _eventNames2 = _interopRequireDefault(_eventNames);

var _SlideTooltip = require('../../SlideTooltip');

var _SlideTooltip2 = _interopRequireDefault(_SlideTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHandleClassNames = function getHandleClassNames(config, extras, CLASS_NAME) {
  var HANDLE_CLASS_NAME = CLASS_NAME + '__handle';
  var dragging = config.dragging;
  var focused = extras.focused;


  return (0, _join2.default)(HANDLE_CLASS_NAME, dragging && HANDLE_CLASS_NAME + '--active', focused && HANDLE_CLASS_NAME + '--focused');
};

var shouldShowTooltip = function shouldShowTooltip(props, state) {
  var focused = state.focused,
      dragging = state.dragging,
      mouseOver = state.mouseOver;
  var tooltipVisibility = props.tooltipVisibility;

  if (tooltipVisibility === 'never') {
    return false;
  }

  if (tooltipVisibility === 'always') {
    return true;
  }

  return focused || dragging || mouseOver;
};

var getPositionStyleForTooltip = function getPositionStyleForTooltip(config) {
  var horizontal = config.horizontal;

  if (horizontal) {
    return { marginLeft: config.handleSize.width / 2 };
  }

  return { marginTop: config.handleSize.height / 2 };
};

var renderTooltip = function renderTooltip(config, extraProps, CLASS_NAME) {
  var renderTooltipContent = config.renderTooltipContent,
      orientation = config.orientation,
      tooltipPosition = config.tooltipPosition;

  var tooltipValue = _typeof(extraProps.handleValue) ? extraProps.handleValue : config.currentValue;

  return _react2.default.createElement(
    _SlideTooltip2.default,
    {
      style: getPositionStyleForTooltip(config),
      visible: !!extraProps.visibleTooltip,
      position: tooltipPosition,
      orientation: orientation
    },
    renderTooltipContent({ children: tooltipValue }, { tooltipValue: tooltipValue })
  );
};

var renderHandle = function renderHandle(config, extraProps, CLASS_NAME) {
  var value = config.currentValue,
      handleSize = config.handleSize,
      horizontal = config.horizontal,
      orientation = config.orientation,
      dragging = config.dragging,
      renderHandleContent = config.renderHandleContent,
      renderTooltip = config.renderTooltip;
  var setHandleRef = extraProps.setHandleRef,
      onMouseDown = extraProps.onMouseDown,
      onMouseLeave = extraProps.onMouseLeave,
      onMouseEnter = extraProps.onMouseEnter,
      offset = extraProps.offset,
      key = extraProps.key,
      tabIndex = extraProps.tabIndex,
      focused = extraProps.focused,
      tooltipVisibility = extraProps.tooltipVisibility;


  var handleStyle = _extends({}, config.handleStyle);
  // todo, what does this do?
  handleSize.width = handleStyle.width;
  handleSize.height = handleStyle.height;

  var finalOffset = (typeof offset !== 'undefined' ? offset : (0, _valueUtils.getPossitionOfValueBasedOnLimits)(value, config) * 100) + '%';

  if (horizontal) {
    handleStyle.left = finalOffset;
    handleStyle.marginLeft = -handleSize.width / 2;
    handleStyle.marginTop = handleStyle.marginBottom = 'auto';
    handleStyle.left = finalOffset;
  } else {
    handleStyle.top = finalOffset;
    handleStyle.marginTop = -handleSize.height / 2;
    handleStyle.marginLeft = handleStyle.marginRight = 'auto';
    handleStyle.top = finalOffset;
  }

  var handleProps = {
    key: key,
    className: getHandleClassNames(config, { focused: focused }, CLASS_NAME),
    'data-value': value,
    orientation: orientation,
    value: value,
    style: handleStyle,
    ref: setHandleRef,
    onMouseLeave: onMouseLeave,
    onMouseEnter: onMouseEnter,
    tabIndex: tabIndex,
    children: tooltipVisibility !== 'never' && renderTooltip(config, extraProps, CLASS_NAME)
  };

  var customProps = {
    dragging: dragging,
    value: value,
    focused: focused
  };

  // handleProps.onMouseDown = onMouseDown;
  handleProps[_eventNames2.default.onMouseDown] = onMouseDown;

  return renderHandleContent(handleProps, customProps);
};

var getHandleStyle = function getHandleStyle(handleSize, props, state) {
  var handleStyle = props.handleStyle;


  if (handleStyle) {
    return _extends({}, handleStyle, handleSize);
  }

  return _extends({}, handleSize);
};

var renderTooltipContent = function renderTooltipContent(props) {
  return _react2.default.createElement('div', props);
};
var renderHandleContent = function renderHandleContent(props) {
  return _react2.default.createElement('div', props);
};

exports.default = renderHandle;
exports.getHandleStyle = getHandleStyle;
exports.renderHandleContent = renderHandleContent;
exports.renderTooltip = renderTooltip;
exports.renderTooltipContent = renderTooltipContent;
exports.shouldShowTooltip = shouldShowTooltip;