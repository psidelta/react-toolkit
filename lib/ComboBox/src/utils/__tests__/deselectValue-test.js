'use strict';

var _deselectValue = require('../deselectValue');

var _deselectValue2 = _interopRequireDefault(_deselectValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('deselectValue', function () {
  it('deselects single value', function () {
    expect((0, _deselectValue2.default)({ id: 20, value: 20 })).to.be.null;
  });
  it('nows how to handle null value', function () {
    expect((0, _deselectValue2.default)({ id: 20, value: null })).to.be.null;
  });
  it('removes id from multiple value', function () {
    expect((0, _deselectValue2.default)({ id: 20, value: [20, 30] })).toEqual([30]);
  });
  it('returns null when multiple results to an empty array', function () {
    expect((0, _deselectValue2.default)({ id: 20, value: [20] })).to.be.null;
  });
});