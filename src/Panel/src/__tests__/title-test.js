import React from 'react';
import Panel, { CLASS_NAME } from '../Panel';
import { mount } from 'enzyme';

describe('title', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  describe('node', () => {
    it('should render as title text when string', () => {
      const title = 'hello world';
      wrapper.setProps({ title });
      expect(
        wrapper
          .find(`.${CLASS_NAME}__title`)
          .first()
          .text()
      ).to.equal(title);
    });

    it('should render jsx', () => {
      const title = <div id="customId" />;
      wrapper.setProps({ title });
      expect(wrapper.find('#customId')).to.have.length(1);
    });
  });

  describe('function', () => {
    it('should be called and renders what it returns', () => {
      const title = sinon.stub();
      title.returns(<div id="customFunctionId" />);
      wrapper.setProps({ title });

      expect(title.called).to.be.true;
      expect(wrapper.find('#customFunctionId')).to.have.length(1);
    });
    it('should render default title with mutated domProps', () => {
      const title = domProps => {
        domProps.id = 'customMutatedId';
      };
      wrapper.setProps({ title });
      expect(wrapper.find('#customMutatedId')).to.have.length(1);
    });
  });
});
