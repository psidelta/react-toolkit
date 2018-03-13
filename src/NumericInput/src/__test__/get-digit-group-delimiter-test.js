import getDigitGroup from '../utils/get-digit-group-delimiter';

describe('getDigitGroup utils function', () => {
  it('should get decimal character when no locale used', () => {
    const delimiter = getDigitGroup();
    expect(delimiter).to.not.be.falsy;
  });

  it('should get digit group character "," for en-GB locale', () => {
    const delimiter = getDigitGroup('en-GB');
    expect(delimiter).to.be.equal(',');
  });

  it('should get digit group character "." for ro-RO locale', () => {
    const delimiter = getDigitGroup('ro-RO');
    expect(delimiter).to.be.equal('.');
  });
});
