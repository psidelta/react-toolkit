'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Node = require('../../Node');

var _Node2 = _interopRequireDefault(_Node);

var _TreeView = require('../../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('checkOnClick', function () {
  it('should default to false', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, null));
    expect(wrapper.props().checkOnClick).toBe(true);
  });
  it('should not trigger onCheckedChange if false', function () {
    var onCheckedChange = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { checkOnClick: false, onCheckedChange: onCheckedChange }));
    wrapper.instance().onLabelClick({ stopPropagation: function stopPropagation() {} });
    expect(onCheckedChange).toHaveBeenCalledTimes(0);
  });

  it('should trigger onCheckedChange if true', function () {
    var onCheckedChange = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { checkOnClick: true, onCheckedChange: onCheckedChange }));
    wrapper.instance().onLabelClick({ stopPropagation: function stopPropagation() {} });
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });
});