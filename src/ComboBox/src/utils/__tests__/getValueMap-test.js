import getValueMap from '../getValueMap';

describe('getValueMap', () => {
  it('adds new values and removes ones that are no longer present, and keeps the ones already in', () => {
    const dataMap = {
      1: { id: 1 },
      2: { id: 2 },
      3: { id: 3 },
      4: { id: 4 }
    };
    const value = [1, 2, 3];
    const test = getValueMap({
      value,
      dataMap,
      oldvalueMap: {
        4: { id: 4 },
        2: { id: 2 }
      }
    });

    expect(test).to.deep.equal({
      1: { id: 1 },
      3: { id: 3 },
      2: { id: 2 }
    });
  });
  it('works width single select', () => {
    const dataMap = {
      1: { id: 1 },
      2: { id: 2 },
      3: { id: 3 },
      4: { id: 4 }
    };
    const value = 2;
    const test = getValueMap({
      value,
      dataMap,
      oldvalueMap: {
        4: { id: 4 }
      }
    });

    expect(test).to.deep.equal({
      2: { id: 2 }
    });
  });
});
