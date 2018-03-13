'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('style', function () {
  it('should be applied on comp', function () {
    var style = { color: 'blue' };
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { style: style, dataSource: [] }));
    expect(wrapper.find('.' + CLASS_NAME).prop('style')).to.equal(style);
  });
});