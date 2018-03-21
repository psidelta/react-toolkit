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
import ColorTextInput from '../../ColorTextInput';
import Button from '../../Button';
import ColorPalette from '../../ColorPalette';

import ToggleIcon from '../../common/ToggleIcon';
import CustomColorPalette from './CustomColorPalette';

import join from '../../common/join';
import cleanProps from '../../common/cleanProps';
import registerHideOnClickOutsideEventListener from '../../common/registerHideOnClickOutsideEventListener';

class ZippyColorPickerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      expanded: props.defaultExpanded,
      customPalette: props.defaultCustomPalette
    };

    this.setValue = this.setValue.bind(this);
    this.handleExpandButtonClick = this.handleExpandButtonClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleNewColorRequest = this.handleNewColorRequest.bind(this);
    this.handleNewColorRequestEnd = this.handleNewColorRequestEnd.bind(this);
    this.handleCustomPalleteChange = this.handleCustomPalleteChange.bind(this);
    this.setValue = this.setValue.bind(this);

    this.setRootNode = ref => {
      this.rootNode = ref;
    };
  }

  componentDidMount() {
    if (this.props.collapseOnClickOutside) {
      this.unregisterOnClickOutside = registerHideOnClickOutsideEventListener({
        getRootNode: () => this.rootNode,
        onHide: () => this.collapse()
      });
    }
  }

  componentWillUnmount() {
    if (this.unregisterOnClickOutside) {
      this.unregisterOnClickOutside();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setExpanded(false);
    }
  }

  render() {
    const { props, state } = this;
    const className = join(
      props.rootClassName,
      props.className,
      props.rtl && `${props.rootClassName}--rtl`,
      `${props.rootClassName}--theme-${props.theme}`
    );

    const showColoPicker = state.newColorRequest;

    return (
      <div
        {...cleanProps(props, ZippyColorPickerInput.propTypes)}
        className={className}
        ref={this.setRootNode}
      >
        {this.renderColorTextInput()}
        {this.renderExpandButton()}
        {this.getExpanded() && (
          <div className={`${props.rootClassName}__overlay`}>
            {props.showColorPalette &&
              !showColoPicker &&
              this.renderColorPalette()}
            {props.showCustomPalette &&
              this.renderCustomColorPalette(showColoPicker)}
          </div>
        )}
      </div>
    );
  }

  renderCustomColorPalette(showColoPicker) {
    const { props } = this;
    const domProps = {
      onNewColorRequest: this.handleNewColorRequest,
      onNewColorRequestEnd: this.handleNewColorRequestEnd,
      value: this.getValue(),
      onChange: this.setValue,
      onColorPick: this.setValue,
      onPaletteChange: this.handleCustomPalleteChange,
      palette: this.getCustomPalette(),
      paletteLength: props.customPaletteLength,
      showColoPicker,
      rtl: props.rtl,
      renderColorPicker: props.renderColorPicker,
      renderOkButton: props.renderOkButton,
      renderCancelButton: props.renderCancelButton,
      colorPickerProps: props.colorPickerProps
    };

    return <CustomColorPalette {...domProps} />;
  }

  renderExpandButton() {
    const { props } = this;
    const expanded = this.getExpanded();

    const toggleIcon = (
      <ToggleIcon
        className={join(`${props.rootClassName}__expand-button__icon`)}
        expanded={expanded}
      />
    );

    const buttonProps = {
      className: join(
        `${props.rootClassName}__button`,
        `${props.rootClassName}__expand-button`
      ),
      theme: null,
      children: toggleIcon,
      onClick: this.handleExpandButtonClick
    };

    let result;
    if (typeof props.renderExpandButton === 'function') {
      result = props.renderExpandButton({
        buttonProps,
        expanded,
        collapse: () => this.collapse(),
        expand: () => this.expand(),
        onClick: this.handleExpandButtonClick
      });
    }

    if (result === undefined) {
      result = <Button {...buttonProps} />;
    }

    return result;
  }

  renderColorTextInput() {
    const { props } = this;
    const value = this.getValue();

    const colorTextInputProps = {
      value,
      rootClassName: `${props.rootClassName}__color-input`,
      onChange: this.setValue,
      onTextChange: props.onTextChange,
      text: props.text,
      defaultText: props.defaultText,
      onFocus: this.handleFocus,
      rtl: props.rtl,
      ...props.colorTextInputProps
    };

    let result;
    if (typeof props.renderColorTextInput === 'function') {
      result = props.renderColorTextInput({
        value,
        colorTextInputProps,
        onChange: this.setValue
      });
    }

    if (result === undefined) {
      result = <ColorTextInput {...colorTextInputProps} />;
    }

    return result;
  }

  renderColorPalette() {
    const { props } = this;
    const { colorPalette, colorPaletteProps } = props;
    const value = this.getValue();
    const paletteProps = {
      value,
      className: `${props.rootClassName}__color-palette`,
      onChange: this.setValue,
      palette: colorPalette,
      ...colorPaletteProps
    };

    let result;
    if (typeof this.props.renderColorPalette === 'function') {
      result = this.props.renderColorPalette({
        colorPalette,
        paletteProps,
        onChange: this.setValue
      });
    }
    if (result === undefined) {
      result = <ColorPalette {...paletteProps} />;
    }

    return result;
  }

  // value
  setValue(color) {
    if (!this.isValueControlled()) {
      this.setState({ value: color });
      if (this.props.collapseOnValueChange) {
        this.setExpanded(false);
      }
    }

    this.props.onChange(color);
  }

  getValue() {
    return this.isValueControlled() ? this.props.value : this.state.value;
  }

  isValueControlled() {
    return this.props.value != null;
  }

  // expanded
  handleExpandButtonClick() {
    const nextExpanded = !this.getExpanded();
    this.setExpanded(nextExpanded);
  }

  setExpanded(expanded) {
    if (!this.isExpandedControlled()) {
      this.setState({ expanded });
    }

    this.props.onExpandChange(expanded);
  }

  getExpanded() {
    return this.isExpandedControlled()
      ? this.props.expanded
      : this.state.expanded;
  }

  isExpandedControlled() {
    return this.props.expanded != null;
  }

  // custom palette
  isCustomPaletteControlled() {
    return this.props.customPalette !== undefined;
  }

  getCustomPalette() {
    return this.isCustomPaletteControlled()
      ? this.props.customPalette
      : this.state.customPalette;
  }

  setCustomPalette(customPalette) {
    if (!this.isCustomPaletteControlled()) {
      this.setState({ customPalette });
    }

    this.props.onCustomPaletteChange(customPalette);
  }

  handleCustomPalleteChange(palette) {
    this.setCustomPalette(palette);
  }

  collapse() {
    this.setExpanded(false);
  }

  expand() {
    this.setExpanded(true);
  }

  // envets
  handleFocus() {
    const expanded = this.getExpanded();
    if (!expanded) {
      this.setExpanded(true);
    }
  }

  handleNewColorRequest() {
    this.setState({
      newColorRequest: true
    });
  }

  handleNewColorRequestEnd() {
    this.setState({
      newColorRequest: false
    });
  }
}

