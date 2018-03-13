import { getClassNames, CLASS_NAME } from '../../src/MaskedInput';

describe('getClassNames', () => {
  it('should return string containing main class name', () => {
    expect(
      getClassNames({ rootClassName: 'zippy-react-toolkit-masked-input' })
    ).toContain(CLASS_NAME);
  });

  it('should return focused modifier when focused state', () => {
    expect(getClassNames({}, { focused: true })).toContain('--focused');
  });

  it('should return disabled modifier when disabled state', () => {
    expect(getClassNames({ disabled: true }, {})).toContain(`--disabled`);
  });

  it('should return readOnly modifier when readOnly state', () => {
    expect(getClassNames({}, { readOnly: true })).toContain('--readOnly');
  });

  it('should return empty modifier when empty value', () => {
    expect(
      getClassNames({
        currentValue: ''
      })
    ).toContain('--empty');
  });

  it('should return unmasked modifier when no mask value', () => {
    expect(
      getClassNames({
        currentValue: '',
        mask: false
      })
    ).toContain('--unmasked');
  });

  it('should return masked modifier when mask value exists', () => {
    expect(
      getClassNames({
        currentValue: '',
        mask: 'something'
      })
    ).toContain('--masked');
  });
});
