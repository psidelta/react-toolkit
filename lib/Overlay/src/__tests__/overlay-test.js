'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Overlay', function () {
  it('should create instance of Overlay', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { target: '.tooltip' }));
    expect(wrapper.instance()).to.be.instanceOf(_Overlay2.default);
  });
  it('should add className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { target: '.tooltip', className: 'custom-class-name' }));
    expect(wrapper.find('.custom-class-name')).to.have.length(1);
  });
  it('should add style', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { target: '.tooltip', style: { color: 'red' } }));
    expect(wrapper.props().style.color).to.equal('red');
  });
});