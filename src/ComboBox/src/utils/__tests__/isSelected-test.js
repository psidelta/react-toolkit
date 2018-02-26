import isSelected from '../isSelected';

describe('isSelected', () => {
  it('checks if the item is selected', () => {
    expect(isSelected({ id: 1, value: 1 })).to.be.true;
    expect(isSelected({ id: 1, value: 0 })).to.be.false;

    expect(isSelected({ id: 1, value: [1] })).to.be.true;
    expect(isSelected({ id: 1, value: [1, 2, 3] })).to.be.true;
    expect(isSelected({ id: 1, value: [0, 2, 3] })).to.be.false;
  });
});
