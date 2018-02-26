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

import Region from '@zippytech/region';

import adjustRegionOffset from '../adjustRegionOffset';

describe('adjustRegionOffset', () => {
  it('returns a new region with given offset', () => {
    const region = Region.from({
      top: 0,
      left: 0,
      bottom: 100,
      right: 100
    });

    const offset = 10;

    const expected = Region.from({
      left: 10,
      top: 10,
      bottom: 90,
      right: 90
    });

    const test = adjustRegionOffset({ region, offset });
    expect(expected.equals(test)).to.be.true;
  });
});
