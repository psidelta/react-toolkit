import getFirstNonDisabledItem from '../getFirstNonDisabledItem';

describe('getFirstNonDisabledItem', () => {
  it('should return the first non disabled index', () => {
    const items = [
      { disabled: true },
      { disabled: true },
      { disabled: true },
      {} // 3
    ];

    expect(getFirstNonDisabledItem(items)).to.equal(3);
  });
  it('should return null if all elements are disabled', () => {
    const items = [{ disabled: true }, { disabled: true }, { disabled: true }];
    expect(getFirstNonDisabledItem(items)).to.be.null;
  });
});
