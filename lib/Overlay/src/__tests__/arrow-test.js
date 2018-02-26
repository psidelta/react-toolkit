'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('arrow', function () {
  describe('arrowStyle', function () {
    it('should be used as inline style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { arrowStyle: { color: 'red' } }));
      wrapper.setState({ arrowConfig: {} });
      expect(wrapper.find('.react-overlay__arrow').at(0).props().style.color).to.equal('red');
    });
  });
  describe('arrowClassName', function () {
    it('should be used as inline style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { arrowClassName: 'customArrow' }));
      wrapper.setState({ arrowConfig: {} });
      expect(wrapper.find('.customArrow')).to.have.length(1);
    });
  });
  describe('border', function () {
    it('should be added', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { border: '1px solid red' }));
      wrapper.setState({ arrowConfig: {} });
      expect(wrapper.find('.react-overlay__arrow').at(0).props().style.border).to.equal('1px solid red');
    });
  });
  describe('arrow', function () {
    it('should be rendered only if is true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { arrow: true, border: '1px solid red' }));
      wrapper.setState({ arrowConfig: {} });
      expect(wrapper.find('.react-overlay__arrow')).to.have.length(1);
      wrapper.setProps({ arrow: false });
      expect(wrapper.find('.react-overlay__arrow')).to.have.length(0);
    });
  });
  describe('arrowSize', function () {
    it('numeric sets both width and height to same value', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { border: '1px solid red' }));
      wrapper.setState({ arrowConfig: {} });

      wrapper.setProps({ arrowSize: 20 });
      expect(wrapper.find('.react-overlay__arrow').at(0).props().style.width).to.equal(20);
      expect(wrapper.find('.react-overlay__arrow').at(0).props().style.height).to.equal(20);
    });
    xit('if object is applied on style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { border: '1px solid red' }));
      wrapper.setState({ arrowConfig: {} });
      wrapper.setProps({ arrowSize: { width: 20, height: 30 } });
      expect(wrapper.find('.react-overlay__arrow').at(0).props().style.width).to.equal(20);
      expect(wrapper.find('.react-overlay__arrow').at(0).props().style.height).to.equal(30);
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