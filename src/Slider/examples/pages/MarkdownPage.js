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
