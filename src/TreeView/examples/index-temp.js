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
                setTimeout(
                  () => {
                    resolve([{ label: 'hello world' }]);
                  },
                  1000
                );
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
