'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('modal', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Window2.default, null));
  });

  it('adds --modal class name', function () {
    wrapper.setProps({ modal: true });
    expect(wrapper.find('.' + ROOT_CLASS + '--modal')).toHaveLength(1);
  });

  describe('modal wrapper', function () {
    it('renders a wrapper if it is topmost modal', function () {
      wrapper.setProps({ modal: true });
      wrapper.setState({ isTopModal: true });
      expect(wrapper.find('.' + ROOT_CLASS + '__modal-wrapper')).toHaveLength(1);
    });

    it('adds a wrapper only if it is topmost modal', function () {
      wrapper.setProps({ modal: true });
      wrapper.setState({ isTopModal: false });

      expect(wrapper.find('.' + ROOT_CLASS + '__modal-wrapper')).toHaveLength(0);
    });
  });
});