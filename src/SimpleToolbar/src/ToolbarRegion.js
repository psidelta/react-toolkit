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

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';

import cleanProps from '@zippytech/react-clean-props';
import { Item } from '@zippytech/react-flex';

import join from './join';

const CLASS_NAME = 'zippy-react-simple-toolbar__region';

const JUSTIFY_MAP = {
  start: 'flex-start',
  left: 'flex-start',
  end: 'flex-end',
  right: 'flex-end'
};

const TEXT_ALIGN = { start: 'start', left: 'start', right: 'end', end: 'end' };

const FLEX_FLOW = { horizontal: 'row', vertical: 'column' };

export default class ZippyToolbarRegion extends React.Component {
  render() {
    const { props } = this;

    const justifyContent = JUSTIFY_MAP[props.align] || 'center';
    const textAlign = TEXT_ALIGN[props.align] || 'center';
    const flexFlow = FLEX_FLOW[props.orientation] || 'row';

    const className = join(
      CLASS_NAME,
      props.align && `${CLASS_NAME}--align-${props.align}`,
      props.theme && `${CLASS_NAME}--theme-${props.theme}`,
      textAlign && `${CLASS_NAME}--text-align-${textAlign}`,
      props.orientation && `${CLASS_NAME}--orientation-${props.orientation}`
    );

    return (
      <Item
        {...cleanProps(props, ZippyToolbarRegion.propTypes)}
        className={className}
        justifyContent={justifyContent}
        flexFlow={flexFlow}
      />
    );
  }
}

ZippyToolbarRegion.propTypes = {
  align: PropTypes.oneOf(['start', 'end', 'center', 'middle', 'left', 'right']),
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  theme: PropTypes.string,
  isToolbarRegion: PropTypes.bool
};

ZippyToolbarRegion.defaultProps = { isToolbarRegion: true };
