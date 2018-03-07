'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('methods', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, null));
  });

  describe('maximize', function () {
    it('updates maximized state', function () {
      wrapper.setProps({ maximizable: true });
      expect(wrapper.instance().getMaximized()).toBe(false);
      wrapper.instance().maximize();
      expect(wrapper.instance().getMaximized()).toBe(true);
    });
    it('calls onMaximize change', function () {
      var onMaximizeChange = jest.fn();
      wrapper.setProps({ maximizable: true, onMaximizeChange: onMaximizeChange });
      expect(onMaximizeChange).toHaveBeenCalledTimes(0);
      wrapper.instance().maximize();
      expect(onMaximizeChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('restore', function () {
    it('updates maximized state', function () {
      wrapper.setState({ maximized: true });
      wrapper.setProps({ maximizable: true });
      expect(wrapper.instance().getMaximized()).toBe(true);
      wrapper.instance().restore();
      expect(wrapper.instance().getMaximized()).toBe(false);
    });
    it('calls onMaximize change', function () {
      var onMaximizeChange = jest.fn();
      wrapper.setProps({ maximizable: true, onMaximizeChange: onMaximizeChange });
      expect(onMaximizeChange).toHaveBeenCalledTimes(0);
      wrapper.instance().restore();
      expect(onMaximizeChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('center', function () {
    it('should trigger onCenteredChange', function () {
      var onCenteredChange = jest.fn();
      wrapper.setProps({ onCenteredChange: onCenteredChange });
      wrapper.instance().center();
      expect(onCenteredChange).toHaveBeenCalled();
    });
    it('should change state', function () {
      wrapper.instance().center();
      expect(wrapper.instance().getCentered()).toBe(true);
    });
  });
});