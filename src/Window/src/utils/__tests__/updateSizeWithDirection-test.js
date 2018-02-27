import updateSizeWithDirection from '../updateSizeWithDirection';

describe('updateSizeWithDirection', () => {
  it('updates corect for direction top', () => {
    expect(
      updateSizeWithDirection({
        position: { top: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'up',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 0, width: 10 },
      position: { top: 0, left: 0 }
    });
    expect(
      updateSizeWithDirection({
        position: { bottom: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'up',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 0, width: 10 },
      position: { bottom: 10, left: 0 }
    });
  });
  it('updates corect for direction down', () => {
    expect(
      updateSizeWithDirection({
        position: { top: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'down',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 20, width: 10 },
      position: { top: 0, left: 0 }
    });
    expect(
      updateSizeWithDirection({
        position: { bottom: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'down',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 20, width: 10 },
      position: { bottom: -10, left: 0 }
    });
  });
  it('updates corect for direction left', () => {
    expect(
      updateSizeWithDirection({
        position: { top: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'left',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 10, width: 0 },
      position: { top: 0, left: 0 }
    });
    expect(
      updateSizeWithDirection({
        position: { bottom: 0, right: 0 },
        size: { width: 10, height: 10 },
        direction: 'left',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 10, width: 0 },
      position: { bottom: 0, right: 10 }
    });
  });
  it('updates corect for direction right', () => {
    expect(
      updateSizeWithDirection({
        position: { top: 0, left: 0 },
        size: { width: 10, height: 10 },
        direction: 'right',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 10, width: 20 },
      position: { top: 0, left: 0 }
    });
    expect(
      updateSizeWithDirection({
        position: { bottom: 0, right: 0 },
        size: { width: 10, height: 10 },
        direction: 'right',
        step: 10
      })
    ).to.deep.equal({
      size: { height: 10, width: 20 },
      position: { bottom: 0, right: -10 }
    });
  });
});
