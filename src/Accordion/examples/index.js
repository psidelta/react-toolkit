import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import '../style/index.scss';
import Intro from './intro';
import TabTitle from './tab-title-options';
import Accordion from '../src/Accordion';
import TabPanel from '../../TabPanel';
import Tooltip from '../../Tooltip';
import '../../TabPanel/style/index.scss';
import '../../Tooltip/style/index.scss';

// import './index.css';

global.React = React;

const icon = (
  <div className="accordion-icon">
    <svg fill="#495e85" height="24" viewBox="0 0 24 24" width="24">
      <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  </div>
);

const firstChildren = (
  <div tabTitle="Tab1">
    Eu dolor aliquip nostrud quis do laboris ex culpa tempor voluptate deserunt
    labore sit minim. Commodo aliquip eiusmod culpa aliqua esse fugiat
    incididunt anim elit dolor tempor occaecat. Et irure ea ea labore commodo
    non Lorem aliqua fugiat anim amet.
  </div>
);

const secondChildren = (
  <div tabTitle="Tab2">
    Ut qui pariatur cillum enim labore sint eiusmod amet in aute.Velit
    consectetur laborum aliqua ut ea veniam irure magna occaecat. Veniam
    proident adipisicing in proident enim culpa ad ipsum dolor. Ex sit excepteur
    officia minim.
  </div>
);

const thirdChildren = (
  <div tabTitle="Tab3">
    Nisi consectetur irure in officia.Non ipsum pariatur officia eu eiusmod
    deserunt officia reprehenderit enim labore dolore reprehenderit. Aute irure
    et enim excepteur anim dolore fugiat do dolore. Et dolore pariatur mollit
    eiusmod aliqua irure incididunt tempor. Do non ullamco deserunt voluptate
    ullamco ad exercitation veniam do dolor. Eu exercitation voluptate sint ad
    sit aliquip et commodo Lorem anim voluptate deserunt consequat. Commodo qui
    magna laborum officia enim elit aute excepteur veniam quis duis elit eu.
  </div>
);

const fourthChildren = (
  <div tabTitle="Tab4">
    Ut qui pariatur cillum enim labore sint eiusmod amet in aute.Velit
    consectetur laborum aliqua ut ea veniam irure magna occaecat. Veniam
    proident adipisicing in proident enim culpa ad ipsum dolor. Ex sit excepteur
    officia minim.
  </div>
);

const accordionChildren = [
  firstChildren,
  secondChildren,
  thirdChildren,
  fourthChildren
];

class DemoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      horizontal: false,
      alignment: 'start',
      expandToolPosition: true,
      rtl: false,
      disabled: true,
      verticalAlgnment: 'middle',
      stretchTabContent: false,
      tabTitleRotate: 90,
      multiExpand: false
    };
  }

  render() {
    return (
      <div
        className="page"
        style={{
          fontFamily: 'lato',
          width: '100%',
          padding: 20
        }}
      >
        {/* <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
          <li style={{ padding: '0 10px' }}>
            <Link to="/">Intro</Link>
          </li>
          <li style={{ padding: '0 10px' }}>
            <Link to="tab-titles">Tab Title</Link>
          </li>
          <li style={{ padding: '0 10px' }}>
            <Link to="tab-content">Tab Content</Link>
          </li>
          <li style={{ padding: '0 10px' }}>
            <Link to="callbacks">Callbacks</Link>
          </li>
          <li style={{ padding: '0 10px' }}>
            <Link to="methods">Methods</Link>
          </li>
          <li style={{ padding: '0 10px' }}>
            <Link to="active-index">ActiveIndex</Link>
          </li>
          <li style={{ padding: '0 10px' }}>
            <Link to="config-playground">Config playground</Link>
          </li>
        </ul> */}

        <div style={{ position: 'relative' }}>
          {/* {this.props.children} */}
          <div style={{ marginBottom: 20 }}>
            Horizontal:{' '}
            <input
              type="checkbox"
              checked={this.state.horizontal}
              onChange={ev => this.setState({ horizontal: ev.target.checked })}
            />{' '}
            | expandToolPosition:{' '}
            <input
              type="checkbox"
              checked={this.state.expandToolPosition}
              onChange={ev =>
                this.setState({ expandToolPosition: ev.target.checked })}
            />{' '}
            | rtl:{' '}
            <input
              type="checkbox"
              checked={this.state.rtl}
              onChange={ev => this.setState({ rtl: ev.target.checked })}
            />{' '}
            | multiExpand:{' '}
            <input
              type="checkbox"
              checked={this.state.multiExpand}
              onChange={ev => this.setState({ multiExpand: ev.target.checked })}
            />{' '}
            | tabTitleAlign:{' '}
            <select
              onChange={ev => this.setState({ alignment: ev.target.value })}
              value={this.state.alignment}
            >
              <option value="start">start</option>
              <option value="end">end</option>
              <option value="center">center</option>
              <option value="top">top</option>
              <option value="left">left</option>
              <option value="bottom">bottom</option>
              <option value="right">right</option>
            </select>{' '}
            | tabTitleVerticalAlign:{' '}
            <select
              onChange={ev =>
                this.setState({ verticalAlgnment: ev.target.value })}
              value={this.state.verticalAlgnment}
            >
              <option value="top">top</option>
              <option value="middle">middle</option>
              <option value="bottom">bottom</option>
            </select>{' '}
            | tabTitleRotate:{' '}
            <select
              onChange={ev =>
                this.setState({ tabTitleRotate: ev.target.value })}
              value={this.state.tabTitleRotate}
            >
              <option value={90}>90</option>
              <option value={-90}>-90</option>
            </select>{' '}
            | disabled:{' '}
            <input
              type="checkbox"
              checked={this.state.disabled}
              onChange={ev => this.setState({ disabled: ev.target.checked })}
            />{' '}
            | stretchTabContent:{' '}
            <input
              type="checkbox"
              checked={this.state.stretchTabContent}
              onChange={ev =>
                this.setState({ stretchTabContent: ev.target.checked })}
            />{' '}
          </div>
          <div
            style={{
              /*height: 1500*/
            }}
          >
            <Tooltip target={'[data-tooltip]'} />
            <input />
            <br />
            <br />
            <Accordion
              activateOnFocus
              horizontal={this.state.horizontal}
              tabTitleAlign={this.state.alignment}
              expandToolPosition={
                this.state.expandToolPosition ? 'end' : 'start'
              }
              rtl={this.state.rtl}
              style={{ height: 500 }}
              // defaultActiveIndex={1}
              collapsible
              showTooltip
              // activateOnFocus
              multiExpand={this.state.multiExpand}
              tabTitleVerticalAlign={this.state.verticalAlgnment}
              stretchTabContent={this.state.stretchTabContent}
              tabTitleRotate={this.state.tabTitleRotate * 1}
            >
              <TabPanel
                tabTitle={<div> First</div>}
                style={{ maxWidth: 800, maxHeight: 500 }}
              >
                <div tabTitle="Home">
                  <h4>
                    Zippy React Toolkit - Carefully crafted components made with
                    ReactJS.
                  </h4>
                  <p>
                    Zippy React Toolkit is designed to be a comprehensive set of
                    rich UI components built with React and that can be easily
                    integrated into existing or new applications.
                  </p>
                  <p>
                    We've gone through a lot of iterations to make sure we
                    provide a rich and flexible component set that is actually
                    useful and help you speed-up app development.
                  </p>
                  The toolkit contains:
                  <ul>
                    <li>Accordion</li>
                    <li>Button</li>
                    <li>CheckBox</li>
                    <li>ColorPicker</li>
                    <li>ComboBox</li>
                    <li>DatePicker</li>
                    <li>MaskedInput</li>
                    <li>Menu</li>
                    <li>Notification</li>
                  </ul>{' '}
                  and many other components.
                </div>
                <div tabTitle="Features">
                  When we started building the toolkit, we've made a checklist
                  of features that our components need to include
                  out-of-the-box:
                  <ul>
                    <li>
                      <b>Performance</b> - a component is only useful if it does
                      its job quickly. This will generally not be a problem with
                      smaller components like buttons, dialogs, color pickers,
                      etc - but menus, lists and grids need a lot of performance
                      considerations in order to be really snappy.
                    </li>
                    <li>
                      <b>Simplicity</b> - components need to be simple to use in
                      the most common scenario. For this, default values for
                      components have been carefully considered, so you need to
                      add a minimum of code when you want to add some custom
                      property and/or logic.
                    </li>
                    <li>
                      <b>Look & feel</b> - by default, components need to look
                      carefully crafted & pretty. This leads us to the next
                      consideration, which is:
                    </li>
                    <li>
                      <b>Theming</b> - all components need to have an easy to
                      understand theming mechanism. We're well aware of the
                      shift to css-in-js, css modules and inline-styling, but
                      for the purpose of reusable components and simplicity
                      everyone can understand, we've decided to stick with the
                      BEM methodology. In this way, when you choose Zippy React
                      Toolkit you're free to keep your existing styling solution
                      in your app.
                    </li>
                    <li>
                      <b>Functionality</b> - the most common usage patterns for
                      a component should be already built-in. For example, you
                      should be able to easily configure a menu for single
                      selection or a Window to resize proportionally.
                    </li>
                  </ul>
                </div>
                <div tabTitle="About us">
                  We focus on building components, so you can focus on what
                  actually matters to you - building & shipping your app faster
                  to the market.
                </div>
                <div tabTitle="Sign up">
                  If you wish to know more about our components, and future
                  developments, sign up to our newsletter.
                  <form>
                    <br />
                    <input type="text" placeholder="Name" />
                    <br />
                    <br />
                    <input type="text" placeholder="Surname" />
                    <br />
                    <br />
                    <input type="email" placeholder="Email" />
                    <br />
                    <br />
                    <button>Sign up</button>
                  </form>
                </div>
              </TabPanel>
              <div
                tabTitle={'Second'}
                style={{ background: 'aqua' }}
                // tabProps={{ style: { padding: 100 } }}
              >
                Eu dolor aliquip nostrud quis do laboris ex culpa tempor
                voluptate deserunt labore sit minim. Commodo aliquip eiusmod
                culpa aliqua esse fugiat incididunt anim elit dolor tempor
                occaecat. Et irure ea ea labore commodo non Lorem aliqua fugiat
                anim amet.
              </div>
              <div
                tabTitle={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {icon} Third
                  </div>
                }
                tabProps={{ disabled: this.state.disabled }}
                style={{ background: 'aqua' }}
              >
                Ut qui pariatur cillum enim labore sint eiusmod amet in
                aute.Velit consectetur laborum aliqua ut ea veniam irure magna
                occaecat. Veniam proident adipisicing in proident enim culpa ad
                ipsum dolor. Ex sit excepteur officia minim.
              </div>
              <div tabTitle="Tab3" style={{ background: 'aqua' }}>
                Nisi consectetur irure in officia.Non ipsum pariatur officia eu
                eiusmod deserunt officia reprehenderit enim labore dolore
                reprehenderit. Aute irure et enim excepteur anim dolore fugiat
                do dolore. Et dolore pariatur mollit eiusmod aliqua irure
                incididunt tempor. Do non ullamco deserunt voluptate ullamco ad
                exercitation veniam do dolor. Eu exercitation voluptate sint ad
                sit aliquip et commodo Lorem anim voluptate deserunt consequat.
                Commodo qui magna laborum officia enim elit aute excepteur
                veniam quis duis elit eu.
              </div>
              <div tabTitle="Tab4" style={{ background: 'aqua' }}>
                Ut qui pariatur cillum enim labore sint eiusmod amet in
                aute.Velit consectetur laborum aliqua ut ea veniam irure magna
                occaecat. Veniam proident adipisicing in proident enim culpa ad
                ipsum dolor. Ex sit excepteur officia minim.
              </div>
            </Accordion>
          </div>

          <Accordion
            style={{ marginTop: 20, height: 350 }}
            children={accordionChildren}
            collapsible
          />
        </div>
      </div>
    );
  }
}

render(
  <Router>
    <div>
      <Route path="/" component={DemoPage} />
      <Route path="/intro" component={Intro} />
      <Route path="/tab-titles" component={TabTitle} />
      {/*<Route path="/range-slider-basics" component={SliderRangeBascis} />
      <Route path="/handlers" component={HandlerProps} />
      <Route path="/ticks" component={TicksProps} />
      <Route path="/track" component={TrackProps} />
      <Route path="/buttons" component={ButtonProps} />
      <Route path="/value" component={ValuesProps} />
      <Route path="/examples" component={ExamplesPage} />
      */}
    </div>
  </Router>,
  document.getElementById('content')
);
