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

import '../style/index.scss';

import React from 'react';
import { render } from 'react-dom';
import autoBind from '@zippytech/react-class/autoBind';
import ColorPicker from '../src';

class App extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      color: '#1b3f9c'
    };
  }

  onChange(stringColor, color) {
    this.setState({
      color
      // stringColor
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', width: 320 }}>
        <ColorPicker
        // value={this.state.color}
        // onDrag={this.onDrag}
        // saturationWidth={400}
        // onChange={this.onChange}
        />

        <div
          style={{
            background: this.state.stringColor,
            width: 100,
            height: 50,
            color: 'white'
          }}
        >
          {JSON.stringify(this.state.color)}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
