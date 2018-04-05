/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import Accordion from '../../src/Accordion';

const customTabTitle = (tabDOMProps, tabDetailsProps) => {
  let classnames = `${tabDOMProps.className} custom-class-name`;
  const odd = !!(tabDetailsProps.index % 2);
  const heightVariation = odd ? 52 : 24;
  const isThirdTab = tabDetailsProps.index === 3;

  return (
    <div
      {...tabDOMProps}
      style={{
        ...tabDOMProps.style,
        height: heightVariation,
        backgroundColor: odd ? '#333' : '#000'
      }}
      className={classnames}
    />
  );
};

export default class TabTitleOptions extends Component {
  render() {
    return (
      <div>
        <h2>Tab Title Options</h2>
        <p>Tabs can be configured to have different stylies.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ width: 360, padding: 10 }}>
            <h3>Tab Title ellipsis</h3>
            <p>
              Can be applied via tabStyle, tabTitleEllipsis on accordion, or
              tabTitleEllipsis on each tab
            </p>
            <div style={{ height: 420 }}>
              <Accordion defaultActiveIndex={0} tabTitleEllipsis={false}>
                <div
                  tabProps={{ tabTitleEllipsis: true }}
                  tabTitle="Elipsis enabled by tab prop Dolorem ipsam minus consequatur occaecati voluptatibus. Alias corporis facilis tempora illo sint et. Harum dolor ut saepe qui qui pariatur. Qui est quidem quia et sed id aut et. Facere enim ipsa ut sapiente adipisci quia sint"
                >
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div tabTitle="Elipsis is disabled on this one ipsam minus consequatur occaecati voluptatibus. Alias">
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div tabTitle="third tab">
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div tabTitle="forth tab">
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>
          <div style={{ width: 360, padding: 10 }}>
            <h3>Disabled tabs</h3>
            <p>
              Disabled bool prop will make tabs un-expandable. The prop is
              dynamic.
            </p>
            <div style={{ height: 420 }}>
              <Accordion defaultActiveIndex={2}>
                <div
                  disabled
                  tabProps={{
                    titleEllipsis: true
                  }}
                  tabTitle="Disabled by tab props prop Dolorem ipsam minus consequatur occaecati voluptatibus. Alias corporis facilis tempora illo sint et. Harum dolor ut saepe qui qui pariatur. Qui est quidem quia et sed id aut et. Facere enim ipsa ut sapiente adipisci quia sint"
                >
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div
                  disabled
                  tabProps={{ tabTitleEllipsis: false }}
                  tabTitle="Elipsis is disabled on this one ipsam minus consequatur occaecati voluptatibus. Alias"
                >
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div tabTitle="third tab">
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div disabled tabTitle="forth tab">
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>

          <div style={{ width: 360, padding: 10 }}>
            <h3>TabTitleStyle</h3>
            <p>
              Can be applied to accordion and individual tabs. It styles the
              wrapper that contains both the title and the icon.
            </p>
            <div style={{ height: 420 }}>
              <Accordion
                tabTitleStyle={{
                  border: '2px solid rgba(0,0,255,.2)',
                  fontSize: 9,
                  padding: 20
                }}
                titleStyle={{
                  textShadow: '1px 1px 1px blue'
                }}
              >
                <div
                  tabProps={{
                    titleEllipsis: true,
                    tabTitleStyle: {
                      padding: 10,
                      backgroundColor: '#444'
                    },
                    titleStyle: {
                      color: 'lightgreen',
                      textShadow: '1px 1px 1px #000'
                    }
                  }}
                  tabTitle="Title 1"
                >
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div
                  tabProps={{
                    tabTitleEllipsis: false
                  }}
                  tabTitle="Title 2"
                >
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div tabTitle="Title 3">
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/300/200" alt="image" />
                </div>
                <div disabled tabTitle="Title 4">
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>

          <div style={{ width: 360, padding: 10 }}>
            <h3>TabTitleAlign</h3>
            <p>Can be center, start or end.</p>
            <div style={{ height: 420 }}>
              <Accordion defaultActiveIndex={0}>
                <div
                  tabProps={{ titleAlign: 'center' }}
                  tabTitle={`tabProps.titleAlign='center'`}
                >
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div
                  tabProps={{ titleAlign: 'start' }}
                  tabTitle={`tabProps.titleAlign='start'`}
                >
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div
                  tabProps={{ titleAlign: 'end' }}
                  tabTitle={`tabProps.titleAlign='end'`}
                >
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div
                  tabProps={{ titleAlign: 'left' }}
                  tabTitle={`tabProps.titleAlign='left'`}
                >
                  <p>This is some content</p>
                </div>
                <div
                  tabProps={{ titleAlign: 'right' }}
                  tabTitle={`tabProps.titleAlign='right'`}
                >
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>

