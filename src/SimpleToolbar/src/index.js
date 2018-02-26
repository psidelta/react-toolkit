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
import autoBind from '@zippytech/react-class/autoBind';
import cleanProps from '@zippytech/react-clean-props';

import ToolbarRegion from './ToolbarRegion';
import join from './join';

const emptyFn = () => {};

function isRegion(child) {
  return child && child.props && child.props.isToolbarRegion;
}

function toAlign(index, regions) {
  if (index == 0) {
    return 'start';
  }

  if (index == regions.length - 1) {
    return 'end';
  }

  return 'center';
}

class ZippySimpleToolbar extends React.Component {
  render() {
    const { props } = this;

    const children = this.prepareChildren(props);
    const className = join(
      props.className,
      `zippy-react-simple-toolbar`,
      `zippy-react-simple-toolbar--orientation-${props.orientation}`,
      props.theme ? `zippy-react-simple-toolbar--theme-${props.theme}` : null
    );

    return (
      <div
        {...cleanProps(props, ZippySimpleToolbar.propTypes)}
        children={children}
        className={className}
      />
    );
  }

  prepareChildren(props) {
    let regionCount = 0;

    const children = [];
    const regions = [];

    React.Children.forEach(props.children, child => {
      if (isRegion(child)) {
        regions.push(child);
        regionCount++;
      }
    });

    let regionIndex = -1;
    React.Children.forEach(props.children, child => {
      if (isRegion(child)) {
        regionIndex++;
        child = this.prepareRegion(child, regionIndex, regions);
      }

      children.push(child);
    });

    if (!regionCount) {
      const Factory = props.regionFactory || ToolbarRegion;
      return this.prepareRegion(<Factory>{children}</Factory>);
    }

    return children;
  }

  prepareRegion(region, index = 0, regions = []) {
    const props = this.props;
    const regionStyle = assign({}, props.regionStyle);

    if (props.padding) {
      regionStyle.padding = props.padding;
    }

    const style = assign({}, regionStyle, region.props.style);
    const align = region.props.align || toAlign(index, regions) || 'center';
    const theme = region.props.theme || props.theme;

    return cloneElement(region, {
      style,
      theme,
      orientation: props.orientation,
      align
    });
  }
}

ZippySimpleToolbar.propTypes = {
  isReactToolbar: PropTypes.bool,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  theme: PropTypes.string,
  regionFactory: PropTypes.func
};

ZippySimpleToolbar.defaultProps = {
  isReactToolbar: true,
  orientation: 'horizontal',
  theme: 'default'
};

ZippySimpleToolbar.Region = ToolbarRegion;

export default ZippySimpleToolbar;

export { ToolbarRegion as Region };
