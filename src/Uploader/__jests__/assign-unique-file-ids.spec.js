/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assignFileUniqueIds from '../src/utils/assign-unique-file-ids';

describe('assignFileUniqueIds', () => {
  it('should walk the array of file objects and call UID function', () => {
    const FILES = [{ name: 'a', size: 1 }, { name: 'b', size: 2 }];
    const uidFunction = file => file.name;
    const uidFnSpy = jest.fn(uidFunction);
    const result = assignFileUniqueIds(FILES, uidFnSpy);

    expect(
      FILES.map(f => {
        return {
          ...f,
          id: f.name
        };
      })
    ).toEqual(result);
    expect(uidFnSpy).toHaveBeenCalledTimes(2);
  });

  it('should pass relevant info to uuid function', () => {
    const FILES = [{ name: 'a', size: 1 }, { name: 'b', size: 2 }];
    const uidFnSpy = jest.fn(file => file.name);
    const EXTRA_PARAMS = {
      extraParam1: '1'
    };
    const result = assignFileUniqueIds(FILES, uidFnSpy, EXTRA_PARAMS);

    expect(uidFnSpy).toHaveBeenCalledTimes(2);
    expect(uidFnSpy.mock.calls[0]).toEqual([FILES[0], 0, FILES, EXTRA_PARAMS]);
    expect(uidFnSpy.mock.calls[1]).toEqual([FILES[1], 1, FILES, EXTRA_PARAMS]);
  });
});
