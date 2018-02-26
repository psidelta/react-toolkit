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
import Node from '../../Node';
import TreeView from '../../TreeView';
import { mount } from 'enzyme';
import Check from '../../../../CheckBox';

const CLASS_NAME = TreeView.defaultProps.rootClassname;

describe('checked', () => {
  describe('enableChecked', () => {
    it('should render not render checkboxes if false', () => {
      const wrapper = mount(<Node />);
      expect(wrapper.find(Check)).to.have.length(0);
    });

    it('should render checkboxes if true', () => {
      const wrapper = mount(<Node enableChecked />);
      expect(wrapper.find(Check)).to.have.length(1);
    });
  });

  describe('onCheckedChange', () => {
    it('is called when checked changes', () => {
      const onCheckedChange = sinon.spy();
      const wrapper = mount(
        <Node enableChecked debug onCheckedChange={onCheckedChange} />
      );

      wrapper.find(Check).simulate('change', {
        target: {
          checked: true
        }
      });

      expect(onCheckedChange.called).to.be.true;
    });
  });
});
