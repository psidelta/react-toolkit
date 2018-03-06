'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Slider = require('../../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _RangeSlider = require('../../RangeSlider');

var _RangeSlider2 = _interopRequireDefault(_RangeSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('defaultValue prop', function () {
  it('should support instance without default value', function () {
    var sliderComponent = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, null));
    var rangeComponent = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, null));

    expect(sliderComponent.instance()).to.be.instanceOf(_Slider2.default);
    expect(rangeComponent.instance()).to.be.instanceOf(_RangeSlider2.default);
  });

  it('should set default value to slider', function () {
    var DEFAULT_VALUE = 30;
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { defaultValue: DEFAULT_VALUE }));

    expect(component.state('value')).to.equal(DEFAULT_VALUE);
  });

  it('should set default value to range slider', function () {
    var DEFAULT_VALUE = [30, 40];
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: DEFAULT_VALUE }));

    expect(component.state('value')).to.equal(DEFAULT_VALUE);
  });

  it('should set default value to reversed range slider', function () {
    var DEFAULT_VALUE = [40, 50];
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { startValue: 100, endValue: 0, defaultValue: DEFAULT_VALUE }));

    expect(component.state('value')).to.equal(DEFAULT_VALUE);
    expect(component.instance().p.currentValue).toEqual([50, 40]);
  });

  it('should convert default value to value respecting min and max constraints', function () {
    var DEFAULT_VALUE_1 = [40, 50];
    var DEFAULT_VALUE_2 = [10, 100];
    var component = void 0;

    component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { minRange: 30, defaultValue: DEFAULT_VALUE_1 }));
    expect(component.instance().p.currentValue).toEqual([40, 70]);

    component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { maxRange: 30, defaultValue: DEFAULT_VALUE_2 }));
    expect(component.instance().p.currentValue).toEqual([10, 40]);
  });
});