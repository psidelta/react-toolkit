import getOpositeIndex from '../getOpositeIndex';

describe('getOpositeIndex', () => {
  it('returns correct oposite index', () => {
    expect(getOpositeIndex(0, 20)).toEqual(19);
    expect(getOpositeIndex(1, 20)).toEqual(18);
    expect(getOpositeIndex(2, 20)).toEqual(17);
    expect(getOpositeIndex(18, 20)).toEqual(1);
    expect(getOpositeIndex(19, 20)).toEqual(0);
  });
});
