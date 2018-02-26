/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import getGroupedItems from '../getGroupedItems'

describe('getGroupedItems', () => {
  it('returns the full list when all items fit', () => {
    const boxes = [30, 20, 20, 30]
    const maxSize = 100
    const test = getGroupedItems(({ boxes, maxSize }))
    expect(test).to.be.false
  })
  it('separates corecty the indexes in visible and overflowItems', () => {
    const boxes = [20, 30, 30, 30]
    const maxSize = 100
    const test = getGroupedItems(({ boxes, maxSize }))

    expect(test.visibleIndexes).to.deep.equal([0, 1, 2])
    expect(test.overflowIndexes).to.deep.equal([3])
  })
  it('overflow control can make one item more to overflow', () => {
    const boxes = [30, 30, 30, 30]
    const maxSize = 100
    const overflowControlSize = 20
    const test = getGroupedItems(({ boxes, maxSize, overflowControlSize }))

    expect(test.visibleIndexes).to.deep.equal([0, 1])
    expect(test.overflowIndexes).to.deep.equal([2, 3])
  })
})
