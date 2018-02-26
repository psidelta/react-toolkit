import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('size', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('resizable bool', () => {
    it('adds --resizable classname', () => {
      wrapper.setProps({ resizable: true });
      expect(wrapper.find(`.${ROOT_CLASS}--resizable`)).to.have.length(1);
    });
    it("false doen't render any resize handlers", () => {
      wrapper.setProps({ resizable: false });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).to.have.length(0);
    });
  });

  describe('resizable object', () => {
    it('renders only left right handles when restricted to width', () => {
      wrapper.setProps({
        resizable: {
          width: true
        }
      });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');

      expect(wrapper.find(`.${ROOT_CLASS}__handle--l`)).to.have.length(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle--r`)).to.have.length(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).to.have.length(2);
    });
    it('renders only top bottom handles when restricted to height', () => {
      wrapper.setProps({
        resizable: {
          height: true
        }
      });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');

      expect(wrapper.find(`.${ROOT_CLASS}__handle--t`)).to.have.length(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle--b`)).to.have.length(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).to.have.length(2);
    });
    it('takes into account resizeHandles', () => {
      wrapper.setProps({
        resizable: {
          width: true
        },
        resizeHandles: ['l']
      });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');

      expect(wrapper.find(`.${ROOT_CLASS}__handle--l`)).to.have.length(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).to.have.length(1);
    });
  });

  describe('size constroled and uncontroled', () => {
    it('adds width and height on style', () => {
      wrapper.setProps({
        size: {
          width: 120,
          height: 220
        }
      });
      expect(
        wrapper.find(`.${ROOT_CLASS}`).first().props().style.width
      ).to.equal(120);
      expect(
        wrapper.find(`.${ROOT_CLASS}`).first().props().style.height
      ).to.equal(220);
    });
    it('size overwrites uncontrolled size', () => {
      wrapper.setProps({ size: { width: 20 } });
      wrapper.setState({ size: { width: 10 } });
      expect(wrapper.instance().getSize().width).to.equal(20);
    });
    it('defaults to defaultSize when size is not set', () => {
      const wrapper = mount(<Window defaultSize={{ width: '30%' }} />);
      expect(wrapper.instance().getSize().width).to.equal('30%');
    });
  });
});
