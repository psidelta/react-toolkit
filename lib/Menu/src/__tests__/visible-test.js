'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _renderIntoDOM4 = require('./renderIntoDOM');

var _renderIntoDOM5 = _interopRequireDefault(_renderIntoDOM4);

require('../../style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Menu2.default.defaultProps.rootClassName;

describe('visible', function () {
  it('should have ' + ROOT_CLASS + '--hidden className', function () {
    var _renderIntoDOM = (0, _renderIntoDOM5.default)(_react2.default.createElement(_Menu2.default, { visible: false, items: [{ label: 'test' }] })),
        wrapper = _renderIntoDOM.wrapper,
        wrapperNode = _renderIntoDOM.wrapperNode,
        unmount = _renderIntoDOM.unmount;

    expect(wrapperNode.classList.contains(ROOT_CLASS + '--hidden')).to.be.true;
    unmount();
  });

  it('visible=false should have computed style of visibility = hidden', function () {
    var _renderIntoDOM2 = (0, _renderIntoDOM5.default)(_react2.default.createElement(_Menu2.default, { visible: false, items: [{ label: 'test' }] })),
        wrapper = _renderIntoDOM2.wrapper,
        wrapperNode = _renderIntoDOM2.wrapperNode,
        unmount = _renderIntoDOM2.unmount;

    expect(getComputedStyle(wrapperNode).visibility).to.be.equal('hidden');
    unmount();
  });

  it('visible=false should have computed style of visibility = true', function () {
    var _renderIntoDOM3 = (0, _renderIntoDOM5.default)(_react2.default.createElement(_Menu2.default, { visible: true, items: [{ label: 'test' }] })),
        wrapper = _renderIntoDOM3.wrapper,
        wrapperNode = _renderIntoDOM3.wrapperNode,
        unmount = _renderIntoDOM3.unmount;

    expect(getComputedStyle(wrapperNode).visibility).to.be.equal('visible');
    unmount();
  });
});