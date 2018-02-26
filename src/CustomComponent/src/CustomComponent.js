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
import PropTypes from 'prop-types';
import join from '../../common/join';
import cleanProps from '../../common/cleanProps';

class ZippyCustomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  render() {
    const { props } = this;
    const className = join(
      props.rootClassName,
      props.className,
      `${props.rootClassName}--theme-${props.theme}`
    );

    return (
      <div {...cleanProps(props, ZippyCustomComponent.propTypes)} className={className}>
        Custom Component
      </div>
    );
  }

  handleChange(color) {
    if (!this.isValueControlled()) {
      this.setState({ value: color });
    }

    this.props.onChange(color);
  }

  getValue() {
    return this.isValueControlled() ? this.props.value : this.state.value;
  }

  isValueControlled() {
    return this.props.value != null;
  }
}

function emptyFn() {}

ZippyCustomComponent.defaultProps = {
  theme: 'default',
  rootClassName: 'react-toolkit-custom-component'
};

ZippyCustomComponent.propTypes = {
  theme: PropTypes.string,
  rootClassName: PropTypes.string
};

export default ZippyCustomComponent;
