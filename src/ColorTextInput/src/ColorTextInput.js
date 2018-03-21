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
import isColorValid from './utils/isColorValid';
import join from '../../common/join';
import cleanProps from '../../common/cleanProps';

const TextInput = ({ value, onChange, ...rest }) => {
  return (
    <input
      {...rest}
      type="text"
      value={value || ''}
      onChange={event => onChange(event.target.value)}
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
    const className = join(
      props.rootClassName,
      props.className,
      `${props.rootClassName}--theme-${props.theme}`,
      props.rtl && `${props.rootClassName}--rtl`
    );

    const colorPreviewPositionStart = props.colorPreviewPosition === 'start';

    return (
      <div
        {...cleanProps(props, ZippyColorTextInput.propTypes)}
        className={className}
      >
        {colorPreviewPositionStart && this.renderColorPreview()}
        <TextInput {...this.getInputProps()} />
        {!colorPreviewPositionStart && this.renderColorPreview()}
      </div>
    );
  }

  getInputProps() {
    const { props } = this;

    return {
      className: `${props.rootClassName}__input`,
      onChange: this.handleTextChange,
      value: this.getText(),
      style: props.inputStyle,
      onBlur: this.handleInputBlur,
      ...props.inputProps
    };
  }

  renderColorPreview() {
    const { props } = this;
    const { colorPreviewSize, renderColorPreview } = props;

    let sizeStyle;
    if (colorPreviewSize) {
      sizeStyle =
        typeof colorPreviewSize === 'number'
          ? { width: colorPreviewSize, height: colorPreviewSize }
          : colorPreviewSize;
    }

    const value = this.getValue();

    const domProps = {
      className: `${props.rootClassName}__color-preview`,
      ...props.colorPreviewProps,
      style: {
        background: value,
        ...sizeStyle,
        ...props.colorPreviewStyle
      }
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
}

function emptyFn() {}

ZippyColorTextInput.defaultProps = {
  theme: 'default',
  rootClassName: 'zippy-react-toolkit-color-text-input',
  onChange: emptyFn,
  onTextChange: emptyFn,
  colorPreviewSize: 12,
  colorPreviewPosition: 'start'
};

ZippyColorTextInput.propTypes = {
  rtl: PropTypes.bool,
  theme: PropTypes.string,
  rootClassName: PropTypes.string,
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
