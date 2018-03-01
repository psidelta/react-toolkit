'use strict';

var _prepareClassName = require('../prepareClassName');

var _prepareClassName2 = _interopRequireDefault(_prepareClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('prepareClassName', function () {
  it('adds disabled className', function () {
    expect((0, _prepareClassName2.default)({ disabled: true })).to.have.string('disabled');
    expect((0, _prepareClassName2.default)({ disabled: true }, { disabledClassName: 'test' })).to.have.string('test');
  });
  it('adds wrap className', function () {
    expect((0, _prepareClassName2.default)({ wrap: true })).to.have.string('--wrap');
    expect((0, _prepareClassName2.default)({ wrap: false })).to.have.string('--nowrap');
    expect((0, _prepareClassName2.default)({ wrap: undefined })).to.not.have.string('wrap');
  });
  it('adds verticalAlign className', function () {
    expect((0, _prepareClassName2.default)({ verticalAlign: 'middle' })).to.have.string('--vertical-align-middle');
    expect((0, _prepareClassName2.default)({ verticalAlign: 'top' })).to.have.string('--vertical-align-top');
  });
  it('adds active className', function () {
    expect((0, _prepareClassName2.default)({ active: true })).to.have.string('active');
    expect((0, _prepareClassName2.default)({ active: true }, { activeClassName: 'test' })).to.have.string('test');
  });
  it('adds pressed className', function () {
    expect((0, _prepareClassName2.default)({ pressed: true })).to.have.string('pressed');
    expect((0, _prepareClassName2.default)({ pressed: true }, { pressedClassName: 'test' })).to.have.string('test');
  });
  it('adds over className', function () {
    expect((0, _prepareClassName2.default)({ over: true })).to.have.string('over');
    expect((0, _prepareClassName2.default)({ over: true }, { overClassName: 'test' })).to.have.string('test');
  });
  it('adds focused className', function () {
    expect((0, _prepareClassName2.default)({ focused: true })).to.have.string('focused');
    expect((0, _prepareClassName2.default)({ focused: true }, { focusedClassName: 'test' })).to.have.string('test');
  });
});