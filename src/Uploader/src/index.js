/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from '@zippytech/react-class/autoBind';
import join from '../../common/join';
import shouldComponentUpdate from '../../common/shouldComponentUpdate';
import cleanProps from '../../common/cleanProps';
import * as i18n from './i18n';

import FileList, {
  fileSizeFormatter,
  timeFormatter
} from './Filelist/src/FileList';
import ProgressBar from '../../ProgressBar';
import Button from '../../Button';
import FileInput from './FileInput';
import { hocPropTypes, fdzPropTypes } from './props';

import xhr from 'xhr';
import throttle from 'lodash.throttle';

import FileDropZone from './FileDropZone';
import pickProps from './utils/pick-props';

import {
  getFileUploadProgress,
  getChunkedFileUploadProgress,
  getFilesUplaodProgress
} from './utils/uploader/file-progress-details';

import { uploadBlob } from './utils/uploader/blob-file-uploader';
import {
  uploadChunkedBlob,
  abortAnyChunksInProgress
} from './utils/uploader/chunk-file-uploader';

import {
  cleanUploadProgressOfOldFiles,
  getStartProgressForFile,
  getNextSetOfQueuedFiles,
  getFileInProgressCount,
  queueFilesForUpload,
  getQueuedFiles,
  hasFilesInUploadOrQueued,
  getInProgressFiles,
  getErroredFiles
} from './utils/uploader/file-queue-management';

const CLASS_NAME = 'zippy-react-uploader';

const getNumberOfFilesMarkedForUpload = (files, uploadProgress) => {
  let currentlyInUploadQueue = 0;
  Object.keys(uploadProgress).forEach(key => {
    const { inProgress, queued } = uploadProgress[key] || {};
    if (inProgress || queued) {
      currentlyInUploadQueue++;
    }
  });
  return currentlyInUploadQueue;
};

const getFileListProps = api => {
  const { startUploadFile, removeFile, cancelUploadFile } = api;

  return {
    uploadFile: startUploadFile,
    removeFile,
    cancelUploadFile
  };
};

const renderGlobalProgressBar = props => {
  const {
    totalSize,
    totalUploaded,
    totalSizeText,
    totalUploadedText,
    etaText,
    percentage,
    percentageText
  } = props;
  const flooredPercentage = Math.floor(percentageText);
  if (totalSize && totalUploaded) {
    return (
      <div>
        <div style={{ position: 'relative' }}>
          {totalUploadedText}/{totalSizeText}
          {(etaText && ` - ${etaText} remaining`) || ''}
          <div
            style={{ position: 'absolute', right: 0, top: 0 }}
          >{`${flooredPercentage}%`}</div>
        </div>
        <ProgressBar
          value={percentage}
          label={null}
          fillColor={null}
          labelFillColor={null}
          labelRemainingColor={null}
          labelPosition="center"
          transitionDuration=".2s"
        />
      </div>
    );
  }

  return null;
};

const renderGlobalProgressBarLayout = props => {
  const {
    renderGlobalProgressBar,
    uploadProgress,
    fileSizeFormatter,
    timeFormatter,
    locale,
    files
  } = props;

  const {
    percentage,
    totalSizeOfFiles,
    totalUploadedSizeOfFiles,
    globalEta
  } = getFilesUplaodProgress(uploadProgress);

  let percentageText = '';
  let totalSizeText = '';
  let totalUploadedText = '';
  let etaText = '';

  if (totalSizeOfFiles && totalUploadedSizeOfFiles) {
    percentageText = percentage.toLocaleString(locale, {
      maximumFractionDigits: 2
    });
    totalSizeText = fileSizeFormatter(totalSizeOfFiles, { locale });
    totalUploadedText = fileSizeFormatter(totalUploadedSizeOfFiles, { locale });
    etaText = timeFormatter(globalEta, { locale });
  }

  const content = renderGlobalProgressBar({
    percentage,
    percentageText,
    totalSize: totalSizeOfFiles,
    totalSizeText,
    totalUploaded: totalUploadedSizeOfFiles,
    totalUploadedText,
    files,
    uploadProgress,
    eta: globalEta,
    etaText
  });

  return <div className={`${CLASS_NAME}__menu-progress-layout`}>{content}</div>;
};

