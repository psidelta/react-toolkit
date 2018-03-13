import getDecimalDelimiter from '../utils/get-decimal-delimiter';

describe('getDecimalDelimiter utils function', () => {
  it('should get decimal character when no locale used', () => {
    const delimiter = getDecimalDelimiter();
    expect(delimiter).to.not.be.falsy;
  });

  it('should get decimal character "." for en-GB locale', () => {
    const delimiter = getDecimalDelimiter('en-GB');
    expect(delimiter).to.be.equal('.');
  });

  it('should get decimal character "," for ro-RO locale', () => {
    const delimiter = getDecimalDelimiter('ro-RO');
    expect(delimiter).to.be.equal(',');
  });
});
