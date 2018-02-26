/**
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Field from '../../Field';
import autoBind from '@zippytech/react-class/autoBind';
import raf from '../../common/raf';
import join from '../../common/join';
import cleanProps from '../../common/cleanProps';
import hasTouch from '@zippytech/has-touch';
import EVENT_NAMES from '../../common/eventNames';

import getSelectedRange from './utils/get-selection-range';
import setCaretPosition from './utils/set-caret-position';
import getDecimalDelimiter from './utils/get-decimal-delimiter';
import getTransformedStringValues, {
  getDecimalDelimiterPosition
} from './utils/get-transformed-string-values';

import getCurrencyForCountryCode from './utils/get-currency-for-country-code';

var isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);
var isInt = n => Number(n) === n && n % 1 === 0;
var isFloat = n => Number(n) === n && n % 1 !== 0;

const getArrowClasses = (spinDirection, props) => {
  const upArrowClass = join(
    `${props.rootClassName}__spinner-arrow`,
    `${props.rootClassName}__spinner-arrow--up`,
    spinDirection === 1 && `${props.rootClassName}__spinner-arrow--active`
  );

  const downArrowClass = join(
    `${props.rootClassName}__spinner-arrow`,
    `${props.rootClassName}__spinner-arrow--down`,
    spinDirection === -1 && `${props.rootClassName}__spinner-arrow--active`
  );

  return { upArrowClass, downArrowClass };
};

const toUpperFirst = str => {
  return str ? str.charAt(0).toUpperCase() + str.substring(1) : '';
};

const noDot = value => {
  value += '';
  return value.indexOf('.') === -1;
};

/**
 * Returns true if the given value is >=  than #minValue
 * @param  {Number/String}  value
 * @return {Boolean}
 */