// returns true if some files are not uploading or in the queue of being uploaded
const allFilesHaveProgress = (files, uploadProgress) => {
  return files.every(file => {
    return !!uploadProgress[file.id];
  });
};

const shouldShowUploadButton = (files, uploadProgress, hasValidFiles) => {
  if (!hasValidFiles) {
    return false;
  }
  return !allFilesHaveProgress(files, uploadProgress) && files.length;
};

const renderFilePickButton = ({ files, domProps, onSelectFiles }) => (
  <FileInput {...domProps} onChange={onSelectFiles} />
);

const renderFilePickButtonLayout = props => {
  const { files, onSelectFiles, label, renderFilePickButton, disabled } = props;

  return (
    <div className={`${CLASS_NAME}__button-layout`}>
      {renderFilePickButton({
        files,
        onSelectFiles: !disabled ? onSelectFiles : null,
        domProps: {
          disabled: disabled,
          children: label,
          className: join(
            `${CLASS_NAME}__button`,
            disabled && `${CLASS_NAME}__button-disabled`
          )
        }
      })}
    </div>
  );
};

const renderClearAllButton = ({ files, domProps }) => {
  return <Button {...domProps} />;
};

const renderClearAllButtonLayout = props => {
  const { files, clearFiles, label, renderClearAllButton, disabled } = props;

  return (
    <div className={`${CLASS_NAME}__button-layout`}>
      {renderClearAllButton({
        files,
        domProps: {
          disabled: disabled || !files.length,
          onClick: disabled ? null : clearFiles,
          children: label,
          className: `${CLASS_NAME}__toolbar-button`
        },
        clearFiles
      })}
    </div>
  );
};

const renderErrorMessage = ({ files, hasConnection, domProps }) => {
  return (
    files.length !== 0 &&
    !hasConnection && (
      <div className={`${CLASS_NAME}__errorMessage`} {...domProps} />
    )
  );
};

const renderErrorMessageLayout = props => {
  const { files, label, renderErrorMessage, hasConnection } = props;

  return (
    <div className={`${CLASS_NAME}__error-message-layout`}>
      {renderErrorMessage({
        files,
        hasConnection,
        domProps: {
          children: label,
          className: `${CLASS_NAME}__error-message`
        }
      })}
    </div>
  );
};

const renderUploadAllButton = ({ files, domProps, uploadProgress }) => {
  return <Button {...domProps} />;
};

const renderUploadAllButtonLayout = props => {
  const {
    files,
    uploadFiles,
    label,
    renderUploadAllButton,
    uploadProgress,
    disabled,
    connected,
    hasValidFiles
  } = props;
  return (
    <div className={`${CLASS_NAME}__button-layout`}>
      {shouldShowUploadButton(files, uploadProgress, hasValidFiles) &&
        renderUploadAllButton({
          files,
          domProps: {
            disabled: disabled || !hasValidFiles,
            className: `${CLASS_NAME}__toolbar-button`,
            onClick: disabled ? null : ev => uploadFiles(ev),
            children: label
          },
          uploadProgress
        })}
    </div>
  );
};

const renderToolbar = props => {
  const {
    uploadProgress,
    uploadButtonLayout,
    clearButtonLayout,
    pickButtonLayout,
    progressLayout,
    errorMessage,
    files,
    timeFormatter,
    fileSizeFormatter,
    locale,
    hasConnection,
    domProps
  } = props;

  return (
    <div {...domProps}>
      {pickButtonLayout}
      {clearButtonLayout}
      {uploadButtonLayout}
      {hasConnection === false && errorMessage}
      {progressLayout}
    </div>
  );
};

