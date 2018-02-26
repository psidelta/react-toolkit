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

import getDigitGroup from '../utils/get-digit-group-delimiter';

describe('getDigitGroup utils function', () => {
  it('should get decimal character when no locale used', () => {
    const delimiter = getDigitGroup();
    expect(delimiter).to.not.be.falsy;
  });

  it('should get digit group character "," for en-GB locale', () => {
    const delimiter = getDigitGroup('en-GB');
    expect(delimiter).to.be.equal(',');
  });

  it('should get digit group character "." for ro-RO locale', () => {
    const delimiter = getDigitGroup('ro-RO');
    expect(delimiter).to.be.equal('.');
  });
});
