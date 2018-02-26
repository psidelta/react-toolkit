'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('renderNode', function () {
  var dataSource = [{ label: 'hello world' }];
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource }));
  });

  it('is called', function () {
    var renderNode = sinon.spy();
    wrapper.setProps({ renderNode: renderNode });
    expect(renderNode.called).to.be.true;
  });

  it('renders what renderNode returns', function () {
    var renderNode = function renderNode() {
      return _react2.default.createElement('div', { key: 1, id: 'customRow' });
    };
    wrapper.setProps({ renderNode: renderNode });
    expect(wrapper.find('#customRow')).to.have.length(1);
  });

  it('mutating props changes props used for rendering row', function () {
    var renderNode = function renderNode(_ref) {
      var domProps = _ref.domProps,
          nodeProps = _ref.nodeProps;

      domProps.id = 'mutatedId';
      domProps.className = 'customRowClass';
    };
    wrapper.setProps({ renderNode: renderNode });

    expect(wrapper.find('#mutatedId')).to.have.length(1);
    // expect(wrapper.find('.customRowClass')).to.have.length(1)
    // expect(wrapper.find('.react-tree-view__node')).to.have.length(0)
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