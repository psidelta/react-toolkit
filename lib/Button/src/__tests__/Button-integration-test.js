'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _testUtils = require('../../../common/testUtils');

require('../../style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button verticalAlign', function () {
  it('should add the correct className', function () {
    var button = (0, _testUtils.render)(_react2.default.createElement(
      _Button2.default,
      { iconPosition: 'right', icon: _react2.default.createElement(
          'b',
          null,
          'bold'
        ) },
      'text'
    ));

    expect((0, _reactDom.findDOMNode)(button).className).to.have.string('--vertical-align-middle');

    button.unmount();
  });
});

describe('Button icon', function () {
  it('should support jsx', function () {
    var button = (0, _testUtils.render)(_react2.default.createElement(
      _Button2.default,
      { iconPosition: 'right', icon: _react2.default.createElement(
          'b',
          null,
          'bold'
        ) },
      'text'
    ));

    expect((0, _reactDom.findDOMNode)(button).innerText).to.equal('text\nbold');
    button.unmount();
  });

  it('should support function with component state', function () {
    var button = (0, _testUtils.render)(_react2.default.createElement(_Button2.default, {
      iconPosition: 'right',
      icon: function icon(_ref) {
        var active = _ref.active;

        return active ? 'YES' : 'NO';
      }
    }));

    var dom = (0, _reactDom.findDOMNode)(button);

    expect(dom.innerText).to.equal('NO');

    (0, _testUtils.simulateMouseEvent)('mousedown', dom);
    expect(dom.innerText).to.equal('YES');

    (0, _testUtils.simulateMouseEvent)('mouseup', dom);
    expect(dom.innerText).to.equal('NO');

    button.unmount();
  });
});

describe('Button wrap', function () {
  it('when ellipsis: true and wrap: true, ellipsis should win and make text not wrap', function () {
    var button = (0, _testUtils.render)(_react2.default.createElement(_Button2.default, { ellipsis: true, wrap: true }));

    var node = (0, _reactDom.findDOMNode)(button);

    expect(getComputedStyle(node)['white-space']).to.equal('nowrap');

    button.unmount();
  });
});

describe('Button overflow', function () {
  it('should work when true or false', function () {
    var button = (0, _testUtils.render)(_react2.default.createElement(_Button2.default, { overflow: true }));
    var node = (0, _reactDom.findDOMNode)(button);

    // since ellipsis defaults to true, and wins
    expect(getComputedStyle(node)['overflow']).to.equal('hidden');

    button.rerender(_react2.default.createElement(_Button2.default, { ellipsis: false }));
    // visible is the default overflow style applied to the button
    expect(getComputedStyle(node)['overflow']).to.equal('visible');

    button.rerender(_react2.default.createElement(_Button2.default, { overflow: true, ellipsis: false }));
    expect(getComputedStyle(node)['overflow']).to.equal('visible');

    button.rerender(_react2.default.createElement(_Button2.default, { ellipsis: false, overflow: false }));
    expect(getComputedStyle(node)['overflow']).to.equal('hidden');

    button.unmount();
  });
});