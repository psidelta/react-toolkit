/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TreeView from '../TreeView';
import { mount } from 'enzyme';

describe('renderNode', () => {
  const dataSource = [{ label: 'hello world' }];
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<TreeView dataSource={dataSource} />);
  });

  it('is called', () => {
    const renderNode = jest.fn();
    wrapper.setProps({ renderNode });
    expect(renderNode).toHaveBeenCalled();
  });

  it('renders what renderNode returns', () => {
    const renderNode = () => <div key={1} id="customRow" />;
    wrapper.setProps({ renderNode });
    expect(wrapper.find('#customRow')).toHaveLength(1);
  });

  it('mutating props changes props used for rendering row', () => {
    const renderNode = (domProps, nodeProps) => {
      domProps.id = 'mutatedId';
      domProps.className = 'customRowClass';
    };
    wrapper.setProps({ renderNode });

    expect(wrapper.find('#mutatedId')).toHaveLength(1);
  });
});
