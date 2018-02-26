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
import Button from '../../Button';

import join from '../../common/join';

const ICON_CLASS_NAME = 'zippy-react-pagination-toolbar__icon';

export default class PaginationIcon extends React.Component {
  render() {
    const { icon, size, disabled, action, name } = this.props;

    const className = join(
      ICON_CLASS_NAME,
      `${ICON_CLASS_NAME}--named--${name}`
    );

    return (
      <Button
        disabled={disabled}
        className={className}
        icon={cloneElement(icon, { width: size, height: size })}
        onClick={action}
        theme="light"
      />
    );
  }
}

PaginationIcon.propTypes = {
  name: PropTypes.string,
  action: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  size: PropTypes.number
};
