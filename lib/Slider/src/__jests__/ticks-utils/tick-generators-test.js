'use strict';

var _ticks = require('../../utils/sub-components/ticks');

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

describe('generateTickValuesBySteps logic', function () {
  it('should generate ticks based on tickStep', function () {
    var tickStep = 5,
        startValue = -15,
        endValue = 15;

    var tickValues = (0, _ticks.generateTickValuesBySteps)({
      tickStep: tickStep,
      startValue: startValue,
      endValue: endValue
    });

    expect(tickValues).toEqual([-15, -10, -5, 0, 5, 10, 15]);
  });

  it('should permit skipping edges', function () {
    var tickStep = 5,
        startValue = -15,
        endValue = 15;

    var tickValues = (0, _ticks.generateTickValuesBySteps)({
      tickStep: tickStep,
      startValue: startValue,
      endValue: endValue,
      skipEdgeTicks: true
    });

    expect(tickValues).toEqual([-10, -5, 0, 5, 10]);
  });

  it('should permit reversed generation', function () {
    var tickStep = 5,
        startValue = 15,
        endValue = -15;

    var tickValues = (0, _ticks.generateTickValuesBySteps)({
      tickStep: tickStep,
      startValue: startValue,
      endValue: endValue,
      skipEdgeTicks: true
    });

    expect(tickValues).toEqual([10, 5, 0, -5, -10]);
  });
});

describe('generateLabeldTickSteps logic', function () {
  it('should call generateTickValuesBySteps for value generation', function () {
    var tickStep = 5,
        smallTickStep = 1,
        startValue = -5,
        endValue = 5;
    var tickValueStub = jest.fn(function () {
      return [];
    });

    var _generateLabeldTickSt = (0, _ticks.generateLabeldTickSteps)({
      tickStep: tickStep,
      smallTickStep: smallTickStep,
      startValue: startValue,
      endValue: endValue,
      generateTickValuesBySteps: tickValueStub
    }),
        _generateLabeldTickSt2 = _toArray(_generateLabeldTickSt),
        first = _generateLabeldTickSt2[0],
        second = _generateLabeldTickSt2[1],
        third = _generateLabeldTickSt2[2],
        forth = _generateLabeldTickSt2[3],
        fifth = _generateLabeldTickSt2[4],
        rest = _generateLabeldTickSt2.slice(5);

    expect(tickValueStub).toHaveBeenCalledTimes(2);
    expect(tickValueStub.mock.calls[0][0]).toHaveProperty('tickStep', tickStep);
    expect(tickValueStub.mock.calls[1][0]).toHaveProperty('tickStep', smallTickStep);
  });

  it('should call generate both small and big ticks', function () {
    var tickStep = 5,
        smallTickStep = 1,
        startValue = -5,
        endValue = 5;

    var _generateLabeldTickSt3 = (0, _ticks.generateLabeldTickSteps)({
      tickStep: tickStep,
      smallTickStep: smallTickStep,
      startValue: startValue,
      endValue: endValue
    }),
        _generateLabeldTickSt4 = _toArray(_generateLabeldTickSt3),
        first = _generateLabeldTickSt4[0],
        second = _generateLabeldTickSt4[1],
        third = _generateLabeldTickSt4[2],
        forth = _generateLabeldTickSt4[3],
        fifth = _generateLabeldTickSt4[4],
        sixth = _generateLabeldTickSt4[5],
        rest = _generateLabeldTickSt4.slice(6);

    expect(first).toHaveProperty('type', 'big');
    expect(second).toHaveProperty('type', 'small');
    expect(third).toHaveProperty('type', 'small');
    expect(forth).toHaveProperty('type', 'small');
    expect(fifth).toHaveProperty('type', 'small');
    expect(sixth).toHaveProperty('type', 'big');
  });

  it('should generate proper big steps', function () {
    var tickStep = 10,
        startValue = 0,
        endValue = 100;

    var result = (0, _ticks.generateLabeldTickSteps)({
      tickStep: tickStep,
      startValue: startValue,
      endValue: endValue,
      skipEdgeTicks: true,
      step: 1
    });

    expect(result.length).toEqual(99);

    expect(result[0]).toHaveProperty('type', 'small');
    expect(result[0]).toHaveProperty('value', 1);

    expect(result[result.length - 1]).toHaveProperty('value', 99);
    expect(result[result.length - 1]).toHaveProperty('type', 'small');

    expect(result[9]).toHaveProperty('type', 'big');
    expect(result[19]).toHaveProperty('type', 'big');
    expect(result[29]).toHaveProperty('type', 'big');
    expect(result[39]).toHaveProperty('type', 'big');
    expect(result[49]).toHaveProperty('type', 'big');
    expect(result[59]).toHaveProperty('type', 'big');
    expect(result[69]).toHaveProperty('type', 'big');
    expect(result[79]).toHaveProperty('type', 'big');
    expect(result[89]).toHaveProperty('type', 'big');
  });
});