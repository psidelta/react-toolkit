/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const bodyClassName = `.${rootClassName}__body`;

describe('bodyStyle', () => {
  it('should default to false', () => {
    const className = 'customClassName';
    const wrapper = mount(<Panel bodyClassName={className} />);

    expect(wrapper.find(`.${className}`)).toHaveLength(1);
  });
});
