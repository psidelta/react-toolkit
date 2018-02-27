import React from 'react';

import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;
import Node from '../../Node';
import { shallow } from 'enzyme';

describe('classNames', () => {
  describe('component className', () => {
    it('should add className prop on root', () => {
      const className = 'test className';
      const wrapper = shallow(<Node domProps={{ className }} />);
      expect(wrapper.hasClass(className)).to.be.true;
    });
  });

  describe('label className', () => {
    it('should add labelClassName prop on label', () => {
      const className = 'test className';
      const wrapper = shallow(<Node labelClassName={className} />);
      expect(wrapper.find(`.${CLASS_NAME}__node__label`).hasClass(className)).to
        .be.true;
    });
  });

  describe('content className', () => {
    it('should add contentClassName prop on label', () => {
      const className = 'test className';
      const wrapper = shallow(
        <Node hasChildren contentClassName={className} />
      );
      expect(wrapper.find(`.${CLASS_NAME}__node__content`).hasClass(className))
        .to.be.true;
    });
  });
});
