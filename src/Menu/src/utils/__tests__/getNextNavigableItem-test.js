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

import getNextNavigableItem from '../getNextNavigableItem'

describe('getNextNavigableItem', () => {
  it('should get first non disabled item in 1 direction, from top to bottom', () => {
    const items = [
      { disabled: true },
      { disabled: true },
      { disabled: true },
      { disabled: false }, // 3
      { disabled: true },
      '-',
      { disabled: false }, // 6
      { disabled: false },
      { disabled: true },
    ]
    expect(getNextNavigableItem(items, 3, 1)).equal(6)
  })
  it('should get first non disabled item in -1 direction, from bottom to top', () => {
    const items = [
      { disabled: true },
      { disabled: true },
      { disabled: true },
      { disabled: false }, // 3
      '-',
      { disabled: true },
      { disabled: false }, // 6
      { disabled: false },
      { disabled: true },
    ]
    expect(getNextNavigableItem(items, 6, -1)).equal(3)
  })
})
