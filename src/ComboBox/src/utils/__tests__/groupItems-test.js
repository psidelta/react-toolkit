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

import groupItems from '../groupItems'

describe('groupItems', () => {
  it('separates items into two groups', () => {
    const items = [1, 2, 3, 4, 5]
    const maxTagsLength = 3
    expect(groupItems({ items, maxTagsLength }))
      .to.deep.equal({
        visibleItems: [1, 2, 3],
        remainingItems: [4, 5]
      })
  })
  it('separates in one grop when maxTagsLength === 0', () => {
    const items = [1, 2, 3, 4, 5]
    const maxTagsLength = 0
    expect(groupItems({ items, maxTagsLength }))
      .to.deep.equal({
        visibleItems: [],
        remainingItems: [1, 2, 3, 4, 5]
      })
  })
})
