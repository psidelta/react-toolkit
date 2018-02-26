/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
