import range from '../range';

describe('range', () => {
  it('constructs correct ranges', () => {
    expect(range(1, 10)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(range(10, 110, 10)).to.deep.equal([
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      100
    ]);
  });
});
