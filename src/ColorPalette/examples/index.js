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
import React, { Component } from 'react'
import { render } from 'react-dom'

import ColorPalette from '../src/ColorPalette'
import '../style/index.scss'
import './index.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '#FFDC00'
    }
  }
  render() {
    return <div>
      <ColorPalette
        style={{ marginBottom: 10 }}
        value={this.state.value}
        onChange={(color) => {
          this.setState({ value: color })
        }}
      />
      <ColorPalette
        palette="gray"
        value={this.state.value}
        style={{ marginBottom: 10 }}
        onChange={(color) => {
          this.setState({ value: color })
        }}
      />
      <ColorPalette
        palette={['#fff', '#abc', '#123']}
        value={this.state.value}
        onChange={(color) => {
          this.setState({ value: color })
        }}
      />
    </div>
  }
}

render(<App />, document.getElementById('content'))
