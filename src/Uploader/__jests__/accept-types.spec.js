/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import acceptsFile from '../src/utils/accepts-file';

const PNG_FILE_MOCK = {
  name: 'test.png',
  type: 'image/png'
};

describe('acceptTypes util function', () => {
  it('should not crash without params', () => {
    const executor = jest.fn(() => {
      acceptsFile();
    });

    executor();

    expect(executor).not.toThrow(Error);
  });

  describe('string argument', () => {
    it('should validate via extension', () => {
      const validity = acceptsFile(PNG_FILE_MOCK, '.png');
      expect(validity).toBe(true);
      const rejection = acceptsFile(PNG_FILE_MOCK, '.jpg');
      expect(rejection).toBe(false);
    });
    it('should validate via mine type', () => {
      const validity = acceptsFile(PNG_FILE_MOCK, 'image/*');
      expect(validity).toBe(true);
      const rejection = acceptsFile(PNG_FILE_MOCK, 'audio/*');
      expect(rejection).toBe(false);
    });
    it('should validate via comma separated conditions', () => {
      const validity = acceptsFile(PNG_FILE_MOCK, 'audio/*, .png');
      expect(validity).toBe(true);

      const rejection = acceptsFile(PNG_FILE_MOCK, 'audio/*, .jpg');
      expect(rejection).toBe(false);
    });
  });

  describe('array of strings argument', () => {
    it('should validate via mine type or extension', () => {
      const validity = acceptsFile(PNG_FILE_MOCK, ['image/*', 'audio/*, .png']);
      expect(validity).toBe(true);
    });
  });

  describe('function argument', () => {
    it('should call validation function', () => {
      const acceptSpy = jest.fn();
      const validity = acceptsFile(PNG_FILE_MOCK, acceptSpy, [], 1, {});
      expect(acceptSpy).toHaveBeenCalledTimes(1);
      expect(acceptSpy.mock.calls[0]).toEqual([PNG_FILE_MOCK, [], 1, {}]);
    });
    it('should return validate status from function', () => {
      const validity = acceptsFile(PNG_FILE_MOCK, () => true);
      expect(validity).toBe(true);
      const rejection = acceptsFile(PNG_FILE_MOCK, () => false);
      expect(rejection).toBe(false);
    });
  });
});
