'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
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

var _reactDom = require('react-dom');

var _region = require('@zippytech/region');

var _region2 = _interopRequireDefault(_region);

var _dragHelper = require('@zippytech/drag-helper');

var _dragHelper2 = _interopRequireDefault(_dragHelper);

var _toColorValue = require('./toColorValue');

var _toColorValue2 = _interopRequireDefault(_toColorValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyFn = function emptyFn() {};

exports.default = {
  toColorValue: _toColorValue2.default,

  getDOMRegion: function getDOMRegion() {
    return _region2.default.fromDOM((0, _reactDom.findDOMNode)(this));
  },
  onMouseDown: function onMouseDown(event) {
    event.preventDefault();

    var region = this.getDOMRegion();
    var info = this.getEventInfo(event, region);

    (0, _dragHelper2.default)(event, {
      scope: this,
      constrainTo: region,
      onDragStart: function onDragStart(event, config) {
        config.initialPoint = info;

        config.minLeft = 0;
        config.maxLeft = region.width;

        this.handleDragStart(event);
      },
      onDrag: function onDrag(event, config) {
        var info = this.getEventInfo(event, region);
        this.updateColor(info);
        this.handleDrag(event, config);
      },
      onDrop: function onDrop(event, config) {
        var info = this.getEventInfo(event, region);
        this.updateColor(info);
        this.handleDrop(event, config);
      }
    });

    this.updateColor(info);
    this.handleMouseDown(event, { initialPoint: info });
  },
  handleMouseDown: function handleMouseDown(event, config) {
    (this.props.onMouseDown || emptyFn).apply(this, this.getColors());
    this.handleDrag(event, config);
  },
  handleUpdate: function handleUpdate(event, config) {
    var diff = config.diff || { top: 0, left: 0 };
    var initialPoint = config.initialPoint;

    if (initialPoint) {
      var top = void 0;
      var left = void 0;

      left = initialPoint.x + diff.left;
      top = initialPoint.y + diff.top;

      left = Math.max(left, config.minLeft);
      left = Math.min(left, config.maxLeft);

      this.state.top = top;
      this.state.left = left;

      this.state.mouseDown = {
        x: left,
        y: top,
        width: initialPoint.width,
        height: initialPoint.height
      };
    }

    if (this.props.inPicker) {
      // the picker handles the values
      return;
    }

    if (!this.props.value) {
      this.setState({
        value: this.hsv
      });
    }
  },
  handleDragStart: function handleDragStart() {},
  handleDrag: function handleDrag(event, config) {
    this.handleUpdate(event, config);
    (this.props.onDrag || emptyFn).apply(this, this.getColors());
  },
  handleDrop: function handleDrop(event, config) {
    this.handleUpdate(event, config);
    this.state.mouseDown = false;
    (this.props.onChange || emptyFn).apply(this, this.getColors());
  },
  getColors: function getColors() {
    var first = this.props.inPicker ? this.hsv : this.toStringValue(this.hsv);

    var args = [first];

    if (!this.props.inPicker) {
      args.push(_extends({}, this.hsv));
    }

    return args;
  },
  getEventInfo: function getEventInfo(event, region) {
    region = region || this.getDOMRegion();

    var x = event.clientX - region.left;
    var y = event.clientY - region.top;

    return {
      x: x,
      y: y,
      width: region.getWidth(),
      height: region.getHeight()
    };
  }
};