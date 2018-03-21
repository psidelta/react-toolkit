import getNewMultipleValue from '../getNewMultipleValue';

describe('getNewMultipleValue', () => {
  it('returns correct new value', () => {
    expect(getNewMultipleValue({ id: 1, value: null })).toEqual([1]);
    expect(getNewMultipleValue({ id: 1, value: [1] })).toEqual(null);
    expect(getNewMultipleValue({ id: 3, value: [1, 2] })).toEqual([1, 2, 3]);
  });
});
