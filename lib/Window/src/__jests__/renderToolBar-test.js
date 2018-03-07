'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('renderToolBar', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, null));
  });

  it('renders what it returns', function () {
    var renderToolBar = function renderToolBar() {
      return _react2.default.createElement('div', { id: 'helloWorld' });
    };
    wrapper.setProps({ renderToolBar: renderToolBar });
    expect(wrapper.find('#helloWorld')).toHaveLength(1);
  });

  it('renders with mutated domProps', function () {
    var renderToolBar = function renderToolBar(domProps) {
      domProps.id = 'helloWorld';
    };
    wrapper.setProps({ renderToolBar: renderToolBar });
    expect(wrapper.find('#helloWorld')).toHaveLength(1);
  });
});