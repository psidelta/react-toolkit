'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _AccordionTabTitle = require('../AccordionTabTitle');

var _AccordionTabTitle2 = _interopRequireDefault(_AccordionTabTitle);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion tooltip props', function () {
  var component = void 0,
      instance = void 0;

  beforeEach(function () {
    component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false },
      _react2.default.createElement(
        'div',
        { locked: true, 'data-test': 'tab-content-1', tabTitle: 'Tab 1' },
        'Tab 1'
      ),
      _react2.default.createElement(
        'div',
        { disabled: true, 'data-test': 'tab-content-2', tabTitle: 'Tab 2' },
        'Tab 2'
      ),
      _react2.default.createElement(
        'div',
        { 'data-test': 'tab-content-3', tabTitle: 'Tab 3' },
        'Tab 3'
      )
    ));

    instance = component.instance();
  });

  describe('expandTool', function () {
    it('should render expandTool by default', function () {
      var titleComponent = component.find('ZippyAccordionTabTitle').at(0);
      expect(_typeof(titleComponent.prop('expandTool'))).toBe('function');
      expect(titleComponent.prop('expandTool')).toEqual(_AccordionTabTitle2.default.defaultProps.expandTool);
    });

    it('should disabled expandTool with expandTool=null', function () {
      component.setProps({
        expandTool: null
      });
      var titleComponent = component.find('ZippyAccordionTabTitle').at(0);
      expect(titleComponent.prop('expandTool')).toEqual(null);
    });

    it('should support jsx/string as expandTool', function () {
      var expandTool1 = 'a';
      var expandTool2 = _react2.default.createElement(
        'div',
        null,
        'ok'
      );
      component.setProps({
        expandTool: expandTool1
      });
      expect(component.find('ZippyAccordionTabTitle').at(0).prop('expandTool')).toEqual(expandTool1);
      component.setProps({
        expandTool: expandTool2
      });
      expect(component.find('ZippyAccordionTabTitle').at(0).prop('expandTool')).toEqual(expandTool2);
    });

    it('should support function as expandTool', function () {
      var expandToolStub = sinon.stub().returns(_react2.default.createElement('div', null));
      component.setProps({
        expandTool: expandToolStub
      });

      expect(component.find('ZippyAccordionTabTitle').at(0).prop('expandTool')).toEqual(expandToolStub);
      expect(expandToolStub.callCount).toEqual(3);
    });
  });

  describe('expandOnToolOnly', function () {
    it('should set expandOnToolOnly to tab titles', function () {
      component.setProps({
        expandOnToolOnly: true
      });
      expect(component.find('ZippyAccordionTabTitle').at(0).prop('expandOnToolOnly')).toEqual(true);
    });
  });

  it('should warn on props.expandOnToolOnly && props.expandTool === null', function () {
    component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false, expandOnToolOnly: true, expandTool: null },
      _react2.default.createElement(
        'div',
        { locked: true, 'data-test': 'tab-content-1', tabTitle: 'Tab 1' },
        'Tab 1'
      ),
      _react2.default.createElement(
        'div',
        { disabled: true, 'data-test': 'tab-content-2', tabTitle: 'Tab 2' },
        'Tab 2'
      ),
      _react2.default.createElement(
        'div',
        { 'data-test': 'tab-content-3', tabTitle: 'Tab 3' },
        'Tab 3'
      )
    ));
    expect(component.find('ZippyAccordionTabTitle').at(0).prop('expandOnToolOnly')).toEqual(false);
  });
});

describe('AccordionTabTitle expandTool props', function () {
  describe('AccordionTabTitle expandTool', function () {
    var component = void 0;
    beforeEach(function () {
      component = (0, _enzyme.shallow)(_react2.default.createElement(_AccordionTabTitle2.default, { tabTitle: 'title' }));
    });

    it('should render default expandTool', function () {
      expect(component.find('.' + _AccordionTabTitle.CLASS_NAME + '__expand-tool-wrapper')).toHaveProperty('length', 1);
    });

    it('should not render if expandTool=null', function () {
      component.setProps({
        expandTool: null
      });
      expect(component.find('.' + _AccordionTabTitle.CLASS_NAME + '__expand-tool-wrapper')).toHaveProperty('length', 0);
    });

    it('should render custom expandTool calling renderer with proper params', function () {
      var expandToolStub = jest.fn(function () {
        return _react2.default.createElement('div', null);
      });
      component.setProps({
        expandTool: expandToolStub
      });

      var callArguments = expandToolStub.mock.calls[0][0];
      ['expanded', 'index', 'activeIndex', 'disabled', 'multiExpand', 'collapsible', 'focused', 'transition'].forEach(function (key) {
        expect(callArguments).toHaveProperty(key);
      });
    });
  });

  describe('expandOnToolOnly', function () {
    it('binds even listener on wrapper', function () {
      var onToggleSpy = jest.fn();
      var component = (0, _enzyme.shallow)(_react2.default.createElement(_AccordionTabTitle2.default, { onToggle: onToggleSpy, tabTitle: 'title' }));
      var toolWrapper = component.find('.' + _AccordionTabTitle.CLASS_NAME + '__expand-tool-wrapper');
      expect(toolWrapper.prop('onClick')).toBe(undefined);

      component.find('.' + _AccordionTabTitle.CLASS_NAME).simulate('click');
      expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });

    it('binds even listener only on tooltip when expandOnToolOnly=true', function () {
      var onToggleSpy = jest.fn();
      var component = (0, _enzyme.shallow)(_react2.default.createElement(_AccordionTabTitle2.default, {
        expandOnToolOnly: true,
        onToggle: onToggleSpy,
        tabTitle: 'title'
      }));
      var toolWrapper = component.find('.' + _AccordionTabTitle.CLASS_NAME + '__expand-tool-wrapper');
      expect(toolWrapper.prop('onClick')).toEqual(onToggleSpy);

      component.simulate('click');
      expect(onToggleSpy).toHaveBeenCalledTimes(0);
      toolWrapper.simulate('click');
      expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });
  });
});