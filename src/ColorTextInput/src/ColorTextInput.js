/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isColorValid from './utils/isColorValid';
import join from '../../common/join';
import assign from '../../common/assign';
import cleanProps from '../../common/cleanProps';

import TextInput from '../../TextInput';

const Input = ({ value, onChange, ...rest }) => {
  return (
    <TextInput
      {...rest}
      value={value || ''}
      onChange={value => onChange(value)}
    />
  );
};

class ZippyColorTextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
      text: props.defaultText || (props.value || props.defaultValue)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.handleTextChange(nextProps.value);
    }
  }

  render() {
    const { props } = this;
    const {
      rootClassName,
      className,
      theme,
      colorPreviewPosition,
      rtl
    } = props;

    const colorInputClassName = join(
      rootClassName,
      className,
      theme && `${rootClassName}--theme-${theme}`,
      rtl && `${rootClassName}--rtl`
    );

    const colorPreviewPositionStart = colorPreviewPosition === 'start';

    return (
      <div
        {...cleanProps(props, ZippyColorTextInput.propTypes)}
        className={colorInputClassName}
      >
        {colorPreviewPositionStart && this.renderColorPreview()}
        <Input {...this.getInputProps()} />
        {!colorPreviewPositionStart && this.renderColorPreview()}
      </div>
    );
  }

  getInputProps() {
    const { props } = this;

    return {
      className: `${props.rootClassName}__input`,
      onChange: this.handleChange,
      value: this.getValue(),
      style: props.inputStyle,
      onBlur: this.handleInputBlur,
      rtl: props.rtl,
      ...props.inputProps
    };
  }

  renderColorPreview() {
    const { props } = this;
    const {
      colorPreviewSize,
      renderColorPreview,
      colorPreviewPosition,
      rootClassName
    } = props;

    let sizeStyle;
    if (colorPreviewSize) {
      sizeStyle =
        typeof colorPreviewSize === 'number'
          ? { width: colorPreviewSize, height: colorPreviewSize }
          : colorPreviewSize;
    }

    const value = this.getValue();
    const whiteValue = value === 'white' || '#ffffff';

    const domProps = {
      className: join(
        `${rootClassName}__color-preview`,
        whiteValue && `${rootClassName}__color-preview-white`,
        colorPreviewPosition &&
          `${rootClassName}__color-preview-${colorPreviewPosition}`
      ),
      ...props.colorPreviewProps,
      style: this.getColorPreviewStyle()
    };

    let result;
    if (typeof renderColorPreview === 'function') {
      result = renderColorPreview({ domProps, value });
    }

    if (result === undefined) {
      result = <div {...domProps} />;
    }

    return result;
  }

  // events
  handleChange(color) {
    if (!this.isValueControlled()) {
      this.setState({ value: color });
    }

    this.props.onChange(color);
  }

  handleTextChange(text) {
    if (!this.isTextControlled()) {
      this.setState({ text });
    }

    this.props.onTextChange(text);

    // if is valid call handle change
    if (isColorValid(text)) {
      this.handleChange(text);
    }
  }

  handleInputBlur() {
    // when input is blured it's text
    // should go back to value
    const value = this.getValue();
    const text = this.getText();
    if (value !== text) {
      this.handleTextChange(value);
    }
  }

  // methods
  getValue() {
    return this.isValueControlled() ? this.props.value : this.state.value;
  }

  isValueControlled() {
    return this.props.value != null;
  }

  isTextControlled() {
    return this.props.text != null;
  }

  getText() {
    return this.isTextControlled() ? this.props.text : this.state.text;
  }

  getColorPreviewStyle() {
    const { props } = this;
    const { colorPreviewSize, defaultBackground } = props;

    const value = this.getValue();

    let sizeStyle;
    if (colorPreviewSize) {
      sizeStyle =
        typeof colorPreviewSize === 'number'
          ? { width: colorPreviewSize, height: colorPreviewSize }
          : colorPreviewSize;
    }

    const emptyValue = value == null || value == '';
    const backgroundValue = emptyValue ? defaultBackground : value;

    return assign(
      {
        background: backgroundValue,
        ...sizeStyle,
        ...props.colorPreviewStyle
      },
      props.colorPreviewProps != null
        ? { ...props.colorPreviewProps.style }
        : null
    );
  }
}

function emptyFn() {}

ZippyColorTextInput.defaultProps = {
  theme: 'default',
  rootClassName: 'zippy-react-toolkit-color-text-input',
  onChange: emptyFn,
  onTextChange: emptyFn,
  colorPreviewSize: 20,
  colorPreviewPosition: 'start',
  defaultBackground: '#f4f4f4'
};

ZippyColorTextInput.propTypes = {
  rtl: PropTypes.bool,
  theme: PropTypes.string,
  rootClassName: PropTypes.string,
  defaultBackground: PropTypes.string,
  onChange: PropTypes.func,
  onTextChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  text: PropTypes.string,
  defaultText: PropTypes.string,
  inputProps: PropTypes.object,
  colorPreviewProps: PropTypes.object,
  colorPreviewStyle: PropTypes.object,
  renderColorPreview: PropTypes.func,
  colorPreviewSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  ]),
  inputStyle: PropTypes.object,
  colorPreviewPosition: PropTypes.oneOf(['start', 'end'])
};

export default ZippyColorTextInput;