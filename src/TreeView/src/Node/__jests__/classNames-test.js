/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow } from 'enzyme';

import TreeView from '../../TreeView';
import Node from '../../Node';

const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('classNames', () => {
  describe('component className', () => {
    it('should add className prop on root', () => {
      const className = 'test className';
      const wrapper = shallow(<Node domProps={{ className }} />);
      expect(wrapper.hasClass(className)).toBe(true);
    });
  });

  describe('label className', () => {
    it('should add labelClassName prop on label', () => {
      const className = 'test className';
      const wrapper = shallow(<Node labelClassName={className} />);
      expect(
        wrapper.find(`.${CLASS_NAME}__node__label`).hasClass(className)
      ).toBe(true);
    });
  });

  describe('content className', () => {
    it('should add contentClassName prop on label', () => {
      const className = 'test className';
      const wrapper = shallow(
        <Node hasChildren contentClassName={className} />
      );
      expect(
        wrapper.find(`.${CLASS_NAME}__node__content`).hasClass(className)
      ).toBe(true);
    });
  });
});
