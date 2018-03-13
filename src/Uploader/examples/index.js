import React, { Component } from 'react';
import { render } from 'react-dom';
import BasicUploaderExample from './uploader/basic-uploader';
import './index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <BasicUploaderExample />;
  }
}

render(<App />, document.getElementById('content'));
