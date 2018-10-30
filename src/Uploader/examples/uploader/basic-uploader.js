/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';
// import 'typeface-roboto';
import Uploader from '../../src/';
import ScrollContainer from '@zippytech/react-scroll-container';
import VirtualScrollContainer from '@zippytech/react-virtual-scroll-container-pro';
import '@zippytech/react-scroll-container/index.css';
import '@zippytech/react-virtual-scroll-container-pro/index.css';

const renderScroller = props => {
  delete props.tabIndex;
  return <div {...props} />;
};

const renderListScroller = props => {
  return (
    <ScrollContainer
      {...props}
      renderScroller={renderScroller}
      viewStyle={{ width: '100%' }}
    />
  );
};

class BasicUploaderExample extends Component {
  onDragEnter(dispatch, event) {
    // debugger;
  }
  render() {
    return (
      <div>
        <h2>Basic uploader config</h2>

        <div style={{ height: 400 }}>
          <Uploader
            style={{
              fontFamily: 'Roboto'
            }}
            xtoolbarPosition="top"
            xshowToolbar={false}
            targetUrl="http://54.224.204.249:3336"
            xaccept="image/jpeg"
            xacceptInvalid
            i18n={{ UPLOAD: 'uploade' }}
            renderListScroller={renderListScroller}
            onRemoveAt={this.onDragEnter.bind(this)}
            xbeforeFileAbort={this.onDragEnter.bind(this)}
            onFileUploadStart={this.onDragEnter.bind(this)}
            xchunked
            xautoUpload
            xonDragEnter={this.onDragEnter.bind(this)}
            xappendOnDrop={false}
          />
        </div>
      </div>
    );
  }
}

export default BasicUploaderExample;
