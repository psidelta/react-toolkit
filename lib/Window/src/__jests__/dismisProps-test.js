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

  describe('onClose', function () {
    it('is called when Icon is clicked', function () {
      var onClose = jest.fn();
      wrapper.setProps({ closeable: true, onClose: onClose });
      var closeIcon = wrapper.find('.zippy-react-toolkit-window__close-icon').first();
      closeIcon.simulate('click');
      expect(onClose).toHaveBeenCalled();
    });
  });
  describe('closeIcon', function () {
    it('renders jsx', function () {
      wrapper.setProps({
        closeable: true,
        closeIcon: _react2.default.createElement('div', { id: 'closeIcon' })
      });
      expect(wrapper.find('#closeIcon')).toHaveLength(1);
    });
  });
});