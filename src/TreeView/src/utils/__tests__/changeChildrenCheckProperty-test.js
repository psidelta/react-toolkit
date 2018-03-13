import changeChildrenCheckProperty from '../changeChildrenCheckProperty';

describe('changeChildrenCheckProperty', () => {
  const test = {
    path: '0',
    children: [
      {
        path: '0/0'
      },
      {
        path: '0/1',
        children: [{}, {}],
        disabled: true
      }
    ]
  };
  expect(changeChildrenCheckProperty(test, true)).to.deep.equal({
    0: true
  });
});
