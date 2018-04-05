/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getClassNames from '../../utils/get-class-names';

describe('components class names logic', () => {
  it('should pass down props className', () => {
    const classString = getClassNames({ className: 'test' }, {});
    expect(classString).toContain('test');
  });

  it('should adds orientation modifier', () => {
    let props, classString, rangeClassString;

    props = {
      orientation: 'horizontal'
    };

    classString = getClassNames(props, {});
    expect(classString).toContain('horizontal-orientation');

    props = {
      orientation: 'vertical'
    };

    classString = getClassNames(props, {});
    expect(classString).toContain('vertical-orientation');
  });
});
