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

import constrainPositionToRegion from '../constrainPositionToRegion';

describe('constrainPositionToRegion', () => {
  it('constrains position top and left when it overflows top/left', () => {
    const region = { width: 100, height: 100 };
    const constrain = { top: 10, left: 10, bottom: 300, right: 300 };
    const position = { top: 0, left: 0 };
    const expected = { top: 10, left: 10 };
    expect(
      constrainPositionToRegion({ constrain, position, region })
    ).to.deep.equal(expected);
  });
  it('constrains position top and left when it overflows bottom/right', () => {
    const constrain = { top: 10, left: 10, bottom: 300, right: 300 };
    const region = { width: 200, height: 200 };
    const position = { top: 200, left: 200 };
    const expected = { top: 100, left: 100 };
    expect(
      constrainPositionToRegion({ constrain, position, region })
    ).to.deep.equal(expected);
  });
  it(
    'constrains position bottom and right when it overflows bottom/right',
    () => {
      const region = { width: 100, height: 100 };
      const constrain = { top: 0, left: 0, bottom: 300, right: 300 };
      const position = { bottom: -10, right: -10 };
      const expected = { bottom: 0, right: 0 };
      expect(
        constrainPositionToRegion({ constrain, position, region })
      ).to.deep.equal(expected);
    }
  );
  it('constrains position bottom and right when it overflows top/left', () => {
    const constrain = { top: 0, left: 0, bottom: 300, right: 300 };
    const region = { width: 200, height: 200 };
    const position = { bottom: 200, right: 200 };
    const expected = { bottom: 100, right: 100 };
    expect(
      constrainPositionToRegion({ constrain, position, region })
    ).to.deep.equal(expected);
  });
});
