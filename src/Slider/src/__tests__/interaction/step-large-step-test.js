/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Slider from '../../Slider';
import RangeSlider from '../../RangeSlider';

describe('step prop', () => {
  it('defaults to 1 and gets propagated to toValue method', () => {
    const toStepSpy = sinon.spy(value => value);
    const slider = shallow(<Slider toStep={toStepSpy} />);
    const rangeSlider = shallow(<RangeSlider toStep={toStepSpy} />);

    expect(toStepSpy.getCall(0).args[1]).to.equal(1);
    expect(toStepSpy.getCall(1).args[1]).to.equal(1);
    expect(toStepSpy.getCall(2).args[1]).to.equal(1);
  });

  it('should propagate custom step to toStep function', () => {
    const STEP_1 = 10;
    const STEP_2 = 20;

    const toStepSpy = sinon.spy(value => value);
    const slider = shallow(<Slider step={STEP_1} toStep={toStepSpy} />);
    const rangeSlider = shallow(<RangeSlider step={STEP_2} toStep={toStepSpy} />);

    expect(toStepSpy.getCall(0).args[1]).to.equal(STEP_1);
    expect(toStepSpy.getCall(1).args[1]).to.equal(STEP_2);
    expect(toStepSpy.getCall(2).args[1]).to.equal(STEP_2);
  });

  it('should propagate step when keyboard even happens', () => {
    const getValueModifierSpy = sinon.spy(value => value);
    const slider = shallow(<Slider step={5} getValueModifier={getValueModifierSpy} />);

    getValueModifierSpy.reset();
    slider.instance().handleKeyDown({ deltaY: 1 });

    expect(getValueModifierSpy.getCall(0).args[1]).to.have.property('step', 5);
  });
});

describe('largeStep prop', () => {
  it('should propagate largeStep when keyboard even happens', () => {
    const getValueModifierSpy = sinon.spy(value => value);
    const slider = shallow(<Slider largeStep={5} getValueModifier={getValueModifierSpy} />);

    getValueModifierSpy.reset();
    slider.instance().handleKeyDown({ deltaY: 1 });

    expect(getValueModifierSpy.getCall(0).args[1]).to.have.property('largeStep', 5);
  });
});
