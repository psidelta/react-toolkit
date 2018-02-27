import adjustPositionWithOffset from '../adjustPositionWithOffset';

const extractPosition = ({ top, right }) => ({ top, right });

describe('adjustPositionWithOffset', () => {
  it('adds offset to correct positions', () => {
    const input = [
      { top: 10, right: 10, offset: { top: 10, right: 20 } },
      { top: 80, right: 20, offset: { top: 5, right: 2 } }
    ];

    const expected = [{ top: 20, right: 30 }, { top: 85, right: 22 }];

    const test = adjustPositionWithOffset(input).map(extractPosition);

    expect(test).to.deep.equal(expected);
  });
});
