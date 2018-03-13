import timeFormatter from '../src/utils/time-formatter';

describe('timeFormatter', () => {
  it('should be a function', () => {
    expect(timeFormatter).toBeInstanceOf(Function);
  });

  describe('when under 1000 ms', () => {
    it('should show milliseconds with showMilliseconds:true', () => {
      const msText = timeFormatter(500, { showMilliseconds: true });
      expect(msText).toEqual('500ms');
    });

    it('should show decimal seconds', () => {
      const msText = timeFormatter(500);
      expect(msText).toEqual('0.5s');
    });
  });

  describe('when between 1000ms and 59999ms', () => {
    it('should show seconds and milliseconds with showMilliseconds:true', () => {
      const msText = timeFormatter(45725, { showMilliseconds: true });
      expect(msText).toEqual('45s 725ms');
    });

    it('should show just seconds', () => {
      const msText = timeFormatter(45725);
      // rounded by formatNuber number.toLocaleString
      expect(msText).toEqual('45.73s');
    });
  });

  describe('when between 1minutes and 59minutes 59seconds 999ms', () => {
    it('should show minutes and seconds', () => {
      const msText = timeFormatter(60 * 1000 * 3 + 45 * 1000 + 123);
      expect(msText).toEqual('3m 45s');
    });

    it('should show minutes, seconds and milliseconds', () => {
      const msText = timeFormatter(60 * 1000 * 3 + 45 * 1000 + 123, {
        showMilliseconds: true
      });
      expect(msText).toEqual('3m 45s 123ms');
    });

    it('should show minutes only', () => {
      const msText = timeFormatter(60 * 1000 * 3 + 45 * 1000 + 123, {
        showSeconds: false
      });
      expect(msText).toEqual('4m');
    });
  });

  describe('with hours', () => {
    //2hours 3 minutes, 45 seconds, 123 ms
    const time = 2 * 60 * 60 * 1000 + 3 * 60 * 1000 + 45 * 1000 + 123;

    it('should render hours, minuts and seconds', () => {
      const text = timeFormatter(time);
      expect(text).toEqual('2h 3m 45s');
    });

    it('should render hours with aproximation', () => {
      const text = timeFormatter(time, { showMinutes: false });
      expect(text).toEqual('2.1h');

      const moreTime = time + 43 * 60 * 1000; // 2 hours 46 minutes ...
      const moreTimeText = timeFormatter(moreTime, { showMinutes: false });
      expect(moreTimeText).toEqual('2.8h');
    });
  });

  describe('with days', () => {
    //1 day, 12hours 33 minutes, 45 seconds, 123 ms
    const time =
      1 * 24 * 60 * 60 * 1000 +
      12 * 60 * 60 * 1000 +
      33 * 60 * 1000 +
      45 * 1000 +
      123;

    it('should render days, minuts and seconds', () => {
      const text = timeFormatter(time);
      expect(text).toEqual('1d 12h 33m 45s');
    });

    it('should render days with aproximation', () => {
      const text = timeFormatter(time, { showMinutes: false });
      expect(text).toEqual('1d 12.6h');

      const moreTime = time + 10 * 60 * 1000; // add 10 minutes
      const moreTimeText = timeFormatter(moreTime, { showMinutes: false });
      expect(moreTimeText).toEqual('1d 12.7h');
    });
  });
});
