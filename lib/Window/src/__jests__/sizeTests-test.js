'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('size', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, null));
  });

  describe('resizable bool', function () {
    it('adds --resizable classname', function () {
      wrapper.setProps({ resizable: true });
      expect(wrapper.find('.' + ROOT_CLASS + '--resizable').length).toBeGreaterThan(0);
    });
    it("false doen't render any resize handlers", function () {
      wrapper.setProps({ resizable: false });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).toHaveLength(0);
    });
  });

  describe('resizable object', function () {
    it('renders only left right handles when restricted to width', function () {
      wrapper.setProps({
        resizable: {
          width: true
        }
      });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');

      expect(wrapper.find('.' + ROOT_CLASS + '__handle--l')).toHaveLength(1);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle--r')).toHaveLength(1);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).toHaveLength(2);
    });
    it('renders only top bottom handles when restricted to height', function () {
      wrapper.setProps({
        resizable: {
          height: true
        }
      });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');

      expect(wrapper.find('.' + ROOT_CLASS + '__handle--t')).toHaveLength(1);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle--b')).toHaveLength(1);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).toHaveLength(2);
    });
    it('takes into account resizeHandles', function () {
      wrapper.setProps({
        resizable: {
          width: true
        },
        resizeHandles: ['l']
      });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');

      expect(wrapper.find('.' + ROOT_CLASS + '__handle--l')).toHaveLength(1);
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).toHaveLength(1);
    });
  });

  describe('size constroled and uncontroled', function () {
    it('adds width and height on style', function () {
      wrapper.setProps({
        size: {
          width: 120,
          height: 220
        }
      });
      expect(wrapper.find('.' + ROOT_CLASS).first().props().style.width).toEqual(120);
      expect(wrapper.find('.' + ROOT_CLASS).first().props().style.height).toEqual(220);
    });
    it('size overwrites uncontrolled size', function () {
      wrapper.setProps({ size: { width: 20 } });
      wrapper.setState({ size: { width: 10 } });
      expect(wrapper.instance().getSize().width).toEqual(20);
    });
    it('defaults to defaultSize when size is not set', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { defaultSize: { width: '30%' } }));
      expect(wrapper.instance().getSize().width).toEqual('30%');
    });
  });
});