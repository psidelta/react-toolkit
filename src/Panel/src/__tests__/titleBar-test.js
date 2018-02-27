import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const bodyClassName = `.${rootClassName}__title-bar`;

describe('titleBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  it('should not render titleBar if false', () => {
    expect(wrapper.find(bodyClassName)).to.have.length(1);
    wrapper.setProps({ titleBar: false });
    expect(wrapper.find(bodyClassName)).to.have.length(0);
  });

  xdescribe('jsx', () => {
    it('should render jsx insted of titlebar', () => {
      wrapper.setProps({ titleBar: <div id="customTitleBarId" /> });
      expect(wrapper.find('#customTitleBarId')).to.have.length(1);
      expect(wrapper.find(bodyClassName)).to.have.length(0);
    });
  });

  describe('function', () => {
    it('should be called with domProps and props', () => {
      const titleBar = sinon.spy();
      wrapper.setProps({ data: 'customData' });
      wrapper.setProps({ titleBar });

      expect(titleBar.called).to.be.true;
      expect(titleBar.args[0][0].className).to.equal(
        `${rootClassName}__title-bar`
      );
      expect(titleBar.args[0][1].data).to.equal('customData');
    });

    it('should render titlebar with mutated domProps', () => {
      const titleBar = domProps => {
        domProps.id = 'titleBarId';
      };
      wrapper.setProps({ titleBar });
      expect(wrapper.find('#titleBarId')).to.have.length(1);
    });
  });
});
