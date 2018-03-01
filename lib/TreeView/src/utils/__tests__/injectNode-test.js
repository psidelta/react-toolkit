'use strict';

var _injectNode = require('../injectNode');

var _injectNode2 = _interopRequireDefault(_injectNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('injectNode', function () {
  it('should inject node at the correct place', function () {
    var nodeToInject = { label: 'injectedNode' };
    var data = [{
      label: 'test',
      nodes: [{
        label: 'test 1'
      }]
    }];

    var expected = [{
      label: 'test',
      nodes: [nodeToInject]
    }];

    var test = (0, _injectNode2.default)(nodeToInject, [0, 0], data);

    expect(test).to.deep.equal(expected);
  });
});