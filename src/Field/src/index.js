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

class ZippyField extends Component {
  constructor(props) {
    super(props);

    this.ref = ref => {
      this.input = ref;
    };

    this.onChange = this.onChange.bind(this);
  }
  render() {
    const inputProps = { ...this.props };
    delete inputProps.stopChangePropagation;

    return <input {...inputProps} onChange={this.onChange} ref={this.ref} />;
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  onChange(event) {
    if (this.props.stopChangePropagation) {
      event.stopPropagation();
    }
    this.props.onChange(event.target.value, event);
  }

  getNode() {
    return this.input;
  }
}

ZippyField.propTypes = {
  type: PropTypes.string,
  stopChangePropagation: PropTypes.bool
};

ZippyField.defaultProps = {
  stopChangePropagation: true,
  onChange: () => {},
  type: 'text'
};

export default ZippyField;
