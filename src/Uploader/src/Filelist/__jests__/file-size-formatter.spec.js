/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fileSizeFormatter from '../src/utils/file-size-formatter';

describe('fileSizeFormatter', () => {
  it('should be a function', () => {
    expect(fileSizeFormatter).toBeInstanceOf(Function);
  });

  it('should return string', () => {
    const result = fileSizeFormatter();
    expect(typeof result).toEqual('string');
  });

  xit('should return formated number in given locale', () => {
    const RO = 'ro-RO';
    const GB = 'en-GB';

    const roNumber = fileSizeFormatter(12345, {
      locale: RO
    });

    const gbNumber = fileSizeFormatter(12345, {
      locale: GB
    });

    expect(gbNumber).not.toEqual(roNumber);
  });

  const byte = 1;
  const bytes = 1023;

  const kb = bytes + 1;
  const kbs = kb * 2;

  const mb = 1024 * 1024;
  const mbs = 2 * mb;

  const gb = mb * 1024;
  const gbs = 2 * mb * 1024;

  it('should return byte and bytes', () => {
    const byteNumber = fileSizeFormatter(byte);
    const bytesNumber = fileSizeFormatter(bytes);

    expect(byteNumber).toContain('B');
    expect(bytesNumber).toContain('Bs');
  });

  it('should return kbyte and kbytes', () => {
    const byteNumber = fileSizeFormatter(kb);
    const bytesNumber = fileSizeFormatter(kbs);

    expect(byteNumber).toContain('KB');
    expect(bytesNumber).toContain('KBs');
  });

  it('should return mbyte and mbytes', () => {
    const byteNumber = fileSizeFormatter(mb);
    const bytesNumber = fileSizeFormatter(mbs);

    expect(byteNumber).toContain('MB');
    expect(bytesNumber).toContain('MBs');
  });

  it('should return gbyte and gbytes', () => {
    const byteNumber = fileSizeFormatter(gb);
    const bytesNumber = fileSizeFormatter(gbs);

    expect(byteNumber).toContain('GB');
    expect(bytesNumber).toContain('GBs');
  });

  it('should support configurable suffixes', () => {
    const confugrableSuffxies = {
      gbSingular: 'xGB',
      gbPlural: 'xGBs',
      mbSingular: 'xMB',
      mbPlural: 'xMBs',
      kbSingular: 'xKB',
      kbPlural: 'xKBs',
      byteSingular: 'xB',
      bytePlural: 'xBs'
    };

    let resultingString;

    resultingString = fileSizeFormatter(byte, confugrableSuffxies);
    expect(resultingString).toContain(confugrableSuffxies.byteSingular);

    resultingString = fileSizeFormatter(bytes, confugrableSuffxies);
    expect(resultingString).toContain(confugrableSuffxies.bytePlural);

    resultingString = fileSizeFormatter(kb, confugrableSuffxies);
    expect(resultingString).toContain(confugrableSuffxies.kbSingular);

    resultingString = fileSizeFormatter(kbs, confugrableSuffxies);
    expect(resultingString).toContain(confugrableSuffxies.kbPlural);

    resultingString = fileSizeFormatter(mb, confugrableSuffxies);
    expect(resultingString).toContain(confugrableSuffxies.mbSingular);

    resultingString = fileSizeFormatter(mbs, confugrableSuffxies);
    expect(resultingString).toContain(confugrableSuffxies.mbPlural);

    resultingString = fileSizeFormatter(gb, confugrableSuffxies);
    expect(resultingString).toContain(confugrableSuffxies.gbSingular);

    resultingString = fileSizeFormatter(gbs, confugrableSuffxies);
    expect(resultingString).toContain(confugrableSuffxies.gbPlural);
  });
});
