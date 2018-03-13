'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Node = require('../../Node');

var _Node2 = _interopRequireDefault(_Node);

var _enzyme = require('enzyme');

var _TreeView = require('../../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('icons', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, null));
  });

  describe('nodeIcon', function () {
    it('should render img if a string', function () {
      wrapper.setProps({
        nodeIcon: 'test'
      });
      expect(wrapper.find('.' + CLASS_NAME + '__node__icon-img')).toHaveLength(1);
    });

    it('it should render jsx', function () {
      wrapper.setProps({
        nodeIcon: _react2.default.createElement('div', { id: 'customIcon' })
      });
      expect(wrapper.find('#customIcon')).toHaveLength(1);
    });
  });

  describe('leafNodeIcon', function () {
    it('should render if it is collapsed jsx and overwrite nodeIcon', function () {
      wrapper.setProps({
        collapsed: true,
        nodeIcon: _react2.default.createElement('div', { id: 'customIcon' }),
        leafNodeIcon: _react2.default.createElement('div', { id: 'customIcon2' })
      });
      expect(wrapper.find('#customIcon2')).toHaveLength(1);
      expect(wrapper.find('#customIcon')).toHaveLength(0);
    });
    it('should render img if a string', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { leafNodeIcon: 'test' }));
      expect(wrapper.find('.' + CLASS_NAME + '__node__icon-img')).toHaveLength(1);
    });
  });

  describe('nodeCollapsedIcon', function () {
    it('should render if it is collapsed jsx and overwrite nodeIcon', function () {
      wrapper.setProps({
        hasChildren: true,
        collapsed: true,
        nodeIcon: _react2.default.createElement('div', { id: 'customIcon' }),
        nodeCollapsedIcon: _react2.default.createElement('div', { id: 'customIcon2' })
      });
      expect(wrapper.find('#customIcon2')).toHaveLength(1);
      expect(wrapper.find('#customIcon')).toHaveLength(0);
    });
    it('should render img if a string', function () {
      wrapper.setProps({
        collapsed: true,
        hasChildren: true,
        nodeCollapsedIcon: 'test'
      });
      expect(wrapper.find('.' + CLASS_NAME + '__node__icon-img')).toHaveLength(1);
    });
  });
});