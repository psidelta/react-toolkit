import find from '../find';

describe('find', () => {
  it('returns null if the collection is null', () => {
    expect(find(null, () => {})).to.equal.null;
  });
  it('returns the first item that matches test', () => {
    const test = [{}, null, false, { a: 'test' }];
    expect(find(test, item => item && item.a === 'test')).toEqual({
      a: 'test'
    });
  });
});
