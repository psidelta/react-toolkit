import React from 'react';
import { mount, shallow } from 'enzyme';
import Slider from '../../Slider';
import RangeSlider from '../../RangeSlider';

describe('step prop', () => {
  it('defaults to 1 and gets propagated to toValue method', () => {
    const toStepSpy = jest.fn(value => value);
    const slider = shallow(<Slider toStep={toStepSpy} />);
    const rangeSlider = shallow(<RangeSlider toStep={toStepSpy} />);

    expect(toStepSpy.mock.calls[0][1]).toEqual(1);
    expect(toStepSpy.mock.calls[1][1]).toEqual(1);
    expect(toStepSpy.mock.calls[2][1]).toEqual(1);
  });

  it('should propagate custom step to toStep function', () => {
    const STEP_1 = 10;
    const STEP_2 = 20;

    const toStepSpy = jest.fn(value => value);
    const slider = shallow(<Slider step={STEP_1} toStep={toStepSpy} />);
    const rangeSlider = shallow(
      <RangeSlider step={STEP_2} toStep={toStepSpy} />
    );

    expect(toStepSpy.mock.calls[0][1]).toEqual(STEP_1);
    expect(toStepSpy.mock.calls[1][1]).toEqual(STEP_2);
    expect(toStepSpy.mock.calls[2][1]).toEqual(STEP_2);
  });

  it('should propagate step when keyboard even happens', () => {
    const getValueModifierSpy = jest.fn(value => value);
    const slider = shallow(
      <Slider step={5} getValueModifier={getValueModifierSpy} />
    );

    slider.instance().handleKeyDown({ deltaY: 1 });

    expect(getValueModifierSpy.mock.calls[0][1]).toHaveProperty('step', 5);
  });
});

describe('largeStep prop', () => {
  it('should propagate largeStep when keyboard even happens', () => {
    const getValueModifierSpy = jest.fn(value => value);
    const slider = shallow(
      <Slider largeStep={5} getValueModifier={getValueModifierSpy} />
    );

    slider.instance().handleKeyDown({ deltaY: 1 });

    expect(getValueModifierSpy.mock.calls[0][1]).toHaveProperty('largeStep', 5);
  });
});
