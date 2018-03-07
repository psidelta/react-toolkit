'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName;
var titleBarClassName = rootClassName + '__title-bar';

describe('titleBarPosition', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  it('should default to top', function () {
    expect(wrapper.props().titleBarPosition).toEqual('top');
  });

  it('adds correct classname', function () {
    var topClassName = '.' + rootClassName + '--title-bar-position-top';
    wrapper.setProps({ titleBarPosition: 'top' });
    expect(wrapper.find(topClassName)).toHaveLength(1);

    var leftClassName = '.' + rootClassName + '--title-bar-position-left';
    wrapper.setProps({ titleBarPosition: 'left' });
    expect(wrapper.find(leftClassName)).toHaveLength(1);

    var rightClassName = '.' + rootClassName + '--title-bar-position-right';
    wrapper.setProps({ titleBarPosition: 'right' });
    expect(wrapper.find(rightClassName)).toHaveLength(1);

    var bottomClassName = '.' + rootClassName + '--title-bar-position-bottom';
    wrapper.setProps({ titleBarPosition: 'bottom' });
    expect(wrapper.find(bottomClassName)).toHaveLength(1);
  });

  describe('rotated', function () {
    it('titleBar width should be equal to container height', function () {
      var titleBarWrapper = wrapper.find('.' + titleBarClassName);
      wrapper.setProps({ titleBarPosition: 'left' });
      wrapper.instance().onTitleBarResize({ width: 20, height: 20 });
      expect(titleBarWrapper.root().state().titleWidth).toEqual(20);
    });

    describe('left', function () {
      it('content paddingLeft should be equal to titleBar height', function () {
        var titleBarPaddingLeft = wrapper.find('.' + rootClassName);
        wrapper.setProps({ titleBarPosition: 'left' });
        wrapper.instance().onTitleBarResize({ width: 20, height: 20 });
        expect(titleBarPaddingLeft.root().state().titleHeight).toEqual(20);
      });
    });
    describe('right', function () {
      it('content paddingRight should be equal to titleBar height', function () {
        var titleBarPaddingRight = wrapper.find('.' + rootClassName);
        wrapper.setProps({ titleBarPosition: 'right' });
        wrapper.instance().onTitleBarResize({ width: 20, height: 20 });
        expect(titleBarPaddingRight.root().state().titleHeight).toEqual(20);
      });
    });
  });
});