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

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <hr style={{ width: '100%', height: 3 }} />
        {this.props.children}
      </div>
    );
  }
}

const Menu = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/text-input-example">TextInput Example</Link>
    </li>
    <li>
      <Link to="/editors-example">Editors Example</Link>
    </li>
  </ul>
);

import TextInputExamples from './textInputExamples';
import EditorsExample from './editors';

render(
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/text-input-example" component={TextInputExamples} />
      <Route path="/editors-example" component={EditorsExample} />
    </div>
  </Router>,
  document.getElementById('content')
);
