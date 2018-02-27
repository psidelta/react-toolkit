import convertStringToNumber from '../utils/convert-string-to-number';

describe('convertStringToNumber utils function', () => {
  it('should convert numbers without any special deilimitors', () => {
    const number = convertStringToNumber('1000');
    expect(number).to.equal(1000);
  });

  it('should convert empty/nan/falsy strings', () => {
    expect(convertStringToNumber()).to.be.NaN;
    expect(convertStringToNumber('x')).to.be.NaN;
  });

  it('should convert number strings keeping in mind decimal delimiter', () => {
    const number1 = convertStringToNumber('1000.00');
    expect(number1).to.equal(1000);

    const number2 = convertStringToNumber('1000.05');
    expect(number2).to.equal(1000.05);

    const number3 = convertStringToNumber('1000.05', {
      decimalDelimiter: '.'
    });

    expect(number3).to.equal(1000.05);

    const number4 = convertStringToNumber('1000,05', {
      decimalDelimiter: ','
    });

    expect(number4).to.equal(1000.05);

    const number5 = convertStringToNumber('1000,00', {
      decimalDelimiter: ','
    });

    expect(number5).to.equal(1000);
  });

  it('should convert numbers having group delimiters', () => {
    const reversedDelimiters = {
      decimalDelimiter: ',',
      digitGroupDelimiter: '.'
    };

    const number1 = convertStringToNumber('100.000', reversedDelimiters);
    expect(number1, `'100.000' -> ${number1}`).to.equal(100000);

    const number1b = convertStringToNumber('100,000');
    expect(number1b, `'100.000' -> ${number1b}`).to.equal(100000);

    const number2 = convertStringToNumber('1.0.0...005', reversedDelimiters);
    expect(number2, `'100.000' -> ${number2}`).to.equal(100005);

    const number2b = convertStringToNumber('1,0,0,,,005');
    expect(number2b, `'100.000' -> ${number2b}`).to.equal(100005);
  });

  it('should convert numbers having group delimiters and decimal delimiters', () => {
    const reversedDelimiters = {
      decimalDelimiter: ',',
      digitGroupDelimiter: '.'
    };

    const number1 = convertStringToNumber('100.000,00', reversedDelimiters);
    expect(number1).to.equal(100000);

    const number2 = convertStringToNumber('1.0.0...005,05', reversedDelimiters);
    expect(number2).to.equal(100005.05);

    const number1b = convertStringToNumber('100,000.00');
    expect(number1b).to.equal(100000);

    const number2b = convertStringToNumber('1,0,0,,,005.05');
    expect(number2b).to.equal(100005.05);
  });

  describe('min/max values', () => {
    const minMaxParams = {
      min: 1000,
      max: 2000
    };

    it('should handle min values', () => {
      const minEdgeNumber = convertStringToNumber('1000', minMaxParams);
      expect(minEdgeNumber).to.equal(1000);

      const underMinEdgeNumber = convertStringToNumber('999.9', minMaxParams);
      expect(underMinEdgeNumber).to.equal(1000);
    });

    it('should handle max values', () => {
      const validNumber = convertStringToNumber('1500.2', minMaxParams);
      expect(validNumber).to.equal(1500.2);

      const maxEdgeNumber = convertStringToNumber('2000', minMaxParams);
      expect(maxEdgeNumber).to.equal(2000);

      const overMaxEdgeNumber = convertStringToNumber('2000.1', minMaxParams);
      expect(overMaxEdgeNumber).to.equal(2000);
    });
  });
});
