'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('loading', function () {
  describe('defaultLoading', function () {
    it('should be used as initial state', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultLoading: true }));
      expect(wrapper.instance().getLoading()).to.be.true;
    });
  });

  describe('constrolled loading', function () {
    it('should be used insted of state', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultLoading: true, loading: false }));
      expect(wrapper.instance().getLoading()).to.to.be.false;
    });
    it('doesn\'t change when a change is triggered', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultLoading: true, loading: false }));
      wrapper.instance().setLoading(true);
      expect(wrapper.instance().getLoading()).to.to.be.false;
      // state should not be changed
      expect(wrapper.state().loading).to.be.true;
    });
  });
  describe('onLoadingChange', function () {
    it('should be called when setLoaindg is called', function () {
      var onLoadingChange = sinon.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { onLoadingChange: onLoadingChange }));
      wrapper.instance().setLoading(true);
      expect(onLoadingChange.called).to.be.true;
      expect(onLoadingChange.args[0][0]).to.be.true;
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