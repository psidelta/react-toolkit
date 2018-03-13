import React from 'react';
import { findDOMNode } from 'react-dom';

import { render, simulateMouseEvent } from '../../../common/testUtils';

import PaginationToolbar from '../PaginationToolbar';

const getPageInput = toolbar =>
  findDOMNode(toolbar).querySelector(
    'input.zippy-react-pagination-toolbar__current-page'
  );

const getIcon = (iconName, toolbar) =>
  findDOMNode(toolbar).querySelector(
    `svg.zippy-react-pagination-toolbar__icon--named--${iconName}`
  );

const getIcons = toolbar => ({
  REFRESH: getIcon('REFRESH', toolbar),
  NEXT_PAGE: getIcon('NEXT_PAGE', toolbar),
  PREV_PAGE: getIcon('PREV_PAGE', toolbar),
  LAST_PAGE: getIcon('LAST_PAGE', toolbar),
  FIRST_PAGE: getIcon('FIRST_PAGE', toolbar)
});

describe('PaginationToolbar', () => {
  it('should work correctly with simple uncontrolled behavior', done => {
    let lastSkip = -1;
    let skipCalls = 0;

    const onSkipChange = skip => {
      lastSkip = skip;
      skipCalls++;
    };
    const toolbar = render(
      <PaginationToolbar
        totalCount={100}
        defaultLimit={10}
        defaultSkip={0}
        onSkipChange={onSkipChange}
      />
    );

    const pageInput = getPageInput(toolbar);

    expect(pageInput.value).to.equal('1');

    const { NEXT_PAGE } = getIcons(toolbar);

    simulateMouseEvent('click', NEXT_PAGE);
    expect(pageInput.value).to.equal('2');
    expect(lastSkip).to.equal(10);
    expect(skipCalls).to.equal(1);

    simulateMouseEvent('click', NEXT_PAGE);
    expect(pageInput.value).to.equal('3');
    expect(lastSkip).to.equal(20);
    expect(skipCalls).to.equal(2);

    toolbar.unmount();

    done();
  });

  it('should work correctly when on the last page', done => {
    let lastSkip = -1;
    let skipCalls = 0;

    const onSkipChange = skip => {
      lastSkip = skip;
      skipCalls++;
    };
    const toolbar = render(
      <PaginationToolbar
        totalCount={100}
        defaultLimit={10}
        defaultSkip={80}
        onSkipChange={onSkipChange}
      />
    );

    const pageInput = getPageInput(toolbar);

    expect(pageInput.value).to.equal('9');

    const { NEXT_PAGE, PREV_PAGE } = getIcons(toolbar);

    simulateMouseEvent('click', NEXT_PAGE);
    expect(pageInput.value).to.equal('10');
    expect(lastSkip).to.equal(90);
    expect(skipCalls).to.equal(1);

    // on another click do nothing, as there is no next page
    simulateMouseEvent('click', NEXT_PAGE);
    expect(pageInput.value).to.equal('10');
    expect(lastSkip).to.equal(90);
    expect(skipCalls).to.equal(1);

    // expect the next button have the disabled className
    expect(`${NEXT_PAGE.classList}`.indexOf('disabled') > 0).to.equal(true);

    // now to go page 5
    toolbar.gotoPage(5);
    expect(pageInput.value).to.equal('5');
    expect(lastSkip).to.equal(40);
    expect(skipCalls).to.equal(2);

    // now set limit to 25 and make sure we're on page 4
    toolbar.setPageSize(25);
    expect(pageInput.value).to.equal('4');
    expect(lastSkip).to.equal(75);
    expect(skipCalls).to.equal(3);

    simulateMouseEvent('click', PREV_PAGE);
    expect(pageInput.value).to.equal('3');
    expect(lastSkip).to.equal(50);
    expect(skipCalls).to.equal(4);

    toolbar.unmount();

    done();
  });

  it('should update current page from 0 to a value when totalCount goes from 0 to a value', done => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = { totalCount: 0 };
      }

      render() {
        return (
          <PaginationToolbar
            ref={t => {
              this.toolbar = t;
            }}
            totalCount={this.state.totalCount}
            defaultLimit={10}
            defaultSkip={0}
          />
        );
      }

      setTotalCount(c) {
        this.setState({ totalCount: c });
      }
    }

    const app = render(<Wrapper />);
    const toolbar = app.toolbar;

    const pageInput = getPageInput(toolbar);

    expect(pageInput.value).to.equal('0');

    app.setTotalCount(100);

    expect(pageInput.value).to.equal('1');

    app.unmount();

    done();
  });
});
