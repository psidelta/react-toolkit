/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import Component from '@zippytech/react-class';
import { Flex } from '../../../Flex';

import assign from '../../../common/assign';
import Input from '../../../Field';
import DateFormatInput from '../DateFormatInput';
import InlineBlock from '../InlineBlock';

import Overlay from '../../../Overlay';
import { CLEAR_ICON } from './icons';
import join from '../../../common/join';
import toMoment from '../toMoment';
import Calendar, { NAV_KEYS } from '../Calendar';
import joinFunctions from '../joinFunctions';
import assignDefined from '../assignDefined';
import forwardTime from '../utils/forwardTime';
const POSITIONS = { top: 'top', bottom: 'bottom' };

const defaultOverlayProps = {
  updatePositionOnScroll: true,
  rootClassName: 'zippy-react-toolkit-date-input__overlay',
  positions: ['tl-bl', 'bl-tl'],
  offset: 2,
  theme: null,
  visible: true
};

const getPicker = props => {
  return (
    React.Children.toArray(props.children).filter(
      c => c && c.props && c.props.isDatePicker
    )[0] || <Calendar />
  );
};

const FIND_INPUT = c => c && (c.type === 'input' || (c.props && c.isDateInput));
const preventDefault = event => {
  event.preventDefault();
};

export default class DateInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue === undefined ? '' : props.defaultValue,
      expanded: props.defaultExpanded || false,
      focused: false
    };
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const props = this.prepareProps(this.props);

    const flexProps = assign({}, props);

    delete flexProps.activeDate;
    delete flexProps.rootClassName;
    delete flexProps.cleanup;
    delete flexProps.clearIcon;
    delete flexProps.collapseOnDateClick;
    delete flexProps.date;
    delete flexProps.dateFormat;
    delete flexProps.expanded;
    delete flexProps.defaultExpanded;
    delete flexProps.expandOnFocus;
    delete flexProps.footer;
    delete flexProps.forceValidDate;
    delete flexProps.locale;
    delete flexProps.onExpand;
    delete flexProps.onExpandChange;
    delete flexProps.onCollapse;
    delete flexProps.minDate;
    delete flexProps.maxDate;
    delete flexProps.pickerProps;
    delete flexProps.position;
    delete flexProps.showClock;
    delete flexProps.skipTodayTime;
    delete flexProps.strict;
    delete flexProps.valid;
    delete flexProps.validateOnBlur;
    delete flexProps.viewDate;
    delete flexProps.value;
    delete flexProps.text;
    delete flexProps.theme;
    delete flexProps.updateOnDateClick;
    delete flexProps.overlayProps;
    delete flexProps.relativeToViewport;
    delete flexProps.enableMonthDecadeViewAnimation;
    delete flexProps.showMonthDecadeViewAnimation;
    delete flexProps.updateOnWheel;
    delete flexProps.onTextChange;
    delete flexProps.focusedClassName;
    delete flexProps.expandedClassName;
    delete flexProps.invalidClassName;
    delete flexProps.onTimeChange;
    delete flexProps.okButton;
    delete flexProps.constrainTo;
    delete flexProps.defaultDate;

    if (typeof props.cleanup == 'function') {
      props.cleanup(flexProps);
    }

    return (
      <Flex inline row wrap={false} {...flexProps} onClick={this.handleClick}>
        {this.renderInput()}
        {this.renderClearIcon()}
        {this.renderCalendarIcon()}
        {this.renderPicker()}
      </Flex>
    );
  }

  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (!this.isLazyFocused()) {
      this.focus();
    }
  }

  renderInput() {
    const props = this.p;
    const inputProps = this.prepareInputProps(props);

    let input;

    if (props.renderInput) {
      input = props.renderInput(inputProps);
    }

    if (input === undefined) {
      input = props.children.filter(FIND_INPUT)[0];

      const FieldInput = props.forceValidDate ? DateFormatInput : Input;

      const propsForInput = assign({}, inputProps);

      if (!props.forceValidDate) {
        delete propsForInput.date;
        delete propsForInput.maxDate;
        delete propsForInput.minDate;
        delete propsForInput.dateFormat;
      }

      input = input ? (
        React.cloneElement(input, propsForInput)
      ) : (
        <FieldInput {...propsForInput} />
      );
    }

    return input;
  }

  renderClearIcon() {
    const props = this.p;
    const { rootClassName, disabled, text } = props;

    if (!props.clearIcon || props.forceValidDate) {
      return undefined;
    }

    const clearIcon = props.clearIcon === true ? CLEAR_ICON : props.clearIcon;

    const clearIconProps = {
      className: join(
        `${rootClassName}__clear-icon`,
        text === '' || text == null
          ? `${rootClassName}__clear-icon--hidden`
          : `${rootClassName}__clear-icon--animation`,
        disabled && `${rootClassName}__clear-icon--disabled`
      ),
      onMouseDown: preventDefault,
      onClick: this.onClearClick,
      children: clearIcon
    };

    let result;

    if (props.renderClearIcon) {
      result = props.renderClearIcon(clearIconProps);
    }

    if (result === undefined) {
      result = <InlineBlock {...clearIconProps} />;
    }

    return result;
  }

  onClearClick(event) {
    this.onFieldChange('');

    if (!this.isFocused()) {
      this.focus();
    }
  }

  renderCalendarIcon() {
    let result;
    const renderIcon = this.props.renderCalendarIcon;

    const { rootClassName } = this.props;
    const calendarIconProps = {
      className: `${rootClassName}__calendar-icon`,
      onMouseDown: this.onCalendarIconMouseDown,
      children: <div className={`${rootClassName}__calendar-icon-inner`} />
    };

    if (renderIcon) {
      result = renderIcon(calendarIconProps);
    }

    if (result === undefined) {
      result = <div {...calendarIconProps} />;
    }

    return result;
  }

  onCalendarIconMouseDown(event) {
    if (this.props.disabled) {
      return;
    }
    event.preventDefault();

    if (!this.isFocused()) {
      this.focus();
    }

    this.toggleExpand();
  }

  prepareExpanded(props) {
    return props.expanded === undefined ? this.state.expanded : props.expanded;
  }

  prepareDate(props, pickerProps) {
    props = props || this.p;
    pickerProps = pickerProps || props.pickerProps;

    const locale = props.locale || pickerProps.locale;
    const dateFormat =
      props.dateFormat === undefined
        ? pickerProps.dateFormat
        : props.dateFormat;

    let value = props.value === undefined ? this.state.value : props.value;

    const date = this.toMoment(value);
    const valid = date.isValid();

    if (value && typeof value != 'string' && valid) {
      value = this.format(date);
    }

    if (date && valid) {
      this.lastValidDate = date;
    } else {
      value = this.state.value;
    }

    const viewDate = this.state.viewDate || this.lastValidDate || new Date();
    const activeDate =
      this.state.activeDate || this.lastValidDate || new Date();

    return {
      viewDate,
      activeDate,
      dateFormat,
      locale,
      valid,
      date,
      value
    };
  }

  preparePickerProps(props) {
    const picker = getPicker(props, this);

    if (!picker) {
      return null;
    }

    return picker.props || {};
  }

  prepareProps(thisProps) {
    const props = (this.p = assign({}, thisProps));

    props.children = React.Children.toArray(props.children);

    props.expanded = this.prepareExpanded(props);
    props.pickerProps = this.preparePickerProps(props);

    const input = props.children.filter(FIND_INPUT)[0];

    if (input && input.type == 'input') {
      props.rawInput = true;
      props.forceValidDate = false;
    }

    const dateInfo = this.prepareDate(props, props.pickerProps);

    assign(props, dateInfo);

    if (props.text === undefined) {
      props.text = this.state.text;

      if (props.text == null) {
        props.text = props.valid && props.date ? props.value : this.props.value;
      }
    }

    if (props.text === undefined) {
      props.text = '';
    }

    props.className = this.prepareClassName(props);

    return props;
  }

  prepareClassName(props) {
    const { rootClassName } = props;
    const position =
      POSITIONS[props.pickerProps.position || props.pickerPosition] || 'bottom';

    return join([
      rootClassName,
      props.className,
      props.disabled && `${rootClassName}--disabled`,
      props.theme && `${rootClassName}--theme-${props.theme}`,
      `${rootClassName}--picker-position-${position}`,
      this.isLazyFocused() &&
        join(`${rootClassName}--focused`, props.focusedClassName),
      this.isExpanded() &&
        join(`${rootClassName}--expanded`, props.expandedClassName),
      !props.valid && join(props.invalidClassName, `${rootClassName}--invalid`)
    ]);
  }

  prepareInputProps(props) {
    const input = props.children.filter(FIND_INPUT)[0];
    const inputProps = (input && input.props) || {};
    const { rootClassName } = this.props;

    const onBlur = joinFunctions(inputProps.onBlur, this.onFieldBlur);
    const onFocus = joinFunctions(inputProps.onFocus, this.onFieldFocus);
    const onChange = joinFunctions(inputProps.onChange, this.onFieldChange);
    const onKeyDown = joinFunctions(inputProps.onKeyDown, this.onFieldKeyDown);

    const newInputProps = assign({}, inputProps, {
      ref: f => {
        this.field = f;
      },
      date: props.date,

      onFocus,
      onBlur,
      onChange,

      dateFormat: props.dateFormat,
      value: props.text || '',

      onKeyDown,
      placeholder: props.placeholder,

      className: join(`${rootClassName}__input`, inputProps.className)
    });

    assignDefined(newInputProps, {
      placeholder: props.placeholder,
      autoFocus: props.autoFocus,
      disabled: props.disabled,
      minDate: props.minDate,
      maxDate: props.maxDate
    });

    return newInputProps;
  }

  renderPicker() {
    const props = this.p;

    if (this.isExpanded()) {
      const newExpand = !this.picker;
      const picker = getPicker(props, this);

      const pickerProps = props.pickerProps;

      const onMouseDown = joinFunctions(
        pickerProps.onMouseDown,
        this.onPickerMouseDown
      );
      const onChange = joinFunctions(pickerProps.onChange, this.onPickerChange);

      const date = props.valid && props.date;
      const footer =
        pickerProps.footer !== undefined ? pickerProps.footer : props.footer;

      const viewDate = newExpand && date ? date : props.viewDate;
      const activeDate = newExpand && date ? date : props.activeDate;

      const pickerElement = React.cloneElement(
        picker,
        assignDefined(
          {
            ref: p => {
              this.picker = this.pickerView = p;

              if (p && p.getView) {
                this.pickerView = p.getView();
              }

              if (!this.state.viewDate) {
                this.onViewDateChange(props.viewDate);
              }
            },

            footer,
            okButton: props.okButton,
            enableMonthDecadeViewAnimation:
              props.enableMonthDecadeViewAnimation,
            showMonthDecadeViewAnimation: props.showMonthDecadeViewAnimation,

            focusOnNavMouseDown: false,
            focusOnFooterMouseDown: false,

            insideField: true,
            showClock: props.showClock,

            getTransitionTime: this.getTime,

            updateOnWheel: props.updateOnWheel,

            onClockInputBlur: this.onClockInputBlur,
            onClockEnterKey: this.onClockEnterKey,
            onClockEscapeKey: this.onClockEscapeKey,

            footerClearDate: props.clearDate || props.minDate,

            onFooterCancelClick: this.onFooterCancelClick,
            onFooterTodayClick: this.onFooterTodayClick,
            onFooterOkClick: this.onFooterOkClick,
            onFooterClearClick: this.onFooterClearClick,

            dateFormat: props.dateFormat,
            theme: props.theme || pickerProps.theme,
            arrows: props.navBarArrows,

            className: join(
              pickerProps.className,
              `${this.props.rootClassName}__picker`
            ),

            date: date || null,

            tabIndex: -1,

            viewDate,
            activeDate,
            locale: props.locale,

            triggerChangeOnTimeChange:
              this.props.triggerChangeOnTimeChange === undefined
                ? false
                : this.props.triggerChangeOnTimeChange,

            onViewDateChange: this.onViewDateChange,
            onActiveDateChange: this.onActiveDateChange,
            onTimeChange: this.onTimeChange,

            onTransitionStart: this.onTransitionStart,

            onMouseDown,
            onChange
          },
          {
            minDate: props.minDate,
            maxDate: props.maxDate
          }
        )
      );

      if (props.relativeToViewport) {
        return (
          <Overlay
            {...defaultOverlayProps}
            {...props.overlayProps}
            constrainTo={props.constrainTo}
          >
            {pickerElement}
          </Overlay>
        );
      }
      return pickerElement;
    }

    this.time = null;

    return null;
  }

  getValue() {
    return this.state.value || this.props.value;
  }

  onTimeChange(value, timeFormat) {
    const timeMoment = this.toMoment(value, { dateFormat: timeFormat });

    const time = ['hour', 'minute', 'second', 'millisecond'].reduce(
      (acc, part) => {
        acc[part] = timeMoment.get(part);
        return acc;
      },
      {}
    );

    this.time = time;
  }

  getTime() {
    return this.time;
  }

  setValue(value, config = {}) {
    const dateMoment = this.toMoment(value);
    const dateString = this.format(dateMoment);

    this.setDate(dateString, assign(config, { dateMoment }));
  }

  onFooterOkClick() {
    const activeDate = this.p.activeDate;

    if (activeDate) {
      const date = this.toMoment(activeDate);

      forwardTime(this.time, date);

      this.setValue(date, { skipTime: !!this.time });
    }

    this.setExpanded(false);
  }

  onFooterCancelClick() {
    this.setExpanded(false);
  }

  onFooterTodayClick() {
    const today = this.toMoment(new Date()).startOf('day');

    this.onPickerChange(this.format(today), { dateMoment: today });
    this.onViewDateChange(today);
    this.onActiveDateChange(today);

    return false;
  }

  onFooterClearClick() {
    const clearDate =
      this.props.clearDate === undefined
        ? this.props.minDate
        : this.props.clearDate;

    if (clearDate !== undefined) {
      this.setValue(clearDate, {
        skipTime: true
      });
    }

    this.setExpanded(false);

    return false;
  }

  toMoment(value, props) {
    if (moment.isMoment(value)) {
      return value;
    }

    props = props || this.p;

    let dateFormat = props.displayFormat;

    if (dateFormat === undefined) {
      dateFormat = props.dateFormat;
    }
    if (dateFormat === undefined) {
      dateFormat = this.p.dateFormat;
    }

    let date = toMoment(value, {
      strict: props.strict,
      locale: props.locale,
      dateFormat
    });

    if (!date.isValid() && props.displayFormat) {
      date = toMoment(value, {
        strict: props.strict,
        locale: props.locale,
        dateFormat:
          props.dateFormat === undefined ? this.p.dateFormat : props.dateFormat
      });
    }

    return date;
  }

  isValid(text) {
    if (text === undefined) {
      text = this.p.text;
    }

    return this.toMoment(text).isValid();
  }

  onViewDateChange(viewDate) {
    this.setState({
      viewDate
    });
  }

  onActiveDateChange(activeDate) {
    this.setState({
      activeDate
    });
  }

  onViewKeyDown(event) {
    const key = event.key;

    if (this.pickerView) {
      this.onPickerViewKeyDown(event);
    }
  }

  onPickerViewKeyDown(event) {
    this.pickerView.onViewKeyDown(event);
  }

  onPickerMouseDown(event) {
    preventDefault(event);

    if (!this.isFocused()) {
      this.focus();
    }
  }

  isMonthDecadeViewVisible() {
    if (this.picker && this.picker.isMonthDecadeViewVisible) {
      return this.picker.isMonthDecadeViewVisible();
    }

    return false;
  }

  onFieldKeyDown(event) {
    const key = event.key;
    const expanded = this.isExpanded();
    const monthDecadeVisible = this.isMonthDecadeViewVisible();

    if (key == 'Enter' && !monthDecadeVisible) {
      this.onViewKeyDown(event);
      this.toggleExpand();
      return false;
    }

    if (monthDecadeVisible && (key == 'Escape' || key == 'Enter')) {
      this.onViewKeyDown(event);
      return false;
    }

    if (key == 'Escape') {
      if (expanded) {
        this.setExpanded(false);
        return false;
      }
    }

    if (expanded) {
      if (key in NAV_KEYS) {
        this.onViewKeyDown(event);
        return false;
      }
    }

    return true;
  }

  getInput() {
    return findDOMNode(this.field);
  }

  isFocused() {
    return this.state.focused;
  }

  isLazyFocused() {
    return this.isFocused() || this.isTimeInputFocused();
  }

  isTimeInputFocused() {
    if (this.pickerView && this.pickerView.isTimeInputFocused) {
      return this.pickerView.isTimeInputFocused();
    }

    return false;
  }

  onFieldFocus(event) {
    if (this.state.focused) {
      return;
    }

    this.setState({
      focused: true
    });

    if (this.props.expandOnFocus) {
      this.setExpanded(true);
    }

    this.props.onFocus(event);
  }

  onFieldBlur(event) {
    if (!this.isFocused()) {
      return;
    }

    this.setState({
      focused: false
    });

    this.props.onBlur(event);

    if (!this.pickerView || !this.pickerView.isTimeInputFocused) {
      this.onLazyBlur();
      return;
    }

    setTimeout(() => this.onLazyBlur(), 0);
  }

  onClockEnterKey() {
    if (!this.isFocused()) {
      this.focus();
    }

    this.onFooterOkClick();
  }

  onClockEscapeKey() {
    if (!this.isFocused()) {
      this.focus();
    }

    this.onFooterCancelClick();
  }

  onClockInputBlur() {
    setTimeout(() => {
      if (!this.isFocused()) {
        this.onLazyBlur();
      }
    }, 0);
  }

  onLazyBlur() {
    if (this.unmounted) {
      return;
    }

    if (this.isTimeInputFocused()) {
      return;
    }

    this.setExpanded(false);

    if (this.props.onLazyBlur) {
      this.props.onLazyBlur();
    }

    if (!this.isValid() && this.props.validateOnBlur) {
      const value =
        this.lastValidDate && this.p.text != ''
          ? this.format(this.lastValidDate)
          : '';

      setTimeout(() => {
        this.onFieldChange(value);
      }, 0);
    }
  }

  onInputChange() {}

  isExpanded() {
    return this.p.expanded;
  }

  toggleExpand() {
    this.setExpanded(!this.p.expanded);
  }

  setExpanded(bool) {
    const props = this.p;

    if (bool === props.expanded) {
      return;
    }

    if (!bool) {
      this.onCollapse();
    } else {
      this.setState({}, () => {
        this.onExpand();
      });
    }

    if (bool && props.valid) {
      this.setState({
        activeDate: props.date
      });
    }

    if (this.props.expanded === undefined) {
      this.setState({
        expanded: bool
      });
    }

    this.props.onExpandChange(bool);
  }

  onCollapse() {
    this.props.onCollapse();
  }

  onExpand() {
    this.props.onExpand();
  }

  onFieldChange(value) {
    if (this.p.rawInput && typeof value != 'string') {
      const event = value;
      value = event.target.value;
    }

    const dateMoment = value == '' ? null : this.toMoment(value);

    if (dateMoment === null || dateMoment.isValid()) {
      this.onChange(dateMoment);
    }

    this.onTextChange(value);
  }

  onTextChange(text) {
    if (this.props.text === undefined) {
      this.setState({
        text
      });
    }

    if (this.props.onTextChange) {
      this.props.onTextChange(text);
    }
  }

  onPickerChange(dateString, { dateMoment, forceUpdate }, event) {
    const isEnter = event && event.key == 'Enter';
    const updateOnDateClick = forceUpdate
      ? true
      : this.props.updateOnDateClick || isEnter;

    const shouldCollapse = this.props.collapseOnDateClick || isEnter;

    if (updateOnDateClick) {
      forwardTime(this.time, dateMoment);

      this.setDate(dateString, { dateMoment });

      if (shouldCollapse) {
        this.setExpanded(false);
      }
    }
  }

  setDate(dateString, { dateMoment, skipTime = false }) {
    const props = this.p;

    const currentDate = props.date;

    if (props.valid && currentDate) {
      const dateFormat = props.dateFormat ? props.dateFormat.toLowerCase() : '';

      const hasTime =
        dateFormat.indexOf('k') != -1 || dateFormat.indexOf('h') != -1;

      if (hasTime && !skipTime) {
        ['hour', 'minute', 'second', 'millisecond'].forEach(part => {
          dateMoment.set(part, currentDate.get(part));
        });
      }
    }

    this.onTextChange(this.format(dateMoment));
    this.onChange(dateMoment);
  }

  onChange(dateMoment) {
    if (dateMoment != null && !moment.isMoment(dateMoment)) {
      dateMoment = this.toMoment(dateMoment);
    }

    forwardTime(this.time, dateMoment);

    const newState = {};

    if (this.props.value === undefined) {
      assign(newState, {
        text: null,
        value: dateMoment
      });
    }

    newState.activeDate = dateMoment;

    if (
      !this.pickerView ||
      !this.pickerView.isInView ||
      !this.pickerView.isInView(dateMoment)
    ) {
      newState.viewDate = dateMoment;
    }

    if (this.props.onChange) {
      this.props.onChange(this.format(dateMoment), { dateMoment });
    }

    this.setState(newState);
  }

  format(mom, format) {
    let theFormat = format;

    if (format === undefined) {
      theFormat = this.p.displayFormat;
    }
    if (format === undefined) {
      theFormat = this.p.dateFormat;
    }
    return mom == null ? '' : mom.format(theFormat);
  }

  focusField() {
    const input = findDOMNode(this.field);

    if (input) {
      input.focus();
    }
  }

  focus() {
    this.focusField();
  }
}