const renderToolbarLayout = props => {
  const {
    files,
    uploadProgress,
    onSelectFiles,
    clearFiles,
    uploadFiles,
    renderUploadAllButton,
    renderGlobalProgressBar,
    renderFilePickButton,
    renderClearAllButton,
    locale,
    timeFormatter,
    fileSizeFormatter,
    i18n,
    renderToolbar,
    showToolbar,
    disabled,
    hasConnection,
    hasValidFiles
  } = props;
  if (!showToolbar) {
    return;
  }

  const pickButtonLayout =
    renderFilePickButton &&
    renderFilePickButtonLayout({
      label: i18n.SELECT_FILES,
      files,
      onSelectFiles,
      renderFilePickButton,
      disabled
    });

  const clearButtonLayout =
    renderClearAllButton &&
    renderClearAllButtonLayout({
      label: i18n.CLEAR_FILES,
      files,
      clearFiles,
      renderClearAllButton,
      disabled
    });

  const progressLayout =
    renderGlobalProgressBar &&
    renderGlobalProgressBarLayout({
      uploadProgress,
      timeFormatter,
      fileSizeFormatter,
      locale,
      renderGlobalProgressBar,
      disabled
    });
  const errorMessage =
    renderErrorMessage &&
    renderErrorMessageLayout({
      label: i18n.CONNECTION_ERROR,
      files,
      renderErrorMessage,
      hasConnection
    });

  const uploadButtonLayout =
    renderUploadAllButton &&
    renderUploadAllButtonLayout({
      label: i18n.UPLOAD_FILES,
      files,
      uploadProgress,
      uploadFiles,
      renderUploadAllButton,
      disabled,
      connected: hasConnection,
      hasValidFiles
    });

  const content = renderToolbar({
    uploadProgress,
    uploadButtonLayout,
    clearButtonLayout,
    pickButtonLayout,
    progressLayout,
    errorMessage,
    files,
    timeFormatter,
    fileSizeFormatter,
    locale,
    disabled,
    hasConnection,
    domProps: {
      className: `${CLASS_NAME}__menu`
    }
  });

  return (
    <div key="udm" className={`${CLASS_NAME}__menu-layout`}>
      {content}
    </div>
  );
};

