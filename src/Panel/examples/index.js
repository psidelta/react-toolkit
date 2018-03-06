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

import React from 'react';
import { render } from 'react-dom';
import Panel from '../src';

import Icon from '../../common/Icon';

import style from '../style/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 23,
      titleBarPosition: 'top',
      titleRotate: -90,
      titleAlign: 'start',
      titleEllipsis: true
    };
  }
  render() {
    return (
      <div style={{ /*background: 'lightgreen',*/ height: '100vh' }}>
        <div style={{ margin: '0 20px 20px 30px', paddingTop: 20 }}>
          Icon size:{' '}
          <input
            type="number"
            style={{ width: 60 }}
            value={this.state.size}
            onChange={e => this.setState({ size: e.target.value })}
          />
          <div>
            titleBarPosition:{' '}
            <select
              value={this.state.titleBarPosition}
              onChange={ev =>
                this.setState({ titleBarPosition: ev.target.value })
              }
            >
              <option value="top">top</option>
              <option value="bottom">bottom</option>
              <option value="left">left</option>
              <option value="right">right</option>
            </select>
          </div>
          <div>
            titleRotate:{' '}
            <select
              value={this.state.titleRotate}
              onChange={ev => this.setState({ titleRotate: ev.target.value })}
            >
              <option value={90}>90</option>
              <option value={-90}>-90</option>
            </select>
          </div>
          <div>
            titleAlign:{' '}
            <select
              value={this.state.titleAlign}
              onChange={ev => this.setState({ titleAlign: ev.target.value })}
            >
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
              <option value="left">left</option>
              <option value="right">right</option>
            </select>
          </div>
          <div>
            <input
              type="checkbox"
              checked={this.state.titleEllipsis}
              onChange={ev =>
                this.setState({ titleEllipsis: ev.target.checked })
              }
            />titleEllipsis
          </div>
        </div>
        <Panel
          style={{
            width: 500,
            height: 250,
            marginLeft: 30
            // background: 'blue'
          }}
          // rtl
          title="Employees When we started building the toolkit, we've made a checklist of
          features that our components need to include out-of-the-box"
          titleIcon={<Icon type="leads" size={this.state.size} />}
          titleBarPosition={this.state.titleBarPosition}
          titleAlign={this.state.titleAlign}
          titleRotate={this.state.titleRotate * 1}
          titleEllipsis={this.state.titleEllipsis}
          style={{ width: 300 }}
          // bodyScrollable={true}
          // renderAfterTitle={() => 'xxx'}
          // renderBeforeTitle={() => 'yyy'}
          // xtitleBarPosition="right"
          // renderFooter={props => (
          //   <div {...props} style={{ color: 'green' }}>
          //     Dolore dolore sit irure amet velit reprehenderit enim officia ad.
          //   </div>
          // )}
        >
          <p>
            {' '}
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.{' '}
          </p>
          <p>
            When we started building the toolkit, we've made a checklist of
            features that our components need to include out-of-the-box:
          </p>
          <ul>
            <li>
              <b>Performance</b> - a component is only useful if it does its job
              quickly. This will generally not be a problem with smaller
              components like buttons, dialogs, color pickers, etc - but menus,
              lists and grids need a lot of performance considerations in order
              to be really snappy.
            </li>
            <li>
              <b>Simplicity</b> - components need to be simple to use in the
              most common scenario. For this, default values for components have
              been carefully considered, so you need to add a minimum of code
              when you want to add some custom property and/or logic.
            </li>
            <li>
              <b>Flexibility & extensibility</b> - all components need to be
              very flexible in adapting to a wide spectrum of needs. Changing
              some styles, replacing some rendering logic or adding a custom
              validation should all be possible and easily achievable.
            </li>
          </ul>
        </Panel>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
