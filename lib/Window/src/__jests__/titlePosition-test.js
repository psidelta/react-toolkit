'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('titlePosition', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, null));
  });

  describe('start', function () {
    it('renders title as first child', function () {
      wrapper.setProps({ titlePosition: 'start' });
      expect(wrapper.find('.' + ROOT_CLASS + '__title-bar').childAt(0).props().className).toEqual(ROOT_CLASS + '__title-wrapper');
    });
  });

  describe('end', function () {
    it('renders title as last child', function () {
      wrapper.setProps({ titlePosition: 'end' });
      expect(wrapper.find('.' + ROOT_CLASS + '__title-bar').childAt(1).props().className).toEqual(ROOT_CLASS + '__title-wrapper');
    });
  });
});