function emptyFn() {}

ZippyColorPickerInput.defaultProps = {
  theme: 'default',
  rootClassName: 'zippy-react-toolkit-color-picker-input',
  onChange: emptyFn,
  rtl: false,

  // expand
  defaultExpanded: false,
  collapseOnValueChange: true,
  expandOnFocus: true,
  onExpandChange: emptyFn,
  collapseOnClickOutside: true,

  // show color palette
  showColorPalette: true,

  // custom color palette
  showCustomPalette: true,
  customPaletteLength: 10,
  onCustomPaletteChange: emptyFn
};

ZippyColorPickerInput.propTypes = {
  theme: PropTypes.string,
  rootClassName: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  rtl: PropTypes.bool,

  // ColorTextInput
  colorTextInputProps: PropTypes.object,
  onTextChange: PropTypes.func,
  text: PropTypes.string,
  defaultText: PropTypes.string,
  renderColorTextInput: PropTypes.func,

  // expand change
  expandOnFocus: PropTypes.bool,
  expanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  collapseOnValueChange: PropTypes.bool,
  onExpandChange: PropTypes.func,
  collapseOnClickOutside: PropTypes.bool,
  renderExpandButton: PropTypes.func,

  // color palette
  showColorPalette: PropTypes.bool,
  colorPaletteProps: PropTypes.object,
  colorPalette: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  renderColorPalette: PropTypes.func,

  // custom color palette
  showCustomPalette: PropTypes.bool,
  customPaletteLength: PropTypes.number,
  onCustomPaletteChange: PropTypes.func,
  customPalette: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  defaultCustomPalette: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),

  // colior picker
  renderColorPicker: PropTypes.func,
  renderOkButton: PropTypes.func,
  renderCancelButton: PropTypes.func,
  colorPickerProps: PropTypes.object
};

export default ZippyColorPickerInput;
