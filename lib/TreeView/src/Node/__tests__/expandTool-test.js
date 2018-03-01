'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ExpandTool = require('../ExpandTool');

var _ExpandTool2 = _interopRequireDefault(_ExpandTool);

var _Node = require('../../Node');

var _Node2 = _interopRequireDefault(_Node);

var _TreeView = require('../../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('expandTool', function () {
  describe('default', function () {
    it('should render default expand component', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { hasChildren: true }));
      expect(wrapper.find(_ExpandTool2.default)).to.have.length(1);
    });
  });

  describe('jsx', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { hasChildren: true, expandTool: _react2.default.createElement('div', { id: 'custom_expander' }) }));

    it('shoud render custom expander', function () {
      var test = wrapper.find('#custom_expander');
      expect(test).to.have.length(1);
    });

    it('should not render default expand tool', function () {
      expect(wrapper.find(_ExpandTool2.default)).to.have.length(0);
    });

    it('should have ' + CLASS_NAME + '__node__expander and --collapsed classNames', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { hasChildren: true, expandTool: _react2.default.createElement('div', { id: 'custom_expander' }) }));
      var test = wrapper.find('#custom_expander');
      expect(test.hasClass(CLASS_NAME + '__node__expander')).to.be.true;
      wrapper.setProps({ collapsed: true });
      expect(test.hasClass(CLASS_NAME + '__node__expander--collapsed')).to.be.true;
    });
  });

  describe('function', function () {
    it('should be callsed', function () {
      var expandTool = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { hasChildren: true, expandTool: expandTool }));
      expect(expandTool.called).to.be.true;
    });

    it('should be callsed with correct params', function () {
      var expandTool = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { hasChildren: true, expandTool: expandTool }));
      expect(expandTool.args[0][0].domProps.onClick).to.be.a('function');
      expect(expandTool.args[0][0].domProps.className).to.be.a('string');
    });

    it('should render what it returns', function () {
      var expandTool = function expandTool(_ref) {
        var domProps = _ref.domProps,
            nodeProps = _ref.nodeProps;

        return _react2.default.createElement('div', _extends({}, domProps, { id: 'custom_expander' }));
      };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { hasChildren: true, expandTool: expandTool }));
      var test = wrapper.find('#custom_expander');
      expect(test).to.have.length(1);
      expect(test.hasClass(CLASS_NAME + '__node__expander')).to.be.true;
      expect(test.hasClass(CLASS_NAME + '__node__expander--collapsed')).to.be.false;
      wrapper.setProps({ collapsed: true });
      expect(test.hasClass(CLASS_NAME + '__node__expander--collapsed')).to.be.true;
    });
  });

  describe('string', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { hasChildren: true, expandTool: 'test' }));
    var test = wrapper.find(_ExpandTool2.default);

    it('should render', function () {
      expect(test).to.have.length(1);
    });

    it('should render the string', function () {
      expect(test.props().children).to.equal('test');
    });

    it('should have the correct className', function () {
      expect(test.hasClass(CLASS_NAME + '__node__expander'));
    });

    it('should have the correct --collapsed className', function () {
      wrapper.setProps({ collapsed: true });
      expect(test.hasClass(CLASS_NAME + '__node__expander--collapsed'));
    });
  });
});