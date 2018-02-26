/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
