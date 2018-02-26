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

import 'typeface-roboto';

import ToolBar, { Separator } from '../src';
import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';
import SplitButton from '../../SplitButton';
import DropdownButton from '../../DropdownButton';
import Field from '../../Field';
import NumericInput from '../../NumericInput';
import '../style/index.scss';
import '../../Button/style/index.scss';
import '../../SplitButton/style/index.scss';
import '../../ButtonGroup/style/index.scss';
import '../../DropdownButton/style/index.scss';
import '../../NumericInput/style/index.scss';

import Window from '../../Window';
import '../../Window/style/index.scss';

let pressedIndex = 0;

const ICON_SIZE = 18;
const refresh = (
  <svg
    height={ICON_SIZE}
    viewBox="0 0 24 24"
    width={ICON_SIZE}
    style={{ verticalAlign: 'middle' }}
  >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const SETTING_ICON = (
  <svg fill="#495e85" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
  </svg>
);

const splitItems = [
  { label: 'Refresh', icon: refresh },
  { label: 'Back', disabled: true, icon: refresh },
  '-',
  {
    label: 'Save file as',
    icon: refresh,
    items: [
      { label: 'PDF' },
      { label: 'HTML' },
      { label: 'PNG' },
      { label: 'Animated GIF' }
    ]
  },
  { label: 'Open' },
  {
    label: 'Export sheet to',
    items: [{ label: 'CSV' }, { label: 'Proprietary format' }]
  }
];

const ResizableContainer = props => (
  <Window
    position={{ top: 90, left: 30 }}
    {...props}
    draggable={false}
    renderTitleBar={() => false}
    defaultSize={{ minWidth: 300 }}
    minSize={150}
    bodyScrollable={false}
  />
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strategy: 'scroll'
    };
  }

  render() {
    return (
      <div>
        <div
          style={{
            xbackground: '#5e9a2c',
            fontSize: 14,
            fontFamily: 'Roboto',

            // width: 200,
            border: '1px solid magenta',
            boxSizing: 'border-box'
          }}
        >
          <h1>ToolBar</h1>
          test
          <br />
          <br />
          <div style={{ padding: 20 }}>
            {' '}
            <ButtonGroup enablePressed={false}>
              <Button>simple</Button>
              <Button>simple</Button>
              <DropdownButton items={splitItems}>dd</DropdownButton>
              <Button>third</Button>
              <Button icon={refresh}>simple+icon</Button>
              <SplitButton icon={refresh} items={splitItems}>
                split+icon
              </SplitButton>
              <Button icon={refresh} rtl>
                simple+icon rtl
              </Button>
            </ButtonGroup>
            <br />
            <br />
            <DropdownButton disabled items={splitItems}>
              dd
            </DropdownButton>{' '}
            <DropdownButton icon={refresh} items={splitItems}>
              dd+icon
            </DropdownButton>{' '}
            <DropdownButton
              style={{ borderRadius: '15px' }}
              icon={refresh}
              rtl
              items={splitItems}
            >
              dd+icon rtl
            </DropdownButton>{' '}
            <br />
            <br />
            <SplitButton disabled items={splitItems}>
              split
            </SplitButton>{' '}
            <SplitButton icon={refresh} items={splitItems}>
              split+icon
            </SplitButton>{' '}
            <SplitButton iconPosition="start" icon={refresh} items={splitItems}>
              split+icon start
            </SplitButton>{' '}
            <SplitButton rtl icon={refresh} items={splitItems}>
              split+icon + rtl
            </SplitButton>{' '}
            <SplitButton
              style={{ borderRadius: '15px' }}
              icon={refresh}
              rtl
              items={splitItems}
            >
              split+icon rtl
            </SplitButton>{' '}
            <br />
            <br />
            <Button icon={refresh} /> <Button icon={refresh} disabled />{' '}
            <Button icon={refresh}>refresh</Button>{' '}
            <Button icon={refresh} disabled />{' '}
            <SplitButton items={splitItems}>split</SplitButton>{' '}
            <SplitButton items={splitItems} icon={refresh}>
              split
            </SplitButton>{' '}
            <SplitButton rtl items={splitItems} disabled>
              split rtl
            </SplitButton>{' '}
            <SplitButton rtl icon={refresh} items={splitItems} disabled>
              split rtl
            </SplitButton>{' '}
            <DropdownButton items={splitItems}>dropdown</DropdownButton>{' '}
            <DropdownButton rtl items={splitItems} disabled>
              dropdown rtl
            </DropdownButton>
          </div>
          <br />
          <br />
          {/* <ToolBar
        rtl={true}
      >
        <Button style={{width: 70}} focusedStyle={{background: 'lightskyblue'}}>start</Button>
        <Button style={{width: 70}} focusedStyle={{background: 'lightskyblue'}}>stop</Button>
        <Button style={{width: 70}} focusedStyle={{background: 'lightskyblue'}}>forward</Button>
        <Button style={{width: 70}} focusedStyle={{background: 'lightskyblue'}}>back</Button>
        <Button style={{width: 70}} focusedStyle={{background: 'lightskyblue'}}>cancel</Button>
      </ToolBar> */}
        </div>
        <div style={{ border: '2px solid green' }}>
          <ResizableContainer position={{ top: 460, left: 100 }}>
            <div style={{ marginBottom: 20 }}>
              overflowStategy:{' '}
              <select
                value={this.state.strategy}
                onChange={ev => this.setState({ strategy: ev.target.value })}
              >
                <option value="scroll">scroll</option>
                <option value="dropdown">dropdown</option>
              </select>
            </div>
            <ToolBar
              // xuseTransformOnScroll
              // xvertical
              // changeButtonStyles={false}
              overflowStrategy={this.state.strategy}
              ref={ref => (this.toolbar = ref)}
              // dropdownButtonProps={{
              //   style: {
              //     background: 'green'
              //   }
              // }}
              // renderDropdownButton={({ domProps }) => {
              //   domProps.id = 'helloWorld';
              // }}
              // xscrollOnMouseEnter={false}
              // style={{ xmaxWidth: 600, maxHeight: 400 }}
              // overflowStrategy="dropdown"
            >
              <DropdownButton items={splitItems} rtl={false} icon={refresh}>
                <div>yellow</div>
              </DropdownButton>
              <SplitButton items={splitItems} rtl={false} icon={refresh}>
                <div>yellow</div>
              </SplitButton>
              <Button icon={refresh} iconPosition="end">
                blue
              </Button>
              <DropdownButton
                renderMenuWhenCollapsed
                theme="light"
                items={splitItems}
                icon={SETTING_ICON}
              />
              <Separator />
              <Button theme="light">{refresh}blue</Button>
              <Button disabled>{refresh} red</Button>
              <Separator />
              <Field /> <NumericInput style={{ marginLeft: 10 }} />
              <SplitButton items={splitItems} icon={refresh}>
                split
              </SplitButton>
              <Button
                icon={refresh}
                onClick={() => {
                  console.log('clicked');
                }}
              >
                purple!!
              </Button>
              {/*<Button>purple</Button>
              <Button>purple</Button>
              <Button>purple</Button>
              <Button>purple</Button>
              <Button>purple</Button>
              <Button>purple</Button>
              <Button>purple</Button>
              <Button>green</Button>
              <Button>white</Button>
              <Button>gray</Button>
              <button ref={ref => (this.button = ref)}>orange</button>*/}
            </ToolBar>
          </ResizableContainer>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
