/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import addColor from '../addColor';

describe('addColor', () => {
  it('adds the color at the end if there is enough space', () => {
    expect(
      addColor({
        color: 'red',
        palette: ['blue'],
        length: 2
      })
    ).toEqual(['blue', 'red']);
  });
  it('adds the color at the begining if there is not enough space', () => {
    expect(
      addColor({
        color: 'red',
        palette: ['blue', 'yellow'],
        length: 2
      })
    ).toEqual(['red', 'yellow']);
  });
  it('if palette is null it must return an array with the color', () => {
    expect(
      addColor({
        color: 'red',
        palette: null,
        length: 2
      })
    ).toEqual(['red']);
  });
});
