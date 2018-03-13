'use strict';

var _changeChildrenCheckProperty = require('../changeChildrenCheckProperty');

var _changeChildrenCheckProperty2 = _interopRequireDefault(_changeChildrenCheckProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('changeChildrenCheckProperty', function () {
  it('changeChildrenCheckProperty should work', function () {
    var test = {
      path: '0',
      children: [{
        path: '0/0'
      }, {
        path: '0/1',
        children: [{}, {}],
        disabled: true
      }]
    };
    expect((0, _changeChildrenCheckProperty2.default)(test, true)).toEqual({
      0: true
    });
  });
});