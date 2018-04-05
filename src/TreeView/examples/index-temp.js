/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import Component from 'react-class';
import TreeView, { Node } from './src';
import dummyData from './dummyData';
import './index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: null,
      selected: {},
      active: null,
      collapsedDepth: 0
    };
  }

  render() {
    return (
      <div>
        <Node loading hasChildren node={{ label: 'hello world' }} />

        <div style={{ marginBottom: 50 }} />

        <TreeView
          // rtl
          enableChecked
          style={{ height: 600, overflow: 'auto' }}
          isNodeChecked={({ checked }) => checked}
          dataSource={dummyData}
          disabled={{ '0/1': true, '0/0/0/2': true }}
          // defaultActiveNode={'2'}
          //activeNode={this.state.activeNode}
          //idProperty="id"
          enableSelection
          loadNode={({ node, index }) => {
            if (index === 0) {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve([{ label: 'hello world' }]);
                }, 1000);
              });
            } else {
              return node.nodes;
            }
          }}
          // enableScrollNodeIntoView={false}
          //treeLines={false}
          // checkOnSelect
          onActiveNodeChange={({ path }) => {
            this.setState({
              active: path
            });
          }}
          // onNodeCollapseChange={({ collapsedMap, getUpdatedDataSource }) => {
          //
          //   const test = getUpdatedDataSource(({ node }) => {
          //     node.test = 'hello world'
          //   })
          //
          //   this.setState({
          //     collapsed: collapsedMap
          //   })
          // }}
          onSelectionChange={({ selectedMap }) => {
            this.setState({
              selected: selectedMap
            });
          }}
          //collapsed={this.state.collapsed}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