const isMinValueRespected = (value, props) => {
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
const isMaxValueRespected = (value, props) => {
  var maxValue = props.maxValue;

  if (maxValue == null || value === '') {
    return true;
  }

  return value <= maxValue;
};

const checkNumeric = (value, props) => {
  if (value === '') {
    return true;
  }

  if (props.numbersOnly) {
    var numeric = isNumeric(value);

    return (
      numeric ||
      (props.allowNegative && value === '-') ||
      (props.allowFloat && value === '.') ||
      (props.allowNegative && props.allowFloat && value == '-.')
    );
  }
};

const checkFloat = (value, props) => {
  if (props.allowFloat === false) {
    return noDot(value) && isNumeric(value) && isInt(value * 1);
  }
};

const checkPositive = (value, props) => {
  if (props.allowNegative === false) {
    return isNumeric(value) && value * 1 >= 0;
  }
};

const getInitialStateValue = props => {
  const { value, defaultValue } = props;
  if (value) {
    return null;
  }

  if (defaultValue || defaultValue === 0) {
    return getFormatedValue(defaultValue, props);
  }

  return '';
};

const getFormatedValue = (value, props) => {
  if (value || value === 0) {
    const { locale, prefix, sufix, minValue, maxValue, precision } = props;
    return getTransformedStringValues(value, {
      locale,
      precision,
      min: minValue,
      max: maxValue,
      prefix,
      sufix
    })[0];
  }
};

const getCurrentValue = (props, state) => {
  const { value, defaultValue } = props;
  const { formattedValue } = state;

  if (value != null) {
    if (typeof value !== 'string') {
      return `${value}`;
    }
    return value;
  }

  if (formattedValue == null) {
    return getFormatedValue(defaultValue, props);
  }

  return formattedValue;
};

const getCurrentNumericValue = (props, state) => {
  const { value, prefix, sufix } = props;
  let { formattedValue, numericValue } = state;

  if (value) {
    const { locale, minValue, maxValue, precision } = props;
    numericValue = getTransformedStringValues(value, {
      locale,
      precision,
      min: minValue,
      max: maxValue,
      prefix,
      sufix
    })[1];
  }

  return numericValue;
};

const isControlled = props => {
  return !!props.value;
};

const getInitialStatePrecision = props => {
  if (isControlledPrecision(props)) {
    return null;
  }

  return 0;
};

const isControlledPrecision = props => {
  return props.precision === 0 || !!props.precision;
};

const getSufix = props => {
  const { sufix, format, currencySymbol, currencyPosition, locale } = props;
  if (sufix) {
    return sufix;
  }

  if (format === 'currency' && currencyPosition === 'end') {
    if (currencySymbol) {
      return currencySymbol;
    }
    return getCurrencyForCountryCode(locale || navigator.language);
  }

  if (format === 'percentage') {
    return '%';
  }
};

const getPrefix = props => {
  const { prefix, format, currencySymbol, currencyPosition, locale } = props;
  if (prefix) {
    return prefix;
  }

  if (format === 'currency' && currencyPosition === 'start') {
    if (currencySymbol) {
      return currencySymbol;
    }
    return getCurrencyForCountryCode(locale || navigator.language);
  }
};

const selectionContainsPosition = (selection, position) => {
  if (selection.start === selection.end) {
    return false;
  }

  return selection.start <= position && selection.end > position;
};

class ZippyNumericInput extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      formattedValue: getInitialStateValue(this.getProps(props, {})),
      numericValue: getCurrentNumericValue(
        { ...props, value: props.defaultValue },
        {}
      ),
      spinDirection: null
    };
  }

  setInputRef(el) {
    this.input = el;
  }

  componentDidUpdate() {
    if (this.intendedCaretPosition) {
      let newPosition = this.intendedCaretPosition;
      this.intendedCaretPosition = false;
      raf(() => {
        setCaretPosition(this.input, newPosition);
      });
    }
  }

  render() {
    const { props, state } = this;
    const {
      currentValue,
      enableSpinnerTools,
      className,
      wrapperProps
    } = (this.p = this.getProps(props, state));

    let min = props.mim;
    if (min === undefined && !props.allowNegative) {
      min = 0;
    }

    const input = (
      <input
        {...cleanProps(props, ZippyNumericInput.propTypes)}
        ref={this.setInputRef}
        type="text"
        value={currentValue}
        onWheel={this.handleWheel}
        onKeyPress={this.handleKeyPress}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        min={min}
      />
    );

    if (!enableSpinnerTools) {
      return input;
    }

    const wrapperClassName = join(
      wrapperProps.className,
      `${props.rootClassName}__wrapper`,
      `${props.rootClassName}--tool-position-${props.toolPosition}`
    );

    return (
      <div {...wrapperProps} className={wrapperClassName}>
        {input}
        {this.renderSpinnerToolsWrapper()}
      </div>
    );
  }

  renderSpinnerToolsWrapper() {
    const { props, state } = this;

    const {
      arrowColor,
      arrowStyle,
      arrowUpStyle,
      arrowDownStyle,
      spinDirection,
      arrowSize
    } = this.p;

    return (
      <div
        className={`${props.rootClassName}__spinner-wrapper`}
        key="spinnerTool"
      >
        {this.renderSpinnerTools({
          arrowColor,
          arrowStyle,
          arrowUpStyle,
          arrowDownStyle,
          spinDirection,
          arrowSize,
          ...getArrowClasses(spinDirection, props)
        })}
      </div>
    );
  }

  renderSpinnerTools(config) {
    const {
      arrowColor,
      arrowStyle,
      arrowUpStyle,
      arrowDownStyle,
      spinDirection,
      upArrowClass,
      downArrowClass,
      arrowSize
    } = config;

    const svgProps = {};

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

    const arrwoEvents = this.getArrowEvents();

    return [
      <span
        key="up"
        {...arrwoEvents.upEvents}
        className={upArrowClass}
        style={{ ...arrowStyle, ...arrowUpStyle }}
      >
        <svg style={{ ...svgProps }} viewBox="0 0 24 24">
          <path d="M7 14l5-5 5 5z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </span>,
      <span
        key="down"
        {...arrwoEvents.downEvents}
        className={downArrowClass}
        style={{ ...arrowStyle, ...arrowDownStyle }}
      >
        <svg style={{ ...svgProps }} viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </span>
    ];
  }

  getArrowEvents() {
    return {
      upEvents: {
        [EVENT_NAMES.onMouseDown]: this.handleArrowDown.bind(this, 1)
      },
      downEvents: {
        [EVENT_NAMES.onMouseDown]: this.handleArrowDown.bind(this, -1)
      }
    };
  }

  handleArrowDown(step, event) {
    event.preventDefault();

    var target = hasTouch ? event.target : window;
    var eventName = hasTouch ? 'touchend' : 'click';

    target.addEventListener(eventName, this.handleMouseUp);

    const { shiftKey } = event;

    const direction = step > 0 ? 1 : -1;

    setTimeout(() => {
      this.setState({
        shiftKey,
        spinDirection: direction
      });

      this.startSpin(direction, { step: Math.abs(step) });
    }, 10);
  }

  handleMouseUp() {
    this.stopSpin();

    this.setState({
      spinDirection: null,
      shiftKey: null
    });

    window.removeEventListener('click', this.handleMouseUp);
  }

  getTransformedStringValues(value) {
    const {
      sufix,
      prefix,
      locale,
      precision,
      isControlledPrecision,
      minValue,
      maxValue
    } = this.p;
    return getTransformedStringValues(value, {
      locale,
      precision: isControlledPrecision && precision,
      min: minValue,
      max: maxValue,
      sufix,
      prefix
    });
  }

  handleFocus(event) {
    const { onFocus } = this.props;

    this.setState({
      focused: true
    });

    onFocus && onFocus(event);
  }

  handleBlur() {
    this.setState({
      focused: false
    });
    if (this.isSpinning()) {
      this.stopSpin();
    }

    const { onBlur } = this.props;
    onBlur && onBlur(event);
  }

  setValue(value) {
    this.handleChange(null, value);
  }

  handleChange(event, value) {
    const currentSelection = getSelectedRange(this.input);

    const { isControlled, precision, currentValue } = this.p;

    value = value === undefined && event && event.target
      ? event.target.value
      : value;

    if (!this.props.allowFloat) {
      // delete everything after .
      const decimalPlace = value && value.indexOf('.');
      if (decimalPlace !== -1) {
        value = value.slice(0, decimalPlace);
      }
    }
    if (!this.props.allowNegative && Number(value) < 0) {
      value = 0;
    }

    const [formattedValue, numericValue] = this.getTransformedStringValues(
      value
    );

    let charDiffCount = formattedValue.length - value.length;

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
      this.setState(
        {
          formattedValue,
          numericValue
        },
        () => {
          raf(() => {
            setCaretPosition(this.input, charDiffCount + currentSelection.end);
          });
        }
      );
    } else {
      this.intendedCaretPosition = charDiffCount + currentSelection.end;
    }

    const { onChange } = this.props;
    onChange &&
      onChange({
        formattedValue,
        numericValue,
        event
      });
  }

  handleBackspaceKeyDown(event) {
    const { isControlledPrecision, currentValue, decimalDelimiter } = this.p;

    if (isControlledPrecision) {
      const currentSelection = getSelectedRange(this.input);
      const decimalPosition = getDecimalDelimiterPosition(
        currentValue,
        decimalDelimiter
      );

      if (currentSelection.end - 1 > decimalPosition) {
        this.backspaceOnControlledPrecision = true;
      }

      if (currentSelection.end - 1 === decimalPosition) {
        raf(() => {
          setCaretPosition(this.input, currentSelection.end - 1);
        });
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  handleDigitKeyDown(event) {
    const { isControlledPrecision, currentValue, decimalDelimiter } = this.p;

    if (isControlledPrecision) {
      const currentSelection = getSelectedRange(this.input);
      const decimalPosition = getDecimalDelimiterPosition(
        currentValue,
        decimalDelimiter
      );
      if (currentSelection.end > decimalPosition) {
        this.digitInputOnControlledPrecision =
          currentSelection.end > decimalPosition;
      }
    }
  }

  // https://github.com/zippyui/react-number-input/issues/16
  handleDecimalDelimiterKeyDown(event) {
    const { currentValue, decimalDelimiter } = this.p;

    const currentSelection = getSelectedRange(this.input);
    const decimalPosition = getDecimalDelimiterPosition(
      currentValue,
      decimalDelimiter
    );

    if (decimalPosition) {
      let newCaretPosition = 0;

      if (currentSelection.end <= decimalPosition) {
        newCaretPosition = decimalPosition + 1;
      }

      if (currentSelection.end > decimalPosition) {
        newCaretPosition = decimalPosition;
      }

      event.preventDefault();
      event.stopPropagation();

      raf(() => {
        setCaretPosition(this.input, newCaretPosition);
      });
    }
  }

  handleSignReversal(event) {
    const { currentValue, numericValue, decimalDelimiter } = this.p;
    const currentSelection = getSelectedRange(this.input);

    let newCaretPosition = currentSelection.end;

    const [formattedValue, newNumericValue] = this.getTransformedStringValues(
      -numericValue
    );

    if (newNumericValue < 0) {
      newCaretPosition += 1;
    } else {
      newCaretPosition -= 1;
    }

    this.setState({
      numericValue: newNumericValue,
      formattedValue
    });

    event.preventDefault();
    event.stopPropagation();

    raf(() => {
      setCaretPosition(this.input, newCaretPosition);
    });
  }

  handleSelectionOverDecimalDelimiter(event, currentSelection) {
    const {
      decimalDelimiter,
      currentValue,
      isControlledPrecision,
      decimalDelimiterPosition,
      prefix,
      sufix
    } = this.p;
    currentSelection = currentSelection || getSelectedRange(this.input);

    let selectionStartsAtBeginningOfNumber = currentSelection.start === 0;
    if (prefix) {
      selectionStartsAtBeginningOfNumber =
        currentSelection.start <= prefix.length + 1;
    }

    let selectionEndsAtEndOfNumber =
      currentSelection.end === currentValue.length;
    if (sufix) {
      selectionEndsAtEndOfNumber = currentSelection.end >= sufix.length + 1;
    }

    if (selectionStartsAtBeginningOfNumber && selectionEndsAtEndOfNumber) {
      return;
    }

    if (isControlledPrecision) {
      const isInteractionKey = [
        'ArrowLeft',
        'ArrowRight',
        'Shift',
        'Control',
        'Meta'
      ].indexOf(event.key);

      if (isInteractionKey === -1) {
        const startinCharacter = event.key.match(/[0-9]/) ? event.key : '';
        const newCharSequence = `${startinCharacter !== undefined ? startinCharacter : 0}${decimalDelimiter}`;

        this.handleChange(
          event,
          currentValue.replace(
            currentValue.substring(
              currentSelection.start,
              currentSelection.end
            ),
            newCharSequence
          )
        );

        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  handleKeyDown(event) {
    const { key } = event;
    const {
      decimalDelimiter,
      currentValue,
      isControlledPrecision,
      decimalDelimiterPosition
    } = this.p;

    if (!key) {
      return;
    }

    const currentSelection = getSelectedRange(this.input);

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
    const name = `handle${toUpperFirst(key)}KeyDown`;

    if (this[name]) {
      this[name](event);
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  handleArrowDownKeyDown(event) {
    this.handleArrowKeySpin(-1, event);
  }

  handleArrowUpKeyDown(event) {
    this.handleArrowKeySpin(1, event);
  }

  handleArrowKeySpin(direction, event) {
    if (this.isSpinning()) {
      event.preventDefault();
      return;
    }

    if (this.props.spinOnArrowKeys && !this.isSpinning()) {
      this.startSpin(direction, {
        shiftKey: event.shiftKey,
        event
      });

      event.preventDefault();

      global.addEventListener('keyup', this.onSpinKeyUp);
    }
  }

  onSpinKeyUp() {
    this.props.spinOnArrowKeys && this.stopSpin();

    global.removeEventListener('keyup', this.onSpinKeyUp);
  }

  getInput() {
    return findDOMNode(this.refs.field);
  }

  getNumericValue() {
    return this.p.numericValue;
  }

  getValue() {
    return this.p.currentValue;
  }

  isFocused() {
    return !!this.state.focused;
  }

  getStepValue(props, direction, config) {
    config = config || {};

    let value = this.p.numericValue;
    let stepValue = config.step || props.step;
    if (this.state.shiftKey || (config.shiftKey && props.shiftStep)) {
      stepValue = props.shiftStep;
    }
    return Math.round((value + direction * stepValue) * 1000) / 1000;
  }

  stepTo(direction, config) {
    config = config || {};

    var props = this.props;
    var validationFn = this.validationFn;
    const step = config.step || props.step;

    if (step != null) {
      var stepFn = typeof props.stepFn === 'function'
        ? props.stepFn
        : this.getStepValue;
      var value = stepFn(props, direction, config);
      this.handleChange(null, `${value}`);
    }

    return value;
  }

  stopSpin() {
    clearInterval(this.spinIntervalId);
    this.spinIntervalId = null;
  }

  startSpin(direction, config) {
    if (this.spinIntervalId) {
      clearInterval(this.spinIntervalId);
    }

    this.spinIntervalId = setInterval(
      this.stepTo.bind(this, direction, config),
      this.props.stepDelay
    );
  }

  isSpinning() {
    return this.spinIntervalId != null;
  }

  handleWheel(event) {
    var props = this.props;

    if (
      ((props.requireFocusOnStep && this.isFocused()) ||
        !props.requireFocusOnStep) &&
      props.stepOnWheel &&
      props.step
    ) {
      event.preventDefault();

      var nativeEvent = event.nativeEvent;
      var y =
        nativeEvent.wheelDeltaY ||
        nativeEvent.wheelDelta ||
        -nativeEvent.deltaY;

      y = y < 0 ? -1 : 1;

      this.stepTo(y, {
        shiftKey: event.shiftKey,
        event
      });
    }
  }

  focus() {
    this.input.focus();
  }

  getProps(props, state) {
    props = props || this.props;
    state = state || this.state;

    const sufix = getSufix(props);
    const prefix = getPrefix(props);

    const currentValue = getCurrentValue({ ...props, sufix, prefix }, state);
    const numericValue = getCurrentNumericValue(
      { ...props, sufix, prefix },
      state
    );

    const decimalDelimiter = getDecimalDelimiter(props.locale);
    const decimalDelimiterPosition = getDecimalDelimiterPosition(
      currentValue,
      decimalDelimiter
    );

    const className = join(
      !props.enableSpinnerTools && props.rootClassName,
      props.enableSpinnerTools && `${props.rootClassName}__number-input`
    );

    return {
      ...props,
      className,
      isControlled: isControlled(props),
      isControlledPrecision: isControlledPrecision(props),

      currentValue,
      numericValue,
      sufix,
      prefix,

      decimalDelimiter,
      decimalDelimiterPosition
    };
  }
}

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
  rootClassName: PropTypes.string,
  stepDelay: PropTypes.number,
  step: PropTypes.number,

  minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  onChange: PropTypes.func,

  allowFloat: PropTypes.bool,
  requireFocusOnStep: PropTypes.bool,

  spinOnArrowKeys: PropTypes.bool,
  numbersOnly: PropTypes.bool,

  shiftStep: PropTypes.number,
  stepOnWheel: PropTypes.bool,

  allowNegative: PropTypes.bool,

  precision: PropTypes.number,
  format: PropTypes.oneOf(['currency', 'number', 'percentage']),
  locale: PropTypes.string,

  prefix: PropTypes.string,
  sufix: PropTypes.string,

  currencySymbol: PropTypes.string,
  currencyPosition: PropTypes.oneOf(['start', 'end']),

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // enable
  enableSpinnerTools: PropTypes.bool,
  toolPosition: PropTypes.oneOf(['start', 'end']),
  arrowSize: PropTypes.number,
  wrapperProps: PropTypes.object,
  arrowDownStyle: PropTypes.object,
  arrowUpStyle: PropTypes.object
};

export default ZippyNumericInput;
