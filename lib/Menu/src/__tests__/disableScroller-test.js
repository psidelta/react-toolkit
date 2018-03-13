'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _ArrowScroller = require('../../../ArrowScroller');

var _ArrowScroller2 = _interopRequireDefault(_ArrowScroller);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('disableScroller', function () {
  it("when false it doesn't use ArrowScroller", function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Menu2.default, { disableScroller: true }));
    expect(wrapper.find(_ArrowScroller2.default)).to.have.length(0);
  });
});