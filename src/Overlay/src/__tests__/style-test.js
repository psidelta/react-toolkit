import React from 'react';
import { mount } from 'enzyme';
import Overlay from '../Overlay';

describe('style and classnames', () => {
  describe('border', () => {
    it('should add border on outer wrapper', () => {
      const wrapper = mount(<Overlay border="1px solid red" />);
      expect(
        wrapper
          .find('.react-overlay')
          .at(0)
          .props().style.border
      ).to.equal('1px solid red');
    });
  });
  describe('height', () => {
    it('should be added on inline style', () => {
      const wrapper = mount(<Overlay height={100} />);
      expect(
        wrapper
          .find('.react-overlay')
          .at(0)
          .props().style.height
      ).to.equal(100);
    });
  });
  describe('width', () => {
    it('should be added on inline style', () => {
      const wrapper = mount(<Overlay width={100} />);
      expect(
        wrapper
          .find('.react-overlay')
          .at(0)
          .props().style.width
      ).to.equal(100);
    });
  });
});
