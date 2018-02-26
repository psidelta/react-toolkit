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

import getClassName from '../getClassName'

describe('list getClassName', () => {
  it('adds rootClassName', () => {
    const props = { rootClassName: 'root' }
    const test = getClassName({ props })
    expect(test).to.equal('root root--empty')
  })
  it('adds className', () => {
    const props = { className: 'list', rootClassName: 'root' }
    const test = getClassName({ props })
    expect(test).to.equal('root list root--empty')
  })
  it('adds list position', () => {
    const props = { listPosition: 'top', rootClassName: 'root' }
    const test = getClassName({ props })
    expect(test).to.equal('root root--top root--empty')
  })
  it('adds loading', () => {
    const props = { loading: true, rootClassName: 'root' }
    const test = getClassName({ props })
    expect(test).to.equal('root root--loading root--empty')
  })
  it('empty', () => {
    const props = { rootClassName: 'root' }
    const test = getClassName({ props })
    expect(test).to.equal('root root--empty')
    const props2 = { rootClassName: 'root', data: { length: 30 } }
    const test2 = getClassName({ props: props2 })
    expect(test2).to.equal('root')
  })
})
