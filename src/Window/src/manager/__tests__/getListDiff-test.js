import getListDiff from '../getListDiff'

describe('getListDiff', () => {
  it('should return items that have changed place', () => {
    const list = [2, 1, 3, 5]
    const previous = [1, 2, 3, 4, 5]
    const expected = [2, 1, 5]

    expect(getListDiff(list, previous)).to.deep.equal(expected)
  })
})
