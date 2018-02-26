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
import { shallow, mount } from 'enzyme';
import Node from '../Node';

const CLASS_NAME = TreeView.defaultProps.rootClassName;
const LABEL_CLASS_NAME = `.${CLASS_NAME}__node__label`;
const BASIC_DATA_SOURCE = [
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

describe('keyboard actions ', () => {
  describe('keyboard actions', () => {
    describe('arrrow navigation', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = mount(<TreeView dataSource={BASIC_DATA_SOURCE} />);
      });

      describe('arrowUp', () => {
        it('should update correct state', () => {
          wrapper.setState({ activeNode: '0' });

          wrapper
            .find(`.${CLASS_NAME}`)
            .simulate('keyDown', { key: 'ArrowUp' });
          expect(wrapper.state().activeNode).to.equal('0');

          wrapper.setState({ activeNode: '1' });
          wrapper
            .find(`.${CLASS_NAME}`)
            .simulate('keyDown', { key: 'ArrowUp' });
          expect(wrapper.state().activeNode).to.equal('0');

          wrapper.setState({ activeNode: '1/0' });
          wrapper
            .find(`.${CLASS_NAME}`)
            .simulate('keyDown', { key: 'ArrowUp' });
          expect(wrapper.state().activeNode).to.equal('1');
        });

        it('should call onActiveNodeChange', () => {
          const onActiveNodeChange = sinon.spy();
          wrapper.setProps({ onActiveNodeChange });
          wrapper.setState({ activeNode: '1' });

          wrapper
            .find(`.${CLASS_NAME}`)
            .simulate('keyDown', { key: 'ArrowUp' });

          expect(onActiveNodeChange.called).to.be.true;
          expect(onActiveNodeChange.args[0][0].path).to.equal('0');
        });
      });

      describe('arrowDown', () => {
        it('should update correct state', () => {
          wrapper.setState({ activeNode: '0' });

          wrapper
            .find(`.${CLASS_NAME}`)
            .simulate('keyDown', { key: 'ArrowDown' });
          expect(wrapper.state().activeNode).to.equal('1');

          wrapper.setState({ activeNode: '1' });
          wrapper
            .find(`.${CLASS_NAME}`)
            .simulate('keyDown', { key: 'ArrowDown' });
          expect(wrapper.state().activeNode).to.equal('1/0');

          wrapper.setState({ activeNode: '1/0' });
          wrapper
            .find(`.${CLASS_NAME}`)
            .simulate('keyDown', { key: 'ArrowDown' });
          expect(wrapper.state().activeNode).to.equal('1/0');
        });

        it('should call onSelectionChange', () => {
          const onActiveNodeChange = sinon.spy();
          wrapper.setProps({ onActiveNodeChange });
          wrapper.setState({ activeNode: '1' });

          wrapper
            .find(`.${CLASS_NAME}`)
            .simulate('keyDown', { key: 'ArrowDown' });

          expect(onActiveNodeChange.called).to.be.true;
          expect(onActiveNodeChange.args[0][0].path).to.equal('1/0');
        });
      });

      describe('ArrowRight', () => {
        let wrapper;
        beforeEach(() => {
          wrapper = mount(<TreeView dataSource={BASIC_DATA_SOURCE} />);
        });

        it('expand node when it is collapsed', () => {
          wrapper.setState({
            collapsed: {
              '1': true
            },
            activeNode: '1'
          });

          expect(wrapper.state().collapsed['1']).to.be.true;
          wrapper.simulate('keyDown', { key: 'ArrowRight' });
          expect(wrapper.state().collapsed['1']).to.be.falsey;
        });

        it('navigate to next sibling if is already expanded', () => {
          wrapper.setState({
            activeNode: '1'
          });

          wrapper.simulate('keyDown', { key: 'ArrowRight' });
          expect(wrapper.state().activeNode).to.equal('1/0');
        });

        describe('rtl', () => {
          it('should collapsed node when it is expanded', () => {
            wrapper.setProps({ rtl: true });
            wrapper.setState({
              activeNode: '1'
            });

            expect(wrapper.state().collapsed['1']).to.be.falsey;
            wrapper.simulate('keyDown', { key: 'ArrowRight' });
            expect(wrapper.state().collapsed['1']).to.be.true;
          });

          it('navigate to previous sibling if is already collapsed', () => {
            wrapper.setProps({ rtl: true });
            wrapper.setState({
              activeNode: '1',
              collapsed: {
                '1': true
              }
            });

            wrapper.simulate('keyDown', { key: 'ArrowRight' });
            expect(wrapper.state().activeNode).to.equal('0');
          });
        });
      });

      describe('ArrowLeft', () => {
        let wrapper;
        beforeEach(() => {
          wrapper = mount(<TreeView dataSource={BASIC_DATA_SOURCE} />);
        });

        it('should collapsed node when it is expanded', () => {
          wrapper.setState({
            activeNode: '1'
          });

          expect(wrapper.state().collapsed['1']).to.be.falsey;
          wrapper.simulate('keyDown', { key: 'ArrowLeft' });
          expect(wrapper.state().collapsed['1']).to.be.true;
        });

        it('navigate to previous sibling if is already collapsed', () => {
          wrapper.setState({
            activeNode: '1',
            collapsed: {
              '1': true
            }
          });

          wrapper.simulate('keyDown', { key: 'ArrowLeft' });
          expect(wrapper.state().activeNode).to.equal('0');
        });
      });

      describe('rtl', () => {
        it('expand node when it is collapsed', () => {
          wrapper.setProps({ rtl: true });
          wrapper.setState({
            collapsed: {
              '1': true
            },
            activeNode: '1'
          });

          expect(wrapper.state().collapsed['1']).to.be.true;
          wrapper.simulate('keyDown', { key: 'ArrowLeft' });
          expect(wrapper.state().collapsed['1']).to.be.falsey;
        });

        it('navigate to next sibling if is already expanded', () => {
          wrapper.setProps({ rtl: true });
          wrapper.setState({
            activeNode: '1'
          });

          wrapper.simulate('keyDown', { key: 'ArrowLeft' });
          expect(wrapper.state().activeNode).to.equal('1/0');
        });
      });
    });

    describe('space on activeNode', () => {
      it('should check it', () => {
        const wrapper = mount(<TreeView dataSource={BASIC_DATA_SOURCE} />);

        wrapper.setState({
          activeNode: '0'
        });

        expect(wrapper.state().checked['0']).to.be.falsey;
        wrapper.simulate('keyDown', { key: ' ' });
        expect(wrapper.state().checked['0']).to.be.true;
      });
    });

    describe('PageUp', () => {
      it('should set active last sibling', () => {
        const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);

        wrapper.setState({ activeNode: '1/2' });
        wrapper.simulate('keyDown', { key: 'PageUp' });
        expect(wrapper.state().activeNode).to.equal('1/0');
      });

      it('should work on root nodes', () => {
        const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);
        wrapper.setState({ activeNode: '1' });
        wrapper.simulate('keyDown', { key: 'PageUp' });
        expect(wrapper.state().activeNode).to.equal('0');
      });
    });

    describe('PageDown', () => {
      it('should set active first sibling', () => {
        const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);

        wrapper.setState({ activeNode: '1/0' });
        wrapper.simulate('keyDown', { key: 'PageDown' });
        expect(wrapper.state().activeNode).to.equal('1/2');
      });
    });

    describe('Home', () => {
      it('should set active first rendered node', () => {
        const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);

        wrapper.setState({ activeNode: '1/2' });
        wrapper.simulate('keyDown', { key: 'Home' });
        expect(wrapper.state().activeNode).to.equal('0');
      });
    });

    describe('End', () => {
      it('should set active first rendered node', () => {
        const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);

        wrapper.setState({ activeNode: '0' });
        wrapper.simulate('keyDown', { key: 'End' });
        expect(wrapper.state().activeNode).to.equal('1/2');
      });
    });

    describe('Enter', () => {
      const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);
      wrapper.setState({ activeNode: '0' });

      expect(wrapper.state().collapsed).to.deep.equal({});
      wrapper.simulate('keyDown', { key: 'Enter' });
      expect(wrapper.state().collapsed).to.deep.equal({ 0: true });
      wrapper.simulate('keyDown', { key: 'Enter' });
      expect(wrapper.state().collapsed).to.deep.equal({});
    });
  });

  describe('onClick', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<TreeView dataSource={BASIC_DATA_SOURCE} />);
    });

    it('should change activeNode when a node is clicked', () => {
      const test = wrapper
        // .find(Node)
        .find(LABEL_CLASS_NAME)
        .last()
        .simulate('click');

      expect(wrapper.state().activeNode).to.be.ok;
      expect(wrapper.state().activeNode).to.equal('1/0');
    });

    it('should call onSelectionChange when a node is clicked', () => {
      const onActiveNodeChange = sinon.spy();
      wrapper.setProps({ onActiveNodeChange });
      const test = wrapper
        .find(`.${CLASS_NAME}__node__label`)
        .last()
        .simulate('click');

      expect(onActiveNodeChange.called).to.be.true;
      expect(onActiveNodeChange.args[0][0].path).to.equal('1/0');
    });
  });

  describe('defaultActiveNode', () => {
    it("should have it's initial sate equal to defaultActiveNode", () => {
      const wrapper = shallow(
        <TreeView defaultActiveNode="test" dataSource={[]} />
      );
      expect(wrapper.state().activeNode).to.equal('test');
    });
  });

  describe('enableKeyboardNavigation false', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<TreeView dataSource={BASIC_DATA_SOURCE} />);
    });

    describe('onClick', () => {
      it('should not change state', () => {
        wrapper.setProps({
          enableKeyboardNavigation: false
        });
        wrapper.find(LABEL_CLASS_NAME).last().simulate('click');

        expect(wrapper.state().activeNode).to.be.null;
      });

      it('should not call onSelectionChange', () => {
        const onActiveNodeChange = sinon.spy();
        wrapper.setProps({
          onActiveNodeChange,
          enableKeyboardNavigation: false
        });
        wrapper.find(LABEL_CLASS_NAME).last().simulate('click');

        expect(onActiveNodeChange.called).to.be.false;
      });
    });
  });

  describe('activeNode', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <TreeView activeNode="1/0" dataSource={BASIC_DATA_SOURCE} />
      );
    });

    /**
     * This covers all ui iteractions that might change
     * activeNode, all of them call onActiveNodeChange
     * when thy want to change state
     */
    it("when onActiveNodeChange is triggered it doesn't change state", () => {
      wrapper.instance().onActiveNodeChange({ props: {}, path: '0' });
      expect(wrapper.state().activeNode).to.be.null;
    });

    it('calls onSelectionChange, with right args', () => {
      const onActiveNodeChange = sinon.spy();
      wrapper.setProps({ onActiveNodeChange });
      wrapper.find(LABEL_CLASS_NAME).last().simulate('click');

      expect(onActiveNodeChange.called).to.be.true;
      expect(onActiveNodeChange.args[0][0].path).to.equal('1/0');
    });
  });
});
