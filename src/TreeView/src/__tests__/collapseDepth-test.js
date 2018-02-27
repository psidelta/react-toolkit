import React from 'react';
import TreeView from '../TreeView';
import { mount, shallow } from 'enzyme';
import Node from '../Node';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

const NESTED_DATA_STRUCTURE = [
  { label: 'test 1' },
  {
    label: 'test 2',
    nodes: [{ label: 'test 3' }, { label: 'test 4' }, { label: 'test 5' }]
  }
];

const NESTED_DATA_STRUCTURE_3_LEVELS = [
  { label: 'test 1' },
  {
    label: 'test 2',
    nodes: [
      { label: 'test 3' },
      { label: 'test 4' },
      {
        label: 'test 5',
        nodes: [{ label: 'test 6' }, { label: 'test 7' }, { label: 'test 8' }]
      }
    ]
  }
];

describe('collapseDepth props', () => {
  describe('collapseDepth', () => {
    it('should nodes have a correct depth prop', () => {
      const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);
      expect(
        wrapper
          .find(Node)
          .first()
          .props().depth
      ).to.equal(0);
      expect(
        wrapper
          .find(Node)
          .last()
          .props().depth
      ).to.equal(1);
    });

    it('has all node collapsed on collapseDepth=0', () => {
      const wrapper = mount(
        <TreeView dataSource={NESTED_DATA_STRUCTURE} collapsedDepth={0} />
      );
      expect(wrapper.find(Node)).to.have.length(2);
    });

    it('has expanded only first two levels collapseDepth=1', () => {
      const wrapper = mount(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE_3_LEVELS}
          collapsedDepth={1}
        />
      );

      expect(wrapper.find(Node)).to.have.length(5);
    });

    it('collapsedDepth=0, if node changes collapse state should update correct', () => {
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE_3_LEVELS}
          collapsedDepth={0}
        />
      );

      wrapper.instance().expandNode('1');
      const test = {
        '0': true,
        '1/0': true,
        '1/1': true,
        '1/2': true,
        '1/2/0': true,
        '1/2/1': true,
        '1/2/2': true
      };

      expect(wrapper.state().collapsed).to.deep.equal(test);
    });

    it('should have no effect if selected is controlled or uncontrolled', () => {
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE_3_LEVELS}
          collapsedDepth={1}
          defaultCollapsed={{ '0': true }}
        />
      );

      expect(
        wrapper
          .find(Node)
          .first()
          .props().collapsed
      ).to.be.true;

      wrapper.setProps({ collapsed: { 1: true } });
      expect(
        wrapper
          .find(Node)
          .at(1)
          .props().collapsed
      ).to.be.true;
    });
  });

  describe('defaultCollapsedDepth', () => {
    it('defaults to undefined', () => {
      const wrapper = shallow(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);
      expect(wrapper.props.collapsedDepth).to.be.falsy;
    });

    it('should be used as initial this.state.collapsedDepth', () => {
      const wrapper = shallow(
        <TreeView
          defaultCollapsedDepth={1}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );
      expect(wrapper.state().collapsedDepth).to.be.equal(1);
    });

    it('should transition state to null when a node is collapsed', () => {
      const wrapper = shallow(
        <TreeView
          defaultCollapsedDepth={1}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      wrapper.instance().expandNode('0');
      expect(wrapper.state().collapsedDepth).to.be.null;
    });

    it('defaultCollapsedDepth=0, if node changes collapse state should update correct', () => {
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE_3_LEVELS}
          defaultCollapsedDepth={0}
        />
      );

      wrapper.instance().expandNode('1');
      const test = {
        '0': true,
        '1/0': true,
        '1/1': true,
        '1/2': true,
        '1/2/0': true,
        '1/2/1': true,
        '1/2/2': true
      };

      expect(wrapper.state().collapsed).to.deep.equal(test);
    });
  });

  describe('onCollapsedDepthChange', () => {
    it('should be called with null when collapse changes', () => {
      const onCollapsedDepthChange = sinon.spy();
      const wrapper = shallow(
        <TreeView
          collapsedDepth={0}
          dataSource={NESTED_DATA_STRUCTURE_3_LEVELS}
          onCollapsedDepthChange={onCollapsedDepthChange}
        />
      );

      wrapper.instance().collapseNode('0');
      expect(onCollapsedDepthChange.args[0][0]).to.be.null;
    });
  });
});
