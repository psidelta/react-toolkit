/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import Accordion from '../../src/Accordion';
import autoBind from 'react-class/autoBind';

const optionStyle = {
  padding: '2px 10px',
  marginBottom: 3,
  display: 'block',
  background: '#f9f9f9'
};

export default class ConfigPlayground extends Component {
  constructor(props, context) {
    super(props, context);
    const defaultProps = props.defaultProps || {};
    this.state = {
      enabled: false,
      callbackLog: [],
      lockedTab: null,
      disabledTab: true,
      accordionOptions: {
        horizontal: false,
        locked: false,
        multiExpand: false,
        collapsible: false,
        transition: true,
        transitionFunction: 'ease',
        transitionDuration: 300,
        tabTitleRotate: -90,
        tabTitleEllipsis: true,
        expandToolPosition: 'start',
        tabTitleAlign: 'start',
        expandOnToolOnly: false,
        rtl: false,
        ...defaultProps
      }
    };
    autoBind(this);
  }

  _setAccordionOptions(options) {
    const { accordionOptions } = this.state;
    this.setState({
      accordionOptions: {
        ...accordionOptions,
        ...options
      }
    });
  }

  onExpandAt() {
    const { expandAtInput, accordionComponent } = this.refs;
    let idx = parseInt(expandAtInput.value, 10);
    accordionComponent.expandAt(idx);
  }

  onCollapseAt() {
    const { collapseAtInput, accordionComponent } = this.refs;
    let idx = parseInt(collapseAtInput.value, 10);
    accordionComponent.collapseAt(idx);
  }

  toggleLockedTabs() {
    this.setState({
      lockedTab: !this.state.lockedTab
    });
  }

  onExpandAll() {
    this.refs.accordionComponent.expandAll();
  }

  onCollapseAll() {
    this.refs.accordionComponent.collapseAll();
  }

  toggleStretch() {
    this._setAccordionOptions({
      stretch: !this.state.accordionOptions.stretch
    });
  }

  toggleMultiExpand() {
    this._setAccordionOptions({
      multiExpand: !this.state.accordionOptions.multiExpand
    });
  }

  toggleRTL() {
    this._setAccordionOptions({ rtl: !this.state.accordionOptions.rtl });
  }

  toggleCollapsible() {
    this._setAccordionOptions({
      collapsible: !this.state.accordionOptions.collapsible
    });
  }

  toggleLocked() {
    this._setAccordionOptions({ locked: !this.state.accordionOptions.locked });
  }

  toggleTransition() {
    this._setAccordionOptions({
      transition: !this.state.accordionOptions.transition
    });
  }

  setTransitionDuration(ev) {
    this._setAccordionOptions({
      transitionDuration: parseInt(ev.target.value, 10)
    });
  }

  setTransitionFunction(ev) {
    this._setAccordionOptions({ transitionFunction: ev.target.value });
  }

  setActivateEvent(ev) {
    this._setAccordionOptions({ activateEvent: ev.target.value });
  }

  setTabTitleRotate(ev) {
    this._setAccordionOptions({
      tabTitleRotate: parseInt(ev.target.value, 10)
    });
  }

  setExpandToolPosition(ev) {
    this._setAccordionOptions({ expandToolPosition: ev.target.value });
  }

  setTabTitleAlign(ev) {
    this._setAccordionOptions({ tabTitleAlign: ev.target.value });
  }

  toggleHorizontal() {
    this._setAccordionOptions({
      horizontal: !this.state.accordionOptions.horizontal
    });
  }

  toggleExpandOnToolOnly() {
    this._setAccordionOptions({
      expandOnToolOnly: !this.state.accordionOptions.expandOnToolOnly
    });
  }

  toggleTabTitleEllipsis() {
    this._setAccordionOptions({
      tabTitleEllipsis: !this.state.accordionOptions.tabTitleEllipsis
    });
  }

  callbackLogger(name, args) {
    console.log(`${name} ${JSON.stringify(args)}`);

    // const {callbackLog} = this.state;
    // const message = {
    //     id: Date.now(),
    //     content: `${name} ${JSON.stringify(args)}`
    // };
    // if ( callbackLog.length > 50 ) {
    //     this.setState({
    //         callbackLog: [message]
    //     });
    // } else {
    //     this.setState({
    //         callbackLog: [message, ...callbackLog]
    //     });
    // }
  }

