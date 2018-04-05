/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { number, func, bool } from 'prop-types';

import shallowequal from '../../common/shallowequal';
import debounce from '../../common/debounce';

const HUGE_NUMBER = Math.pow(10, 10);

const emptyFn = () => {};
const immediateFn = fn => fn();

const notifyResizeStyle = {
  contain: 'strict',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  overflow: 'hidden',
  display: 'block',
  pointerEvents: 'none',
  opacity: 0,
  direction: 'ltr',
  textAlign: 'start'
};

const expandToolStyle = {
  contain: 'strict',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto'
};

const contractToolStyle = {
  contain: 'strict',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto'
};

const contractToolInnerStyle = {
  contain: 'strict',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '200%',
  height: '200%'
};

class ZippyNotifyResize extends React.Component {
  constructor(props) {
    super(props);

    this.checkResize = this.checkResize.bind(this);
    this.onResize = this.onResize.bind(this);

    if (props.notifyResizeDelay > 0) {
      this.onResize = debounce(this.onResize, props.notifyResizeDelay);
    }

    if (props.checkResizeDelay > 0) {
      this.checkResize = debounce(this.checkResize, props.checkResizeDelay);
    }

    this.refNotifyResize = node => {
      this.notifyResizeNode = node;
    };
    this.refContractTool = node => {
      this.contractToolNode = node;
    };
    this.refExpandTool = node => {
      this.expandToolNode = node;
    };
    this.refExpandToolInner = node => {
      this.expandToolInnerNode = node;
    };

    this.state = {
      notifyResizeWidth: 0,
      notifyResizeHeight: 0,

      expandToolWidth: 0,
      expandToolHeight: 0,

      contractToolWidth: 0,
      contractToolHeight: 0
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (typeof nextProps.shouldComponentUpdate === 'function') {
      return nextProps.shouldComponentUpdate(
        nextProps,
        this.props,
        nextState,
        this.state
      );
    }

    return (
      !shallowequal(nextState, this.state) ||
      !shallowequal(nextProps, this.props)
    );
  }

  componentWillUnmount() {
    this.__willUnmount = true;
  }

  componentDidMount() {
    if (typeof this.props.onMount === 'function') {
      this.props.onMount(this);
    }

    this.resetResizeTool(() => {
      if (this.props.notifyOnMount) {
        const {
          notifyResizeWidth: width,
          notifyResizeHeight: height
        } = this.state;
        this.onResize({ width, height });
      }
    });
  }

  render() {
    return (
      <div
        ref={this.refNotifyResize}
        style={notifyResizeStyle}
        onScroll={this.checkResize}
      >
        {this.renderExpandTool()}
        {this.renderContractTool()}
      </div>
    );
  }

  renderExpandTool() {
    return (
      <div ref={this.refExpandTool} style={expandToolStyle}>
        <div
          ref={this.refExpandToolInner}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: this.state.expandToolWidth,
            height: this.state.expandToolHeight
          }}
        />
      </div>
    );
  }

  renderContractTool() {
    return (
      <div ref={this.refContractTool} style={contractToolStyle}>
        <div ref="contractInner" style={contractToolInnerStyle} />
      </div>
    );
  }

  resetResizeTool(callback) {
    this.setDimensions(() => {
      this.scrollToBottomExpandTool();
      if (typeof callback == 'function') {
        callback();
      }
    });
  }

  setDimensions(callback) {
    this.getDimensions(size => {
      const { notifyResizeWidth, notifyResizeHeight } = size;

      if (this.__willUnmount) {
        return;
      }
      // Resize tool will be bigger than its parent by 1 pixel in each direction
      this.setState(
        {
          notifyResizeWidth,
          notifyResizeHeight,
          expandToolWidth: notifyResizeWidth + 1,
          expandToolHeight: notifyResizeHeight + 1
        },
        callback
      );
    });
  }

  getDimensions(callback) {
    if (!callback || typeof callback != 'function') {
      callback = emptyFn;
    }
    const notifyResize = this.notifyResizeNode;
    if (!notifyResize) {
      return;
    }
    const node = notifyResize.parentElement || notifyResize;

    let size;

    const fn = this.props.useRaf ? requestAnimationFrame : immediateFn;

    fn(() => {
      // if (this.props.useWillChange && !this.willChangeUsed) {
      //   node.style.willChange = 'transform';
      //   node.style.opacity = 1;
      //   this.willChangeUsed = true;
      // }

      if (typeof this.props.measureSize == 'function') {
        size = this.props.measureSize(node, notifyResize);
      } else {
        size = {
          width: node.offsetWidth,
          height: node.offsetHeight
        };
      }

      callback({
        notifyResizeWidth: size.width,
        notifyResizeHeight: size.height
      });
    });
  }

  scrollToBottomExpandTool(callback) {
    // so the scroll moves when element resizes
    if (this.notifyResizeNode) {
      requestAnimationFrame(() => {
        // scroll to bottom
        const expandTool = this.expandToolNode;
        const contractTool = this.contractToolNode;

        let expandToolScrollHeight;
        let expandToolScrollWidth;

        let contractToolScrollHeight;
        let contractToolScrollWidth;

        if (expandTool) {
          expandToolScrollHeight = expandTool.scrollHeight;
          expandToolScrollWidth = expandTool.scrollWidth;
        }

        if (contractTool) {
          contractToolScrollHeight = contractTool.scrollHeight;
          contractToolScrollWidth = contractTool.scrollWidth;
        }

        if (expandTool) {
          expandTool.scrollTop = expandToolScrollHeight;
          expandTool.scrollLeft = expandToolScrollWidth;
        }

        if (contractTool) {
          contractTool.scrollTop = contractToolScrollHeight;
          contractTool.scrollLeft = contractToolScrollWidth;
        }

        if (typeof callback == 'function') {
          callback();
        }
      });
    }
  }

  checkResize() {
    this.getDimensions(({ notifyResizeWidth, notifyResizeHeight }) => {
      if (
        notifyResizeWidth !== this.state.notifyResizeWidth ||
        notifyResizeHeight !== this.state.notifyResizeHeight
      ) {
        this.onResize({
          width: notifyResizeWidth,
          height: notifyResizeHeight
        });
        // reset resizeToolDimensions
        this.resetResizeTool();
      }
    });
  }

  onResize({ width, height }) {
    if (this.__willUnmount) {
      return;
    }
    if (typeof this.props.onResize === 'function') {
      this.props.onResize({ width, height });
    }
  }
}

