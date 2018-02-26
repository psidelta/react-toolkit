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
import NotificationBoard from '../src';
import '../style/index.scss';

let count = 0;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: true
    };

    this.notificationId = null;
  }
  addNotification() {
    count++;
    zippyui.notification.first.addNotification({
      title: this.state.title ? <div>Notification number </div> : null,
      autoHideDelay: false,
      // visible: false,
      // showTransitionDuration: 2000,
      // hideTransitionDuration: 2000,
      content: (
        <p>
          This is the <b>content</b> of the <b>{count}</b> notification!
        </p>
      )
    });
  }
  showAll() {
    zippyui.notification.first.showAll();
  }

  hideAll() {
    this.board.hideAll();
  }

  render() {
    return (
      <div>
        <button
          style={{ marginRight: 10 }}
          onClick={() => this.addNotification()}
        >
          Add a notification
        </button>
        <input
          type="checkbox"
          checked={this.state.title}
          onChange={event => this.setState({ title: event.target.checked })}
        />title{' '}
        <button style={{ marginRight: 10 }} onClick={() => this.showAll()}>
          Show all notifications
        </button>
        <button onClick={() => this.hideAll()}>Hide all notifications</button>
        <button onClick={() => this.board.showNotification(1)}>show 1</button>
        <button onClick={() => this.board.showNotification(2)}>show 2</button>
        <button onClick={() => this.board.closeNotification(0)}>show 3</button>
        <button onClick={() => this.board.showNotification(4)}>show 4</button>
        <NotificationBoard
          ref={b => (this.board = b)}
          id="first"
          pinButton
          autoHideDelay={50000000}
          zIndex={100000}
          // rtl
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
