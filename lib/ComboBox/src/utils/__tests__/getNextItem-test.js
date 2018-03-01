'use strict';

var _getNextItem = require('../getNextItem');

var _getNextItem2 = _interopRequireDefault(_getNextItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getNextItem', function () {
  it('returns next item when direction is 1', function () {
    var test = (0, _getNextItem2.default)({
      data: [{ id: 1 }, { id: 2 }],
      id: 1,
      getIdProperty: function getIdProperty(item) {
        return item.id;
      }
    });
    expect(test).to.equal(2);
  });
  it('if it has length 1 it returns the same id', function () {
    var test = (0, _getNextItem2.default)({
      data: [{ id: 1 }],
      id: 1,
      getIdProperty: function getIdProperty(item) {
        return item.id;
      }
    });
    expect(test).to.equal(1);
  });
  it('returns previous item whe direction is -1', function () {
    var test = (0, _getNextItem2.default)({
      data: [{ id: 1 }, { id: 2 }, { id: 3 }],
      id: 2,
      getIdProperty: function getIdProperty(item) {
        return item.id;
      },
      direction: -1
    });
    expect(test).to.equal(1);
  });
  it('navigates to next item if the curret item is disabled', function () {
    var test = (0, _getNextItem2.default)({
      data: [{ id: 1 }, { id: 2, disabled: true }, { id: 3 }],
      id: 1,
      getIdProperty: function getIdProperty(item) {
        return item.id;
      },
      direction: 1
    });
    expect(test).to.equal(3);
  });
});