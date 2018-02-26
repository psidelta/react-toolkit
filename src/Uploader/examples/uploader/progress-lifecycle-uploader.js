import React, { Component } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

import Uploader from '../../src/Uploader';

function onUploadStart() {
  console.log('onUploadStart', arguments);
  return true;
}

function beforeFileUpload({ file, fileIndex, uploadProgress }) {
  console.log('beforeFileUpload', { file, fileIndex, uploadProgress });
  return true;
}

function beforeFileAbort({ file, fileIndex, uploadProgress }) {
  console.log('beforeFileAbort', { file, fileIndex, uploadProgress });
  return true;
}

function onBeforeClearAllFiles() {
  console.log('onBeforeClearAllFiles', arguments);
  return true;
}

function onFileUploadStart({ file, xhrParams, uploadProgress }) {
  console.log('onFileUploadStart', { file, xhrParams, uploadProgress });
  return true;
}

function onFileUploadProgress({ file, xhrParams, uploadProgress }) {
  console.log('onFileUploadProgress', { file, xhrParams, uploadProgress });
}

function onFileUploadError({ file, xhrParams, uploadProgress }) {
  console.log('onFileUploadError', { file, xhrParams, uploadProgress });
}

function onFileUploadDone({ file, xhrParams, uploadProgress }) {
  console.log('onFileUploadDone', { file, xhrParams, uploadProgress });
}

function onFileUploadAbort({ file, xhrParams, uploadProgress }) {
  console.log('onFileUploadAbort', { file, xhrParams, uploadProgress });
}

function onAllQueuedFilesUploaded() {
  console.log('onAllQueuedFilesUploaded', arguments);
}

class ProgressLifeCycleUploaderExample extends Component {
  render() {
    return (
      <div>
        <h2>Progress Lifecycle</h2>
        <p>
          We have a full range of progress Lifecycle callbacks. Check the
          console for this one
        </p>
        <SyntaxHighlighter language="jsx" style={github}>{`
function onFileUploadStart () {
  console.log('onFileUploadStart', arguments);
  return true;
}

function beforeFileUpload() {
  console.log('beforeFileUpload', arguments);
  return true;
}

function beforeFileAbort() {
  console.log('beforeFileAbort', arguments);
  return true;
}

function onBeforeClearAllFiles() {
  console.log('onBeforeClearAllFiles', arguments);
  return true;
}

function onFileUploadStart() {
  console.log('onFileUploadStart', arguments);
  return true;
}

function onFileUploadProgress() {
  console.log('onFileUploadProgress', arguments);
}

function onFileUploadError() {
  console.log('onFileUploadError', arguments);
}

function onFileUploadDone() {
  console.log('onFileUploadDone', arguments);
}

function onFileUploadAbort() {
  console.log('onFileUploadAbort', arguments);
}

function onAllQueuedFilesUploaded() {
  console.log('onAllQueuedFilesUploaded', arguments);
}


<Uploader
  targetUrl='http://0.0.0.0:3000/'
  onUploadStart={onUploadStart}
  beforeFileUpload={beforeFileUpload}
  onFileUploadStart={onFileUploadStart}
  onFileUploadProgress={onFileUploadProgress}
  beforeFileAbort={beforeFileAbort}
  onFileUploadAbort={onFileUploadAbort}
  onFileUploadError={onFileUploadError}
  onFileUploadDone={onFileUploadDone}
  onAllQueuedFilesUploaded={onAllQueuedFilesUploaded}
  onBeforeClearAllFiles={onBeforeClearAllFiles}
/>`}</SyntaxHighlighter>
        <Uploader
          targetUrl="http://0.0.0.0:3000/"
          onUploadStart={onUploadStart}
          beforeFileUpload={beforeFileUpload}
          onFileUploadStart={onFileUploadStart}
          onFileUploadProgress={onFileUploadProgress}
          beforeFileAbort={beforeFileAbort}
          onFileUploadAbort={onFileUploadAbort}
          onFileUploadError={onFileUploadError}
          onFileUploadDone={onFileUploadDone}
          onAllQueuedFilesUploaded={onAllQueuedFilesUploaded}
          onBeforeClearAllFiles={onBeforeClearAllFiles}
        />
      </div>
    );
  }
}

export default ProgressLifeCycleUploaderExample;
