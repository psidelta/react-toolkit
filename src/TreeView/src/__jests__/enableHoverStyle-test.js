import React from 'react';
import TreeView from '../TreeView';
import { mount } from 'enzyme';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

const NESTED_DATA_STRUCTURE = [
  {
    label: 'test 1'
  },
  {
    label: 'test 2',
    nodes: [
      {
        label: 'test 3'
      },
      {
        label: 'test 4'
      },
      {
        label: 'test 5'
      }
    ]
  }
];

describe('enableHoverStyle', () => {
  it('defaults to true', () => {
    const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);
    expect(wrapper.props().enableHoverStyle).toBe(true);
  });
  it(`should add ${CLASS_NAME}--enable-hover-style className`, () => {
    const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);
    expect(wrapper.find(`.${CLASS_NAME}--enable-hover-style`)).toHaveLength(1);
  });
});
