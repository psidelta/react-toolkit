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

describe('defaultValue prop', () => {
  it('should support instance without default value', () => {
    const sliderComponent = shallow(<Slider />);
    const rangeComponent = shallow(<RangeSlider />);

    expect(sliderComponent.instance()).to.be.instanceOf(Slider);
    expect(rangeComponent.instance()).to.be.instanceOf(RangeSlider);
  });

  it('should set default value to slider', () => {
    const DEFAULT_VALUE = 30;
    const component = shallow(<Slider defaultValue={DEFAULT_VALUE} />);

    expect(component.state('value')).to.equal(DEFAULT_VALUE);
  });

  it('should set default value to range slider', () => {
    const DEFAULT_VALUE = [30, 40];
    const component = shallow(<RangeSlider defaultValue={DEFAULT_VALUE} />);

    expect(component.state('value')).to.equal(DEFAULT_VALUE);
  });

  it('should set default value to reversed range slider', () => {
    const DEFAULT_VALUE = [40, 50];
    const component = shallow(
      <RangeSlider startValue={100} endValue={0} defaultValue={DEFAULT_VALUE} />
    );

    expect(component.state('value')).to.equal(DEFAULT_VALUE);
    expect(component.instance().p.currentValue).to.deep.equal([50, 40]);
  });

  it('should convert default value to value respecting min and max constraints', () => {
    const DEFAULT_VALUE_1 = [40, 50];
    const DEFAULT_VALUE_2 = [10, 100];
    let component;

    component = shallow(<RangeSlider minRange={30} defaultValue={DEFAULT_VALUE_1} />);
    expect(component.instance().p.currentValue).to.deep.equal([40, 70]);

    component = shallow(<RangeSlider maxRange={30} defaultValue={DEFAULT_VALUE_2} />);
    expect(component.instance().p.currentValue).to.deep.equal([10, 40]);
  });
});
