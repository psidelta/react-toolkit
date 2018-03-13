'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

var NESTED_DATA_STRUCTURE = [{
  label: 'test 1'
}, {
  label: 'test 2',
  nodes: [{
    label: 'test 3'
  }, {
    label: 'test 4'
  }, {
    label: 'test 5'
  }]
}];

describe('disabled prop', function () {
  it('gets applied to the correct nodes', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: NESTED_DATA_STRUCTURE,
      disabled: { '0': true, '1/0': true }
    }));

    expect(wrapper.find(_Node2.default).first().props().disabled).toBe(true);
    expect(wrapper.find(_Node2.default).at(1).props().disabled).toBe(false);
    expect(wrapper.find(_Node2.default).at(2).props().disabled).toBe(true);
  });
});

describe('isNodeDisabled', function () {
  it('gets called', function () {
    var isNodeDisabled = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: NESTED_DATA_STRUCTURE,
      disabled: { '0': true, '1/0': true },
      isNodeDisabled: isNodeDisabled
    }));

    expect(isNodeDisabled).toHaveBeenCalled();
  });

  it('sets disabled to correct nodes', function () {
    var isNodeDisabled = function isNodeDisabled(_ref) {
      var index = _ref.index;

      return index === 0;
    };

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: NESTED_DATA_STRUCTURE,
      disabled: { '0': true, '1/0': true },
      isNodeDisabled: isNodeDisabled
    }));

    expect(wrapper.find(_Node2.default).first().props().disabled).toBe(true);

    expect(wrapper.find(_Node2.default).at(1).props().disabled).toEqual(false);
    expect(wrapper.find(_Node2.default).at(2).props().disabled).toBe(true);
    expect(wrapper.find(_Node2.default).at(3).props().disabled).toBe(false);
  });

  describe('node.disabled', function () {
    it('should be disabled if the node has a property disabled prop true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: [{ label: 'test', disabled: true }] }));

      expect(wrapper.find(_Node2.default).first().props().disabled).toBe(true);
    });
  });
});