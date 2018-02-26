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
import join from '../../common/join';

const DEFAULT_CLASS_NAME = 'zippy-react-toolkit-load-mask__loader';
const LOADBAR_CLASSNAME = `${DEFAULT_CLASS_NAME}-loadbar`;

const getMeasureName = duration => {
  if (typeof duration == 'number' || duration * 1 == duration) {
    return 's';
  }

  let measure;
  duration.match(/[a-zA-Z]*$/, match => {
    measure = match;
  });
  return measure || 's';
};

class ZippySpinLoader extends React.Component {
  render() {
    const props = this.props;

    const style = {
      ...props.style,
      width: props.size,
      height: props.size
    };

    const className = join(
      props.className,
      DEFAULT_CLASS_NAME,
      `${DEFAULT_CLASS_NAME}--spin`,
      props.theme && `${DEFAULT_CLASS_NAME}--theme-${props.theme}`
    );

    const { animationDuration } = props;

    const measureName = animationDuration
      ? getMeasureName(animationDuration)
      : '';

    const bars = [...Array(12)].map((_, i) => {
      const index = i + 1;

      // let loadbarStyle;

      // if (animationDuration) {
      //   const delay =
      //     i * parseFloat(animationDuration) - (i / 12).toPrecision(4);

      //   loadbarStyle = {
      //     animationDuration: animationDuration,
      //     animationDelay: `-${delay}${measureName}`
      //   };
      // }
      return (
        <div
          key={index}
          className={`${LOADBAR_CLASSNAME} ${LOADBAR_CLASSNAME}--${index}`}
        />
      );
    });

    return (
      <div style={style} className={className}>
        {bars}
      </div>
    );
  }
}

ZippySpinLoader.propTypes = {
  size: PropTypes.number,
  theme: PropTypes.string,
  animationDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
ZippySpinLoader.defaultProps = { size: 40 };

export default ZippySpinLoader;
