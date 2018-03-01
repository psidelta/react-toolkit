'use strict';

var _findItemIndex = require('../findItemIndex');

var _findItemIndex2 = _interopRequireDefault(_findItemIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('findItemIndex', function () {
  it('returns the correct index of the item', function () {
    var test = (0, _findItemIndex2.default)({
      data: [{ id: 1 }, { id: 2 }],
      id: 1,
      getIdProperty: function getIdProperty(item) {
        return item.id;
      }
    });

    expect(test).to.equal(0);
  });
});