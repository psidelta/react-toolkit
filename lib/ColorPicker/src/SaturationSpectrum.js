'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _assign = require('../../common/assign');

var _assign2 = _interopRequireDefault(_assign);

var _reactClass = require('@zippytech/react-class');

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _color = require('./utils/color');

var _common = require('./utils/common');

var _common2 = _interopRequireDefault(_common);

var _validate = require('./utils/validate');

var _validate2 = _interopRequireDefault(_validate);

var _toStringValue = require('./utils/toStringValue');

var _toStringValue2 = _interopRequireDefault(_toStringValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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

var ZippySaturationSpectrum = function (_Component) {
  _inherits(ZippySaturationSpectrum, _Component);

  function ZippySaturationSpectrum(props) {
    _classCallCheck(this, ZippySaturationSpectrum);

    var _this = _possibleConstructorReturn(this, (ZippySaturationSpectrum.__proto__ || Object.getPrototypeOf(ZippySaturationSpectrum)).call(this, props));

    (0, _reactClass.autoBind)(_this);

    _this.state = {
      pointerTop: null,
      pointerLeft: null
    };

    _this.setRootRef = function (ref) {
      _this.rootNode = ref;
    };
    return _this;
  }

  _createClass(ZippySaturationSpectrum, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.isComponentMounted = true;
      this.updateDragPositionIf();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.isComponentMounted = false;
    }
  }, {
    key: 'updateDragPositionIf',
    value: function updateDragPositionIf() {
      if (!this.props.height || !this.props.width) {
        this.setState({});
      }
    }
  }, {
    key: 'getDragPosition',
    value: function getDragPosition(hsv) {
      hsv = hsv || this.hsv;

      // let width = this.props.width
      // let height = this.props.height
      var sizeDefined = width && height;

      if (!sizeDefined && !this.isComponentMounted) {
        return null;
      }

      /**
       * always read from the dom even if the width is set,
       * the parent might have display: flex and have a different width
       */
      // if (!sizeDefined) {
      var height = this.rootNode && this.rootNode.offsetHeight;
      var width = this.rootNode && this.rootNode.offsetWidth;
      // }

      var x = hsv.s * width;
      var y = height - hsv.v * height;
      var size = this.props.pointerSize;
      var diff = Math.floor(size / 2);

      if (this.props.value && this.state.mouseDown && !isNaN(this.state.mouseDown.x)) {
        x = this.state.mouseDown.x;
      }

      var position = {
        left: x - diff,
        top: y - diff
      };

      return position;
    }
  }, {
    key: 'prepareBackgroundColor',
    value: function prepareBackgroundColor(color) {
      var hsv = color;
      var col = (0, _color.fromRatio)({
        h: hsv.h % 360 / 360,
        s: 1,
        v: 1
      });

      return col.toRgbString();
    }
  }, {
    key: 'prepareProps',
    value: function prepareProps(thisProps, state) {
      var props = (0, _assign2.default)({}, thisProps);
      var color = state.value || props.value || props.defaultValue || props.defaultColor;
      props.color = color;
      this.hsv = this.toColorValue(color);
      props.style = this.prepareStyle(props);
      props.className = this.prepareClassName(props);

      return props;
    }
  }, {
    key: 'prepareClassName',
    value: function prepareClassName(props) {
      var className = props.className || '';
      className += ' react-color-picker__saturation-spectrum';
      return className;
    }
  }, {
    key: 'prepareStyle',
    value: function prepareStyle(props) {
      var style = (0, _assign2.default)({}, props.style);
      if (props.height) {
        style.height = props.height;
      }

      if (props.width) {
        style.width = props.width;
      }

      style.backgroundColor = this.prepareBackgroundColor(this.hsv);

      return style;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.p = this.prepareProps(this.props, this.state);
      var dragStyle = {
        width: this.props.pointerSize,
        height: this.props.pointerSize
      };

      var dragPos = this.getDragPosition();
      if (dragPos) {
        dragStyle.top = dragPos.top;
        dragStyle.left = dragPos.left;
        dragStyle.display = 'block';
      }

      return _react2.default.createElement(
        'div',
        _extends({}, (0, _cleanProps2.default)(props, ZippySaturationSpectrum.propTypes), {
          className: props.className,
          style: props.style,
          onMouseDown: this.onMouseDown,
          ref: this.setRootRef,
          value: null,
          color: null
        }),
        _react2.default.createElement(
          'div',
          { className: props.rootClassName + '__saturation-white' },
          _react2.default.createElement('div', { className: props.rootClassName + '__saturation-black' })
        ),
        _react2.default.createElement(
          'div',
          {
            className: props.rootClassName + '__saturation-drag',
            style: dragStyle
          },
          _react2.default.createElement('div', { className: props.rootClassName + '__saturation-inner' })
        )
      );
    }
  }, {
    key: 'getSaturationForPoint',
    value: function getSaturationForPoint(point) {
      return point.x / point.width;
    }
  }, {
    key: 'getColorValueForPoint',
    value: function getColorValueForPoint(point) {
      return (point.height - point.y) / point.height;
    }
  }, {
    key: 'updateColor',
    value: function updateColor(point) {
      point = (0, _validate2.default)(point);
      this.hsv.s = this.getSaturationForPoint(point);
      this.hsv.v = this.getColorValueForPoint(point);
    }
  }]);

  return ZippySaturationSpectrum;
}(_react.Component);

(0, _assign2.default)(ZippySaturationSpectrum.prototype, { toStringValue: _toStringValue2.default }, _common2.default);

ZippySaturationSpectrum.defaultProps = {
  height: 300,
  width: 300,
  pointerSize: 7,
  defaultColor: 'red',
  isSaturationSpectrum: true,
  rootClassName: 'zippy-react-toolkit-color-picker'
};

ZippySaturationSpectrum.propTypes = {
  pointerSize: _propTypes2.default.number,
  defaultColor: _propTypes2.default.string,
  isSaturationSpectrum: _propTypes2.default.bool,
  inPicker: _propTypes2.default.bool,
  rootClassName: _propTypes2.default.string
};

exports.default = ZippySaturationSpectrum;