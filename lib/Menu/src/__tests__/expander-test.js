'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Expander = require('../Expander');

var _Expander2 = _interopRequireDefault(_Expander);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('expander', function () {
  it('should render expander if an item has items', function () {
    var items = [{
      label: 'test',
      items: [{ label: 'submenuItem' }]
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
    expect(wrapper.find(_Expander2.default)).to.have.length(1);
  });

  it('custom render from expander', function () {
    var items = [{
      label: 'test',
      items: [{ label: 'submenuItem' }]
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, {
      items: items,
      expander: function expander() {
        return _react2.default.createElement(
          'div',
          { id: 'customExpander' },
          'Hello world'
        );
      }
    }));

    expect(wrapper.find(_Expander2.default)).to.have.length(0);
    expect(wrapper.find('#customExpander')).to.have.length(1);
  });
});