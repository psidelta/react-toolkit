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
    const onActiveNodeChange = sinon.spy();
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

    expect(onActiveNodeChange.called).toBe(true);
    expect(onActiveNodeChange.args[0][0].path).toEqual('0');
  });
});