          <div style={{ width: 360, padding: 10 }}>
            <h3>TabTitleVerticalAlign</h3>
            <p>
              Can be middle, top or bottom. Useful when setting a specific
              tabTitleStyle height. Defaults to middle.
            </p>
            <div style={{ height: 420 }}>
              <Accordion
                defaultActiveIndex={0}
                tabTitleStyle={{ height: 70 }}
                tabTitleVerticalAlign="top"
              >
                <div tabTitle={`tab title inherting from accordion (top)`}>
                  <h2>Hello World</h2>
                  <p>
                    This accordion has tabTitleVerticalAlign='top' so all tabs
                    inherit that, unless they overwrite it with tabProps.
                  </p>
                </div>
                <div
                  tabProps={{ titleVerticalAlign: 'middle' }}
                  tabTitle={`tabProps.tabTitleVerticalAlign='middle'`}
                >
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div
                  tabProps={{ titleVerticalAlign: 'bottom' }}
                  tabTitle={`tabProps.tabTitleVerticalAlign='bottom'`}
                >
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div
                  tabProps={{ titleVerticalAlign: 'middle' }}
                  tabTitle={`tabProps.tabTitleVerticalAlign='middle'`}
                >
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>

          <div style={{ width: 360, padding: 10 }}>
            <h3>expandToolPosition</h3>
            <p>Can be start or end.</p>
            <div style={{ height: 420 }}>
              <Accordion defaultActiveIndex={0} expandToolPosition="start">
                <div
                  tabProps={{ titleAlign: 'center' }}
                  tabTitle={`tabProps.titleAlign='center'`}
                >
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div
                  tabProps={{ titleAlign: 'start' }}
                  tabTitle={`tabProps.titleAlign='start'`}
                >
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div
                  tabProps={{ titleAlign: 'end' }}
                  tabTitle={`tabProps.titleAlign='end'`}
                >
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div
                  tabProps={{ titleAlign: 'left' }}
                  tabTitle={`tabProps.titleAlign='left'`}
                >
                  <p>This is some content</p>
                </div>
                <div
                  tabProps={{ titleAlign: 'right' }}
                  tabTitle={`tabProps.titleAlign='right'`}
                >
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>

          <div style={{ width: 360, padding: 10 }}>
            <h3>renderTabTitle</h3>
            <p>renderTabTitle can render tab titles</p>
            <div style={{ height: 420 }}>
              <Accordion defaultActiveIndex={0} renderTabTitle={customTabTitle}>
                <div tabTitle={`Title 1`}>
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div tabTitle={`Title 2`}>
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div tabTitle={`Title 3`}>
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div tabTitle={`Title 4`}>
                  <p>This is some content</p>
                </div>
                <div tabTitle={`Title 5`}>
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>

          <div style={{ width: 360, padding: 10 }}>
            <h3>expandOnToolOnly</h3>
            <p>Allows toggle only on icon</p>
            <div style={{ height: 420 }}>
              <Accordion defaultActiveIndex={0} expandOnToolOnly>
                <div tabTitle={`Title`}>
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div tabTitle={`Title`}>
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>

          <div style={{ width: 360, padding: 10 }}>
            <h3>activateEvent</h3>
            <p>can be onMouseDown or onMouseEnter</p>
            <div style={{ height: 420 }}>
              <Accordion defaultActiveIndex={0} activateEvent="onMouseEnter">
                <div tabTitle={`Title`}>
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div tabTitle={`Title`}>
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>

          <div style={{ width: 720, padding: 10 }}>
            <h3>expandTool</h3>
            <p>
              can be a function, and be responsible for all animation and
              handling
            </p>
            <div style={{ height: 420 }}>
              <Accordion
                defaultActiveIndex={0}
                horizontal
                expandTool={params => {
                  let style = {
                    opacity: 1,
                    transition: 'all .5s ease-in-out'
                  };
                  // console.log(params);
                  if (params.expanded) {
                    style.opacity = 0;
                  }
                  return (
                    <div style={{ display: 'flex' }}>
                      <svg
                        style={style}
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
                          fill="#fff"
                        />
                      </svg>
                      <span style={{ fontSize: 11 }}>{params.index}</span>
                    </div>
                  );
                }}
              >
                <div tabTitle={`Title`}>
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div tabTitle={`Title`}>
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>

          <div style={{ width: 360, padding: 10 }}>
            <h3>expandTool = null</h3>
            <p>can be null, disabling all expand tools</p>
            <div style={{ height: 420 }}>
              <Accordion defaultActiveIndex={0} expandTool={null}>
                <div tabTitle={`Title`}>
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div tabTitle={`Title`}>
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                </div>
              </Accordion>
            </div>
          </div>

          <div style={{ width: 360, padding: 10 }}>
            <h3>expandTool = string</h3>
            <p>can be string, rendering instead of icon</p>
            <div style={{ height: 420 }}>
              <Accordion defaultActiveIndex={0} expandTool={'ok'}>
                <div tabTitle={`Title`}>
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div tabTitle={`Title`}>
                  <h2>More content</h2>
                  <p>tabTitleEllipsis=false</p>
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                  <img src="http://lorempixel.com/290/170" alt="image" />
                </div>
                <div tabTitle={`Title`}>
                  <p>This is some content</p>
                </div>
                <div tabTitle={`Title`}>
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
