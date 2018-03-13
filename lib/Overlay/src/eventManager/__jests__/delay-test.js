'use strict';

var _eventManager = require('../eventManager');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('eventManager delays', function () {
  var clickEvent = new CustomEvent('click', { bubbles: true });
  var mouseenterEvent = new CustomEvent('mouseenter', { bubbles: true });
  var mouseleaveEvent = new CustomEvent('mouseleave', { bubbles: true });

  // inject the HTML fixture for the tests
  beforeEach(function () {
    var fixture = '<div id="fixture1">\n        <div id="target1" class="tooltip">\n          target 1\n        </div>\n        <div id="target2" class="tooltip"> target 2 </div>\n        <div id="target3"> target 3 </div>\n        <div id="tooltip">\n          Hello world from tooltip\n        </div>\n      </div>\n    ';

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  // remove the html fixture from the DOM
  afterEach(function () {
    document.body.removeChild(document.getElementById('fixture1'));
  });

  it('onShow is called after showDelay ms', function (done) {
    var onShow = jest.fn();
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

    setTimeout(function () {
      expect(onShow).toHaveBeenCalledTimes(0);
      setTimeout(function () {
        expect(onShow).toHaveBeenCalled();
        done();
      }, 350);
    }, 100);

    manager.unregister();
  });

  it('onHide is called after hideDelay ms', function (done) {
    var onHide = jest.fn();
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
    setTimeout(function () {
      expect(onHide).toHaveBeenCalledTimes(0);

      setTimeout(function () {
        expect(onHide).toHaveBeenCalledTimes(1);
        done();
        manager.unregister();
      }, 350);
    }, 100);
  });

  describe('showDelay and hideDelay interaction', function () {
    // case 1
    xit("onShow dom event doesn't scheduled another onShow", function (done) {
      var overlayNode = document.getElementById('tooltip');
      var targetNode = document.getElementById('target1');

      var onShow = jest.fn();
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

      setTimeout(function () {
        targetNode.dispatchEvent(mouseenterEvent);
        expect(onShow).toHaveBeenCalledTimes(0);
        setTimeout(function () {
          expect(onShow).toHaveBeenCalled();
          targetNode.dispatchEvent(mouseenterEvent);
          setTimeout(function () {
            expect(onShow).toHaveBeenCalledTimes(2);
            done();
          }, 900);
        }, 400);
        manager.unregister();
      }, 200);
    });

    // case 2
    it('onShow domEvent from another target cancels previous one and schedules the other', function (done) {
      var overlayNode = document.getElementById('tooltip');
      var targetNode = document.getElementById('target1');
      var target2 = document.getElementById('target2');

      var onShow = jest.fn();
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

      setTimeout(function () {
        var newTargetMouseEnterEvent = new CustomEvent('mouseenter', {
          bubbles: true
        });
        target2.dispatchEvent(newTargetMouseEnterEvent);

        setTimeout(function () {
          expect(onShow).toHaveBeenCalled();
          expect(onShow.mock.calls[0][0].target).toEqual(target2);
          done();
        }, 600);
        manager.unregister();
      }, 100);
    });

    // case 3
    it('domHide event cancels a scheduled onShow event', function (done) {
      var targetNode = document.getElementById('target1');

      var onShow = jest.fn();
      var onHide = jest.fn();
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

      setTimeout(function () {
        targetNode.dispatchEvent(mouseleaveEvent);

        setTimeout(function () {
          expect(onShow).toHaveBeenCalledTimes(0);
          done();
        }, 400);
        manager.unregister();
      }, 100);
    });

    // case 4 - is shold not do anything

    // case 5
    it('onHide domEvent will not schedule another onHide when there is already one ongoing from same target', function (done) {
      var targetNode = document.getElementById('target1');

      var onShow = jest.fn();
      var onHide = jest.fn();
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

      setTimeout(function () {
        targetNode.dispatchEvent(mouseleaveEvent);
        setTimeout(function () {
          expect(onHide).toHaveBeenCalled();
          setTimeout(function () {
            expect(onHide).toHaveBeenCalled();
            done();
          }, 400);
        }, 200);
      }, 100);

      manager.unregister();
    });

    // case 6 - noting to do

    // case 7
    xit('onShow domEvent will cancel a scheduled onHide', function (done) {
      var targetNode = document.getElementById('target1');
      var target2 = document.getElementById('target2');

      var onShow = jest.fn();
      var onHide = jest.fn();
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
      setTimeout(function () {
        target2.dispatchEvent(mouseenterEvent);
        setTimeout(function () {
          expect(onHide).toHaveBeenCalledTimes(0);
          done();
        }, 400);
      }, 100);

      manager.unregister();
    });
  });
});