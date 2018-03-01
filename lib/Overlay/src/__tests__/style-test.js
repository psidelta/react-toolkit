'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('style and classnames', function () {
  describe('border', function () {
    it('should add border on outer wrapper', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { border: '1px solid red' }));
      expect(wrapper.find('.react-overlay').at(0).props().style.border).to.equal('1px solid red');
    });
  });
  describe('height', function () {
    it('should be added on inline style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { height: 100 }));
      expect(wrapper.find('.react-overlay').at(0).props().style.height).to.equal(100);
    });
  });
  describe('width', function () {
    it('should be added on inline style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { width: 100 }));
      expect(wrapper.find('.react-overlay').at(0).props().style.width).to.equal(100);
    });
  });
});