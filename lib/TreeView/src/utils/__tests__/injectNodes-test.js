'use strict';

var _injectNodes = require('../injectNodes');

var _injectNodes2 = _interopRequireDefault(_injectNodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('injectNodes', function () {
  it('should inject nodes at the correct place', function () {
    var nodesToInject = [{ label: 'injectedNode' }];
    var data = [{
      label: 'test',
      nodes: [{
        label: 'test 1'
      }]
    }];

    var expected = [{
      label: 'test',
      nodes: [{
        label: 'test 1',
        nodes: nodesToInject
      }]
    }];

    var test = (0, _injectNodes2.default)(nodesToInject, [0, 0], data);

    expect(test).to.deep.equal(expected);
  });
});