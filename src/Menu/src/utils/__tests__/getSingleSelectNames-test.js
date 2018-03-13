import getSingleSelectNames from '../getSingleSelectNames';

describe('getSingleSelectNames', () => {
  it('returns the name that repeat at least once', () => {
    const items = [
      { name: 'name1' },
      { name: 'name1' },
      { name: 'name1' },

      { name: 'name2' },

      { name: 'name3' },
      { name: 'name3' },

      { name: 'name5' }
    ];

    const expected = {
      name1: true,
      name2: false,
      name3: true,
      name5: false
    };

    expect(
      getSingleSelectNames({
        items,
        nameProperty: 'name'
      })
<<<<<<< HEAD
    ).toEqual(expected);
=======
    ).to.deep.equal(expected);
>>>>>>> dev
  });
});
