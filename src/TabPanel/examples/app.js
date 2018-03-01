import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Flex } from '../../Flex';
import TabPanel, { Tab, TabBody } from '../index';
import TabStrip from '../TabStrip';
import RadioButtonGroup from '../../RadioButtonGroup';
import SplitContainer, { Side } from '../../SplitContainer';
import '../../RadioButtonGroup/style/index.scss';
import '../../SplitContainer/style/index.scss';

import Accordion from '../../Accordion';
import '../../Accordion/style/index.scss';

import assign from 'object-assign';

import 'typeface-roboto';

import '../style/base.scss';
import '../style/theme/default/index.scss';
// import '../style/theme/red/index.scss';
// import '../style/theme/blue/index.scss';
// import '../style/theme/flat/index.scss';

// import './index.css';

import { home, features, about, signup } from './tabContent';

const icon = (
  <svg fill="#495e85" height="26" viewBox="0 0 24 24" width="34">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 1,
      tabs: ['first tab', 'second tab', 'third tab', 'fourth tab', 'fifth tab'],
      vertical: false,
      scroller: true,
      tabAlign: 'start',
      tabPosition: 'top',
      secondTabTitle: 'Second tab',
      tabWidth: false,
      disabled: false,
      focusedIndex: 3,
      activateOnFocus: false
    };
  }

  getTabClassName(props) {
    if (props.active) {
      return 'tab-active';
    }

    return 'tab';
  }

  render() {
    return (
      <Flex column style={{ fontFamily: 'Roboto' }}>
        <Flex column>
          <RadioButtonGroup
            orientation="horizontal"
            radioValue={this.state.tabAlign}
            onChange={({ checkedItemValue: tabAlign }) => {
              this.setState({
                tabAlign
              });
            }}
            radioOptions={[
              {
                value: 'start',
                label: 'start'
              },
              { value: 'center', label: 'center' },
              { value: 'end', label: 'end' },
              { value: 'stretch', label: 'stretch' },
              { value: 'space-around', label: 'space-around' },
              { value: 'space-between', label: 'space-between' }
            ]}
          />
          <RadioButtonGroup
            orientation="horizontal"
            radioValue={this.state.tabPosition}
            onChange={({ checkedItemValue: tabPosition }) => {
              this.setState({
                tabPosition
              });
            }}
            radioOptions={[
              {
                value: 'top',
                label: 'top'
              },
              { value: 'left', label: 'left' },
              { value: 'right', label: 'right' },
              { value: 'bottom', label: 'bottom' }
            ]}
          />
          <RadioButtonGroup
            orientation="horizontal"
            radioValue={this.state.vertical}
            onChange={({ checkedItemValue: vertical }) => {
              this.setState({
                vertical
              });
            }}
            radioOptions={[
              {
                value: true,
                label: 'vertical'
              },
              { value: false, label: 'horizontal' }
            ]}
          />
          <RadioButtonGroup
            orientation="horizontal"
            radioValue={this.state.scroller}
            onChange={({ checkedItemValue: scroller }) => {
              this.setState({
                scroller
              });
            }}
            radioOptions={[
              {
                value: true,
                label: 'scroller'
              },
              { value: false, label: 'no scroller' }
            ]}
          />
          <div>
            <input
              type="checkbox"
              checked={this.state.disabled}
              onChange={ev => this.setState({ disabled: ev.target.checked })}
            />disabled
          </div>
          <div>
            <input
              type="checkbox"
              checked={this.state.activateOnFocus}
              onChange={ev =>
                this.setState({ activateOnFocus: ev.target.checked })
              }
            />activateOnFocus
          </div>
          <div style={{ margin: '20px 20px 30px' }}>
            <input
              type="checkbox"
              checked={this.state.tabWidth}
              onChange={ev => this.setState({ tabWidth: ev.target.checked })}
            />Tab width
          </div>
        </Flex>
        <Flex
          alignItems="start"
          column={this.state.tabWidth ? false : true}
          row={this.state.tabWidth ? true : false}
        >
          <TabPanel
            strategy="one"
            style={{
              maxWidth: '70vw',
              maxHeight: '70vh',
              width: this.state.tabWidth ? 420 : 900,
              height: 600
            }}
            // defaultActiveIndex={2}
            enableKeyboardNavigation
            tabActiveStyle={{ background: '#c9c9da', color: '#f75353' }}
            stretchTabContent
            tabAlign={this.state.tabAlign}
            tabPosition={this.state.tabPosition}
            vertical={this.state.vertical}
            scroller={this.state.scroller}
            focusedIndex={this.state.focusedIndex}
            onFocusedIndexChange={focusedIndex => {
              this.setState({
                focusedIndex
              });
            }}
            tabEllipsis={true}
            closeable
            // activeIndex={3}
            activateOnFocus={this.state.activateOnFocus}
          >
            <TabBody style={{ padding: 50 }} className="yyy">
              <div tabTitle="Home">{home}</div>
              <h3
                tabTitle="Features list"
                tabProps={{ className: 'x', disabled: this.state.disabled }}
              >
                {features}
              </h3>
              <div tabTitle="About us" style={{ color: 'red' }}>
                {about}
              </div>
              <div tabTitle="Sign up">{signup}</div>
              {[...Array(2)].map((_, i) => i).map(i => (
                <div tabTitle={`tab ${i}`} key={i}>
                  tab content {i}
                </div>
              ))}
            </TabBody>
          </TabPanel>
          <Accordion style={{ minWidth: 300, height: 300, marginLeft: 2 }}>
            <div tabTitle="First">First</div>
            <div tabTitle="Second" tabProps={{ disabled: false }}>
              Second
            </div>
            <div tabTitle="Third">Third</div>
          </Accordion>
          <TabStrip
            tabs={[
              { title: <div className="tab-strip">{icon} Home</div> },
              { title: <div className="tab-strip">Features</div> },
              { title: <div className="tab-strip">About us</div> },
              { title: <div className="tab-strip">Sign up</div> }
            ]}
            tabPosition="top"
            style={{ marginLeft: 2 }}
          />
        </Flex>
      </Flex>
    );
  }
}

export default App;
