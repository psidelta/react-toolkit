import React from 'react';
import Panel, { CLASS_NAME } from '../Panel';
import { mount, shallow } from 'enzyme';

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
      ).toEqual(title);
    });

    it('should render jsx', () => {
      const title = <div id="customId" />;
      wrapper.setProps({ title });
      expect(wrapper.find('#customId')).toHaveLength(1);
    });
  });

  describe('function', () => {
    it('should be called and renders what it returns', () => {
      const title = jest.fn(() => <div id="customFunctionId" />);
      const wrapper = mount(<Panel title={title} />);

      expect(title).toHaveBeenCalledTimes(1);
      expect(wrapper.find('#customFunctionId')).toHaveLength(1);
    });
    it('should render default title with mutated domProps', () => {
      const title = domProps => {
        domProps.id = 'customMutatedId';
      };
      const wrapper = shallow(<Panel title={title} />);
      expect(wrapper.find('#customMutatedId')).toHaveLength(1);
    });
  });
});
