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

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

var _Slider = require('../../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _color = require('./utils/color');

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

var ZippyAlphaSpectrum = function (_Component) {
  _inherits(ZippyAlphaSpectrum, _Component);

  function ZippyAlphaSpectrum(props) {
    _classCallCheck(this, ZippyAlphaSpectrum);

    var _this = _possibleConstructorReturn(this, (ZippyAlphaSpectrum.__proto__ || Object.getPrototypeOf(ZippyAlphaSpectrum)).call(this, props));

    _this.state = {
      value: props.defaultValue
    };

    _this.handleOnDrag = _this.handleOnDrag.bind(_this);
    _this.renderHandleContent = _this.renderHandleContent.bind(_this);
    _this.handleOnChange = _this.handleOnChange.bind(_this);
    return _this;
  }

  _createClass(ZippyAlphaSpectrum, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var type = props.type;


      var isAlpha = this.isAlpha();
      var style = isAlpha ? this.getAlphaStyle() : this.getHueStyle();

      if (props.width) {
        style.width = props.width;
      }

      if (props.height) {
        style.height = props.height;
      }

      var className = (0, _join2.default)(props.className, props.rootClassName, props.rootClassName + '--' + type, props.rootClassName + '__slider');

      var value = isAlpha ? this.getAlphaValue() : this.getHueValue();

      var startEndValue = void 0;
      if (isAlpha) {
        startEndValue = {
          startValue: 1000,
          endValue: 0,
          step: 1
        };
      } else {
        startEndValue = {
          startValue: 0,
          endValue: 360,
          step: 1
        };
      }

      return _react2.default.createElement(_Slider2.default, _extends({}, (0, _cleanProps2.default)(props, ZippyAlphaSpectrum.propTypes), startEndValue, {
        className: className,
        updateValueOnTrackDrag: true,
        style: style,
        handleSize: { height: 3 },
        tooltipVisibility: 'never',
        tickBarPosition: 'none',
        orientation: 'vertical'
        // rootClassName={props.rootClassName}
        , value: value,
        onChange: this.handleOnDrag,
        onDragEnd: this.handleOnChange,
        renderHandleContent: this.renderHandleContent
      }));
    }
  }, {
    key: 'renderHandleContent',
    value: function renderHandleContent(domProps) {
      return _react2.default.createElement('div', _extends({}, domProps, {
        style: _extends({}, domProps.style, {
          left: 0,
          right: 0,
          width: '100%'
        }),
        children: null,
        className: this.props.rootClassName + '__handle'
      }));
    }
  }, {
    key: 'isAlpha',
    value: function isAlpha() {
      return this.props.type === 'alpha';
    }
  }, {
    key: 'getAlphaStyle',
    value: function getAlphaStyle() {
      var props = this.props;

      var colorString = (0, _toStringValue2.default)(_extends({}, this.getValue(), { a: 1 }));
      return _extends({}, props.style, {
        background: 'linear-gradient(to top, #fff, ' + colorString + ')'
      });
    }
  }, {
    key: 'getHueStyle',
    value: function getHueStyle() {
      var props = this.props;


      return _extends({}, props.style);
    }
  }, {
    key: 'handleOnDrag',
    value: function handleOnDrag(value) {
      var newColor = this.isAlpha() ? this.changeColorAlpha(value) : this.changeColorHue(value);

      this.setValue(newColor);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (!this.isValueControlled()) {
        this.setState({ value: value });
      }

      var stringValue = (0, _toStringValue2.default)(value);
      this.props.onDrag(stringValue, value);
    }
  }, {
    key: 'handleOnChange',
    value: function handleOnChange() {
      var value = this.getValue();
      var stringValue = (0, _toStringValue2.default)(value);

      this.props.onChange(stringValue, value);
    }
  }, {
    key: 'isValueControlled',
    value: function isValueControlled() {
      return this.props.value != null;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var value = this.isValueControlled() ? this.props.value : this.state.value;
      var hslValue = (0, _color.toColorValue)(value);

      return hslValue;
    }
  }, {
    key: 'changeColorAlpha',
    value: function changeColorAlpha(value) {
      var newA = typeof value === 'number' ? parseFloat((value / 1000).toFixed(2)) : null;

      return _extends({}, this.getValue(), {
        a: newA
      });
    }
  }, {
    key: 'changeColorHue',
    value: function changeColorHue(value) {
      if (value == null) {
        return null;
      }

      value = value > 360 ? 360 : value;

      return _extends({}, this.getValue(), {
        h: value
      });
    }
  }, {
    key: 'getAlphaValue',
    value: function getAlphaValue() {
      var value = this.getValue();
      return value && value.a * 1000;
    }
  }, {
    key: 'getHueValue',
    value: function getHueValue() {
      var value = this.getValue();
      return value && value.h;
    }
  }]);

  return ZippyAlphaSpectrum;
}(_react.Component);

function emptyFn() {}

ZippyAlphaSpectrum.defaultProps = {
  value: null,
  defaultValue: 1,
  onChange: emptyFn,
  onDrag: emptyFn,
  rootClassName: 'zippy-react-toolkit-color-picker__slider'
};

ZippyAlphaSpectrum.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object]),
  defaultValue: _propTypes2.default.number,
  rootClassName: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onDrag: _propTypes2.default.func,
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

exports.default = ZippyAlphaSpectrum;