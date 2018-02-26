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

var _ColorTextInput = require('../../ColorTextInput');

var _ColorTextInput2 = _interopRequireDefault(_ColorTextInput);

var _Button = require('../../Button');

var _Button2 = _interopRequireDefault(_Button);

var _ColorPalette = require('../../ColorPalette');

var _ColorPalette2 = _interopRequireDefault(_ColorPalette);

var _ToggleIcon = require('../../common/ToggleIcon');

var _ToggleIcon2 = _interopRequireDefault(_ToggleIcon);

var _CustomColorPalette = require('./CustomColorPalette');

var _CustomColorPalette2 = _interopRequireDefault(_CustomColorPalette);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _registerHideOnClickOutsideEventListener = require('../../common/registerHideOnClickOutsideEventListener');

var _registerHideOnClickOutsideEventListener2 = _interopRequireDefault(_registerHideOnClickOutsideEventListener);

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

var ZippyColorPickerInput = function (_Component) {
  _inherits(ZippyColorPickerInput, _Component);

  function ZippyColorPickerInput(props) {
    _classCallCheck(this, ZippyColorPickerInput);

    var _this = _possibleConstructorReturn(this, (ZippyColorPickerInput.__proto__ || Object.getPrototypeOf(ZippyColorPickerInput)).call(this, props));

    _this.state = {
      value: props.defaultValue,
      expanded: props.defaultExpanded,
      customPalette: props.defaultCustomPalette
    };

    _this.setValue = _this.setValue.bind(_this);
    _this.handleExpandButtonClick = _this.handleExpandButtonClick.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleNewColorRequest = _this.handleNewColorRequest.bind(_this);
    _this.handleNewColorRequestEnd = _this.handleNewColorRequestEnd.bind(_this);
    _this.handleCustomPalleteChange = _this.handleCustomPalleteChange.bind(_this);
    _this.setValue = _this.setValue.bind(_this);

    _this.setRootNode = function (ref) {
      _this.rootNode = ref;
    };
    return _this;
  }

  _createClass(ZippyColorPickerInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.collapseOnClickOutside) {
        this.unregisterOnClickOutside = (0, _registerHideOnClickOutsideEventListener2.default)({
          getRootNode: function getRootNode() {
            return _this2.rootNode;
          },
          onHide: function onHide() {
            return _this2.collapse();
          }
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.unregisterOnClickOutside) {
        this.unregisterOnClickOutside();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setExpanded(false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state;

      var className = (0, _join2.default)(props.rootClassName, props.className, props.rtl && props.rootClassName + '--rtl', props.rootClassName + '--theme-' + props.theme);

      var showColoPicker = state.newColorRequest;

      return _react2.default.createElement(
        'div',
        _extends({}, (0, _cleanProps2.default)(props, ZippyColorPickerInput.propTypes), {
          className: className,
          ref: this.setRootNode
        }),
        this.renderColorTextInput(),
        this.renderExpandButton(),
        this.getExpanded() && _react2.default.createElement(
          'div',
          { className: props.rootClassName + '__overlay' },
          props.showColorPalette && !showColoPicker && this.renderColorPalette(),
          props.showCustomPalette && this.renderCustomColorPalette(showColoPicker)
        )
      );
    }
  }, {
    key: 'renderCustomColorPalette',
    value: function renderCustomColorPalette(showColoPicker) {
      var props = this.props;

      var domProps = {
        onNewColorRequest: this.handleNewColorRequest,
        onNewColorRequestEnd: this.handleNewColorRequestEnd,
        value: this.getValue(),
        onChange: this.setValue,
        onColorPick: this.setValue,
        onPaletteChange: this.handleCustomPalleteChange,
        palette: this.getCustomPalette(),
        paletteLength: props.customPaletteLength,
        showColoPicker: showColoPicker,
        rtl: props.rtl,
        renderColorPicker: props.renderColorPicker,
        renderOkButton: props.renderOkButton,
        renderCancelButton: props.renderCancelButton,
        colorPickerProps: props.colorPickerProps
      };

      return _react2.default.createElement(_CustomColorPalette2.default, domProps);
    }
  }, {
    key: 'renderExpandButton',
    value: function renderExpandButton() {
      var _this3 = this;

      var props = this.props;

      var expanded = this.getExpanded();

      var toggleIcon = _react2.default.createElement(_ToggleIcon2.default, {
        className: (0, _join2.default)(props.rootClassName + '__expand-button__icon'),
        expanded: expanded
      });

      var buttonProps = {
        className: (0, _join2.default)(props.rootClassName + '__button', props.rootClassName + '__expand-button'),
        theme: null,
        children: toggleIcon,
        onClick: this.handleExpandButtonClick
      };

      var result = void 0;
      if (typeof props.renderExpandButton === 'function') {
        result = props.renderExpandButton({
          buttonProps: buttonProps,
          expanded: expanded,
          collapse: function collapse() {
            return _this3.collapse();
          },
          expand: function expand() {
            return _this3.expand();
          },
          onClick: this.handleExpandButtonClick
        });
      }

      if (result === undefined) {
        result = _react2.default.createElement(_Button2.default, buttonProps);
      }

      return result;
    }
  }, {
    key: 'renderColorTextInput',
    value: function renderColorTextInput() {
      var props = this.props;

      var value = this.getValue();

      var colorTextInputProps = _extends({
        value: value,
        rootClassName: props.rootClassName + '__color-input',
        onChange: this.setValue,
        onTextChange: props.onTextChange,
        text: props.text,
        defaultText: props.defaultText,
        onFocus: this.handleFocus,
        rtl: props.rtl
      }, props.colorTextInputProps);

      var result = void 0;
      if (typeof props.renderColorTextInput === 'function') {
        result = props.renderColorTextInput({
          value: value,
          colorTextInputProps: colorTextInputProps,
          onChange: this.setValue
        });
      }

      if (result === undefined) {
        result = _react2.default.createElement(_ColorTextInput2.default, colorTextInputProps);
      }

      return result;
    }
  }, {
    key: 'renderColorPalette',
    value: function renderColorPalette() {
      var props = this.props;
      var colorPalette = props.colorPalette,
          colorPaletteProps = props.colorPaletteProps;

      var value = this.getValue();
      var paletteProps = _extends({
        value: value,
        className: props.rootClassName + '__color-palette',
        onChange: this.setValue,
        palette: colorPalette
      }, colorPaletteProps);

      var result = void 0;
      if (typeof this.props.renderColorPalette === 'function') {
        result = this.props.renderColorPalette({
          colorPalette: colorPalette,
          paletteProps: paletteProps,
          onChange: this.setValue
        });
      }
      if (result === undefined) {
        result = _react2.default.createElement(_ColorPalette2.default, paletteProps);
      }

      return result;
    }

    // value

  }, {
    key: 'setValue',
    value: function setValue(color) {
      if (!this.isValueControlled()) {
        this.setState({ value: color });
        if (this.props.collapseOnValueChange) {
          this.setExpanded(false);
        }
      }

      this.props.onChange(color);
    }
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

    // expanded

  }, {
    key: 'handleExpandButtonClick',
    value: function handleExpandButtonClick() {
      var nextExpanded = !this.getExpanded();
      this.setExpanded(nextExpanded);
    }
  }, {
    key: 'setExpanded',
    value: function setExpanded(expanded) {
      if (!this.isExpandedControlled()) {
        this.setState({ expanded: expanded });
      }

      this.props.onExpandChange(expanded);
    }
  }, {
    key: 'getExpanded',
    value: function getExpanded() {
      return this.isExpandedControlled() ? this.props.expanded : this.state.expanded;
    }
  }, {
    key: 'isExpandedControlled',
    value: function isExpandedControlled() {
      return this.props.expanded != null;
    }

    // custom palette

  }, {
    key: 'isCustomPaletteControlled',
    value: function isCustomPaletteControlled() {
      return this.props.customPalette !== undefined;
    }
  }, {
    key: 'getCustomPalette',
    value: function getCustomPalette() {
      return this.isCustomPaletteControlled() ? this.props.customPalette : this.state.customPalette;
    }
  }, {
    key: 'setCustomPalette',
    value: function setCustomPalette(customPalette) {
      if (!this.isCustomPaletteControlled()) {
        this.setState({ customPalette: customPalette });
      }

      this.props.onCustomPaletteChange(customPalette);
    }
  }, {
    key: 'handleCustomPalleteChange',
    value: function handleCustomPalleteChange(palette) {
      this.setCustomPalette(palette);
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.setExpanded(false);
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.setExpanded(true);
    }

    // envets

  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      var expanded = this.getExpanded();
      if (!expanded) {
        this.setExpanded(true);
      }
    }
  }, {
    key: 'handleNewColorRequest',
    value: function handleNewColorRequest() {
      this.setState({
        newColorRequest: true
      });
    }
  }, {
    key: 'handleNewColorRequestEnd',
    value: function handleNewColorRequestEnd() {
      this.setState({
        newColorRequest: false
      });
    }
  }]);

  return ZippyColorPickerInput;
}(_react.Component);

