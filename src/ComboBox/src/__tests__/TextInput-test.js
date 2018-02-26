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
import TextInput from '../TextInput'

describe('TextInput', () => {
  describe('placeholder', () => {
    it('should be rendered when there is no value', () => {
      const wrapper = mount(<TextInput
        placeholder={<div id="placeholder"> Hello world </div>}
      />)

      expect(wrapper.find('#placeholder')).to.have.length(1)
      wrapper.setProps({ value: 30 })
      expect(wrapper.find('#placeholder')).to.have.length(0)
    })
  })

  describe('throttle', () => {
    it('calls onChange after throttle ms', () => {
      const clock = sinon.useFakeTimers()
      const onChange = sinon.spy()
      const wrapper = mount(<TextInput
        throttle={300}
        value={'hello world'}
        onChange={onChange}
      />)
      expect(onChange.called).to.be.false
      wrapper.instance().handleChange({
        target: {
          value: 'hello'
        }
      })
      expect(onChange.called).to.be.false
      clock.tick(300)
      expect(onChange.called).to.be.true
      clock.restore()
    })
  })
})
