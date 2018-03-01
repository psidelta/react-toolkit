'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../../Node');

var _Node2 = _interopRequireDefault(_Node);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('item.className', function () {
  it('should add className prop on root', function () {
    var className = 'test className';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Node2.default, { node: { className: className } }));
    expect(wrapper.hasClass(className)).to.be.true;
  });
});