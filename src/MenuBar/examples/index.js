/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
