/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import constrainPositionToRegion from '../constrainPositionToRegion';

describe('constrainPositionToRegion', () => {
  it('constrains position top and left when it overflows top/left', () => {
    const region = { width: 100, height: 100 };
    const constrain = { top: 10, left: 10, bottom: 300, right: 300 };
    const position = { top: 0, left: 0 };
    const expected = { top: 10, left: 10 };
    expect(constrainPositionToRegion({ constrain, position, region })).toEqual(
      expected
    );
  });
  it('constrains position top and left when it overflows bottom/right', () => {
    const constrain = { top: 10, left: 10, bottom: 300, right: 300 };
    const region = { width: 200, height: 200 };
    const position = { top: 200, left: 200 };
    const expected = { top: 100, left: 100 };
    expect(constrainPositionToRegion({ constrain, position, region })).toEqual(
      expected
    );
  });
  it('constrains position bottom and right when it overflows bottom/right', () => {
    const region = { width: 100, height: 100 };
    const constrain = { top: 0, left: 0, bottom: 300, right: 300 };
    const position = { bottom: -10, right: -10 };
    const expected = { bottom: 0, right: 0 };
    expect(constrainPositionToRegion({ constrain, position, region })).toEqual(
      expected
    );
  });
  it('constrains position bottom and right when it overflows top/left', () => {
    const constrain = { top: 0, left: 0, bottom: 300, right: 300 };
    const region = { width: 200, height: 200 };
    const position = { bottom: 200, right: 200 };
    const expected = { bottom: 100, right: 100 };
    expect(constrainPositionToRegion({ constrain, position, region })).toEqual(
      expected
    );
  });
});
