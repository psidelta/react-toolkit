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

var _isColorValid = require('./utils/isColorValid');

var _isColorValid2 = _interopRequireDefault(_isColorValid);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var TextInput = function TextInput(_ref) {
  var value = _ref.value,
      _onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ['value', 'onChange']);

  return _react2.default.createElement('input', _extends({}, rest, {
    type: 'text',
    value: value || '',
    onChange: function onChange(event) {
      return _onChange(event.target.value);
    }
  }));
};

var ZippyColorTextInput = function (_Component) {
  _inherits(ZippyColorTextInput, _Component);

  function ZippyColorTextInput(props) {
    _classCallCheck(this, ZippyColorTextInput);

    var _this = _possibleConstructorReturn(this, (ZippyColorTextInput.__proto__ || Object.getPrototypeOf(ZippyColorTextInput)).call(this, props));

    _this.state = {
      value: props.defaultValue,
      text: props.defaultText || props.value || props.defaultValue
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleTextChange = _this.handleTextChange.bind(_this);
    _this.handleInputBlur = _this.handleInputBlur.bind(_this);
    return _this;
  }

  _createClass(ZippyColorTextInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.handleTextChange(nextProps.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      var className = (0, _join2.default)(props.rootClassName, props.className, props.rootClassName + '--theme-' + props.theme, props.rtl && props.rootClassName + '--rtl');

      var colorPreviewPositionStart = props.colorPreviewPosition === 'start';

      return _react2.default.createElement(
        'div',
        _extends({}, (0, _cleanProps2.default)(props, ZippyColorTextInput.propTypes), { className: className }),
        colorPreviewPositionStart && this.renderColorPreview(),
        _react2.default.createElement(TextInput, this.getInputProps()),
        !colorPreviewPositionStart && this.renderColorPreview()
      );
    }
  }, {
    key: 'getInputProps',
    value: function getInputProps() {
      var props = this.props;


      return _extends({
        className: props.rootClassName + '__input',
        onChange: this.handleTextChange,
        value: this.getText(),
        style: props.inputStyle,
        onBlur: this.handleInputBlur
      }, props.inputProps);
    }
  }, {
    key: 'renderColorPreview',
    value: function renderColorPreview() {
      var props = this.props;
      var colorPreviewSize = props.colorPreviewSize,
          renderColorPreview = props.renderColorPreview;


      var sizeStyle = void 0;
      if (colorPreviewSize) {
        sizeStyle = typeof colorPreviewSize === 'number' ? { width: colorPreviewSize, height: colorPreviewSize } : colorPreviewSize;
      }

      var value = this.getValue();

      var domProps = _extends({
        className: props.rootClassName + '__color-preview'
      }, props.colorPreviewProps, {
        style: _extends({
          background: value
        }, sizeStyle, props.colorPreviewStyle)
      });

      var result = void 0;
      if (typeof renderColorPreview === 'function') {
        result = renderColorPreview({ domProps: domProps, value: value });
      }

      if (result === undefined) {
        result = _react2.default.createElement('div', domProps);
      }

      return result;
    }

    // events

  }, {
    key: 'handleChange',
    value: function handleChange(color) {
      if (!this.isValueControlled()) {
        this.setState({ value: color });
      }

      this.props.onChange(color);
    }
  }, {
    key: 'handleTextChange',
    value: function handleTextChange(text) {
      if (!this.isTextControlled()) {
        this.setState({ text: text });
      }

      this.props.onTextChange(text);

      // if is valid call handle change
      if ((0, _isColorValid2.default)(text)) {
        this.handleChange(text);
      }
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur() {
      // when input is blured it's text
      // should go back to value
      var value = this.getValue();
      var text = this.getText();
      if (value !== text) {
        this.handleTextChange(value);
      }
    }

    // methods

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.isValueControlled() ? this.props.value : this.state.value;
    }
  }, {
    key: 'isValueControlled',
    value: function isValueControlled() {
      return this.props.value != null;
    }
  }, {
    key: 'isTextControlled',
    value: function isTextControlled() {
      return this.props.text != null;
    }
  }, {
    key: 'getText',
    value: function getText() {
      return this.isTextControlled() ? this.props.text : this.state.text;
    }
  }]);

  return ZippyColorTextInput;
}(_react.Component);

function emptyFn() {}

ZippyColorTextInput.defaultProps = {
  theme: 'default',
  rootClassName: 'zippy-react-toolkit-color-text-input',
  onChange: emptyFn,
  onTextChange: emptyFn,
  colorPreviewSize: 12,
  colorPreviewPosition: 'start'
};

ZippyColorTextInput.propTypes = {
  rtl: _propTypes2.default.bool,
  theme: _propTypes2.default.string,
  rootClassName: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onTextChange: _propTypes2.default.func,
  value: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  text: _propTypes2.default.string,
  defaultText: _propTypes2.default.string,
  inputProps: _propTypes2.default.object,
  colorPreviewProps: _propTypes2.default.object,
  colorPreviewStyle: _propTypes2.default.object,
  renderColorPreview: _propTypes2.default.func,
  colorPreviewSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
    width: _propTypes2.default.number,
    height: _propTypes2.default.number
  })]),
  inputStyle: _propTypes2.default.object,
  colorPreviewPosition: _propTypes2.default.oneOf(['start', 'end'])
};

exports.default = ZippyColorTextInput;