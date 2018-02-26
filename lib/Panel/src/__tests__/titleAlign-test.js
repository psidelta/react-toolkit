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

var titleBarClassName = rootClassName + '__title';

describe('titleAlign', function () {
  it('should default to start', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
    expect(wrapper.props().titleAlign).to.be.null;
  });

  it('should add correct className', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));

    wrapper.setProps({ titleAlign: 'start' });
    var startClassName = '.' + titleBarClassName + '--align-start';
    expect(wrapper.find(startClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'center' });
    var centerClassName = '.' + titleBarClassName + '--align-center';
    expect(wrapper.find(centerClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'end' });
    var endClassName = '.' + titleBarClassName + '--align-end';
    expect(wrapper.find(endClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'left' });
    var leftClassName = '.' + titleBarClassName + '--align-left';
    expect(wrapper.find(leftClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'right' });
    var rightClassName = '.' + titleBarClassName + '--align-right';
    expect(wrapper.find(rightClassName)).to.have.length(1);
  });
});