'use strict';

var _getGroups = require('../getGroups');

var _getGroups2 = _interopRequireDefault(_getGroups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getGroups', function () {
  it('returns the correct groups description', function () {
    var expected = {
      0: {
        title: 'group 1',
        indexAjustment: 1
      },
      3: {
        title: 'group 2',
        indexAjustment: 2
      },
      6: {
        title: 'group 3',
        indexAjustment: 3
      },
      10: {
        title: 'group 4',
        indexAjustment: 4
      },
      12: {
        title: 'group 1',
        indexAjustment: 5
      }
    };
    var data = [{ group: 'group 1' }, { group: 'group 1' }, { group: 'group 2' }, { group: 'group 2' }, { group: 'group 3' }, { group: 'group 3' }, { group: 'group 3' }, { group: 'group 4' }, { group: 'group 1' }, { group: 'group 1' }];

    var test = (0, _getGroups2.default)(data);
    expect(test).to.deep.equal(expected);
  });
});