import getRootStyle from '../getRootStyle';

describe('getRootStyle', () => {
  it('applies the correct style', () => {
    const props = {
      style: {
        color: 'red'
      }
    };
    expect(getRootStyle({ props }).color).toEqual('red');
  });
});
