'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _enzyme = require('enzyme');

var _testUtils = require('../../../common/testUtils');

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import '../../style/index.scss';

var getStyle = function getStyle(instance) {
  return getComputedStyle((0, _reactDom.findDOMNode)((0, _testUtils.render)(instance)));
};

describe('Flex', function () {
  xit('props.row should apply flex-flow: row', function () {
    var style = getStyle(_react2.default.createElement(_index.Flex, { row: true, flex: 2 }));

    expect(style.flexGrow).toEqual('2');
    expect(style.flexFlow).toEqual('row wrap');
  });
  xit('props.column should apply flex-flow: column', function () {
    var style = getStyle(_react2.default.createElement(_index.Flex, { wrap: false, column: true }));

    expect(style.flexGrow).toEqual('0');
    expect(style.flexFlow).toEqual('column nowrap');
  });

  xit('props.alignItems should be applied correctly', function () {
    var style = getStyle(_react2.default.createElement(_index.Flex, { alignItems: 'end' }));

    expect(style.alignItems).toEqual('flex-end');
  });

  it('should accept className', function () {
    var instance = (0, _reactDom.findDOMNode)((0, _testUtils.render)(_react2.default.createElement(_index.Flex, { className: 'xxx' })));

    expect(instance.className).toContain('xxx');
  });

  xit('should accept style', function () {
    var style = getStyle(_react2.default.createElement(_index.Flex, { style: { marginLeft: 1 } }));

    expect(style.marginLeft).toEqual('1px');
  });
});

describe('Item', function () {
  xit('should default to flex 1', function () {
    var style = getStyle(_react2.default.createElement(_index.Item, null));

    expect(style.flexGrow).toEqual('1');
  });

  it('should accept className', function () {
    var instance = (0, _reactDom.findDOMNode)((0, _testUtils.render)(_react2.default.createElement(_index.Item, { className: 'xxx' })));

    expect(instance.className).toContain('xxx');
  });

  xit('should accept style', function () {
    var style = getStyle(_react2.default.createElement(_index.Item, { style: { marginLeft: 1 } }));

    expect(style.marginLeft).toEqual('1px');
  });
});