import React from 'react';
import TreeView from '../TreeView';
import { shallow } from 'enzyme';

const dataSource = [
  { label: 'test 1' },
  {
    label: 'test 2',
    nodes: [{ label: 'test 3' }]
  }
];

describe('setSelected', () => {
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(
      <TreeView
        enableSelection
        defaultSelected={{ '0': true }}
        dataSource={dataSource}
      />
    );

    const newSelectedState = wrapper
      .instance()
      .setSelected({ '1': true, '1/0': true });
    const expected = { '1': true, '1/0': true };

    expect(newSelectedState).toEqual(expected);
    expect(wrapper.state().selected).toEqual(expected);
  });
});

describe('selectNode', () => {
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(
      <TreeView enableSelection dataSource={dataSource} />
    );
    const newCheckedState = wrapper.instance().selectNode('1');
    const expected = { '1': true };

    expect(newCheckedState).toEqual(expected);
    expect(wrapper.state().selected).toEqual(expected);
  });
});

describe('deselectNode', () => {
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(
      <TreeView
        defaultSelected={{ '1': 'true' }}
        enableSelection
        dataSource={dataSource}
      />
    );
    const newCheckedState = wrapper.instance().deselectNode('1');
    const expected = {};

    expect(newCheckedState).toEqual(expected);
    expect(wrapper.state().selected).toEqual(expected);
  });
});

describe('selectAll', () => {
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(
      <TreeView enableSelection dataSource={dataSource} />
    );
    const test = wrapper.instance().selectAll();
    const expected = {
      '0': true,
      '1': true,
      '1/0': true
    };
    expect(test).toEqual(expected);
    expect(wrapper.state().selected).toEqual(expected);
  });
});

describe('deselectAll', () => {
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(
      <TreeView
        defaultSelected={{ '1': true }}
        enableSelection
        dataSource={dataSource}
      />
    );
    const test = wrapper.instance().deselectAll();
    const expected = {};
    expect(test).toEqual(expected);
    expect(wrapper.state().selected).toEqual(expected);
  });
});
