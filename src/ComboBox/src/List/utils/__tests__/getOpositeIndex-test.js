import getOpositeIndex from '../getOpositeIndex';

describe('getOpositeIndex', () => {
  it('returns correct oposite index', () => {
    expect(getOpositeIndex(0, 20)).to.equal(19);
    expect(getOpositeIndex(1, 20)).to.equal(18);
    expect(getOpositeIndex(2, 20)).to.equal(17);
    expect(getOpositeIndex(18, 20)).to.equal(1);
    expect(getOpositeIndex(19, 20)).to.equal(0);
  });
});
