import React, { Component } from 'react';
import Accordion from '../../src/Accordion';

export default class Methods extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeIndex: 1,
      activeIndexText: '[1]'
    };
  }

  onExpandAt() {
    const { expandAtInput, accordion } = this.refs;
    let idx = parseInt(expandAtInput.value, 10);
    accordion.expandAt(idx);
  }

  onCollapseAt() {
    const { collapseAtInput, accordion } = this.refs;
    let idx = parseInt(collapseAtInput.value, 10);
    accordion.collapseAt(idx);
  }

  onExpandAll() {
    this.refs.accordion.expandAll();
  }

  onCollapseAll() {
    this.refs.accordion.collapseAll();
  }

  updateActiveIndex() {
    const value = this.refs.boundActiveIndex.value;
    this.setState({
      activeIndex: JSON.parse(value)
    });
  }

  render() {
    return (
      <div>
        <h2>ActiveIndex (controlled component)</h2>
        <p>
          Controlling programatically which tabs are open and which are closed
        </p>
        <div style={{ display: 'flex', maxWidth: 860, flexWrap: 'wrap' }}>
          <div style={{ width: 540, padding: 10 }}>
            <div style={{ height: 420, overflow: 'auto', padding: 1 }}>
              <Accordion
                multiExpand
                collapsible
                activeIndex={this.state.activeIndex}
                ref="accordion"
                onExpand={idx => console.log('onExpand', idx)}
                onCollapse={idx => console.log('onCollapse', idx)}
                onActivate={params => console.log('onActivate', params)}
              >
                <div tabTitle="Tab 1">
                  <p>
                    Dolorem ipsam minus consequatur occaecati voluptatibus.
                    Alias corporis facilis tempora illo sint et. Harum dolor ut
                    saepe qui qui pariatur. Qui est quidem quia et sed id aut
                    et. Facere enim ipsa ut sapiente adipisci quia sint.
                  </p>
                </div>
                <div tabTitle="Tab 2">
                  <h2>Tab content</h2>
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
          <div style={{ width: 300 }}>
            <div style={{ display: 'flex' }}>
              <button onClick={() => this.updateActiveIndex()}>
                ActiveIndex
              </button>
              <input
                ref="boundActiveIndex"
                onChange={ev => {
                  this.setState({ activeIndexText: ev.target.value });
                }}
                style={{ width: 100 }}
                value={this.state.activeIndexText}
              />
            </div>
            <p>Should not work if active index is set</p>
            <div style={{ display: 'flex' }}>
              <button onClick={() => this.onExpandAll()}>Expand All</button>
            </div>
            <div style={{ display: 'flex' }}>
              <button onClick={() => this.onCollapseAll()}>Collpase All</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
