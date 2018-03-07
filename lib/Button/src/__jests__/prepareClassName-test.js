'use strict';

var _prepareClassName = require('../prepareClassName');

var _prepareClassName2 = _interopRequireDefault(_prepareClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('prepareClassName', function () {
  it('adds disabled className', function () {
    expect((0, _prepareClassName2.default)({ disabled: true })).toContain('disabled');
    expect((0, _prepareClassName2.default)({ disabled: true }, { disabledClassName: 'test' })).toContain('test');
  });
  it('adds wrap className', function () {
    expect((0, _prepareClassName2.default)({ wrap: true })).toContain('--wrap');
    expect((0, _prepareClassName2.default)({ wrap: false })).toContain('--nowrap');
    expect((0, _prepareClassName2.default)({ wrap: undefined })).not.toContain('wrap');
  });
  it('adds verticalAlign className', function () {
    expect((0, _prepareClassName2.default)({ verticalAlign: 'middle' })).toContain('--vertical-align-middle');
    expect((0, _prepareClassName2.default)({ verticalAlign: 'top' })).toContain('--vertical-align-top');
  });
  it('adds active className', function () {
    expect((0, _prepareClassName2.default)({ active: true })).toContain('active');
    expect((0, _prepareClassName2.default)({ active: true }, { activeClassName: 'test' })).toContain('test');
  });
  it('adds pressed className', function () {
    expect((0, _prepareClassName2.default)({ pressed: true })).toContain('pressed');
    expect((0, _prepareClassName2.default)({ pressed: true }, { pressedClassName: 'test' })).toContain('test');
  });
  it('adds over className', function () {
    expect((0, _prepareClassName2.default)({ over: true })).toContain('over');
    expect((0, _prepareClassName2.default)({ over: true }, { overClassName: 'test' })).toContain('test');
  });
  it('adds focused className', function () {
    expect((0, _prepareClassName2.default)({ focused: true })).toContain('focused');
    expect((0, _prepareClassName2.default)({ focused: true }, { focusedClassName: 'test' })).toContain('test');
  });
});