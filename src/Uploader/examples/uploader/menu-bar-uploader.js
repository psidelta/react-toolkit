/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

import Uploader from '../../src/Uploader';

class MenuBarUploaderExample extends Component {
  render() {
    return (
      <div>
        <h2>Menubar position</h2>
        <SyntaxHighlighter
          language="javascript"
          style={github}
        >{`<Uploader toolbarPosition='top' targetUrl='http://0.0.0.0:3000/'/>`}</SyntaxHighlighter>
        <Uploader toolbarPosition="top" targetUrl="http://0.0.0.0:3000/" />
        <h2>Disabling the menu bar</h2>
        <p>
          hiding the menu bar makes sense if we controll the upload from the
          outside. This means we call the uploadFiles method from the outside,
          or use the autoUpload opton which start uploading files immediatly.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={github}
        >{`<Uploader renderToolbar={null} autoUpload targetUrl='http://0.0.0.0:3000/'/>`}</SyntaxHighlighter>
        <Uploader
          renderToolbar={null}
          autoUpload
          targetUrl="http://0.0.0.0:3000/"
        />

        <h2>Custom menu bars</h2>
        <SyntaxHighlighter language="javascript" style={github}>{`<Uploader
  autoUpload
  renderToolbar={({filesInUploadOrQueue})=>(
    <span style={{color:'white'}}>custom menu bar</span>
  )}
  targetUrl='http://0.0.0.0:3000/'
/>`}</SyntaxHighlighter>
        <Uploader
          autoUpload
          renderToolbar={({ filesInUploadOrQueue }) => (
            <span style={{ color: 'white' }}>
              custom menu bar, files in queue: {filesInUploadOrQueue}
            </span>
          )}
          targetUrl="http://0.0.0.0:3000/"
        />
      </div>
    );
  }
}

export default MenuBarUploaderExample;