DateInput.defaultProps = {
  rootClassName: 'zippy-react-toolkit-date-input',
  showClock: undefined,
  relativeToViewport: true,
  enableMonthDecadeViewAnimation: true,
  showMonthDecadeViewAnimation: 300,
  overlayProps: undefined,

  forceValidDate: false,
  strict: false,

  expandOnFocus: true,

  updateOnDateClick: true,
  collapseOnDateClick: true,

  theme: 'default',

  footer: true,
  okButton: false,

  onBlur: () => {},
  onFocus: () => {},

  clearIcon: true,
  validateOnBlur: true,

  onExpandChange: () => {},
  onCollapse: () => {},
  onExpand: () => {},

  minDate: moment('1000-01-01', 'YYYY-MM-DD'),
  maxDate: moment('9999-12-31 HH:mm:ss', 'YYYY-MM-DD 23:59:59'),

  skipTodayTime: false
};

const DateType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.object,
  PropTypes.string
]);

DateInput.propTypes = {
  autoFocus: PropTypes.bool,
  rootClassName: PropTypes.string,
  dateFormat: PropTypes.string.isRequired,
  displayFormat: PropTypes.string,
  relativeToViewport: PropTypes.bool,
  showClock: PropTypes.bool,
  strict: PropTypes.bool,
  expandOnFocus: PropTypes.bool,
  updateOnDateClick: PropTypes.bool,
  collapseOnDateClick: PropTypes.bool,
  enableMonthDecadeViewAnimation: PropTypes.bool,
  showMonthDecadeViewAnimation: PropTypes.number,

  theme: PropTypes.string,
  footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  clearIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  validateOnBlur: PropTypes.bool,
  onExpandChange: PropTypes.func,
  onCollapse: PropTypes.func,
  onExpand: PropTypes.func,

  skipTodayTime: PropTypes.bool,

  date: DateType,
  value: DateType,
  defaultDate: DateType,
  viewDate: DateType,
  minDate: DateType,
  maxDate: DateType,
  activeDate: DateType,
  text: PropTypes.string,
  pickerProps: PropTypes.object,
  overlayProps: PropTypes.object,
  constrainTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
    PropTypes.bool
  ]),
  cleanup: PropTypes.func,
  expanded: PropTypes.bool,
  triggerChangeOnTimeChange: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  forceValidDate: PropTypes.bool,
  valid: PropTypes.bool,
  updateOnWheel: PropTypes.bool,
  clearDate: PropTypes.bool,
  navBarArrows: PropTypes.bool,
  locale: PropTypes.string,
  focusedClassName: PropTypes.string,
  expandedClassName: PropTypes.string,
  invalidClassName: PropTypes.string,
  placeholder: PropTypes.string,
  onTextChange: PropTypes.func,
  onMouseDown: PropTypes.func,
  onChange: PropTypes.func,
  renderInput: PropTypes.func,
  onLazyBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  position: PropTypes.oneOf(['top', 'bottom'])
};
