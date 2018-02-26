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

import React from 'react'

function ToggleIcon({
  onClick,
  className,
  expanded,
  size = 17,
  ...rest,
}) {
  return <div
    {...rest}
    className={className}
    onClick={onClick}
  >
    <svg
      height={size}
      width={size}
      viewBox="0 0 24 24"
    >
      {
        expanded ?
        <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /> :
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      }
    </svg>
  </div>
}

export default ToggleIcon
