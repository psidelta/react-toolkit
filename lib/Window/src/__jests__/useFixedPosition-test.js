'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('fixed true', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Window2.default, null));
  });

  it('adds --fixed className', function () {
    wrapper.setProps({ relativeToViewport: true });
    expect(wrapper.find('.' + ROOT_CLASS + '--fixed')).toHaveLength(1);
  });

  it('adds --fixed className on wrapper if relativeToViewport is true', function () {
    wrapper.setProps({ modal: true, relativeToViewport: true });
    wrapper.setState({ isTopModal: true });
    expect(wrapper.find('.' + ROOT_CLASS + '__modal-wrapper--fixed')).toHaveLength(1);
  });
});