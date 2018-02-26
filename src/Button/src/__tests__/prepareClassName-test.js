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

import prepareClassName from '../prepareClassName';

describe('prepareClassName', () => {
  it('adds disabled className', () => {
    expect(prepareClassName({ disabled: true })).to.have.string('disabled');
    expect(
      prepareClassName({ disabled: true }, { disabledClassName: 'test' })
    ).to.have.string('test');
  });
  it('adds wrap className', () => {
    expect(prepareClassName({ wrap: true })).to.have.string('--wrap');
    expect(prepareClassName({ wrap: false })).to.have.string('--nowrap');
    expect(prepareClassName({ wrap: undefined })).to.not.have.string('wrap');
  });
  it('adds verticalAlign className', () => {
    expect(prepareClassName({ verticalAlign: 'middle' })).to.have.string(
      '--vertical-align-middle'
    );
    expect(prepareClassName({ verticalAlign: 'top' })).to.have.string(
      '--vertical-align-top'
    );
  });
  it('adds active className', () => {
    expect(prepareClassName({ active: true })).to.have.string('active');
    expect(
      prepareClassName({ active: true }, { activeClassName: 'test' })
    ).to.have.string('test');
  });
  it('adds pressed className', () => {
    expect(prepareClassName({ pressed: true })).to.have.string('pressed');
    expect(
      prepareClassName({ pressed: true }, { pressedClassName: 'test' })
    ).to.have.string('test');
  });
  it('adds over className', () => {
    expect(prepareClassName({ over: true })).to.have.string('over');
    expect(
      prepareClassName({ over: true }, { overClassName: 'test' })
    ).to.have.string('test');
  });
  it('adds focused className', () => {
    expect(prepareClassName({ focused: true })).to.have.string('focused');
    expect(
      prepareClassName({ focused: true }, { focusedClassName: 'test' })
    ).to.have.string('test');
  });
});
