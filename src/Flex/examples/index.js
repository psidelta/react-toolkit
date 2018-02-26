import React, { Component } from 'react';
import { render } from 'react-dom';
import { Flex, Item } from '../';

import '../style/index.scss';

const App = () => {
  return (
    <Flex style={{ width: '100vw', height: '100vh' }}>
      <Item flex={1}>one</Item>
      <Item flex={2}>two</Item>
    </Flex>
  );
};

render(<App />, document.getElementById('content'));
