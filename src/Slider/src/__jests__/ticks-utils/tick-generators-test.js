/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  generateTickValuesBySteps,
  generateLabeldTickSteps
} from '../../utils/sub-components/ticks';

describe('generateTickValuesBySteps logic', () => {
  it('should generate ticks based on tickStep', () => {
    const tickStep = 5,
      startValue = -15,
      endValue = 15;

    const tickValues = generateTickValuesBySteps({
      tickStep,
      startValue,
      endValue
    });

    expect(tickValues).toEqual([-15, -10, -5, 0, 5, 10, 15]);
  });

  it('should permit skipping edges', () => {
    const tickStep = 5,
      startValue = -15,
      endValue = 15;

    const tickValues = generateTickValuesBySteps({
      tickStep,
      startValue,
      endValue,
      skipEdgeTicks: true
    });

    expect(tickValues).toEqual([-10, -5, 0, 5, 10]);
  });

  it('should permit reversed generation', () => {
    const tickStep = 5,
      startValue = 15,
      endValue = -15;

    const tickValues = generateTickValuesBySteps({
      tickStep,
      startValue,
      endValue,
      skipEdgeTicks: true
    });

    expect(tickValues).toEqual([10, 5, 0, -5, -10]);
  });
});

describe('generateLabeldTickSteps logic', () => {
  it('should call generateTickValuesBySteps for value generation', () => {
    const tickStep = 5,
      smallTickStep = 1,
      startValue = -5,
      endValue = 5;
    const tickValueStub = jest.fn(() => []);
    const [
      first,
      second,
      third,
      forth,
      fifth,
      ...rest
    ] = generateLabeldTickSteps({
      tickStep,
      smallTickStep,
      startValue,
      endValue,
      generateTickValuesBySteps: tickValueStub
    });

    expect(tickValueStub).toHaveBeenCalledTimes(2);
    expect(tickValueStub.mock.calls[0][0]).toHaveProperty('tickStep', tickStep);
    expect(tickValueStub.mock.calls[1][0]).toHaveProperty(
      'tickStep',
      smallTickStep
    );
  });

  it('should call generate both small and big ticks', () => {
    const tickStep = 5,
      smallTickStep = 1,
      startValue = -5,
      endValue = 5;
    const [
      first,
      second,
      third,
      forth,
      fifth,
      sixth,
      ...rest
    ] = generateLabeldTickSteps({
      tickStep,
      smallTickStep,
      startValue,
      endValue
    });

    expect(first).toHaveProperty('type', 'big');
    expect(second).toHaveProperty('type', 'small');
    expect(third).toHaveProperty('type', 'small');
    expect(forth).toHaveProperty('type', 'small');
    expect(fifth).toHaveProperty('type', 'small');
    expect(sixth).toHaveProperty('type', 'big');
  });

  it('should generate proper big steps', () => {
    const tickStep = 10,
      startValue = 0,
      endValue = 100;

    const result = generateLabeldTickSteps({
      tickStep,
      startValue,
      endValue,
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
