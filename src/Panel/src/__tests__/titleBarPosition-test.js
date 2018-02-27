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

  it('should default to left', () => {
    expect(wrapper.props().titleBarPosition).to.equal('top');
  });

  it('adds correct classname', () => {
    const topClassName = `.${rootClassName}--title-bar-position-top`;
    wrapper.setProps({ titleBarPosition: 'top' });
    expect(wrapper.find(topClassName)).to.have.length(1);

    const leftClassName = `.${rootClassName}--title-bar-position-left`;
    wrapper.setProps({ titleBarPosition: 'left' });
    expect(wrapper.find(leftClassName)).to.have.length(1);

    const rightClassName = `.${rootClassName}--title-bar-position-right`;
    wrapper.setProps({ titleBarPosition: 'right' });
    expect(wrapper.find(rightClassName)).to.have.length(1);

    const bottomClassName = `.${rootClassName}--title-bar-position-bottom`;
    wrapper.setProps({ titleBarPosition: 'bottom' });
    expect(wrapper.find(bottomClassName)).to.have.length(1);
  });

  describe('rotated', () => {
    it('titleBar width should be equal to container height', () => {
      wrapper.setProps({ titleBarPosition: 'left' });
      wrapper.instance().onResize({ width: 20, height: 20 });
      expect(
        wrapper
          .find(`.${titleBarClassName}`)
          .first()
          .props().style.width
      ).to.equal(20);
    });

    describe('left', () => {
      it('content paddingLeft should be equal to titleBar height', () => {
        wrapper.setProps({ titleBarPosition: 'left' });
        wrapper.instance().onTitleBarResize({ width: 20, height: 20 });
        expect(
          wrapper.find(`.${rootClassName}`).props().style.paddingLeft
        ).to.equal(20);
      });
    });
    describe('right', () => {
      it('content paddingRight should be equal to titleBar height', () => {
        wrapper.setProps({ titleBarPosition: 'right' });
        wrapper.instance().onTitleBarResize({ width: 20, height: 20 });
        expect(
          wrapper.find(`.${rootClassName}`).props().style.paddingRight
        ).to.equal(20);
      });
    });
  });
});
