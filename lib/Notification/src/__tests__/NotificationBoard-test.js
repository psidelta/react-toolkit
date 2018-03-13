'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NotificationBoard = require('../NotificationBoard');

var _NotificationBoard2 = _interopRequireDefault(_NotificationBoard);

var _Notification = require('../Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('NotificationBoard', function () {
  it('passes correct style to notification', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, {
      style: { color: 'red', backgroundColor: 'lightBlue' }
    }));
    wrapper.instance().addNotification({
      style: {
        background: 'blue',
        color: 'purple'
      }
    });
    expect(wrapper.find(_Notification2.default)).to.have.length(1);
    expect(wrapper.find(_Notification2.default).at(0).props().style).toEqual({
      backgroundColor: 'lightBlue',
      background: 'blue',
      color: 'purple'
    });
  });
  it('passes props as default to notification', function () {
    var defaultProps = {
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
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, defaultProps));

    wrapper.instance().addNotification();

    var notificationProps = wrapper.find(_Notification2.default).at(0).props();
    // all common props should be present on notificationProps
    var test = Object.keys(defaultProps).filter(function (propName) {
      return notificationProps[propName];
    });

    expect(test.length).to.equal(Object.keys(defaultProps).length);
  });

  describe('global instance access', function () {
    it('should register itself in the zippy.notification namespace', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, { id: 'helloWorld' }));
      expect(wrapper.instance()).to.equal(global.zippy.notification.helloWorld);
    });
  });

  describe('addNotification', function () {
    it('adds and renders notifications', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, null));
      var instance = global.zippy.notification.main;

      expect(wrapper.find(_Notification2.default)).to.have.length(0);
      instance.addNotification({ title: 'hello world' });
      expect(wrapper.find(_Notification2.default)).to.have.length(1);
    });
    it('returns a notification id', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, null));
      var instance = global.zippy.notification.main;
      var id = instance.addNotification({});
      expect(id).to.equal(0);
      var id2 = instance.addNotification({});
      expect(id2).to.equal(1);
    });
  });

  describe('getNotifications', function () {
    it('returns the current notifications', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, null));
      var instance = wrapper.instance();
      expect(instance.getNotifications()).to.have.length(0);
      instance.addNotification({ title: 'hello world' });
      expect(instance.getNotifications()).to.have.length(1);
      expect(instance.getNotifications()[0].title).to.equal('hello world');
    });
  });
  describe('getNotification', function () {
    it('retrives a notification by id', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, null));
      var instance = wrapper.instance();
      var id = instance.addNotification({ title: 'hello' });
      var notification = instance.getNotification(id);
      expect(notification.title).to.equal('hello');
    });
  });
  describe('destroyOnHide', function () {
    it('removes the notification when true', function () {
      var clock = sinon.useFakeTimers();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, { removeOnHide: true }));
      var instance = wrapper.instance();
      instance.addNotification({ autoHideDelay: 100, hideAnimation: false });
      expect(instance.getNotifications()).to.have.length(1);
      clock.tick(600);
      expect(instance.getNotifications()).to.have.length(0);
      clock.restore();
    });
  });
  describe('hideNotification', function () {
    it('changes the visible prop to false', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, null));
      var instance = wrapper.instance();
      var id = instance.addNotification({});
      expect(instance.getNotification(id).visible).to.be.true;
      instance.hideNotification(id);
      expect(instance.getNotification(id).visible).to.be.false;
    });
  });
  describe('showNotification', function () {
    it('changes the visible prop to true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, null));
      var instance = wrapper.instance();
      var id = instance.addNotification({});

      expect(instance.getNotification(id).visible).to.be.true;
      instance.hideNotification(id);
      expect(instance.getNotification(id).visible).to.be.false;
      instance.showNotification(id);
      expect(instance.getNotification(id).visible).to.be.true;
    });
  });
  describe('hideAll', function () {
    it('changes the visible prop to true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, null));
      var instance = wrapper.instance();
      instance.addNotification({ autoHideDelay: null });
      instance.addNotification({ autoHideDelay: null });
      instance.addNotification({ autoHideDelay: null });
      instance.hideAll();
      var test = instance.getNotifications().filter(function (notification) {
        return notification.visible;
      });

      expect(test).to.have.length(0);
    });
  });
  describe('removeAll', function () {
    it('changes the visible prop to true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, null));
      var instance = wrapper.instance();
      instance.addNotification({ autoHideDelay: null });
      instance.addNotification({ autoHideDelay: null });
      instance.addNotification({ autoHideDelay: null });
      instance.removeAll();
      var test = instance.getNotifications();

      expect(test).to.have.length(0);
    });
  });
  describe('getNotificationInstance', function () {
    it('returns the instance of the notification', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_NotificationBoard2.default, null));
      var instance = wrapper.instance();
      var id = instance.addNotification({ autoHideDelay: null });
      var notificationInstance = instance.getNotificationInstance(id);
      expect(notificationInstance.props.id).to.equal(0);
    });
  });
});