'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _Field = require('../../Field');

var _Field2 = _interopRequireDefault(_Field);

var _autoBind = require('@zippytech/react-class/autoBind');

var _autoBind2 = _interopRequireDefault(_autoBind);

var _raf = require('../../common/raf');

var _raf2 = _interopRequireDefault(_raf);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _hasTouch = require('@zippytech/has-touch');

var _hasTouch2 = _interopRequireDefault(_hasTouch);

var _eventNames = require('../../common/eventNames');

var _eventNames2 = _interopRequireDefault(_eventNames);

var _getSelectionRange = require('./utils/get-selection-range');

var _getSelectionRange2 = _interopRequireDefault(_getSelectionRange);

var _setCaretPosition = require('./utils/set-caret-position');

var _setCaretPosition2 = _interopRequireDefault(_setCaretPosition);

var _getDecimalDelimiter = require('./utils/get-decimal-delimiter');

var _getDecimalDelimiter2 = _interopRequireDefault(_getDecimalDelimiter);

var _getTransformedStringValues2 = require('./utils/get-transformed-string-values');

var _getTransformedStringValues3 = _interopRequireDefault(_getTransformedStringValues2);

var _getCurrencyForCountryCode = require('./utils/get-currency-for-country-code');

var _getCurrencyForCountryCode2 = _interopRequireDefault(_getCurrencyForCountryCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2015-present Zippy Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
var isInt = function isInt(n) {
  return Number(n) === n && n % 1 === 0;
};
var isFloat = function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
};

var getArrowClasses = function getArrowClasses(spinDirection, props) {
  var upArrowClass = (0, _join2.default)(props.rootClassName + '__spinner-arrow', props.rootClassName + '__spinner-arrow--up', spinDirection === 1 && props.rootClassName + '__spinner-arrow--active');

  var downArrowClass = (0, _join2.default)(props.rootClassName + '__spinner-arrow', props.rootClassName + '__spinner-arrow--down', spinDirection === -1 && props.rootClassName + '__spinner-arrow--active');

  return { upArrowClass: upArrowClass, downArrowClass: downArrowClass };
};

var toUpperFirst = function toUpperFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.substring(1) : '';
};

var noDot = function noDot(value) {
  value += '';
  return value.indexOf('.') === -1;
};

/**
 * Returns true if the given value is >=  than #minValue
 * @param  {Number/String}  value
 * @return {Boolean}
 */
var isMinValueRespected = function isMinValueRespected(value, props) {
  var minValue = props.minValue;

  if (minValue == null || value === '') {
    return true;
  }

  return value >= minValue;
};

/**
 * Returns true if the given value is <=  than #maxValue
 * @param  {Number/String}  value
 * @return {Boolean}
 */
var isMaxValueRespected = function isMaxValueRespected(value, props) {
  var maxValue = props.maxValue;

  if (maxValue == null || value === '') {
    return true;
  }

  return value <= maxValue;
};

var checkNumeric = function checkNumeric(value, props) {
  if (value === '') {
    return true;
  }

  if (props.numbersOnly) {
    var numeric = isNumeric(value);

    return numeric || props.allowNegative && value === '-' || props.allowFloat && value === '.' || props.allowNegative && props.allowFloat && value == '-.';
  }
};

var checkFloat = function checkFloat(value, props) {
  if (props.allowFloat === false) {
    return noDot(value) && isNumeric(value) && isInt(value * 1);
  }
};

var checkPositive = function checkPositive(value, props) {
  if (props.allowNegative === false) {
    return isNumeric(value) && value * 1 >= 0;
  }
};

var getInitialStateValue = function getInitialStateValue(props) {
  var value = props.value,
      defaultValue = props.defaultValue;

  if (value) {
    return null;
  }

  if (defaultValue || defaultValue === 0) {
    return getFormatedValue(defaultValue, props);
  }

  return '';
};

var getFormatedValue = function getFormatedValue(value, props) {
  if (value || value === 0) {
    var locale = props.locale,
        prefix = props.prefix,
        sufix = props.sufix,
        minValue = props.minValue,
        maxValue = props.maxValue,
        precision = props.precision;

    return (0, _getTransformedStringValues3.default)(value, {
      locale: locale,
      precision: precision,
      min: minValue,
      max: maxValue,
      prefix: prefix,
      sufix: sufix
    })[0];
  }
};

