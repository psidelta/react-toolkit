import injectNodes from '../injectNodes';

describe('injectNodes', () => {
  it('should inject nodes at the correct place', () => {
    const nodesToInject = [{ label: 'injectedNode' }];
    const data = [
      {
        label: 'test',
        nodes: [
          {
            label: 'test 1'
          }
        ]
      }
    ];

    const expected = [
      {
        label: 'test',
        nodes: [
          {
            label: 'test 1',
            nodes: nodesToInject
          }
        ]
      }
    ];

    const test = injectNodes(nodesToInject, [0, 0], data);

    expect(test).toEqual(expected);
  });
});
