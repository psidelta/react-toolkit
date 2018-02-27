import React from 'react';
import NotificationBoard from '../NotificationBoard';
import Notification from '../Notification';
import { mount } from 'enzyme';

describe('NotificationBoard', () => {
  it('passes correct style to notification', () => {
    const wrapper = mount(
      <NotificationBoard
        style={{ color: 'red', backgroundColor: 'lightBlue' }}
      />
    );
    wrapper.instance().addNotification({
      style: {
        background: 'blue',
        color: 'purple'
      }
    });
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(
      wrapper
        .find(Notification)
        .at(0)
        .props().style
    ).to.deep.equal({
      backgroundColor: 'lightBlue',
      background: 'blue',
      color: 'purple'
    });
  });
  it('passes props as default to notification', () => {
    const defaultProps = {
      stacking: ['left', 'right'],

      // subcomponents
      title: 'title',
      titleEllipsis: true,
      closeButton: 'true',
      icon: 'icon',

      // style
      position: [],
      border: '1px solid red',
      style: {},
      padding: 20,
      height: 20,
      width: 20,
      minSize: 20,
      borderRadius: 20,
      maxSize: 20,
      opacity: 20,
      shadow: true,
      clearOpacityOnMouseEnter: true,
      hideOnClick: true,
      content: 'hello world',

      offset: 20,
      autoHideDelay: 200,
      delayAutoHideOnMouseOver: true,
      cancelAutoHideOnClick: true,
      moveTransition: true,
      showAnimation: true,
      hideAnimation: true,
      hideTransitionDuration: 20,
      showTransitionDuration: 20,
      background: 'test'
    };
    const wrapper = mount(<NotificationBoard {...defaultProps} />);

    wrapper.instance().addNotification();

    const notificationProps = wrapper
      .find(Notification)
      .at(0)
      .props();
    // all common props should be present on notificationProps
    const test = Object.keys(defaultProps).filter(
      propName => notificationProps[propName]
    );

    expect(test.length).to.equal(Object.keys(defaultProps).length);
  });

  describe('global instance access', () => {
    it('should register itself in the zippy.notification namespace', () => {
      const wrapper = mount(<NotificationBoard id="helloWorld" />);
      expect(wrapper.instance()).to.equal(
        global.zippyui.notification.helloWorld
      );
    });
  });

  describe('addNotification', () => {
    it('adds and renders notifications', () => {
      const wrapper = mount(<NotificationBoard />);
      const instance = global.zippyui.notification.main;

      expect(wrapper.find(Notification)).to.have.length(0);
      instance.addNotification({ title: 'hello world' });
      expect(wrapper.find(Notification)).to.have.length(1);
    });
    it('returns a notification id', () => {
      const wrapper = mount(<NotificationBoard />);
      const instance = global.zippyui.notification.main;
      const id = instance.addNotification({});
      expect(id).to.equal(0);
      const id2 = instance.addNotification({});
      expect(id2).to.equal(1);
    });
  });

  describe('getNotifications', () => {
    it('returns the current notifications', () => {
      const wrapper = mount(<NotificationBoard />);
      const instance = wrapper.instance();
      expect(instance.getNotifications()).to.have.length(0);
      instance.addNotification({ title: 'hello world' });
      expect(instance.getNotifications()).to.have.length(1);
      expect(instance.getNotifications()[0].title).to.equal('hello world');
    });
  });
  describe('getNotification', () => {
    it('retrives a notification by id', () => {
      const wrapper = mount(<NotificationBoard />);
      const instance = wrapper.instance();
      const id = instance.addNotification({ title: 'hello' });
      const notification = instance.getNotification(id);
      expect(notification.title).to.equal('hello');
    });
  });
  describe('destroyOnHide', () => {
    it('removes the notification when true', () => {
      const clock = sinon.useFakeTimers();
      const wrapper = mount(<NotificationBoard removeOnHide />);
      const instance = wrapper.instance();
      instance.addNotification({ autoHideDelay: 100, hideAnimation: false });
      expect(instance.getNotifications()).to.have.length(1);
      clock.tick(600);
      expect(instance.getNotifications()).to.have.length(0);
      clock.restore();
    });
  });
  describe('hideNotification', () => {
    it('changes the visible prop to false', () => {
      const wrapper = mount(<NotificationBoard />);
      const instance = wrapper.instance();
      const id = instance.addNotification({});
      expect(instance.getNotification(id).visible).to.be.true;
      instance.hideNotification(id);
      expect(instance.getNotification(id).visible).to.be.false;
    });
  });
  describe('showNotification', () => {
    it('changes the visible prop to true', () => {
      const wrapper = mount(<NotificationBoard />);
      const instance = wrapper.instance();
      const id = instance.addNotification({});

      expect(instance.getNotification(id).visible).to.be.true;
      instance.hideNotification(id);
      expect(instance.getNotification(id).visible).to.be.false;
      instance.showNotification(id);
      expect(instance.getNotification(id).visible).to.be.true;
    });
  });
  describe('hideAll', () => {
    it('changes the visible prop to true', () => {
      const wrapper = mount(<NotificationBoard />);
      const instance = wrapper.instance();
      instance.addNotification({ autoHideDelay: null });
      instance.addNotification({ autoHideDelay: null });
      instance.addNotification({ autoHideDelay: null });
      instance.hideAll();
      const test = instance
        .getNotifications()
        .filter(notification => notification.visible);

      expect(test).to.have.length(0);
    });
  });
  describe('removeAll', () => {
    it('changes the visible prop to true', () => {
      const wrapper = mount(<NotificationBoard />);
      const instance = wrapper.instance();
      instance.addNotification({ autoHideDelay: null });
      instance.addNotification({ autoHideDelay: null });
      instance.addNotification({ autoHideDelay: null });
      instance.removeAll();
      const test = instance.getNotifications();

      expect(test).to.have.length(0);
    });
  });
  describe('getNotificationInstance', () => {
    it('returns the instance of the notification', () => {
      const wrapper = mount(<NotificationBoard />);
      const instance = wrapper.instance();
      const id = instance.addNotification({ autoHideDelay: null });
      const notificationInstance = instance.getNotificationInstance(id);
      expect(notificationInstance.props.id).to.equal(0);
    });
  });
});
