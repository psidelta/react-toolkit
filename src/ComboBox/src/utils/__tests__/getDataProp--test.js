import getDataProp from '../getDataProp';

describe('getDataProp', () => {
  it('returns correct prop', () => {
    expect(getDataProp('id')({ id: 'hey' })).to.equal('hey');

    expect(getDataProp(() => 'hey')({ id: 'hey' })).to.equal('hey');
  });
});
