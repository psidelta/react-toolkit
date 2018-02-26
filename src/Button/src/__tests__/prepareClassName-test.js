import prepareClassName from '../prepareClassName';

describe('prepareClassName', () => {
  it('adds disabled className', () => {
    expect(prepareClassName({ disabled: true })).to.have.string('disabled');
    expect(
      prepareClassName({ disabled: true }, { disabledClassName: 'test' })
    ).to.have.string('test');
  });
  it('adds wrap className', () => {
    expect(prepareClassName({ wrap: true })).to.have.string('--wrap');
    expect(prepareClassName({ wrap: false })).to.have.string('--nowrap');
    expect(prepareClassName({ wrap: undefined })).to.not.have.string('wrap');
  });
  it('adds verticalAlign className', () => {
    expect(prepareClassName({ verticalAlign: 'middle' })).to.have.string(
      '--vertical-align-middle'
    );
    expect(prepareClassName({ verticalAlign: 'top' })).to.have.string(
      '--vertical-align-top'
    );
  });
  it('adds active className', () => {
    expect(prepareClassName({ active: true })).to.have.string('active');
    expect(
      prepareClassName({ active: true }, { activeClassName: 'test' })
    ).to.have.string('test');
  });
  it('adds pressed className', () => {
    expect(prepareClassName({ pressed: true })).to.have.string('pressed');
    expect(
      prepareClassName({ pressed: true }, { pressedClassName: 'test' })
    ).to.have.string('test');
  });
  it('adds over className', () => {
    expect(prepareClassName({ over: true })).to.have.string('over');
    expect(
      prepareClassName({ over: true }, { overClassName: 'test' })
    ).to.have.string('test');
  });
  it('adds focused className', () => {
    expect(prepareClassName({ focused: true })).to.have.string('focused');
    expect(
      prepareClassName({ focused: true }, { focusedClassName: 'test' })
    ).to.have.string('test');
  });
});
