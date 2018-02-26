'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tag = require('../Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('tag', function () {
  describe('border', function () {
    it('adds border on style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Tag2.default, { border: '1px solid red' }));
      expect(wrapper.find('div').at(0).props().style.border).to.equal('1px solid red');
    });
  });
  describe('padding', function () {
    it('adds padding on style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Tag2.default, { padding: 20 }));
      expect(wrapper.find('div').at(0).props().style.padding).to.equal(20);
    });
  });
  describe('width', function () {
    it('adds width on style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Tag2.default, { width: 20 }));
      expect(wrapper.find('div').at(0).props().style.width).to.equal(20);
    });
  });
  describe('height', function () {
    it('adds height on style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Tag2.default, { height: 20 }));
      expect(wrapper.find('div').at(0).props().style.height).to.equal(20);
    });
  });
  describe('style', function () {
    it('gets added on tag', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Tag2.default, { style: { color: 'red' } }));
      expect(wrapper.find('div').at(0).props().style.color).to.equal('red');
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