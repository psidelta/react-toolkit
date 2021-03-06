/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from '@zippytech/react-class/autoBind';
import cleanProps from '../../common/cleanProps';

import join from '../../common/join';
import shouldComponentUpdate from '../../common/shouldComponentUpdate';
import fileReadAsDataUrl from './utils/file-read-as-data-url';

const CLASS_NAME = 'react-image-file-preview';

class ImageFilePreview extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);

    this.state = {
      loadedPreview: null
    };
  }

  componentDidMount() {
    const { file } = this.props;
    if (file) {
      this.previewFile(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { file } = this.props;
    const { file: nextFile, fileReadAsDataUrl } = nextProps;
    if (nextFile !== file) {
      this.previewFile(nextProps);
    }
  }

  previewFile({ file, fileReadAsDataUrl, onReady }) {
    if (file) {
      fileReadAsDataUrl(file).then(result => {
        this.setState(
          {
            loadedPreview: result
          },
          () => {
            onReady && onReady({ file, result });
          }
        );
      });
    } else {
      this.setState({
        loadedPreview: null
      });
    }
  }

  getDefaultContent() {
    const { defaultPreview } = this.props;
    const typeofDefaultPreview = typeof defaultPreview;

    if (typeofDefaultPreview === 'string') {
      return <img src={defaultPreview} alt="preview" />;
    } else if (typeofDefaultPreview === 'function') {
      return defaultPreview();
    }

    return defaultPreview;
  }

  getFilePreview() {
    const { file } = this.props;
    const { loadedPreview } = this.state;

    return <img src={loadedPreview} alt={`${file.name}-preview`} />;
  }

  getThumbStyle() {
    const { thumbSize } = this.props;

    if (typeof thumbSize === 'number' && thumbSize !== NaN) {
      return { width: thumbSize, height: thumbSize };
    } else if (Array.isArray(thumbSize)) {
      return { width: thumbSize[0], height: thumbSize[1] };
    }

    return { ...thumbSize };
  }

  getClassNames() {
    return CLASS_NAME;
  }

  getProps() {
    const { file, defaultPreview, style = {} } = this.props;
    const { loadedPreview } = this.state;

    const p = {
      children: loadedPreview
        ? this.getFilePreview()
        : this.getDefaultContent(),
      style: { ...style, ...this.getThumbStyle() },
      className: this.getClassNames()
    };

    return p;
  }

  render() {
    const p = (this.p = this.getProps());
    const { children, style, className } = p;

    return (
      <div
        {...cleanProps(this.props, ImageFilePreview.propTypes)}
        className={className}
        style={style}
        children={children}
      />
    );
  }
}

ImageFilePreview.defaultProps = {
  thumbSize: 125,
  fileReadAsDataUrl
};

ImageFilePreview.propTypes = {
  defaultPreview: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object
  ]),

  thumbSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.object
  ]),

  file: PropTypes.object,

  onReady: PropTypes.func,
  fileReadAsDataUrl: PropTypes.func
};

export default ImageFilePreview;
export { CLASS_NAME };
