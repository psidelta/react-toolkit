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

class Steps extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shouldComponentUpdate(this, nextProps, nextState);
  }

  render() {
    const { className, stepTickDirection, style } = this.props;

    let steps = this.renderSteps();

    return (
      <div className={className} style={style}>
        {steps}
      </div>
    );
  }

  renderSteps() {
    const { formatedStep, directionMap, stepClassName, stepStyle, value, renderStep } = this.props;

    return formatedStep.map(({ from, to }, index) => {
      const style = {
        ...stepStyle,
        [directionMap.start]: `${from}%`,
        [directionMap.end]: `${to}%`
      };

      let result;

      const domProps = {
        style,
        key: index,
        className: `${stepClassName} ${stepClassName}__${index + 1}`
      };

      if (renderStep) {
        result = renderStep({ domProps, from, to, index, value });
      }

      if (result === undefined) {
        result = <div {...domProps} />;
      }

      return result;
    });
  }
}

Steps.defaultProps = {};

Steps.propTypes = {
  className: PropTypes.string,
  stepStyle: PropTypes.object,
  stepTickDirection: PropTypes.number,
  formatedStep: PropTypes.arrayOf(PropTypes.object),
  renderStep: PropTypes.func,
  directionMap: PropTypes.object
};

export default Steps;
