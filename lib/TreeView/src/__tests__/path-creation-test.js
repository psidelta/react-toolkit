'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

describe('path creation', function () {
  var dataSource = [{
    id: 'node_1',
    idFn: 'node_fn_1',
    pathId: 'node_path_1',
    pathIdFn: 'node_fn_path_1',
    nodes: [{
      id: 'node_2',
      idFn: 'node_fn_2',
      pathId: 'node_path_2',
      pathIdFn: 'node_fn_path_2'
    }]
  }];
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource }));
  });

  it('by default it uses index', function () {
    // first level
    expect(wrapper.find(_Node2.default).first().prop('path')).to.equal('0');
    // second node
    expect(wrapper.find(_Node2.default).at(1).prop('path')).to.equal('0/0');
  });

  describe('pathProperty', function () {
    describe('is a string', function () {
      it('constructs correct path', function () {
        wrapper.setProps({ pathProperty: 'pathId' });
        // first level
        expect(wrapper.find(_Node2.default).first().prop('path')).to.equal('node_path_1');
        // second node
        expect(wrapper.find(_Node2.default).at(1).prop('path')).to.equal('node_path_1/node_path_2');
      });
    });
    describe('as a function', function () {
      it('constructs the corrent path', function () {
        wrapper.setProps({ pathProperty: function pathProperty() {
            return 'pathIdFn';
          } });
        // first level
        expect(wrapper.find(_Node2.default).first().prop('path')).to.equal('node_fn_path_1');
        // second node
        expect(wrapper.find(_Node2.default).at(1).prop('path')).to.equal('node_fn_path_1/node_fn_path_2');
      });
    });
  });

  describe('idProperty', function () {
    describe('it is a string', function () {
      it('idProperty overwrites pathProperty, and constructs correct path', function () {
        wrapper.setProps({ pathProperty: 'pathId' });
        wrapper.setProps({ idProperty: 'id' });
        // first level
        expect(wrapper.find(_Node2.default).first().prop('path')).to.equal('node_1');
        // second node
        expect(wrapper.find(_Node2.default).at(1).prop('path')).to.equal('node_2');
      });
    });
    describe('it is a function', function () {
      it('constructs correct path', function () {
        wrapper.setProps({ idProperty: function idProperty() {
            return 'idFn';
          } });
        expect(wrapper.find(_Node2.default).first().prop('path')).to.equal('node_fn_1');
        // second node
        expect(wrapper.find(_Node2.default).at(1).prop('path')).to.equal('node_fn_2');
      });
    });
  });
});