var getCurrentValue = function getCurrentValue(props, state) {
  var value = props.value,
      defaultValue = props.defaultValue;
  var formattedValue = state.formattedValue;


  if (value != null) {
    if (typeof value !== 'string') {
      return '' + value;
    }
    return value;
  }

  if (formattedValue == null) {
    return getFormatedValue(defaultValue, props);
  }

  return formattedValue;
};

var getCurrentNumericValue = function getCurrentNumericValue(props, state) {
  var value = props.value,
      prefix = props.prefix,
      sufix = props.sufix;
  var formattedValue = state.formattedValue,
      numericValue = state.numericValue;


  if (value) {
    var locale = props.locale,
        minValue = props.minValue,
        maxValue = props.maxValue,
        precision = props.precision;

    numericValue = (0, _getTransformedStringValues3.default)(value, {
      locale: locale,
      precision: precision,
      min: minValue,
      max: maxValue,
      prefix: prefix,
      sufix: sufix
    })[1];
  }

  return numericValue;
};

var isControlled = function isControlled(props) {
  return !!props.value;
};

var getInitialStatePrecision = function getInitialStatePrecision(props) {
  if (isControlledPrecision(props)) {
    return null;
  }

  return 0;
};

var isControlledPrecision = function isControlledPrecision(props) {
  return props.precision === 0 || !!props.precision;
};

var getSufix = function getSufix(props) {
  var sufix = props.sufix,
      format = props.format,
      currencySymbol = props.currencySymbol,
      currencyPosition = props.currencyPosition,
      locale = props.locale;

  if (sufix) {
    return sufix;
  }

  if (format === 'currency' && currencyPosition === 'end') {
    if (currencySymbol) {
      return currencySymbol;
    }
    return (0, _getCurrencyForCountryCode2.default)(locale || navigator.language);
  }

  if (format === 'percentage') {
    return '%';
  }
};

var getPrefix = function getPrefix(props) {
  var prefix = props.prefix,
      format = props.format,
      currencySymbol = props.currencySymbol,
      currencyPosition = props.currencyPosition,
      locale = props.locale;

  if (prefix) {
    return prefix;
  }

  if (format === 'currency' && currencyPosition === 'start') {
    if (currencySymbol) {
      return currencySymbol;
    }
    return (0, _getCurrencyForCountryCode2.default)(locale || navigator.language);
  }
};

var selectionContainsPosition = function selectionContainsPosition(selection, position) {
  if (selection.start === selection.end) {
    return false;
  }

  return selection.start <= position && selection.end > position;
};

