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
    it("doesn't change when a change is triggered", function () {
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
});