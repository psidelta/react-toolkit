'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Value = require('../Value');

var _Value2 = _interopRequireDefault(_Value);

var _Tag = require('../Tag');

var _Tag2 = _interopRequireDefault(_Tag);

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

describe('Value', function () {
  describe('render tag', function () {
    it('renderTag overwrites the tag render', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Value2.default, { multiple: true, value: ['world'], items: [{ label: 'hello', id: 'world' }] }));
      expect(wrapper.find(_Tag2.default)).to.have.length(1);

      wrapper.setProps({
        renderTag: function renderTag(_ref) {
          var domProps = _ref.domProps;
          return _react2.default.createElement('div', { key: domProps.key, id: 'helloWorld' });
        }
      });

      expect(wrapper.find(_Tag2.default)).to.have.length(1);
      expect(wrapper.find('#helloWorld')).to.have.length(1);
    });
    it('renderTag can mutate props that are applied on Tag', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Value2.default, {
        multiple: true,
        value: ['world'],
        items: [{ label: 'hello', id: 'world' }],
        renderTag: function renderTag(_ref2) {
          var domProps = _ref2.domProps;

          domProps.id = 'mutatedId';
        }
      }));
      expect(wrapper.find(_Tag2.default)).to.have.length(1);
      expect(wrapper.find('#mutatedId')).to.have.length(1);
    });
  });

  describe('renderTags', function () {
    it('overwrites render tags', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Value2.default, {
        multiple: true,
        value: ['world'],
        items: [{ label: 'hello', id: 'world' }],
        renderTags: function renderTags(_ref3) {
          var tags = _ref3.tags;
          return _react2.default.createElement('div', { id: 'customTags', children: tags });
        }
      }));
      expect(wrapper.find('#customTags')).to.have.length(1);
      expect(wrapper.find(_Tag2.default)).to.have.length(1);
    });
  });

  describe('renderRemainingTags', function () {
    it('overwrites combined tag render', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Value2.default, {
        multiple: true,
        value: ['world'],
        renderRemainingTags: function renderRemainingTags(_ref4) {
          var domProps = _ref4.domProps;
          return _react2.default.createElement('div', { key: domProps.key, id: 'customRemainigTag' });
        },
        groupedItems: {
          visibleItems: [{ label: 'hello', id: 'world' }, { label: 'hello', id: 'world1' }],
          remainingItems: [{ label: 'hello', id: 'world2' }]
        }
      }));
      expect(wrapper.find(_Tag2.default)).to.have.length(2);
      expect(wrapper.find('#customRemainigTag')).to.have.length(1);
    });
  });

  describe('renderDisplayValue', function () {
    it('renders custom display value', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Value2.default, {
        multiple: false,
        focus: false,
        label: 'hello world',
        renderDisplayValue: function renderDisplayValue() {
          return _react2.default.createElement('div', { id: 'customDisplayValue' });
        }
      }));
      expect(wrapper.find('#customDisplayValue')).to.have.length(1);
    });
    it('mutated props are added on default implmenetation', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Value2.default, {
        multiple: false,
        focus: false,
        label: 'hello world',
        renderDisplayValue: function renderDisplayValue(_ref5) {
          var domProps = _ref5.domProps;

          domProps.id = 'customDisplayValue';
        }
      }));
      expect(wrapper.find('#customDisplayValue')).to.have.length(1);
    });
  });
});