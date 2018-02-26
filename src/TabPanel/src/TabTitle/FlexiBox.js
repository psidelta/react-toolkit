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
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Component from '@zippytech/react-class';
import { NotifyResize } from '../../../NotifyResize';
import join from '../../../common/join';
import assign from '../../../common/assign';
import cleanProps from '../../../common/cleanProps';

const emptyFn = () => null;

export default class FlexiBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null
    };

    this.mounted = false;
  }

  render() {
    const { props } = this;
    const style = { ...props.style };

    if (!style.position || style.position === 'static') {
      style.position = 'relative';
    }

    const Factory = props.factory || 'div';
    const render = props.children;

    return (
      <Factory {...cleanProps(props, FlexiBox.propTypes)}>
        {render(this.state)}
        <NotifyResize key="resizer" onResize={this.onResize} notifyOnMount />
      </Factory>
    );
  }

  onResize({ width, height }) {
    if (!this.mounted) {
      this.mounted = true;
    }

    this.setState({
      width,
      height
    });
  }
}

FlexiBox.propTypes = {
  factory: PropTypes.func,
  children: PropTypes.func
};
