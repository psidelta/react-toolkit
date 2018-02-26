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

import hightlightText from '../hightlightText'

describe('hightlightText', () => {
  it('contains - returns a structure marking the matched text', () => {
    const test = 'hello world'
    const expected = ['hel', { match: 'lo w' }, 'orld']
    expect(hightlightText({
      queryText: 'lo w',
      text: test,
      mode: 'contains'
    }))
    .to.deep.equal(expected)
  })
  it('starts width - returns a structure marking the matched text', () => {
    const text = 'hello world'
    const expected = [{ match: 'hell' }, 'o world']

    const test = hightlightText({
      text,
      queryText: 'hell',
      mode: 'startsWidth'
    })
    expect(test)
    .to.deep.equal(expected)
  })
})
