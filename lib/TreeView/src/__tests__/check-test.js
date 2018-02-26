'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

var _enzyme = require('enzyme');

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

var NESTED_DATA_STRUCTURE = [{
  label: 'test 1'
}, {
  label: 'test 2',
  nodes: [{
    label: 'test 3'
  }, {
    label: 'test 4'
  }, {
    label: 'test 5'
  }]
}];

describe('checked props', function () {
  describe('defaultChecked', function () {
    it('should be used as initial state for checked', function () {
      var defaultChecked = { '0': true };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        dataSource: NESTED_DATA_STRUCTURE,
        defaultChecked: defaultChecked
      }));

      expect(wrapper.state().checked).to.be.equal(defaultChecked);
    });
  });

  describe('checked', function () {
    it('should use correct checked state', function () {
      var checked = { '2': true };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        dataSource: NESTED_DATA_STRUCTURE,
        checked: checked,
        defaultChecked: { '1': true }
      }));

      expect(wrapper.instance().getCurrentCheckedState()).to.deep.equal(checked);
    });

    it('should not update this.state.checked', function () {
      var checked = { '1/1': true };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE, checked: checked }));

      wrapper.instance().checkNode('1/2');

      expect(wrapper.state().checked).to.deep.equal({});
    });
  });

  describe('enableChecked', function () {
    it('should default to false', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: [] }));
      expect(wrapper.props().enableChecked).to.be.false;
    });

    it('enableChecked is passed to nodes', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { enableChecked: false, dataSource: NESTED_DATA_STRUCTURE }));
      expect(wrapper.find(_Node2.default).first().props().enableChecked).to.be.false;
    });
  });

  describe('checkOnSelect', function () {
    it('when a node is selected it should trigger also a check', function () {
      var onCheckedChange = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableChecked: true,
        checkOnSelect: true,
        onCheckedChange: onCheckedChange,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      wrapper.instance().selectNode('0');
      expect(onCheckedChange.called).to.be.true;
      expect(wrapper.state().checked[0]).to.be.true;
      expect(onCheckedChange.args[0][0].checkedMap).to.deep.equal({
        '0': true
      });
    });
  });

  describe('getUpdatedDataSource', function () {
    it('should update correctly dataSource', function () {
      var newDataSource = void 0;
      var onCheckedChange = function onCheckedChange(_ref) {
        var getUpdatedDataSource = _ref.getUpdatedDataSource;

        newDataSource = getUpdatedDataSource(function (_ref2) {
          var node = _ref2.node,
              nodeProps = _ref2.nodeProps,
              selected = _ref2.selected;

          node.customPropertyInjecter = true;
        });
      };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableChecked: true,
        dataSource: NESTED_DATA_STRUCTURE,
        onCheckedChange: onCheckedChange
      }));

      wrapper.instance().checkNode('0');

      expect(wrapper.state().data).to.not.equal(newDataSource);
      expect(newDataSource[0].customPropertyInjecter).to.be.true;
    });
  });

  describe('isNodeChecked', function () {
    it('should be called with correct props', function () {
      var isNodeChecked = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableChecked: true,
        checked: { 0: false },
        isNodeChecked: isNodeChecked,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      var args = isNodeChecked.args[0][0];

      expect(isNodeChecked.called).to.be.true;
      expect(args.index).to.be.equal(0);
    });

    it('should overwrite controlled or uncontrolled checked', function () {
      var isNodeChecked = function isNodeChecked() {
        return true;
      };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableChecked: true,
        isNodeChecked: isNodeChecked,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      expect(wrapper.find(_Node2.default).first().props().checked).to.be.true;
    });

    it('should take into account isNodeChecked state when selected changes', function () {
      var isNodeChecked = function isNodeChecked() {
        return true;
      };
      var onCheckedChange = sinon.spy();

      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableChecked: true,
        isNodeChecked: isNodeChecked,
        dataSource: NESTED_DATA_STRUCTURE,
        onCheckedChange: onCheckedChange
      }));

      wrapper.instance().checkNode('0');
      expect(onCheckedChange.args[0][0].checkedMap).to.be.deep.equal({
        '0': true,
        '1': true,
        '1/0': true,
        '1/1': true,
        '1/2': true
      });
    });
  });
});