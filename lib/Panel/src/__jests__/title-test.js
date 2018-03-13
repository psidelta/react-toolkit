'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('title', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  describe('node', function () {
    it('should render as title text when string', function () {
      var title = 'hello world';
      wrapper.setProps({ title: title });
      expect(wrapper.find('.' + _Panel.CLASS_NAME + '__title').first().text()).toEqual(title);
    });

    it('should render jsx', function () {
      var title = _react2.default.createElement('div', { id: 'customId' });
      wrapper.setProps({ title: title });
      expect(wrapper.find('#customId')).toHaveLength(1);
    });
  });

  describe('function', function () {
    it('should be called and renders what it returns', function () {
      var title = jest.fn(function () {
        return _react2.default.createElement('div', { id: 'customFunctionId' });
      });
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, { title: title }));

      expect(title).toHaveBeenCalledTimes(1);
      expect(wrapper.find('#customFunctionId')).toHaveLength(1);
    });
    it('should render default title with mutated domProps', function () {
      var title = function title(domProps) {
        domProps.id = 'customMutatedId';
      };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Panel2.default, { title: title }));
      expect(wrapper.find('#customMutatedId')).toHaveLength(1);
    });
  });
});