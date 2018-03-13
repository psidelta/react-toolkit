import React, { Component } from 'react';
import { render } from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';
import Slider from '../src/Slider';
import RangeSlider from '../src/RangeSlider';
import indexCSS from '../style/index.scss';

global.React = React;

var VALUE = 10;

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <TopMenu />
        {this.props.children}
      </div>
    );
  }
}

const linkButtonStyle = {
  padding: 5,
  color: '#000',
  textDecoration: 'none',
  backgroundColor: '#f3f3f3',
  border: '1px solid #aaa',
  margin: 0,
  fontSize: 11
};

const TopMenu = () => (
  <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
    <li>
      <Link style={linkButtonStyle} to="/">
        Home
      </Link>
    </li>
    <li>
      <Link style={linkButtonStyle} to="/test">
        Test
      </Link>
    </li>
    <li>
      <Link style={linkButtonStyle} to="/basic-common">
        Basics - Common
      </Link>
    </li>
    <li>
      <Link style={linkButtonStyle} to="/slider-basics">
        Basics - Slider{' '}
      </Link>
    </li>
    <li>
      <Link style={linkButtonStyle} to="/range-slider-basics">
        Basics - Range
      </Link>
    </li>
    <li>
      <Link style={linkButtonStyle} to="/handlers">
        Handlers
      </Link>
    </li>
    <li>
      <Link style={linkButtonStyle} to="/ticks">
        Ticks
      </Link>
    </li>
    <li>
      <Link style={linkButtonStyle} to="/track">
        Track
      </Link>
    </li>
    <li>
      <Link style={linkButtonStyle} to="/buttons">
        Buttons
      </Link>
    </li>
    <li>
      <Link style={linkButtonStyle} to="/value">
        Contorlled Value
      </Link>
    </li>
    <li>
      <Link style={linkButtonStyle} to="/examples">
        Examples
      </Link>
    </li>
  </ul>
);

import Test from './pages/Test';
import BasicsPage from './pages/Basics';
import SliderBasics from './pages/SliderBasics';
import SliderRangeBascis from './pages/SliderRangeBascis';
import HandlerProps from './pages/Handlers';
import TicksProps from './pages/Ticks';
import TrackProps from './pages/Track';
import ButtonProps from './pages/Buttons';
import ValuesProps from './pages/Values';
import ExamplesPage from './pages/Examples';

render(
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/test" component={Test} />
      <Route path="/basic-common" component={BasicsPage} />
      <Route path="/slider-basics" component={SliderBasics} />
      <Route path="/range-slider-basics" component={SliderRangeBascis} />
      <Route path="/handlers" component={HandlerProps} />
      <Route path="/ticks" component={TicksProps} />
      <Route path="/track" component={TrackProps} />
      <Route path="/buttons" component={ButtonProps} />
      <Route path="/value" component={ValuesProps} />
      <Route path="/examples" component={ExamplesPage} />
    </div>
  </Router>,
  document.getElementById('content')
);
