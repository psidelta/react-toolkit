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

describe('collapsed props', function () {
  describe('defaultCollapsed', function () {
    it('should default to empty object', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));
      expect(wrapper.state().collapsed).toEqual({});
    });

    it('should be used as initial state', function () {
      var defaultCollapsed = { 0: true };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        defaultCollapsed: defaultCollapsed,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      expect(wrapper.state().collapsed).toEqual(defaultCollapsed);
    });
  });

  describe('collapsed', function () {
    it('should not update this.state.collapsed', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { collapsed: {}, dataSource: NESTED_DATA_STRUCTURE }));
      wrapper.instance().collapseNode('0');

      expect(wrapper.state().collapsed).toEqual({});
    });

    it('should use correct collapsed state', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        collapsed: { '3': true },
        defaultCollapsed: { '1': true, '2': true },
        dataSource: NESTED_DATA_STRUCTURE
      }));

      expect(wrapper.instance().getCurrentCollapsedState()).toEqual({
        '3': true
      });
    });
  });

  describe('isNodeCollapsed', function () {
    it('should be called with correct props', function () {
      var isNodeCollapsed = jest.fn();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        isNodeCollapsed: isNodeCollapsed,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      expect(isNodeCollapsed).toHaveBeenCalled();
    });

    it('should overwrite controlled or uncontrolled collapsed', function () {
      var isNodeCollapsed = function isNodeCollapsed() {
        return true;
      };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        collapsed: { '0': false, '1': true },
        isNodeCollapsed: isNodeCollapsed,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      expect(wrapper.find(_Node2.default).first().props().collapsed).toBe(true);
    });

    it('should take into account isNodeCollapsed state when collapse changes', function () {
      var isNodeCollapsed = function isNodeCollapsed() {
        return true;
      };
      var onCollapsedChange = jest.fn();

      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        collapsed: { '0': false, '1': false },
        isNodeCollapsed: isNodeCollapsed,
        dataSource: NESTED_DATA_STRUCTURE,
        onCollapsedChange: onCollapsedChange
      }));

      wrapper.instance().expandNode('0');
      window.onCollapsedChange = onCollapsedChange;
      expect(onCollapsedChange.mock.calls[0][0].collapsedMap).toEqual({
        '1': true,
        '1/0': true,
        '1/1': true,
        '1/2': true
      });
    });
  });
});