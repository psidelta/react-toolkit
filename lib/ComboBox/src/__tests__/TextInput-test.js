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
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TextInput2.default, { placeholder: _react2.default.createElement(
          'div',
          { id: 'placeholder' },
          ' Hello world '
        ) }));

      expect(wrapper.find('#placeholder')).to.have.length(1);
      wrapper.setProps({ value: 30 });
      expect(wrapper.find('#placeholder')).to.have.length(0);
    });
  });

  describe('throttle', function () {
    it('calls onChange after throttle ms', function () {
      var clock = sinon.useFakeTimers();
      var onChange = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TextInput2.default, { throttle: 300, value: 'hello world', onChange: onChange }));
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
});