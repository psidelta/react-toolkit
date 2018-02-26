'use strict';

var _timeFormatter = require('../src/utils/time-formatter');

var _timeFormatter2 = _interopRequireDefault(_timeFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('timeFormatter', function () {
  it('should be a function', function () {
    expect(_timeFormatter2.default).to.be.instanceOf(Function);
  });

  describe("when under 1000 ms", function () {
    it('should show milliseconds with showMilliseconds:true', function () {
      var msText = (0, _timeFormatter2.default)(500, { showMilliseconds: true });
      expect(msText).to.equal('500ms');
    });

    it('should show decimal seconds', function () {
      var msText = (0, _timeFormatter2.default)(500);
      expect(msText).to.equal('0.5s');
    });
  });

  describe("when between 1000ms and 59999ms", function () {
    it('should show seconds and milliseconds with showMilliseconds:true', function () {
      var msText = (0, _timeFormatter2.default)(45725, { showMilliseconds: true });
      expect(msText).to.equal('45s 725ms');
    });

    it('should show just seconds', function () {
      var msText = (0, _timeFormatter2.default)(45725);
      // rounded by formatNuber number.toLocaleString
      expect(msText).to.equal('45.73s');
    });
  });

  describe("when between 1minutes and 59minutes 59seconds 999ms", function () {
    it('should show minutes and seconds', function () {
      var msText = (0, _timeFormatter2.default)(60 * 1000 * 3 + 45 * 1000 + 123);
      expect(msText).to.equal('3m 45s');
    });

    it('should show minutes, seconds and milliseconds', function () {
      var msText = (0, _timeFormatter2.default)(60 * 1000 * 3 + 45 * 1000 + 123, { showMilliseconds: true });
      expect(msText).to.equal('3m 45s 123ms');
    });

    it('should show minutes only', function () {
      var msText = (0, _timeFormatter2.default)(60 * 1000 * 3 + 45 * 1000 + 123, { showSeconds: false });
      expect(msText).to.equal('4m');
    });
  });

  describe("with hours", function () {
    //2hours 3 minutes, 45 seconds, 123 ms
    var time = 2 * 60 * 60 * 1000 + 3 * 60 * 1000 + 45 * 1000 + 123;

    it('should render hours, minuts and seconds', function () {
      var text = (0, _timeFormatter2.default)(time);
      expect(text).to.equal('2h 3m 45s');
    });

    it('should render hours with aproximation', function () {
      var text = (0, _timeFormatter2.default)(time, { showMinutes: false });
      expect(text).to.equal('2.1h');

      var moreTime = time + 43 * 60 * 1000; // 2 hours 46 minutes ...
      var moreTimeText = (0, _timeFormatter2.default)(moreTime, { showMinutes: false });
      expect(moreTimeText).to.equal('2.8h');
    });
  });

  describe("with days", function () {
    //1 day, 12hours 33 minutes, 45 seconds, 123 ms
    var time = 1 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 33 * 60 * 1000 + 45 * 1000 + 123;

    it('should render days, minuts and seconds', function () {
      var text = (0, _timeFormatter2.default)(time);
      expect(text).to.equal('1d 12h 33m 45s');
    });

    it('should render days with aproximation', function () {
      var text = (0, _timeFormatter2.default)(time, { showMinutes: false });
      expect(text).to.equal('1d 12.6h');

      var moreTime = time + 10 * 60 * 1000; // add 10 minutes
      var moreTimeText = (0, _timeFormatter2.default)(moreTime, { showMinutes: false });
      expect(moreTimeText).to.equal('1d 12.7h');
    });
  });
});