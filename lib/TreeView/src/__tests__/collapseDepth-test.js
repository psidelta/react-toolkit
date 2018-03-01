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

var NESTED_DATA_STRUCTURE = [{ label: 'test 1' }, {
  label: 'test 2',
  nodes: [{ label: 'test 3' }, { label: 'test 4' }, { label: 'test 5' }]
}];

var NESTED_DATA_STRUCTURE_3_LEVELS = [{ label: 'test 1' }, {
  label: 'test 2',
  nodes: [{ label: 'test 3' }, { label: 'test 4' }, {
    label: 'test 5',
    nodes: [{ label: 'test 6' }, { label: 'test 7' }, { label: 'test 8' }]
  }]
}];

describe('collapseDepth props', function () {
  describe('collapseDepth', function () {
    it('should nodes have a correct depth prop', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));
      expect(wrapper.find(_Node2.default).first().props().depth).to.equal(0);
      expect(wrapper.find(_Node2.default).last().props().depth).to.equal(1);
    });

    it('has all node collapsed on collapseDepth=0', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE, collapsedDepth: 0 }));
      expect(wrapper.find(_Node2.default)).to.have.length(2);
    });

    it('has expanded only first two levels collapseDepth=1', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: NESTED_DATA_STRUCTURE_3_LEVELS,
        collapsedDepth: 1
      }));

      expect(wrapper.find(_Node2.default)).to.have.length(5);
    });

    it('collapsedDepth=0, if node changes collapse state should update correct', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        dataSource: NESTED_DATA_STRUCTURE_3_LEVELS,
        collapsedDepth: 0
      }));

      wrapper.instance().expandNode('1');
      var test = {
        '0': true,
        '1/0': true,
        '1/1': true,
        '1/2': true,
        '1/2/0': true,
        '1/2/1': true,
        '1/2/2': true
      };

      expect(wrapper.state().collapsed).to.deep.equal(test);
    });

    it('should have no effect if selected is controlled or uncontrolled', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        dataSource: NESTED_DATA_STRUCTURE_3_LEVELS,
        collapsedDepth: 1,
        defaultCollapsed: { '0': true }
      }));

      expect(wrapper.find(_Node2.default).first().props().collapsed).to.be.true;

      wrapper.setProps({ collapsed: { 1: true } });
      expect(wrapper.find(_Node2.default).at(1).props().collapsed).to.be.true;
    });
  });

  describe('defaultCollapsedDepth', function () {
    it('defaults to undefined', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));
      expect(wrapper.props.collapsedDepth).to.be.falsy;
    });

    it('should be used as initial this.state.collapsedDepth', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        defaultCollapsedDepth: 1,
        dataSource: NESTED_DATA_STRUCTURE
      }));
      expect(wrapper.state().collapsedDepth).to.be.equal(1);
    });

    it('should transition state to null when a node is collapsed', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        defaultCollapsedDepth: 1,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      wrapper.instance().expandNode('0');
      expect(wrapper.state().collapsedDepth).to.be.null;
    });

    it('defaultCollapsedDepth=0, if node changes collapse state should update correct', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        dataSource: NESTED_DATA_STRUCTURE_3_LEVELS,
        defaultCollapsedDepth: 0
      }));

      wrapper.instance().expandNode('1');
      var test = {
        '0': true,
        '1/0': true,
        '1/1': true,
        '1/2': true,
        '1/2/0': true,
        '1/2/1': true,
        '1/2/2': true
      };

      expect(wrapper.state().collapsed).to.deep.equal(test);
    });
  });

  describe('onCollapsedDepthChange', function () {
    it('should be called with null when collapse changes', function () {
      var onCollapsedDepthChange = sinon.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        collapsedDepth: 0,
        dataSource: NESTED_DATA_STRUCTURE_3_LEVELS,
        onCollapsedDepthChange: onCollapsedDepthChange
      }));

      wrapper.instance().collapseNode('0');
      expect(onCollapsedDepthChange.args[0][0]).to.be.null;
    });
  });
});