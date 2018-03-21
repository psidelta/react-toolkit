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
import cleanProps from '../../common/cleanProps';
import ColorPalette from '../../ColorPalette';
import Button from '../../Button';
import EditColorPicker from './EditColorPicker';
import join from '../../common/join';

import normalizePalette from './utils/normalizePalette';
import addColor from './utils/addColor';

class ZippyCustomColorPalette extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleColorPick = this.handleColorPick.bind(this);
    this.handleColorPickDismiss = this.handleColorPickDismiss.bind(this);
  }

  componentWillUnmount() {
    this.newColorRequestResolve = null;
  }

  render() {
    const { props } = this;

    const className = join(
      props.rootClassName,
      props.className,
      props.rtl && `${props.rootClassName}--rtl`,
      `${props.rootClassName}--theme-${props.theme}`
    );

    return (
      <div {...cleanProps(props, ZippyCustomColorPalette.propTypes)}>
        {!props.showColoPicker && this.renderButton()}
        {!props.showColoPicker && this.renderColorPalette()}
        {props.showColoPicker && this.renderColorPicker()}
      </div>
    );
  }

  renderColorPicker() {
    const { props } = this;

    const colorPickerProps = {
      defaultValue: props.value,
      onChange: this.handleColorPick,
      onDismiss: this.handleColorPickDismiss,
      renderOkButton: props.renderOkButton,
      renderCancelButton: props.renderCancelButton,
      colorPickerProps: props.colorPickerProps
    };

    // renderColorPicker

    let result;
    if (typeof props.renderColorPicker === 'function') {
      result = props.renderColorPicker({
        colorPickerProps,
        onDismiss: this.handleColorPickDismiss,
        onChange: this.handleColorPick
      });
    }

    if (result === undefined) {
      result = <EditColorPicker {...colorPickerProps} />;
    }

    return result;
  }

  renderButton() {
    const domProps = {
      onClick: this.handleButtonClick
    };

    return <Button {...domProps}>Custom Color</Button>;
  }

  handleButtonClick() {
    this.handleNewColorRequest();
  }

  renderColorPalette() {
    const paletteProps = {
      palette: this.getNormalizedPalette(),
      onItemClick: this.handleItemClick,
      value: this.props.value
    };

    return <ColorPalette {...paletteProps} />;
  }

  getNormalizedPalette() {
    const { props } = this;
    const customPalette = normalizePalette({
      length: props.paletteLength,
      palette: this.getPalette(),
      value: this.props.value,
      defaultValue: this.props.value
    });

    return customPalette;
  }

  handleColorPick(color) {
    // must send the color back to custom color palette
    const newPalette = addColor({
      color,
      palette: this.getPalette()
    });
    this.props.onNewColorRequestEnd(newPalette);
    this.setPalette(newPalette);
    this.props.onColorPick(color);
  }

  handleColorPickDismiss() {
    this.newColorRequestResolve = null;
    this.props.onNewColorRequestEnd();
  }

  handleItemClick({ color, index }) {
    /**
     * If a valid color is clicked (not empty space)
     * than onChange is called
     */
    const palette = this.getPalette();
    const isColorValid = palette && palette[index] !== undefined;

    if (isColorValid) {
      this.props.onChange(color);
    } else {
      /**
       * Request a new color
       * add it to the end of the palette
       * or at the first position if it is full
       */
      this.handleNewColorRequest();
    }
  }

  handleNewColorRequest() {
    this.props.onNewColorRequest();
  }

  isPaletteControlled() {
    return this.props.palette !== undefined;
  }

  getPalette() {
    return this.isPaletteControlled() ? this.props.palette : this.state.palette;
  }

  setPalette(palette) {
    if (!this.isPaletteControlled()) {
      this.setState({ palette });
    }

    this.props.onPaletteChange(palette);
  }
}

function emptyFn() {}

ZippyCustomColorPalette.defaultProps = {
  onChange: emptyFn,
  theme: 'default',
  onNewColorRequest: emptyFn,
  onPaletteChange: emptyFn,
  onColorPick: emptyFn,
  rootClassName: 'zippy-react-toolkit-custom-color-palette',
  paletteLength: 10,
  showColoPicker: false,
  rtl: false
};

ZippyCustomColorPalette.propTypes = {
  rtl: PropTypes.bool,
  rootClassName: PropTypes.string,
  theme: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  palette: PropTypes.arrayOf(PropTypes.string),
  paletteLength: PropTypes.number,
  onPaletteChange: PropTypes.func,
  onNewColorRequest: PropTypes.func,
  onNewColorRequestEnd: PropTypes.func,
  showColoPicker: PropTypes.bool,
  onColorPick: PropTypes.func,
  renderColorPicker: PropTypes.func,
  renderOkButton: PropTypes.func,
  renderCancelButton: PropTypes.func,
  colorPickerProps: PropTypes.object
};

export default ZippyCustomColorPalette;
