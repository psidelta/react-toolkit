import getLastRootNode from '../getLastRootNode';

describe('getLastRootNode', () => {
  it('should return the correct node', () => {
    const visibleNodes = [
      { id: 1, parent: null },
      { id: 2, parent: null },
      { id: 3, parent: {} },
      { id: 4, parent: null },
      { id: 5, parent: null }
    ];

    expect(getLastRootNode(1, visibleNodes).id).toEqual(5);
  });
});
