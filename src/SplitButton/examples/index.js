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
import { render } from 'react-dom';
import SplitButton from '../src';
import '../style/index.scss';
import RadioButtonGroup from '../../RadioButtonGroup';
import '../../RadioButtonGroup/style/index.scss';
const PREVIEW_ICON = (
  <svg
    fill="#000000"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z" />
  </svg>
);

const themeOptions = ['light', 'default'].map(value => {
  return { value, label: value };
});

const items = [
  {
    label: 'New',
    icon: PREVIEW_ICON,
    cellStyle: { color: 'red' }
  },
  {
    label: 'Options',
    disabled: true
  },
  {
    label: 'Format'
  },
  { label: 'Save' },
  '-',
  { label: 'Export as' },
  { label: 'Document' }
];

const overStyle = {
  color: 'aqua',
  background: 'red'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showSplit: false, theme: 'default' };
  }
  showSplit() {
    this.setState({ showSplit: !this.state.showSplit });
  }

  render() {
    return (
      <div style={{ margin: 100 }}>
        {/* <h1>Split button</h1> */}
        {/* <button onClick={this.showSplit.bind(this)}>Show split</button> */}
        {/* {this.state.showSplit && */}
        <div style={{ margin: 20 }}>
          Button theme:
          <RadioButtonGroup
            style={{ marginLeft: 20 }}
            orientation="horizontal"
            radioOptions={themeOptions}
            radioValue={this.state.theme}
            onChange={({ checkedItemValue: theme }) => this.setState({ theme })}
          />
        </div>
        <SplitButton
          onDropdownButtonClick={() => console.log('dropdown button click')}
          onExpandedChange={expanded => console.log('expand change')}
          onMenuClick={() => console.log('onMenuClick')}
          onClick={() => console.log('button clicked')}
          dropdownButtonProps={{ children: 'hello world' }}
          theme={this.state.theme}
          menuProps={{
            maxHeight: 150,
            submenuMaxHeight: 75,
            enableAnimation: true,
            columns: ['icon', { name: 'label', colspan: 10 }]
          }}
          // dropdownButtonWrapperProps={{
          //   buttonProps: { overStyle }
          // }}
          // dropdownButtonProps={overStyle}
          items={items}
        >
          Hello
        </SplitButton>
        {/* } */}
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
