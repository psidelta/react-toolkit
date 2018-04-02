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
      <div
        {...cleanProps(props, ZippyEditColorPicker.propTypes)}
        className={className}
      >
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
