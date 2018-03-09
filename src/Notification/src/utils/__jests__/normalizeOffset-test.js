import normalizeOffset from '../normalizeOffset';

describe('normalizeOffset', () => {
  it('if a number applies the offset to all sides', () => {
    const expected = {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    };

    expect(normalizeOffset(20)).toEqual(expected);
  });
});
