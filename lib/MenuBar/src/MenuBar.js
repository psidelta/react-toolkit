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

var _ToolBar = require('../../ToolBar');

var _ToolBar2 = _interopRequireDefault(_ToolBar);

var _DropdownButton = require('../../DropdownButton');

var _DropdownButton2 = _interopRequireDefault(_DropdownButton);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

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

var ZippyMenuBar = function (_Component) {
  _inherits(ZippyMenuBar, _Component);

  function ZippyMenuBar(props) {
    _classCallCheck(this, ZippyMenuBar);

    var _this = _possibleConstructorReturn(this, (ZippyMenuBar.__proto__ || Object.getPrototypeOf(ZippyMenuBar)).call(this, props));

    _this.renderDropdownButton = _this.renderDropdownButton.bind(_this);
    _this.setToolBarRef = function (ref) {
      _this.toolBarNode = ref;
    };
    return _this;
  }

  _createClass(ZippyMenuBar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;


      var commonProps = {};
      if (props.overflowStrategy === 'scroll') {
        commonProps.dismissOnScroll = true;
      }

      return _react2.default.createElement(
        _ToolBar2.default,
        _extends({}, (0, _cleanProps2.default)(props, ZippyMenuBar.propTypes), {
          ref: this.setToolBarRef,
          dropdownButtonProps: this.getDropdownButtonProps(),
          className: props.rootClassName,
          renderDropdownButton: this.renderDropdownButton
        }),
        Array.isArray(props.items) && props.items.map(function (item, index) {
          var dropdownButtonProps = _extends({}, commonProps, item, {
            menuProps: _this2.getMenuProps(),
            key: index,
            children: item.label
          });

          return _react2.default.createElement(_DropdownButton2.default, dropdownButtonProps);
        })
      );
    }
  }, {
    key: 'renderDropdownButton',
    value: function renderDropdownButton(config) {
      var _this3 = this;

      var props = this.props;
      var domProps = config.domProps,
          overflowIndexes = config.overflowIndexes;

      if (!overflowIndexes) {
        return;
      }
      if (props.overflowStrategy === 'scroll') {
        domProps.dismissOnScroll = true;
      }
      domProps.items = overflowIndexes.map(function (overflowIndex) {
        var item = _this3.props.items[overflowIndex];
        return {
          label: item.label,
          items: item.items
        };
      });

      if (typeof this.props.renderDropdownButton === 'function') {
        return this.props.renderDropdownButton(config);
      }
    }
  }, {
    key: 'getDropdownButtonProps',
    value: function getDropdownButtonProps() {
      var menuPropsStyle = this.props.dropdownButtonProps && this.props.dropdownButtonProps.menuProps && this.props.dropdownButtonProps.menuProps.style;
      var menuStyle = void 0;
      if (this.props.overflowStrategy === 'scroll') {
        menuStyle = _extends({}, menuPropsStyle, {
          position: 'fixed'
        });
      }
      return _extends({}, this.props.dropdownButtonProps, {
        menuProps: {
          style: menuStyle
        }
      });
    }
  }, {
    key: 'getMenuProps',
    value: function getMenuProps() {
      var props = this.props;

      var menuProps = _extends({}, props.dropdownButtonProps && props.dropdownButtonProps.menuProps, props.menuProps);
      if (this.props.overflowStrategy === 'scroll') {
        menuProps.style = _extends({}, menuProps.style, {
          position: 'fixed'
        });
      }
      return menuProps;
    }
  }, {
    key: 'getToolBarNode',
    value: function getToolBarNode() {
      return this.toolBarNode;
    }
  }]);

  return ZippyMenuBar;
}(_react.Component);

ZippyMenuBar.defaultProps = {
  rootClassName: 'react-toolkit-menu-bar',
  items: null,
  overflowStrategy: 'dropdown'
};

ZippyMenuBar.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.object),
  rootClassName: _propTypes2.default.string,
  dropdownButtonProps: _propTypes2.default.object
};

exports.default = ZippyMenuBar;