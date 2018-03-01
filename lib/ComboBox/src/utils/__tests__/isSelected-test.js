'use strict';

var _isSelected = require('../isSelected');

var _isSelected2 = _interopRequireDefault(_isSelected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('isSelected', function () {
  it('checks if the item is selected', function () {
    expect((0, _isSelected2.default)({ id: 1, value: 1 })).to.be.true;
    expect((0, _isSelected2.default)({ id: 1, value: 0 })).to.be.false;

    expect((0, _isSelected2.default)({ id: 1, value: [1] })).to.be.true;
    expect((0, _isSelected2.default)({ id: 1, value: [1, 2, 3] })).to.be.true;
    expect((0, _isSelected2.default)({ id: 1, value: [0, 2, 3] })).to.be.false;
  });
});