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

describe('keyboard interaction events', () => {
  describe('Slider', () => {
    it('should be focusable', () => {
      const component = shallow(<Slider defaultValue={50} />);
      component.simulate('focus');
      expect(component.state('focused')).toEqual(true);
    });

    it('should increment/decrement on arrow left/right', () => {
      const onChangeSpy = jest.fn();

      const component = shallow(
        <Slider defaultValue={50} onChange={onChangeSpy} />
      );
      component.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toBe(49);

      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy.mock.calls[1][0]).toBe(50);
    });
  });

  describe('RangeSlider', () => {
    it('should be focusable', () => {
      const component = shallow(<RangeSlider defaultValue={[40, 50]} />);
      component.simulate('focus', { target: null });
      expect(component.state('focused')).toEqual(true);
    });

    it('should increment/decrement left value on arrow left/right', () => {
      const onChangeSpy = jest.fn();

      const component = shallow(
        <RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />
      );

      component.setState({
        startHandleFocused: true
      });

      component.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual([39, 50]);

      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy.mock.calls[1][0]).toEqual([41, 50]);
    });

    it('should increment/decrement right value on arrow left/right', () => {
      const onChangeSpy = jest.fn();

      const component = shallow(
        <RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />
      );

      component.setState({
        endHandleFocused: true
      });

      component.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual([40, 49]);

      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy.mock.calls[1][0]).toEqual([40, 51]);
    });

    it('should shift entire range when focusing track fill', () => {
      const onChangeSpy = jest.fn();

      const component = shallow(
        <RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />
      );

      component.setState({
        trackFillFocused: true
      });

      component.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy.mock.calls[0][0]).toEqual([39, 49]);

      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy.mock.calls[1][0]).toEqual([41, 51]);
    });
  });
});
