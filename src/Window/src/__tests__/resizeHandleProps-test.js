import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('resize hande props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('showHandlesOnOver', () => {
    it('renders handles all the time when false', () => {
      wrapper.setProps({ showHandlesOnOver: false });
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).to.have.length(8);
    });

    it('renders handles only when it hovered', () => {
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).to.have.length(0);
      wrapper.setProps({ showHandlesOnOver: true });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).to.have.length(8);
    });
  });

  describe('renderResizeHandle', () => {
    it('should be called for each handle', () => {
      const renderResizeHandle = sinon.spy();
      wrapper.setProps({ renderResizeHandle });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      // make sure
      expect(renderResizeHandle.args).to.have.length(8);
    });
    it('renders handles with mutated props', () => {
      const renderResizeHandle = domProps => {
        domProps.className = domProps.className + ' custom-handle-className';
      };
      wrapper.setProps({ renderResizeHandle });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(wrapper.find('.custom-handle-className')).to.have.length(8);
    });
    it('renders what it returns', () => {
      const renderResizeHandle = domProps => {
        return <div className="customReturn" />;
      };
      wrapper.setProps({ renderResizeHandle });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');

      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).to.have.length(0);
      expect(wrapper.find('.customReturn')).to.have.length(8);
    });
  });

  describe('resizeHandles', () => {
    it('renders only specified handles', () => {
      wrapper.setProps({ resizeHandles: ['t', 'r'] });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).to.have.length(2);
      expect(wrapper.find(`.${ROOT_CLASS}__handle--t`)).to.have.length(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle--r`)).to.have.length(1);
    });
  });

  describe('handleWidth', () => {
    it('sets handle size', () => {
      wrapper.setProps({ resizable: true, handleWidth: 22 });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(
        wrapper.find(`.${ROOT_CLASS}__handle--l`).first().props().style.width
      ).to.equal(22);
      expect(
        wrapper.find(`.${ROOT_CLASS}__handle--t`).first().props().style.height
      ).to.equal(22);
    });
  });

  describe('handleStyle', () => {
    it('adds style on handlers', () => {
      wrapper.setProps({
        resizable: true,
        handleStyle: {
          color: 'blue'
        }
      });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');

      expect(
        wrapper.find(`.${ROOT_CLASS}__handle`).first().props().style.color
      ).to.equal('blue');
    });
  });
});
