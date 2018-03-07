import React from 'react';
import TreeView from '../TreeView';
import { shallow } from 'enzyme';

describe('checkNode', () => {
  it('should return and have correct new collapsed state', () => {
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

    const wrapper = shallow(<TreeView enableChecked dataSource={dataSource} />);
    const newCheckedState = wrapper.instance().checkNode('1');
    const expected = { '1': true, '1/0': true };

    expect(newCheckedState).toEqual(expected);
    expect(wrapper.state().checked).toEqual(expected);
  });
});

describe('uncheckNode', () => {
  it('should return and have correct new collapsed state', () => {
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

    const wrapper = shallow(
      <TreeView
        enableChecked
        dataSource={dataSource}
        defaultChecked={{ '1': true, '0': true }}
      />
    );
    const newCheckedState = wrapper.instance().uncheckNode('1');
    const expected = { '0': true };

    expect(newCheckedState).toEqual(expected);
    expect(wrapper.state().checked).toEqual(expected);
  });
});

describe('checkAll', () => {
  const dataSource = [
    { label: 'test 1' },
    {
      label: 'test 2',
      nodes: [{ label: 'test 3' }]
    }
  ];
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(<TreeView enableChecked dataSource={dataSource} />);
    const test = wrapper.instance().checkAll();
    const expected = {
      '0': true,
      '1': true,
      '1/0': true
    };
    expect(test).toEqual(expected);
    expect(wrapper.state().checked).toEqual(expected);
  });
});

describe('uncheckAll', () => {
  const dataSource = [
    { label: 'test 1' },
    {
      label: 'test 2',
      nodes: [{ label: 'test 3' }]
    }
  ];
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(<TreeView enableChecked dataSource={dataSource} />);
    const test = wrapper.instance().uncheckAll();
    const expected = {};
    expect(test).toEqual(expected);
    expect(wrapper.state().checked).toEqual(expected);
  });
});
