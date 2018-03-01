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
    renderHandleStub = sinon.stub().returns(_react2.default.createElement('div', { key: Math.round(Math.random() * 100) }));
  });

  it('should propagate the proper props to the handle render function in slide', function () {
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { renderHandle: renderHandleStub }));
    expect(renderHandleStub).to.have.been.calledOnce;

    var callbackArgs = renderHandleStub.getCall(0).args;

    expect(callbackArgs).to.have.length(3);

    var _callbackArgs = _slicedToArray(callbackArgs, 3),
        config = _callbackArgs[0],
        extraProps = _callbackArgs[1],
        CLASS_NAME = _callbackArgs[2];

    expect(config).to.have.property('renderHandleContent');
    expect(config).to.have.property('renderTooltip');
    expect(config).to.have.property('dragging');
    expect(config).to.have.property('orientation');
    expect(config).to.have.property('horizontal');
    expect(config).to.have.property('currentValue');
    expect(config).to.have.property('handleSize');
    expect(config).to.have.property('handleStyle');
  });

  it('should propagate the proper props to the handle render function in range', function () {
    var rangeSlider = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { renderHandle: renderHandleStub }));
    expect(renderHandleStub).to.have.been.calledTwice;

    var callbackArgs = renderHandleStub.getCall(0).args;

    expect(callbackArgs).to.have.length(3);

    var _callbackArgs2 = _slicedToArray(callbackArgs, 3),
        config = _callbackArgs2[0],
        extraProps = _callbackArgs2[1],
        CLASS_NAME = _callbackArgs2[2];

    expect(config).to.have.property('renderHandleContent');
    expect(config).to.have.property('renderTooltip');
    expect(config).to.have.property('dragging');
    expect(config).to.have.property('orientation');
    expect(config).to.have.property('horizontal');
    expect(config).to.have.property('currentValue');
    expect(config).to.have.property('handleSize');
    expect(config).to.have.property('handleStyle');
  });
});

describe('tooltip rendering', function () {
  var shouldShowTooltipStub = void 0;

  beforeEach(function () {
    shouldShowTooltipStub = sinon.stub().returns(true);
  });

  it('should call shouldShowTooltip when getting props', function () {
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { shouldShowTooltip: shouldShowTooltipStub }));
    expect(shouldShowTooltipStub).to.have.been.calledOnce;
  });

  it('should propagate the proper props to tooltip render function', function () {
    var rangeSlider = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { shouldShowTooltip: shouldShowTooltipStub }));
    expect(shouldShowTooltipStub).to.have.been.calledOnce;
  });

  it('renderHandle should call renderTooltip with proper props', function () {
    var renderTooltipSpy = sinon.spy(function () {
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

    expect(renderTooltipSpy).to.have.been.calledOnce;
    var args = renderTooltipSpy.getCall(0).args;
    expect(args).to.have.length(3);

    var _args = _slicedToArray(args, 3),
        config = _args[0],
        extraProps = _args[1],
        CLASS_NAME = _args[2];

    expect(config).to.have.property('renderTooltipContent');
    expect(config).to.have.property('orientation');
    expect(config).to.have.property('tooltipPosition');

    expect(extraProps).to.have.property('visibleTooltip');
  });
});