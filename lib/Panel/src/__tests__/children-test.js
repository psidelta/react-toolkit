'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('children', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  it('should render jsx', function () {
    wrapper.setProps({ children: _react2.default.createElement('div', { id: 'childrenId' }) });
    expect(wrapper.find('#childrenId')).to.have.length(1);
  });

  it('should be called when it function with props and state', function () {
    var children = sinon.stub();
    children.returns(_react2.default.createElement('div', { id: 'childrenFunctionId' }));
    wrapper.setProps({ id: 'propsId' });
    wrapper.setState({ stateId: 'stateId' });
    wrapper.setProps({ children: children });

    expect(children.called).to.be.true;
    expect(wrapper.find('#childrenFunctionId')).to.have.length(1);

    expect(children.args[0][0].id).to.equal('propsId');
    expect(children.args[0][1].stateId).to.equal('stateId');
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