import getNextNavigableItem from '../getNextNavigableItem';

describe('getNextNavigableItem', () => {
  it('should get first non disabled item in 1 direction, from top to bottom', () => {
    const items = [
      { disabled: true },
      { disabled: true },
      { disabled: true },
      { disabled: false }, // 3
      { disabled: true },
      '-',
      { disabled: false }, // 6
      { disabled: false },
      { disabled: true }
    ];
    expect(getNextNavigableItem(items, 3, 1)).equal(6);
  });
  it('should get first non disabled item in -1 direction, from bottom to top', () => {
    const items = [
      { disabled: true },
      { disabled: true },
      { disabled: true },
      { disabled: false }, // 3
      '-',
      { disabled: true },
      { disabled: false }, // 6
      { disabled: false },
      { disabled: true }
    ];
    expect(getNextNavigableItem(items, 6, -1)).equal(3);
  });
});
