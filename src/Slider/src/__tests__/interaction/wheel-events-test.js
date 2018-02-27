import React from 'react';
import { mount, shallow } from 'enzyme';
import Slider from '../../Slider';
import RangeSlider from '../../RangeSlider';

describe('wheel interaction events', () => {
  describe('Slider', () => {
    it('should increment/decrement', () => {
      const onChangeSpy = sinon.spy();

      const component = shallow(
        <Slider defaultValue={50} onChange={onChangeSpy} />
      );
      component
        .instance()
        .handleWheel({
          deltaY: -1,
          preventDefault: () => {},
          stopPropagation: () => {}
        });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith(49);

      onChangeSpy.reset();
      component
        .instance()
        .handleWheel({
          deltaY: 1,
          preventDefault: () => {},
          stopPropagation: () => {}
        });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith(50);
    });
  });

  describe('RangeSlider', () => {
    it('should increment/decrement left value', () => {
      const onChangeSpy = sinon.spy();

      const component = shallow(
        <RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />
      );

      component.setState({
        startHandleFocused: true
      });

      component
        .instance()
        .handleWheel({
          deltaY: -1,
          preventDefault: () => {},
          stopPropagation: () => {}
        });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([39, 50]);

      onChangeSpy.reset();
      component
        .instance()
        .handleWheel({
          deltaY: 1,
          preventDefault: () => {},
          stopPropagation: () => {}
        });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([41, 50]);
    });

    it('should increment/decrement right value', () => {
      const onChangeSpy = sinon.spy();

      const component = shallow(
        <RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />
      );

      component.setState({
        endHandleFocused: true
      });

      component
        .instance()
        .handleWheel({
          deltaY: -1,
          preventDefault: () => {},
          stopPropagation: () => {}
        });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([40, 49]);

      onChangeSpy.reset();
      component
        .instance()
        .handleWheel({
          deltaY: 1,
          preventDefault: () => {},
          stopPropagation: () => {}
        });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([40, 51]);
    });

    it('should shift entire range when focusing track fill', () => {
      const onChangeSpy = sinon.spy();

      const component = shallow(
        <RangeSlider defaultValue={[40, 50]} onChange={onChangeSpy} />
      );

      component.setState({
        trackFillFocused: true
      });

      component
        .instance()
        .handleWheel({
          deltaY: -1,
          preventDefault: () => {},
          stopPropagation: () => {}
        });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([39, 49]);

      onChangeSpy.reset();
      component
        .instance()
        .handleWheel({
          deltaY: 1,
          preventDefault: () => {},
          stopPropagation: () => {}
        });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([41, 51]);
    });
  });
});
