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
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import cleanProps from '../../common/cleanProps';
import DropdownButton from '../../DropdownButton';
import Button from '../../Button';
import join from '../../common/join';

class ZippySplitButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      expanded: props.defaultExpanded
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.onExpandedChange = this.onExpandedChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  onExpandedChange(expanded) {
    this.props.onExpandedChange(expanded);

    if (this.props.expanded === undefined) {
      this.setState({
        expanded
      });
    }
  }

  getExpanded() {
    return this.props.expanded === undefined
      ? this.state.expanded
      : this.props.expanded;
  }

  handleBlur(event) {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      focused: false
    });

    this.props.onBlur(event);
  }
  handleFocus(event) {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      focused: true
    });

    this.props.onFocus(event);
  }
  render() {
    const { props } = this;

    const className = join(
      props.rootClassName,
      props.className,
      props.rtl ? `${props.rootClassName}--rtl` : `${props.rootClassName}--ltr`,
      this.state.focused && `${props.rootClassName}--focused`,
      this.getExpanded() && `${props.rootClassName}--expanded`,
      props.disabled && `${props.rootClassName}--disabled`,
      props.theme && `${props.rootClassName}--theme-${props.theme}`
    );

    return (
      <div
        {...cleanProps(props, ZippySplitButton.propTypes)}
        className={className}
      >
        <Button {...this.getCommonProps()} {...this.getButtonProps()} />
        <DropdownButton
          {...this.getCommonProps()}
          {...this.getDropdownButtonProps()}
        />
      </div>
    );
  }

  getCommonProps() {
    const { props } = this;

    return {
      disabled: props.disabled,
      rtl: props.rtl,
      theme: props.theme,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    };
  }

  getButtonProps() {
    const { props } = this;

    return {
      tagName: props.tagName,
      icon: props.icon,
      iconPosition: props.iconPosition || props.arrowPosition,
      ...props.buttonProps,
      onClick: (...args) => {
        props.onClick(...args);
        if (typeof props.buttonProps === 'function') {
          props.buttonProps.onClick(...args);
        }
      },

      children: props.children,
      className: join(
        `${props.rootClassName}__button`,
        props.buttonProps.className
      )
    };
  }

  getDropdownButtonProps() {
    const { props } = this;
    return {
      ...props.dropdownButtonWrapperProps,
      getAlignNode: () => {
        const node = findDOMNode(this);

        return node;
      },
      onClick: props.onDropdownButtonClick,
      onExpandedChange: this.onExpandedChange,
      items: props.items,
      expanded: props.expanded,
      defaultExpanded: props.defaultExpanded,
      onMenuClick: props.onMenuClick,
      menu: props.menu,
      buttonProps: props.dropdownButtonProps,
      menuProps: props.menuProps,
      renderMenu: props.renderMenu,
      className: join(
        `${props.rootClassName}__dropdown-button`,
        props.menuProps.className
      )
    };
  }
}

function emptyFn() {}

ZippySplitButton.defaultProps = {
  rootClassName: 'zippy-react-toolkit-split-button',
  theme: 'default',
  onClick: emptyFn,
  onDropdownButtonClick: emptyFn,
  onMenuClick: emptyFn,
  onFocus: emptyFn,
  onBlur: emptyFn,
  onExpandedChange: emptyFn,
  items: [],
  buttonProps: {},
  menuProps: {},
  defaultExpanded: false,
  arrowPosition: 'end',
  rtl: false,
  isZippyButton: true
};

ZippySplitButton.propTypes = {
  rtl: PropTypes.bool,
  isZippyButton: PropTypes.bool,
  theme: PropTypes.string,
  tagName: PropTypes.string,
  renderMenu: PropTypes.func,
  theme: PropTypes.string,
  rootClassName: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right', 'start', 'end']),
  arrowPosition: PropTypes.oneOf(['left', 'right', 'start', 'end']),
  buttonProps: PropTypes.object,
  dropdownButtonWrapperProps: PropTypes.object,
  dropdownButtonProps: PropTypes.object,
  disabled: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onDropdownButtonClick: PropTypes.func,
  onMenuClick: PropTypes.func,
  onClick: PropTypes.func,
  menuProps: PropTypes.object,
  items: PropTypes.array,
  menu: PropTypes.func,
  expanded: PropTypes.bool,
  pressed: PropTypes.bool,
  defaultExpanded: PropTypes.bool
};

export default ZippySplitButton;
