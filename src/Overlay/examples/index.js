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
import Overlay from '../src/Overlay';
import './index.scss';
import '../style/index.scss';

import Menu from '../../Menu';
import '../../Menu/style/index.scss';

const items = [
  { id: 0, label: 'First' },
  { id: 1, label: 'Second' },
  { id: 2, label: 'Third' },
  { id: 3, label: 'Fourth' },
  { id: 4, label: 'Fivth' }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      showButtons: true
    };
  }
  render() {
    return (
      <div className="wrapper">
        <button
          ref={el => (this.test = el)}
          style={{
            display: 'block',
            marginBottom: 50,
            top: 400,
            position: 'fixed',
            right: 400
          }}
          xdata-tooltip="My Events"
          xdata-tooltip-positions="bottom,left"
        >
          <div>
            <div style={{ margin: 20 }}>xxx</div>
            <Overlay
              showEvent={['click']}
              hideEvent={['click']}
              positions={['tr-br']}
              xhideOnClickOutside={true}
              xrafOnMount={true}
              xrelativeToViewport
              target={(_, node) => {
                return node ? node.parentNode : null;
              }}
            >
              <div
                style={{
                  visibility: 'visible',
                  border: '1px solid red',
                  width: 200,
                  height: 200
                }}
              />
            </Overlay>
          </div>
        </button>

        <input />

        <button
          className="target"
          data-tooltip="button din stangaaa, button din stangaaa, button din stangaaa, button din stangaaa, button din stangaaa, button din stangaaa"
        >
          aici1
        </button>

        <button
          className="target"
          data-tooltip="<strong>button din dreapta</strong>"
        >
          aici2
        </button>

        <div
          id="box1"
          style={{
            width: 300,
            height: 300,
            position: 'relative',
            border: '1px solid #bbb'
          }}
        >
          {/*<Overlay target=".tooltip2" constrainTo={'#box1'} />*/}

          {this.state.showButtons && (
            <button
              className="tooltip2"
              onClick={() => {
                this.setState({ showButtons: false });
              }}
              style={{ position: 'absolute', top: 5, left: 5 }}
              data-tooltip="I am top left"
            >
              Top left
            </button>
          )}
          {this.state.showButtons && (
            <button
              className="tooltip2"
              onClick={() => {
                this.setState({ showButtons: false });
              }}
              style={{ position: 'absolute', bottom: 5, left: 5 }}
              data-tooltip="I am top left"
            >
              Top left
            </button>
          )}
        </div>
        <br />
        <br />
        <br />
        <Menu items={items} />
      </div>
    );
  }
}

const rootTree = render(<App />, document.getElementById('content'));
