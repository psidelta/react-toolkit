import React from 'react';
import TreeView from '../TreeView';
import { shallow } from 'enzyme';

const dataSource = [
  {
    label: 'test 1'
  },
  {
    label: 'test 2',
    nodes: [
      {
        label: 'test 3'
      }
    ]
  }
];

describe('collapseNode', () => {
  it('should return and have correct new collapsed state', () => {
    const wrapper = shallow(<TreeView dataSource={dataSource} />);
    const newCollapsedState = wrapper.instance().collapseNode('1');
    const expected = { '1': true };

    expect(newCollapsedState).toEqual(expected);
    expect(wrapper.state().collapsed).toEqual(expected);
  });

  it('calls onCollapsedChange', () => {
    const onCollapsedChange = jest.fn();
    const wrapper = shallow(
      <TreeView dataSource={dataSource} onCollapsedChange={onCollapsedChange} />
    );
    wrapper.instance().collapseNode('1');
    expect(onCollapsedChange).toHaveBeenCalled();
  });
});

describe('expandNode', () => {
  it('should return and have correct new collapsed state', () => {
    const wrapper = shallow(
      <TreeView dataSource={dataSource} defaultCollapsed={{ '1': true }} />
    );

    expect(wrapper.state().collapsed).toEqual({ '1': true });
    const newCollapsedState = wrapper.instance().expandNode('1');
    const expected = {};
    expect(newCollapsedState).toEqual(expected);
    expect(wrapper.state().collapsed).toEqual(expected);
  });

  it('calls onCollapsedChange', () => {
    const onCollapsedChange = jest.fn();
    const wrapper = shallow(
      <TreeView dataSource={dataSource} onCollapsedChange={onCollapsedChange} />
    );
    wrapper.instance().expandNode('1');
    expect(onCollapsedChange).toHaveBeenCalled();
  });
});

describe('collapseAll', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TreeView dataSource={[]} />);
  });

  it('should return correct new collapsed state', () => {
    wrapper.setProps({
      dataSource
    });

    const newCollapsedState = wrapper.instance().collapseAll();
    const expected = {
      '0': true,
      '1': true,
      '1/0': true
    };

    expect(newCollapsedState).toEqual(expected);
  });

  it('should update state with all nodes collapsed', () => {
    wrapper.setProps({
      dataSource
    });

    const newCollapsedState = wrapper.instance().collapseAll();
    const expected = {
      '0': true,
      '1': true,
      '1/0': true
    };

    expect(wrapper.state().collapsed).toEqual(expected);
  });

  it('calls onCollapsedChange', () => {
    const onCollapsedChange = jest.fn();
    const wrapper = shallow(
      <TreeView dataSource={dataSource} onCollapsedChange={onCollapsedChange} />
    );
    wrapper.instance().collapseAll('1');
    expect(onCollapsedChange).toHaveBeenCalled();
  });
});

describe('expandAll', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <TreeView dataSource={dataSource} collapsed={{ '0': true, '1': true }} />
    );
  });

  it('should return correct new collapsed state', () => {
    const newCollapsedState = wrapper.instance().expandAll();
    const expected = {};

    expect(newCollapsedState).toEqual(expected);
  });

  it('should update state with all nodes collapsed', () => {
    wrapper.setProps({
      dataSource
    });

    const newCollapsedState = wrapper.instance().expandAll();
    const expected = {};

    expect(wrapper.state().collapsed).toEqual(expected);
  });

  it('expands only nodes that are not async', () => {
    wrapper.setProps({
      isNodeAsync: ({ index }) => {
        return index === 0;
      },
      loadNode: () => {},
      collapsed: null
    });

    const test = wrapper.instance().collapseAll();
    wrapper.instance().expandAll();

    expect(wrapper.state().collapsed).toEqual({
      '1/0': true,
      '0': true
    });
  });

  it('calls onCollapsedChange', () => {
    const onCollapsedChange = jest.fn();
    const wrapper = shallow(
      <TreeView dataSource={dataSource} onCollapsedChange={onCollapsedChange} />
    );
    wrapper.instance().expandAll();
    expect(onCollapsedChange).toHaveBeenCalled();
  });
});

describe('setCollapsed', () => {
  it('updates collapsed state', () => {
    const wrapper = shallow(<TreeView dataSource={dataSource} />);
    const test = { 0: true };
    expect(wrapper.state().collapsed).not.toEqual(test);
    wrapper.instance().setCollapsed(test);
    expect(wrapper.state().collapsed).toEqual(test);
  });
  it('should call onCollapsedChange', () => {
    const onCollapsedChange = jest.fn();
    const wrapper = shallow(
      <TreeView dataSource={dataSource} onCollapsedChange={onCollapsedChange} />
    );
    wrapper.instance().setCollapsed({});
    expect(onCollapsedChange).toHaveBeenCalled();
  });
});
