'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('resize hande props', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, null));
  });

  describe('showHandlesOnOver', function () {
    it('renders handles all the time when false', function () {
      wrapper.setProps({ showHandlesOnOver: false });
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).to.have.length(8);
    });

    it('renders handles only when it hovered', function () {
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).to.have.length(0);
      wrapper.setProps({ showHandlesOnOver: true });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).to.have.length(8);
    });
  });

  describe('renderResizeHandle', function () {
    it('should be called for each handle', function () {
      var renderResizeHandle = sinon.spy();
      wrapper.setProps({ renderResizeHandle: renderResizeHandle });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      // make sure
      expect(renderResizeHandle.args).to.have.length(8);
    });
    it('renders handles with mutated props', function () {
      var renderResizeHandle = function renderResizeHandle(domProps) {
        domProps.className = domProps.className + ' custom-handle-className';
      };
      wrapper.setProps({ renderResizeHandle: renderResizeHandle });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      expect(wrapper.find('.custom-handle-className')).to.have.length(8);
    });
    it('renders what it returns', function () {
      var renderResizeHandle = function renderResizeHandle(domProps) {
        return _react2.default.createElement('div', { className: 'customReturn' });
      };
      wrapper.setProps({ renderResizeHandle: renderResizeHandle });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');

      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).to.have.length(0);
      expect(wrapper.find('.customReturn')).to.have.length(8);
    });
  });

  describe('resizeHandles', function () {
    it('renders only specified handles', function () {
      wrapper.setProps({ resizeHandles: ['t', 'r'] });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).to.have.length(2);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle--t')).to.have.length(1);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle--r')).to.have.length(1);
    });
  });

  describe('handleWidth', function () {
    it('sets handle size', function () {
      wrapper.setProps({ resizable: true, handleWidth: 22 });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      expect(wrapper.find('.' + ROOT_CLASS + '__handle--l').first().props().style.width).to.equal(22);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle--t').first().props().style.height).to.equal(22);
    });
  });

  describe('handleStyle', function () {
    it('adds style on handlers', function () {
      wrapper.setProps({
        resizable: true,
        handleStyle: {
          color: 'blue'
        }
      });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');

      expect(wrapper.find('.' + ROOT_CLASS + '__handle').first().props().style.color).to.equal('blue');
    });
  });
});