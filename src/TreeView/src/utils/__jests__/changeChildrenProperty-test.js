import changeChildrenProperty from '../changeChildrenProperty';

describe('changeChildrenProperty', () => {
  it('creates of all the children nodes, with true as value', () => {
    const node = {
      path: '0',
      children: [
        {
          props: { path: '0/0' }
        },
        {
          props: {
            path: '0/1',
            children: [
              {
                props: {
                  path: '0/1/0'
                }
              }
            ]
          }
        }
      ]
    };

    const expected = {
      '0': true,
      '0/0': true,
      '0/1': true,
      '0/1/0': true
    };

    expect(changeChildrenProperty(node, true)).toEqual(expected);
  });
});