function emptyFn() {}

ZippyColorPickerInput.defaultProps = {
  theme: 'default',
  rootClassName: 'zippy-react-toolkit-color-picker-input',
  onChange: emptyFn,
  rtl: false,

  // expand
  defaultExpanded: false,
  collapseOnValueChange: true,
  expandOnFocus: true,
  onExpandChange: emptyFn,
  collapseOnClickOutside: true,

  // show color palette
  showColorPalette: true,

  // custom color palette
  showCustomPalette: true,
  customPaletteLength: 10,
  onCustomPaletteChange: emptyFn
};

ZippyColorPickerInput.propTypes = {
  theme: _propTypes2.default.string,
  rootClassName: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  value: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  rtl: _propTypes2.default.bool,

  // ColorTextInput
  colorTextInputProps: _propTypes2.default.object,
  onTextChange: _propTypes2.default.func,
  text: _propTypes2.default.string,
  defaultText: _propTypes2.default.string,
  renderColorTextInput: _propTypes2.default.func,

  // expand change
  expandOnFocus: _propTypes2.default.bool,
  expanded: _propTypes2.default.bool,
  defaultExpanded: _propTypes2.default.bool,
  collapseOnValueChange: _propTypes2.default.bool,
  onExpandChange: _propTypes2.default.func,
  collapseOnClickOutside: _propTypes2.default.bool,
  renderExpandButton: _propTypes2.default.func,

  // color palette
  showColorPalette: _propTypes2.default.bool,
  colorPaletteProps: _propTypes2.default.object,
  colorPalette: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  renderColorPalette: _propTypes2.default.func,

  // custom color palette
  showCustomPalette: _propTypes2.default.bool,
  customPaletteLength: _propTypes2.default.number,
  onCustomPaletteChange: _propTypes2.default.func,
  customPalette: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  defaultCustomPalette: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),

  // colior picker
  renderColorPicker: _propTypes2.default.func,
  renderOkButton: _propTypes2.default.func,
  renderCancelButton: _propTypes2.default.func,
  colorPickerProps: _propTypes2.default.object
};

exports.default = ZippyColorPickerInput;