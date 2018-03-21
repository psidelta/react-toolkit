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

import { toHsv } from './color';

const toColorValue = value => {
  if (typeof value == 'string') {
    return toHsv(value);
  }

  if (!value) {
    return {};
  }

  return {
    h: value.h,
    s: value.s,
    v: value.v,
    a: value.a
  };
};

export default toColorValue;
