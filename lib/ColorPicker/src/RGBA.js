'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _toStringValue = require('./utils/toStringValue');

var _toStringValue2 = _interopRequireDefault(_toStringValue);

var _color = require('./utils/color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
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

var NumberInput = function NumberInput(_ref) {
  var value = _ref.value,
      name = _ref.name,
      _onChange2 = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ['value', 'name', 'onChange']);

  return _react2.default.createElement('input', _extends({}, rest, {
    type: 'number',
    placeholder: name,
    value: value || '',
    onChange: function onChange(event) {
      return _onChange2(_defineProperty({}, name, parseFloat(event.target.value, 10)));
    }
  }));
};

var ZippyRGBA = function (_Component) {
  _inherits(ZippyRGBA, _Component);

  function ZippyRGBA(props) {
    _classCallCheck(this, ZippyRGBA);

    var _this = _possibleConstructorReturn(this, (ZippyRGBA.__proto__ || Object.getPrototypeOf(ZippyRGBA)).call(this, props));

    _this.state = {};

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(ZippyRGBA, [{
    key: 'render',
    value: function render() {
      var props = this.props;


      var className = (0, _join2.default)(props.rootClassName, props.className);

      var _getValue = this.getValue(),
          r = _getValue.r,
          g = _getValue.g,
          b = _getValue.b,
          a = _getValue.a;

      return _react2.default.createElement(
        'div',
        _extends({}, (0, _cleanProps2.default)(props, ZippyRGBA.propTypes), { className: className }),
        _react2.default.createElement(NumberInput, {
          min: 0,
          max: 255,
          className: props.rootClassName + '__input ' + props.rootClassName + '__input--r',
          name: 'r',
          value: r,
          onChange: this.onChange
        }),
        _react2.default.createElement(NumberInput, {
          min: 0,
          max: 255,
          name: 'g',
          value: g,
          className: props.rootClassName + '__input ' + props.rootClassName + '__input--g',
          onChange: this.onChange
        }),
        _react2.default.createElement(NumberInput, {
          min: 0,
          max: 255,
          name: 'b',
          value: b,
          className: props.rootClassName + '__input ' + props.rootClassName + '__input--b',
          onChange: this.onChange
        }),
        _react2.default.createElement(NumberInput
        // min={0}
        // max={1}
        , { name: 'a',
          value: a,
          className: props.rootClassName + '__input ' + props.rootClassName + '__input--a',
          onChange: this.onChange
        })
      );
    }
  }, {
    key: 'onChange',
    value: function onChange(config) {
      var newValue = _extends({}, this.getValue(), config);

      this.setState({
        value: newValue
      });

      var hsvColor = (0, _color.toHsv)(newValue);
      var stringValue = (0, _toStringValue2.default)(newValue);

      this.props.onChange(stringValue, hsvColor);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (!this.props.value) {
        this.setState({ value: value });
      }

      this.onChange(value);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var value = this.props.value || this.state.value;
      var color = (0, _color.toRgb)(value);

      return color;
    }
  }]);

  return ZippyRGBA;
}(_react.Component);

function emptyFn() {}

ZippyRGBA.defaultProps = {
  rootClassName: 'zippy-react-toolkit-color-picker__rgba',
  onChange: emptyFn
};

ZippyRGBA.propTypes = _defineProperty({
  value: _propTypes2.default.shape({
    r: _propTypes2.default.number,
    g: _propTypes2.default.number,
    b: _propTypes2.default.number,
    a: _propTypes2.default.number
  }),
  defaultValue: _propTypes2.default.shape({
    r: _propTypes2.default.number,
    g: _propTypes2.default.number,
    b: _propTypes2.default.number,
    a: _propTypes2.default.number
  }),
  onChange: _propTypes2.default.func,
  rootClassName: _propTypes2.default.string
}, 'onChange', _propTypes2.default.func);

exports.default = ZippyRGBA;