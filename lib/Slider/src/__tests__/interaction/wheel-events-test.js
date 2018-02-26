'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Slider = require('../../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _RangeSlider = require('../../RangeSlider');

var _RangeSlider2 = _interopRequireDefault(_RangeSlider);

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

describe('wheel interaction events', function () {
  describe('Slider', function () {
    it('should increment/decrement', function () {
      var onChangeSpy = sinon.spy();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { defaultValue: 50, onChange: onChangeSpy }));
      component.instance().handleWheel({ deltaY: -1, preventDefault: function preventDefault() {}, stopPropagation: function stopPropagation() {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith(49);

      onChangeSpy.reset();
      component.instance().handleWheel({ deltaY: 1, preventDefault: function preventDefault() {}, stopPropagation: function stopPropagation() {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith(50);
    });
  });

  describe('RangeSlider', function () {
    it('should increment/decrement left value', function () {
      var onChangeSpy = sinon.spy();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: [40, 50], onChange: onChangeSpy }));

      component.setState({
        startHandleFocused: true
      });

      component.instance().handleWheel({ deltaY: -1, preventDefault: function preventDefault() {}, stopPropagation: function stopPropagation() {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([39, 50]);

      onChangeSpy.reset();
      component.instance().handleWheel({ deltaY: 1, preventDefault: function preventDefault() {}, stopPropagation: function stopPropagation() {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([41, 50]);
    });

    it('should increment/decrement right value', function () {
      var onChangeSpy = sinon.spy();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: [40, 50], onChange: onChangeSpy }));

      component.setState({
        endHandleFocused: true
      });

      component.instance().handleWheel({ deltaY: -1, preventDefault: function preventDefault() {}, stopPropagation: function stopPropagation() {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([40, 49]);

      onChangeSpy.reset();
      component.instance().handleWheel({ deltaY: 1, preventDefault: function preventDefault() {}, stopPropagation: function stopPropagation() {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([40, 51]);
    });

    it('should shift entire range when focusing track fill', function () {
      var onChangeSpy = sinon.spy();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: [40, 50], onChange: onChangeSpy }));

      component.setState({
        trackFillFocused: true
      });

      component.instance().handleWheel({ deltaY: -1, preventDefault: function preventDefault() {}, stopPropagation: function stopPropagation() {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([39, 49]);

      onChangeSpy.reset();
      component.instance().handleWheel({ deltaY: 1, preventDefault: function preventDefault() {}, stopPropagation: function stopPropagation() {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([41, 51]);
    });
  });
});