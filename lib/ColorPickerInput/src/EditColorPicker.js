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

var _ColorPicker = require('../../ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _Button = require('../../Button');

var _Button2 = _interopRequireDefault(_Button);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

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

/**
 * A ColorPicker with two buttons, on and cancel.
 */


var ZippyEditColorPicker = function (_Component) {
  _inherits(ZippyEditColorPicker, _Component);

  function ZippyEditColorPicker(props) {
    _classCallCheck(this, ZippyEditColorPicker);

    var _this = _possibleConstructorReturn(this, (ZippyEditColorPicker.__proto__ || Object.getPrototypeOf(ZippyEditColorPicker)).call(this, props));

    _this.state = {
      value: props.defaultValue
    };

    _this.handleOkClick = _this.handleOkClick.bind(_this);
    _this.handleColorChange = _this.handleColorChange.bind(_this);
    return _this;
  }

  _createClass(ZippyEditColorPicker, [{
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state;

      var className = (0, _join2.default)(props.rootClassName, props.className, props.rootClassName + '--theme-' + props.theme);

      return _react2.default.createElement(
        'div',
        _extends({}, (0, _cleanProps2.default)(props, ZippyEditColorPicker.propTypes), { className: className }),
        _react2.default.createElement(_ColorPicker2.default, _extends({}, props.colorPickerProps, {
          value: state.objectValue,
          defaultValue: props.defaultValue,
          onChange: this.handleColorChange
        })),
        this.renderOkButton(),
        this.renderCancelButton()
      );
    }
  }, {
    key: 'renderOkButton',
    value: function renderOkButton() {
      var props = this.props;

      var buttonProps = {
        onClick: this.handleOkClick,
        children: 'ok'
      };

      var result = void 0;
      if (typeof props.renderOkButton === 'function') {
        result = props.renderOkButton({
          buttonProps: buttonProps,
          onClick: this.handleOkClick
        });
      }

      if (result === undefined) {
        result = _react2.default.createElement(_Button2.default, buttonProps);
      }

      return result;
    }
  }, {
    key: 'renderCancelButton',
    value: function renderCancelButton() {
      var props = this.props;

      var buttonProps = {
        onClick: this.handleCancelClick,
        children: 'cancel'
      };

      var result = void 0;
      if (typeof props.renderCancelButton === 'function') {
        result = props.renderCancelButton({
          buttonProps: buttonProps,
          onClick: this.handleCancelClick
        });
      }

      if (result === undefined) {
        result = _react2.default.createElement(_Button2.default, buttonProps);
      }

      return result;
    }
  }, {
    key: 'handleOkClick',
    value: function handleOkClick() {
      this.props.onChange(this.state.value);
    }
  }, {
    key: 'handleColorChange',
    value: function handleColorChange(stringColor, color) {
      this.setState({
        value: stringColor,
        objectValue: color
      });
    }
  }]);

  return ZippyEditColorPicker;
}(_react.Component);

function emptyFn() {}

ZippyEditColorPicker.defaultProps = {
  rootClassName: 'zippy-react-toolkit-edit-color-picker',
  onChange: emptyFn,
  onDismiss: emptyFn
};

ZippyEditColorPicker.propTypes = {
  rootClassName: _propTypes2.default.string,
  value: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  renderOkButton: _propTypes2.default.func,
  renderCancelButton: _propTypes2.default.func,
  colorPickerProps: _propTypes2.default.object
};

exports.default = ZippyEditColorPicker;