'use strict';

var _manager = require('../manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('manager', function () {
  beforeEach(function () {
    _manager2.default.reset();
  });

  it('register should return a unique id', function () {
    var window1 = _manager2.default.register({});
    var window2 = _manager2.default.register({}, 'test');
    var window3 = _manager2.default.register({});

    expect(window1).not.toEqual(window2);
    expect(window2).not.toEqual(window3);
  });

  it('getInstance should retrive the instance by id', function () {
    var window1 = { id: 'window1' };
    var id = _manager2.default.register(window1);

    expect(id).toEqual(0);
    expect(_manager2.default.getWindow(id)).toEqual(window1);
  });

  it('unRegister should remove instance', function () {
    var window = { id: 'window1' };
    var id = _manager2.default.register(window);
    _manager2.default.register(window);

    expect(_manager2.default.unRegister(id)).toBe(true);
    expect(_manager2.default.getWindow(id)).toBe(null);
  });

  describe('getZIndex', function () {
    it('getZIndex should return correct zIndex', function () {
      var window1 = { id: 'window1' };
      var window2 = { id: 'window2' };

      var id1 = _manager2.default.register(window1);
      var id2 = _manager2.default.register(window2);

      expect(_manager2.default.getZIndex(id1)).toEqual(10);
      expect(_manager2.default.getZIndex(id2)).toEqual(20);
    });
  });

  describe('setZIndex', function () {
    it('when registers should call setZindex with second param `true`', function () {
      var window1 = { setZIndex: jest.fn() };
      var id1 = _manager2.default.register(window1);

      expect(window1.setZIndex).toBeCalled();
      // expect(window1.setZIndex.args[0][1]).toBe(true)
    });

    it('when unregisters it should call setIndex on correct instances', function () {
      var window1 = { setZIndex: jest.fn() };
      var window2 = { setZIndex: jest.fn() };
      var window3 = { setZIndex: jest.fn() };

      var id1 = _manager2.default.register(window1);
      var id2 = _manager2.default.register(window2);
      var id3 = _manager2.default.register(window3);

      _manager2.default.unRegister(id1);

      expect(window3.setZIndex).toHaveBeenCalledTimes(2);
    });

    it('should be called on correct instances when brintToFrontIsCalled', function () {
      var window1 = { setZIndex: jest.fn() };
      var window2 = { setZIndex: jest.fn() };
      var window3 = { setZIndex: jest.fn() };

      var id1 = _manager2.default.register(window1);
      var id2 = _manager2.default.register(window2);
      var id3 = _manager2.default.register(window3);

      _manager2.default.bringToFront(id2);

      expect(window3.setZIndex).toHaveBeenCalledTimes(2);
      // because when window 3 is registered
      // it is called one more time to make sure
      // only one window is on top
      expect(window2.setZIndex).toHaveBeenCalledTimes(3);
    });
  });
});