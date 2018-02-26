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
import Component from '@zippytech/react-class';
import assign from '../../common/assign';
import { Flex } from '../../Flex';
import join from '../../common/join';
import cleanProps from '../../common/cleanProps';
import bemFactory from './bemFactory';

export default class Body extends Component {
  render() {
    const { props } = this;
    const { rootClassName, style } = props;
    const className = join(
      props.className,
      rootClassName,
      `${rootClassName}--tab-position-${props.tabPosition}`,
      `${rootClassName}--orientation-${props.vertical
        ? 'vertical'
        : 'horizontal'}`,
      props.transition && `${rootClassName}--transition`,
      props.stretchTabContent && `${rootClassName}--stretch-tab-content`,
      props.stretchTabContent && `${rootClassName}--stretch-tab-content`,
      props.scrollTabContent && `${rootClassName}--scroll-tab-content`,
      props.transitioning &&
        props.transitioning !== true &&
        `${rootClassName}--transition-${props.transitioning == -1
          ? 'prev'
          : 'next'}`,
      props.transitionInProgress && `${rootClassName}--transitioning`
    );
    const content = props.renderContent(props.children);

    return (
      <Flex
        {...cleanProps(props, Body.propTypes)}
        row
        wrap={false}
        alignItems="start"
        flexGrow={1}
        flexShrink={1}
        flexBasis="auto"
        className={className}
        children={content}
      />
    );
  }
}

Body.propTypes = {
  renderContent: PropTypes.func,
  rootClassName: PropTypes.string,
  transitioning: PropTypes.number,
  isTabBody: PropTypes.bool,
  stretchTabContent: PropTypes.bool,
  scrollTabContent: PropTypes.bool,
  vertical: PropTypes.bool,
  transition: PropTypes.bool,
  activeIndex: PropTypes.number,
  tabPosition: PropTypes.string,
  transitionInProgress: PropTypes.bool
};

Body.defaultProps = {
  renderContent: children => children,
  isTabBody: true
};
