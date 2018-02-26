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

import isMobile from '../../common/isMobile';

const ARROWS = {
  right: <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />,
  left: <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />,
  down: <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />,
  up: <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
};

const Arrow = ({ name, className, size = isMobile ? 25 : 20 }) => {
  return (
    <svg
      className={`${className} ${className}--${name}`}
      height={size.height || size}
      width={size.width || size}
      viewBox="0 0 24 24"
    >
      {ARROWS[name]}
    </svg>
  );
};

export default Arrow;
