import React, { Component } from 'react';
import { render } from 'react-dom';
import Tooltip from '../src/';
import Button from '../../Button';
import './index.scss';
import '../style/index.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Tooltip target="[data-tooltip]" />
        <div
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            background: 'blue',
            color: 'red'
          }}
          data-tooltip-position="left"
          data-tooltip="this is a long tooltip"
          data-tooltip-positions="left,top,bottom"
        >
          Tooltip comes here
        </div>
        <p>
          <strong>data-tooltip</strong>:<br />
          <Tooltip target=".tooltip" />
          <Button
            className="tooltip"
            data-tooltip="<div style='color: red'> Tooltip Text </div>"
          >
            push
          </Button>
        </p>
        <p>
          <strong>React.node</strong>:<br />
          <Tooltip target=".tooltip2">Jsx for tooltip</Tooltip>
          <Button className="tooltip2">push</Button>
        </p>
        <p>
          <strong>function</strong>:<br />
          <br />
          <br />
          <br />
          <br />
          <Tooltip
            target=".tooltip3"
            arrowSize={8}
            visible
            background="red"
            className="tooltip-color-blue"
            height={100}
          >
            {({ targetNode, visible }) => {
              if (targetNode) {
                // will be null when there is no active node
                return <strong>{targetNode.dataset.tooltip}</strong>;
              }
            }}
          </Tooltip>
          <Button
            className="tooltip3"
            data-tooltip="Tooltip with children as function"
          >
            Edit
          </Button>
        </p>
        -------------------------------
        <br />
        <br />
        <Tooltip target=".tooltip" captureTabNavigation>
          <input placeholder="name" /> <br />
          <input placeholder="age" />
        </Tooltip>
        <span className="tooltip">info, captureTabNavigation=true</span>
        <br />
        <Tooltip target=".tooltip2" captureTabNavigation={false}>
          <input placeholder="name" /> <br />
          <input placeholder="age" />
        </Tooltip>
        <span className="tooltip2">info, captureTabNavigation=false</span>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
