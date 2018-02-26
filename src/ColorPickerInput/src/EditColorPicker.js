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

/**
 * A ColorPicker with two buttons, on and cancel.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorPicker from '../../ColorPicker';
import Button from '../../Button';
import cleanProps from '../../common/cleanProps';
import join from '../../common/join';

class ZippyEditColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue
    };

    this.handleOkClick = this.handleOkClick.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  render() {
    const { props, state } = this;
    const className = join(
      props.rootClassName,
      props.className,
      `${props.rootClassName}--theme-${props.theme}`
    );

    return (
      <div {...cleanProps(props, ZippyEditColorPicker.propTypes)} className={className}>
        <ColorPicker
          {...props.colorPickerProps}
          value={state.objectValue}
          defaultValue={props.defaultValue}
          onChange={this.handleColorChange}
        />
        {this.renderOkButton()}
        {this.renderCancelButton()}
      </div>
    );
  }

  renderOkButton() {
    const { props } = this;
    const buttonProps = {
      onClick: this.handleOkClick,
      children: 'ok'
    };

    let result;
    if (typeof props.renderOkButton === 'function') {
      result = props.renderOkButton({
        buttonProps,
        onClick: this.handleOkClick
      });
    }

    if (result === undefined) {
      result = <Button {...buttonProps} />;
    }

    return result;
  }

  renderCancelButton() {
    const { props } = this;
    const buttonProps = {
      onClick: this.handleCancelClick,
      children: 'cancel'
    };

    let result;
    if (typeof props.renderCancelButton === 'function') {
      result = props.renderCancelButton({
        buttonProps,
        onClick: this.handleCancelClick
      });
    }

    if (result === undefined) {
      result = <Button {...buttonProps} />;
    }

    return result;
  }

  handleOkClick() {
    this.props.onChange(this.state.value);
  }

  handleColorChange(stringColor, color) {
    this.setState({
      value: stringColor,
      objectValue: color
    });
  }
}

function emptyFn() {}

ZippyEditColorPicker.defaultProps = {
  rootClassName: 'zippy-react-toolkit-edit-color-picker',
  onChange: emptyFn,
  onDismiss: emptyFn
};

ZippyEditColorPicker.propTypes = {
  rootClassName: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onDismiss: PropTypes.func,
  renderOkButton: PropTypes.func,
  renderCancelButton: PropTypes.func,
  colorPickerProps: PropTypes.object
};

export default ZippyEditColorPicker;
