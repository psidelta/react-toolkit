'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _valueUtils = require('../../utils/value-utils');

var baseConfig = {
  maxRange: 50,
  minRange: 10,
  startValue: -100,
  endValue: 100
};

var initialValue = [0, 10];
var newValueTuple = void 0;

describe('shiftLowerEdgeOfRange logic', function () {
  it('should return new tuple with change start value when all constraints are respected', function () {
    var newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(-10, _extends({
      currentValue: initialValue
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([-10, 10]);
  });

  it('should clamp new start value if it goes beyond the startValue', function () {
    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(-10, _extends({
      currentValue: [-95, -70]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([-100, -70]);

    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(-10, _extends({
      currentValue: [-100, -70]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([-100, -70]);
  });

  it('should drag end value when maxRange constraint not respected', function () {
    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(-10, _extends({
      currentValue: [-80, -30]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([-90, -40]);

    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(-10, _extends({
      currentValue: [-95, -45]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([-100, -50]);
  });

  it('should drag end value when minRange constraint not respected', function () {
    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(10, _extends({
      currentValue: [10, 20]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([20, 30]);

    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(10, _extends({
      currentValue: [85, 95]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([90, 100]);

    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(10, _extends({
      currentValue: [90, 100]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([90, 100]);
  });

  it('should play well with offsets that go beyond range', function () {
    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(9999, _extends({
      currentValue: [10, 20]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([90, 100]);
  });

  it('should support diff shifting start edge over end edge', function () {
    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(20, _extends({
      currentValue: [-16, -6]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([4, 14]);
  });

  it('should support diff shifting on reversed range', function () {
    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(5, _extends({
      currentValue: [-6, -15]
    }, baseConfig, {
      startValue: 100,
      endValue: -100,
      isReversed: true
    }));

    expect(newValueTuple).to.deep.equal([-1, -15]);
  });

  it('should support shiftin with 0 and isRevered=true', function () {
    newValueTuple = (0, _valueUtils.shiftLowerEdgeOfRange)(0, {
      currentValue: [6.5, -1.5],
      maxRange: 50,
      minRange: 5,
      startValue: 36,
      endValue: -12,
      isReversed: true
    });

    expect(newValueTuple[0]).to.equal(6.5);
    expect(newValueTuple[1]).to.equal(-1.5);
  });
});

describe('shiftUpperEdgeOfRange logic', function () {
  it('should return new tuple with change end value when all constraints are respected', function () {
    var newValueTuple = (0, _valueUtils.shiftUpperEdgeOfRange)(10, _extends({
      currentValue: initialValue
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([0, 20]);
  });

  it('should clamp new end value if it goes beyond the endValue', function () {
    newValueTuple = (0, _valueUtils.shiftUpperEdgeOfRange)(10, _extends({
      currentValue: [80, 95]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([80, 100]);

    newValueTuple = (0, _valueUtils.shiftUpperEdgeOfRange)(10, _extends({
      currentValue: [70, 100]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([70, 100]);
  });

  it('should drag start value when maxRange constraint not respected', function () {
    newValueTuple = (0, _valueUtils.shiftUpperEdgeOfRange)(10, _extends({
      currentValue: [-80, -30]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([-70, -20]);

    newValueTuple = (0, _valueUtils.shiftUpperEdgeOfRange)(10, _extends({
      currentValue: [45, 95]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([50, 100]);
  });

  it('should drag start value when minRange constraint not respected', function () {
    newValueTuple = (0, _valueUtils.shiftUpperEdgeOfRange)(-10, _extends({
      currentValue: [10, 20]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(0);
    expect(newValueTuple[1]).to.equal(10);

    newValueTuple = (0, _valueUtils.shiftUpperEdgeOfRange)(-10, _extends({
      currentValue: [-95, -85]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([-100, -90]);

    newValueTuple = (0, _valueUtils.shiftUpperEdgeOfRange)(-10, _extends({
      currentValue: [-100, -90]
    }, baseConfig));

    expect(newValueTuple).to.deep.equal([-100, -90]);
  });
});

describe('shiftRangeByValue logic', function () {
  it('should shift by value when all constraints respected', function () {
    newValueTuple = (0, _valueUtils.shiftRangeByValue)(-10, _extends({
      currentValue: [10, 20]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(0);
    expect(newValueTuple[1]).to.equal(10);

    newValueTuple = (0, _valueUtils.shiftRangeByValue)(-10, _extends({
      currentValue: [15, 40]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(5);
    expect(newValueTuple[1]).to.equal(30);

    newValueTuple = (0, _valueUtils.shiftRangeByValue)(10, _extends({
      currentValue: [15, 40]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(25);
    expect(newValueTuple[1]).to.equal(50);
  });

  it('should respect startValue constraint', function () {
    newValueTuple = (0, _valueUtils.shiftRangeByValue)(-10, _extends({
      currentValue: [-95, -50]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(-100);
    expect(newValueTuple[1]).to.equal(-60);

    newValueTuple = (0, _valueUtils.shiftRangeByValue)(-10, _extends({
      currentValue: [-95, -85]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(-100);
    expect(newValueTuple[1]).to.equal(-90);
  });

  it('should respect endValue constraint', function () {
    newValueTuple = (0, _valueUtils.shiftRangeByValue)(10, _extends({
      currentValue: [60, 95]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(70);
    expect(newValueTuple[1]).to.equal(100);

    newValueTuple = (0, _valueUtils.shiftRangeByValue)(10, _extends({
      currentValue: [55, 100]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(65);
    expect(newValueTuple[1]).to.equal(100);

    newValueTuple = (0, _valueUtils.shiftRangeByValue)(10, _extends({
      currentValue: [55, 100]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(65);
    expect(newValueTuple[1]).to.equal(100);
  });

  it('should respect minRange constraint', function () {
    newValueTuple = (0, _valueUtils.shiftRangeByValue)(-10, _extends({
      currentValue: [-100, -85]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(-100);
    expect(newValueTuple[1]).to.equal(-90);

    newValueTuple = (0, _valueUtils.shiftRangeByValue)(-1000, _extends({
      currentValue: [50, 80]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(-100);
    expect(newValueTuple[1]).to.equal(-90);
  });

  it('should support ranges that contain 0', function () {
    newValueTuple = (0, _valueUtils.shiftRangeByValue)(-1, _extends({
      currentValue: [-10, 20]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(-11);
    expect(newValueTuple[1]).to.equal(19);
  });

  it('should support shifting minRange interval', function () {
    newValueTuple = (0, _valueUtils.shiftRangeByValue)(1, _extends({
      currentValue: [-33, -23]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(-32);
    expect(newValueTuple[1]).to.equal(-22);
  });

  it('should support shifting with 0', function () {
    newValueTuple = (0, _valueUtils.shiftRangeByValue)(0, _extends({
      currentValue: [-33, 4]
    }, baseConfig));

    expect(newValueTuple[0]).to.equal(-33);
    expect(newValueTuple[1]).to.equal(4);

    newValueTuple = (0, _valueUtils.shiftRangeByValue)(0, _extends({
      currentValue: [100, 50]
    }, baseConfig, {
      startValue: 100,
      endValue: 0,
      isReversed: true
    }));

    expect(newValueTuple[0]).to.equal(100);
    expect(newValueTuple[1]).to.equal(50);
  });

  it('should support intermidiate values as diff', function () {
    newValueTuple = (0, _valueUtils.shiftRangeByValue)(1.5, _extends({
      currentValue: [42, 46]
    }, baseConfig, {
      minRange: 1
    }));

    expect(newValueTuple[0]).to.equal(44);
    expect(newValueTuple[1]).to.equal(48);
  });
});