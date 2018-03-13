import React from 'react';
import { mount, shallow } from 'enzyme';

import Slider from '../../Slider';
import RangeSlider from '../../RangeSlider';

import renderHandle, {
  renderTooltip,
  renderTooltipContent
} from '../../utils/sub-components/handlers';

describe('handle rendering', () => {
  let renderHandleStub;

  beforeEach(() => {
    renderHandleStub = sinon
      .stub()
      .returns(<div key={Math.round(Math.random() * 100)} />);
  });

  it('should propagate the proper props to the handle render function in slide', () => {
    const slider = shallow(<Slider renderHandle={renderHandleStub} />);
    expect(renderHandleStub).to.have.been.calledOnce;

    const callbackArgs = renderHandleStub.getCall(0).args;

    expect(callbackArgs).to.have.length(3);
    const [config, extraProps, CLASS_NAME] = callbackArgs;

    expect(config).to.have.property('renderHandleContent');
    expect(config).to.have.property('renderTooltip');
    expect(config).to.have.property('dragging');
    expect(config).to.have.property('orientation');
    expect(config).to.have.property('horizontal');
    expect(config).to.have.property('currentValue');
    expect(config).to.have.property('handleSize');
    expect(config).to.have.property('handleStyle');
  });

  it('should propagate the proper props to the handle render function in range', () => {
    const rangeSlider = shallow(
      <RangeSlider renderHandle={renderHandleStub} />
    );
    expect(renderHandleStub).to.have.been.calledTwice;

    const callbackArgs = renderHandleStub.getCall(0).args;

    expect(callbackArgs).to.have.length(3);
    const [config, extraProps, CLASS_NAME] = callbackArgs;

    expect(config).to.have.property('renderHandleContent');
    expect(config).to.have.property('renderTooltip');
    expect(config).to.have.property('dragging');
    expect(config).to.have.property('orientation');
    expect(config).to.have.property('horizontal');
    expect(config).to.have.property('currentValue');
    expect(config).to.have.property('handleSize');
    expect(config).to.have.property('handleStyle');
  });
});

describe('tooltip rendering', () => {
  let shouldShowTooltipStub;

  beforeEach(() => {
    shouldShowTooltipStub = sinon.stub().returns(true);
  });

  it('should call shouldShowTooltip when getting props', () => {
    const slider = shallow(
      <Slider shouldShowTooltip={shouldShowTooltipStub} />
    );
    expect(shouldShowTooltipStub).to.have.been.calledOnce;
  });

  it('should propagate the proper props to tooltip render function', () => {
    const rangeSlider = shallow(
      <RangeSlider shouldShowTooltip={shouldShowTooltipStub} />
    );
    expect(shouldShowTooltipStub).to.have.been.calledOnce;
  });

  it('renderHandle should call renderTooltip with proper props', () => {
    const renderTooltipSpy = sinon.spy(() => <div />);

    renderHandle(
      {
        renderTooltip: renderTooltipSpy,
        renderHandleContent: () => <div />,
        renderTooltipContent: () => <div />,
        orientation: 'vertical',
        currentValue: 1,
        handleSize: { width: 20, height: 20 },
        handleStyle: {},
        tooltipPosition: 'before'
      },
      {
        setHandleRef: () => true,
        visibleTooltip: false
      }
    );

    expect(renderTooltipSpy).to.have.been.calledOnce;
    const args = renderTooltipSpy.getCall(0).args;
    expect(args).to.have.length(3);

    const [config, extraProps, CLASS_NAME] = args;

    expect(config).to.have.property('renderTooltipContent');
    expect(config).to.have.property('orientation');
    expect(config).to.have.property('tooltipPosition');

    expect(extraProps).to.have.property('visibleTooltip');
  });
});
