'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _ExpandTool = require('../ExpandTool');

var _ExpandTool2 = _interopRequireDefault(_ExpandTool);

var _TreeView = require('../../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('disabled', function () {
  var wrapper = void 0;
  var label = void 0;
  var expandTool = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { disabled: true, hasChildren: true, node: { label: 'test' } }));
    label = wrapper.find('.' + CLASS_NAME + '__node__label');
    expandTool = wrapper.find(_ExpandTool2.default);
  });

  describe('onClick', function () {
    it('should not call onCollapsedChange', function () {
      var onCollapsedChange = sinon.spy();
      wrapper.setProps({ onCollapsedChange: onCollapsedChange });
      expandTool.simulate('click', { stopPropagation: function stopPropagation() {} });

      expect(onCollapsedChange.called).to.be.false;
    });

    it('should not call onSelectionChange', function () {
      var onSelectionChange = sinon.spy();
      wrapper.setProps({ onSelectionChange: onSelectionChange });
      label.simulate('click', { stopPropagation: function stopPropagation() {} });

      expect(onSelectionChange.called).to.be.false;
    });

    it('should not call onActiveNodeChange', function () {
      var onActiveNodeChange = sinon.spy();
      wrapper.setProps({ onActiveNodeChange: onActiveNodeChange });
      label.simulate('click', { stopPropagation: function stopPropagation() {} });

      expect(onActiveNodeChange.called).to.be.false;
    });
  });

  describe('doubleClick', function () {
    beforeEach(function () {
      wrapper.setProps({ expandOnDoubleClick: true });
    });

    describe('expander', function () {
      it('should not call onCollapsedChange', function () {
        var onCollapsedChange = sinon.spy();
        wrapper.setProps({ onCollapsedChange: onCollapsedChange });
        expandTool.simulate('doubleClick', { stopPropagation: function stopPropagation() {} });

        expect(onCollapsedChange.called).to.be.false;
      });
    });

    describe('label', function () {
      it('should not call onCollapsedChange', function () {
        var onCollapsedChange = sinon.spy();
        wrapper.setProps({ onCollapsedChange: onCollapsedChange });
        label.simulate('doubleClick', { stopPropagation: function stopPropagation() {} });

        expect(onCollapsedChange.called).to.be.false;
      });
    });
  });

  describe('checked', function () {
    it('should not trigger onCheckedChange', function () {
      var onCheckedChange = sinon.spy();

      wrapper.setProps({ onCheckedChange: onCheckedChange, enableChecked: true });
      var check = wrapper.find('.' + CLASS_NAME + '__node__check');
      check.simulate('click', { stopPropagation: function stopPropagation() {} });

      expect(onCheckedChange.called).to.be.false;
    });
  });
});