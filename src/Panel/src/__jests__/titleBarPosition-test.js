import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const titleBarClassName = `${rootClassName}__title-bar`;

describe('titleBarPosition', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  it('should default to top', () => {
    expect(wrapper.props().titleBarPosition).toEqual('top');
  });

  it('adds correct classname', () => {
    const topClassName = `.${rootClassName}--title-bar-position-top`;
    wrapper.setProps({ titleBarPosition: 'top' });
    expect(wrapper.find(topClassName)).toHaveLength(1);

    const leftClassName = `.${rootClassName}--title-bar-position-left`;
    wrapper.setProps({ titleBarPosition: 'left' });
    expect(wrapper.find(leftClassName)).toHaveLength(1);

    const rightClassName = `.${rootClassName}--title-bar-position-right`;
    wrapper.setProps({ titleBarPosition: 'right' });
    expect(wrapper.find(rightClassName)).toHaveLength(1);

    const bottomClassName = `.${rootClassName}--title-bar-position-bottom`;
    wrapper.setProps({ titleBarPosition: 'bottom' });
    expect(wrapper.find(bottomClassName)).toHaveLength(1);
  });

  describe('rotated', () => {
    it('titleBar width should be equal to container height', () => {
      const titleBarWrapper = wrapper.find(`.${titleBarClassName}`);
      wrapper.setProps({ titleBarPosition: 'left' });
<<<<<<< HEAD:src/Panel/src/__jests__/titleBarPosition-test.js
      wrapper.instance().onTitleBarResize({ width: 20, height: 20 });
      expect(titleBarWrapper.root().state().titleWidth).toEqual(20);
=======
      wrapper.instance().onResize({ width: 20, height: 20 });
      expect(
        wrapper
          .find(`.${titleBarClassName}`)
          .first()
          .props().style.width
      ).to.equal(20);
>>>>>>> dev:src/Panel/src/__tests__/titleBarPosition-test.js
    });

    describe('left', () => {
      it('content paddingLeft should be equal to titleBar height', () => {
        const titleBarPaddingLeft = wrapper.find(`.${rootClassName}`);
        wrapper.setProps({ titleBarPosition: 'left' });
        wrapper.instance().onTitleBarResize({ width: 20, height: 20 });
        expect(titleBarPaddingLeft.root().state().titleHeight).toEqual(20);
      });
    });
    describe('right', () => {
      it('content paddingRight should be equal to titleBar height', () => {
        const titleBarPaddingRight = wrapper.find(`.${rootClassName}`);
        wrapper.setProps({ titleBarPosition: 'right' });
        wrapper.instance().onTitleBarResize({ width: 20, height: 20 });
        expect(titleBarPaddingRight.root().state().titleHeight).toEqual(20);
      });
    });
  });
});
