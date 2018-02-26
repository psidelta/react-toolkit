import getNewActiveTagOnRemove from '../getNewActiveTagOnRemove';

describe('getNewActiveTagOnRemove', () => {
  it('returns the correct activeTag after activeTag was removed', () => {
    expect(getNewActiveTagOnRemove({ id: 2, value: [1, 2, 3] })).to.equal(1);
    expect(getNewActiveTagOnRemove({ id: 3, value: [1, 2, 3] })).to.equal(2);
    expect(getNewActiveTagOnRemove({ id: 3, value: [3] })).to.be.null;
  });
});