ZippyNotifyResize.defaultProps = {
  useWillChange: false,
  useRaf: true
};

ZippyNotifyResize.propTypes = {
  onResize: func,
  onMount: func,
  useWillChange: bool,
  useRaf: bool,
  notifyOnMount: bool,
  notifyResizeDelay: number,
  checkResizeDelay: number
};

/*
const notifyResize = Cmp =>
  class NotifyResizeWrapper extends React.Component {
    constructor(props) {
      super(props);
      autoBind(this);

      this.refComponent = c => {
        this.component = c;
      };
    }
    componentDidMount() {
      const component = this.component;

      // check if they are mounted
      if (!this.notifyResize && showWarnings) {
        console.warn(
          'For notifyResize to work you must render resizeTool from {props.resizeTool}'
        );
      }
    }

    onNotifyResizeMount(notifier) {
      this.notifyResize = notifier;
    }

    onResize(...args) {
      if (typeof this.props.onResize === 'function') {
        this.props.onResize(...args);
      }

      if (typeof this.component.onResize === 'function') {
        this.component.onResize(...args);
      }
    }

    render() {
      const resizeTool = (
        <ZippyNotifyResize
          onResize={this.onResize}
          onMount={this.onNotifyResizeMount}
          notifyOnMount={this.props.notifyOnMount}
        />
      );

      return (
        <Cmp ref={this.refComponent} {...this.props} resizeTool={resizeTool} />
      );
    }
  };
*/

export default ZippyNotifyResize;

export { ZippyNotifyResize as NotifyResize };
