import React, {Component} from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

import Uploader from '../../src/Uploader';

class ControlledUploaderExample extends Component {

  constructor() {
    super();
    this.state = {};
  }

  onChangeFiles(files) {
    if ( files.length !== 0 ) {
      this.setState({
        stateFiles: files
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Controlled Uploader</h2>
        <p>Controlled uploader needs two things to wrok. One is the files prop, to pass down
        the files aray, and then the second one is the onChange event callback, which will take
        the files that the component reveals as picked and modify the files prop based on that.</p>

        <SyntaxHighlighter language='javascript' style={github}>{
`
onChangeFiles(files) {
  if ( files.length !== 0 ) {
    this.setState({
      stateFiles: files
    });
  }
}

<Uploader
  files={this.state.stateFiles}
  onChange={(files)=>(this.onChangeFiles(files))}
  targetUrl='http://0.0.0.0:3000/'
/>`
        }</SyntaxHighlighter>
        <Uploader files={this.state.stateFiles} onChange={(files)=>(this.onChangeFiles(files))} targetUrl='http://0.0.0.0:3000/'/>

      </div>
    );
  }
}

export default ControlledUploaderExample;
