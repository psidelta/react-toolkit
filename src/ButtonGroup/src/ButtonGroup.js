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
import join from '../../common/join';

class ZippyButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pressedIndex: props.defaultPressedIndex
    };
  }

  render() {
    const { props } = this;
    const className = join(
      props.rootClassName,
      props.className,
      props.theme && `${props.rootClassName}--theme-${props.theme}`,
      props.rtl && `${props.rootClassName}--rtl`
    );

    const style = {
      ...props.style,
      borderRadius: props.borderRadius,
      border: props.border
    };

    return (
      <div
        {...cleanProps(props, ZippyButtonGroup.propTypes)}
        className={className}
        style={style}
      >
        {this.renderButtons()}
      </div>
    );
  }

  renderButtons() {
    return React.Children.map(this.props.children, (child, index) => {
      if (typeof child === 'string') {
        return null;
      }
      if (!child.props.isZippyButton) {
        return null;
      }

      return React.cloneElement(child, {
        className: join(
          `${this.props.rootClassName}__button`,
          child.props.className
        ),
        pressed: this.getPressedIndex() === index,
        onClick: event => {
          if (typeof child.props.onClick === 'function') {
            child.props.onClick(event);
          }
          this.handleClick({ event, index, buttonProps: child.props });
        },
        theme: this.props.theme || 'default'
      });
    });
  }

  handleClick({ event, index, buttonProps }) {
    this.props.onClick({ event, index, buttonProps });

    if (this.props.enablePressed) {
      this.setPressedIndex(index);
    }
  }

  isPressedIndexControlled() {
    return this.props.pressedIndex !== undefined;
  }

  setPressedIndex(index) {
    let newPressedIndex = index;

    if (!this.props.keepOnePressed && this.getPressedIndex() === index) {
      newPressedIndex = null;
    }

    if (!this.isPressedIndexControlled()) {
      this.setState({
        pressedIndex: newPressedIndex
      });
    }

    this.props.onPressedIndexChange(newPressedIndex);
  }

  getPressedIndex() {
    return this.isPressedIndexControlled()
      ? this.props.pressedIndex
      : this.state.pressedIndex;
  }
}

function emptyFn() {}

ZippyButtonGroup.defaultProps = {
  rootClassName: 'zippy-react-toolkit-button-group',
  onClick: emptyFn,
  onPressedIndexChange: emptyFn,
  borderRadius: 0,
  rtl: false,
  enablePressed: true,
  theme: 'default'
};

ZippyButtonGroup.propTypes = {
  rootClassName: PropTypes.string,
  keepOnePressed: PropTypes.bool,
  rtl: PropTypes.bool,
  onClick: PropTypes.func,
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPressedIndexChange: PropTypes.func,
  defaultPressedIndex: PropTypes.number,
  enablePressed: PropTypes.bool,
  pressedIndex: PropTypes.number,
  border: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  theme: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string
};

export default ZippyButtonGroup;
