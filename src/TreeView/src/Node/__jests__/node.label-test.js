/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import Node from '../../Node';
import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('node.label', () => {
  it('should render as a string', () => {
    const wrapper = mount(<Node node={{ label: 'hello world' }} />);
    window.wrapper = wrapper;
    expect(
      wrapper.find(`.zippy-react-toolkit-tree-view__node__label__text`).text()
    ).toEqual('hello world');
  });

  it('should render as jsx', () => {
    const wrapper = mount(
      <Node node={{ label: <div id="labelJSX">hello world</div> }} />
    );
    expect(wrapper.find('#labelJSX')).toHaveLength(1);
  });

  it('should render as a function', () => {
    const label = jest.fn(() => <div id="functionLabel">hello world</div>);
    const wrapper = mount(<Node id="customId" node={{ label }} />);

    expect(label).toHaveBeenCalled();
    expect(wrapper.find('#functionLabel')).toHaveLength(1);
    expect(label.mock.calls[0][0].id).toEqual('customId');
  });
});
