'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('border', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, null));
  });

  it('renders specified border', function () {
    wrapper.setProps({ border: 'custom border' });
    expect(wrapper.find('.' + ROOT_CLASS).props().style.border).to.equal('custom border');
  });
});