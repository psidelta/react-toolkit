'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _join = require('../../../common/join');

var _join2 = _interopRequireDefault(_join);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName;
var titleClassName = rootClassName + '__title-bar';
var borderBottomClassName = rootClassName + '__title-bar-border-bottom';
var borderTopClassName = rootClassName + '__title-bar-border-top';

describe('renderTitleBar', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  it('should not render renderTitleBar if false', function () {
    expect(wrapper.find('.' + titleClassName)).toHaveLength(1);
    wrapper.setProps({ renderTitleBar: false });
    expect(wrapper.find('.' + titleClassName)).toHaveLength(0);
  });

  xdescribe('jsx', function () {
    it('should render jsx insted of renderTitlebar', function () {
      wrapper.setProps({ renderTitleBar: _react2.default.createElement('div', { id: 'customTitleBarId' }) });
      expect(wrapper.find('#customTitleBarId')).toHaveLength(1);
      expect(wrapper.find(titleClassName)).toHaveLength(0);
    });
  });

  describe('function', function () {
    it('should be called with domProps and props', function () {
      var renderTitleBar = jest.fn(function () {
        return _react2.default.createElement('div', { id: 'customData' });
      });
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, { renderTitleBar: renderTitleBar, titleBarPosition: 'top' }));

      expect(renderTitleBar).toHaveBeenCalledTimes(1);
      expect(wrapper.find('#customData')).toHaveLength(1);
      expect(renderTitleBar.mock.calls[0][0].className).toEqual((0, _join2.default)(titleClassName, borderBottomClassName));
    });

    it('should be called with domProps and props', function () {
      var renderTitleBar = jest.fn(function () {
        return _react2.default.createElement('div', { id: 'customData' });
      });
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, { renderTitleBar: renderTitleBar, titleBarPosition: 'bottom' }));
      expect(wrapper.find('#customData')).toHaveLength(1);
      expect(renderTitleBar.mock.calls[0][0].className).toEqual((0, _join2.default)(titleClassName, borderTopClassName));
    });

    it('should render renderTitlebar with mutated domProps', function () {
      var renderTitleBar = function renderTitleBar(domProps) {
        domProps.id = 'titleBarId';
      };
      wrapper.setProps({ renderTitleBar: renderTitleBar });
      expect(wrapper.find('#titleBarId')).toHaveLength(1);
    });
  });
});