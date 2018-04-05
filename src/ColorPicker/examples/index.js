/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../style/index.scss';

import React from 'react';
import { render } from 'react-dom';
import ColorPicker from '../src';
import ColorPalette from '../../ColorPalette';
import ColorPickerInput from '../../ColorPickerInput';
import ColorTextInput from '../../ColorTextInput';
import TextInput from '../../TextInput';
import Button from '../../Button';

import '../style/index.scss';
import '../../ColorPalette/style/index.scss';
import '../../ColorPickerInput/style/index.scss';
import '../../ColorTextInput/style/index.scss';
import '../../TextInput/style/index.scss';
import '../../Button/style/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    autoBind(this);
    this.state = {
      color: '#1b3f9c',
      customValue: '#ff5500',
      rtl: false,
      rtlTextInput: false,
      collapseOnValueChange: true,
      text: 'Simple text',
      showColorPreview: true,
      expandOnFocus: true,
      expanded: false,
      showColorPalette: true,
      showCustomPalette: true,
      customPaletteLength: 12,
      customPalette: ['red', 'yellow', 'blue', 'green'],
      customText: 'custom text',
      textValue: 'lightgreen',
      size: 20,
      colorPreviewPosition: 'start'
    };
  }

  onChange(stringColor, color) {
    this.setState({
      color,
      stringColor
    });

  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 3000 }}>
        <div style={{ marginBottom: 20 }}>
          <h3>ColorPicker</h3>
          <ColorPicker
            // defaultValue="#ff5500"
            hueStyle={{ border: '2px solid green', marginRight: 5 }}
            hueHeight={350}
            hueMargin={10}
            hueWidth={40}
            saturationHeight={350}
            saturationWidth={300}
            // value={this.state.color}
            // onChange={this.onChange}
            alphaStyle={{ border: '2px solid green' }}
            alphaHeight={350}
            alphaWidth={40}
          />
        </div>
        <div style={{ marginBottom: 60 }}>
          <h3>ColorPickerInput</h3>
          <ColorPickerInput
            value={this.state.value}
            onChange={value => this.setState({ value })}
            defaultValue="green"
          />

        </div>

        <div style={{ marginBottom: 40 }}>
          <h3>ColorPickerInput</h3>
          <div style={{ marginBottom: 20 }}>
            <input
              type="checkbox"
              checked={this.state.rtl}
              onChange={ev => this.setState({ rtl: ev.target.checked })}
            />right-to-left
            <br />
            <input
              type="checkbox"
              checked={this.state.collapseOnValueChange}
              onChange={ev =>
                this.setState({ collapseOnValueChange: ev.target.checked })
              }
            />collapseOnValueChange
            <br />
            <input
              type="checkbox"
              checked={this.state.expandOnFocus}
              onChange={ev =>
                this.setState({ expandOnFocus: ev.target.checked })
              }
            />expandOnFocus (// this prop doesn't work properly)
            <br />
            <input
              type="checkbox"
              checked={this.state.expanded}
              onChange={ev => this.setState({ expanded: ev.target.checked })}
            />expanded
            <br />
            <input
              type="checkbox"
              checked={this.state.collapseOnClickOutside}
              onChange={ev =>
                this.setState({ collapseOnClickOutside: ev.target.checked })
              }
            />collapseOnClickOutside
            <br />
            <input
              type="checkbox"
              checked={this.state.showColorPalette}
              onChange={ev =>
                this.setState({ showColorPalette: ev.target.checked })
              }
            />showColorPalette
            <br />
            <input
              type="checkbox"
              checked={this.state.showCustomPalette}
              onChange={ev =>
                this.setState({ showCustomPalette: ev.target.checked })
              }
            />showCustomPalette
            <br />
            customPaletteLength:{' '}
            <input
              type="number"
              style={{ width: 70 }}
              value={this.state.customPaletteLength}
              onChange={ev =>
                this.setState({ customPaletteLength: ev.target.value })
              }
            />
            <br />
          </div>
          <ColorPickerInput
            value={this.state.customValue}
            onChange={customValue => this.setState({ customValue })}
            // defaultValue={'chocolate'}
            rtl={this.state.rtl}
            // defaultExpanded={true}
            collapseOnValueChange={this.state.collapseOnValueChange}
            // colorTextInputProps={{
            //   style: { border: '1px solid orange' }
            // }}
            text="Simple text"
            onTextChange={text => this.setState({ text })}
            // defaultText="default text"
            // renderColorTextInput={() => <div>Color text input</div>}
            expandOnFocus={this.state.expandOnFocus}
            // expanded={this.state.expanded}
            // defaultExpanded
            // onExpandChange={expanded => this.setState({ expanded })}
            collapseOnClickOutside={true}
            // renderExpandButton={buttonProps => (
            //   <Button {...buttonProps}>B</Button>
            // )}
            showColorPalette={this.state.showColorPalette}
            // colorPaletteProps={{
            //   style: { outline: '1px solid red' },
            //   colorPaletteWidth: 400
            // }}
            // colorPalette={['red', 'yellow', 'blue']}
            // renderColorPalette={(paletteProps, colorPalette) => {
            //   return <ColorPalette {...paletteProps} {...colorPalette} />;
            // }}
            showCustomPalette={this.state.showCustomPalette}
            customPaletteLength={this.state.customPaletteLength * 1}
            // customPalette={this.state.customPalette}
            // onCustomPaletteChange={customPalette =>
            //   this.setState({ customPalette })
            // }
            defaultCustomPalette={['red']}
            renderColorPicker={props => {
              return (
                <ColorPicker
                  value={props.colorPickerProps.defaultValue}
                  onChange={props.onChange}
                />
              );
            }}
            renderOkButton={props => {
              console.log(props);
              return <Button {...props}>Sure</Button>;
            }}
            renderCancelButton={props => {
              console.log(props);
              return <Button {...props}>Nop</Button>;
            }}
            colorPickerProps={{
              style: {
                outline: '1px solid orange'
              },
              onClick: () => alert('click')
            }}
          />
        </div>

        <div style={{ marginBottom: 40 }}>
          <h3>ColorPalette</h3>
          <ColorPalette
          // style={{ outline: '1px solid blue' }}
          // colorPaletteWidth={400}
          />
        </div>
        <div style={{ marginBottom: 40 }}>
          <h3>ColorPalette</h3>
          <ColorPalette />
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3>ColorTextInput</h3>
          <div style={{ marginBottom: 20 }}>
            <input
              type="checkbox"
              checked={this.state.rtlTextInput}
              onChange={ev =>
                this.setState({ rtlTextInput: ev.target.checked })
              }
            />right-to-left
            <br />
            size:{' '}
            <input
              type="number"
              style={{ width: 70 }}
              value={this.state.size}
              onChange={ev => this.setState({ size: ev.target.value })}
            />
            <br />
            colorPreviewPosition
            <select
              value={this.state.colorPreviewPosition}
              onChange={ev =>
                this.setState({ colorPreviewPosition: ev.target.value })
              }
            >
              <option value="start">start</option>
              <option value="end">end</option>
            </select>
          </div>
          <ColorTextInput
            // defaultValue="orange"
            // defaultText="Some default text"
            text={this.state.customText}
            onTextChange={customText => this.setState({ customText })}
            value={this.state.textValue}
            onChange={textValue => this.setState({ textValue })}
            rtl={this.state.rtlTextInput}
            style={{ border: '1px solid #525252', minWidth: 150 }}
            // inputProps={{ style: { border: '1px solid red' } }}
            // colorPreviewProps={{ style: { border: '1px solid black' } }}
            // colorPreviewStyle={{ border: '3px solid red' }}
            renderColorPreview={props => {
              return <div value={props.value} {...props.domProps} />;
            }}
            colorPreviewSize={this.state.size * 1}
            // inputStyle={{ border: '1px solid red' }}
            colorPreviewPosition={this.state.colorPreviewPosition}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