class Uploader extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    const { files, defaultFiles, lazyUpdateDelay } = props;
    this.state = {
      files: files ? null : defaultFiles
    };

    this.uploadProgress = {};

    this.lazyForceUpdate =
      lazyUpdateDelay > 0
        ? throttle(this.forceUpdate, lazyUpdateDelay)
        : this.forceUpdate;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.lastUpdate !== this.state.lastUpdate) {
      return true;
    }
    return shouldComponentUpdate(this, nextProps, nextState);
  }
  componentWillMount() {
    this.checkConectivity();
  }

  componentDidMount() {
    const { autoUpload, files } = this.p;

    if (autoUpload && files.length) {
      this.queueFilesForUpload(files, this.uploadQueuedFiles);
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const nextP = this.getProps(nextProps, nextState);
    const { autoUpload: newAutoUplaodFiles, files: newFiles } = nextP;
    const { autoUpload, files } = this.p;
    if (newAutoUplaodFiles && newFiles.length) {
      this.p = nextP;
      this.queueFilesForUpload(newFiles, this.uploadQueuedFiles);
    }
  }

  checkFilesValid(files) {
    const valid = files.reduce((acc, file) => {
      return acc || file.valid;
    }, false);
    return valid;
  }

  checkConectivity() {
    if (typeof Blob === 'undefined') {
      return;
    }
    const testBlob = new Blob([JSON.stringify({ hello: 'world' }, null, 2)], {
      type: 'application/json'
    });

    const { xhr, targetUrl } = this.props;
    const uploadProps = {
      xhr,
      targetUrl
    };
    uploadProps.onProgress = () => {};
    uploadProps.onStart = () => {};
    uploadProps.onDone = () => {};
    uploadProps.onError = () => {};
    uploadProps.onAbort = () => {};
    this.setState({ checkingConectivity: true });
    uploadBlob(testBlob, uploadProps)
      .then(() => {
        this.setState({ hasConnection: true, checkingConectivity: false });
      })
      .catch(err => {
        this.setState({ hasConnection: false, checkingConectivity: false });
      });
  }

  clearFiles() {
    const {
      filesInUploadOrQueue,
      isControlled,
      files,
      onChange,
      onBeforeClearAllFiles,
      uploadProgress
    } = this.p;

    const shouldClearFiles = onBeforeClearAllFiles
      ? onBeforeClearAllFiles({
          filesInUploadOrQueue,
          files,
          uploadProgress
        })
      : true;

    if (!shouldClearFiles) {
      return;
    }

    if (!isControlled) {
      this.uploadProgress = {};
      this.setState({
        files: []
      });

      if (filesInUploadOrQueue) {
        const queuedFiles = getQueuedFiles(files, uploadProgress);
        const inProgressFiles = getInProgressFiles(files, uploadProgress);

        queuedFiles.forEach(file => this.processFileRemoveall(file));
        inProgressFiles.forEach(file => this.processFileRemoveall(file));
      }
    }

    onChange && onChange([]);
  }

  setProgress(key, value) {
    //Cancel's the test upload progress
    if (this.state.checkingConectivity === true) {
      return;
    }
    if (!value) {
      delete this.uploadProgress[key];
    } else {
      this.uploadProgress[key] = value;
    }

    this.uploadProgress = { ...this.uploadProgress };
  }

  getFileUploadProps() {
    const {
      filesInUploadOrQueue,
      files,
      uploadProgress,
      requestHeaders,
      xhr,
      targetUrl,
      simultaneousFileUpload,
      chunkSize,
      simultaneousChunksPerFile
    } = this.p;

    const uploadProps = {
      xhr,
      targetUrl,
      chunkSize,
      simultaneousFileUpload,
      simultaneousChunksPerFile,
      onProgress: this.onFileUploadProgress,
      onStart: this.onFileUploadStarted,
      onDone: this.onFileUploadDone,
      onError: this.onFileUploadError,
      onAbort: this.onFileUploadAbort,
      uploadProgress,
      headers: { ...requestHeaders }
    };
    return uploadProps;
  }

  uploadQueuedFiles() {
    const {
      files,
      simultaneousFileUpload,
      chunked,
      uploadFn,
      beforeFileUpload
    } = this.p;
    const { uploadProgress } = this;
    if (this.state.hasConnection === false) {
      return;
    }
    const uploadableFiles = getNextSetOfQueuedFiles(
      files,
      uploadProgress,
      simultaneousFileUpload
    );

    if (!uploadableFiles.length) {
      return;
    }

    const uploadProps = this.getFileUploadProps();
    uploadableFiles.map(file => {
      this.setProgress(file.id, getStartProgressForFile(file));
      uploadFn(file, uploadProps).catch(err => {
        console.error('ciritcal upload error', err);
      });
    });

    this.forceUpdate();
  }

  uploadFiles(ev, filesInCurrentBatch) {
    if (this.state.hasConnection === false) {
      return;
    }
    const { onUploadStart, files } = this.p;

    const uploadProgress = this.uploadProgress;
    //fixed bug where single uploading files were reuploading at Upload All
    const nonUploadingFiles = files.filter(file => !uploadProgress[file.id]);
    const uplaodStartOk = onUploadStart
      ? onUploadStart(filesInCurrentBatch || nonUploadingFiles)
      : true;
    //here we should add another check
    if (uplaodStartOk) {
      this.queueFilesForUpload(
        filesInCurrentBatch || nonUploadingFiles,
        this.uploadQueuedFiles
      );
    }
  }

  onFileUploadProgress(fileId, params, afterStateCallback) {
    const {
      uploadProgress,
      files,
      getFileUploadProgress,
      onFileUploadProgress
    } = this.p;
    this.setProgress(
      fileId,
      getFileUploadProgress(params, uploadProgress[fileId])
    );

    this.lazyForceUpdate(() => {
      onFileUploadProgress &&
        onFileUploadProgress({
          file: files.find(file => file.id === fileId),
          xhrParams: params,
          uploadProgress: uploadProgress[fileId]
        });
      afterStateCallback && afterStateCallback();
    });
  }

  onFileUploadDone(fileId, params) {
    const { onFileUploadDone, files, uploadProgress } = this.p;
    const targetFile = files.find(file => file.id === fileId);
    const xhrParams = {
      ...params,
      total: targetFile && targetFile.size,
      loaded: targetFile && targetFile.size
    };
    this.onFileUploadProgress(fileId, xhrParams, this.uploadQueuedFiles);
    onFileUploadDone &&
      onFileUploadDone({
        file: targetFile,
        xhrParams,
        uploadProgress: uploadProgress[fileId]
      });

    this.allQueueDoneCheck();
  }

  onFileUploadStarted({ file, chunkWrappers }) {
    const { uploadProgress } = this;
    const { onFileUploadStart } = this.p;

    if (chunkWrappers) {
      this.setProgress(file.id, {
        ...uploadProgress[file.id],
        chunkWrappers
      });
      this.lazyForceUpdate();
    }

    onFileUploadStart &&
      onFileUploadStart({
        file,
        uploadProgress: uploadProgress[file.id]
      });
  }

  allQueueDoneCheck() {
    const { files, onAllQueuedFilesUploaded } = this.p;
    const { uploadProgress } = this;
    if (
      onAllQueuedFilesUploaded &&
      !hasFilesInUploadOrQueued(files, uploadProgress)
    ) {
      onAllQueuedFilesUploaded();
    }
  }

  onFileUploadAbort(fileId, params) {
    const { uploadProgress } = this;
    const { onFileUploadAbort, files } = this.p;
    const fileUploadProgress = uploadProgress[fileId];
    if (fileUploadProgress) {
      onFileUploadAbort &&
        onFileUploadAbort({
          file: files.find(file => file.id === fileId),
          xhrParams: params,
          uploadProgress: fileUploadProgress
        });

      delete uploadProgress[fileId];
      this.allQueueDoneCheck();
      this.forceUpdate(this.uploadQueuedFiles);
    }
  }

  onFileUploadError(fileId, errorMessage) {
    const { uploadProgress } = this;
    const { onFileUploadError } = this.p;
    this.setProgress(fileId, {
      ...uploadProgress[fileId],
      status: 'error',
      error: { message: errorMessage },
      loadedSize: 0,
      done: false,
      inProgress: false
    });

    onFileUploadError && onFileUploadError(fileId, errorMessage);

    this.forceUpdate(this.uploadQueuedFiles);
  }

  startUploadFile(fileID) {
    const { files, uploadProgress, onUploadStart } = this.p;
    const targetFileIdx = files.findIndex(file => file.id === fileID);
    const targetFile = files[targetFileIdx];
    let shouldUpload = true;

    if (
      !getQueuedFiles(files, uploadProgress).length &&
      !getInProgressFiles(files, uploadProgress).length
    ) {
      shouldUpload = onUploadStart ? onUploadStart(targetFile) : true;
    }

    shouldUpload && this.startUploadAt(targetFileIdx);
  }

  queueFilesForUpload(targetFiles, afterStateCallback) {
    const { uploadProgress } = this;
    const { files, beforeFileUpload } = this.p;

    const newTargetFiles = (targetFiles || files).filter(
      file => !uploadProgress[file.id]
    );
    this.uploadProgress = queueFilesForUpload(
      newTargetFiles,
      beforeFileUpload,
      uploadProgress
    );
    this.forceUpdate(afterStateCallback);
  }

  startUploadAt(fileIdx) {
    const { files, simultaneousFileUpload, filesInUploadOrQueue } = this.p;

    if (fileIdx < 0 || fileIdx > files.length) {
      return;
    }

    const file = files[fileIdx];
    this.queueFilesForUpload([file], this.uploadQueuedFiles);
  }

  onFDZChange({ files }) {
    const { uploadProgress, autoUpload, isControlled, onChange } = this.p;
    this.uploadProgress = cleanUploadProgressOfOldFiles(files, uploadProgress);

    const { percentage } = getFilesUplaodProgress(uploadProgress);
    const hasValidFiles = this.checkFilesValid(files);
    this.setState({ hasValidFiles });

    if (!isControlled) {
      this.setState({
        files: files
      });

      if (autoUpload) {
        this.queueFilesForUpload(files, this.uploadQueuedFiles);
      }

      if (!autoUpload && (0 <= percentage && percentage < 100)) {
        //when the upload is on, and we add new files, we want them to go to the queue
        this.queueFilesForUpload(files, this.uploadQueuedFiles);
      }
    }

    onChange && onChange(files);
  }

  processFileRemoveall(file) {
    const { uploadProgress } = this.p;

    if (file._uploadRequest) {
      file._uploadRequest.abort();
    } else {
      const fileProgress = uploadProgress[file.id];

      if (fileProgress && fileProgress.chunkWrappers) {
        abortAnyChunksInProgress(fileProgress);
      }

      if (fileProgress && fileProgress.inProgress) {
        this.onFileUploadAbort(file.id);
      }
    }
  }

  onFDZFileRemoveAtIndex({ idx, file }) {
    const { beforeFileAbort, onRemoveAt, uploadProgress } = this.p;
    const okToRemove = beforeFileAbort
      ? beforeFileAbort({
          file,
          fileIndex: idx,
          uploadProgress: uploadProgress[file.id]
        })
      : true;
    if (okToRemove) {
      this.processFileRemoveall(file);
      onRemoveAt &&
        onRemoveAt({
          file,
          idx
        });
      return true;
    }
  }

  getClassName({
    renderToolbar,
    simultaneousFileUpload,
    filesInUploadOrQueue,
    toolbarPosition,
    disabled
  }) {
    const { theme, className, singleFile } = this.props;
    return join(
      CLASS_NAME,
      className,
      `${CLASS_NAME}--theme-${theme}`,
      filesInUploadOrQueue && `${CLASS_NAME}--inprogress`,
      singleFile && `${CLASS_NAME}--singefile`,
      renderToolbar && `${CLASS_NAME}--menu-${toolbarPosition}`,
      renderToolbar && `${CLASS_NAME}--hasmenu`,
      disabled && `${CLASS_NAME}--disabled`
    );
  }

  getProps(props, state) {
    props = props || this.props;
    state = state || this.state;

    const {
      children,
      className,
      simultaneousFileUpload,
      singleFile,
      chunked,
      renderToolbar,
      toolbarPosition,
      files: activeFiles,
      disabled
    } = props;

    const { files: stateFiles } = state;

    const { uploadProgress } = this;

    const files = activeFiles ? activeFiles : stateFiles;

    const filesInUploadOrQueue = getNumberOfFilesMarkedForUpload(
      files,
      uploadProgress
    );

    let getFileUploadProgressFn = getFileUploadProgress,
      uploadFn = uploadBlob;

    if (chunked) {
      getFileUploadProgressFn = getChunkedFileUploadProgress;
      uploadFn = uploadChunkedBlob;
    }

    return {
      ...props,
      simultaneousFileUpload: singleFile ? 1 : simultaneousFileUpload,
      filesInUploadOrQueue,
      children,
      files,
      uploadFn,
      uploadProgress,
      getFileUploadProgress: getFileUploadProgressFn,
      className: this.getClassName({
        simultaneousFileUpload,
        filesInUploadOrQueue,
        renderToolbar,
        toolbarPosition,
        disabled
      })
    };
  }

  onSelectFiles(files) {
    this.fdz.addFiles(files);
  }

  setFDZRef(el) {
    this.fdz = el;
  }

  render() {
    const {
      filesInUploadOrQueue,
      className,
      files,
      uploadProgress,
      locale,
      fileSizeFormatter,
      timeFormatter,
      i18n: propsI18N,
      renderUploadAllButton,
      renderGlobalProgressBar,
      renderToolbar,
      showToolbar,
      toolbarPosition,
      renderFilePickButton,
      renderClearAllButton,
      renderUploadButton,
      disableFileDrop,
      disabled
    } = (this.p = this.getProps());
    let children;
    const composedI18N = {
      ...i18n,
      ...propsI18N
    };

    const fileDropZone = (
      <FileDropZone
        key="fdz"
        {...pickProps(this.props, FileDropZone.propTypes)}
        {...getFileListProps(this)}
        disabled={disableFileDrop || disabled}
        files={files}
        connected={this.state.hasConnection}
        onChange={this.onFDZChange}
        onRemoveAt={this.onFDZFileRemoveAtIndex}
        ref={this.setFDZRef}
        i18n={composedI18N}
        uploadProgress={uploadProgress}
      />
    );
    const uploaderMenu =
      renderToolbar &&
      renderToolbarLayout({
        files,
        uploadProgress,
        onSelectFiles: this.onSelectFiles,
        clearFiles: this.clearFiles,
        uploadFiles: this.uploadFiles,
        renderUploadAllButton,
        renderGlobalProgressBar,
        renderFilePickButton,
        renderClearAllButton,
        renderToolbar,
        showToolbar,
        locale,
        timeFormatter,
        fileSizeFormatter,
        i18n: composedI18N,
        disabled,
        hasConnection: this.state.hasConnection,
        hasValidFiles: this.state.hasValidFiles
      });

    if (toolbarPosition === 'top') {
      children = [uploaderMenu, fileDropZone];
    } else {
      children = [fileDropZone, uploaderMenu];
    }

    return (
      <div
        {...cleanProps(this.props, Uploader.propTypes)}
        className={className}
      >
        {children}
      </div>
    );
  }
}

