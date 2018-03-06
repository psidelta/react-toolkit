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
    const tickValueStub = sinon.stub().returns([]);
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

    expect(tickValueStub).to.have.been.calledTwice;
    expect(tickValueStub.getCall(0).args[0]).to.have.property(
      'tickStep',
      tickStep
    );
    expect(tickValueStub.getCall(1).args[0]).to.have.property(
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

    expect(first).to.have.property('type', 'big');
    expect(second).to.have.property('type', 'small');
    expect(third).to.have.property('type', 'small');
    expect(forth).to.have.property('type', 'small');
    expect(fifth).to.have.property('type', 'small');
    expect(sixth).to.have.property('type', 'big');
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

    expect(result.length).to.equal(99);

    expect(result[0]).to.have.property('type', 'small');
    expect(result[0]).to.have.property('value', 1);

    expect(result[result.length - 1]).to.have.property('value', 99);
    expect(result[result.length - 1]).to.have.property('type', 'small');

    expect(result[9]).to.have.property('type', 'big');
    expect(result[19]).to.have.property('type', 'big');
    expect(result[29]).to.have.property('type', 'big');
    expect(result[39]).to.have.property('type', 'big');
    expect(result[49]).to.have.property('type', 'big');
    expect(result[59]).to.have.property('type', 'big');
    expect(result[69]).to.have.property('type', 'big');
    expect(result[79]).to.have.property('type', 'big');
    expect(result[89]).to.have.property('type', 'big');
  });
});
