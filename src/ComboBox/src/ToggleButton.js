import React from 'react';
import PropTypes from 'prop-types';
import { ToggleIcon } from './Icons';

const ToggleButton = ({ onToggle, className, toggleIcon, size, expanded }) => {
  let toggleIconProps = {
    className,
    size,
    expanded,
    onClick: event => {
      // don't lose focus
      event.preventDefault();
      onToggle();
    }
  };

  let toggleButtonEl;
  if (toggleIcon) {
    const params = {
      onToggle,
      expanded,
      domProps: toggleIconProps
    };

    toggleButtonEl =
      typeof toggleIcon === 'function' ? toggleIcon(params) : toggleIcon;
  }

  if (toggleButtonEl === true || toggleButtonEl == undefined) {
    toggleButtonEl = <ToggleIcon {...toggleIconProps} />;
  }

  return toggleButtonEl;
};

ToggleButton.defaultProps = {
  size: 10
};

ToggleButton.propTypes = {
  expanded: PropTypes.bool,
  size: PropTypes.number
};

export default ToggleButton;
