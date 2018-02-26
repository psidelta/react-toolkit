'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('methods', function () {
  it('addItem appends at the end of the dataSource an item', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: [{ id: 1 }] }));
    wrapper.instance().addItem({ id: 2 });
    expect(wrapper.instance().getData()).to.deep.equal([{ id: 1 }, { id: 2 }]);
  });
  it('clear - clears value and text', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultText: 'hello', defaultValue: 3 }));
    var instance = wrapper.instance();
    instance.clear();
    expect(instance.getText()).to.be.null;
    expect(instance.getValue()).to.be.null;
  });

  describe('getItem', function () {
    it('returns the correct item', function () {
      var data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: data, idProperty: 'id' }));
      expect(wrapper.instance().getItem(2)).to.equal(data[1]);
    });
  });
  describe('getItemCount', function () {
    it('returns the correct item', function () {
      var data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: data, idProperty: 'id' }));
      expect(wrapper.instance().getItemCount()).to.equal(3);
    });
  });
  describe('insertItem', function () {
    it('inserts an item at given index', function () {
      var data = [{ id: 1 }, { id: 3 }];
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: data, idProperty: 'id' }));
      wrapper.instance().insertItem({ index: 1, item: { id: 2 } });
      expect(wrapper.instance().getData()[1]).to.deep.equal({ id: 2 });
    });
  });
  describe('removeItems', function () {
    it('removes items with given ids', function () {
      var data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: data, idProperty: 'id' }));
      wrapper.instance().removeItems([1, 3]);
      expect(wrapper.instance().getData()).to.deep.equal([{ id: 2 }]);
    });
  });
  describe('toggle', function () {
    it('toggles visibility', function () {
      var data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultExpanded: true, dataSource: data, idProperty: 'id' }));
      var instance = wrapper.instance();
      expect(instance.getExpanded()).to.be.true;
      expect(instance.toggle).to.be.ok;
      instance.toggle();
      expect(instance.getExpanded()).to.be.false;
      instance.toggle();
      expect(instance.getExpanded()).to.be.true;
    });
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