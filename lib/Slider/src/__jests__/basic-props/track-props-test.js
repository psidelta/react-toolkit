'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Slider = require('../../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('trackFillPosition prop (Slider only)', function () {
  it('should propagate trackFillPosition to renderTrack function', function () {
    var renderTrackSpy = jest.fn(function () {
      return _react2.default.createElement('div', { key: 'spy' });
    });
    var sliderComponent = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { renderTrack: renderTrackSpy, trackFillPosition: 'start' }));

    expect(renderTrackSpy.mock.calls[0][0]).toHaveProperty('trackFillPosition', 'start');

    sliderComponent.setProps({
      trackFillPosition: 'end'
    });

    expect(renderTrackSpy.mock.calls[1][0]).toHaveProperty('trackFillPosition', 'end');
  });
});