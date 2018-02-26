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

import filterByText from '../filterByText'

describe('filterByText', () => {
  it('returns a list that matches text', () => {
    const data = [
      { label: 'test' },
      { label: 'foo' },
      { label: 'bar' },
      { label: 'fooBar' },
    ]
    const getFilterProperty = item => item.label
    const test = filterByText({ data, getFilterProperty, text: 'foo' })

    expect(test)
      .to.deep.equal([
        { label: 'foo' },
        { label: 'fooBar' },
      ])
  })
  it('returns a list that matches text', () => {
    const data = [
      { label: 'test' },
      { label: 'foo' },
      { label: 'bar' },
      { label: 'xfooBar' },
    ]
    const getFilterProperty = item => item.label
    const test = filterByText({ data, getFilterProperty, text: 'foo', mode: 'startsWidth' })

    expect(test)
      .to.deep.equal([
        { label: 'foo' },
      ])
  })
  it('returns a list with items for which filterFunction returned true', () => {
    const data = [
      { label: 'test' },
      { label: 'foo' },
      { label: 'bar' },
      { label: 'fooBar' },
    ]
    const getFilterProperty = item => item.label
    const filterFunction = ({ item }) => item.label === 'foo'
    const test = filterByText({ data, getFilterProperty, text: 'foo', filterFunction })

    expect(test)
      .to.deep.equal([
        { label: 'foo' },
      ])
  })
})
