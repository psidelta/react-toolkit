/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TreeView from '../../TreeView';
import Node from '../../Node';
import { shallow } from 'enzyme';

const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('item.className', () => {
  it('should add className prop on root', () => {
    const className = 'test className';
    const wrapper = shallow(<Node node={{ className }} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
