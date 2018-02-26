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
import { mount } from 'enzyme'
import Menu from '../Menu'
import Expander from '../Expander'

const ROOT_CLASS = Menu.defaultProps.rootClassName

describe('rtl', () => {
  const items = [{ label: 'test', items: [{ label: 'submenu item' }] }, { label: 'test2' }]
  const wrapper = mount(<Menu rtl items={items} />)

  it('rtl prop is passed to expender', () => {
    expect(wrapper.find(Expander).prop('rtl')).to.be.true
  })

  it(`should have ${ROOT_CLASS}--rtl className`, () => {
    expect(wrapper.find(`.${ROOT_CLASS}`).at(0).hasClass(`${ROOT_CLASS}--rtl`)).to.be.true
  })
})
