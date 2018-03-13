'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

var _Icon = require('../../../common/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('maximize props', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { maximizable: true }));
  });

  describe('maximizable', function () {
    it("doesn't render maximize tool when false", function () {
      wrapper.setProps({ maximizable: false });
      var icon = wrapper.find('.zippy-react-toolkit-window__maximized-icon');
      expect(icon.length).toBe(0);
    });
    it('renders Icon when true', function () {
      var icon = wrapper.find('.zippy-react-toolkit-window__maximized-icon');
      expect(icon.length).toBeGreaterThan(0);
    });
  });

  describe('maximized and defaultMaximized', function () {
    it('should render maximize icon when is maximized false', function () {
      wrapper.setProps({ maximized: false });
      var icon = wrapper.find('.zippy-react-toolkit-window__maximized-icon');
      expect(icon.length).toBeGreaterThan(0);
    });
    it('should render restore icon when maximized is true', function () {
      wrapper.setProps({ maximized: true });
      var icon = wrapper.find('.zippy-react-toolkit-window__restore-icon');
      expect(icon.length).toBeGreaterThan(0);
    });
    it('should have --maximized className when true', function () {
      wrapper.setProps({ maximized: true });
      expect(wrapper.find('.' + ROOT_CLASS + '--maximized').length).toBeGreaterThan(0);
    });
    it('should not change state when setMaximized is called', function () {
      wrapper.setProps({ maximized: true });
      wrapper.instance().setMaximized(false);
      expect(wrapper.instance().getMaximized()).toBe(true);
    });
    it('getMaximized should return maximized state and not this.state.maximized', function () {
      wrapper.setProps({ maximized: true });
      wrapper.setState({ maximized: false });
      expect(wrapper.instance().getMaximized()).toBe(true);
    });
    it('uses defaultMaximized when maximized is not set', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { maximizable: true, defaultMaximized: true }));
      expect(wrapper.instance().getMaximized()).toBe(true);
    });
    it('should not set position and size props on style when true', function () {
      wrapper.setProps({
        maximized: true,
        size: { width: 100, height: 100 },
        position: { top: 100, left: 200 }
      });

      expect(wrapper.find('.' + ROOT_CLASS).props().style.top).toBe(undefined);
      expect(wrapper.find('.' + ROOT_CLASS).props().style.left).toBe(undefined);
      expect(wrapper.find('.' + ROOT_CLASS).props().style.width).toBe(undefined);
      expect(wrapper.find('.' + ROOT_CLASS).props().style.height).toBe(undefined);
    });
    it('should not render resize handles when it is maximized', function () {
      wrapper.setProps({ maximized: true });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).toHaveLength(0);
    });
  });

  describe('maximizeOnDoubleClick', function () {
    it('should trigger onMaximizeChange', function () {
      var onMaximizeChange = jest.fn();
      wrapper.setProps({ maximizeOnDoubleClick: true, onMaximizeChange: onMaximizeChange });
      wrapper.find('.' + ROOT_CLASS + '__title-bar').simulate('doubleClick');
      expect(onMaximizeChange).toHaveBeenCalled();
      expect(onMaximizeChange.mock.calls[0][0]).toBe(true);
    });
  });

  describe('maximizedIcon', function () {
    it('renders jsx', function () {
      wrapper.setProps({
        maximized: false,
        maximizeIcon: _react2.default.createElement('div', { id: 'maximizeicon' })
      });
      expect(wrapper.find('#maximizeicon')).toHaveLength(1);
    });
  });

  describe('restoreIcon', function () {
    it('renders jsx', function () {
      wrapper.setProps({
        maximized: true,
        restoreIcon: _react2.default.createElement('div', { id: 'restoreIcon' })
      });
      expect(wrapper.find('#restoreIcon')).toHaveLength(1);
    });
  });

  describe('events', function () {
    describe('onMaximizeChange', function () {
      it('should be called when setMaximized is called', function () {
        var onMaximizeChange = jest.fn();
        wrapper.setProps({ onMaximizeChange: onMaximizeChange });
        wrapper.instance().setMaximized(true);
        expect(onMaximizeChange).toHaveBeenCalled();
        expect(onMaximizeChange.mock.calls[0][0]).toBe(true);
      });
      it('should trigger onMaximizeChange when maximizeicon is clicked', function () {
        var onMaximizeChange = jest.fn();
        wrapper.setProps({ onMaximizeChange: onMaximizeChange, maximized: false });
        var icon = wrapper.find('.zippy-react-toolkit-window__maximized-icon').first();
        icon.simulate('click');
        expect(onMaximizeChange).toHaveBeenCalled();
      });
      it('should trigger onMaximizeChange when restoreIcon is clicked', function () {
        var onMaximizeChange = jest.fn();
        wrapper.setProps({ onMaximizeChange: onMaximizeChange, maximized: true });
        var restoreIcon = wrapper.find('.zippy-react-toolkit-window__restore-icon').first();
        restoreIcon.simulate('click');
        expect(onMaximizeChange).toHaveBeenCalledTimes(1);
      });
    });
    it('should call onMaximize when maximized changes from false to true', function () {
      var onMaximize = jest.fn();
      wrapper.setProps({
        onMaximize: onMaximize,
        maximized: false
      });
      expect(onMaximize).toHaveBeenCalledTimes(0);
      wrapper.instance().setMaximized(true);
      expect(onMaximize).toHaveBeenCalledTimes(1);
    });
    it('should call onRestore when maximized changes from true to false', function () {
      var onRestore = jest.fn();
      wrapper.setProps({
        onRestore: onRestore,
        maximized: true
      });
      expect(onRestore).toHaveBeenCalledTimes(0);
      wrapper.instance().setMaximized(false);
      expect(onRestore).toHaveBeenCalledTimes(1);
    });
  });
});