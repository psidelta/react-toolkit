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
import ToolBar from '../../ToolBar';
import DropdownButton from '../../DropdownButton';
import cleanProps from '../../common/cleanProps';

class ZippyMenuBar extends Component {
  constructor(props) {
    super(props);
    this.renderDropdownButton = this.renderDropdownButton.bind(this);
    this.setToolBarRef = ref => {
      this.toolBarNode = ref;
    };
  }
  render() {
    const { props } = this;

    const commonProps = {};
    if (props.overflowStrategy === 'scroll') {
      commonProps.dismissOnScroll = true;
    }

    return (
      <ToolBar
        {...cleanProps(props, ZippyMenuBar.propTypes)}
        ref={this.setToolBarRef}
        dropdownButtonProps={this.getDropdownButtonProps()}
        className={props.rootClassName}
        renderDropdownButton={this.renderDropdownButton}
      >
        {Array.isArray(props.items) &&
          props.items.map((item, index) => {
            const dropdownButtonProps = {
              ...commonProps,
              ...item,
              menuProps: this.getMenuProps(),
              key: index,
              children: item.label
            };

            return <DropdownButton {...dropdownButtonProps} />;
          })}
      </ToolBar>
    );
  }

  renderDropdownButton(config) {
    const { props } = this;
    const { domProps, overflowIndexes } = config;
    if (!overflowIndexes) {
      return;
    }
    if (props.overflowStrategy === 'scroll') {
      domProps.dismissOnScroll = true;
    }
    domProps.items = overflowIndexes.map(overflowIndex => {
      const item = this.props.items[overflowIndex];
      return {
        label: item.label,
        items: item.items
      };
    });

    if (typeof this.props.renderDropdownButton === 'function') {
      return this.props.renderDropdownButton(config);
    }
  }

  getDropdownButtonProps() {
    const menuPropsStyle =
      this.props.dropdownButtonProps &&
      this.props.dropdownButtonProps.menuProps &&
      this.props.dropdownButtonProps.menuProps.style;
    let menuStyle;
    if (this.props.overflowStrategy === 'scroll') {
      menuStyle = {
        ...menuPropsStyle,
        position: 'fixed'
      };
    }
    return {
      ...this.props.dropdownButtonProps,
      menuProps: {
        style: menuStyle
      }
    };
  }

  getMenuProps() {
    const { props } = this;
    const menuProps = {
      ...(props.dropdownButtonProps && props.dropdownButtonProps.menuProps),
      ...props.menuProps
    };
    if (this.props.overflowStrategy === 'scroll') {
      menuProps.style = {
        ...menuProps.style,
        position: 'fixed'
      };
    }
    return menuProps;
  }

  getToolBarNode() {
    return this.toolBarNode;
  }
}

ZippyMenuBar.defaultProps = {
  rootClassName: 'react-toolkit-menu-bar',
  items: null,
  overflowStrategy: 'dropdown'
};

ZippyMenuBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  rootClassName: PropTypes.string,
  dropdownButtonProps: PropTypes.object
};

export default ZippyMenuBar;
