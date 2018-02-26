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

export default class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      splitterSize: 20,
      collapsedIndex: 0,
      fixedIndex: 1
    };
  }

  handleDrop(splitAt) {
    SPLIT_AT = splitAt;

    this.setState({});
  }

  handleSplitterSizeChange(event) {
    let splitterSize = event.target.value;
    if (splitterSize) {
      splitterSize *= 1;
    }
    this.setState({
      splitterSize
    });
  }

  handleFixedIndexChange(event) {
    const fixedIndex = event.target.value * 1 || 0;
    this.setState({
      fixedIndex
    });
  }

  handleSplitAtChange(event) {
    SPLIT_AT = event.target.value;
    this.setState({});
  }

  handleClick() {
    this.setState({});
  }

  handleExpand(index) {
    COLLAPSED_INDEX = null;
    this.setState({});
  }

  handleCollapse(index) {
    COLLAPSED_INDEX = index;

    this.setState({});
  }

  key(e) {
    console.log(e.key);
  }

  render() {
    const splitterStyle = {
      background: 'white'
    };

    if (HORIZ) {
      // splitterStyle.height = SPLITTER_SIZE
    } else {
      // splitterStyle.width = SPLITTER_SIZE
    }

    return (
      <div style={{ width: '90vw', overflow: 'hidden' }}>
        <div style={{ marginBottom: 30 }}>
          <SplitContainer
            style={{ height: 300 }}
            orientation="vertical"
            bordered
            defaultSplitAt="50%"
            locked
          >
            <Side style={{ overflow: 'auto' }}>
              Zippy React Toolkit is designed to be a comprehensive set of rich
              UI components built with React and that can be easily integrated
              into existing or new applications. We've gone through a lot of
              iterations to make sure we provide a rich and flexible component
              set that is actually useful and help you speed-up app development.
              We focus on building components, so you can focus on what actually
              matters to you - building & shipping your app faster to the
              market. Zippy React Toolkit is designed to be a comprehensive set
              of rich UI components built with React and that can be easily
              integrated into existing or new applications. We've gone through a
              lot of iterations to make sure we provide a rich and flexible
              component set that is actually useful and help you speed-up app
              development. We focus on building components, so you can focus on
              what actually matters to you - building & shipping your app faster
              to the market. Zippy React Toolkit is designed to be a
              comprehensive set of rich UI components built with React and that
              can be easily integrated into existing or new applications. We've
              gone through a lot of iterations to make sure we provide a rich
              and flexible component set that is actually useful and help you
              speed-up app development. We focus on building components, so you
              can focus on what actually matters to you - building & shipping
              your app faster to the market. Zippy React Toolkit is designed to
              be a comprehensive set of rich UI components built with React and
              that can be easily integrated into existing or new applications.
              We've gone through a lot of iterations to make sure we provide a
              rich and flexible component set that is actually useful and help
              you speed-up app development. We focus on building components, so
              you can focus on what actually matters to you - building &
              shipping your app faster to the market. Zippy React Toolkit is
              designed to be a comprehensive set of rich UI components built
              with React and that can be easily integrated into existing or new
              applications. We've gone through a lot of iterations to make sure
              we provide a rich and flexible component set that is actually
              useful and help you speed-up app development. We focus on building
              components, so you can focus on what actually matters to you -
              building & shipping your app faster to the market. Zippy React
              Toolkit is designed to be a comprehensive set of rich UI
              components built with React and that can be easily integrated into
              existing or new applications. We've gone through a lot of
              iterations to make sure we provide a rich and flexible component
              set that is actually useful and help you speed-up app development.
              We focus on building components, so you can focus on what actually
              matters to you - building & shipping your app faster to the
              market. Zippy React Toolkit is designed to be a comprehensive set
              of rich UI components built with React and that can be easily
              integrated into existing or new applications. We've gone through a
              lot of iterations to make sure we provide a rich and flexible
              component set that is actually useful and help you speed-up app
              development. We focus on building components, so you can focus on
              what actually matters to you - building & shipping your app faster
              to the market. Zippy React Toolkit is designed to be a
              comprehensive set of rich UI components built with React and that
              can be easily integrated into existing or new applications. We've
              gone through a lot of iterations to make sure we provide a rich
              and flexible component set that is actually useful and help you
              speed-up app development. We focus on building components, so you
              can focus on what actually matters to you - building & shipping
              your app faster to the market. Zippy React Toolkit is designed to
              be a comprehensive set of rich UI components built with React and
              that can be easily integrated into existing or new applications.
              We've gone through a lot of iterations to make sure we provide a
              rich and flexible component set that is actually useful and help
              you speed-up app development. We focus on building components, so
              you can focus on what actually matters to you - building &
              shipping your app faster to the market. Zippy React Toolkit is
              designed to be a comprehensive set of rich UI components built
              with React and that can be easily integrated into existing or new
              applications. We've gone through a lot of iterations to make sure
              we provide a rich and flexible component set that is actually
              useful and help you speed-up app development. We focus on building
              components, so you can focus on what actually matters to you -
              building & shipping your app faster to the market. Zippy React
              Toolkit is designed to be a comprehensive set of rich UI
              components built with React and that can be easily integrated into
              existing or new applications. We've gone through a lot of
              iterations to make sure we provide a rich and flexible component
              set that is actually useful and help you speed-up app development.
              We focus on building components, so you can focus on what actually
              matters to you - building & shipping your app faster to the
              market. Zippy React Toolkit is designed to be a comprehensive set
              of rich UI components built with React and that can be easily
              integrated into existing or new applications. We've gone through a
              lot of iterations to make sure we provide a rich and flexible
              component set that is actually useful and help you speed-up app
              development. We focus on building components, so you can focus on
              what actually matters to you - building & shipping your app faster
              to the market.
            </Side>
            <Side>Second</Side>
          </SplitContainer>
        </div>
        <SplitContainer
          orientation="vertical"
          // xsplitterSize={0}
          style={{ minHeight: 200 }}
          defaultSplitAt="50%"
          onResize={c => {
            console.log(c);
          }}
        >
          <Sidebar />
          <div
            style={{
              padding: 4,
              display: 'inline-block',
              background: '#ebf1fa'
            }}
          >
            x
          </div>
        </SplitContainer>
        <SplitContainer
          orientation="vertical"
          className="data-details-container"
          defaultSplitAt="-300"
          defaultCollapsedIndex={1}
          usePercentageOnResize
          minSize={100}
          // xsplitterSize={10}
          resizeProxy={false}
          fillSides={[true, false]}
          proxyZIndex={10000}
          bordered
          style={{ height: 500, flex: 1 }}
        >
          <FirstSide />

          <SplitContainer
            bordered
            orientation="horizontal"
            defaultSplitAt="50%"
            fillSides
            style={{ background: 'yellow' }}
          >
            <div style={{ background: 'red', display: 'inline-block' }}>
              the second side
            </div>
            <SplitContainer
              orientation="vertical"
              defaultSplitAt="50%"
              style={{ background: 'blue' }}
            >
              <div style={{ background: 'blue', display: 'inline-block' }}>
                a first side
              </div>
              <div style={{ background: 'aqua', display: 'inline-block' }}>
                a second side
              </div>
            </SplitContainer>
          </SplitContainer>
        </SplitContainer>
      </div>
    );
  }

  onCheck(event) {
    var checked = event.target.checked;
    HORIZ = checked;
    console.log(checked);

    this.setState({});
  }
}

render(<App />, document.getElementById('content'));
