import { getClassNames, CLASS_NAME } from '../../src/MaskedInput';

describe('getClassNames', () => {
  it('should return string containing main class name', () => {
    expect(
      getClassNames({ rootClassName: 'zippy-react-toolkit-masked-input' })
    ).to.contain(CLASS_NAME);
  });

  it('should return focused modifier when focused state', () => {
    expect(getClassNames({}, { focused: true })).to.contain('--focused');
  });

  it('should return disabled modifier when disabled state', () => {
    expect(getClassNames({}, { disabled: true })).to.contain('--disabled');
  });

  it('should return readOnly modifier when readOnly state', () => {
    expect(getClassNames({}, { readOnly: true })).to.contain('--readOnly');
  });

  it('should return empty modifier when empty value', () => {
    expect(
      getClassNames({
        currentValue: ''
      })
    ).to.contain('--empty');
  });

  it('should return unmasked modifier when no mask value', () => {
    expect(
      getClassNames({
        currentValue: '',
        mask: false
      })
    ).to.contain('--unmasked');
  });

  it('should return masked modifier when mask value exists', () => {
    expect(
      getClassNames({
        currentValue: '',
        mask: 'something'
      })
    ).to.contain('--masked');
  });
});
