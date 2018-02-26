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
import assign from '../../common/assign';
import { autoBind } from '@zippytech/react-class';

import cleanProps from '../../common/cleanProps';
import join from '../../common/join';
import SaturationSpectrum from './SaturationSpectrum';
import SlideSpectrum from './SlideSpectrum';
import RGBA from './RGBA';

import { toHsv } from './utils/color';
import toStringValue from './utils/toStringValue';

class ZippyColorPicker extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    const value = this.toColorValue(props.value || this.props.defaultValue);
    this.state = { value };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({
        value: this.normalizeValue(nextProps.value)
      });
    }
  }

  render() {
    const props = this.props;
    const className = join(props.className, props.rootClassName);
    const defaultProps = this.getPropsFromChildren();

    return (
      <div
        {...cleanProps(props, ZippyColorPicker.propTypes)}
        className={className}
      >
        <SaturationSpectrum
          inPicker
          {...this.getSaturationProps(defaultProps.spectrum)}
        />
        <SlideSpectrum type="hue" {...this.getHueProps(defaultProps.hue)} />
        <SlideSpectrum
          type="alpha"
          {...this.getAlphaProps(defaultProps.alpha)}
        />
        <RGBA {...this.getRGBAProps()} />
      </div>
    );
  }

  getRGBAProps() {
    return {
      ...this.getCommonProps(),
      rootClassName: `${this.props.rootClassName}__rgba`
    };
  }

  getAlphaProps(defaultProps) {
    const { props } = this;
    const style = {
      ...props.alphaStyle
    };

    return {
      ...defaultProps,
      ...this.getCommonProps(),
      style,
      height: props.alphaHeight,
      width: props.alphaWidth,
      rootClassName: `${props.rootClassName}__slider`
    };
  }

  getHueProps(defaultProps) {
    const { props } = this;

    const style = {
      ...props.hueStyle,
      marginLeft: this.props.hueMargin
    };

    return {
      ...defaultProps,
      ...props.hueProps,
      ...this.getCommonProps(),
      height: props.hueHeight,
      width: props.hueWidth,
      style,
      rootClassName: `${props.rootClassName}__slider`
    };
  }

  getSaturationProps(defaultProps) {
    const commonProps = this.getCommonProps();
    commonProps.onDrag = color => {
      const stringValue = this.toStringValue(color);
      this.handleDrag(stringValue, color);
    };
    commonProps.onChange = value => {
      this.handleChange(null, value);
    };
    const { props } = this;
    const saturationProps = {
      ...defaultProps,
      ...commonProps,
      width: props.saturationWidth,
      height: props.saturationHeight
    };

    return saturationProps;
  }

  getCommonProps() {
    return {
      onDrag: this.handleDrag,
      onChange: this.handleChange,
      value: this.getValue()
    };
  }

  isValueControlled() {
    return this.props.value != null;
  }

  getValue() {
    const isValueControlled = this.props.value != null;
    let value;

    if (isValueControlled) {
      value = this.state.isDragging ? this.state.value : this.props.value;
    } else {
      value = this.state.value;
    }

    const color = this.normalizeValue(this.toColorValue(value));

    return color;
  }

  getPropsFromChildren() {
    const { props } = this;
    const { children } = props;
    let hueSpectrumProps = null;
    let saturationSpectrumProps = null;
    let alphaSpectrumProps = null;

    if (children) {
      React.Children.toArray(children).forEach(child => {
        if (child && child.props) {
          if (child.props.type && child.props.type === 'hue') {
            hueSpectrumProps = assign({}, child.props);
          }
          if (child.props.isSaturationSpectrum) {
            saturationSpectrumProps = assign({}, child.props);
          }
          if (child.props.type && child.props.type === 'alpha') {
            alphaSpectrumProps = assign({}, child.props);
          }
        }
      });
    }

    return {
      hue: hueSpectrumProps,
      saturation: saturationSpectrumProps,
      alpha: alphaSpectrumProps
    };
  }

  toColorValue(value) {
    return typeof value == 'string' ? toHsv(value) : value;
  }

  toStringValue(...args) {
    return toStringValue(...args);
  }

  handleDrag(stringValue, color) {
    stringValue = stringValue || this.toStringValue(color);

    this.setState({
      value: color,
      isDragging: true
    });

    this.props.onDrag(stringValue, color);
  }

  normalizeValue(value) {
    const newValue = this.toColorValue(value);
    if (newValue && newValue.a == null) {
      newValue.a = 1;
    }

    return newValue;
  }

  handleChange(stringValue, value) {
    stringValue = stringValue || this.toStringValue(value);
    this.setState({ isDragging: false });
    this.props.onChange(stringValue, value);
  }
}

const emptyFn = () => {};

ZippyColorPicker.defaultProps = {
  rootClassName: 'zippy-react-toolkit-color-picker',
  onDrag: emptyFn,
  onChange: emptyFn,

  defaultValue: 'red',

  hueHeight: 300,
  hueMargin: 10,
  hueWidth: 30,

  saturationWidth: 300,
  saturationHeight: 300,

  alphaHeight: 300,
  alphaWidth: 30
};

ZippyColorPicker.propTypes = {
  rootClassName: PropTypes.string,
  defaultValue: PropTypes.string,
  hueStyle: PropTypes.object,
  hueHeight: PropTypes.number,
  hueMargin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hueWidth: PropTypes.number,
  saturationHeight: PropTypes.number,
  saturationWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  alphaStyle: PropTypes.object,
  alphaHeight: PropTypes.number,
  alphaWidth: PropTypes.number
};

export default ZippyColorPicker;
