/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow } from 'enzyme';
import Node from '../../Node';
import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('loading', () => {
  it('should add loading className', () => {
    const wrapper = shallow(<Node loading />);
    expect(wrapper.find(`.${CLASS_NAME}__node--loading`)).toHaveLength(1);
  });

  describe('loadTool', () => {
    it('should render a loader', () => {
      const wrapper = shallow(<Node loading />);
      expect(wrapper.find(`.${CLASS_NAME}__node__loader`)).toHaveLength(1);
    });

    it('should render as jsx', () => {
      const loadTool = <div id="customLoadTool" />;
      const wrapper = shallow(<Node loading loadTool={loadTool} />);

      expect(wrapper.find('#customLoadTool')).toHaveLength(1);
    });

    it('should render what it returns if it is a function', () => {
      const loadTool = () => <div id="customLoadTool" />;
      const wrapper = shallow(<Node loading loadTool={loadTool} />);

      expect(wrapper.find('#customLoadTool')).toHaveLength(1);
    });
  });
});
