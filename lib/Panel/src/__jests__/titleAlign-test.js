'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName;
var titleBarClassName = rootClassName + '__title';

describe('titleAlign', function () {
  it('should default to start', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
    expect(wrapper.props().titleAlign).toBe(null);
  });

  it('should add correct className', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));

    wrapper.setProps({ titleAlign: 'start' });
    var startClassName = '.' + titleBarClassName + '--align-start';
    expect(wrapper.find(startClassName)).toHaveLength(1);

    wrapper.setProps({ titleAlign: 'center' });
    var centerClassName = '.' + titleBarClassName + '--align-center';
    expect(wrapper.find(centerClassName)).toHaveLength(1);

    wrapper.setProps({ titleAlign: 'end' });
    var endClassName = '.' + titleBarClassName + '--align-end';
    expect(wrapper.find(endClassName)).toHaveLength(1);

    wrapper.setProps({ titleAlign: 'left' });
    var leftClassName = '.' + titleBarClassName + '--align-left';
    expect(wrapper.find(leftClassName)).toHaveLength(1);

    wrapper.setProps({ titleAlign: 'right' });
    var rightClassName = '.' + titleBarClassName + '--align-right';
    expect(wrapper.find(rightClassName)).toHaveLength(1);
  });
});