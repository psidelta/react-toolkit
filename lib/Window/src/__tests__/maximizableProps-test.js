'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

var _Icon = require('../../../common/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('maximize props', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { maximizable: true }));
  });

  describe('maximizable', function () {
    it("doesn't render maximize tool when false", function () {
      wrapper.setProps({ maximizable: false });
      var resizeIcon = wrapper.find(_Icon2.default).filterWhere(function (item) {
        return item.props().type === 'resize-regular';
      });
      expect(resizeIcon).to.have.length(0);
    });
    it('renders Icon when true', function () {
      wrapper.setProps({ maximizable: true });
      var resizeIcon = wrapper.find(_Icon2.default).filterWhere(function (item) {
        return item.props().type === 'resize-regular';
      });
      expect(resizeIcon).to.have.length(1);
    });
  });

  describe('maximized and defaultMaximized', function () {
    it('should render maximize icon when is false', function () {
      wrapper.setProps({ maximized: false });
      var resizeIcon = wrapper.find(_Icon2.default).filterWhere(function (item) {
        return item.props().type === 'resize-regular';
      });
      expect(resizeIcon).to.have.length(1);
    });
    it('should render restore icon when maximized is false', function () {
      wrapper.setProps({ maximized: true });
      var restoreIcon = wrapper.find(_Icon2.default).filterWhere(function (item) {
        return item.props().type === 'restore';
      });
      expect(restoreIcon).to.have.length(1);
    });
    it('should have --maximized className when true', function () {
      wrapper.setProps({ maximized: true });
      expect(wrapper.find('.' + ROOT_CLASS + '--maximized')).to.have.length(1);
    });
    it('should not change state when setMaximized is called', function () {
      wrapper.setProps({ maximized: true });
      wrapper.instance().setMaximized(false);
      expect(wrapper.instance().getMaximized()).to.be.true;
    });
    it('getMaximized should return maximized state and not this.state.maximized', function () {
      wrapper.setProps({ maximized: true });
      wrapper.setState({ maximized: false });
      expect(wrapper.instance().getMaximized()).to.be.true;
    });
    it('uses defaultMaximized when maximized is not set', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { maximizable: true, defaultMaximized: true }));
      expect(wrapper.instance().getMaximized()).to.be.true;
    });
    it('should not set position and size props on style when true', function () {
      wrapper.setProps({
        maximized: true,
        size: { width: 100, height: 100 },
        position: { top: 100, left: 200 }
      });

      expect(wrapper.find('.' + ROOT_CLASS).props().style.top).to.be.empty;
      expect(wrapper.find('.' + ROOT_CLASS).props().style.left).to.be.empty;
      expect(wrapper.find('.' + ROOT_CLASS).props().style.width).to.be.empty;
      expect(wrapper.find('.' + ROOT_CLASS).props().style.height).to.be.empty;
    });
    it('should not render resize handles when it is maximized', function () {
      wrapper.setProps({ maximized: true });
      wrapper.find('.' + ROOT_CLASS).simulate('mouseEnter');
      expect(wrapper.find('.' + ROOT_CLASS + '__handle')).to.have.length(0);
    });
  });

  describe('maximizeOnDoubleClick', function () {
    it('should trigger onMaximizeChange', function () {
      var onMaximizeChange = sinon.spy();
      wrapper.setProps({ maximizeOnDoubleClick: true, onMaximizeChange: onMaximizeChange });
      wrapper.find('.' + ROOT_CLASS + '__title-bar').simulate('doubleClick');
      expect(onMaximizeChange.called).to.be.true;
      expect(onMaximizeChange.args[0][0]).to.be.true;
    });
  });

  describe('maximizedIcon', function () {
    it('renders jsx', function () {
      wrapper.setProps({
        maximized: false,
        maximizeIcon: _react2.default.createElement('div', { id: 'maximizeicon' })
      });
      expect(wrapper.find('#maximizeicon')).to.have.length(1);
    });
  });

  describe('restoreIcon', function () {
    it('renders jsx', function () {
      wrapper.setProps({
        maximized: true,
        restoreIcon: _react2.default.createElement('div', { id: 'restoreIcon' })
      });
      expect(wrapper.find('#restoreIcon')).to.have.length(1);
    });
  });

  describe('events', function () {
    describe('onMaximizeChange', function () {
      it('should be called when setMaximized is called', function () {
        var onMaximizeChange = sinon.spy();
        wrapper.setProps({ onMaximizeChange: onMaximizeChange });
        wrapper.instance().setMaximized(true);
        expect(onMaximizeChange.called).to.be.true;
        expect(onMaximizeChange.args[0][0]).to.be.true;
      });
      it('should trigger onMaximizeChange when maximizeicon is clicked', function () {
        var onMaximizeChange = sinon.spy();
        wrapper.setProps({ onMaximizeChange: onMaximizeChange, maximized: false });
        var resizeIcon = wrapper.find(_Icon2.default).filterWhere(function (item) {
          return item.props().type === 'resize-regular';
        });
        resizeIcon.simulate('click');
        expect(onMaximizeChange.called).to.be.true;
      });
      it('should trigger onMaximizeChange when restoreIcon is clicked', function () {
        var onMaximizeChange = sinon.spy();
        wrapper.setProps({ onMaximizeChange: onMaximizeChange, maximized: true });
        var resizeIcon = wrapper.find(_Icon2.default).filterWhere(function (item) {
          return item.props().type === 'restore';
        });
        resizeIcon.simulate('click');
        expect(onMaximizeChange.called).to.be.true;
      });
    });
    it('should call onMaximize when maximized changes from false to true', function () {
      var onMaximize = sinon.spy();
      wrapper.setProps({
        onMaximize: onMaximize,
        maximized: false
      });
      expect(onMaximize.called).to.be.false;
      wrapper.instance().setMaximized(true);
      expect(onMaximize.called).to.be.true;
    });
    it('should call onRestore when maximized changes from true to false', function () {
      var onRestore = sinon.spy();
      wrapper.setProps({
        onRestore: onRestore,
        maximized: true
      });
      expect(onRestore.called).to.be.false;
      wrapper.instance().setMaximized(false);
      expect(onRestore.called).to.be.true;
    });
  });
});