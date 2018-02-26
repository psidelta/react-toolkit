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

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

var _SaturationSpectrum = require('./SaturationSpectrum');

var _SaturationSpectrum2 = _interopRequireDefault(_SaturationSpectrum);

var _SlideSpectrum = require('./SlideSpectrum');

var _SlideSpectrum2 = _interopRequireDefault(_SlideSpectrum);

var _RGBA = require('./RGBA');

var _RGBA2 = _interopRequireDefault(_RGBA);

var _color = require('./utils/color');

var _toStringValue2 = require('./utils/toStringValue');

var _toStringValue3 = _interopRequireDefault(_toStringValue2);

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

var ZippyColorPicker = function (_Component) {
  _inherits(ZippyColorPicker, _Component);

  function ZippyColorPicker(props) {
    _classCallCheck(this, ZippyColorPicker);

    var _this = _possibleConstructorReturn(this, (ZippyColorPicker.__proto__ || Object.getPrototypeOf(ZippyColorPicker)).call(this, props));

    (0, _reactClass.autoBind)(_this);

    var value = _this.toColorValue(props.value || _this.props.defaultValue);
    _this.state = { value: value };
    return _this;
  }

  _createClass(ZippyColorPicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.value !== nextProps.value) {
        this.setState({
          value: this.normalizeValue(nextProps.value)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var className = (0, _join2.default)(props.className, props.rootClassName);
      var defaultProps = this.getPropsFromChildren();

      return _react2.default.createElement(
        'div',
        _extends({}, (0, _cleanProps2.default)(props, ZippyColorPicker.propTypes), {
          className: className
        }),
        _react2.default.createElement(_SaturationSpectrum2.default, _extends({
          inPicker: true
        }, this.getSaturationProps(defaultProps.spectrum))),
        _react2.default.createElement(_SlideSpectrum2.default, _extends({ type: 'hue' }, this.getHueProps(defaultProps.hue))),
        _react2.default.createElement(_SlideSpectrum2.default, _extends({
          type: 'alpha'
        }, this.getAlphaProps(defaultProps.alpha))),
        _react2.default.createElement(_RGBA2.default, this.getRGBAProps())
      );
    }
  }, {
    key: 'getRGBAProps',
    value: function getRGBAProps() {
      return _extends({}, this.getCommonProps(), {
        rootClassName: this.props.rootClassName + '__rgba'
      });
    }
  }, {
    key: 'getAlphaProps',
    value: function getAlphaProps(defaultProps) {
      var props = this.props;

      var style = _extends({}, props.alphaStyle);

      return _extends({}, defaultProps, this.getCommonProps(), {
        style: style,
        height: props.alphaHeight,
        width: props.alphaWidth,
        rootClassName: props.rootClassName + '__slider'
      });
    }
  }, {
    key: 'getHueProps',
    value: function getHueProps(defaultProps) {
      var props = this.props;


      var style = _extends({}, props.hueStyle, {
        marginLeft: this.props.hueMargin
      });

      return _extends({}, defaultProps, props.hueProps, this.getCommonProps(), {
        height: props.hueHeight,
        width: props.hueWidth,
        style: style,
        rootClassName: props.rootClassName + '__slider'
      });
    }
  }, {
    key: 'getSaturationProps',
    value: function getSaturationProps(defaultProps) {
      var _this2 = this;

      var commonProps = this.getCommonProps();
      commonProps.onDrag = function (color) {
        var stringValue = _this2.toStringValue(color);
        _this2.handleDrag(stringValue, color);
      };
      commonProps.onChange = function (value) {
        _this2.handleChange(null, value);
      };
      var props = this.props;

      var saturationProps = _extends({}, defaultProps, commonProps, {
        width: props.saturationWidth,
        height: props.saturationHeight
      });

      return saturationProps;
    }
  }, {
    key: 'getCommonProps',
    value: function getCommonProps() {
      return {
        onDrag: this.handleDrag,
        onChange: this.handleChange,
        value: this.getValue()
      };
    }
  }, {
    key: 'isValueControlled',
    value: function isValueControlled() {
      return this.props.value != null;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var isValueControlled = this.props.value != null;
      var value = void 0;

      if (isValueControlled) {
        value = this.state.isDragging ? this.state.value : this.props.value;
      } else {
        value = this.state.value;
      }

      var color = this.normalizeValue(this.toColorValue(value));

      return color;
    }
  }, {
    key: 'getPropsFromChildren',
    value: function getPropsFromChildren() {
      var props = this.props;
      var children = props.children;

      var hueSpectrumProps = null;
      var saturationSpectrumProps = null;
      var alphaSpectrumProps = null;

      if (children) {
        _react2.default.Children.toArray(children).forEach(function (child) {
          if (child && child.props) {
            if (child.props.type && child.props.type === 'hue') {
              hueSpectrumProps = (0, _assign2.default)({}, child.props);
            }
            if (child.props.isSaturationSpectrum) {
              saturationSpectrumProps = (0, _assign2.default)({}, child.props);
            }
            if (child.props.type && child.props.type === 'alpha') {
              alphaSpectrumProps = (0, _assign2.default)({}, child.props);
            }
          }
        });
      }

      return {
        hue: hueSpectrumProps,
        saturation: saturationSpectrumProps,
        alpha: alphaSpectrumProps
      };
    }
  }, {
    key: 'toColorValue',
    value: function toColorValue(value) {
      return typeof value == 'string' ? (0, _color.toHsv)(value) : value;
    }
  }, {
    key: 'toStringValue',
    value: function toStringValue() {
      return _toStringValue3.default.apply(undefined, arguments);
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(stringValue, color) {
      stringValue = stringValue || this.toStringValue(color);

      this.setState({
        value: color,
        isDragging: true
      });

      this.props.onDrag(stringValue, color);
    }
  }, {
    key: 'normalizeValue',
    value: function normalizeValue(value) {
      var newValue = this.toColorValue(value);
      if (newValue && newValue.a == null) {
        newValue.a = 1;
      }

      return newValue;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(stringValue, value) {
      stringValue = stringValue || this.toStringValue(value);
      this.setState({ isDragging: false });
      this.props.onChange(stringValue, value);
    }
  }]);

  return ZippyColorPicker;
}(_react.Component);

var emptyFn = function emptyFn() {};

ZippyColorPicker.defaultProps = {
  rootClassName: 'zippy-react-toolkit-color-picker',
  onDrag: emptyFn,
  onChange: emptyFn,

  defaultValue: 'red',

  hueHeight: 300,
  hueMargin: 10,
  hueWidth: 30,

  saturationWidth: 300,
  saturationHeight: 300,

  alphaHeight: 300,
  alphaWidth: 30
};

ZippyColorPicker.propTypes = {
  rootClassName: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  hueStyle: _propTypes2.default.object,
  hueHeight: _propTypes2.default.number,
  hueMargin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  hueWidth: _propTypes2.default.number,
  saturationHeight: _propTypes2.default.number,
  saturationWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  onChange: _propTypes2.default.func,
  alphaStyle: _propTypes2.default.object,
  alphaHeight: _propTypes2.default.number,
  alphaWidth: _propTypes2.default.number
};

exports.default = ZippyColorPicker;