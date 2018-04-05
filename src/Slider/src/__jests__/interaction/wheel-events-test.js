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

const incrementEvent = {
  deltaY: -1,
  preventDefault: () => {},
  stopPropagation: () => {}
};

const decrementEvent = {
  deltaY: 1,
  preventDefault: () => {},
  stopPropagation: () => {}
};

describe('wheel interaction events', () => {
  describe('Slider', () => {
    it('should increment/decrement', () => {
      const onChangeSpy = jest.fn();

      const component = shallow(
        <Slider defaultValue={50} onChange={onChangeSpy} />
      );

      component.instance().handleWheel(incrementEvent);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual(51);

      component.instance().handleWheel(decrementEvent);
      component.instance().handleWheel(decrementEvent);

      expect(onChangeSpy).toHaveBeenCalledTimes(3);
      expect(onChangeSpy.mock.calls[2][0]).toEqual(49);
    });
  });

  describe('RangeSlider', () => {
    it('should increment/decrement left value', () => {
      const onChangeSpy = jest.fn();

      const component = shallow(
        <RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />
      );

      component.setState({
        startHandleFocused: true
      });

      component.instance().handleWheel(incrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual([41, 50]);

      component.instance().handleWheel(decrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy.mock.calls[1][0]).toEqual([39, 50]);
    });

    it('should increment/decrement right value', () => {
      const onChangeSpy = jest.fn();

      const component = shallow(
        <RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />
      );

      component.setState({
        endHandleFocused: true
      });

      component.instance().handleWheel(incrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual([40, 51]);

      component.instance().handleWheel(decrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy.mock.calls[1][0]).toEqual([40, 49]);
    });

    it('should shift entire range when focusing track fill', () => {
      const onChangeSpy = jest.fn();

      const component = shallow(
        <RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />
      );

      component.setState({
        trackFillFocused: true
      });

      component.instance().handleWheel(incrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual([41, 51]);

      component.instance().handleWheel(decrementEvent);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy.mock.calls[1][0]).toEqual([39, 49]);
    });
  });
});
