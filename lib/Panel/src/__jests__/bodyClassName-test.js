'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName;
var bodyClassName = '.' + rootClassName + '__body';

describe('bodyStyle', function () {
  it('should default to false', function () {
    var className = 'customClassName';
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, { bodyClassName: className }));

    expect(wrapper.find('.' + className)).toHaveLength(1);
  });
});