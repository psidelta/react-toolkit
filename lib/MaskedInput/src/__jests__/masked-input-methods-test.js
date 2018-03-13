'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MaskedInput = require('../MaskedInput');

var _MaskedInput2 = _interopRequireDefault(_MaskedInput);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('MaskedInput Methods', function () {
  it('should get the masked value', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_MaskedInput2.default, { value: '12456', mask: '99-999' }));

    var maskedValue = component.instance().getMaskedValue();
    expect(maskedValue).toEqual('12-456');
  });
  it('should get the raw value', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_MaskedInput2.default, { value: '12456', mask: '99-999' }));

    var maskedValue = component.instance().getValue();
    expect(maskedValue).toEqual('12456');
  });
});