import React, { Component } from 'react';
import Accordion from '../../src/Accordion';

export default class CallbackOptions extends Component {
  render() {
    return (
      <div>
        <h2>Callback options</h2>
        <p>
          The expand/collapse interaction has callbacks. Check the console on
          this page.
        </p>
        <div style={{ display: 'flex', maxWidth: 860, flexWrap: 'wrap' }}>
          <div style={{ width: '100%', padding: 10 }}>
            <div style={{ height: 420 }}>
              <Accordion
                defaultActiveIndex={0}
                transition={false}
                onExpand={idx => console.log('onExpand', idx)}
                onCollapse={idx => console.log('onCollapse', idx)}
                onActivate={params => console.log('onActivate', params)}
              >
                <div tabTitle="Dolorem ipsam minus consequatur occaecati voluptatibus. Alias corporis facilis tempora illo sint et. Harum dolor ut saepe qui qui pariatur. Qui est quidem quia et sed id aut et. Facere enim ipsa ut sapiente adipisci quia sint">
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div
                  tabTitle="Cusotm Callback Tab"
                  tabProps={{
                    onExpand: () =>
                      console.log('tab expanded with custom callback'),
                    onCollapse: () =>
                      console.log('tab collapsed with custom callback')
                  }}
                >
                  <h2>This tab has callbacks set to self</h2>
                  <p>
                    It will trigger it's own callbacks as well as the accordion
                    ones
                  </p>
                </div>
                <div disabled tabTitle={`Another tab`}>
                  <p>This is some content</p>
                </div>
                <div tabTitle="third tab">
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/320/200" alt="image" />
                </div>
                <div tabTitle="forth tab">
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
