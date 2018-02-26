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
import renderIntoDOM from './renderIntoDOM'

import '../../style/index.scss'

const ROOT_CLASS = Menu.defaultProps.rootClassName

describe('visible', () => {
  it(`should have ${ROOT_CLASS}--hidden className`, () => {
    const {
      wrapper,
      wrapperNode,
      unmount
    } = renderIntoDOM(<Menu visible={false} items={[{ label: 'test' }]} />)
    expect(wrapperNode.classList.contains(`${ROOT_CLASS}--hidden`)).to.be.true
    unmount()
  })

  it('visible=false should have computed style of visibility = hidden', () => {
    const {
      wrapper,
      wrapperNode,
      unmount
    } = renderIntoDOM(<Menu visible={false} items={[{ label: 'test' }]} />)
    expect(getComputedStyle(wrapperNode).visibility).to.be.equal('hidden')
    unmount()
  })

  it('visible=false should have computed style of visibility = true', () => {
    const {
      wrapper,
      wrapperNode,
      unmount
    } = renderIntoDOM(<Menu visible={true} items={[{ label: 'test' }]} />)
    expect(getComputedStyle(wrapperNode).visibility).to.be.equal('visible')
    unmount()
  })
})
