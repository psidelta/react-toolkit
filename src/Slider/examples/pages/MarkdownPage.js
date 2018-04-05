/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
        <Markdown {...examplesMap}>{markup}</Markdown>
      </div>
    );
  }
}

export default MarkdownPage;
