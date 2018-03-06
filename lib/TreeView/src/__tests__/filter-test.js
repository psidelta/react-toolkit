'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('filter', function () {
  var dataSource = [{ label: 'test' }, {
    label: 'foo',
    nodes: [{ label: 'bar' }]
  }, { label: 'bar' }];

  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource }));
  });

  it('should render filtered elements null', function () {
    wrapper.setProps({
      filter: function filter(_ref) {
        var node = _ref.node;
        return node.label === 'bar';
      }
    });

    var test = function test() {
      return wrapper.find(_Node2.default).reduce(function (acc, node) {
        if (node.props().hidden) {
          acc += 1;
        }
        return acc;
      }, 0);
    };

    expect(test()).to.be.equal(1);

    wrapper.setProps({
      filter: function filter(_ref2) {
        var node = _ref2.node;
        return node.label === 'test';
      }
    });

    expect(test()).to.equal(2);
  });

  it('should not influence checkboxes', function () {
    wrapper.setProps({
      filter: function filter(_ref3) {
        var node = _ref3.node;
        return node.label === 'foo';
      }
    });

    wrapper.instance().checkNode('1');
    expect(wrapper.state().checked).toEqual({
      '1': true,
      '1/0': true
    });
  });
});