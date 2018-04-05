/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  shiftLowerEdgeOfRange,
  shiftUpperEdgeOfRange,
  shiftRangeByValue
} from '../../utils/value-utils';

const baseConfig = {
  maxRange: 50,
  minRange: 10,
  startValue: -100,
  endValue: 100
};

const initialValue = [0, 10];
let newValueTuple;

describe('shiftLowerEdgeOfRange logic', () => {
  it('should return new tuple with change start value when all constraints are respected', () => {
    const newValueTuple = shiftLowerEdgeOfRange(-10, {
      currentValue: initialValue,
      ...baseConfig
    });

    expect(newValueTuple).toEqual([-10, 10]);
  });

  it('should clamp new start value if it goes beyond the startValue', () => {
    newValueTuple = shiftLowerEdgeOfRange(-10, {
      currentValue: [-95, -70],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([-100, -70]);

    newValueTuple = shiftLowerEdgeOfRange(-10, {
      currentValue: [-100, -70],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([-100, -70]);
  });

  it('should drag end value when maxRange constraint not respected', () => {
    newValueTuple = shiftLowerEdgeOfRange(-10, {
      currentValue: [-80, -30],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([-90, -40]);

    newValueTuple = shiftLowerEdgeOfRange(-10, {
      currentValue: [-95, -45],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([-100, -50]);
  });

  it('should drag end value when minRange constraint not respected', () => {
    newValueTuple = shiftLowerEdgeOfRange(10, {
      currentValue: [10, 20],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([20, 30]);

    newValueTuple = shiftLowerEdgeOfRange(10, {
      currentValue: [85, 95],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([90, 100]);

    newValueTuple = shiftLowerEdgeOfRange(10, {
      currentValue: [90, 100],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([90, 100]);
  });

  it('should play well with offsets that go beyond range', () => {
    newValueTuple = shiftLowerEdgeOfRange(9999, {
      currentValue: [10, 20],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([90, 100]);
  });

  it('should support diff shifting start edge over end edge', () => {
    newValueTuple = shiftLowerEdgeOfRange(20, {
      currentValue: [-16, -6],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([4, 14]);
  });

  it('should support diff shifting on reversed range', () => {
    newValueTuple = shiftLowerEdgeOfRange(5, {
      currentValue: [-6, -15],
      ...baseConfig,
      startValue: 100,
      endValue: -100,
      isReversed: true
    });

    expect(newValueTuple).toEqual([-1, -15]);
  });

  it('should support shiftin with 0 and isRevered=true', () => {
    newValueTuple = shiftLowerEdgeOfRange(0, {
      currentValue: [6.5, -1.5],
      maxRange: 50,
      minRange: 5,
      startValue: 36,
      endValue: -12,
      isReversed: true
    });

    expect(newValueTuple[0]).toEqual(6.5);
    expect(newValueTuple[1]).toEqual(-1.5);
  });
});

describe('shiftUpperEdgeOfRange logic', () => {
  it('should return new tuple with change end value when all constraints are respected', () => {
    const newValueTuple = shiftUpperEdgeOfRange(10, {
      currentValue: initialValue,
      ...baseConfig
    });

    expect(newValueTuple).toEqual([0, 20]);
  });

  it('should clamp new end value if it goes beyond the endValue', () => {
    newValueTuple = shiftUpperEdgeOfRange(10, {
      currentValue: [80, 95],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([80, 100]);

    newValueTuple = shiftUpperEdgeOfRange(10, {
      currentValue: [70, 100],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([70, 100]);
  });

  it('should drag start value when maxRange constraint not respected', () => {
    newValueTuple = shiftUpperEdgeOfRange(10, {
      currentValue: [-80, -30],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([-70, -20]);

    newValueTuple = shiftUpperEdgeOfRange(10, {
      currentValue: [45, 95],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([50, 100]);
  });

  it('should drag start value when minRange constraint not respected', () => {
    newValueTuple = shiftUpperEdgeOfRange(-10, {
      currentValue: [10, 20],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(-0);
    expect(newValueTuple[1]).toEqual(10);

    newValueTuple = shiftUpperEdgeOfRange(-10, {
      currentValue: [-95, -85],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([-100, -90]);

    newValueTuple = shiftUpperEdgeOfRange(-10, {
      currentValue: [-100, -90],
      ...baseConfig
    });

    expect(newValueTuple).toEqual([-100, -90]);
  });
});

describe('shiftRangeByValue logic', () => {
  it('should shift by value when all constraints respected', () => {
    newValueTuple = shiftRangeByValue(-10, {
      currentValue: [10, 20],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(0);
    expect(newValueTuple[1]).toEqual(10);

    newValueTuple = shiftRangeByValue(-10, {
      currentValue: [15, 40],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(5);
    expect(newValueTuple[1]).toEqual(30);

    newValueTuple = shiftRangeByValue(10, {
      currentValue: [15, 40],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(25);
    expect(newValueTuple[1]).toEqual(50);
  });

  it('should respect startValue constraint', () => {
    newValueTuple = shiftRangeByValue(-10, {
      currentValue: [-95, -50],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(-100);
    expect(newValueTuple[1]).toEqual(-60);

    newValueTuple = shiftRangeByValue(-10, {
      currentValue: [-95, -85],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(-100);
    expect(newValueTuple[1]).toEqual(-90);
  });

  it('should respect endValue constraint', () => {
    newValueTuple = shiftRangeByValue(10, {
      currentValue: [60, 95],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(70);
    expect(newValueTuple[1]).toEqual(100);

    newValueTuple = shiftRangeByValue(10, {
      currentValue: [55, 100],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(65);
    expect(newValueTuple[1]).toEqual(100);

    newValueTuple = shiftRangeByValue(10, {
      currentValue: [55, 100],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(65);
    expect(newValueTuple[1]).toEqual(100);
  });

  it('should respect minRange constraint', () => {
    newValueTuple = shiftRangeByValue(-10, {
      currentValue: [-100, -85],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(-100);
    expect(newValueTuple[1]).toEqual(-90);

    newValueTuple = shiftRangeByValue(-1000, {
      currentValue: [50, 80],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(-100);
    expect(newValueTuple[1]).toEqual(-90);
  });

  it('should support ranges that contain 0', () => {
    newValueTuple = shiftRangeByValue(-1, {
      currentValue: [-10, 20],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(-11);
    expect(newValueTuple[1]).toEqual(19);
  });

  it('should support shifting minRange interval', () => {
    newValueTuple = shiftRangeByValue(1, {
      currentValue: [-33, -23],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(-32);
    expect(newValueTuple[1]).toEqual(-22);
  });

  it('should support shifting with 0', () => {
    newValueTuple = shiftRangeByValue(0, {
      currentValue: [-33, 4],
      ...baseConfig
    });

    expect(newValueTuple[0]).toEqual(-33);
    expect(newValueTuple[1]).toEqual(4);

    newValueTuple = shiftRangeByValue(0, {
      currentValue: [100, 50],
      ...baseConfig,
      startValue: 100,
      endValue: 0,
      isReversed: true
    });

    expect(newValueTuple[0]).toEqual(100);
    expect(newValueTuple[1]).toEqual(50);
  });

  it('should support intermidiate values as diff', () => {
    newValueTuple = shiftRangeByValue(1.5, {
      currentValue: [42, 46],
      ...baseConfig,
      minRange: 1
    });

    expect(newValueTuple[0]).toEqual(44);
    expect(newValueTuple[1]).toEqual(48);
  });
});
