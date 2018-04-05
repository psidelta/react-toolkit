/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import Accordion from '../../src/Accordion';

export default class TabTitleOptions extends Component {
  render() {
    return (
      <div>
        <h2>Tab Content Options</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ width: 360, padding: 10 }}>
            <h3>Tab Styles</h3>
            <p>
              tabStyle with yellow background is applied to the wrapper of
              content
            </p>
            <div style={{ height: 420 }}>
              <Accordion
                defaultActiveIndex={0}
                tabStyle={{
                  backgroundColor: 'yellow',
                  border: '2px solid darkblue',
                  padding: 5
                }}
              >
                <div tabTitle="Elipsis enabled by tab prop">
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>

                <div
                  tabTitle="Elipsis is disabled on this one ipsam minus consequatur occaecati voluptatibus. Alias"
                  tabProps={{
                    titleEllipsis: false
                  }}
                >
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>

                <div
                  tabTitle="Third tab has simple style"
                  style={{ backgroundColor: 'red' }}
                  tabProps={{
                    titleAlign: 'center'
                  }}
                >
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>

                <div
                  style={{ backgroundColor: 'green' }}
                  tabProps={{
                    stretchTabContent: true,
                    titleAlign: 'right'
                  }}
                  tabTitle="Last tab has simple style and stretchTabContent"
                >
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
