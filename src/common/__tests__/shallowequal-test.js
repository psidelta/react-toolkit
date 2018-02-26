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


import shallowequal from '../shallowequal'

describe('shallowequal', () => {
  it('returns true if it is the same object', () => {
    const a = {}
    expect(shallowequal(a, a)).to.be.true
    expect(shallowequal(null, null)).to.be.true
  })
  it('returns false if any of them a is null or not an object', () => {
    expect(shallowequal({}, null)).to.be.false
    expect(shallowequal(null, {})).to.be.false
  })
  it('returns true when the keys of the objects are the same', () => {
    const a = { a: 2, b: 3 }
    const b = { a: 2, b: 3 }
    expect(shallowequal(a, b)).to.be.true
  })
  it('returns false if object have different key length', () => {
    const a = { a: 2, b: 3 }
    const b = { a: 2, b: 3, c: 3 }
    expect(shallowequal(a, b)).to.be.false
  })
  it('returns false if object have one or more keys different', () => {
    const a = { a: 2, b: 3, c: 4 }
    const b = { a: 2, b: 3, c: 3 }
    const c = { a: 2, b: 1, c: 3 }

    expect(shallowequal(a, b)).to.be.false
    expect(shallowequal(a, c)).to.be.false
  })
})
