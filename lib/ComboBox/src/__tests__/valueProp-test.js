'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

var _Item = require('../List/Item');

var _Item2 = _interopRequireDefault(_Item);

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

var dataSource = [{ id: 1, label: 'test1' }, { id: 2, label: 'test2' }, { id: 3, label: 'test3' }];

describe('value props', function () {
  describe('defaultValue', function () {
    it('should be used as initial state', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultValue: 20 }));
      expect(wrapper.instance().getValue()).to.equal(20);
    });
  });

  describe('value', function () {
    it('should be used insted of state', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultValue: 20, value: 30 }));
      expect(wrapper.instance().getValue()).to.equal(30);
    });
    it("doesn't change when a change is triggered", function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultValue: 20, value: 30 }));
      wrapper.instance().setValue(55);
      expect(wrapper.instance().getValue()).to.equal(30);
      // state should not be changed
      expect(wrapper.state().value).to.equal(20);
    });
    it('renders what is inside label key when an object', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        multiple: true,
        value: [{
          label: _react2.default.createElement(
            'div',
            { id: 'valueLabel' },
            'hello world'
          )
        }]
      }));
      expect(wrapper.find('#valueLabel')).to.have.length(1);
    });
  });

  describe('onChange', function () {
    it('should be called when setValue is called', function () {
      var onChange = sinon.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultValue: 20, value: 30, onChange: onChange }));
      wrapper.instance().setValue(55);
      expect(onChange.called).to.be.true;
      expect(onChange.args[0][0]).to.equal(55);
    });
  });

  describe('value change', function () {
    it('multiple adds correct values', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { multiple: true, dataSource: dataSource }));
      wrapper.instance().handleItemClick(1);
      expect(wrapper.instance().getValue()).to.deep.equal([1]);
      wrapper.instance().handleItemClick(1);
      expect(wrapper.instance().getValue()).to.equal(null);
      wrapper.instance().handleItemClick(1);
      wrapper.instance().handleItemClick(3);
      expect(wrapper.instance().getValue()).to.deep.equal([1, 3]);
    });
  });

  describe('isSelectedItemValid', function () {
    it('filters out invalid values', function () {
      var isSelectedItemValid = function isSelectedItemValid(_ref) {
        var id = _ref.id;
        return id !== 2;
      }; // 2 is not allowed
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
        multiple: true,
        dataSource: dataSource,
        defaultValue: [1, 3],
        isSelectedItemValid: isSelectedItemValid
      }));
      var instance = wrapper.instance();
      expect(instance.getValue()).to.deep.equal([1, 3]);
      instance.selectItem(2);
      expect(instance.getValue()).to.deep.equal([1, 3]);
    });
  });

  describe('clear', function () {
    it('sets value and text to null', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { searchable: true, defaultText: 'hello world', defaultValue: ['test'] }));
      var instance = wrapper.instance();
      expect(instance.getValue()).to.deep.equal(['test']);
      expect(instance.getText()).to.deep.equal('hello world');
      instance.clear();
      expect(instance.getValue()).to.deep.equal(null);
      expect(instance.getText()).to.deep.equal(null);
    });
  });

  describe('changeValueOnNavigation', function () {
    it('changes value when active item changes', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
        searchable: true,
        changeValueOnNavigation: true,
        multiple: false,
        dataSource: dataSource,
        defaultValue: 1,
        defaultActiveItem: 1,
        expanded: true
      }));
      wrapper.instance().navigateToNextItem(1);
      expect(wrapper.instance().getValue()).to.equal(2);
    });
  });

  describe('allowSelectionToggle', function () {
    it('only when it is true allows single value deselection', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
        dataSource: dataSource,
        multiple: false,
        defaultValue: 1,
        allowSelectionToggle: false
      }));
      wrapper.instance().selectItem(1);
      expect(wrapper.instance().getValue()).to.equal(1);
    });
  });

  describe('clearValueOnEmpty', function () {
    it('clears value when text is cleared, on single value', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { clearValueOnEmpty: true, defaultValue: 20, multiple: false, defaultText: 'hello world' }));
      expect(wrapper.instance().getValue()).to.equal(20);
      wrapper.instance().setText('');
      expect(wrapper.instance().getValue()).to.be.null;
    });
  });

  describe('allowCustomTagCreation', function () {
    it('when text is entered and no item matched the search, by pressing enter a new value is created', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        allowCustomTagCreation: true,
        dataSource: [{ id: 1, label: 'test' }],
        defaultValue: null,
        defaultText: 'hello world',
        multiple: false
      }));
      expect(wrapper.instance().getValue()).to.be.null;
      wrapper.simulate('keyDown', { key: 'Enter' });
      expect(wrapper.instance().getValue()).to.equal('hello world');
    });
  });
});