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

const fileIcon = ({ style, size = 24, className, extension = 'unknown' }) => (
  <svg
    height={24}
    viewBox="0 0 24 24"
    className={className}
    width={24}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <g fill="#495E85" transform="translate(2)">
        <path d="M-4.28101998e-13,0 L12.6923077,0 L20,9.01694915 L20,28 L-4.28101998e-13,28 L-4.28101998e-13,0 Z M1,1 L1,27 L19,27 L19,9.21052632 L12.52,1 L1,1 Z" />
        <path d="M12,0 L20,10 L12,10 L12,0 Z M13,2 L13,9 L19,9 L13,2 Z" />
      </g>
      <rect width="24" height="12" y="14" fill="#5C8EEB" />
      <text fill="#E6EEFF" fontSize="8" fontWeight="700">
        <tspan x="4" y="23">
          {extension}
        </tspan>
      </text>
    </g>
  </svg>
);

export default fileIcon;
