/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';

import 'typeface-roboto';

import ToolBar, { Separator } from '../src';
import '../style/index.scss';

import ResizableContainer from './ResizableContainer';
import {
  newButton,
  iconButton,
  deleteButton,
  settingsButton,
  menuButton,
  undoButton,
  redoButton,
  mailButton,
  separator
} from './toolbarChildrens';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // strategy: 'dropdown'
    };
  }

  render() {
    return (
      <div>
        <div>
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
          <ResizableContainer width={'70vw'}>
            <ToolBar
              // changeButtonStyles={false}
              constrainTo={true}
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
              {newButton}
              {iconButton}
              {deleteButton}
              {separator}
              {settingsButton}
              {menuButton}
              {separator}
              {undoButton}
              {redoButton}
              <button style={{ height: 30 }} id="btn">
                Button with auto focus
              </button>
            </ToolBar>
          </ResizableContainer>
        </div>
      </div>
    );
  }
}

setTimeout(() => {
  btn.focus();
}, 1000);
render(<App />, document.getElementById('content'));
