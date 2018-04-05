/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import normalizePalette from '../normalizePalette';

describe('normalizePalette', () => {
  it('should fill empty spaces with white', () => {
    const input = {
      length: 5,
      palette: ['#bbb']
    };
    const test = ['#bbb', '#fff', '#fff', '#fff'];
    expect(normalizePalette(input)).toEqual(test);
  });
});
