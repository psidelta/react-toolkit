import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';
import Icon from '../../../common/Icon';
const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('maximize props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window maximizable />);
  });

  describe('maximizable', () => {
    it("doesn't render maximize tool when false", () => {
      wrapper.setProps({ maximizable: false });
      const resizeIcon = wrapper
        .find(Icon)
        .filterWhere(item => item.props().type === 'resize-regular');
      expect(resizeIcon).to.have.length(0);
    });
    it('renders Icon when true', () => {
      wrapper.setProps({ maximizable: true });
      const resizeIcon = wrapper
        .find(Icon)
        .filterWhere(item => item.props().type === 'resize-regular');
      expect(resizeIcon).to.have.length(1);
    });
  });

  describe('maximized and defaultMaximized', () => {
    it('should render maximize icon when is false', () => {
      wrapper.setProps({ maximized: false });
      const resizeIcon = wrapper
        .find(Icon)
        .filterWhere(item => item.props().type === 'resize-regular');
      expect(resizeIcon).to.have.length(1);
    });
    it('should render restore icon when maximized is false', () => {
      wrapper.setProps({ maximized: true });
      const restoreIcon = wrapper
        .find(Icon)
        .filterWhere(item => item.props().type === 'restore');
      expect(restoreIcon).to.have.length(1);
    });
    it('should have --maximized className when true', () => {
      wrapper.setProps({ maximized: true });
      expect(wrapper.find(`.${ROOT_CLASS}--maximized`)).to.have.length(1);
    });
    it('should not change state when setMaximized is called', () => {
      wrapper.setProps({ maximized: true });
      wrapper.instance().setMaximized(false);
      expect(wrapper.instance().getMaximized()).to.be.true;
    });
    it('getMaximized should return maximized state and not this.state.maximized', () => {
      wrapper.setProps({ maximized: true });
      wrapper.setState({ maximized: false });
      expect(wrapper.instance().getMaximized()).to.be.true;
    });
    it('uses defaultMaximized when maximized is not set', () => {
      const wrapper = mount(<Window maximizable defaultMaximized />);
      expect(wrapper.instance().getMaximized()).to.be.true;
    });
    it('should not set position and size props on style when true', () => {
      wrapper.setProps({
        maximized: true,
        size: { width: 100, height: 100 },
        position: { top: 100, left: 200 }
      });

      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.top).to.be.empty;
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.left).to.be.empty;
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.width).to.be.empty;
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.height).to.be.empty;
    });
    it('should not render resize handles when it is maximized', () => {
      wrapper.setProps({ maximized: true });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).to.have.length(0);
    });
  });

  describe('maximizeOnDoubleClick', () => {
    it('should trigger onMaximizeChange', () => {
      const onMaximizeChange = sinon.spy();
      wrapper.setProps({ maximizeOnDoubleClick: true, onMaximizeChange });
      wrapper.find(`.${ROOT_CLASS}__title-bar`).simulate('doubleClick');
      expect(onMaximizeChange.called).to.be.true;
      expect(onMaximizeChange.args[0][0]).to.be.true;
    });
  });

  describe('maximizedIcon', () => {
    it('renders jsx', () => {
      wrapper.setProps({
        maximized: false,
        maximizeIcon: <div id="maximizeicon" />
      });
      expect(wrapper.find('#maximizeicon')).to.have.length(1);
    });
  });

  describe('restoreIcon', () => {
    it('renders jsx', () => {
      wrapper.setProps({
        maximized: true,
        restoreIcon: <div id="restoreIcon" />
      });
      expect(wrapper.find('#restoreIcon')).to.have.length(1);
    });
  });

  describe('events', () => {
    describe('onMaximizeChange', () => {
      it('should be called when setMaximized is called', () => {
        const onMaximizeChange = sinon.spy();
        wrapper.setProps({ onMaximizeChange });
        wrapper.instance().setMaximized(true);
        expect(onMaximizeChange.called).to.be.true;
        expect(onMaximizeChange.args[0][0]).to.be.true;
      });
      it('should trigger onMaximizeChange when maximizeicon is clicked', () => {
        const onMaximizeChange = sinon.spy();
        wrapper.setProps({ onMaximizeChange, maximized: false });
        const resizeIcon = wrapper
          .find(Icon)
          .filterWhere(item => item.props().type === 'resize-regular');
        resizeIcon.simulate('click');
        expect(onMaximizeChange.called).to.be.true;
      });
      it('should trigger onMaximizeChange when restoreIcon is clicked', () => {
        const onMaximizeChange = sinon.spy();
        wrapper.setProps({ onMaximizeChange, maximized: true });
        const resizeIcon = wrapper
          .find(Icon)
          .filterWhere(item => item.props().type === 'restore');
        resizeIcon.simulate('click');
        expect(onMaximizeChange.called).to.be.true;
      });
    });
    it('should call onMaximize when maximized changes from false to true', () => {
      const onMaximize = sinon.spy();
      wrapper.setProps({
        onMaximize,
        maximized: false
      });
      expect(onMaximize.called).to.be.false;
      wrapper.instance().setMaximized(true);
      expect(onMaximize.called).to.be.true;
    });
    it('should call onRestore when maximized changes from true to false', () => {
      const onRestore = sinon.spy();
      wrapper.setProps({
        onRestore,
        maximized: true
      });
      expect(onRestore.called).to.be.false;
      wrapper.instance().setMaximized(false);
      expect(onRestore.called).to.be.true;
    });
  });
});
