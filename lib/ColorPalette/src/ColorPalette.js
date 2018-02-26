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

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _colorPalettes = require('./colorPalettes');

var _colorPalettes2 = _interopRequireDefault(_colorPalettes);

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

var ZippyColorPalette = function (_Component) {
  _inherits(ZippyColorPalette, _Component);

  function ZippyColorPalette(props) {
    _classCallCheck(this, ZippyColorPalette);

    var _this = _possibleConstructorReturn(this, (ZippyColorPalette.__proto__ || Object.getPrototypeOf(ZippyColorPalette)).call(this, props));

    _this.state = {
      color: props.defaultValue
    };

    _this.renderItem = _this.renderItem.bind(_this);
    return _this;
  }

  _createClass(ZippyColorPalette, [{
    key: 'render',
    value: function render() {
      var props = this.props;

      var className = (0, _join2.default)(props.rootClassName, props.className, props.rootClassName + '--theme-' + props.theme, props.rtl && props.rootClassName + '--rtl');

      var palette = Array.isArray(props.palette) ? props.palette : _colorPalettes2.default[props.palette];

      return _react2.default.createElement(
        'div',
        _extends({}, (0, _cleanProps2.default)(props, ZippyColorPalette.propTypes), { className: className }),
        palette.map(this.renderItem)
      );
    }
  }, {
    key: 'renderItem',
    value: function renderItem(color, index) {
      var _this2 = this;

      var props = this.props;
      var itemSize = props.itemSize;

      var active = color === this.getValue();
      var className = (0, _join2.default)(props.rootClassName + '__item', active && props.rootClassName + '__item--active');

      var sizeStyle = void 0;
      if (itemSize) {
        sizeStyle = typeof itemSize === 'number' ? { width: itemSize, height: itemSize } : itemSize;
      }

      var onChange = function onChange(event) {
        _this2.handleChange(color, index);
        _this2.props.onItemClick({ color: color, event: event, index: index });
      };

      var domProps = {
        className: className,
        key: index,
        onClick: onChange,
        style: _extends({}, sizeStyle, {
          background: color
        })
      };

      var result = void 0;
      if (typeof props.renderItem === 'function') {
        result = props.renderItem({
          color: color,
          onChange: onChange,
          active: active
        });
      }

      if (result == null) {
        result = _react2.default.createElement('div', domProps);
      }

      return result;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(color) {
      if (!this.isValueControlled()) {
        this.setState({ value: color });
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
  }]);

  return ZippyColorPalette;
}(_react.Component);

function emptyFn() {}

ZippyColorPalette.defaultProps = {
  palette: 'default',
  theme: 'default',
  rootClassName: 'zippy-react-toolkit-color-palette',
  itemSize: { width: 20, height: 10 },
  onChange: emptyFn,
  onItemClick: emptyFn
};

ZippyColorPalette.propTypes = {
  palette: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  theme: _propTypes2.default.string,
  rootClassName: _propTypes2.default.string,
  itemSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
    width: _propTypes2.default.number,
    height: _propTypes2.default.number
  })]),
  onChange: _propTypes2.default.func,
  onItemClick: _propTypes2.default.func
};

exports.default = ZippyColorPalette;