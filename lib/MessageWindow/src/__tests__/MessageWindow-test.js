'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MessageWindow = require('../MessageWindow');

var _MessageWindow2 = _interopRequireDefault(_MessageWindow);

var _enzyme = require('enzyme');

var _Buttons = require('../Buttons');

var _Icons = require('../Icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('MessageWindow', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_MessageWindow2.default, null));
  });

  describe('dismissOnButtonClick true', function () {
    it('calls onDismiss on okButton click', function () {
      var onDismiss = sinon.spy();
      wrapper.setProps({ onDismiss: onDismiss, type: 'info', dismissOnButtonClick: true });
      wrapper.find(_Buttons.OkButton).first().simulate('click');
      expect(onDismiss.called).to.be.true;
    });
    it('calls onDismiss on yesButton click', function () {
      var onDismiss = sinon.spy();
      wrapper.setProps({
        onDismiss: onDismiss,
        type: 'question',
        dismissOnButtonClick: true
      });
      wrapper.find(_Buttons.YesButton).first().simulate('click');
      expect(onDismiss.called).to.be.true;
    });
    it('calls onDismiss on noButton click', function () {
      var onDismiss = sinon.spy();
      wrapper.setProps({
        onDismiss: onDismiss,
        type: 'question',
        dismissOnButtonClick: true
      });
      wrapper.find(_Buttons.NoButton).first().simulate('click');
      expect(onDismiss.called).to.be.true;
    });
    it('calls onDismiss on cancelButton click', function () {
      var onDismiss = sinon.spy();
      wrapper.setProps({
        onDismiss: onDismiss,
        type: 'yesNoCancel',
        dismissOnButtonClick: true
      });
      wrapper.find(_Buttons.CancelButton).first().simulate('click');
      expect(onDismiss.called).to.be.true;
    });
  });

  describe('opacity', function () {
    it('it is added to inline style', function () {
      wrapper.setProps({ opacity: 0.5 });
      var test = wrapper.find('.zippy-react-toolkit-message-window').first().props().style.opacity;
      expect(test).to.equal(0.5);
    });
  });

  describe('type info', function () {
    it('renders correct icon and buttons', function () {
      wrapper.setProps({ type: 'info' });
      expect(wrapper.find(_Buttons.OkButton)).to.have.length(1);
      expect(wrapper.find(_Icons.InfoIcon)).to.have.length(1);
    });
  });

  describe('type question', function () {
    it('renders correct icon and buttons', function () {
      wrapper.setProps({ type: 'question' });
      expect(wrapper.find(_Buttons.YesButton)).to.have.length(1);
      expect(wrapper.find(_Buttons.NoButton)).to.have.length(1);
      expect(wrapper.find(_Icons.QuestionIcon)).to.have.length(1);
    });
  });

  describe('type error', function () {
    it('renders correct icon and buttons', function () {
      wrapper.setProps({ type: 'error' });
      expect(wrapper.find(_Buttons.OkButton)).to.have.length(1);
      expect(wrapper.find(_Icons.ErrorIcon)).to.have.length(1);
    });
  });
});