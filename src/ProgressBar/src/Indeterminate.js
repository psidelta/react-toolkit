import React from 'react';
import Component from '@zippytech/react-class';

class Indeterminate extends Component {
  render() {
    const { className, barStyle } = this.props;

    return (
      <div className={className}>
        <div style={barStyle} className={`${className}__bar`} />
      </div>
    );
  }
}

export default Indeterminate;
