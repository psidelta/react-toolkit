'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TextInput', function () {
  describe('placeholder', function () {
    it('should be rendered when there is no value', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TextInput2.default, {
        placeholder: _react2.default.createElement(
          'div',
          { id: 'placeholder' },
          ' Hello world '
        )
      }));

      expect(wrapper.find('#placeholder')).to.have.length(1);
      wrapper.setProps({ value: 30 });
      expect(wrapper.find('#placeholder')).to.have.length(0);
    });
  });

  describe('throttle', function () {
    it('calls onChange after throttle ms', function () {
      var clock = sinon.useFakeTimers();
      var onChange = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TextInput2.default, {
        throttle: 300,
        value: 'hello world',
        onChange: onChange
      }));
      expect(onChange.called).to.be.false;
      wrapper.instance().handleChange({
        target: {
          value: 'hello'
        }
      });
      expect(onChange.called).to.be.false;
      clock.tick(300);
      expect(onChange.called).to.be.true;
      clock.restore();
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