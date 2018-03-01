'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName;
var rtlClassName = '.' + rootClassName + '--rtl';

describe('rtl', function () {
  it('should default to false', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
    expect(wrapper.props().rtl).to.be.false;
  });
  it('should add --rlt classname', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
    expect(wrapper.find(rtlClassName)).to.have.length(0);
    wrapper.setProps({ rtl: true });
    expect(wrapper.find(rtlClassName)).to.have.length(1);
  });
});