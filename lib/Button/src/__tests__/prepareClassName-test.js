'use strict';

var _prepareClassName = require('../prepareClassName');

var _prepareClassName2 = _interopRequireDefault(_prepareClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('prepareClassName', function () {
  it('adds disabled className', function () {
    expect((0, _prepareClassName2.default)({ disabled: true })).to.have.string('disabled');
    expect((0, _prepareClassName2.default)({ disabled: true }, { disabledClassName: 'test' })).to.have.string('test');
  });
  it('adds wrap className', function () {
    expect((0, _prepareClassName2.default)({ wrap: true })).to.have.string('--wrap');
    expect((0, _prepareClassName2.default)({ wrap: false })).to.have.string('--nowrap');
    expect((0, _prepareClassName2.default)({ wrap: undefined })).to.not.have.string('wrap');
  });
  it('adds verticalAlign className', function () {
    expect((0, _prepareClassName2.default)({ verticalAlign: 'middle' })).to.have.string('--vertical-align-middle');
    expect((0, _prepareClassName2.default)({ verticalAlign: 'top' })).to.have.string('--vertical-align-top');
  });
  it('adds active className', function () {
    expect((0, _prepareClassName2.default)({ active: true })).to.have.string('active');
    expect((0, _prepareClassName2.default)({ active: true }, { activeClassName: 'test' })).to.have.string('test');
  });
  it('adds pressed className', function () {
    expect((0, _prepareClassName2.default)({ pressed: true })).to.have.string('pressed');
    expect((0, _prepareClassName2.default)({ pressed: true }, { pressedClassName: 'test' })).to.have.string('test');
  });
  it('adds over className', function () {
    expect((0, _prepareClassName2.default)({ over: true })).to.have.string('over');
    expect((0, _prepareClassName2.default)({ over: true }, { overClassName: 'test' })).to.have.string('test');
  });
  it('adds focused className', function () {
    expect((0, _prepareClassName2.default)({ focused: true })).to.have.string('focused');
    expect((0, _prepareClassName2.default)({ focused: true }, { focusedClassName: 'test' })).to.have.string('test');
  });
}); /**
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