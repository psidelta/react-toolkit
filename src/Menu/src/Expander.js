import React from 'react';
import join from '../../common/join';

const Expander = ({
  className,
  rootClassName,
  size = 20,
  onClick,
  fill,
  rtl
}) => {
  return (
    <svg
      className={join(className, `${rootClassName}__expander`)}
      onClick={onClick}
      fill={fill}
      height={size}
      width={size}
      viewBox="0 0 24 24"
    >
      {rtl ? (
        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
      ) : (
        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
      )}
    </svg>
  );
};

Expander.isExpander = true;

export default Expander;
