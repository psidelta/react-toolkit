import React from 'react';
import { mount, shallow } from 'enzyme';
import Slider from '../../Slider';
import RangeSlider from '../../RangeSlider';

describe('keyboard interaction events', () => {
  describe('Slider', () => {
    it('should be focusable', () => {
      const component = shallow(<Slider defaultValue={50} />);
      component.simulate('focus');
      expect(component.state('focused')).to.equal(true);
    });

    it('should increment/decrement on arrow left/right', () => {
      const onChangeSpy = sinon.spy();

      const component = shallow(
        <Slider defaultValue={50} onChange={onChangeSpy} />
      );
      component.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith(49);

      onChangeSpy.reset();
      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith(50);
    });
  });

  describe('RangeSlider', () => {
    it('should be focusable', () => {
      const component = shallow(<RangeSlider defaultValue={[40, 50]} />);
      component.simulate('focus', { target: null });
      expect(component.state('focused')).to.equal(true);
    });

    it('should increment/decrement left value on arrow left/right', () => {
      const onChangeSpy = sinon.spy();

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
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([39, 50]);

      onChangeSpy.reset();
      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([41, 50]);
    });

    it('should increment/decrement right value on arrow left/right', () => {
      const onChangeSpy = sinon.spy();

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
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([40, 49]);

      onChangeSpy.reset();
      component.simulate('keydown', {
        key: 'ArrowRight',
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

      component.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([39, 49]);

      onChangeSpy.reset();
      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([41, 51]);
    });
  });
});
