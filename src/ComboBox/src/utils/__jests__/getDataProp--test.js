import getDataProp from '../getDataProp';

describe('getDataProp', () => {
  it('returns correct prop', () => {
    expect(getDataProp('id')({ id: 'hey' })).toEqual('hey');

    expect(getDataProp(() => 'hey')({ id: 'hey' })).toEqual('hey');
  });
});
