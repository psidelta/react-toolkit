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
import cleanProps from '../../common/cleanProps';

import { NotifyResize } from '../../NotifyResize';
import join from '../../common/join';

import ZippyArrowScroller from '../../ArrowScroller';
import DropdownOverflow from './DropdownOverflow';

class ZippyToolbar extends Component {
  constructor(props) {
    super(props);
    this.setRootRef = ref => {
      this.node = ref;
    };
  }

  render() {
    const { props } = this;
    const { className } = props;
    const rootProps = {
      useTransformOnScroll: props.useTransformOnScroll,
      ref: this.setRootRef,
      ...cleanProps(props, ZippyToolbar.propTypes),
      className,
      rtl: props.rtl,
      rootClassName: props.rootClassName
    };

    return props.overflowStrategy === 'scroll' ? (
      <ZippyArrowScroller {...rootProps} {...this.getScrollerProps()} />
    ) : (
      <DropdownOverflow {...rootProps} {...this.getDropdownOverflowProps()} />
    );
  }

  scrollIntoView(node) {
    return this.node && this.node.scrollIntoView(node);
  }

  getInstance() {
    return this.node;
  }

  getClassName() {
    const { props } = this;
    return join(
      this.props.className,
      props.rootClassName,
      props.theme && `${props.rootClassName}--theme-${props.theme}`,
      props.changeButtonStyles && `${props.rootClassName}--change-button-styles`
    );
  }

  getScrollerProps() {
    const { props } = this;
    return {
      vertical: props.vertical,
      scrollOnMouseEnter: props.scrollOnMouseEnter,
      arrowSize: props.arrowSize,
      className: join(
        this.getClassName(),
        `${props.rootClassName}--arrowScroller`
      )
    };
  }

  getDropdownOverflowProps() {
    const { props } = this;
    return {
      className: join(this.getClassName(), `${props.rootClassName}--dropdown`),
      dropdownButtonProps: props.dropdownButtonProps,
      renderDropdownButton: props.renderDropdownButton
    };
  }
}

ZippyToolbar.defaultProps = {
  rootClassName: 'zippy-react-toolkit-toolbar',
  vertical: false,
  useTransformOnScroll: false,
  changeButtonStyles: true,
  theme: 'default',
  overflowStrategy: 'scroll',
  rtl: false
};

ZippyToolbar.propTypes = {
  rtl: PropTypes.bool,
  rootClassName: PropTypes.string,
  changeButtonStyles: PropTypes.bool,
  scrollOnMouseEnter: PropTypes.bool,
  theme: PropTypes.string,
  arrowSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  ]),
  overflowStrategy: PropTypes.oneOf(['scroll', 'dropdown']),
  vertical: PropTypes.bool,
  dropdownButtonProps: PropTypes.object,
  renderDropdownButton: PropTypes.func,
  useTransformOnScroll: PropTypes.bool
};

const Separator = props => {
  return (
    <div
      {...props}
      className={join(
        props.className,
        'zippy-react-toolkit-toolbar__separator'
      )}
    />
  );
};

ZippyToolbar.Separator = Separator;

export { Separator };

export default ZippyToolbar;
