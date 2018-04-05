/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import Accordion from '../../src/Accordion';

export default class Intro extends Component {
  render() {
    return (
      <div>
        <h2>Basic vertical accordion</h2>
        <p>
          Basic vertical accordion, without stretching, because the parent
          contains other elements and does not have a fixed or computed hieght
        </p>
        <div style={{ maxWidth: 360 }}>
          <Accordion
            style={{ border: '3px solid darkgray' }}
            className="custom-class-name"
          >
            <div tabTitle="Dolorem ipsam minus consequatur occaecati voluptatibus. Alias corporis facilis tempora illo sint et. Harum dolor ut saepe qui qui pariatur. Qui est quidem quia et sed id aut et. Facere enim ipsa ut sapiente adipisci quia sint">
              <p>
                Dolorem ipsam minus consequatur occaecati voluptatibus. Alias
                corporis facilis tempora illo sint et. Harum dolor ut saepe qui
                qui pariatur. Qui est quidem quia et sed id aut et. Facere enim
                ipsa ut sapiente adipisci quia sint.
              </p>
            </div>
            <div
              tabProps={{
                title: 'TITLE Comming from tabProps'
              }}
            >
              <h2>More content</h2>
              <p>This is some content</p>
            </div>
            <div
              tabProps={{
                title: 'TITLE from tabProps, disabled via tabProps',
                disabled: true
              }}
            >
              <p>This is some content</p>
            </div>
            <div tabTitle={() => 'tab title as a function'}>
              <p>This is some content</p>
              <img src="http://lorempixel.com/320/200" alt="image" />
            </div>
            <div tabTitle="forth tab">
              <p>This is some content</p>
            </div>
          </Accordion>
        </div>
        <div>
          <label htmlFor="focusMeNext">Focus after accordion</label>
          <input id="focusMeNext" type="text" name="focusMeNext" />
        </div>
        <h2>Basic vertical accordion, no default active index</h2>
        <p>
          We can disable active index by setting it to null. We can combine
          collapsible=false with defaultActiveIndex=null and get collapsed
          acocrdions by default and also have the ability to collapse them
          afterwards.
        </p>
        <div style={{ display: 'flex', width: 360 * 2, margin: '0 auto' }}>
          <div style={{ height: 500, padding: 2, width: 360 }}>
            <Accordion collapsible={true} defaultActiveIndex={null}>
              <div tabTitle="Dolorem ipsam minus consequatur occaecati voluptatibus. Alias corporis facilis tempora illo sint et. Harum dolor ut saepe qui qui pariatur. Qui est quidem quia et sed id aut et. Facere enim ipsa ut sapiente adipisci quia sint">
                <p>
                  Dolorem ipsam minus consequatur occaecati voluptatibus. Alias
                  corporis facilis tempora illo sint et. Harum dolor ut saepe
                  qui qui pariatur. Qui est quidem quia et sed id aut et. Facere
                  enim ipsa ut sapiente adipisci quia sint.
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
              </div>
              <div tabTitle="second tab">
                <h2>More content</h2>
                <p>This is some content</p>
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
              </div>
              <div tabTitle={`Another tab`}>
                <p>This is some content</p>
              </div>
              <div
                tabTitle="third tab"
                tabProps={{
                  expandTool: false
                }}
              >
                <p>This is some content</p>
                <img src="http://lorempixel.com/320/200" alt="image" />
              </div>
              <div tabTitle="forth tab">
                <p>This is some content</p>
                <div style={{ height: 200 }}>
                  <Accordion defaultActiveIndex={1}>
                    <div tabTitle="Accordion inside accordion">
                      Because why not
                    </div>
                    <div tabTitle="Second tab">
                      Tabs can have react components
                    </div>
                  </Accordion>
                </div>
              </div>
            </Accordion>
          </div>
          <Accordion
            style={{ height: 500, width: 360, padding: 2, overflow: 'auto' }}
            multiExpand
            defaultActiveIndex={null}
            collapsible
          >
            <div tabTitle="Multi expand no default index">
              <p>
                Dolorem ipsam minus consequatur occaecati voluptatibus. Alias
                corporis facilis tempora illo sint et. Harum dolor ut saepe qui
                qui pariatur. Qui est quidem quia et sed id aut et. Facere enim
                ipsa ut sapiente adipisci quia sint.
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
                accusantium sint at neque voluptatem qui et cupiditate. Nesciunt
                sed unde aperiam aut. Sed esse veritatis dolorum minima. Quae
                quibusdam delectus itaque totam ipsum adipisci et. Iusto
                consequuntur quas provident distinctio repellendus.
              </p>
            </div>
            <div tabTitle="second tab">
              <h2>More content</h2>
              <p>This is some content</p>
              <p>
                Repellendus dolores fuga asperiores. Labore et voluptates
                perferendis. Temporibus quaerat quia aspernatur illo et itaque
                ratione. Saepe earum accusamus aut dolorem. Numquam excepturi
                enim aperiam nihil eaque. Adipisci optio adipisci et velit
                nulla.
              </p>
              <p>
                Voluptas odio voluptatibus eveniet vitae earum. Ducimus
                accusantium sint at neque voluptatem qui et cupiditate. Nesciunt
                sed unde aperiam aut. Sed esse veritatis dolorum minima. Quae
                quibusdam delectus itaque totam ipsum adipisci et. Iusto
                consequuntur quas provident distinctio repellendus.
              </p>
            </div>
            <div tabTitle={`Another tab`}>
              <p>This is some content</p>
            </div>
            <div tabTitle="third tab">
              <p>This is some content</p>
              <img src="http://lorempixel.com/320/200" alt="image" />
            </div>
            <div tabTitle="forth tab">
              <p>This is some content</p>
              <div style={{ height: 200 }}>
                <Accordion defaultActiveIndex={1}>
                  <div tabTitle="Accordion inside accordion">
                    Because why not
                  </div>
                  <div tabTitle="Second tab">
                    Tabs can have react components
                  </div>
                </Accordion>
              </div>
            </div>
          </Accordion>
        </div>

        <h2>Horizontal accordion</h2>
        <p>
          Requries a parent with height computed by something else not by its
          content, like a flex layout, aboslute position, fixed height.
        </p>
        <div style={{ height: 420, width: 660, margin: '0 auto' }}>
          <Accordion horizontal transitionFunction="ease-in-out">
            <div tabTitle="Dolorem ipsam minus consequatur occaecati voluptatibus. Alias corporis facilis tempora illo sint et. Harum dolor ut saepe qui qui pariatur. Qui est quidem quia et sed id aut et. Facere enim ipsa ut sapiente adipisci quia sint">
              <p>
                Dolorem ipsam minus consequatur occaecati voluptatibus. Alias
                corporis facilis tempora illo sint et. Harum dolor ut saepe qui
                qui pariatur. Qui est quidem quia et sed id aut et. Facere enim
                ipsa ut sapiente adipisci quia sint.
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
                accusantium sint at neque voluptatem qui et cupiditate. Nesciunt
                sed unde aperiam aut. Sed esse veritatis dolorum minima. Quae
                quibusdam delectus itaque totam ipsum adipisci et. Iusto
                consequuntur quas provident distinctio repellendus.
              </p>
            </div>
            <div tabTitle="second tab">
              <h2>More content</h2>
              <p>This is some content</p>
              <p>
                Repellendus dolores fuga asperiores. Labore et voluptates
                perferendis. Temporibus quaerat quia aspernatur illo et itaque
                ratione. Saepe earum accusamus aut dolorem. Numquam excepturi
                enim aperiam nihil eaque. Adipisci optio adipisci et velit
                nulla.
              </p>
              <p>
                Voluptas odio voluptatibus eveniet vitae earum. Ducimus
                accusantium sint at neque voluptatem qui et cupiditate. Nesciunt
                sed unde aperiam aut. Sed esse veritatis dolorum minima. Quae
                quibusdam delectus itaque totam ipsum adipisci et. Iusto
                consequuntur quas provident distinctio repellendus.
              </p>
            </div>
            <div tabTitle={`Another tab`}>
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

        <h2>Horizontal accordion multiExpand</h2>
        <div style={{ height: 420, width: 660, margin: '0 auto' }}>
          <Accordion
            multiExpand
            horizontal
            transitionFunction="ease-in-out"
            defaultActiveIndex={[0, 1]}
            tabStyle={{
              width: 320
            }}
          >
            <div tabTitle="Dolorem ipsam">
              <p>
                Dolorem ipsam minus consequatur occaecati voluptatibus. Alias
                corporis facilis tempora illo sint et. Harum dolor ut saepe qui
                qui pariatur. Qui est quidem quia et sed id aut et. Facere enim
                ipsa ut sapiente adipisci quia sint.
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
                accusantium sint at neque voluptatem qui et cupiditate. Nesciunt
                sed unde aperiam aut. Sed esse veritatis dolorum minima. Quae
                quibusdam delectus itaque totam ipsum adipisci et. Iusto
                consequuntur quas provident distinctio repellendus.
              </p>
            </div>
            <div tabTitle="second tab">
              <h2>More content</h2>
              <p>This is some content</p>
              <p>
                Repellendus dolores fuga asperiores. Labore et voluptates
                perferendis. Temporibus quaerat quia aspernatur illo et itaque
                ratione. Saepe earum accusamus aut dolorem. Numquam excepturi
                enim aperiam nihil eaque. Adipisci optio adipisci et velit
                nulla.
              </p>
              <p>
                Voluptas odio voluptatibus eveniet vitae earum. Ducimus
                accusantium sint at neque voluptatem qui et cupiditate. Nesciunt
                sed unde aperiam aut. Sed esse veritatis dolorum minima. Quae
                quibusdam delectus itaque totam ipsum adipisci et. Iusto
                consequuntur quas provident distinctio repellendus.
              </p>
            </div>
            <div tabTitle={`Another tab`}>
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

        <h2>RTL Support</h2>
        <p>
          the RTL prop affects all floated and flex positioned elements. The
          layout in the next instance is changed completely by the direction:rtl
          css style, with the exception of the positioning of the roateted tabs
        </p>
        <div style={{ height: 420, width: 660, margin: '0 auto' }}>
          <Accordion multiExpand horizontal rtl defaultActiveIndex={[1, 3]}>
            <div tabTitle="Dolorem ipsam">
              <p>
                Dolorem ipsam minus consequatur occaecati voluptatibus. Alias
                corporis facilis tempora illo sint et. Harum dolor ut saepe qui
                qui pariatur. Qui est quidem quia et sed id aut et. Facere enim
                ipsa ut sapiente adipisci quia sint.
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
                accusantium sint at neque voluptatem qui et cupiditate. Nesciunt
                sed unde aperiam aut. Sed esse veritatis dolorum minima. Quae
                quibusdam delectus itaque totam ipsum adipisci et. Iusto
                consequuntur quas provident distinctio repellendus.
              </p>
            </div>
            <div tabTitle="second tab">
              <h2>More content</h2>
              <p>This is some content</p>
              <p>
                Repellendus dolores fuga asperiores. Labore et voluptates
                perferendis. Temporibus quaerat quia aspernatur illo et itaque
                ratione. Saepe earum accusamus aut dolorem. Numquam excepturi
                enim aperiam nihil eaque. Adipisci optio adipisci et velit
                nulla.
              </p>
              <p>
                Voluptas odio voluptatibus eveniet vitae earum. Ducimus
                accusantium sint at neque voluptatem qui et cupiditate. Nesciunt
                sed unde aperiam aut. Sed esse veritatis dolorum minima. Quae
                quibusdam delectus itaque totam ipsum adipisci et. Iusto
                consequuntur quas provident distinctio repellendus.
              </p>
            </div>
            <div tabTitle={`Another tab`}>
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
        <div style={{ height: 420, width: 660, margin: '10px auto' }}>
          <Accordion rtl defaultActiveIndex={1}>
            <div tabTitle="Dolorem ipsam">
              <p>
                Dolorem ipsam minus consequatur occaecati voluptatibus. Alias
                corporis facilis tempora illo sint et. Harum dolor ut saepe qui
                qui pariatur. Qui est quidem quia et sed id aut et. Facere enim
                ipsa ut sapiente adipisci quia sint.
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
                accusantium sint at neque voluptatem qui et cupiditate. Nesciunt
                sed unde aperiam aut. Sed esse veritatis dolorum minima. Quae
                quibusdam delectus itaque totam ipsum adipisci et. Iusto
                consequuntur quas provident distinctio repellendus.
              </p>
            </div>
            <div tabTitle="second tab">
              <h2>More content</h2>
              <p>This is some content</p>
              <p>
                Repellendus dolores fuga asperiores. Labore et voluptates
                perferendis. Temporibus quaerat quia aspernatur illo et itaque
                ratione. Saepe earum accusamus aut dolorem. Numquam excepturi
                enim aperiam nihil eaque. Adipisci optio adipisci et velit
                nulla.
              </p>
              <p>
                Voluptas odio voluptatibus eveniet vitae earum. Ducimus
                accusantium sint at neque voluptatem qui et cupiditate. Nesciunt
                sed unde aperiam aut. Sed esse veritatis dolorum minima. Quae
                quibusdam delectus itaque totam ipsum adipisci et. Iusto
                consequuntur quas provident distinctio repellendus.
              </p>
            </div>
            <div tabTitle={`Another tab`}>
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
    );
  }
}
