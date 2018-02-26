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
import shouldComponentUpdate from '../../common/shouldComponentUpdate';

class Ticks extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shouldComponentUpdate(this, nextProps, nextState);
  }

  render() {
    const { className, stepTickDirection, style } = this.props;

    let ticks = this.renderTicks();

    if (stepTickDirection === 1) {
      ticks.shift();
    } else {
      ticks.pop();
    }

    return (
      <div className={className} style={style}>
        {ticks}
      </div>
    );
  }

  renderTicks() {
    const {
      formatedTick,
      tickClassName,
      renderTick,
      directionMap,
      tickStyle,
      stepTickDirection,
      value
    } = this.props;

    return formatedTick.map(({ from, to }, index) => {
      const style = {
        [directionMap.start]: `${from}%`,
        ...tickStyle
      };

      let result;
      const domProps = {
        style,
        key: index,
        className: `${tickClassName} ${tickClassName}__${index + 1}`
      };

      if (renderTick) {
        result = renderTick({ domProps, index, from, value });
      }

      if (result === undefined) {
        result = <div {...domProps} />;
      }

      return result;
    });
  }
}

Ticks.defaultProps = {};

Ticks.propTypes = {
  className: PropTypes.string,
  stepTickDirection: PropTypes.number,
  formatedTick: PropTypes.arrayOf(PropTypes.object),
  renderTick: PropTypes.func,
  directionMap: PropTypes.object
};

export default Ticks;