  toggleDisabledTab() {
    this.setState({
      disabledTab: !this.state.disabledTab
    });
  }

  renderOptionsMenu() {
    const { accordionOptions, enabled, disabledTab, callbackLog } = this.state;
    const { optionsMenu } = this.props;
    console.log('render', { ...this.state.accordionOptions });
    if (optionsMenu) {
      return (
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ padding: 10, minWidth: 170 }}>
              <h6 style={{ margin: 0 }}>Main Layout Options:</h6>
              <div>
                <label style={optionStyle}>
                  <input
                    onChange={() => this.toggleHorizontal()}
                    type="checkbox"
                    checked={accordionOptions.horizontal}
                    value="multiExpand"
                  />{' '}
                  horizontal
                </label>
                <label style={optionStyle}>
                  <input
                    onChange={() => this.toggleMultiExpand()}
                    type="checkbox"
                    checked={accordionOptions.multiExpand}
                    value="multiExpand"
                  />{' '}
                  multiExpand
                </label>
                <label style={optionStyle}>
                  <input
                    onChange={() => this.toggleRTL()}
                    type="checkbox"
                    checked={accordionOptions.rtl}
                    value="rtl"
                  />{' '}
                  rtl
                </label>
                <label style={optionStyle}>
                  <input
                    onChange={() => this.toggleCollapsible()}
                    type="checkbox"
                    checked={accordionOptions.collapsible}
                    value="collapsible"
                  />{' '}
                  collapsible
                </label>
                <label style={optionStyle}>
                  <input
                    onChange={() => this.toggleLocked()}
                    type="checkbox"
                    checked={accordionOptions.locked}
                    value="collapsible"
                  />{' '}
                  locked
                </label>
              </div>
            </div>

            <div style={{ padding: 10, minWidth: 280 }}>
              <h6 style={{ margin: 0 }}>Transition Props:</h6>
              <label style={optionStyle}>
                <input
                  onChange={() => this.toggleTransition()}
                  type="checkbox"
                  checked={accordionOptions.transition}
                  value="transition"
                />{' '}
                transition
              </label>
              <div style={{ opacity: accordionOptions.transition ? 1 : 0.1 }}>
                <div style={{ ...optionStyle }}>
                  <label htmlFor="transitionDuration">
                    transition duration
                  </label>
                  <select
                    id="transitionDuration"
                    onChange={ev => this.setTransitionDuration(ev)}
                    value={accordionOptions.transitionDuration}
                  >
                    <option value={100}>100ms</option>
                    <option value={250}>250ms</option>
                    <option value={500}>500ms</option>
                    <option value={1500}>1500ms</option>
                    <option value={3000}>3000ms</option>
                  </select>
                </div>

                <div style={{ ...optionStyle }}>
                  <label htmlFor="transitionFunction">
                    transition function
                  </label>
                  <select
                    id="transitionFunction"
                    onChange={ev => this.setTransitionFunction(ev)}
                    value={accordionOptions.transitionFunction}
                  >
                    <option value="ease">ease</option>
                    <option value="ease-in-out">ease-in-out</option>
                    <option value="linear">linear</option>
                  </select>
                </div>
              </div>

              <h6 style={{ margin: 0 }}>Interaction trigger:</h6>
              <div style={optionStyle}>
                <label htmlFor="activateEvent">activate event</label>
                <select
                  id="activateEvent"
                  onChange={ev => this.setActivateEvent(ev)}
                  value={accordionOptions.activateEvent}
                >
                  <option value="onClick">onClick</option>
                  <option value="onMouseDown">onMouseDown</option>
                  <option value="onMouseEnter">onMouseEnter</option>
                </select>
              </div>
            </div>

            <div style={{ padding: 10, minWidth: 280 }}>
              <h6 style={{ margin: 0 }}>Title props:</h6>

              <label style={{ ...optionStyle }}>
                <input
                  onChange={() => this.toggleTabTitleEllipsis()}
                  type="checkbox"
                  checked={accordionOptions.tabTitleEllipsis}
                  value="tabTitleEllipsis"
                />
                tabTitleEllipsis
              </label>

              <label style={{ ...optionStyle }}>
                <input
                  onChange={() => this.toggleExpandOnToolOnly()}
                  type="checkbox"
                  checked={accordionOptions.expandOnToolOnly}
                  value="tabTitleEllipsis"
                />
                expandOnToolOnly
              </label>

              <div
                style={{
                  ...optionStyle,
                  opacity: accordionOptions.horizontal ? 1 : 0.1
                }}
              >
                <label htmlFor="tabTitleRotateDeg">tabTitleRotate</label>
                <select
                  id="titleRotateDeg"
                  onChange={ev => this.setTabTitleRotate(ev)}
                  value={accordionOptions.titleRotate}
                >
                  <option value={90}>90deg</option>
                  <option value={-90}>-90deg</option>
                </select>
              </div>

              <div style={optionStyle}>
                <label htmlFor="tabTitleAlign">tabTitleAlign</label>
                <select
                  id="tabTitleAlign"
                  onChange={ev => this.setTabTitleAlign(ev)}
                  value={accordionOptions.tabTitleAlign}
                >
                  <option value={'start'}>start</option>
                  <option value={'center'}>center</option>
                  <option value={'end'}>end</option>
                </select>
              </div>

              <div style={optionStyle}>
                <label htmlFor="expandToolPosition">expandToolPosition</label>
                <select
                  id="expandToolPosition"
                  onChange={ev => this.setExpandToolPosition(ev)}
                  value={accordionOptions.expandToolPosition}
                >
                  <option value={'start'}>start</option>
                  <option value={'end'}>end</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ padding: 10 }}>
              <button onClick={() => this.onExpandAt()}>Expand At</button>
              <input ref="expandAtInput" style={{ width: 50 }} type="number" />
            </div>
            <div style={{ padding: 10 }}>
              <button onClick={() => this.onCollapseAt()}>Collapse At</button>
              <input
                ref="collapseAtInput"
                style={{ width: 50 }}
                type="number"
              />
            </div>
            <div style={{ padding: 10 }}>
              <button onClick={() => this.onExpandAll()}>Expand All</button>
            </div>
            <div style={{ padding: 10 }}>
              <button onClick={() => this.onCollapseAll()}>Collpase All</button>
            </div>
            <div style={{ padding: 10 }}>
              <button onClick={() => this.toggleLockedTabs()}>
                Toggle Locked Tabs 0
              </button>
            </div>
            <div style={{ padding: 10 }}>
              <button onClick={() => this.toggleDisabledTab()}>
                Toggble Disabled Tab 3
              </button>
            </div>
          </div>
          {/* <button onClick={()=>(this.refs.container.refs.accordionComponent.expandAll())}>ExpandAll</button>
                <button onClick={()=>(this.refs.container.refs.accordionComponent.expandAt(1))}>ExpandAt(1)</button>
                <br/>
                <button onClick={()=>(this.refs.container.refs.accordionComponent.collapseAll())}>CollapseAll</button>
                <button onClick={()=>(this.refs.container.refs.accordionComponent.collapseAt(1))}>CollapseAt(1)</button>

                <br/>
                <button onClick={()=>(this.toggleDisabledTab())}>Toggle Disabled Tab</button> */}
        </div>
      );
    }
  }

  render() {
    const { accordionOptions, enabled, disabledTab, callbackLog } = this.state;

    return (
      <div>
        {this.renderOptionsMenu()}

        <div
          style={{
            border: '1px solid #335577',
            position: 'relative',
            maxWidth: 840,
            overflow: 'auto'
          }}
        >
          <div style={{ paddingTop: '50%', width: '100%' }} />
          <div
            style={{
              position: 'absolute',
              top: 5,
              left: 5,
              right: 5,
              bottom: 5,
              overflow: 'visible'
            }}
          >
            <Accordion
              defaultActiveIndex={1}
              ref="accordionComponent"
              {...accordionOptions}
              tabStyle={{
                width:
                  accordionOptions.multiExpand && accordionOptions.horizontal
                    ? 450
                    : null,
                backgroundColor: 'lightgreen',
                padding: 20
              }}
              onActivate={activeIndex => {
                console.log(activeIndex);
              }}
            >
              <div
                tabTitle="Dolorem ipsam minus consequatur occaecati voluptatibus. Alias corporis facilis tempora illo sint et. Harum dolor ut saepe qui qui pariatur."
                style={{
                  backgroundColor: 'lightblue'
                }}
                locked={this.state.lockedTab}
              >
                <p>
                  Dolorem ipsam minus consequatur occaecati voluptatibus. Alias
                  corporis facilis tempora illo sint et. Harum dolor ut saepe
                  qui qui pariatur. Qui est quidem quia et sed id aut et. Facere
                  enim ipsa ut sapiente adipisci quia sint.
                </p>
                <p>
                  Ratione magnam quod sint aut vitae cupiditate. Voluptatem
                  incidunt eos ex porro omnis eius. Laborum accusantium magnam
                  officiis asperiores eligendi dolores. Quia necessitatibus qui
                  id nesciunt error rerum est dolores. Ipsam iusto dicta
                  debitis.
                </p>
                <p>
                  Repellendus dolores fuga asperiores. Labore et voluptates
                  perferendis. Temporibus quaerat quia aspernatur illo et itaque
                  ratione. Saepe earum accusamus aut dolorem. Numquam excepturi
                  enim aperiam nihil eaque. Adipisci optio adipisci et velit
                  nulla.
                </p>
                <p>
                  Voluptas odio voluptatibus eveniet vitae earum. Ducimus
                  accusantium sint at neque voluptatem qui et cupiditate.
                  Nesciunt sed unde aperiam aut. Sed esse veritatis dolorum
                  minima. Quae quibusdam delectus itaque totam ipsum adipisci
                  et. Iusto consequuntur quas provident distinctio repellendus.
                </p>
                <p>
                  Dolorem ipsam minus consequatur occaecati voluptatibus. Alias
                  corporis facilis tempora illo sint et. Harum dolor ut saepe
                  qui qui pariatur. Qui est quidem quia et sed id aut et. Facere
                  enim ipsa ut sapiente adipisci quia sint.
                </p>
                <p>
                  Excepturi officia adipisci et quisquam est impedit. Voluptate
                  praesentium nemo eos reiciendis. Quisquam molestiae voluptatum
                  ea unde accusamus quas numquam quis. Minima natus et optio
                  unde et ut officiis. Distinctio nam dignissimos maiores id
                  dolorem quaerat. Et dolorem omnis aut debitis et sint ut.
                </p>
                <p>
                  Repellendus dolores fuga asperiores. Labore et voluptates
                  perferendis. Temporibus quaerat quia aspernatur illo et itaque
                  ratione. Saepe earum accusamus aut dolorem. Numquam excepturi
                  enim aperiam nihil eaque. Adipisci optio adipisci et velit
                  nulla.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'lightblue'
                }}
                tabTitle="second tab"
                tabProps={{ style: { backgroundColor: 'yellow' } }}
              >
                <h2>More content</h2>
                <p>This is some content</p>
                <p>
                  Voluptas odio voluptatibus eveniet vitae earum. Ducimus
                  accusantium sint at neque voluptatem qui et cupiditate.
                  Nesciunt sed unde aperiam aut. Sed esse veritatis dolorum
                  minima. Quae quibusdam delectus itaque totam ipsum adipisci
                  et. Iusto consequuntur quas provident distinctio repellendus.
                </p>
              </div>
              <div
                style={{
                  backgroundColor: 'lightgreen'
                }}
                disabled={disabledTab}
                tabTitle={`Disabled Tab (Toggble by button)`}
              >
                <p>This is some content</p>
              </div>
              <div
                style={{
                  backgroundColor: 'lightblue',
                  width: 960
                }}
                tabTitle="third tab"
              >
                <p>This is some content</p>
                <div
                  style={{
                    width: 950,
                    height: 300,
                    backgroundColor: '#c3c3c3'
                  }}
                />
              </div>
              <div
                style={{
                  backgroundColor: 'lightblue'
                }}
                tabTitle="forth tab"
                tabProps={{ stretchTabContent: true }}
              >
                <p>This tab has stretchTabContent=true</p>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    );

    /**
        <div style={{maxHeight:250, overflow:'auto'}}>
            {callbackLog.map((message, idx) => (<p key={message.id}>{message.content}</p>))}
        </div>
        */
  }
}

ConfigPlayground.defaultProps = {
  optionsMenu: true
};
