'use strict';

var _eventManager = require('../eventManager');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('eventManager', function () {
  var clickEvent = new CustomEvent('click', { bubbles: true });
  var mouseenterEvent = new CustomEvent('mouseenter', { bubbles: true });
  var mouseleaveEvent = new CustomEvent('mouseleave', { bubbles: true });

  // inject the HTML fixture for the tests
  beforeEach(function () {
    var fixture = '<div id="fixture">\n        <div id="target1" class="tooltip">\n          target 1\n          <div id="target-1-1">\n            Hello from target 1 1\n          </div>\n        </div>\n        <div id="target2" class="tooltip"> target 2 </div>\n        <div id="target3"> target 3 </div>\n\n        <div id="overlay">\n          hello world\n          <div id="tooltipChild">hello from tooltip child</div>\n        </div>\n      </div>\n    ';

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  // remove the html fixture from the DOM
  afterEach(function () {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('registeres showEvent on document and calls onShow only on if matches target', function () {
    var onShow = sinon.spy();
    var manager = (0, _eventManager2.default)({
      onShow: onShow,
      target: '.tooltip',
      showEvent: ['click', 'mouseenter']
    });

    var target1 = document.getElementById('target1');
    var target2 = document.getElementById('target2');
    var target3 = document.getElementById('target3');

    target1.dispatchEvent(clickEvent);
    expect(onShow.called).to.be.true;

    target2.dispatchEvent(mouseenterEvent);
    expect(onShow.calledTwice).to.be.true;

    // not called on unmatched element
    target3.dispatchEvent(clickEvent);
    target3.dispatchEvent(mouseenterEvent);
    expect(onShow.calledTwice).to.be.true;

    manager.unregister();
  });

  it('registeres onHide on document and calls onHide only on if matches target', function () {
    var onHide = sinon.spy();
    var manager = (0, _eventManager2.default)({
      onHide: onHide,
      target: '.tooltip',
      hideEvent: ['click', 'mouseenter']
    });

    var target1 = document.getElementById('target1');
    var target2 = document.getElementById('target2');
    var target3 = document.getElementById('target3');

    target1.dispatchEvent(clickEvent);
    expect(onHide.called).to.be.true;

    target2.dispatchEvent(mouseenterEvent);
    expect(onHide.calledTwice).to.be.true;

    // not called on unmatched element
    target3.dispatchEvent(clickEvent);
    target3.dispatchEvent(mouseenterEvent);
    expect(onHide.calledTwice).to.be.true;

    manager.unregister();
  });

  it('removes events registered on document', function () {
    var onShow = sinon.spy();
    var onHide = sinon.spy();
    var target1 = document.getElementById('target1');
    var target2 = document.getElementById('target2');

    var manager = (0, _eventManager2.default)({
      onShow: onShow,
      onHide: onHide,
      target: '.tooltip',
      hideEvent: ['click', 'mouseenter'],
      showEvent: ['mouseleave', 'mouseenter']
    });

    manager.unregister();

    target1.dispatchEvent(clickEvent);
    expect(onShow.called).to.be.false;
    expect(onHide.called).to.be.false;

    target2.dispatchEvent(mouseenterEvent);
    expect(onShow.called).to.be.false;
    expect(onHide.called).to.be.false;
  });

  it('if showEvent and hideEvent have an event in common it toggles between onShow and onHide', function () {
    var onShow = sinon.spy();
    var onHide = sinon.spy();
    var target1 = document.getElementById('target1');
    var visible = false;

    var manager = (0, _eventManager2.default)({
      onShow: onShow,
      onHide: onHide,
      getVisible: function getVisible() {
        return visible;
      },
      getActiveTargetNode: function getActiveTargetNode() {
        return target1;
      },
      target: '.tooltip',
      hideEvent: ['click', 'mouseenter'],
      showEvent: ['click', 'mouseenter']
    });

    target1.dispatchEvent(clickEvent);
    expect(onShow.called).to.be.true;
    expect(onHide.called).to.be.false;
    visible = true;

    target1.dispatchEvent(clickEvent);
    expect(onShow.calledOnce).to.be.true;
    expect(onHide.calledOnce).to.be.true;
    visible = false;

    target1.dispatchEvent(mouseenterEvent);
    expect(onShow.calledTwice).to.be.true;
    expect(onHide.calledOnce).to.be.true;
    visible = true;

    target1.dispatchEvent(mouseenterEvent);
    expect(onShow.calledTwice).to.be.true;
    expect(onHide.calledTwice).to.be.true;

    manager.unregister();
  });

  describe('hideOnClickOutside', function () {
    it('calls onHide when a click is registered outside of active target or tooltip', function () {
      var onHide = sinon.spy();
      var overlayNode = document.getElementById('overlay');
      var targetNode = document.getElementById('target1');

      var targetNodeChild = document.getElementById('target-1-1');
      var tooltipChild = document.getElementById('tooltipChild');

      var getOverlayNode = sinon.stub().returns(overlayNode);
      var getActiveTargetNode = sinon.stub().returns(targetNode);

      var manager = (0, _eventManager2.default)({
        onHide: onHide,
        target: '.tooltip',
        hideOnClickOutside: true,
        getOverlayNode: getOverlayNode,
        getActiveTargetNode: getActiveTargetNode
      });

      // click on different item
      expect(onHide.called).to.be.false;
      var target2 = document.getElementById('target2');
      target2.dispatchEvent(clickEvent);
      expect(onHide.called).to.be.true;

      // not called when is tooltip or target
      targetNode.dispatchEvent(clickEvent);
      overlayNode.dispatchEvent(clickEvent);
      expect(onHide.calledOnce).to.be.true;

      // not called from a child of tooltip or target
      targetNodeChild.dispatchEvent(clickEvent);
      tooltipChild.dispatchEvent(clickEvent);
      expect(onHide.calledOnce).to.be.true;

      // called when document is clicked
      document.dispatchEvent(clickEvent);
      expect(onHide.calledTwice).to.be.true;

      manager.unregister();

      // also check it unregisteres
      document.dispatchEvent(clickEvent);
      expect(onHide.calledTwice).to.be.true;

      // getters
      expect(getOverlayNode.called).to.be.true;
      expect(getActiveTargetNode.called).to.be.true;
    });
  });

  describe('hideOnScroll', function () {
    it('calls onHide onscroll', function () {
      var onHide = sinon.spy();
      var manager = (0, _eventManager2.default)({
        onHide: onHide,
        target: '.tooltip',
        hideOnScroll: true,
        getVisible: function getVisible() {
          return true;
        }
      });

      var scrollEvent = new CustomEvent('scroll', { bubbles: true });
      document.dispatchEvent(scrollEvent);
      expect(onHide.calledOnce).to.be.true;

      manager.unregister();

      document.dispatchEvent(scrollEvent);
      expect(onHide.calledOnce).to.be.true;
    });
    it('it doesnt call onHide when false on scroll', function () {
      var onHide = sinon.spy();
      var manager = (0, _eventManager2.default)({
        onHide: onHide,
        target: '.tooltip',
        hideOnScroll: false,
        getVisible: function getVisible() {
          return true;
        }
      });

      var scrollEvent = new CustomEvent('scroll', { bubbles: true });
      document.dispatchEvent(scrollEvent);
      expect(onHide.called).to.be.false;

      manager.unregister();
    });
  });

  describe('target as node', function () {
    return [it('registers onShow and onHide when target is a dom element', function () {
      var onHide = sinon.spy();
      var onShow = sinon.spy();
      var target1 = document.getElementById('target1');

      var manager = (0, _eventManager2.default)({
        onHide: onHide,
        onShow: onShow,
        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: target1
      });

      target1.dispatchEvent(mouseenterEvent);
      expect(onShow.called).to.be.true;
      target1.dispatchEvent(mouseleaveEvent);
      expect(onHide.called).to.be.true;

      manager.unregister();
    })];
  });

  describe('popover domNode show|hide events', function () {
    it('should trigger onShow on overlay onMouseenter if hideEvents has mouseleave', function () {
      var onShow = sinon.spy();
      var overlay = document.getElementById('overlay');
      var target1 = document.getElementById('target1');

      overlay.test = true;
      var manager = (0, _eventManager2.default)({
        onShow: onShow,
        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: '.tooltip',
        getOverlayNode: function getOverlayNode() {
          return overlay;
        },
        getActiveTargetNode: function getActiveTargetNode() {
          return target1;
        }
      });

      overlay.dispatchEvent(mouseenterEvent);
      expect(onShow.called).to.be.true;

      manager.unregister();
    });
    it('should trigger onHide on overlay onMouseleave if hideEvents has mouseleave', function () {
      var onHide = sinon.spy();
      var onShow = sinon.spy();
      var overlay = document.getElementById('overlay');
      var target1 = document.getElementById('target1');

      var manager = (0, _eventManager2.default)({
        onHide: onHide,
        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: '.tooltip',
        getOverlayNode: function getOverlayNode() {
          return overlay;
        },
        getActiveTargetNode: function getActiveTargetNode() {
          return target1;
        }
      });

      overlay.dispatchEvent(mouseleaveEvent);
      expect(onHide.called).to.be.true;

      manager.unregister();
    });
  });
});