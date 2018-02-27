import { getTrackFillPercentages } from '../../utils/sub-components/slide-track';

describe('getTrackFillPercentages logic', () => {
  let trackFillPercentages;

  it('should return percentages of range', () => {
    // 0...10..20....50...........100
    // ^---|    |--------------------
    trackFillPercentages = getTrackFillPercentages({
      currentValue: [10, 20],
      startValue: 0,
      endValue: 100
    });

    expect(trackFillPercentages).to.deep.equal([0.1, 0.2]);
  });

  it('should return percentages of reversed range', () => {
    // 100.........50....30...20....0
    // ^----from left----|    |------
    trackFillPercentages = getTrackFillPercentages({
      currentValue: [30, 20],
      startValue: 100,
      endValue: 0
    });

    expect(trackFillPercentages).to.deep.equal([0.7, 0.8]);
  });

  it('should return percentages of slide from start', () => {
    trackFillPercentages = getTrackFillPercentages({
      currentValue: 20,
      startValue: -100,
      endValue: 100,
      trackFillPosition: 'start'
    });

    expect(trackFillPercentages).to.deep.equal([0, 0.6]);
  });

  it('should return percentages of slide from end', () => {
    trackFillPercentages = getTrackFillPercentages({
      currentValue: 20,
      startValue: -100,
      endValue: 100,
      trackFillPosition: 'end'
    });

    expect(trackFillPercentages).to.deep.equal([0.6, 1]);
  });

  it('should return percentages of slide from start reversed', () => {
    trackFillPercentages = getTrackFillPercentages({
      currentValue: 20,
      startValue: 100,
      endValue: -100,
      trackFillPosition: 'start'
    });

    expect(trackFillPercentages).to.deep.equal([0, 0.4]);
  });

  it('should return percentages of slide from end reversed', () => {
    trackFillPercentages = getTrackFillPercentages({
      currentValue: 20,
      startValue: 100,
      endValue: -100,
      trackFillPosition: 'end'
    });

    expect(trackFillPercentages).to.deep.equal([0.4, 1]);
  });

  it('should return percentages assuring lower value first', () => {
    trackFillPercentages = getTrackFillPercentages({
      currentValue: [-1.5, 2],
      startValue: 36,
      endValue: -12,
      trackFillPosition: 'end'
    });

    expect(trackFillPercentages).to.deep.equal([0.708, 0.781]);
  });
});
