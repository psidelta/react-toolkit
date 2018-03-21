import getNewSingleValue from '../getNewSingleValue';

describe('getNewSingleValue', () => {
  it('returns correct new value', () => {
    expect(getNewSingleValue({ id: 1, value: 3 })).toEqual(1);
    expect(getNewSingleValue({ id: 3, value: 3 })).toEqual(null);
    expect(getNewSingleValue({ id: 3, value: null })).toEqual(3);
  });
});
