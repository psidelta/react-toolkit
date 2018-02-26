/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import TreeView from '../TreeView';
import Node from '../Node';
import { mount, shallow } from 'enzyme';

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

describe('checked props', () => {
  describe('defaultChecked', () => {
    it('should be used as initial state for checked', () => {
      const defaultChecked = { '0': true };
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE}
          defaultChecked={defaultChecked}
        />
      );

      expect(wrapper.state().checked).to.be.equal(defaultChecked);
    });
  });

  describe('checked', () => {
    it('should use correct checked state', () => {
      const checked = { '2': true };
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE}
          checked={checked}
          defaultChecked={{ '1': true }}
        />
      );

      expect(wrapper.instance().getCurrentCheckedState()).to.deep.equal(
        checked
      );
    });

    it('should not update this.state.checked', () => {
      const checked = { '1/1': true };
      const wrapper = mount(
        <TreeView dataSource={NESTED_DATA_STRUCTURE} checked={checked} />
      );

      wrapper.instance().checkNode('1/2');

      expect(wrapper.state().checked).to.deep.equal({});
    });
  });

  describe('enableChecked', () => {
    it('should default to false', () => {
      const wrapper = mount(<TreeView dataSource={[]} />);
      expect(wrapper.props().enableChecked).to.be.false;
    });

    it('enableChecked is passed to nodes', () => {
      const wrapper = mount(
        <TreeView enableChecked={false} dataSource={NESTED_DATA_STRUCTURE} />
      );
      expect(wrapper.find(Node).first().props().enableChecked).to.be.false;
    });
  });

  describe('checkOnSelect', () => {
    it('when a node is selected it should trigger also a check', () => {
      const onCheckedChange = sinon.spy();
      const wrapper = mount(
        <TreeView
          enableChecked
          checkOnSelect
          onCheckedChange={onCheckedChange}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      wrapper.instance().selectNode('0');
      expect(onCheckedChange.called).to.be.true;
      expect(wrapper.state().checked[0]).to.be.true;
      expect(onCheckedChange.args[0][0].checkedMap).to.deep.equal({
        '0': true
      });
    });
  });

  describe('getUpdatedDataSource', () => {
    it('should update correctly dataSource', () => {
      let newDataSource;
      const onCheckedChange = ({ getUpdatedDataSource }) => {
        newDataSource = getUpdatedDataSource(({
          node,
          nodeProps,
          selected
        }) => {
          node.customPropertyInjecter = true;
        });
      };
      const wrapper = mount(
        <TreeView
          enableChecked
          dataSource={NESTED_DATA_STRUCTURE}
          onCheckedChange={onCheckedChange}
        />
      );

      wrapper.instance().checkNode('0');

      expect(wrapper.state().data).to.not.equal(newDataSource);
      expect(newDataSource[0].customPropertyInjecter).to.be.true;
    });
  });

  describe('isNodeChecked', () => {
    it('should be called with correct props', () => {
      const isNodeChecked = sinon.spy();
      const wrapper = mount(
        <TreeView
          enableChecked
          checked={{ 0: false }}
          isNodeChecked={isNodeChecked}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      const args = isNodeChecked.args[0][0];

      expect(isNodeChecked.called).to.be.true;
      expect(args.index).to.be.equal(0);
    });

    it('should overwrite controlled or uncontrolled checked', () => {
      const isNodeChecked = () => true;
      const wrapper = mount(
        <TreeView
          enableChecked
          isNodeChecked={isNodeChecked}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      expect(wrapper.find(Node).first().props().checked).to.be.true;
    });

    it('should take into account isNodeChecked state when selected changes', () => {
      const isNodeChecked = () => true;
      const onCheckedChange = sinon.spy();

      const wrapper = mount(
        <TreeView
          enableChecked
          isNodeChecked={isNodeChecked}
          dataSource={NESTED_DATA_STRUCTURE}
          onCheckedChange={onCheckedChange}
        />
      );

      wrapper.instance().checkNode('0');
      expect(onCheckedChange.args[0][0].checkedMap).to.be.deep.equal({
        '0': true,
        '1': true,
        '1/0': true,
        '1/1': true,
        '1/2': true
      });
    });
  });
});
