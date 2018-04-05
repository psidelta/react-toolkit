/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TreeView from '../TreeView';
import Node from '../Node';
import { mount } from 'enzyme';

describe('nestingIndentation', () => {
  it('should add paddingLeft on contentStyle', () => {
    const wrapper = mount(
      <TreeView
        rtl={false}
        dataSource={[
          { label: 'test 1' },
          { label: 'test 2' },
          { label: 'test 3' }
        ]}
      />
    );

    expect(
      wrapper
        .find(Node)
        .first()
        .props().contentStyle.paddingLeft
    ).toEqual(20);
  });

  it('should add padddingRight to contentStyle if rtl', () => {
    const wrapper = mount(
      <TreeView
        rtl
        dataSource={[
          { label: 'test 1' },
          { label: 'test 2' },
          { label: 'test 3' }
        ]}
      />
    );

    expect(
      wrapper
        .find(Node)
        .first()
        .props().contentStyle.paddingRight
    ).toEqual(20);
  });
});
