'use strict';

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
      expect(titleComponent.prop('expandTool')).to.be.instanceOf(Function);
      expect(titleComponent.prop('expandTool')).to.equal(_AccordionTabTitle2.default.defaultProps.expandTool);
    });

    it('should disabled expandTool with expandTool=null', function () {
      component.setProps({
        expandTool: null
      });
      var titleComponent = component.find('ZippyAccordionTabTitle').at(0);
      expect(titleComponent.prop('expandTool')).to.equal(null);
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
      expect(component.find('ZippyAccordionTabTitle').at(0).prop('expandTool')).to.equal(expandTool1);
      component.setProps({
        expandTool: expandTool2
      });
      expect(component.find('ZippyAccordionTabTitle').at(0).prop('expandTool')).to.equal(expandTool2);
    });

    it('should support function as expandTool', function () {
      var expandToolStub = sinon.stub().returns(_react2.default.createElement('div', null));
      component.setProps({
        expandTool: expandToolStub
      });

      expect(component.find('ZippyAccordionTabTitle').at(0).prop('expandTool')).to.equal(expandToolStub);
      expect(expandToolStub.callCount).to.equal(3);
    });
  });

  describe('expandOnToolOnly', function () {
    it('should set expandOnToolOnly to tab titles', function () {
      component.setProps({
        expandOnToolOnly: true
      });
      expect(component.find('ZippyAccordionTabTitle').at(0).prop('expandOnToolOnly')).to.equal(true);
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
    expect(component.find('ZippyAccordionTabTitle').at(0).prop('expandOnToolOnly')).to.equal(false);
  });
});

describe('AccordionTabTitle expandTool props', function () {
  describe('AccordionTabTitle expandTool', function () {
    var component = void 0;
    beforeEach(function () {
      component = (0, _enzyme.shallow)(_react2.default.createElement(_AccordionTabTitle2.default, { tabTitle: 'title' }));
    });

    it('should render default expandTool', function () {
      expect(component.find('.' + _AccordionTabTitle.CLASS_NAME + '__expand-tool-wrapper')).to.have.property('length', 1);
    });

    it('should not render if expandTool=null', function () {
      component.setProps({
        expandTool: null
      });
      expect(component.find('.' + _AccordionTabTitle.CLASS_NAME + '__expand-tool-wrapper')).to.have.property('length', 0);
    });

    it('should render custom expandTool calling renderer with proper params', function () {
      var expandToolStub = sinon.stub().returns(_react2.default.createElement('div', null));
      component.setProps({
        expandTool: expandToolStub
      });

      var callArguments = expandToolStub.args[0][0];
      ['expanded', 'index', 'activeIndex', 'disabled', 'multiExpand', 'collapsible', 'focused', 'transition'].forEach(function (key) {
        expect(callArguments).to.have.property(key);
      });
    });
  });

  describe('expandOnToolOnly', function () {
    it('binds even listener on wrapper', function () {
      var onToggleSpy = sinon.spy();
      var component = (0, _enzyme.shallow)(_react2.default.createElement(_AccordionTabTitle2.default, { onToggle: onToggleSpy, tabTitle: 'title' }));
      var toolWrapper = component.find('.' + _AccordionTabTitle.CLASS_NAME + '__expand-tool-wrapper');
      expect(toolWrapper.prop('onClick')).to.be.undefined;

      component.find('.' + _AccordionTabTitle.CLASS_NAME).simulate('click');
      expect(onToggleSpy).to.have.been.calledOnce;
    });

    it('binds even listener only on tooltip when expandOnToolOnly=true', function () {
      var onToggleSpy = sinon.spy();
      var component = (0, _enzyme.shallow)(_react2.default.createElement(_AccordionTabTitle2.default, {
        expandOnToolOnly: true,
        onToggle: onToggleSpy,
        tabTitle: 'title'
      }));
      var toolWrapper = component.find('.' + _AccordionTabTitle.CLASS_NAME + '__expand-tool-wrapper');
      expect(toolWrapper.prop('onClick')).to.equal(onToggleSpy);

      component.simulate('click');
      expect(onToggleSpy).to.not.have.been.called;
      toolWrapper.simulate('click');
      expect(onToggleSpy).to.have.been.calledOnce;
    });
  });
});