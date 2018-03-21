import bringForwards from '../bringForwards';

describe('bringForwards', () => {
  it('should bring id one step forward (index++)', () => {
    const list = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 5, 4];

    expect(bringForwards(4, list)).toEqual(expected);
  });
});
