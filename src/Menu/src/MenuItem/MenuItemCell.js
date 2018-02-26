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
import Component from '@zippytech/react-class';
import join from '../../../common/join';
import cleanProps from '../../../common/cleanProps';

export default class MenuItemCell extends Component {
  render() {
    const { props } = this;
    const { cellProps, rootClassName, align } = props;

    const children = props.expander || props.children;
    const className = join(
      props.className,
      cellProps.className,
      `${rootClassName}__cell`,
      props.isDescription && `${rootClassName}__cell--secondaryLabel`,
      props.isIcon && `${rootClassName}__cell--icon`
    );

    const style = {
      ...props.style,
      ...cellProps.style
    };

    if (align) {
      style.textAlign = align;
    }

    return (
      <td
        {...cleanProps(props, MenuItemCell.propTypes)}
        {...cellProps}
        style={style}
        className={className}
      >
        {children}
      </td>
    );
  }
}

MenuItemCell.defaultProps = {
  cellProps: {}
};

MenuItemCell.propTypes = {
  isDescription: PropTypes.bool,
  isIcon: PropTypes.bool,
  rootClassName: PropTypes.string,
  column: PropTypes.object,
  cellProps: PropTypes.object,
  rtl: PropTypes.bool,
  expander: PropTypes.node,
  align: PropTypes.oneOf(['start', 'end', 'center', 'left', 'right'])
};
