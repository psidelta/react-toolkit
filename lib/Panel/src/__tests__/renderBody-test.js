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

var bodyClassName = '.' + rootClassName + '__body';

describe('renderBody', function () {
  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  it('should be caled with domProps and props', function () {
    var renderBody = sinon.spy();
    wrapper.setProps({ id: true });
    wrapper.setProps({ renderBody: renderBody });

    expect(renderBody.called).to.be.true;
    expect(renderBody.args[0][1].id).to.be.true;
  });

  it('should render what it returns', function () {
    var renderBody = function renderBody() {
      return _react2.default.createElement('div', { id: 'customId' });
    };
    wrapper.setProps({ renderBody: renderBody });

    expect(wrapper.find('#customId')).to.have.length(1);
    expect(wrapper.find(bodyClassName)).to.have.length(0);
  });

  it('should render default body with mutated domProps', function () {
    var renderBody = function renderBody(domProps) {
      domProps.id = 'mutatedId';
    };

    wrapper.setProps({ renderBody: renderBody });
    expect(wrapper.find('#mutatedId')).to.have.length(1);
  });
});