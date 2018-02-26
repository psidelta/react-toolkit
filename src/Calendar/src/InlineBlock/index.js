import React, { Component } from 'react';

class ZippyInlineBlock extends Component {
  render() {
    const { props } = this;
    const domProps = {
      ...props,
      style: {
        display: 'inline-block',
        ...props.style
      }
    };
    return <div {...props} />;
  }
}

ZippyInlineBlock.defaultProps = {
  style: {}
};

export default ZippyInlineBlock;
