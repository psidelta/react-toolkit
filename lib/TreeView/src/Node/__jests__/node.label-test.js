'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Node = require('../../Node');

var _Node2 = _interopRequireDefault(_Node);

var _TreeView = require('../../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('node.label', function () {
  it('should render as a string', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { node: { label: 'hello world' } }));
    window.wrapper = wrapper;
    expect(wrapper.find('.zippy-react-toolkit-tree-view__node__label__text').text()).toEqual('hello world');
  });

  it('should render as jsx', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { node: { label: _react2.default.createElement(
          'div',
          { id: 'labelJSX' },
          'hello world'
        ) } }));
    expect(wrapper.find('#labelJSX')).toHaveLength(1);
  });

  it('should render as a function', function () {
    var label = jest.fn(function () {
      return _react2.default.createElement(
        'div',
        { id: 'functionLabel' },
        'hello world'
      );
    });
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { id: 'customId', node: { label: label } }));

    expect(label).toHaveBeenCalled();
    expect(wrapper.find('#functionLabel')).toHaveLength(1);
    expect(label.mock.calls[0][0].id).toEqual('customId');
  });
});