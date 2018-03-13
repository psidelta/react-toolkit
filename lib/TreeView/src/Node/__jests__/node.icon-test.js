'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Node = require('../../Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('node.icon', function () {
  it('should render jsx', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { node: { label: 'test', icon: _react2.default.createElement('div', { id: 'customIcon' }) } }));
    expect(wrapper.find('#customIcon')).toHaveLength(1);
  });
  it('should render what it return when it is a function', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, {
      index: 20,
      node: {
        label: 'test',
        icon: function icon(_ref) {
          var index = _ref.index;
          return _react2.default.createElement('div', { id: 'test-' + index });
        }
      }
    }));

    expect(wrapper.find('#test-20')).toHaveLength(1);
  });
});