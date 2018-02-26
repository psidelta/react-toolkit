'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _TreeView = require('../../TreeView');

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

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('custom renderers', function () {
  describe('renderLabel', function () {
    var wrapper = void 0;

    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { node: { label: 'test' } }));
    });

    it('should call renderLabel', function () {
      var renderLabel = sinon.spy();
      wrapper.setProps({ renderLabel: renderLabel });
      expect(renderLabel.called).to.be.true;
    });

    it('should render what renderLabel returns', function () {
      var renderLabel = function renderLabel() {
        return _react2.default.createElement('div', { id: 'testCustomLabel' });
      };
      wrapper.setProps({ renderLabel: renderLabel });
      expect(wrapper.find('#testCustomLabel')).to.have.length(1);
    });

    it('mutating props will change label', function () {
      var renderLabel = function renderLabel(domProps) {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderLabel: renderLabel });
      expect(wrapper.find('#mutatedId')).to.have.length(1);
      expect(wrapper.find('#mutatedId').hasClass(CLASS_NAME + '__node__label')).to.be.true;
    });
  });

  describe('renderContent', function () {
    var wrapper = void 0;
    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { hasChildren: true, node: { label: 'test' }, children: [] }));
    });

    it('should call renderLabel', function () {
      var renderContent = sinon.spy();
      wrapper.setProps({ renderContent: renderContent });
      expect(renderContent.called).to.be.true;
    });

    it('should render what renderContent returns', function () {
      var renderContent = function renderContent() {
        return _react2.default.createElement('div', { id: 'testCustomLabel' });
      };
      wrapper.setProps({ renderContent: renderContent });
      expect(wrapper.find('#testCustomLabel')).to.have.length(1);
    });

    it('mutating props will change content', function () {
      var renderContent = function renderContent(domProps) {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderContent: renderContent });
      expect(wrapper.find('#mutatedId')).to.have.length(1);
      expect(wrapper.find('#mutatedId').hasClass(CLASS_NAME + '__node__content')).to.be.true;
    });
  });

  describe('renderIcon', function () {
    it('should call render icon if set', function () {
      var renderIcon = sinon.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { renderIcon: renderIcon }));
      expect(renderIcon.called).to.be.true;
    });

    it('should render what function returns', function () {
      var renderIcon = function renderIcon() {
        return _react2.default.createElement('div', { id: 'customIcon' });
      };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { renderIcon: renderIcon }));
      expect(wrapper.find('#customIcon')).to.have.length(1);
    });

    it('should be called with nodeProps', function () {
      var renderIcon = sinon.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { index: 1, node: { color: 'green' }, renderIcon: renderIcon }));
      expect(renderIcon.args[0][0].index).to.equal(1);
      expect(renderIcon.args[0][0].node.color).to.equal('green');
    });
  });

  describe('renderCheck', function () {
    var wrapper = void 0;

    beforeEach(function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, { enableChecked: true, node: { label: 'test' } }));
    });

    it('should call renderCheck', function () {
      var renderCheck = sinon.spy();
      wrapper.setProps({ renderCheck: renderCheck });
      expect(renderCheck.called).to.be.true;
    });

    it('should render what rendeCheck returns', function () {
      var renderCheck = function renderCheck() {
        return _react2.default.createElement('div', { id: 'customCheck' });
      };
      wrapper.setProps({ renderCheck: renderCheck });
      expect(wrapper.find('#customCheck')).to.have.length(1);
    });

    it('mutating props will change check', function () {
      var renderCheck = function renderCheck(domProps) {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderCheck: renderCheck });
      expect(wrapper.find('#mutatedId')).to.have.length(1);

      expect(wrapper.find('#mutatedId').hasClass(CLASS_NAME + '__node__check')).to.be.true;
    });
  });

  describe('renderNodeText', function () {
    var wrapper = void 0;

    beforeEach(function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, { enableChecked: true, node: { label: 'test' } }));
    });

    it('should be called', function () {
      var renderNodeText = sinon.spy();
      wrapper.setProps({ renderNodeText: renderNodeText });
      expect(renderNodeText.called).to.be.true;
    });

    it('should render what rendeCheck returns', function () {
      var renderNodeText = function renderNodeText() {
        return _react2.default.createElement('div', { id: 'customCheck' });
      };
      wrapper.setProps({ renderNodeText: renderNodeText });
      expect(wrapper.find('#customCheck')).to.have.length(1);
    });

    it('mutating props will change check', function () {
      var renderNodeText = function renderNodeText(domProps) {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderNodeText: renderNodeText });
      expect(wrapper.find('#mutatedId')).to.have.length(1);
      expect(wrapper.find('#mutatedId').hasClass(CLASS_NAME + '__node__label__text')).to.be.true;
    });
  });
});