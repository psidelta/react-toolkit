'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('loading', function () {
  it('should render load mask when loading is true', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: [], loading: true }));
    expect(wrapper.text()).to.be.equal('Loading...');
  });
  it('should call renderLoader if loading and render what it returns', function () {
    var renderLoader = sinon.stub();
    renderLoader.returns(_react2.default.createElement('div', { id: 'customLoader' }));
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { renderLoader: renderLoader, dataSource: [], loading: true }));
    expect(renderLoader.called).to.be.true;
    expect(wrapper.find('#customLoader')).to.have.length(1);
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