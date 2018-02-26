'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion Classes', function () {
  var component = void 0;

  before(function () {
    component = (0, _enzyme.shallow)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false },
      _react2.default.createElement(
        'div',
        { tabTitle: 'hello world' },
        'First tab'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: 'second tab' },
        'Second tab'
      )
    ));
  });

  it('should be instance of Accordion', function () {
    expect(component.instance()).to.be.instanceOf(_Accordion2.default);
  });

  describe('class name assigns', function () {
    it('should contain main class', function () {
      expect(component.prop('className')).to.contain(_Accordion.CLASS_NAME);
    });

    it('should contain theme class', function () {
      expect(component.prop('className')).to.contain(_Accordion.CLASS_NAME + '--theme-default');
    });

    it('should contain layout class', function () {
      expect(component.prop('className')).to.contain(_Accordion.CLASS_NAME + '--vertical');
      component.setProps({
        horizontal: true
      });
      expect(component.prop('className')).to.contain(_Accordion.CLASS_NAME + '--horizontal');
    });

    it('shuold contain tooltip position class', function () {
      expect(component.prop('className')).to.contain(_Accordion.CLASS_NAME + '--expand-tool-end');
      component.setProps({
        expandToolPosition: 'start'
      });
      expect(component.prop('className')).to.not.contain(_Accordion.CLASS_NAME + '--expand-tool-end');
      expect(component.prop('className')).to.contain(_Accordion.CLASS_NAME + '--expand-tool-start');
    });

    it('shuold contain expand count class', function () {
      expect(component.prop('className')).to.contain(_Accordion.CLASS_NAME + '--single-expand');
      component.setProps({
        multiExpand: true
      });
      expect(component.prop('className')).to.not.contain(_Accordion.CLASS_NAME + '--single-expand');
      expect(component.prop('className')).to.contain(_Accordion.CLASS_NAME + '--multi-expand');
    });

    it('should contain rtl class when rtl mode true', function () {
      expect(component.prop('className')).to.not.contain(_Accordion.CLASS_NAME + '--rtl');
      component.setProps({
        rtl: true
      });
      expect(component.prop('className')).to.contain(_Accordion.CLASS_NAME + '--rtl');
    });

    it('should add focus class on focus', function () {
      expect(component.prop('className')).to.not.contain(_Accordion.CLASS_NAME + '--focused');
      component.simulate('focus');
      expect(component.prop('className')).to.contain(_Accordion.CLASS_NAME + '--focused');
    });
  });
});