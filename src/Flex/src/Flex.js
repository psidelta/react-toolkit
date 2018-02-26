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
import props2className from './props2className';
import cleanup from './cleanup';

import shouldComponentUpdate from './shouldComponentUpdate';

class ZippyFlex extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = shouldComponentUpdate(this, nextProps, nextState);

    return shouldUpdate;
  }
  render() {
    const props = this.props;
    const className = join('zippy-react-toolkit-flex', props2className(props));

    const allProps = { ...props };

    cleanup(allProps);

    allProps.className = className;

    if (props.factory) {
      return props.factory(allProps);
    }

    return <div {...allProps} />;
  }
}

ZippyFlex.defaultProps = {
  row: true,
  wrap: true,
  alignItems: 'center',
  display: 'flex'
};

ZippyFlex.propTypes = {
  shouldComponentUpdate: PropTypes.func,
  flex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  display: PropTypes.oneOf(['flex', 'inline-flex']),
  inline: PropTypes.bool,
  reverse: PropTypes.bool,
  row: PropTypes.bool,
  column: PropTypes.bool,
  wrap: PropTypes.bool,
  alignItems: PropTypes.string,
  alignContent: PropTypes.string,
  justifyContent: PropTypes.string
};

export default ZippyFlex;
