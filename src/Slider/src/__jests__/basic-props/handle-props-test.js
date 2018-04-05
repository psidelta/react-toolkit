/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
    renderHandleStub = jest.fn(() => (
      <div key={Math.round(Math.random() * 100)} />
    ));
  });

  it('should propagate the proper props to the handle render function in slide', () => {
    const slider = shallow(<Slider renderHandle={renderHandleStub} />);
    expect(renderHandleStub).toHaveBeenCalledTimes(1);

    const callbackArgs = renderHandleStub.mock.calls[0];

    expect(callbackArgs).toHaveLength(3);
    const [config, extraProps, CLASS_NAME] = callbackArgs;

    expect(config).toHaveProperty('renderHandleContent');
    expect(config).toHaveProperty('renderTooltip');
    expect(config).toHaveProperty('dragging');
    expect(config).toHaveProperty('orientation');
    expect(config).toHaveProperty('horizontal');
    expect(config).toHaveProperty('currentValue');
    expect(config).toHaveProperty('handleSize');
    expect(config).toHaveProperty('handleStyle');
  });

  it('should propagate the proper props to the handle render function in range', () => {
    const rangeSlider = shallow(
      <RangeSlider renderHandle={renderHandleStub} />
    );
    expect(renderHandleStub).toHaveBeenCalledTimes(2);

    const callbackArgs = renderHandleStub.mock.calls[0];

    expect(callbackArgs).toHaveLength(3);
    const [config, extraProps, CLASS_NAME] = callbackArgs;

    expect(config).toHaveProperty('renderHandleContent');
    expect(config).toHaveProperty('renderTooltip');
    expect(config).toHaveProperty('dragging');
    expect(config).toHaveProperty('orientation');
    expect(config).toHaveProperty('horizontal');
    expect(config).toHaveProperty('currentValue');
    expect(config).toHaveProperty('handleSize');
    expect(config).toHaveProperty('handleStyle');
  });
});

describe('tooltip rendering', () => {
  let shouldShowTooltipStub;

  beforeEach(() => {
    shouldShowTooltipStub = jest.fn(() => true);
  });

  it('should call shouldShowTooltip when getting props', () => {
    const slider = shallow(
      <Slider shouldShowTooltip={shouldShowTooltipStub} />
    );
    expect(shouldShowTooltipStub).toHaveBeenCalledTimes(1);
  });

  it('should propagate the proper props to tooltip render function', () => {
    const rangeSlider = shallow(
      <RangeSlider shouldShowTooltip={shouldShowTooltipStub} />
    );
    expect(shouldShowTooltipStub).toHaveBeenCalledTimes(1);
  });

  it('renderHandle should call renderTooltip with proper props', () => {
    const renderTooltipSpy = jest.fn(() => <div />);

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

    expect(renderTooltipSpy).toHaveBeenCalledTimes(1);

    const args = renderTooltipSpy.mock.calls[0]; //.args;
    expect(args).toHaveLength(3);

    const [config, extraProps, CLASS_NAME] = args;

    expect(config).toHaveProperty('renderTooltipContent');
    expect(config).toHaveProperty('orientation');
    expect(config).toHaveProperty('tooltipPosition');

    expect(extraProps).toHaveProperty('visibleTooltip');
  });
});
