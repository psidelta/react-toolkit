'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

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

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('node classNames', function () {
  describe('nodeClassName and node.className', function () {
    it('should compute correct classname using strings', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var dataSource = [{
        label: 'hello world',
        className: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, nodeClassName: globalClassName }));

      var test = wrapper.find(_Node2.default).first().props().domProps.className;
      expect(test).to.equal(globalClassName + ' ' + nodeClassName);
    });

    it('should compute correct classname using a function', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var _dataSource = [{
        label: 'hello world',
        className: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: function dataSource() {
          return _dataSource;
        },
        nodeClassName: function nodeClassName() {
          return globalClassName;
        }
      }));

      var test = wrapper.find(_Node2.default).first().props().domProps.className;
      expect(test).to.equal(globalClassName + ' ' + nodeClassName);
    });

    it('should call className function with correct args', function () {
      var globalClassName = sinon.spy();
      var nodeClassName = sinon.spy();
      var dataSource = [{
        label: 'hello world',
        className: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, nodeClassName: globalClassName }));

      expect(globalClassName.called).to.be.true;
      expect(nodeClassName.called).to.be.true;

      var _wrapper$find$first$p = wrapper.find(_Node2.default).first().props(),
          index = _wrapper$find$first$p.index,
          path = _wrapper$find$first$p.path;

      expect(globalClassName.args[0][0].path).to.equal(path);
      expect(globalClassName.args[0][0].index).to.equal(index);

      expect(nodeClassName.args[0][0].path).to.equal(path);
      expect(nodeClassName.args[0][0].index).to.equal(index);
    });
  });

  describe('labelClassName and node.labelClassName', function () {
    it('should compute correct classname using strings', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var dataSource = [{
        label: 'hello world',
        labelClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, labelClassName: globalClassName }));

      var test = wrapper.find(_Node2.default).first().props().labelClassName;
      expect(test).to.equal(globalClassName + ' ' + nodeClassName);
    });

    it('shoud compute correct classname using a function', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var _dataSource2 = [{
        label: 'hello world',
        labelClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: function dataSource() {
          return _dataSource2;
        },
        labelClassName: function labelClassName() {
          return globalClassName;
        }
      }));

      var test = wrapper.find(_Node2.default).first().props().labelClassName;
      expect(test).to.equal(globalClassName + ' ' + nodeClassName);
    });

    it('should call className function with correct args', function () {
      var globalClassName = sinon.spy();
      var nodeClassName = sinon.spy();
      var dataSource = [{
        label: 'hello world',
        labelClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, labelClassName: globalClassName }));

      expect(globalClassName.called).to.be.true;
      expect(nodeClassName.called).to.be.true;

      var _wrapper$find$first$p2 = wrapper.find(_Node2.default).first().props(),
          index = _wrapper$find$first$p2.index,
          path = _wrapper$find$first$p2.path;

      expect(globalClassName.args[0][0].path).to.equal(path);
      expect(globalClassName.args[0][0].index).to.equal(index);

      expect(nodeClassName.args[0][0].path).to.equal(path);
      expect(nodeClassName.args[0][0].index).to.equal(index);
    });
  });

  describe('contentClassName and node.contentClassName', function () {
    it('should compute correct classname using strings', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var dataSource = [{
        label: 'hello world',
        contentClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, contentClassName: globalClassName }));

      var test = wrapper.find(_Node2.default).first().props().contentClassName;
      expect(test).to.equal(globalClassName + ' ' + nodeClassName);
    });

    it('shoud compute correct classname using a function', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var _dataSource3 = [{
        label: 'hello world',
        contentClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: function dataSource() {
          return _dataSource3;
        },
        contentClassName: function contentClassName() {
          return globalClassName;
        }
      }));

      var test = wrapper.find(_Node2.default).first().props().contentClassName;
      expect(test).to.equal(globalClassName + ' ' + nodeClassName);
    });

    it('should call className function with correct args', function () {
      var globalClassName = sinon.spy();
      var nodeClassName = sinon.spy();
      var dataSource = [{
        label: 'hello world',
        contentClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, contentClassName: globalClassName }));

      expect(globalClassName.called).to.be.true;
      expect(nodeClassName.called).to.be.true;

      var _wrapper$find$first$p3 = wrapper.find(_Node2.default).first().props(),
          index = _wrapper$find$first$p3.index,
          path = _wrapper$find$first$p3.path;

      expect(globalClassName.args[0][0].path).to.equal(path);
      expect(globalClassName.args[0][0].index).to.equal(index);

      expect(nodeClassName.args[0][0].path).to.equal(path);
      expect(nodeClassName.args[0][0].index).to.equal(index);
    });
  });
});