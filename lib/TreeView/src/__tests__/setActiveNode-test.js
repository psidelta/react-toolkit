'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('setActiveNode', function () {
  it('should update the active noode', function () {
    var dataSource = [{
      label: 'test 1'
    }, {
      label: 'test 2',
      nodes: [{
        label: 'test 3'
      }]
    }];

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableChecked: true, dataSource: dataSource, defaultActiveNode: '1' }));

    var newCollapsedState = wrapper.instance().setActiveNode('1/0');
    var expected = '1/0';

    expect(newCollapsedState).to.be.equal(expected);
    expect(wrapper.state().activeNode).to.be.equal(expected);
  });
});