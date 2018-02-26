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
import { shallow, mount } from 'enzyme';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('async nodes', () => {
  it('calls loadNode when a node is expanded', () => {
    const loadNode = sinon.spy();
    const wrapper = mount(
      <TreeView
        dataSource={[{ label: 'test', async: true, nodes: [] }]}
        collapsed={{ '0': true }}
        loadNode={loadNode}
      />
    );

    wrapper.find(Node).get(0).onExpanderClick({
      stopPropagation: () => {}
    });
    expect(loadNode.called).to.be.true;
  });

  it('loadNode should update dataSource', () => {
    const asyncNodes = [{ label: 'async loaded' }];
    const loadNode = () => asyncNodes;

    const dataSource = [
      {
        label: 'test loadNode',
        async: true,
        nodes: []
      }
    ];

    const wrapper = mount(
      <TreeView
        dataSource={dataSource}
        collapsed={{ '0': true }}
        loadNode={loadNode}
        isNodeAsync={() => true}
      />
    );

    wrapper.find(Node).get(0).onExpanderClick({
      stopPropagation: () => {}
    });

    expect(wrapper.state().data[0].nodes).to.deep.equal(asyncNodes);
  });

  it('should work with a promise', done => {
    const asyncNodes = [{ label: 'async loaded' }];
    const loadNode = ({ path, node }) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(asyncNodes);
        }, 50);
      });
    };
    const dataSource = [
      {
        label: 'test loadNode',
        async: true,
        nodes: []
      }
    ];
    const wrapper = mount(
      <TreeView
        dataSource={dataSource}
        collapsed={{ '0': true }}
        loadNode={loadNode}
        isNodeAsync={() => true}
      />
    );

    wrapper.find(Node).get(0).onExpanderClick({
      stopPropagation: () => {}
    });

    setTimeout(() => {
      const test = wrapper.state().data[0].nodes;
      expect(test).to.equal(asyncNodes);

      done();
    }, 50);
  });

  it('should update nodeLoading with the corret node, if it returns a promise', done => {
    const dataSource = [
      {
        label: 'test loadNode',
        async: true,
        nodes: []
      }
    ];

    const loadNode = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(null);
        }, 50);
      });
    };

    const wrapper = mount(
      <TreeView
        dataSource={dataSource}
        collapsed={{ '0': true }}
        loadNode={loadNode}
        isNodeAsync={() => true}
      />
    );

    wrapper.find(Node).get(0).onExpanderClick({
      stopPropagation: () => {}
    });

    expect(wrapper.state().nodesLoading['0']).to.be.true;
    expect(wrapper.find(Node).first().props().loading).to.be.true;

    setTimeout(() => {
      expect(wrapper.state().nodesLoading['0']).to.be.false;
      done();
    }, 50);

    it('should be called every time a node is expanded', () => {
      const loadNode = sinon.spy();
      const dataSource = [
        {
          label: 'test loadNode',
          async: true,
          nodes: []
        }
      ];
      const wrapper = mount(
        <TreeView
          dataSource={dataSource}
          collapsed={{ '0': true }}
          loadNode={loadNode}
        />
      );

      // it is called every time because
      // collapsed is controlled and it doesn't really change state
      wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });
      wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });
      wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });

      expect(loadNode.calledThrice).to.be.true;
    });
  });

  it('should call loadNondeOnce', () => {
    const loadNodeOnce = sinon.spy();
    const dataSource = [
      {
        label: 'test loadNodeOnce',
        nodes: null
      }
    ];
    const wrapper = mount(
      <TreeView
        dataSource={dataSource}
        collapsed={{ '0': true }}
        loadNodeOnce={loadNodeOnce}
      />
    );

    // it is called every time because
    // collapsed is controlled and it doesn't really change state
    wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });
    wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });
    wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });

    expect(loadNodeOnce.calledOnce).to.be.true;
  });

  it('should call loadNondeOnce first time and the folowing expand change loadNode', () => {
    const loadNode = sinon.spy();
    const loadNodeOnce = sinon.spy();

    const dataSource = [
      {
        label: 'test loadNode',
        nodes: null
      }
    ];
    const wrapper = mount(
      <TreeView
        dataSource={dataSource}
        collapsed={{ '0': true }}
        loadNode={loadNode}
        loadNodeOnce={loadNodeOnce}
      />
    );

    // it is called every time because
    // collapsed is controlled and it doesn't really change state
    wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });

    expect(loadNode.called).to.be.false;
    expect(loadNodeOnce.called).to.be.true;

    wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });
    wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });

    expect(loadNode.calledTwice).to.be.true;
    expect(loadNodeOnce.calledOnce).to.be.true;
  });

  it("removes loader and nodes don't change if promise is rejected", done => {
    const loadNode = () =>
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(null);
        }, 50);
      });
    const nodes = [];
    const dataSource = [
      {
        label: 'test loadNode',
        nodes: nodes
      }
    ];

    const wrapper = mount(
      <TreeView
        dataSource={dataSource}
        collapsed={{ '0': true }}
        loadNode={loadNode}
      />
    );

    wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });
    expect(wrapper.state().nodesLoading[0]).to.be.true;
    setTimeout(() => {
      expect(wrapper.state().nodesLoading[0]).to.be.false;
      expect(wrapper.state().data[0].nodes).to.be.equal(nodes);
      done();
    }, 50);
  });

  it('calls onNodeLoad when promise is resolved', done => {
    const loadNode = () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(null);
        }, 50);
      });
    const onNodeLoad = sinon.spy();
    const nodes = [];
    const dataSource = [
      {
        label: 'test loadNode',
        async: true,
        nodes: nodes
      }
    ];

    const wrapper = mount(
      <TreeView
        dataSource={dataSource}
        collapsed={{ '0': true }}
        loadNode={loadNode}
        onNodeLoad={onNodeLoad}
        isNodeAsync={() => true}
      />
    );

    wrapper.find(Node).get(0).onExpanderClick({ stopPropagation: () => {} });

    expect(onNodeLoad.called).to.be.false;
    setTimeout(() => {
      expect(onNodeLoad.called).to.be.true;
      done();
    }, 50);
  });

  it('should not call isNodeAsync if loadNode or loadNodeOnce is not defined', () => {
    const isNodeAsync = sinon.spy();
    const wrapper = shallow(
      <TreeView
        dataSource={[{ label: 'test' }]}
        isNodeAsync={isNodeAsync}
        defaultCollapsed={{ '0': true }}
      />
    );

    wrapper.instance().expandNode('0');
    expect(isNodeAsync.called).to.be.false;
  });

  it('should call isNodeAsync if loadNode or loadNodeOnce is defined', () => {
    const isNodeAsync = sinon.spy();
    const wrapper = shallow(
      <TreeView
        isNodeAsync={isNodeAsync}
        defaultCollapsed={{ '0': true }}
        dataSource={[{ label: 'test' }]}
        loadNode={({ node }) => node.nodes}
      />
    );

    wrapper.instance().expandNode('0');
    expect(isNodeAsync.called).to.be.true;
  });

  it('should have on props async if node.async is true', () => {
    const wrapper = shallow(
      <TreeView
        dataSource={[{ label: 'test', async: true }]}
        loadNode={() => {}}
      />
    );

    expect(wrapper.find(Node).first().props().async).to.be.true;
  });

  it('should have on props what isNodeAsync returns and should overwrite node.async', () => {
    const wrapper = shallow(
      <TreeView
        dataSource={[{ label: 'test', async: false }]}
        isNodeAsync={() => true}
        loadNode={() => {}}
      />
    );

    expect(wrapper.find(Node).first().props().async).to.be.true;
  });

  it('should consider a node to have children if the node is async', () => {
    const wrapper = shallow(
      <TreeView
        dataSource={[{ label: 'test', async: true }]}
        defaultCollapsed={{ '0': true }}
        loadNode={({ node }) => node.nodes}
      />
    );

    expect(wrapper.find(Node).first().props().hasChildren).to.be.true;
  });

  it('should call loadNode/loadNodeOnce only on node that is async', () => {
    const loadNode = sinon.spy();
    const loadNodeOnce = sinon.spy();
    const wrapper = shallow(
      <TreeView
        loadNode={loadNode}
        loadNodeOnce={loadNodeOnce}
        isNodeAsync={() => false}
        dataSource={[{ label: 'test' }]}
      />
    );

    wrapper.instance().expandNode('0');
    wrapper.instance().expandNode('0');
    expect(loadNode.called).to.be.false;
    expect(loadNodeOnce.called).to.be.false;
  });

  it('if loadNode is defined, all nodes are async, and overwrites loadAsyncNode', () => {
    const loadNode = sinon.spy();
    const loadNodeOnce = sinon.spy();
    const wrapper = mount(
      <TreeView
        loadNode={loadNode}
        loadNodeOnce={loadNodeOnce}
        dataSource={[
          {
            label: 'test',
            nodes: [{ label: 'test' }]
          }
        ]}
      />
    );

    expect(wrapper.find(Node).first().props().async).to.be.true;
    expect(wrapper.find(Node).at(1).props().async).to.be.true;
  });

  it('should conside node async only if node.nodes === null when loadNodeOnce is specified and loadNode is not', () => {
    const loadNode = sinon.spy();
    const loadNodeOnce = sinon.spy();
    const wrapper = mount(
      <TreeView
        loadNode={loadNode}
        loadNodeOnce={loadNodeOnce}
        dataSource={[
          {
            label: 'test',
            nodes: [
              {
                label: 'test',
                nodes: null
              }
            ]
          }
        ]}
      />
    );

    expect(wrapper.find(Node).first().props().async).to.be.falsey;
    expect(wrapper.find(Node).at(1).props().async).to.be.true;
  });
});
