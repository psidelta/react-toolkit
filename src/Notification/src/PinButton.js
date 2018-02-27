import React from 'react';
import Icon from '../../common/Icon';

function PinButton({ size = 14, className, pinned, ...rest }) {
  return (
    <div {...rest} className={className}>
      <Icon type={pinned ? 'pin-down' : 'pin-up'} size={size} />
    </div>
  );
}

export default PinButton;
