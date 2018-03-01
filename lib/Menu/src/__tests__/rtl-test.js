'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Expander = require('../Expander');

var _Expander2 = _interopRequireDefault(_Expander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Menu2.default.defaultProps.rootClassName;

describe('rtl', function () {
  var items = [{ label: 'test', items: [{ label: 'submenu item' }] }, { label: 'test2' }];
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { rtl: true, items: items }));

  it('rtl prop is passed to expender', function () {
    expect(wrapper.find(_Expander2.default).prop('rtl')).to.be.true;
  });

  it('should have ' + ROOT_CLASS + '--rtl className', function () {
    expect(wrapper.find('.' + ROOT_CLASS).at(0).hasClass(ROOT_CLASS + '--rtl')).to.be.true;
  });
});