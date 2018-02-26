import bringToFront from '../bringToFront'

describe('bringToFront', () => {
  it('should return a new list with item in front (last)', () => {
    const list = [1, 2, 3]
    const expected = [1, 3, 2]

    expect(bringToFront(2, list))
      .to.deep.equal(expected)
  })
})
