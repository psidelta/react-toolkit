'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('visible props', function () {
  describe('visible false', function () {
    it('should add --invisible className if false', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { visible: false }));
      expect(wrapper.find('.' + ROOT_CLASS + '--invisible')).to.have.length(1);
    });
    it('should render null when `renderNullWhenInvisible` is true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { visible: false, renderNullWhenInvisible: true }));
      expect(wrapper.instance().render()).to.be.null;
    });
  });
  describe('visible true', function () {
    it("doesn't add --invisible className", function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { visible: true }));
      expect(wrapper.find('.' + ROOT_CLASS + '--invisible')).to.have.length(0);
    });
  });
});