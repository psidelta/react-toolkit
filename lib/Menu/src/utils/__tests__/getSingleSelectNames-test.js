'use strict';

var _getSingleSelectNames = require('../getSingleSelectNames');

var _getSingleSelectNames2 = _interopRequireDefault(_getSingleSelectNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getSingleSelectNames', function () {
  it('returns the name that repeat at least once', function () {
    var items = [{ name: 'name1' }, { name: 'name1' }, { name: 'name1' }, { name: 'name2' }, { name: 'name3' }, { name: 'name3' }, { name: 'name5' }];

    var expected = {
      name1: true,
      name2: false,
      name3: true,
      name5: false
    };

    expect((0, _getSingleSelectNames2.default)({
      items: items,
      nameProperty: 'name'
    })).to.deep.equal(expected);
  });
});