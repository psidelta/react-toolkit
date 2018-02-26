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

describe('wheel interaction events', () => {
  describe('Slider', () => {
    it('should increment/decrement', () => {
      const onChangeSpy = sinon.spy();

      const component = shallow(<Slider defaultValue={50} onChange={onChangeSpy} />);
      component
        .instance()
        .handleWheel({ deltaY: -1, preventDefault: () => {}, stopPropagation: () => {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith(49);

      onChangeSpy.reset();
      component
        .instance()
        .handleWheel({ deltaY: 1, preventDefault: () => {}, stopPropagation: () => {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith(50);
    });
  });

  describe('RangeSlider', () => {
    it('should increment/decrement left value', () => {
      const onChangeSpy = sinon.spy();

      const component = shallow(<RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />);

      component.setState({
        startHandleFocused: true
      });

      component
        .instance()
        .handleWheel({ deltaY: -1, preventDefault: () => {}, stopPropagation: () => {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([39, 50]);

      onChangeSpy.reset();
      component
        .instance()
        .handleWheel({ deltaY: 1, preventDefault: () => {}, stopPropagation: () => {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([41, 50]);
    });

    it('should increment/decrement right value', () => {
      const onChangeSpy = sinon.spy();

      const component = shallow(<RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />);

      component.setState({
        endHandleFocused: true
      });

      component
        .instance()
        .handleWheel({ deltaY: -1, preventDefault: () => {}, stopPropagation: () => {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([40, 49]);

      onChangeSpy.reset();
      component
        .instance()
        .handleWheel({ deltaY: 1, preventDefault: () => {}, stopPropagation: () => {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([40, 51]);
    });

    it('should shift entire range when focusing track fill', () => {
      const onChangeSpy = sinon.spy();

      const component = shallow(<RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />);

      component.setState({
        trackFillFocused: true
      });

      component
        .instance()
        .handleWheel({ deltaY: -1, preventDefault: () => {}, stopPropagation: () => {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([39, 49]);

      onChangeSpy.reset();
      component
        .instance()
        .handleWheel({ deltaY: 1, preventDefault: () => {}, stopPropagation: () => {} });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([41, 51]);
    });
  });
});