Uploader.defaultProps = {
  ...FileDropZone.defaultProps,

  theme: 'default',
  simultaneousFileUpload: 3,
  simultaneousChunksPerFile: 3,
  chunkSize: 1024 * 1024,
  chunked: false,
  xhr,
  fileSizeFormatter,
  timeFormatter,
  lazyUpdateDelay: 10,
  renderToolbar,
  showToolbar: true,

  toolbarPosition: 'bottom',
  renderFilePickButton,
  renderClearAllButton,
  renderUploadAllButton,
  renderGlobalProgressBar,

  defaultFiles: [],
  fileSizeFormatter,
  timeFormatter,
  i18n
};

Uploader.propTypes = {
  ...hocPropTypes,
  ...fdzPropTypes,

  shouldComponentUpdate: PropTypes.func,
  children: PropTypes.any,
  connected: PropTypes.bool,
  theme: PropTypes.string,

  targetUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

  singleFile: PropTypes.bool,

  simultaneousFileUpload: PropTypes.number,
  simultaneousChunksPerFile: PropTypes.number,
  lazyUpdateDelay: PropTypes.number,

  chunkSize: PropTypes.number,
  chunked: PropTypes.bool,

  xhr: PropTypes.func,

  locale: PropTypes.string,

  requestHeaders: PropTypes.object, // any additional headers to pass to upload requests

  fileSizeFormatter: PropTypes.func,
  timeFormatter: PropTypes.func,

  toolbarPosition: PropTypes.oneOf(['top', 'bottom']),

  renderToolbar: PropTypes.func,
  showToolbar: PropTypes.bool,

  renderFilePickButton: PropTypes.func,
  renderClearAllButton: PropTypes.func,
  renderUploadAllButton: PropTypes.func,
  renderGlobalProgressBar: PropTypes.func,

  autoUpload: PropTypes.bool,
  disableFileDrop: PropTypes.bool,
  disabled: PropTypes.bool,

  files: PropTypes.arrayOf(PropTypes.object),
  defaultFiles: PropTypes.arrayOf(PropTypes.object),

  onChange: PropTypes.func,

  i18n: PropTypes.object,

  onUploadStart: PropTypes.func, //called when a new queue of files is started
  beforeFileUpload: PropTypes.func, // called before startign the upload of a file
  onFileUploadStart: PropTypes.func, // called after the xhr start event is fired
  onFileUploadProgress: PropTypes.func, // calld on xhr progress, throttled
  beforeFileAbort: PropTypes.func,
  onFileUploadAbort: PropTypes.func, // calld on xhr progress, throttled
  onFileUploadError: PropTypes.func, // calld on xhr progress, throttled
  onFileUploadDone: PropTypes.func, // called when file has been uploaded
  onAllQueuedFilesUploaded: PropTypes.func, // called when the current queue is done
  onBeforeClearAllFiles: PropTypes.func // called as a prevention hook for clearAllFiles button
};

export default Uploader;

export {
  fileSizeFormatter,
  timeFormatter,
  FileExtensionIcon
} from './Filelist/src/FileList';
