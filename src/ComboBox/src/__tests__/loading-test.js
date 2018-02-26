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
import { shallow, mount } from 'enzyme'
import Combo from '../ComboBox'

describe('loading', () => {
  describe('defaultLoading', () => {
    it('should be used as initial state', () => {
      const wrapper = shallow(<Combo defaultLoading />)
      expect(wrapper.instance().getLoading()).to.be.true
    })
  })

  describe('constrolled loading', () => {
    it('should be used insted of state', () => {
      const wrapper = shallow(<Combo defaultLoading loading={false} />)
      expect(wrapper.instance().getLoading()).to.to.be.false
    })
    it('doesn\'t change when a change is triggered', () => {
      const wrapper = shallow(<Combo defaultLoading loading={false} />)
      wrapper.instance().setLoading(true)
      expect(wrapper.instance().getLoading()).to.to.be.false
      // state should not be changed
      expect(wrapper.state().loading).to.be.true
    })
  })
  describe('onLoadingChange', () => {
    it('should be called when setLoaindg is called', () => {
      const onLoadingChange = sinon.spy()
      const wrapper = shallow(<Combo onLoadingChange={onLoadingChange} />)
      wrapper.instance().setLoading(true)
      expect(onLoadingChange.called).to.be.true
      expect(onLoadingChange.args[0][0]).to.be.true
    })
  })
})
