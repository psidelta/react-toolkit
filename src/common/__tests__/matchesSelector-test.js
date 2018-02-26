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

import matchesSelector from '../matchesSelector'

describe('matchesSelector', () => {
  it('returns true when it node matches a selector', () => {
    const fixture = `<div id="fixture1">
        <div id="target1" class="tooltip">
          target 1
        </div>
        <div id="target2" class="tooltip"> target 2 </div>
        <div id="target3"> target 3 </div>
        <div id="tooltip">
          Hello world from tooltip
        </div>
      </div>
    `
    document.body.insertAdjacentHTML(
      'afterbegin',
      fixture)

    const target = document.getElementById('target2')
    expect(matchesSelector(target, '.tooltip'))
      .to.be.true
    expect(matchesSelector(target, '.tooltip2'))
      .to.be.false

    document.body.removeChild(document.getElementById('fixture1'))
  })
})
