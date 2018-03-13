'use strict';

var _getDataProp = require('../getDataProp');

var _getDataProp2 = _interopRequireDefault(_getDataProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getDataProp', function () {
  it('returns correct prop', function () {
    expect((0, _getDataProp2.default)('id')({ id: 'hey' })).to.equal('hey');

    expect((0, _getDataProp2.default)(function () {
      return 'hey';
    })({ id: 'hey' })).to.equal('hey');
  });
});