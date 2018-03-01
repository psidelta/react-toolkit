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

describe('active', function () {
  it('should have the correct className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Node2.default, null));
    expect(wrapper.find('.' + CLASS_NAME + '__node--active')).to.have.length(0);
    wrapper.setProps({ active: true });
    expect(wrapper.find('.' + CLASS_NAME + '__node--active')).to.have.length(1);
  });

  it('should call onActiveNodeChange when label is clicked', function () {
    var onActiveNodeChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Node2.default, {
      enableKeyboardNavigation: true,
      path: '0',
      onActiveNodeChange: onActiveNodeChange
    }));

    wrapper.find('.' + CLASS_NAME + '__node__label').simulate('click', {
      stopPropagation: function stopPropagation() {}
    });

    expect(onActiveNodeChange.called).to.be.true;
    expect(onActiveNodeChange.args[0][0].path).to.equal('0');
  });
});