'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('centered props', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, null));
  });

  describe('centered', function () {
    it('adds --  className', function () {
      wrapper.setProps({ centered: true });
      expect(wrapper.find('.' + ROOT_CLASS + '--centered')).to.have.length(1);
    });
    it('should not set position and size props on style when true', function () {
      wrapper.setProps({
        maximized: true,
        size: { width: 100, height: 100 },
        position: { top: 100, left: 200 }
      });

      expect(wrapper.find('.' + ROOT_CLASS).props().style.top).to.be.empty;
      expect(wrapper.find('.' + ROOT_CLASS).props().style.left).to.be.empty;
      expect(wrapper.find('.' + ROOT_CLASS).props().style.width).to.be.empty;
      expect(wrapper.find('.' + ROOT_CLASS).props().style.height).to.be.empty;
    });
  });
  describe('defaultCentered', function () {
    it("uses it's value as default", function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { defaultCentered: true }));
      expect(wrapper.instance().getCentered()).to.be.true;
    });
  });
});