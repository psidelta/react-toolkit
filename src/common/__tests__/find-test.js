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

import find from '../find'

describe('find', () => {
  it('returns null if the collection is null', () => {
    expect(find(null, () => {})).to.equal.null
  })
  it('returns the first item that matches test', () => {
    const test = [
      {},
      null,
      false,
      { a: 'test' },
    ]
    expect(find(test, item => item && item.a === 'test'))
      .to.deep.equal({ a: 'test' })
  })
})
