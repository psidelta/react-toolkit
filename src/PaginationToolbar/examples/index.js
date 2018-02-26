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

import React from 'react';
import { render } from 'react-dom';
import Component from '@zippytech/react-class';

import PaginationToolbar from '../src';
import TextInput from '../../TextInput';
import NumericInput from '../../NumericInput';
import ComboBox from '../../ComboBox';
import Button from '../../Button';

import '../../ArrowScroller/style/index.scss';
import ToolBar from '../../ToolBar';
import '../../ToolBar/style/index.scss';

import '../style/index.scss';
import '../../TextInput/style/index.scss';
import '../../ToolBar/style/index.scss';
import '../../NumericInput/style/index.scss';
import '../../ComboBox/style/index.scss';
import '../../Button/style/index.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skip: 0,
      limit: 10,
      totalCount: 11100
    };
  }
  onSkipChange(skip) {
    console.log(skip, 'skip');
    this.setState({
      skip
    });
  }

  onLimitChange(limit) {
    console.log(limit, 'limit');
    this.setState({
      limit
    });
  }

  render() {
    return (
      <div>
        <div
          id="constrain"
          style={{
            marginBottom: 20,
            paddingTop: '50vh',
            border: '1px dashed green',
            textAlign: 'center'
          }}
        >
          <Button>Cancel</Button>
          <Button theme="light">Cancel</Button>
          <PaginationToolbar
            limit={this.state.limit}
            skip={this.state.skip}
            remotePagination
            // style={{ width: '50vw' }}
            onSkipChange={this.onSkipChange}
            onLimitChange={this.onLimitChange}
            totalCount={this.state.totalCount}
            constrainTo={'#constrain'}
          />
        </div>
        <button onClick={this.setSkip}>set skip: 50</button>
        <button onClick={this.setLimit}>set limit: 25</button>
        <button onClick={this.setTotalCount}>set totalCount: 50</button>
      </div>
    );
  }

  setTotalCount() {
    this.setState({
      totalCount: 50
    });
  }

  setSkip() {
    this.setState({
      skip: 50
    });
  }

  setLimit() {
    this.setState({
      limit: 25
    });
  }

  renderToolbar(
    domProps,
    {
      gotoFirstPageIcon,
      start,
      end,
      totalCount,
      gotoLastPageIcon,
      currentPageInput,
      pageSizeCombo
    }
  ) {
    return (
      <div {...domProps}>
        Showing {start} - {end} of {totalCount}
        . {gotoFirstPageIcon} {gotoLastPageIcon} {currentPageInput}{' '}
        {pageSizeCombo}
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
