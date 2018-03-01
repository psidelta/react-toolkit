'use strict';

var _changeChildrenProperty = require('../changeChildrenProperty');

var _changeChildrenProperty2 = _interopRequireDefault(_changeChildrenProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('changeChildrenProperty', function () {
  it('creates of all the children nodes, with true as value', function () {
    var node = {
      path: '0',
      children: [{
        props: { path: '0/0' }
      }, {
        props: {
          path: '0/1',
          children: [{
            props: {
              path: '0/1/0'
            }
          }]
        }
      }]
    };

    var expected = {
      '0': true,
      '0/0': true,
      '0/1': true,
      '0/1/0': true
    };

    expect((0, _changeChildrenProperty2.default)(node, true)).to.deep.equal(expected);
  });
});