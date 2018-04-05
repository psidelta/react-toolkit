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

describe('active', () => {
  it('should have the correct className', () => {
    const wrapper = shallow(<Node />);
    expect(wrapper.find(`.${CLASS_NAME}__node--active`)).toHaveLength(0);
    wrapper.setProps({ active: true });
    expect(wrapper.find(`.${CLASS_NAME}__node--active`)).toHaveLength(1);
  });

  it('should call onActiveNodeChange when label is clicked', () => {
    const onActiveNodeChange = jest.fn();
    const wrapper = shallow(
      <Node
        enableKeyboardNavigation={true}
        path="0"
        onActiveNodeChange={onActiveNodeChange}
      />
    );

    wrapper.find(`.${CLASS_NAME}__node__label`).simulate('click', {
      stopPropagation: () => {}
    });

    expect(onActiveNodeChange).toHaveBeenCalledTimes(1);
    expect(onActiveNodeChange.mock.calls[0][0].path).toEqual('0');
  });
});
