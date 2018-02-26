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

import React from 'react'
import Menu from '../Menu'
import Expander from '../Expander'

import { mount, shallow } from 'enzyme'

describe('expander', () => {
  it('should render expander if an item has items', () => {
    const items = [{
      label: 'test',
      items: [{ label: 'submenuItem' }]
    }]
    const wrapper = mount(<Menu items={items} />)
    expect(wrapper.find(Expander)).to.have.length(1)
  })

  it('custom render from expander', () => {
    const items = [{
      label: 'test',
      items: [{ label: 'submenuItem' }]
    }]
    const wrapper = mount(<Menu
      items={items}
      expander={() => <div id="customExpander">Hello world</div>}
    />)

    expect(wrapper.find(Expander)).to.have.length(0)
    expect(wrapper.find('#customExpander')).to.have.length(1)
  })
})
