'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Slider = require('../../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _RangeSlider = require('../../RangeSlider');

var _RangeSlider2 = _interopRequireDefault(_RangeSlider);

var _handlers = require('../../utils/sub-components/handlers');

var _handlers2 = _interopRequireDefault(_handlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('handle rendering', function () {
  var renderHandleStub = void 0;

  beforeEach(function () {
    renderHandleStub = jest.fn(function () {
      return _react2.default.createElement('div', { key: Math.round(Math.random() * 100) });
    });
  });

  it('should propagate the proper props to the handle render function in slide', function () {
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { renderHandle: renderHandleStub }));
    expect(renderHandleStub).toHaveBeenCalledTimes(1);

    var callbackArgs = renderHandleStub.mock.calls[0];

    expect(callbackArgs).toHaveLength(3);

    var _callbackArgs = _slicedToArray(callbackArgs, 3),
        config = _callbackArgs[0],
        extraProps = _callbackArgs[1],
        CLASS_NAME = _callbackArgs[2];

    expect(config).toHaveProperty('renderHandleContent');
    expect(config).toHaveProperty('renderTooltip');
    expect(config).toHaveProperty('dragging');
    expect(config).toHaveProperty('orientation');
    expect(config).toHaveProperty('horizontal');
    expect(config).toHaveProperty('currentValue');
    expect(config).toHaveProperty('handleSize');
    expect(config).toHaveProperty('handleStyle');
  });

  it('should propagate the proper props to the handle render function in range', function () {
    var rangeSlider = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { renderHandle: renderHandleStub }));
    expect(renderHandleStub).toHaveBeenCalledTimes(2);

    var callbackArgs = renderHandleStub.mock.calls[0];

    expect(callbackArgs).toHaveLength(3);

    var _callbackArgs2 = _slicedToArray(callbackArgs, 3),
        config = _callbackArgs2[0],
        extraProps = _callbackArgs2[1],
        CLASS_NAME = _callbackArgs2[2];

    expect(config).toHaveProperty('renderHandleContent');
    expect(config).toHaveProperty('renderTooltip');
    expect(config).toHaveProperty('dragging');
    expect(config).toHaveProperty('orientation');
    expect(config).toHaveProperty('horizontal');
    expect(config).toHaveProperty('currentValue');
    expect(config).toHaveProperty('handleSize');
    expect(config).toHaveProperty('handleStyle');
  });
});

describe('tooltip rendering', function () {
  var shouldShowTooltipStub = void 0;

  beforeEach(function () {
    shouldShowTooltipStub = jest.fn(function () {
      return true;
    });
  });

  it('should call shouldShowTooltip when getting props', function () {
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { shouldShowTooltip: shouldShowTooltipStub }));
    expect(shouldShowTooltipStub).toHaveBeenCalledTimes(1);
  });

  it('should propagate the proper props to tooltip render function', function () {
    var rangeSlider = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { shouldShowTooltip: shouldShowTooltipStub }));
    expect(shouldShowTooltipStub).toHaveBeenCalledTimes(1);
  });

  it('renderHandle should call renderTooltip with proper props', function () {
    var renderTooltipSpy = jest.fn(function () {
      return _react2.default.createElement('div', null);
    });

    (0, _handlers2.default)({
      renderTooltip: renderTooltipSpy,
      renderHandleContent: function renderHandleContent() {
        return _react2.default.createElement('div', null);
      },
      renderTooltipContent: function renderTooltipContent() {
        return _react2.default.createElement('div', null);
      },
      orientation: 'vertical',
      currentValue: 1,
      handleSize: { width: 20, height: 20 },
      handleStyle: {},
      tooltipPosition: 'before'
    }, {
      setHandleRef: function setHandleRef() {
        return true;
      },
      visibleTooltip: false
    });

    expect(renderTooltipSpy).toHaveBeenCalledTimes(1);

    var args = renderTooltipSpy.mock.calls[0]; //.args;
    expect(args).toHaveLength(3);

    var _args = _slicedToArray(args, 3),
        config = _args[0],
        extraProps = _args[1],
        CLASS_NAME = _args[2];

    expect(config).toHaveProperty('renderTooltipContent');
    expect(config).toHaveProperty('orientation');
    expect(config).toHaveProperty('tooltipPosition');

    expect(extraProps).toHaveProperty('visibleTooltip');
  });
});