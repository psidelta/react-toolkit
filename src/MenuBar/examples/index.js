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
import MenuBar from '../src';
import '../style/index.scss';

class App extends Component {
  render() {
    return (
      <div
        style={{
          width: 960,
          maxWidth: '100%',
          border: '1px solid red',
          boxSizing: 'border-box'
        }}
      >
        <h1>MenuBar</h1>

        <MenuBar
          style={{ width: 300 }}
          overflowStrategy="scroll"
          items={[
            { label: 'home 1', buttonProps: { icon: 'hey' } },
            { label: 'home 2' },
            { label: 'home 3' },
            {
              label: 'home',
              items: [
                { label: 'home 1' },
                { label: 'home 2' },
                { label: 'home 3' },
                {
                  label: 'home 4',
                  items: [
                    { label: 'home 1' },
                    { label: 'home 2' },
                    { label: 'home 3' },
                    {
                      label: 'home 4',
                      items: [
                        { label: 'home 1' },
                        { label: 'home 2' },
                        { label: 'home 3' },
                        { label: 'home 4' }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              label: 'about',
              items: [
                { label: 'about 1' },
                { label: 'about 2' },
                { label: 'about 3' },
                { label: 'about 4' }
              ]
            },
            {
              label: 'contact',
              items: [
                { label: 'contact 1' },
                { label: 'contact 2' },
                { label: 'contact 3' },
                { label: 'contact 4' }
              ]
            },
            {
              label: 'map',
              items: [
                { label: 'map 1' },
                { label: 'map 2' },
                { label: 'map 3' },
                { label: 'map 4' }
              ]
            },
            {
              label: 'home',
              items: [
                { label: 'home 1' },
                { label: 'home 2' },
                { label: 'home 3' },
                { label: 'home 4' }
              ]
            },
            {
              label: 'about',
              items: [
                { label: 'about 1' },
                { label: 'about 2' },
                { label: 'about 3' },
                { label: 'about 4' }
              ]
            },
            {
              label: 'contact',
              items: [
                { label: 'contact 1' },
                { label: 'contact 2' },
                { label: 'contact 3' },
                { label: 'contact 4' }
              ]
            },
            {
              label: 'map',
              items: [
                { label: 'map 1' },
                { label: 'map 2' },
                { label: 'map 3' },
                { label: 'map 4' }
              ]
            }
          ]}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
