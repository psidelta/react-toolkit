'use strict';

var _fileSizeFormatter = require('../src/utils/file-size-formatter');

var _fileSizeFormatter2 = _interopRequireDefault(_fileSizeFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('fileSizeFormatter', function () {
  it('should be a function', function () {
    expect(_fileSizeFormatter2.default).to.be.instanceOf(Function);
  });

  it('should return string', function () {
    var result = (0, _fileSizeFormatter2.default)();
    expect(result).to.be.string;
  });

  it('should return formated number in given locale', function () {
    var RO = 'ro-RO';
    var GB = 'en-GB';

    var roNumber = (0, _fileSizeFormatter2.default)(12345, {
      locale: RO
    });

    var gbNumber = (0, _fileSizeFormatter2.default)(12345, {
      locale: GB
    });

    expect(gbNumber).to.not.equal(roNumber);
  });

  var byte = 1;
  var bytes = 1023;

  var kb = bytes + 1;
  var kbs = kb * 2;

  var mb = 1024 * 1024;
  var mbs = 2 * mb;

  var gb = mb * 1024;
  var gbs = 2 * mb * 1024;

  it('should return byte and bytes', function () {
    var byteNumber = (0, _fileSizeFormatter2.default)(byte);
    var bytesNumber = (0, _fileSizeFormatter2.default)(bytes);

    expect(byteNumber).to.contain('B');
    expect(bytesNumber).to.contain('Bs');
  });

  it('should return kbyte and kbytes', function () {
    var byteNumber = (0, _fileSizeFormatter2.default)(kb);
    var bytesNumber = (0, _fileSizeFormatter2.default)(kbs);

    expect(byteNumber).to.contain('KB');
    expect(bytesNumber).to.contain('KBs');
  });

  it('should return mbyte and mbytes', function () {
    var byteNumber = (0, _fileSizeFormatter2.default)(mb);
    var bytesNumber = (0, _fileSizeFormatter2.default)(mbs);

    expect(byteNumber).to.contain('MB');
    expect(bytesNumber).to.contain('MBs');
  });

  it('should return gbyte and gbytes', function () {
    var byteNumber = (0, _fileSizeFormatter2.default)(gb);
    var bytesNumber = (0, _fileSizeFormatter2.default)(gbs);

    expect(byteNumber).to.contain('GB');
    expect(bytesNumber).to.contain('GBs');
  });

  it('should support configurable suffixes', function () {
    var confugrableSuffxies = {
      gbSingular: 'xGB',
      gbPlural: 'xGBs',
      mbSingular: 'xMB',
      mbPlural: 'xMBs',
      kbSingular: 'xKB',
      kbPlural: 'xKBs',
      byteSingular: "xB",
      bytePlural: 'xBs'
    };

    var resultingString = void 0;

    resultingString = (0, _fileSizeFormatter2.default)(byte, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.byteSingular);

    resultingString = (0, _fileSizeFormatter2.default)(bytes, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.bytePlural);

    resultingString = (0, _fileSizeFormatter2.default)(kb, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.kbSingular);

    resultingString = (0, _fileSizeFormatter2.default)(kbs, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.kbPlural);

    resultingString = (0, _fileSizeFormatter2.default)(mb, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.mbSingular);

    resultingString = (0, _fileSizeFormatter2.default)(mbs, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.mbPlural);

    resultingString = (0, _fileSizeFormatter2.default)(gb, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.gbSingular);

    resultingString = (0, _fileSizeFormatter2.default)(gbs, confugrableSuffxies);
    expect(resultingString).to.contain(confugrableSuffxies.gbPlural);
  });
});