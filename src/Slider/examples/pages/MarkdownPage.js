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
import githubCss from 'github-markdown-css/github-markdown.css';
import hlJsCss from 'highlight.js/styles/github.css';
import Markdown from 'react-components-markdown';

class MarkdownPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { examplesMap, markup } = this.props;
    return (
      <div
        className="markdown-body"
        style={{
          maxWidth: 800
        }}
      >
        <Markdown {...examplesMap}>
          {markup}
        </Markdown>
      </div>
    );
  }
}

export default MarkdownPage;
