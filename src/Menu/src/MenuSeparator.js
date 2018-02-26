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
import assign from '../../common/assign';
import Component from '@zippytech/react-class';
import join from '../../common/join';

class MenuSeparator extends Component {
  render() {
    const props = this.prepareProps(this.props);

    return (
      <tr className={props.className}>
        <td colSpan={100}>
          <div
            className={`${props.rootClassName}__menu-separator__tool`}
            style={props.style}
          />
        </td>
      </tr>
    );
  }

  prepareProps(thisProps) {
    const props = {};

    assign(props, thisProps);

    props.style = this.prepareStyle(props);
    props.className = this.prepareClassName(props);

    return props;
  }

  prepareClassName(props) {
    const className = join(
      `${props.rootClassName}__menu-separator`,
      props.className
    );

    return className;
  }

  prepareStyle(props) {
    return assign({}, props.style, props.menuSeparatorStyle);
  }
}

MenuSeparator.defaultProps = {
  isSeparator: true
};

export default MenuSeparator;
