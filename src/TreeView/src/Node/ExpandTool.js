import React from 'react';

function ExpandTool({
  onClick,
  collapsed,
  className,
  size = 14,
  children,
  onDoubleClick,
  rootClassName
}) {
  return (
    <div className={className} onClick={onClick} onDoubleClick={onDoubleClick}>
      {children ? (
        children
      ) : (
        <svg height={size} width={size} viewBox="0 0 24 24">
          <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
        </svg>
      )}
    </div>
  );
}

export default ExpandTool;
