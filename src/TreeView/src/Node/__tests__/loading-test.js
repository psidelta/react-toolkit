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
import { shallow } from 'enzyme';
import Node from '../../Node';
import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('loading', () => {
  it('should add loading className', () => {
    const wrapper = shallow(<Node loading />);
    expect(wrapper.find(`.${CLASS_NAME}__node--loading`)).to.have.length(1);
  });

  describe('loadTool', () => {
    it('should render a loader', () => {
      const wrapper = shallow(<Node loading />);
      expect(wrapper.find(`.${CLASS_NAME}__node__loader`)).to.have.length(1);
    });

    it('should render as jsx', () => {
      const loadTool = <div id="customLoadTool" />;
      const wrapper = shallow(<Node loading loadTool={loadTool} />);

      expect(wrapper.find('#customLoadTool')).to.have.length(1);
    });

    it('should render what it returns if it is a function', () => {
      const loadTool = () => <div id="customLoadTool" />;
      const wrapper = shallow(<Node loading loadTool={loadTool} />);

      expect(wrapper.find('#customLoadTool')).to.have.length(1);
    });
  });
});
