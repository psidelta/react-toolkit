import getMinMaxSize from '../getMinMaxSize';

describe('getMinMaxSize', () => {
  it('constructs correct config object with single value', () => {
    expect(
      getMinMaxSize({
        minSize: 20
      })
    ).to.deep.equal({
      minWidth: 20,
      minHeight: 20
    });

    expect(
      getMinMaxSize({
        maxSize: 20
      })
    ).to.deep.equal({
      maxWidth: 20,
      maxHeight: 20
    });

    expect(
      getMinMaxSize({
        maxSize: 20,
        minSize: 22
      })
    ).to.deep.equal({
      maxWidth: 20,
      maxHeight: 20,
      minWidth: 22,
      minHeight: 22
    });
  });

  it('constructs correct config object with one key set', () => {
    expect(
      getMinMaxSize({
        minSize: { width: 20, height: 22 }
      })
    ).to.deep.equal({
      minWidth: 20,
      minHeight: 22
    });

    expect(
      getMinMaxSize({
        minSize: { width: 20 }
      })
    ).to.deep.equal({
      minWidth: 20
    });

    expect(
      getMinMaxSize({
        maxSize: { width: 20, height: 22 }
      })
    ).to.deep.equal({
      maxWidth: 20,
      maxHeight: 22
    });

    expect(
      getMinMaxSize({
        maxSize: { width: 20, height: 22 },
        minSize: { width: 21, height: 24 }
      })
    ).to.deep.equal({
      maxWidth: 20,
      maxHeight: 22,
      minWidth: 21,
      minHeight: 24
    });
  });
});
