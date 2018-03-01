'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Slider = require('../../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _RangeSlider = require('../../RangeSlider');

var _RangeSlider2 = _interopRequireDefault(_RangeSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('keyboard interaction events', function () {
  describe('Slider', function () {
    it('should be focusable', function () {
      var component = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { defaultValue: 50 }));
      component.simulate('focus');
      expect(component.state('focused')).to.equal(true);
    });

    it('should increment/decrement on arrow left/right', function () {
      var onChangeSpy = sinon.spy();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { defaultValue: 50, onChange: onChangeSpy }));
      component.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith(49);

      onChangeSpy.reset();
      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith(50);
    });
  });

  describe('RangeSlider', function () {
    it('should be focusable', function () {
      var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: [40, 50] }));
      component.simulate('focus', { target: null });
      expect(component.state('focused')).to.equal(true);
    });

    it('should increment/decrement left value on arrow left/right', function () {
      var onChangeSpy = sinon.spy();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: [40, 50], onChange: onChangeSpy }));

      component.setState({
        startHandleFocused: true
      });

      component.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([39, 50]);

      onChangeSpy.reset();
      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([41, 50]);
    });

    it('should increment/decrement right value on arrow left/right', function () {
      var onChangeSpy = sinon.spy();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: [40, 50], onChange: onChangeSpy }));

      component.setState({
        endHandleFocused: true
      });

      component.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([40, 49]);

      onChangeSpy.reset();
      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([40, 51]);
    });

    it('should shift entire range when focusing track fill', function () {
      var onChangeSpy = sinon.spy();

      var component = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { defaultValue: [40, 50], onChange: onChangeSpy }));

      component.setState({
        trackFillFocused: true
      });

      component.simulate('keydown', {
        key: 'ArrowLeft',
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([39, 49]);

      onChangeSpy.reset();
      component.simulate('keydown', {
        key: 'ArrowRight',
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith([41, 51]);
    });
  });
});