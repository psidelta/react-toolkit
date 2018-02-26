'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

xdescribe('loadAsyncDataSource', function () {
  it('it is called list expands', function () {
    var loadAsyncDataSource = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
      defaultExpanded: false,
      loadAsyncDataSource: loadAsyncDataSource
    }));
    wrapper.instance().expand();
    expect(loadAsyncDataSource.called).to.be.true;
  });
  it('is called when length of text is more than filterMinLength', function () {
    var loadAsyncDataSource = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
      defaultText: '',
      filterMinLength: 3,
      loadAsyncDataSource: loadAsyncDataSource
    }));
    expect(loadAsyncDataSource.called).to.be.false;
    wrapper.instance().setText('12');
    expect(loadAsyncDataSource.called).to.be.false;
    wrapper.instance().setText('123');
    expect(loadAsyncDataSource.called).to.be.true;
  });
  it('replaces datasource when called', function () {
    var data = [{ id: 'hello world' }];
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { loadAsyncDataSource: function loadAsyncDataSource() {
        return data;
      } }));
    expect(wrapper.instance().getData()).to.be.falsey;
    wrapper.instance().loadAsyncDataSource({ action: 'fake' });
    expect(wrapper.instance().getData()).to.equal(data);
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