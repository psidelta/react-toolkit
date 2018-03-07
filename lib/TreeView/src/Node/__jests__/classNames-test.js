'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TreeView = require('../../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../../Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('classNames', function () {
  describe('component className', function () {
    it('should add className prop on root', function () {
      var className = 'test className';
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Node2.default, { domProps: { className: className } }));
      expect(wrapper.hasClass(className)).toBe(true);
    });
  });

  describe('label className', function () {
    it('should add labelClassName prop on label', function () {
      var className = 'test className';
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Node2.default, { labelClassName: className }));
      expect(wrapper.find('.' + CLASS_NAME + '__node__label').hasClass(className)).toBe(true);
    });
  });

  describe('content className', function () {
    it('should add contentClassName prop on label', function () {
      var className = 'test className';
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Node2.default, { hasChildren: true, contentClassName: className }));
      expect(wrapper.find('.' + CLASS_NAME + '__node__content').hasClass(className)).toBe(true);
    });
  });
});