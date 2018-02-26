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

import React, { Component } from 'react';
import { render } from 'react-dom';
import TreeView, { Node, SearchTreeView } from '../index';
import Panel from '../../Panel';
import '../../Panel/style/index.scss';
import dummyData from './dummyData';
import './index.scss';
import 'typeface-roboto';

function loadNode() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ label: 'yellow' }, { label: 'purple' }, { label: 'brown' }]);
    }, 10);
  });
}

function renderLabel(domProps, nodeProps) {
  domProps.children = [
    domProps.children,
    <span> {/* (<i key="path">path: {nodeProps.path}</i>) */}</span>
  ];
}

const simpleDataSource = [
  {
    label: 'Phylum',
    nodes: [
      { label: 'Arachnida' },
      { label: 'Insecta' },
      { label: 'Async Node', nodes: null },
      { label: 'Malacostraca' }
    ]
  },
  {
    label: 'Chordata',
    nodes: [
      { label: 'Aves', disabled: true },
      { label: 'Chondrichthyes' },
      { label: 'Osteichthyes' },
      {
        label: 'Mammalia',
        nodes: [
          { label: 'Artiodactyla' },
          { label: 'Carnivora' },
          { label: 'Cetacea' },
          { label: 'Chiroptera' },
          { label: 'Hyracoidea' },
          { label: 'Insectivora' },
          { label: 'Lagomorpha' },
          { label: 'Perissodactyla' },
          { label: 'Primates' },
          { label: 'Proboscidea' },
          { label: 'Rodentia' },
          { label: 'Sirenia' },
          { label: 'Xenarthra' }
        ]
      },
      {
        label: 'Reptilia',
        nodes: [
          { label: 'Testudines' },
          { label: 'Squamata' },
          { label: 'Crocodilia' }
        ]
      }
    ]
  }
];

const colorsPromise = [
  {
    label: 'red',
    nodes: null
  },
  {
    label: 'blue'
  }
];

function renderLoader(nodeProps) {
  return <strong>Data is loading ... </strong>;
}

const dataSource = [
  {
    id: 'js',
    label: 'JavaScript',
    nodes: [
      { id: 'reactjs', label: 'ReactJS' },
      { id: 'angular', label: 'Angular JS' }
    ]
  },
  {
    id: 'py',
    label: 'Python',
    nodes: [
      { id: 'django', label: 'Django Framework' },
      { id: 'flask', label: 'Flask MicroFramework' }
    ]
  }
];

function loadNodeOnce({ node, path }) {
  const nodes =
    node.label.indexOf('API') != -1
      ? [
          { label: 'General props' },
          { label: 'Callback props' },
          { label: 'Methods' }
        ]
      : [
          { label: 'Using the ' + node.label },
          { label: node.label + ' API', nodes: null }
        ];

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(nodes);
    }, 500);
  });
}

const renderNodeText = (domProps, nodeProps) => {
  if (nodeProps.matchText) {
    return (
      <div>
        {nodeProps.matchText.map(what => {
          return typeof what == 'string' ? (
            what
          ) : (
            <span style={{ background: 'lime' }}>{what.match}</span>
          );
        })}
      </div>
    );
  }
  return nodeProps.node.label + '!';
};

const onNodeLoad = (nodes, { node }) => {
  console.log({ nodes, node });
};

const renderInput = domProps => {
  domProps.style = Object.assign({}, domProps.style, {
    padding: 15,
    border: '1px dotted blue'
  });
};

const renderNodeContextMenu = (menuProps, x) => {
  menuProps.items = [
    {
      label: 'Collapse'
    },
    '-',
    {
      label: 'Expand'
    },
    {
      label: 'Refresh'
    },
    '-',
    {
      label: 'Edit'
    }
  ];
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedDepth: 1,
      collapsed: {
        '0': true,
        '1': true
      }
    };
  }
  render() {
    return (
      <Panel>
        {/* <code style={{ whiteSpace: 'pre-wrap' }}>
          const dataSource = {JSON.stringify(simpleDataSource, null, 2)}
        </code> */}

        {/* <p>
          <strong>Default case:</strong>
          <br />
          <p>
            In this case the path for the node with id of 'angular', will be
            '0/1'.
          </div>
          <div>The path for the node with id of 'django', will be '1/0'.</div>
        </p> */}

        <TreeView
          dataSource={simpleDataSource}
          renderLabel={renderLabel}
          onNodeLoad={this.onNodeLoad}
          loadNode={loadNode}
          renderNodeContextMenu={renderNodeContextMenu} // rtl
          leafNodeIcon={
            <svg
              fill="#000000"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              style={{ verticalAlign: 'middle' }}
            >
              <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          }
          nodeIcon={
            <svg
              fill="#000000"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              style={{ verticalAlign: 'middle' }}
            >
              <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          }
          style={{ fontSize: 14, fontFamily: 'Roboto' }}
        />
        {/*
        <p>
          <strong>
            Case <i>pathProperty="label"</i>
          </strong>
          <br />
          <p>
            In this case the path for the node with id of 'reactjs', will be
            'JavaScript/ReactJS'
          </p>
          <p>
            The path for the node with id of 'flask', will be 'Python/Flask
            MicroFramework'
          </p>
        </div>

        <TreeView
          dataSource={dataSource}
          renderLabel={renderLabel}
          pathProperty="label"
        />

        <div>
          <strong>
            Case <i>idProperty="id"</i>
          </strong>
          <br />
          <p>
            In this case the path for the node with id of 'flask', will be just
            'flusk'
          </p>
        </div>
        <TreeView
          dataSource={dataSource}
          renderLabel={renderLabel}
          idProperty="id"
        /> */}
      </Panel>
    );
    // return (
    //   <div>
    //     <TreeView
    //       renderNodeText={renderNodeText}
    //       onCollapsedChange={({ collapsedMap }) => {
    //         console.log('collapsed change', collapsedMap);
    //         this.setState({
    //           collapsed: collapsedMap
    //         });
    //       }}
    //       collapsed={this.state.collapsed}
    //       dataSource={simpleDataSource}
    //     />
    //   </div>
    // );
  }
}

render(<App />, document.getElementById('content'));
