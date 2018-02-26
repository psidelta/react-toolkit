'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName; /**
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

var titleRotateClassName90 = '.' + rootClassName + '--title-rotate-90';
var titleRotateClassName_90 = '.' + rootClassName + '--title-rotate--90';

describe('titleRotate', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  it('should default to null', function () {
    expect(wrapper.props().titleRotate).to.be.null;
  });

  it('should default to -90 for titleRotate left', function () {
    wrapper.setProps({ titleBarPosition: 'left' });
    expect(wrapper.find(titleRotateClassName_90)).to.have.length(1);
  });

  it('should default to 90 for titleRotate right', function () {
    wrapper.setProps({ titleBarPosition: 'right' });
    expect(wrapper.find(titleRotateClassName90)).to.have.length(1);
  });

  it('should add correct className for 90', function () {
    wrapper.setProps({ titleBarPosition: 'right', titleRotate: 90 });
    expect(wrapper.find(titleRotateClassName90)).to.have.length(1);

    wrapper.setProps({ titleBarPosition: 'left', titleRotate: -90 });
    expect(wrapper.find(titleRotateClassName_90)).to.have.length(1);
  });
});