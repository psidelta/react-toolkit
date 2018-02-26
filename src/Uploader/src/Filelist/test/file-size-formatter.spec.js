import fileSizeFormatter from '../src/utils/file-size-formatter';

describe('fileSizeFormatter', () => {
  it('should be a function', () => {
    expect(fileSizeFormatter).to.be.instanceOf(Function);
  });

  it('should return string', () => {
    const result = fileSizeFormatter();
    expect(result).to.be.string;
  });

  it('should return formated number in given locale', () => {
    const RO = 'ro-RO';
    const GB = 'en-GB';

    const roNumber = fileSizeFormatter(12345, {
      locale: RO
    });

    const gbNumber = fileSizeFormatter(12345, {
      locale: GB
    });

    expect(gbNumber).to.not.equal(roNumber);
  });

    const byte = 1;
    const bytes = 1023;

    const kb = bytes+1;
    const kbs = kb*2;

    const mb = 1024*1024;
    const mbs = 2*mb;

    const gb = mb * 1024;
    const gbs = 2 * mb * 1024;

  it('should return byte and bytes', () => {
    const byteNumber = fileSizeFormatter(byte);
    const bytesNumber = fileSizeFormatter(bytes);

    expect(byteNumber).to.contain('B');
    expect(bytesNumber).to.contain('Bs');
  });

  it('should return kbyte and kbytes', () => {
    const byteNumber = fileSizeFormatter(kb);
    const bytesNumber = fileSizeFormatter(kbs);

    expect(byteNumber).to.contain('KB');
    expect(bytesNumber).to.contain('KBs');
  });

  it('should return mbyte and mbytes', () => {
    const byteNumber = fileSizeFormatter(mb);
    const bytesNumber = fileSizeFormatter(mbs);

    expect(byteNumber).to.contain('MB');
    expect(bytesNumber).to.contain('MBs');
  });

  it('should return gbyte and gbytes', () => {
    const byteNumber = fileSizeFormatter(gb);
    const bytesNumber = fileSizeFormatter(gbs);

    expect(byteNumber).to.contain('GB');
    expect(bytesNumber).to.contain('GBs');
  });

  it('should support configurable suffixes', () => {
    const confugrableSuffxies = {
      gbSingular: 'xGB',
      gbPlural: 'xGBs',
      mbSingular: 'xMB',
      mbPlural: 'xMBs',
      kbSingular: 'xKB',
      kbPlural: 'xKBs',
      byteSingular: "xB",
      bytePlural: 'xBs'
    };

    let resultingString;

    resultingString = fileSizeFormatter(byte, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.byteSingular);

    resultingString = fileSizeFormatter(bytes, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.bytePlural);

    resultingString = fileSizeFormatter(kb, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.kbSingular);

    resultingString = fileSizeFormatter(kbs, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.kbPlural);

    resultingString = fileSizeFormatter(mb, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.mbSingular);

    resultingString = fileSizeFormatter(mbs, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.mbPlural);

    resultingString = fileSizeFormatter(gb, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.gbSingular);

    resultingString = fileSizeFormatter(gbs, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.gbPlural);

  });


});
