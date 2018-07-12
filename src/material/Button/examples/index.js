import React, { Component } from 'react';
import { render } from 'react-dom';

import MaterialButton from '../src';
import '../style/index.scss';

import './index.css';

const Main = () => {
  return (
    <div style={{ marginTop: 30 }}>
      <MaterialButton className="custom-class" type="flat">
        Flat
      </MaterialButton>
      <MaterialButton className="custom-class" type="raised">
        Raised
      </MaterialButton>
      <MaterialButton className="custom-class" type="unelevated">
        Unelevated
      </MaterialButton>
      <MaterialButton className="custom-class" type="outlined">
        Outlined
      </MaterialButton>
    </div>
  );
};
render(<Main />, document.getElementById('content'));
