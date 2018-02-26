'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _ColorPalette = require('../../ColorPalette');

var _ColorPalette2 = _interopRequireDefault(_ColorPalette);

var _Button = require('../../Button');

var _Button2 = _interopRequireDefault(_Button);

var _EditColorPicker = require('./EditColorPicker');

var _EditColorPicker2 = _interopRequireDefault(_EditColorPicker);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

var _normalizePalette = require('./utils/normalizePalette');

var _normalizePalette2 = _interopRequireDefault(_normalizePalette);

var _addColor = require('./utils/addColor');

var _addColor2 = _interopRequireDefault(_addColor);

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

var ZippyCustomColorPalette = function (_Component) {
  _inherits(ZippyCustomColorPalette, _Component);

  function ZippyCustomColorPalette(props) {
    _classCallCheck(this, ZippyCustomColorPalette);

    var _this = _possibleConstructorReturn(this, (ZippyCustomColorPalette.__proto__ || Object.getPrototypeOf(ZippyCustomColorPalette)).call(this, props));

    _this.state = {};

    _this.handleButtonClick = _this.handleButtonClick.bind(_this);
    _this.handleItemClick = _this.handleItemClick.bind(_this);
    _this.handleColorPick = _this.handleColorPick.bind(_this);
    _this.handleColorPickDismiss = _this.handleColorPickDismiss.bind(_this);
    return _this;
  }

  _createClass(ZippyCustomColorPalette, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.newColorRequestResolve = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;


      var className = (0, _join2.default)(props.rootClassName, props.className, props.rtl && props.rootClassName + '--rtl', props.rootClassName + '--theme-' + props.theme);

      return _react2.default.createElement(
        'div',
        (0, _cleanProps2.default)(props, ZippyCustomColorPalette.propTypes),
        !props.showColoPicker && this.renderButton(),
        !props.showColoPicker && this.renderColorPalette(),
        props.showColoPicker && this.renderColorPicker()
      );
    }
  }, {
    key: 'renderColorPicker',
    value: function renderColorPicker() {
      var props = this.props;


      var colorPickerProps = {
        defaultValue: props.value,
        onChange: this.handleColorPick,
        onDismiss: this.handleColorPickDismiss,
        renderOkButton: props.renderOkButton,
        renderCancelButton: props.renderCancelButton,
        colorPickerProps: props.colorPickerProps
      };

      // renderColorPicker

      var result = void 0;
      if (typeof props.renderColorPicker === 'function') {
        result = props.renderColorPicker({
          colorPickerProps: colorPickerProps,
          onDismiss: this.handleColorPickDismiss,
          onChange: this.handleColorPick
        });
      }

      if (result === undefined) {
        result = _react2.default.createElement(_EditColorPicker2.default, colorPickerProps);
      }

      return result;
    }
  }, {
    key: 'renderButton',
    value: function renderButton() {
      var domProps = {
        onClick: this.handleButtonClick
      };

      return _react2.default.createElement(
        _Button2.default,
        domProps,
        'Custom Color'
      );
    }
  }, {
    key: 'handleButtonClick',
    value: function handleButtonClick() {
      this.handleNewColorRequest();
    }
  }, {
    key: 'renderColorPalette',
    value: function renderColorPalette() {
      var paletteProps = {
        palette: this.getNormalizedPalette(),
        onItemClick: this.handleItemClick,
        value: this.props.value
      };

      return _react2.default.createElement(_ColorPalette2.default, paletteProps);
    }
  }, {
    key: 'getNormalizedPalette',
    value: function getNormalizedPalette() {
      var props = this.props;

      var customPalette = (0, _normalizePalette2.default)({
        length: props.paletteLength,
        palette: this.getPalette(),
        value: this.props.value,
        defaultValue: this.props.value
      });

      return customPalette;
    }
  }, {
    key: 'handleColorPick',
    value: function handleColorPick(color) {
      // must send the color back to custom color palette
      var newPalette = (0, _addColor2.default)({
        color: color,
        palette: this.getPalette()
      });
      this.props.onNewColorRequestEnd(newPalette);
      this.setPalette(newPalette);
      this.props.onColorPick(color);
    }
  }, {
    key: 'handleColorPickDismiss',
    value: function handleColorPickDismiss() {
      this.newColorRequestResolve = null;
      this.props.onNewColorRequestEnd();
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick(_ref) {
      var color = _ref.color,
          index = _ref.index;

      /**
       * If a valid color is clicked (not empty space)
       * than onChange is called
       */
      var palette = this.getPalette();
      var isColorValid = palette && palette[index] !== undefined;

      if (isColorValid) {
        this.props.onChange(color);
      } else {
        /**
         * Request a new color
         * add it to the end of the palette
         * or at the first position if it is full
         */
        this.handleNewColorRequest();
      }
    }
  }, {
    key: 'handleNewColorRequest',
    value: function handleNewColorRequest() {
      this.props.onNewColorRequest();
    }
  }, {
    key: 'isPaletteControlled',
    value: function isPaletteControlled() {
      return this.props.palette !== undefined;
    }
  }, {
    key: 'getPalette',
    value: function getPalette() {
      return this.isPaletteControlled() ? this.props.palette : this.state.palette;
    }
  }, {
    key: 'setPalette',
    value: function setPalette(palette) {
      if (!this.isPaletteControlled()) {
        this.setState({ palette: palette });
      }

      this.props.onPaletteChange(palette);
    }
  }]);

  return ZippyCustomColorPalette;
}(_react.Component);

function emptyFn() {}

ZippyCustomColorPalette.defaultProps = {
  onChange: emptyFn,
  theme: 'default',
  onNewColorRequest: emptyFn,
  onPaletteChange: emptyFn,
  onColorPick: emptyFn,
  rootClassName: 'zippy-react-toolkit-custom-color-palette',
  paletteLength: 10,
  showColoPicker: false,
  rtl: false
};

ZippyCustomColorPalette.propTypes = {
  rtl: _propTypes2.default.bool,
  rootClassName: _propTypes2.default.string,
  theme: _propTypes2.default.string,
  value: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  palette: _propTypes2.default.arrayOf(_propTypes2.default.string),
  paletteLength: _propTypes2.default.number,
  onPaletteChange: _propTypes2.default.func,
  onNewColorRequest: _propTypes2.default.func,
  onNewColorRequestEnd: _propTypes2.default.func,
  showColoPicker: _propTypes2.default.bool,
  onColorPick: _propTypes2.default.func,
  renderColorPicker: _propTypes2.default.func,
  renderOkButton: _propTypes2.default.func,
  renderCancelButton: _propTypes2.default.func,
  colorPickerProps: _propTypes2.default.object
};

exports.default = ZippyCustomColorPalette;