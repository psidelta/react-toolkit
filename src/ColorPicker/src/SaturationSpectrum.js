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
import assign from '../../common/assign';
import { autoBind } from '@zippytech/react-class';
import cleanProps from '../../common/cleanProps';
import { fromRatio } from './utils/color';
import common from './utils/common';

import validatePoint from './utils/validate';
import toStringValue from './utils/toStringValue';

class ZippySaturationSpectrum extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      pointerTop: null,
      pointerLeft: null
    };

    this.setRootRef = ref => {
      this.rootNode = ref;
    };
  }

  componentDidMount() {
    this.isComponentMounted = true;
    this.updateDragPositionIf();
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  updateDragPositionIf() {
    if (!this.props.height || !this.props.width) {
      this.setState({});
    }
  }

  getDragPosition(hsv) {
    hsv = hsv || this.hsv;

    // let width = this.props.width
    // let height = this.props.height
    const sizeDefined = width && height;

    if (!sizeDefined && !this.isComponentMounted) {
      return null;
    }

    /**
     * always read from the dom even if the width is set,
     * the parent might have display: flex and have a different width
     */
    // if (!sizeDefined) {
    const height = this.rootNode && this.rootNode.offsetHeight;
    const width = this.rootNode && this.rootNode.offsetWidth;
    // }

    let x = hsv.s * width;
    const y = height - hsv.v * height;
    const size = this.props.pointerSize;
    const diff = Math.floor(size / 2);

    if (
      this.props.value &&
      this.state.mouseDown &&
      !isNaN(this.state.mouseDown.x)
    ) {
      x = this.state.mouseDown.x;
    }

    const position = {
      left: x - diff,
      top: y - diff
    };

    return position;
  }

  prepareBackgroundColor(color) {
    const hsv = color;
    const col = fromRatio({
      h: hsv.h % 360 / 360,
      s: 1,
      v: 1
    });

    return col.toRgbString();
  }

  prepareProps(thisProps, state) {
    const props = assign({}, thisProps);
    const color =
      state.value || props.value || props.defaultValue || props.defaultColor;
    props.color = color;
    this.hsv = this.toColorValue(color);
    props.style = this.prepareStyle(props);
    props.className = this.prepareClassName(props);

    return props;
  }

  prepareClassName(props) {
    let className = props.className || '';
    className += ' react-color-picker__saturation-spectrum';
    return className;
  }

  prepareStyle(props) {
    const style = assign({}, props.style);
    if (props.height) {
      style.height = props.height;
    }

    if (props.width) {
      style.width = props.width;
    }

    style.backgroundColor = this.prepareBackgroundColor(this.hsv);

    return style;
  }

  render() {
    const props = (this.p = this.prepareProps(this.props, this.state));
    const dragStyle = {
      width: this.props.pointerSize,
      height: this.props.pointerSize
    };

    const dragPos = this.getDragPosition();
    if (dragPos) {
      dragStyle.top = dragPos.top;
      dragStyle.left = dragPos.left;
      dragStyle.display = 'block';
    }

    return (
      <div
        {...cleanProps(props, ZippySaturationSpectrum.propTypes)}
        className={props.className}
        style={props.style}
        onMouseDown={this.onMouseDown}
        ref={this.setRootRef}
        value={null}
        color={null}
      >
        <div className={`${props.rootClassName}__saturation-white`}>
          <div className={`${props.rootClassName}__saturation-black`} />
        </div>
        <div
          className={`${props.rootClassName}__saturation-drag`}
          style={dragStyle}
        >
          <div className={`${props.rootClassName}__saturation-inner`} />
        </div>
      </div>
    );
  }

  getSaturationForPoint(point) {
    return point.x / point.width;
  }

  getColorValueForPoint(point) {
    return (point.height - point.y) / point.height;
  }

  updateColor(point) {
    point = validatePoint(point);
    this.hsv.s = this.getSaturationForPoint(point);
    this.hsv.v = this.getColorValueForPoint(point);
  }
}

assign(ZippySaturationSpectrum.prototype, { toStringValue }, common);

ZippySaturationSpectrum.defaultProps = {
  height: 300,
  width: 300,
  pointerSize: 7,
  defaultColor: 'red',
  isSaturationSpectrum: true,
  rootClassName: 'zippy-react-toolkit-color-picker'
};

ZippySaturationSpectrum.propTypes = {
  pointerSize: PropTypes.number,
  defaultColor: PropTypes.string,
  isSaturationSpectrum: PropTypes.bool,
  inPicker: PropTypes.bool,
  rootClassName: PropTypes.string
};

export default ZippySaturationSpectrum;
