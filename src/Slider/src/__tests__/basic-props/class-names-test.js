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

import getClassNames from '../../utils/get-class-names';

describe('components class names logic', () => {
  it('should pass down props className', () => {
    const classString = getClassNames({ className: 'test' }, {});
    expect(classString).to.contain('test');
  });

  it('should adds orientation modifier', () => {
    let props, classString, rangeClassString;

    props = {
      orientation: 'horizontal'
    };

    classString = getClassNames(props, {});
    expect(classString).to.contain('horizontal-orientation');

    props = {
      orientation: 'vertical'
    };

    classString = getClassNames(props, {});
    expect(classString).to.contain('vertical-orientation');
  });
});
