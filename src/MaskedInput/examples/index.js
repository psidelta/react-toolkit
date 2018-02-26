import React, { Component } from 'react';
import { render } from 'react-dom';
import MaskedInput from '.././src/MaskedInput';

import '../style/index.scss';

const onChange = props => {
  console.log('onChange', props);
};

const onBlur = props => {
  console.log('onBlur', props);
};

const onFocus = props => {
  console.log('onFocus', props);
};

const hexCodeDefinitions = {
  '#': undefined,
  h: /[A-Fa-f0-9]/
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '123-406-7800',
      enableClearButton: true
    };
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <h4>000-000-0000</h4>
        <MaskedInput
          ref={m => (this.mask = m)}
          mask="(000)-000-0000"
          enableClearButton={this.state.enableClearButton}
          value={value}
          onChange={({ currentValue }) => {
            this.setState({ value: currentValue });
          }}
        />
        <br />
        <br />
        <input
          type="checkbox"
          checked={this.state.enableClearButton}
          onChange={ev =>
            this.setState({ enableClearButton: ev.target.checked })
          }
        />enableClearButton
        <br />
        <br />
        <button onClick={() => console.log('getValue: ', this.mask.getValue())}>
          getValue
        </button>
        <input type="text" placeholder="placeholder" />
        {/*<h4>#hhhhhh mask with h definition = a-f0-9</h4>
        <MaskedInput
          mask="#(000)-000-000"
          maskDefinitions={hexCodeDefinitions}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <h4>No mask</h4>
        <MaskedInput readOnly />
        <h4>Phone number</h4>
        <MaskedInput
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          mask="+40(999) 999 999"
        />
        <h4>Placeholder</h4>
        <MaskedInput placeholder="test" />
        <h4>Input styles and classname</h4>
        <MaskedInput
          className="new-class-name"
          style={{ opacity: 0.8, background: 'blue' }}
        />
        <h4>Disabled input</h4>
        <MaskedInput defaultValue="disabled value" disabled />
        <h4>Locked input</h4>
        <MaskedInput defaultValue="locked value" locked />
        <h4>hideMaskFillOnBlur=true</h4>
        <MaskedInput
          defaultValue={'074'}
          mask="+40(999) 999 999"
          hideMaskFillOnBlur
        />*/}
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
