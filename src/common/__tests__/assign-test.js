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

import assign from '../assign'

describe('assign', () => {
  it('extends first object by mutating it and returning a reference to it', () => {
    const browserAssign = Object.assgin
    Object.assign = null

    const a = { a: 2, b: 3 }
    const b = { a: 3, c: 4 }

    const test = assign(a, b)
    const expected = { a: 3, b: 3, c: 4 }
    expect(a).to.equal(test)
    expect(test).to.deep.equal(expected)

    Object.assign = browserAssign
  })
  it('throws an error when first argument is null or undefined', () => {
    expect(() => assign(null, {})).to.throw(TypeError)
    expect(() => assign(undefined, {})).to.throw(TypeError)
  })
  it('extends multiple objects, of which can be null/undefined', () => {
    const target = { a: 2 }
    const input = [
      target,
      null,
      undefined,
      { b: 3, c: null }
    ]
    const expected = { a: 2, b:3, c: null }
    const test = assign(...input)
    expect(test).to.deep.equal(expected)
    expect(target).to.equal(target)
  })
})
