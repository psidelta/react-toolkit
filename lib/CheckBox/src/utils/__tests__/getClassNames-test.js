'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _CheckBox = require('../../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _getClassNames = require('../getClassNames');

var _getClassNames2 = _interopRequireDefault(_getClassNames);

var _testUtils = require('../../testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  rtl: true,
  readOnly: true,
  rootClassName: 'zippy-react-toolkit-checkbox'
};

describe('getClassNames', function () {
  it('builds correct className', function () {
    var expected = 'zippy-react-toolkit-checkbox zippy-react-toolkit-checkbox--rtl zippy-react-toolkit-checkbox--read-only';

    var className = (0, _getClassNames2.default)(props);

    expect(className).to.contain('zippy-react-toolkit-checkbox');
    expect(className).to.contain('zippy-react-toolkit-checkbox--rtl');
    expect(className).to.contain('zippy-react-toolkit-checkbox--read-only');
  });
});

describe('Check.props.className', function () {
  it('has correct value in the DOM', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { readOnly: true }));
    var node = (0, _reactDom.findDOMNode)(checkbox);

    var className = node.className;

    expect(className).to.contain('zippy-react-toolkit-checkbox');
    expect(className).to.not.contain('zippy-react-toolkit-checkbox--rtl');
    expect(className).to.contain('zippy-react-toolkit-checkbox--read-only');

    checkbox.rerender(_react2.default.createElement(_CheckBox2.default, null));
    expect(node.className).to.not.contain('zippy-react-toolkit-checkbox--read-only');

    checkbox.unmount();
  });
});