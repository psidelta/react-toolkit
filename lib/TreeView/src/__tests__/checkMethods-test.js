'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('checkNode', function () {
  it('should return and have correct new collapsed state', function () {
    var dataSource = [{
      label: 'test 1'
    }, {
      label: 'test 2',
      nodes: [{
        label: 'test 3'
      }]
    }];

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableChecked: true, dataSource: dataSource }));
    var newCheckedState = wrapper.instance().checkNode('1');
    var expected = { '1': true, '1/0': true };

    expect(newCheckedState).toEqual(expected);
    expect(wrapper.state().checked).toEqual(expected);
  });
});

describe('uncheckNode', function () {
  it('should return and have correct new collapsed state', function () {
    var dataSource = [{
      label: 'test 1'
    }, {
      label: 'test 2',
      nodes: [{
        label: 'test 3'
      }]
    }];

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      enableChecked: true,
      dataSource: dataSource,
      defaultChecked: { '1': true, '0': true }
    }));
    var newCheckedState = wrapper.instance().uncheckNode('1');
    var expected = { '0': true };

    expect(newCheckedState).toEqual(expected);
    expect(wrapper.state().checked).toEqual(expected);
  });
});

describe('checkAll', function () {
  var dataSource = [{ label: 'test 1' }, {
    label: 'test 2',
    nodes: [{ label: 'test 3' }]
  }];
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableChecked: true, dataSource: dataSource }));
    var test = wrapper.instance().checkAll();
    var expected = {
      '0': true,
      '1': true,
      '1/0': true
    };
    expect(test).toEqual(expected);
    expect(wrapper.state().checked).toEqual(expected);
  });
});

describe('uncheckAll', function () {
  var dataSource = [{ label: 'test 1' }, {
    label: 'test 2',
    nodes: [{ label: 'test 3' }]
  }];
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableChecked: true, dataSource: dataSource }));
    var test = wrapper.instance().uncheckAll();
    var expected = {};
    expect(test).toEqual(expected);
    expect(wrapper.state().checked).toEqual(expected);
  });
});