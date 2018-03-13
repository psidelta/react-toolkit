'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

require('../../style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Menu2.default.defaultProps.rootClassName;

describe('visible', function () {
  it('should have ' + ROOT_CLASS + '--hidden className', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { visible: false, items: [{ label: 'test' }] }));

    var menu = component.find('.zippy-react-toolkit-menu');

    expect(component.find('.zippy-react-toolkit-menu').hasClass(ROOT_CLASS + '--hidden')).toBe(true);
  });

  xit('visible=false should have computed style of visibility = hidden', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { visible: false, items: [{ label: 'test' }] }));
    var instance = component.instance();
    expect(getComputedStyle(instance).visibility).toBeCalled('hidden');
  });

  xit('visible=false should have computed style of visibility = true', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { visible: false, items: [{ label: 'test' }] }));
    var instance = component.instance();

    expect(getComputedStyle(instance).visibility).toBe('visible');
  });
});