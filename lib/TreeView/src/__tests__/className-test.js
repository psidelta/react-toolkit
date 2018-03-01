'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('className', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { className: 'testTree', dataSource: [] }));
  it('should have ' + CLASS_NAME + ' className', function () {
    expect(wrapper.find('.' + CLASS_NAME)).to.have.length(1);
  });
  it('className props is added', function () {
    expect(wrapper.find('.testTree')).to.have.length(1);
  });
  it('theme className is added by default', function () {
    expect(wrapper.find('.' + CLASS_NAME + '--theme-default')).to.have.length(1);
  });
  it('theme prop is added', function () {
    wrapper.setProps({ theme: 'test-theme' });
    expect(wrapper.find('.' + CLASS_NAME + '--theme-default')).to.have.length(0);
    expect(wrapper.find('.' + CLASS_NAME + '--theme-test-theme')).to.have.length(1);
  });
});