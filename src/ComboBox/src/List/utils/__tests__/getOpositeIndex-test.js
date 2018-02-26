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

import getOpositeIndex from '../getOpositeIndex'

describe('getOpositeIndex', () => {
  it('returns correct oposite index', () => {
    expect(getOpositeIndex(0, 20)).to.equal(19)
    expect(getOpositeIndex(1, 20)).to.equal(18)
    expect(getOpositeIndex(2, 20)).to.equal(17)
    expect(getOpositeIndex(18, 20)).to.equal(1)
    expect(getOpositeIndex(19, 20)).to.equal(0)
  })
})
