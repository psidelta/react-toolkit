import React from 'react'
import Window from '../Window'
import { mount } from 'enzyme'

describe('methods', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<Window />)
  })

  describe('maximize', () => {
    it('updates maximized state', () => {
      wrapper.setProps({ maximizable: true })
      expect(wrapper.instance().getMaximized()).to.be.false
      wrapper.instance().maximize()
      expect(wrapper.instance().getMaximized()).to.be.true
    })
    it('calls onMaximize change', () => {
      const onMaximizeChange = sinon.spy()
      wrapper.setProps({ maximizable: true, onMaximizeChange })
      expect(onMaximizeChange.called).to.be.false
      wrapper.instance().maximize()
      expect(onMaximizeChange.called).to.be.true
    })
  })

  describe('restore', () => {
    it('updates maximized state', () => {
      wrapper.setState({ maximized: true })
      wrapper.setProps({ maximizable: true })
      expect(wrapper.instance().getMaximized()).to.be.true
      wrapper.instance().restore()
      expect(wrapper.instance().getMaximized()).to.be.false
    })
    it('calls onMaximize change', () => {
      const onMaximizeChange = sinon.spy()
      wrapper.setProps({ maximizable: true, onMaximizeChange })
      expect(onMaximizeChange.called).to.be.false
      wrapper.instance().restore()
      expect(onMaximizeChange.called).to.be.true
    })
  })

  describe('center', () => {
    it('should trigger onCenteredChange', () => {
      const onCenteredChange = sinon.spy()
      wrapper.setProps({ onCenteredChange })
      wrapper.instance().center()
      expect(onCenteredChange.called).to.be.true
    })
    it('should change state', () => {
      wrapper.instance().center()
      expect(wrapper.instance().getCentered()).to.be.true
    })
  })
})
