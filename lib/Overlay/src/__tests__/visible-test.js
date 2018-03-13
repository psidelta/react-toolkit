'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('visible', function () {
  it('renders correct className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { visible: true }));
    expect(wrapper.find('.react-overlay--visible')).to.have.length(1);
    wrapper.setProps({ visible: false });
    expect(wrapper.find('.react-overlay--visible')).to.have.length(0);
  });
  it('controlled visible is not changed by setVisible', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { visible: true }));
    expect(wrapper.instance().getVisible()).to.be.true;
    wrapper.instance().setVisible(false);
    expect(wrapper.instance().getVisible()).to.be.true;
  });
  it('calls onVisibleChange', function () {
    var onVisibleChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onVisibleChange: onVisibleChange }));
    wrapper.instance().setVisible(true);
    expect(onVisibleChange.called).to.be.true;
  });
  it('visible state changes when uncontrolled', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, null));
    wrapper.instance().setVisible(true);
    expect(wrapper.instance().getVisible()).to.be.true;
  });
  it('defaultVisible it is used as initial uncontrolled value', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { defaultVisible: true }));
    expect(wrapper.instance().getVisible()).to.be.true;
    wrapper.instance().setVisible(false);
    expect(wrapper.instance().getVisible()).to.be.false;
  });
});