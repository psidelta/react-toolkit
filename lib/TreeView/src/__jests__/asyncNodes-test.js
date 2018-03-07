'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('async nodes', function () {
  it('calls loadNode when a node is expanded', function () {
    var loadNode = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: [{ label: 'test', async: true, nodes: [] }],
      collapsed: { '0': true },
      loadNode: loadNode
    }));

    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({
      stopPropagation: function stopPropagation() {}
    });
    expect(loadNode).toHaveBeenCalled();
  });

  it('loadNode should update dataSource', function () {
    var asyncNodes = [{ label: 'async loaded' }];
    var loadNode = function loadNode() {
      return asyncNodes;
    };

    var dataSource = [{
      label: 'test loadNode',
      async: true,
      nodes: []
    }];

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: dataSource,
      collapsed: { '0': true },
      loadNode: loadNode,
      isNodeAsync: function isNodeAsync() {
        return true;
      }
    }));

    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({
      stopPropagation: function stopPropagation() {}
    });

    expect(wrapper.state().data[0].nodes).toEqual(asyncNodes);
  });

  it('should work with a promise', function (done) {
    var asyncNodes = [{ label: 'async loaded' }];
    var loadNode = function loadNode(_ref) {
      var path = _ref.path,
          node = _ref.node;

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(asyncNodes);
        }, 50);
      });
    };
    var dataSource = [{
      label: 'test loadNode',
      async: true,
      nodes: []
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: dataSource,
      collapsed: { '0': true },
      loadNode: loadNode,
      isNodeAsync: function isNodeAsync() {
        return true;
      }
    }));

    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({
      stopPropagation: function stopPropagation() {}
    });

    setTimeout(function () {
      var test = wrapper.state().data[0].nodes;
      expect(test).toEqual(asyncNodes);

      done();
    }, 100);
  });

  it('should update nodeLoading with the corret node, if it returns a promise', function (done) {
    var dataSource = [{
      label: 'test loadNode',
      async: true,
      nodes: []
    }];

    var loadNode = function loadNode() {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(null);
        }, 50);
      });
    };

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: dataSource,
      collapsed: { '0': true },
      loadNode: loadNode,
      isNodeAsync: function isNodeAsync() {
        return true;
      }
    }));

    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({
      stopPropagation: function stopPropagation() {}
    });

    expect(wrapper.state().nodesLoading['0']).toBe(true);
    // expect(
    //   wrapper
    //     .find(Node)
    //     .first()
    //     .props().loading
    // ).toBe(true);

    setTimeout(function () {
      expect(wrapper.state().nodesLoading['0']).toBe(false);
      done();
    }, 150);
  });

  it('should be called every time a node is expanded', function () {
    var loadNode = jest.fn();
    var dataSource = [{
      label: 'test loadNode',
      async: true,
      nodes: []
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: dataSource,
      collapsed: { '0': true },
      loadNode: loadNode
    }));

    // it is called every time because
    // collapsed is controlled and it doesn't really change state
    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });
    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });
    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });

    expect(loadNode).toHaveBeenCalledTimes(3);
  });

  it('should call loadNondeOnce', function () {
    var loadNodeOnce = jest.fn();
    var dataSource = [{
      label: 'test loadNodeOnce',
      nodes: null
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: dataSource,
      collapsed: { '0': true },
      loadNodeOnce: loadNodeOnce
    }));

    // it is called every time because
    // collapsed is controlled and it doesn't really change state
    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });
    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });
    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });

    expect(loadNodeOnce).toHaveBeenCalledTimes(1);
  });

  it('should call loadNondeOnce first time and the folowing expand change loadNode', function () {
    var loadNode = jest.fn();
    var loadNodeOnce = jest.fn();

    var dataSource = [{
      label: 'test loadNode',
      nodes: null
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: dataSource,
      collapsed: { '0': true },
      loadNode: loadNode,
      loadNodeOnce: loadNodeOnce
    }));

    // it is called every time because
    // collapsed is controlled and it doesn't really change state
    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });

    expect(loadNode).toHaveBeenCalledTimes(0);
    expect(loadNodeOnce).toHaveBeenCalledTimes(1);

    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });
    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });

    expect(loadNode).toHaveBeenCalledTimes(2);
    expect(loadNodeOnce).toHaveBeenCalledTimes(1);
  });

  it("removes loader and nodes don't change if promise is rejected", function (done) {
    var loadNode = function loadNode() {
      return new Promise(function (_, reject) {
        setTimeout(function () {
          reject(null);
        }, 50);
      });
    };
    var nodes = [];
    var dataSource = [{
      label: 'test loadNode',
      nodes: nodes
    }];

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: dataSource,
      collapsed: { '0': true },
      loadNode: loadNode
    }));

    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });
    expect(wrapper.state().nodesLoading[0]).toBe(true);
    setTimeout(function () {
      expect(wrapper.state().nodesLoading[0]).toBe(false);
      expect(wrapper.state().data[0].nodes).toEqual(nodes);
      done();
    }, 100);
  });

  it('calls onNodeLoad when promise is resolved', function (done) {
    var loadNode = function loadNode() {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(null);
        }, 50);
      });
    };
    var onNodeLoad = jest.fn();
    var nodes = [];
    var dataSource = [{
      label: 'test loadNode',
      async: true,
      nodes: nodes
    }];

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      dataSource: dataSource,
      collapsed: { '0': true },
      loadNode: loadNode,
      onNodeLoad: onNodeLoad,
      isNodeAsync: function isNodeAsync() {
        return true;
      }
    }));

    wrapper.find(_Node2.default).at(0).instance().onExpanderClick({ stopPropagation: function stopPropagation() {} });

    expect(onNodeLoad).toHaveBeenCalledTimes(0);
    setTimeout(function () {
      expect(onNodeLoad).toHaveBeenCalledTimes(1);
      done();
    }, 100);
  });

  it('should not call isNodeAsync if loadNode or loadNodeOnce is not defined', function () {
    var isNodeAsync = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      dataSource: [{ label: 'test' }],
      isNodeAsync: isNodeAsync,
      defaultCollapsed: { '0': true }
    }));

    wrapper.instance().expandNode('0');
    expect(isNodeAsync).toHaveBeenCalledTimes(0);
  });

  it('should call isNodeAsync if loadNode or loadNodeOnce is defined', function () {
    var isNodeAsync = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      isNodeAsync: isNodeAsync,
      defaultCollapsed: { '0': true },
      dataSource: [{ label: 'test' }],
      loadNode: function loadNode(_ref2) {
        var node = _ref2.node;
        return node.nodes;
      }
    }));

    wrapper.instance().expandNode('0');
    expect(isNodeAsync).toHaveBeenCalled();
  });

  it('should have on props async if node.async is true', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      dataSource: [{ label: 'test', async: true }],
      loadNode: function loadNode() {}
    }));

    expect(wrapper.find(_Node2.default).first().props().async).toBe(true);
  });

  it('should have on props what isNodeAsync returns and should overwrite node.async', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      dataSource: [{ label: 'test', async: false }],
      isNodeAsync: function isNodeAsync() {
        return true;
      },
      loadNode: function loadNode() {}
    }));

    expect(wrapper.find(_Node2.default).first().props().async).toBe(true);
  });

  it('should consider a node to have children if the node is async', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      dataSource: [{ label: 'test', async: true }],
      defaultCollapsed: { '0': true },
      loadNode: function loadNode(_ref3) {
        var node = _ref3.node;
        return node.nodes;
      }
    }));

    expect(wrapper.find(_Node2.default).first().props().hasChildren).toBe(true);
  });

  it('should call loadNode/loadNodeOnce only on node that is async', function () {
    var loadNode = jest.fn();
    var loadNodeOnce = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      loadNode: loadNode,
      loadNodeOnce: loadNodeOnce,
      isNodeAsync: function isNodeAsync() {
        return false;
      },
      dataSource: [{ label: 'test' }]
    }));

    wrapper.instance().expandNode('0');
    wrapper.instance().expandNode('0');
    expect(loadNode).toHaveBeenCalledTimes(0);
    expect(loadNodeOnce).toHaveBeenCalledTimes(0);
  });

  it('if loadNode is defined, all nodes are async, and overwrites loadAsyncNode', function () {
    var loadNode = jest.fn();
    var loadNodeOnce = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      loadNode: loadNode,
      loadNodeOnce: loadNodeOnce,
      dataSource: [{
        label: 'test',
        nodes: [{ label: 'test' }]
      }]
    }));

    expect(wrapper.find(_Node2.default).first().props().async).toBe(true);
    expect(wrapper.find(_Node2.default).at(1).props().async).toBe(true);
  });

  xit('should consider node async only if node.nodes === null when loadNodeOnce is specified and loadNode is not', function () {
    var loadNode = jest.fn();
    var loadNodeOnce = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
      loadNode: loadNode,
      loadNodeOnce: loadNodeOnce,
      dataSource: [{
        label: 'test',
        nodes: [{
          label: 'test',
          nodes: null
        }]
      }]
    }));

    var firstNode = wrapper.find(_Node2.default).at(0);

    console.log(firstNode.props());
    expect(firstNode.props().async).toBe(false);
    expect(wrapper.find(_Node2.default).at(1).props().async).toBe(true);
  });
});