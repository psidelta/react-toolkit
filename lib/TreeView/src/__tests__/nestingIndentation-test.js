'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('nestingIndentation', function () {
  it('should add paddingLeft on contentStyle', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      rtl: false,
      dataSource: [{ label: 'test 1' }, { label: 'test 2' }, { label: 'test 3' }]
    }));

    expect(wrapper.find(_Node2.default).first().props().contentStyle.paddingLeft).to.be.equal(20);
  });

  it('should add padddingRight to contentStyle if rtl', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      rtl: true,
      dataSource: [{ label: 'test 1' }, { label: 'test 2' }, { label: 'test 3' }]
    }));

    expect(wrapper.find(_Node2.default).first().props().contentStyle.paddingRight).to.be.equal(20);
  });
});