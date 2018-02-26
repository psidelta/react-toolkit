'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

var _Icon = require('../../../common/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('dismiss props', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, null));
  });

  describe('closeable', function () {
    it('renders close icon type close-regular', function () {
      wrapper.setProps({ closeable: true });
      var closeIcon = wrapper.find(_Icon2.default).filterWhere(function (item) {
        return item.props().type === 'close-regular';
      });
      expect(closeIcon).to.have.length(1);
    });
  });
  describe('onClose', function () {
    it('is called when Icon is clicked', function () {
      var onClose = sinon.spy();
      wrapper.setProps({ closeable: true, onClose: onClose });
      // wrapper.find(Icon).first().simulate('click');
      var closeIcon = wrapper.find(_Icon2.default).filterWhere(function (item) {
        return item.props().type === 'close-regular';
      }).first();
      closeIcon.simulate('click');
      expect(onClose.called).to.be.true;
    });
  });
  describe('closeIcon', function () {
    it('renders jsx', function () {
      wrapper.setProps({
        closeable: true,
        closeIcon: _react2.default.createElement('div', { id: 'closeIcon' })
      });
      expect(wrapper.find('#closeIcon')).to.have.length(1);
    });
  });
});