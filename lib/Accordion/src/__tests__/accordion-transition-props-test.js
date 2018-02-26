'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _AccordionTabTitle = require('../AccordionTabTitle');

var _AccordionTabTitle2 = _interopRequireDefault(_AccordionTabTitle);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion transition props', function () {
  var component = void 0,
      instance = void 0,
      raf = function raf(cb) {
    return cb();
  };

  beforeEach(function () {
    component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { raf: raf },
      _react2.default.createElement(
        'div',
        { tabTitle: _react2.default.createElement(
            'div',
            { 'data-test': 'tab1' },
            'Tab 1'
          ) },
        'Tab 1'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: _react2.default.createElement(
            'div',
            { 'data-test': 'tab2' },
            'Tab 2'
          ) },
        'Tab 2'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: _react2.default.createElement(
            'div',
            { 'data-test': 'tab3' },
            'Tab 3'
          ) },
        'Tab 3'
      )
    ));

    instance = component.instance();
  });

  it('should transition on expand in single mode', function () {
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([1]);
  });

  it('should transition on expand in multi mode', function () {
    component.setProps({
      multiExpand: true
    });
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([0, 1]);
  });

  it('should transition to fully collapsed then expand', function () {
    component.setProps({
      collapsible: true
    });

    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([]);
    instance.tabContainers[0].onTransitionEnd();

    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([1]);
    instance.tabContainers[1].onTransitionEnd();

    component.setProps({
      multiExpand: true
    });

    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([]);
    instance.tabContainers[1].onTransitionEnd();

    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([0]);
    instance.tabContainers[0].onTransitionEnd();

    component.setProps({
      horizontal: true
    });

    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([]);
    instance.tabContainers[0].onTransitionEnd();

    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([1]);
    instance.tabContainers[1].onTransitionEnd();

    component.setProps({
      multiExpand: false
    });

    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([]);
    instance.tabContainers[1].onTransitionEnd();

    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([0]);
    instance.tabContainers[0].onTransitionEnd();
  });
});