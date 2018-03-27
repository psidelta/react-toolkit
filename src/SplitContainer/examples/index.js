import React, { Component } from 'react';
import { render } from 'react-dom';
import { Flex, Item as FlexItem } from '../../Flex';
// import SplitContainer, { Splitter, Side } from '../src';
import SplitContainer, { Splitter, Side } from '../src';
import { TabStrip } from '../../TabPanel';
import '../style/index.scss';
import '../../TabPanel/style/index.scss';

import Button from '../../Button';
import '../../Button/style/index.scss';

import autoBind from '@zippytech/react-class/autoBind';
import { NotifyResize } from '../../NotifyResize';

let SPLIT_AT = 100;
let HORIZ = true;

let COLLAPSED_INDEX = -1;

class FirstSide extends Component {
  render() {
    console.warn('first side render');
    return (
      <div style={{ background: 'magenta', position: 'relative' }}>
        <Button>Button</Button>
        first side
      </div>
    );
  }
}

const Sidebar = () => {
  const tabs = [{ title: 'first' }, { title: 'second' }];
  return (
    <TabStrip
      theme={null}
      scroller={false}
      tabs={tabs.slice(0, 2)}
      tabPosition="left"
      tabClassName="sidebar-tab"
      className="sidebar"
    />
  );
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { splitAt: '30%', resizeProxy: true };
  }
  render() {
    return (
      <SplitContainer
        defaultSplitAt={this.state.splitAt}
        bordered
        orientation="vertical"
        resizeProxy={this.state.resizeProxy}
        onResize={splitAt => {
          console.log('newSplitAt', splitAt);
          // this.setState({ splitAt });
        }}
        style={{ height: 400 }}
      >
        <Side style={{ padding: 10, background: '#d1dae0', color: '#1F2D3D' }}>
          <div>
            <b>Left side - current split at: {this.state.splitAt}</b>
          </div>
          <label>
            <b>Use resize proxy:</b>{' '}
          </label>
          <p>
            Zippytech React Toolkit is designed to be a comprehensive set of
            rich UI components built with React and that can be easily
            integrated into existing or new applications.
          </p>
          <p>
            We've gone through a lot of iterations to make sure we provide a
            rich and flexible component set that is actually useful and help you
            speed-up app development.
          </p>
        </Side>

        <Side style={{ padding: 10, background: '#556a8e', color: 'white' }}>
          <p>
            When we started building the toolkit, we've made a checklist of
            features that our components need to include out-of-the-box:
          </p>
          <ul>
            <li>
              <b>Performance</b> - a component is only useful if it does its job
              quickly. This will generally not be a problem with smaller
              components like buttons, dialogs, color pickers, etc - but menus,
              lists and grids need a lot of performance considerations in order
              to be really snappy.
            </li>

            <li>
              <b>Flexibility & extensibility</b> - all components need to be
              very flexible in adapting to a wide spectrum of needs. Changing
              some styles, replacing some rendering logic or adding a custom
              validation should all be possible and easily achievable.
            </li>
          </ul>
        </Side>
      </SplitContainer>
    );
  }
}
export default () => {
  return <App />;
};
render(<App />, document.getElementById('content'));
