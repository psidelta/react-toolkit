import findItemIndex from '../findItemIndex';

describe('findItemIndex', () => {
  it('returns the correct index of the item', () => {
    const test = findItemIndex({
      data: [{ id: 1 }, { id: 2 }],
      id: 1,
      getIdProperty: item => item.id
    });

    expect(test).toEqual(0);
  });
});
