'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataSource = [{ label: 'test 1' }, {
  label: 'test 2',
  nodes: [{ label: 'test 3' }]
}];

describe('setSelected', function () {
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      enableSelection: true,
      defaultSelected: { '0': true },
      dataSource: dataSource
    }));

    var newSelectedState = wrapper.instance().setSelected({ '1': true, '1/0': true });
    var expected = { '1': true, '1/0': true };

    expect(newSelectedState).toEqual(expected);
    expect(wrapper.state().selected).toEqual(expected);
  });
});

describe('selectNode', function () {
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableSelection: true, dataSource: dataSource }));
    var newCheckedState = wrapper.instance().selectNode('1');
    var expected = { '1': true };

    expect(newCheckedState).toEqual(expected);
    expect(wrapper.state().selected).toEqual(expected);
  });
});

describe('deselectNode', function () {
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      defaultSelected: { '1': 'true' },
      enableSelection: true,
      dataSource: dataSource
    }));
    var newCheckedState = wrapper.instance().deselectNode('1');
    var expected = {};

    expect(newCheckedState).toEqual(expected);
    expect(wrapper.state().selected).toEqual(expected);
  });
});

describe('selectAll', function () {
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableSelection: true, dataSource: dataSource }));
    var test = wrapper.instance().selectAll();
    var expected = {
      '0': true,
      '1': true,
      '1/0': true
    };
    expect(test).toEqual(expected);
    expect(wrapper.state().selected).toEqual(expected);
  });
});

describe('deselectAll', function () {
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      defaultSelected: { '1': true },
      enableSelection: true,
      dataSource: dataSource
    }));
    var test = wrapper.instance().deselectAll();
    var expected = {};
    expect(test).toEqual(expected);
    expect(wrapper.state().selected).toEqual(expected);
  });
});