'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _renderIntoDOM2 = require('./renderIntoDOM');

var _renderIntoDOM3 = _interopRequireDefault(_renderIntoDOM2);

require('../../style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Menu2.default.defaultProps.rootClassName;

describe('autoFocus', function () {
  it('it should have focus after it was rendered', function (done) {
    var _renderIntoDOM = (0, _renderIntoDOM3.default)(_react2.default.createElement(_Menu2.default, { autoFocus: true, items: [{ label: 'test' }] })),
        wrapper = _renderIntoDOM.wrapper,
        wrapperNode = _renderIntoDOM.wrapperNode,
        unmount = _renderIntoDOM.unmount;

    setTimeout(function () {
      expect(wrapperNode).to.be.equal(document.activeElement);
      done();
    }, 300);
  });
});