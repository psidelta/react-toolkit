'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _enzyme = require('enzyme');

require('../../style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Menu2.default.defaultProps.rootClassName;

describe('autoFocus', function () {
  xit('it should have focus after it was rendered', function (done) {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { autoFocus: true, items: [{ label: 'test' }] }));

    expect(document.activeElement).toBe(_react2.default.createElement('div', null));
    expect(component.find('.zippy-react-toolkit-menu').matchesElement(document.activeElement)).toBe(true);
  });
});