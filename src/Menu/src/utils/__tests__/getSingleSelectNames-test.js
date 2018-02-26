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

import getSingleSelectNames from '../getSingleSelectNames'

describe('getSingleSelectNames', () => {
  it('returns the name that repeat at least once', () => {
    const items = [
      { name: 'name1' },
      { name: 'name1' },
      { name: 'name1' },

      { name: 'name2' },

      { name: 'name3' },
      { name: 'name3' },

      { name: 'name5' },
    ]

    const expected = {
      name1: true,
      name2: false,
      name3: true,
      name5: false,
    }

    expect(getSingleSelectNames({
      items,
      nameProperty: 'name'
    }))
    .to.deep.equal(expected)
  })
})
