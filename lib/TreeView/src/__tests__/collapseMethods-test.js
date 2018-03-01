'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataSource = [{
  label: 'test 1'
}, {
  label: 'test 2',
  nodes: [{
    label: 'test 3'
  }]
}];

describe('collapseNode', function () {
  it('should return and have correct new collapsed state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource }));
    var newCollapsedState = wrapper.instance().collapseNode('1');
    var expected = { '1': true };

    expect(newCollapsedState).to.deep.equal(expected);
    expect(wrapper.state().collapsed).to.deep.equal(expected);
  });

  it('calls onCollapsedChange', function () {
    var onCollapsedChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, onCollapsedChange: onCollapsedChange }));
    wrapper.instance().collapseNode('1');
    expect(onCollapsedChange.called).to.be.true;
  });
});

describe('expandNode', function () {
  it('should return and have correct new collapsed state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, defaultCollapsed: { '1': true } }));

    expect(wrapper.state().collapsed).to.deep.equal({ '1': true });
    var newCollapsedState = wrapper.instance().expandNode('1');
    var expected = {};
    expect(newCollapsedState).to.deep.equal(expected);
    expect(wrapper.state().collapsed).to.deep.equal(expected);
  });

  it('calls onCollapsedChange', function () {
    var onCollapsedChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, onCollapsedChange: onCollapsedChange }));
    wrapper.instance().expandNode('1');
    expect(onCollapsedChange.called).to.be.true;
  });
});

describe('collapseAll', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: [] }));
  });

  it('should return correct new collapsed state', function () {
    wrapper.setProps({
      dataSource: dataSource
    });

    var newCollapsedState = wrapper.instance().collapseAll();
    var expected = {
      '0': true,
      '1': true,
      '1/0': true
    };

    expect(newCollapsedState).to.deep.equal(expected);
  });

  it('should update state with all nodes collapsed', function () {
    wrapper.setProps({
      dataSource: dataSource
    });

    var newCollapsedState = wrapper.instance().collapseAll();
    var expected = {
      '0': true,
      '1': true,
      '1/0': true
    };

    expect(wrapper.state().collapsed).to.deep.equal(expected);
  });

  it('calls onCollapsedChange', function () {
    var onCollapsedChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, onCollapsedChange: onCollapsedChange }));
    wrapper.instance().collapseAll('1');
    expect(onCollapsedChange.called).to.be.true;
  });
});

describe('expandAll', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, collapsed: { '0': true, '1': true } }));
  });

  it('should return correct new collapsed state', function () {
    var newCollapsedState = wrapper.instance().expandAll();
    var expected = {};

    expect(newCollapsedState).to.deep.equal(expected);
  });

  it('should update state with all nodes collapsed', function () {
    wrapper.setProps({
      dataSource: dataSource
    });

    var newCollapsedState = wrapper.instance().expandAll();
    var expected = {};

    expect(wrapper.state().collapsed).to.deep.equal(expected);
  });

  it('expands only nodes that are not async', function () {
    wrapper.setProps({
      isNodeAsync: function isNodeAsync(_ref) {
        var index = _ref.index;

        return index === 0;
      },
      loadNode: function loadNode() {},
      collapsed: null
    });

    var test = wrapper.instance().collapseAll();
    wrapper.instance().expandAll();

    expect(wrapper.state().collapsed).to.deep.equal({
      '1/0': true,
      '0': true
    });
  });

  it('calls onCollapsedChange', function () {
    var onCollapsedChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, onCollapsedChange: onCollapsedChange }));
    wrapper.instance().expandAll();
    expect(onCollapsedChange.called).to.be.true;
  });
});

describe('setCollapsed', function () {
  it('updates collapsed state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource }));
    var test = { 0: true };
    expect(wrapper.state().collapsed).to.not.deep.equal(test);
    wrapper.instance().setCollapsed(test);
    expect(wrapper.state().collapsed).to.deep.equal(test);
  });
  it('should call onCollapsedChange', function () {
    var onCollapsedChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, onCollapsedChange: onCollapsedChange }));
    wrapper.instance().setCollapsed({});
    expect(onCollapsedChange.called).to.be.true;
  });
});