var ZippyNumericInput = function (_Component) {
  _inherits(ZippyNumericInput, _Component);

  function ZippyNumericInput(props) {
    _classCallCheck(this, ZippyNumericInput);

    var _this = _possibleConstructorReturn(this, (ZippyNumericInput.__proto__ || Object.getPrototypeOf(ZippyNumericInput)).call(this, props));

    (0, _autoBind2.default)(_this);

    _this.state = {
      formattedValue: getInitialStateValue(_this.getProps(props, {})),
      numericValue: getCurrentNumericValue(_extends({}, props, { value: props.defaultValue }), {}),
      spinDirection: null
    };
    return _this;
  }

  _createClass(ZippyNumericInput, [{
    key: 'setInputRef',
    value: function setInputRef(el) {
      this.input = el;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      if (this.intendedCaretPosition) {
        var newPosition = this.intendedCaretPosition;
        this.intendedCaretPosition = false;
        (0, _raf2.default)(function () {
          (0, _setCaretPosition2.default)(_this2.input, newPosition);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          state = this.state;

      var _p = this.p = this.getProps(props, state),
          currentValue = _p.currentValue,
          enableSpinnerTools = _p.enableSpinnerTools,
          className = _p.className,
          wrapperProps = _p.wrapperProps;

      var min = props.mim;
      if (min === undefined && !props.allowNegative) {
        min = 0;
      }

      var input = _react2.default.createElement('input', _extends({}, (0, _cleanProps2.default)(props, ZippyNumericInput.propTypes), {
        ref: this.setInputRef,
        type: 'text',
        value: currentValue,
        onWheel: this.handleWheel,
        onKeyPress: this.handleKeyPress,
        onKeyDown: this.handleKeyDown,
        onChange: this.handleChange,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        min: min
      }));

      if (!enableSpinnerTools) {
        return input;
      }

      var wrapperClassName = (0, _join2.default)(wrapperProps.className, props.rootClassName + '__wrapper', props.rootClassName + '--tool-position-' + props.toolPosition);

      return _react2.default.createElement(
        'div',
        _extends({}, wrapperProps, { className: wrapperClassName }),
        input,
        this.renderSpinnerToolsWrapper()
      );
    }
  }, {
    key: 'renderSpinnerToolsWrapper',
    value: function renderSpinnerToolsWrapper() {
      var props = this.props,
          state = this.state;
      var _p2 = this.p,
          arrowColor = _p2.arrowColor,
          arrowStyle = _p2.arrowStyle,
          arrowUpStyle = _p2.arrowUpStyle,
          arrowDownStyle = _p2.arrowDownStyle,
          spinDirection = _p2.spinDirection,
          arrowSize = _p2.arrowSize;


      return _react2.default.createElement(
        'div',
        {
          className: props.rootClassName + '__spinner-wrapper',
          key: 'spinnerTool'
        },
        this.renderSpinnerTools(_extends({
          arrowColor: arrowColor,
          arrowStyle: arrowStyle,
          arrowUpStyle: arrowUpStyle,
          arrowDownStyle: arrowDownStyle,
          spinDirection: spinDirection,
          arrowSize: arrowSize
        }, getArrowClasses(spinDirection, props)))
      );
    }
  }, {
    key: 'renderSpinnerTools',
    value: function renderSpinnerTools(config) {
      var arrowColor = config.arrowColor,
          arrowStyle = config.arrowStyle,
          arrowUpStyle = config.arrowUpStyle,
          arrowDownStyle = config.arrowDownStyle,
          spinDirection = config.spinDirection,
          upArrowClass = config.upArrowClass,
          downArrowClass = config.downArrowClass,
          arrowSize = config.arrowSize;


      var svgProps = {};

      if (arrowColor) {
        svgProps.fill = arrowColor;
      }

      if (arrowSize) {
        if (Array.isArray(arrowSize)) {
          svgProps.width = arrowSize[0];
          svgProps.height = arrowSize[1];
        } else {
          svgProps.width = arrowSize;
          svgProps.height = arrowSize;
        }
      }

      var arrwoEvents = this.getArrowEvents();

      return [_react2.default.createElement(
        'span',
        _extends({
          key: 'up'
        }, arrwoEvents.upEvents, {
          className: upArrowClass,
          style: _extends({}, arrowStyle, arrowUpStyle)
        }),
        _react2.default.createElement(
          'svg',
          { style: _extends({}, svgProps), viewBox: '0 0 24 24' },
          _react2.default.createElement('path', { d: 'M7 14l5-5 5 5z' }),
          _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
        )
      ), _react2.default.createElement(
        'span',
        _extends({
          key: 'down'
        }, arrwoEvents.downEvents, {
          className: downArrowClass,
          style: _extends({}, arrowStyle, arrowDownStyle)
        }),
        _react2.default.createElement(
          'svg',
          { style: _extends({}, svgProps), viewBox: '0 0 24 24' },
          _react2.default.createElement('path', { d: 'M7 10l5 5 5-5z' }),
          _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
        )
      )];
    }
  }, {
    key: 'getArrowEvents',
    value: function getArrowEvents() {
      return {
        upEvents: _defineProperty({}, _eventNames2.default.onMouseDown, this.handleArrowDown.bind(this, 1)),
        downEvents: _defineProperty({}, _eventNames2.default.onMouseDown, this.handleArrowDown.bind(this, -1))
      };
    }
  }, {
    key: 'handleArrowDown',
    value: function handleArrowDown(step, event) {
      var _this3 = this;

      event.preventDefault();

      var target = _hasTouch2.default ? event.target : window;
      var eventName = _hasTouch2.default ? 'touchend' : 'click';

      target.addEventListener(eventName, this.handleMouseUp);

      var shiftKey = event.shiftKey;


      var direction = step > 0 ? 1 : -1;

      setTimeout(function () {
        _this3.setState({
          shiftKey: shiftKey,
          spinDirection: direction
        });

        _this3.startSpin(direction, { step: Math.abs(step) });
      }, 10);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      this.stopSpin();

      this.setState({
        spinDirection: null,
        shiftKey: null
      });

      window.removeEventListener('click', this.handleMouseUp);
    }
  }, {
    key: 'getTransformedStringValues',
    value: function getTransformedStringValues(value) {
      var _p3 = this.p,
          sufix = _p3.sufix,
          prefix = _p3.prefix,
          locale = _p3.locale,
          precision = _p3.precision,
          isControlledPrecision = _p3.isControlledPrecision,
          minValue = _p3.minValue,
          maxValue = _p3.maxValue;

      return (0, _getTransformedStringValues3.default)(value, {
        locale: locale,
        precision: isControlledPrecision && precision,
        min: minValue,
        max: maxValue,
        sufix: sufix,
        prefix: prefix
      });
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(event) {
      var onFocus = this.props.onFocus;


      this.setState({
        focused: true
      });

      onFocus && onFocus(event);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.setState({
        focused: false
      });
      if (this.isSpinning()) {
        this.stopSpin();
      }

      var onBlur = this.props.onBlur;

      onBlur && onBlur(event);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.handleChange(null, value);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event, value) {
      var _this4 = this;

      var currentSelection = (0, _getSelectionRange2.default)(this.input);

      var _p4 = this.p,
          isControlled = _p4.isControlled,
          precision = _p4.precision,
          currentValue = _p4.currentValue;


      value = value === undefined && event && event.target ? event.target.value : value;

      if (!this.props.allowFloat) {
        // delete everything after .
        var decimalPlace = value && value.indexOf('.');
        if (decimalPlace !== -1) {
          value = value.slice(0, decimalPlace);
        }
      }
      if (!this.props.allowNegative && Number(value) < 0) {
        value = 0;
      }

      var _getTransformedString = this.getTransformedStringValues(value),
          _getTransformedString2 = _slicedToArray(_getTransformedString, 2),
          formattedValue = _getTransformedString2[0],
          numericValue = _getTransformedString2[1];

      var charDiffCount = formattedValue.length - value.length;

      // https://github.com/zippyui/react-number-input/issues/11
      if (!currentValue && precision) {
        charDiffCount = 1;
      }

      // https://github.com/zippyui/react-number-input/issues/5
      if (this.backspaceOnControlledPrecision) {
        this.backspaceOnControlledPrecision = false;
        charDiffCount--;
      }

      // https://github.com/zippyui/react-number-input/issues/15
      if (this.digitInputOnControlledPrecision) {
        this.digitInputOnControlledPrecision = false;
        charDiffCount++;
      }

      if (!isControlled) {
        this.setState({
          formattedValue: formattedValue,
          numericValue: numericValue
        }, function () {
          (0, _raf2.default)(function () {
            (0, _setCaretPosition2.default)(_this4.input, charDiffCount + currentSelection.end);
          });
        });
      } else {
        this.intendedCaretPosition = charDiffCount + currentSelection.end;
      }

      var onChange = this.props.onChange;

      onChange && onChange({
        formattedValue: formattedValue,
        numericValue: numericValue,
        event: event
      });
    }
  }, {
    key: 'handleBackspaceKeyDown',
    value: function handleBackspaceKeyDown(event) {
      var _this5 = this;

      var _p5 = this.p,
          isControlledPrecision = _p5.isControlledPrecision,
          currentValue = _p5.currentValue,
          decimalDelimiter = _p5.decimalDelimiter;


      if (isControlledPrecision) {
        var currentSelection = (0, _getSelectionRange2.default)(this.input);
        var decimalPosition = (0, _getTransformedStringValues2.getDecimalDelimiterPosition)(currentValue, decimalDelimiter);

        if (currentSelection.end - 1 > decimalPosition) {
          this.backspaceOnControlledPrecision = true;
        }

        if (currentSelection.end - 1 === decimalPosition) {
          (0, _raf2.default)(function () {
            (0, _setCaretPosition2.default)(_this5.input, currentSelection.end - 1);
          });
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }
  }, {
    key: 'handleDigitKeyDown',
    value: function handleDigitKeyDown(event) {
      var _p6 = this.p,
          isControlledPrecision = _p6.isControlledPrecision,
          currentValue = _p6.currentValue,
          decimalDelimiter = _p6.decimalDelimiter;


      if (isControlledPrecision) {
        var currentSelection = (0, _getSelectionRange2.default)(this.input);
        var decimalPosition = (0, _getTransformedStringValues2.getDecimalDelimiterPosition)(currentValue, decimalDelimiter);
        if (currentSelection.end > decimalPosition) {
          this.digitInputOnControlledPrecision = currentSelection.end > decimalPosition;
        }
      }
    }

    // https://github.com/zippyui/react-number-input/issues/16

  }, {
    key: 'handleDecimalDelimiterKeyDown',
    value: function handleDecimalDelimiterKeyDown(event) {
      var _this6 = this;

      var _p7 = this.p,
          currentValue = _p7.currentValue,
          decimalDelimiter = _p7.decimalDelimiter;


      var currentSelection = (0, _getSelectionRange2.default)(this.input);
      var decimalPosition = (0, _getTransformedStringValues2.getDecimalDelimiterPosition)(currentValue, decimalDelimiter);

      if (decimalPosition) {
        var newCaretPosition = 0;

        if (currentSelection.end <= decimalPosition) {
          newCaretPosition = decimalPosition + 1;
        }

        if (currentSelection.end > decimalPosition) {
          newCaretPosition = decimalPosition;
        }

        event.preventDefault();
        event.stopPropagation();

        (0, _raf2.default)(function () {
          (0, _setCaretPosition2.default)(_this6.input, newCaretPosition);
        });
      }
    }
  }, {
    key: 'handleSignReversal',
    value: function handleSignReversal(event) {
      var _this7 = this;

      var _p8 = this.p,
          currentValue = _p8.currentValue,
          numericValue = _p8.numericValue,
          decimalDelimiter = _p8.decimalDelimiter;

      var currentSelection = (0, _getSelectionRange2.default)(this.input);

      var newCaretPosition = currentSelection.end;

      var _getTransformedString3 = this.getTransformedStringValues(-numericValue),
          _getTransformedString4 = _slicedToArray(_getTransformedString3, 2),
          formattedValue = _getTransformedString4[0],
          newNumericValue = _getTransformedString4[1];

      if (newNumericValue < 0) {
        newCaretPosition += 1;
      } else {
        newCaretPosition -= 1;
      }

      this.setState({
        numericValue: newNumericValue,
        formattedValue: formattedValue
      });

      event.preventDefault();
      event.stopPropagation();

      (0, _raf2.default)(function () {
        (0, _setCaretPosition2.default)(_this7.input, newCaretPosition);
      });
    }
  }, {
    key: 'handleSelectionOverDecimalDelimiter',
    value: function handleSelectionOverDecimalDelimiter(event, currentSelection) {
      var _p9 = this.p,
          decimalDelimiter = _p9.decimalDelimiter,
          currentValue = _p9.currentValue,
          isControlledPrecision = _p9.isControlledPrecision,
          decimalDelimiterPosition = _p9.decimalDelimiterPosition,
          prefix = _p9.prefix,
          sufix = _p9.sufix;

      currentSelection = currentSelection || (0, _getSelectionRange2.default)(this.input);

      var selectionStartsAtBeginningOfNumber = currentSelection.start === 0;
      if (prefix) {
        selectionStartsAtBeginningOfNumber = currentSelection.start <= prefix.length + 1;
      }

      var selectionEndsAtEndOfNumber = currentSelection.end === currentValue.length;
      if (sufix) {
        selectionEndsAtEndOfNumber = currentSelection.end >= sufix.length + 1;
      }

      if (selectionStartsAtBeginningOfNumber && selectionEndsAtEndOfNumber) {
        return;
      }

      if (isControlledPrecision) {
        var isInteractionKey = ['ArrowLeft', 'ArrowRight', 'Shift', 'Control', 'Meta'].indexOf(event.key);

        if (isInteractionKey === -1) {
          var startinCharacter = event.key.match(/[0-9]/) ? event.key : '';
          var newCharSequence = '' + (startinCharacter !== undefined ? startinCharacter : 0) + decimalDelimiter;

          this.handleChange(event, currentValue.replace(currentValue.substring(currentSelection.start, currentSelection.end), newCharSequence));

          event.preventDefault();
          event.stopPropagation();
        }
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      var key = event.key;
      var _p10 = this.p,
          decimalDelimiter = _p10.decimalDelimiter,
          currentValue = _p10.currentValue,
          isControlledPrecision = _p10.isControlledPrecision,
          decimalDelimiterPosition = _p10.decimalDelimiterPosition;


      if (!key) {
        return;
      }

      var currentSelection = (0, _getSelectionRange2.default)(this.input);

      if (selectionContainsPosition(currentSelection, decimalDelimiterPosition)) {
        this.handleSelectionOverDecimalDelimiter(event, currentSelection);
      }

      if (key.match(/[0-9]/)) {
        this.handleDigitKeyDown(event);
        return;
      }

      if (key === decimalDelimiter) {
        this.handleDecimalDelimiterKeyDown(event);
        return;
      }
      if (key === '-' && this.props.allowNegative) {
        this.handleSignReversal(event);
        return;
      }
      var name = 'handle' + toUpperFirst(key) + 'KeyDown';

      if (this[name]) {
        this[name](event);
      }
      if (this.props.onKeyDown) {
        this.props.onKeyDown(event);
      }
    }
  }, {
    key: 'handleArrowDownKeyDown',
    value: function handleArrowDownKeyDown(event) {
      this.handleArrowKeySpin(-1, event);
    }
  }, {
    key: 'handleArrowUpKeyDown',
    value: function handleArrowUpKeyDown(event) {
      this.handleArrowKeySpin(1, event);
    }
  }, {
    key: 'handleArrowKeySpin',
    value: function handleArrowKeySpin(direction, event) {
      if (this.isSpinning()) {
        event.preventDefault();
        return;
      }

      if (this.props.spinOnArrowKeys && !this.isSpinning()) {
        this.startSpin(direction, {
          shiftKey: event.shiftKey,
          event: event
        });

        event.preventDefault();

        global.addEventListener('keyup', this.onSpinKeyUp);
      }
    }
  }, {
    key: 'onSpinKeyUp',
    value: function onSpinKeyUp() {
      this.props.spinOnArrowKeys && this.stopSpin();

      global.removeEventListener('keyup', this.onSpinKeyUp);
    }
  }, {
    key: 'getInput',
    value: function getInput() {
      return (0, _reactDom.findDOMNode)(this.refs.field);
    }
  }, {
    key: 'getNumericValue',
    value: function getNumericValue() {
      return this.p.numericValue;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.p.currentValue;
    }
  }, {
    key: 'isFocused',
    value: function isFocused() {
      return !!this.state.focused;
    }
  }, {
    key: 'getStepValue',
    value: function getStepValue(props, direction, config) {
      config = config || {};

      var value = this.p.numericValue;
      var stepValue = config.step || props.step;
      if (this.state.shiftKey || config.shiftKey && props.shiftStep) {
        stepValue = props.shiftStep;
      }
      return Math.round((value + direction * stepValue) * 1000) / 1000;
    }
  }, {
    key: 'stepTo',
    value: function stepTo(direction, config) {
      config = config || {};

      var props = this.props;
      var validationFn = this.validationFn;
      var step = config.step || props.step;

      if (step != null) {
        var stepFn = typeof props.stepFn === 'function' ? props.stepFn : this.getStepValue;
        var value = stepFn(props, direction, config);
        this.handleChange(null, '' + value);
      }

      return value;
    }
  }, {
    key: 'stopSpin',
    value: function stopSpin() {
      clearInterval(this.spinIntervalId);
      this.spinIntervalId = null;
    }
  }, {
    key: 'startSpin',
    value: function startSpin(direction, config) {
      if (this.spinIntervalId) {
        clearInterval(this.spinIntervalId);
      }

      this.spinIntervalId = setInterval(this.stepTo.bind(this, direction, config), this.props.stepDelay);
    }
  }, {
    key: 'isSpinning',
    value: function isSpinning() {
      return this.spinIntervalId != null;
    }
  }, {
    key: 'handleWheel',
    value: function handleWheel(event) {
      var props = this.props;

      if ((props.requireFocusOnStep && this.isFocused() || !props.requireFocusOnStep) && props.stepOnWheel && props.step) {
        event.preventDefault();

        var nativeEvent = event.nativeEvent;
        var y = nativeEvent.wheelDeltaY || nativeEvent.wheelDelta || -nativeEvent.deltaY;

        y = y < 0 ? -1 : 1;

        this.stepTo(y, {
          shiftKey: event.shiftKey,
          event: event
        });
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: 'getProps',
    value: function getProps(props, state) {
      props = props || this.props;
      state = state || this.state;

      var sufix = getSufix(props);
      var prefix = getPrefix(props);

      var currentValue = getCurrentValue(_extends({}, props, { sufix: sufix, prefix: prefix }), state);
      var numericValue = getCurrentNumericValue(_extends({}, props, { sufix: sufix, prefix: prefix }), state);

      var decimalDelimiter = (0, _getDecimalDelimiter2.default)(props.locale);
      var decimalDelimiterPosition = (0, _getTransformedStringValues2.getDecimalDelimiterPosition)(currentValue, decimalDelimiter);

      var className = (0, _join2.default)(!props.enableSpinnerTools && props.rootClassName, props.enableSpinnerTools && props.rootClassName + '__number-input');

      return _extends({}, props, {
        className: className,
        isControlled: isControlled(props),
        isControlledPrecision: isControlledPrecision(props),

        currentValue: currentValue,
        numericValue: numericValue,
        sufix: sufix,
        prefix: prefix,

        decimalDelimiter: decimalDelimiter,
        decimalDelimiterPosition: decimalDelimiterPosition
      });
    }
  }]);

  return ZippyNumericInput;
}(_react.Component);

ZippyNumericInput.defaultProps = {
  rootClassName: 'zippy-react-toolkit-numeric-input',
  spinOnArrowKeys: true,
  numbersOnly: true,
  minValue: Number.MIN_SAFE_INTEGER,
  maxValue: Number.MAX_SAFE_INTEGER,
  step: 1,
  shiftStep: 10,
  requireFocusOnStep: true,
  stepOnWheel: true,
  allowNegative: true,
  allowFloat: true,
  stepDelay: 40,
  prefix: '',
  sufix: '',
  format: 'number',
  currencyPosition: 'end',
  enableSpinnerTools: true,
  toolPosition: 'end',
  arrowSize: 14,
  wrapperProps: {}
};

ZippyNumericInput.propTypes = {
  rootClassName: _propTypes2.default.string,
  stepDelay: _propTypes2.default.number,
  step: _propTypes2.default.number,

  minValue: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  maxValue: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  onChange: _propTypes2.default.func,

  allowFloat: _propTypes2.default.bool,
  requireFocusOnStep: _propTypes2.default.bool,

  spinOnArrowKeys: _propTypes2.default.bool,
  numbersOnly: _propTypes2.default.bool,

  shiftStep: _propTypes2.default.number,
  stepOnWheel: _propTypes2.default.bool,

  allowNegative: _propTypes2.default.bool,

  precision: _propTypes2.default.number,
  format: _propTypes2.default.oneOf(['currency', 'number', 'percentage']),
  locale: _propTypes2.default.string,

  prefix: _propTypes2.default.string,
  sufix: _propTypes2.default.string,

  currencySymbol: _propTypes2.default.string,
  currencyPosition: _propTypes2.default.oneOf(['start', 'end']),

  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  // enable
  enableSpinnerTools: _propTypes2.default.bool,
  toolPosition: _propTypes2.default.oneOf(['start', 'end']),
  arrowSize: _propTypes2.default.number,
  wrapperProps: _propTypes2.default.object,
  arrowDownStyle: _propTypes2.default.object,
  arrowUpStyle: _propTypes2.default.object
};

exports.default = ZippyNumericInput;