'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

var _Item = require('../List/Item');

var _Item2 = _interopRequireDefault(_Item);

var _Tag = require('../Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

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

var ROOT_CLASS = _ComboBox2.default.defaultProps.rootClassName;

var dataSource = [{ id: 1, label: 'test1' }, { id: 2, label: 'test2' }, { id: 3, label: 'test3' }];

describe('Combo.js', function () {
  it('should create instance of Combo', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: [] }));
    expect(wrapper.instance()).to.be.instanceOf(_ComboBox2.default);
  });

  describe('searchable', function () {
    it('TextInput is rendered also when it is false', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { searchable: true }));
      expect(wrapper.find(_TextInput2.default)).to.have.length(1);
      wrapper.setProps({ searchable: false });
      expect(wrapper.find(_TextInput2.default)).to.have.length(1);
    });
  });

  describe('onTagClick', function () {
    it('should be called when tag is clicked', function () {
      var onTagClick = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        multiple: true,
        value: [1, 2],
        onTagClick: onTagClick,
        dataSource: dataSource
      }));
      wrapper.find(_Tag2.default).at(0).simulate('click');
      expect(onTagClick.called).to.be.true;
    });
  });

  describe('collapseOnSelect', function () {
    it('collapses list when an item is selected', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
        collapseOnSelect: true,
        defaultExpanded: true,
        dataSource: dataSource
      }));
      expect(wrapper.instance().getExpanded()).to.be.true;
      wrapper.instance().setValue(3);
      expect(wrapper.instance().getExpanded()).to.be.false;
    });
  });

  describe('clearTextOnBlur', function () {
    it('clears search text when combo recives blur', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
        clearTextOnBlur: true,
        defaultText: 'hello world'
      }));
      expect(wrapper.instance().getText()).to.equal('hello world');
      wrapper.simulate('blur');
      expect(wrapper.instance().getText()).to.be.null;
    });
  });

  describe('maxValueLength', function () {
    it('restricts the multiple value length', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
        maxValueLength: 2,
        multiple: true,
        dataSource: dataSource,
        defaultValue: [1, 2]
      }));
      wrapper.instance().selectItem(3);
      expect(wrapper.instance().getValue()).to.deep.equal([1, 2]);
    });
  });

  describe('keepTagTextOnRemove', function () {
    it('when a tag is removed with backspace, text changes to the tags value, and the tag is removed', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        maxValueLength: 2,
        multiple: true,
        keepTagTextOnRemove: true,
        dataSource: dataSource,
        defaultValue: [1]
      }));
      wrapper.instance().focus();
      wrapper.find(_TextInput2.default).at(0).simulate('keyDown', {
        key: 'Backspace'
      });
      expect(wrapper.instance().getText()).to.equal('test1');
      expect(wrapper.instance().getValue()).to.be.null;
    });
  });

  describe('tagActiveStyle', function () {
    it('adds style on active tag', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        tagActiveStyle: { color: 'red' },
        multiple: true,
        activeTag: 2,
        value: [1, 2],
        dataSource: [{ id: 1, label: 'hello' }, { id: 2, label: 'hello 2' }]
      }));
      expect(wrapper.find('.' + ROOT_CLASS + '__value__tag').at(1).props().style.color).to.equal('red');
    });
  });

  describe('onItemClick', function () {
    it('is called when item is clicked', function () {
      var onItemClick = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        expanded: true,
        dataSource: [{ id: 1, label: 'hello world' }],
        onItemClick: onItemClick
      }));
      wrapper.find(_Item2.default).at(0).simulate('click');
      expect(onItemClick.called).to.be.true;
      expect(onItemClick.args[0][0].item.id).to.equal(1);
    });
  });

  describe('renderInput', function () {
    it('mutates original input comp props', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        searchable: true,
        text: 'hello world',
        renderInput: function renderInput(_ref) {
          var domProps = _ref.domProps;

          domProps.id = "cutomInputId";
        }
      }));
      expect(wrapper.find('#cutomInputId')).to.have.length(1);
    });
    it('renders a custom input', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        searchable: true,
        text: 'hello world',
        renderInput: function renderInput(_ref2) {
          var domProps = _ref2.domProps;

          return _react2.default.createElement('input', { id: 'customId' });
        }
      }));
      expect(wrapper.find('#customId')).to.have.length(1);
    });
  });

  describe('renderList', function () {
    it('renders a custom list', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        expanded: true,
        dataSource: [{ id: 1 }],
        renderList: function renderList() {
          return _react2.default.createElement(
            'div',
            { id: 'customList' },
            ' hello world '
          );
        }
      }));
      expect(wrapper.find('#customList')).to.have.length(1);
    });
    it('mutated props are applid on default list', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        expanded: true,
        dataSource: [{ id: 1 }],
        renderList: function renderList(_ref3) {
          var domProps = _ref3.domProps;

          domProps.id = 'customListId';
        }
      }));
      expect(wrapper.find('#customListId')).to.have.length(1);
    });
  });
});