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
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).toHaveLength(8);
    });

    it('renders handles only when it hovered', function () {
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).toHaveLength(0);
      wrapper.setProps({ showHandlesOnOver: true });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).toHaveLength(8);
    });
  });

  describe('renderResizeHandle', function () {
    it('should be called for each handle', function () {
      var renderResizeHandle = jest.fn();
      wrapper.setProps({ renderResizeHandle: renderResizeHandle });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      // make sure
      expect(renderResizeHandle.mock.calls).toHaveLength(8);
    });
    xit('renders handles with mutated props', function (done) {
      var renderResizeHandle = function renderResizeHandle(domProps) {
        domProps.className = domProps.className + ' custom-handle-className';
      };
      wrapper.setProps({ renderResizeHandle: renderResizeHandle });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      setTimeout(function () {
        expect(wrapper.find('.custom-handle-className')).toHaveLength(8);
        done();
      }, 50);
    });
    it('renders what it returns', function () {
      var renderResizeHandle = function renderResizeHandle(domProps) {
        return _react2.default.createElement('div', { className: 'customReturn' });
      };
      wrapper.setProps({ renderResizeHandle: renderResizeHandle });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');

      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).toHaveLength(0);
      expect(wrapper.find('.customReturn')).toHaveLength(8);
    });
  });

  describe('resizeHandles', function () {
    it('renders only specified handles', function () {
      wrapper.setProps({ resizeHandles: ['t', 'r'] });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).toHaveLength(2);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle--t')).toHaveLength(1);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle--r')).toHaveLength(1);
    });
  });

  describe('handleWidth', function () {
    it('sets handle size', function () {
      wrapper.setProps({ resizable: true, handleWidth: 22 });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      expect(wrapper.find('.' + ROOT_CLASS + '__handle--l').first().props().style.width).toEqual(22);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle--t').first().props().style.height).toEqual(22);
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

      expect(wrapper.find('.' + ROOT_CLASS + '__handle').first().props().style.color).toEqual('blue');
    });
  });
});