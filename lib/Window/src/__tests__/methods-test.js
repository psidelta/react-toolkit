'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('methods', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, null));
  });

  describe('maximize', function () {
    it('updates maximized state', function () {
      wrapper.setProps({ maximizable: true });
      expect(wrapper.instance().getMaximized()).to.be.false;
      wrapper.instance().maximize();
      expect(wrapper.instance().getMaximized()).to.be.true;
    });
    it('calls onMaximize change', function () {
      var onMaximizeChange = sinon.spy();
      wrapper.setProps({ maximizable: true, onMaximizeChange: onMaximizeChange });
      expect(onMaximizeChange.called).to.be.false;
      wrapper.instance().maximize();
      expect(onMaximizeChange.called).to.be.true;
    });
  });

  describe('restore', function () {
    it('updates maximized state', function () {
      wrapper.setState({ maximized: true });
      wrapper.setProps({ maximizable: true });
      expect(wrapper.instance().getMaximized()).to.be.true;
      wrapper.instance().restore();
      expect(wrapper.instance().getMaximized()).to.be.false;
    });
    it('calls onMaximize change', function () {
      var onMaximizeChange = sinon.spy();
      wrapper.setProps({ maximizable: true, onMaximizeChange: onMaximizeChange });
      expect(onMaximizeChange.called).to.be.false;
      wrapper.instance().restore();
      expect(onMaximizeChange.called).to.be.true;
    });
  });

  describe('center', function () {
    it('should trigger onCenteredChange', function () {
      var onCenteredChange = sinon.spy();
      wrapper.setProps({ onCenteredChange: onCenteredChange });
      wrapper.instance().center();
      expect(onCenteredChange.called).to.be.true;
    });
    it('should change state', function () {
      wrapper.instance().center();
      expect(wrapper.instance().getCentered()).to.be.true;
    });
  });
});