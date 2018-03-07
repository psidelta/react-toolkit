'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Slider = require('../../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _RangeSlider = require('../../RangeSlider');

var _RangeSlider2 = _interopRequireDefault(_RangeSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var incrementEvent = {
  deltaY: -1,
  preventDefault: function preventDefault() {},
  stopPropagation: function stopPropagation() {}
};

var decrementEvent = {
  deltaY: 1,
  preventDefault: function preventDefault() {},
  stopPropagation: function stopPropagation() {}
};

describe('wheel interaction events', function () {
  describe('Slider', function () {
    it('should increment/decrement', function () {
      var onChangeSpy = jest.fn();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { defaultValue: 50, onChange: onChangeSpy }));

      component.instance().handleWheel(incrementEvent);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual(51);

      component.instance().handleWheel(decrementEvent);
      component.instance().handleWheel(decrementEvent);

      expect(onChangeSpy).toHaveBeenCalledTimes(3);
      expect(onChangeSpy.mock.calls[2][0]).toEqual(49);
    });
  });

  describe('RangeSlider', function () {
    it('should increment/decrement left value', function () {
      var onChangeSpy = jest.fn();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: [40, 50], onChange: onChangeSpy }));

      component.setState({
        startHandleFocused: true
      });

      component.instance().handleWheel(incrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual([41, 50]);

      component.instance().handleWheel(decrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy.mock.calls[1][0]).toEqual([39, 50]);
    });

    it('should increment/decrement right value', function () {
      var onChangeSpy = jest.fn();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: [40, 50], onChange: onChangeSpy }));

      component.setState({
        endHandleFocused: true
      });

      component.instance().handleWheel(incrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual([40, 51]);

      component.instance().handleWheel(decrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy.mock.calls[1][0]).toEqual([40, 49]);
    });

    it('should shift entire range when focusing track fill', function () {
      var onChangeSpy = jest.fn();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: [40, 50], onChange: onChangeSpy }));

      component.setState({
        trackFillFocused: true
      });

      component.instance().handleWheel(incrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual([41, 51]);

      component.instance().handleWheel(decrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy.mock.calls[1][0]).toEqual([39, 49]);
    });
  });
});