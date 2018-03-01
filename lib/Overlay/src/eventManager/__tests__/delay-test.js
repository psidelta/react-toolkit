'use strict';

var _eventManager = require('../eventManager');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('eventManager delays', function () {
  var clickEvent = new CustomEvent('click', { bubbles: true });
  var mouseenterEvent = new CustomEvent('mouseenter', { bubbles: true });
  var mouseleaveEvent = new CustomEvent('mouseleave', { bubbles: true });
  var clock = void 0;

  // inject the HTML fixture for the tests
  beforeEach(function () {
    var fixture = '<div id="fixture1">\n        <div id="target1" class="tooltip">\n          target 1\n        </div>\n        <div id="target2" class="tooltip"> target 2 </div>\n        <div id="target3"> target 3 </div>\n        <div id="tooltip">\n          Hello world from tooltip\n        </div>\n      </div>\n    ';

    document.body.insertAdjacentHTML('afterbegin', fixture);

    clock = sinon.useFakeTimers();
  });

  // remove the html fixture from the DOM
  afterEach(function () {
    document.body.removeChild(document.getElementById('fixture1'));
    clock.restore();
  });

  it('onShow is called after showDelay ms', function () {
    var onShow = sinon.spy();
    var targetNode = document.getElementById('target1');
    var manager = (0, _eventManager2.default)({
      onShow: onShow,
      showEvent: ['mouseenter'],
      target: '.tooltip',
      getShowDelay: function getShowDelay() {
        return 300;
      }
    });

    targetNode.dispatchEvent(mouseenterEvent);
    clock.tick(100);
    expect(onShow.called).to.be.false;

    clock.tick(350);
    expect(onShow.called).to.be.true;

    manager.unregister();
  });

  it('onHide is called after hideDelay ms', function () {
    var onHide = sinon.spy();
    var targetNode = document.getElementById('target1');
    var manager = (0, _eventManager2.default)({
      onHide: onHide,
      hideEvent: ['mouseenter'],
      target: '.tooltip',
      getHideDelay: function getHideDelay() {
        return 300;
      }
    });

    targetNode.dispatchEvent(mouseenterEvent);
    clock.tick(100);
    expect(onHide.called).to.be.false;

    clock.tick(350);
    expect(onHide.called).to.be.true;

    manager.unregister();
  });

  describe('showDelay and hideDelay interaction', function () {
    // case 1
    it("onShow dom event doesn't scheduled another onShow", function () {
      var overlayNode = document.getElementById('tooltip');
      var targetNode = document.getElementById('target1');

      var onShow = sinon.spy();
      var manager = (0, _eventManager2.default)({
        getOverlayNode: function getOverlayNode() {
          return overlayNode;
        },
        getActiveTargetNode: function getActiveTargetNode() {
          return targetNode;
        },
        onShow: onShow,
        showEvent: ['mouseenter'],
        target: '.tooltip',
        getShowDelay: function getShowDelay() {
          return 300;
        }
      });

      targetNode.dispatchEvent(mouseenterEvent);
      clock.tick(200);

      targetNode.dispatchEvent(mouseenterEvent);
      expect(onShow.called).to.be.false;
      clock.tick(400);
      expect(onShow.calledOnce).to.be.true;

      targetNode.dispatchEvent(mouseenterEvent);
      clock.tick(900);
      expect(onShow.calledTwice).to.be.true;

      manager.unregister();
    });

    // case 2
    it('onShow domEvent from another target cancels previous one and schedules the other', function () {
      var overlayNode = document.getElementById('tooltip');
      var targetNode = document.getElementById('target1');
      var target2 = document.getElementById('target2');

      var onShow = sinon.spy();
      var manager = (0, _eventManager2.default)({
        onShow: onShow,
        getOverlayNode: function getOverlayNode() {
          return overlayNode;
        },
        getActiveTargetNode: function getActiveTargetNode() {
          return targetNode;
        },
        showEvent: ['mouseenter'],
        target: '.tooltip',
        getShowDelay: function getShowDelay() {
          return 300;
        }
      });

      // trigger mouseenter from targetNode
      targetNode.dispatchEvent(mouseenterEvent);
      clock.tick(100);

      // trigger mouseneter form another target
      var newTargetMouseEnterEvent = new CustomEvent('mouseenter', {
        bubbles: true
      });
      target2.dispatchEvent(newTargetMouseEnterEvent);

      clock.tick(600);
      expect(onShow.calledOnce).to.be.true;
      expect(onShow.args[0][0].target).to.equal(target2);

      manager.unregister();
    });

    // case 3
    it('domHide event cancels a scheduled onShow event', function () {
      var targetNode = document.getElementById('target1');

      var onShow = sinon.spy();
      var onHide = sinon.spy();
      var manager = (0, _eventManager2.default)({
        onShow: onShow,
        onHide: onHide,

        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: '.tooltip',
        getShowDelay: function getShowDelay() {
          return 300;
        },
        getHideDelay: function getHideDelay() {
          return 300;
        }
      });

      targetNode.dispatchEvent(mouseenterEvent);
      clock.tick(100);
      targetNode.dispatchEvent(mouseleaveEvent);
      clock.tick(400);

      expect(onShow.called).to.be.false;

      manager.unregister();
    });

    // case 4 - is shold not do anything

    // case 5
    it('onHide domEvent will not schedule another onHide when there is already one ongoing from same target', function () {
      var targetNode = document.getElementById('target1');

      var onShow = sinon.spy();
      var onHide = sinon.spy();
      var manager = (0, _eventManager2.default)({
        onShow: onShow,
        onHide: onHide,
        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: '.tooltip',
        getShowDelay: function getShowDelay() {
          return 300;
        },
        getHideDelay: function getHideDelay() {
          return 300;
        }
      });

      targetNode.dispatchEvent(mouseleaveEvent);
      clock.tick(100);
      targetNode.dispatchEvent(mouseleaveEvent);
      clock.tick(200);
      expect(onHide.calledOnce).to.be.true;
      clock.tick(400);
      expect(onHide.calledOnce).to.be.true;

      manager.unregister();
    });

    // case 6 - noting to do

    // case 7
    it('onShow domEvent will cancel a scheduled onHide', function () {
      var targetNode = document.getElementById('target1');
      var target2 = document.getElementById('target2');

      var onShow = sinon.spy();
      var onHide = sinon.spy();
      var manager = (0, _eventManager2.default)({
        onShow: onShow,
        onHide: onHide,
        showEvent: ['mouseenter'],
        hideEvent: ['mouseleave'],
        target: '.tooltip',
        getShowDelay: function getShowDelay() {
          return 300;
        },
        getHideDelay: function getHideDelay() {
          return 300;
        }
      });

      targetNode.dispatchEvent(mouseleaveEvent);
      clock.tick(100);
      target2.dispatchEvent(mouseenterEvent);
      clock.tick(400);

      expect(onHide.called).to.be.false;

      manager.unregister();
    });
  });
});