import { getPossitionOfValueBasedOnLimits } from '../../utils/value-utils';

describe('getPossitionOfValueBasedOnLimits logic', () => {
  it('should return procentual position of tick between start and end values', () => {
    const tickValue = 5,
      startValue = -15,
      endValue = 15;
    const tickPosition = getPossitionOfValueBasedOnLimits(tickValue, {
      startValue,
      endValue
    });
    expect(tickPosition).toEqual(0.667);
  });

  it('should return procentual position of tick between reversed start and end values', () => {
    const tickValue = 5,
      startValue = 15,
      endValue = -15;
    const tickPosition = getPossitionOfValueBasedOnLimits(tickValue, {
      startValue,
      endValue
    });
    expect(tickPosition).toEqual(0.333);
  });

  it('should support ticks outside of range', () => {
    let tickValue = 1000;
    const startValue = 15,
      endValue = -15;
    let tickPosition = getPossitionOfValueBasedOnLimits(tickValue, {
      startValue,
      endValue
    });
    expect(tickPosition).toEqual(0);

    tickValue = -1000;
    tickPosition = getPossitionOfValueBasedOnLimits(tickValue, {
      startValue,
      endValue
    });
    expect(tickPosition).toEqual(1);
  });

  it('should support ticks on the edge', () => {
    let tickValue, tickPosition;
    const startValue = 15,
      endValue = -15;

    tickValue = 15;
    tickPosition = getPossitionOfValueBasedOnLimits(tickValue, {
      startValue,
      endValue
    });
    expect(tickPosition).toEqual(0);

    tickValue = -15;
    tickPosition = getPossitionOfValueBasedOnLimits(tickValue, {
      startValue,
      endValue
    });
    expect(tickPosition).toEqual(1);
  });
});
