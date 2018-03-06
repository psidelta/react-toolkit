'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion Callbacks', function () {
  var accordionInnerContent = void 0;
  beforeEach(function () {
    accordionInnerContent = [_react2.default.createElement(
      'div',
      { key: 1, tabTitle: _react2.default.createElement(
          'div',
          { 'data-test': 'tab1' },
          'Tab 1'
        ) },
      'Tab 1'
    ), _react2.default.createElement(
      'div',
      { key: 2, tabTitle: _react2.default.createElement(
          'div',
          { 'data-test': 'tab2' },
          'Tab 2'
        ) },
      'Tab 2'
    ), _react2.default.createElement(
      'div',
      { key: 3, tabTitle: 'tab3' },
      'Tab 3'
    )];
  });

  it('should set defaultActiveIndex to a valid number', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(
      _Accordion2.default,
      { 'data-test': 'self', defaultActiveIndex: 1, transition: false },
      accordionInnerContent
    ));

    var activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([1]);
  });

  it('should assume defaultActiveIndex={0} by default', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(
      _Accordion2.default,
      { 'data-test': 'self', transition: false },
      accordionInnerContent
    ));

    var activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([0]);
  });

  it('should prioritise activeIndex over defaultActiveIndex', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(
      _Accordion2.default,
      {
        'data-test': 'self',
        activeIndex: 1,
        defaultActiveIndex: 2,
        transition: false
      },
      accordionInnerContent
    ));

    var activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([1]);
  });

  it('should allow setting null defaultActiveIndex', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(
      _Accordion2.default,
      { 'data-test': 'self', defaultActiveIndex: null, transition: false },
      accordionInnerContent
    ));

    var activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([]);
  });

  it('should reset to zero a negative defaultActiveIndex', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(
      _Accordion2.default,
      { 'data-test': 'self', defaultActiveIndex: -1, transition: false },
      accordionInnerContent
    ));

    var activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([0]);
  });

  it('should reset to index of last tab a defaultActiveIndex bigger than the number of tabs', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(
      _Accordion2.default,
      { 'data-test': 'self', defaultActiveIndex: 99, transition: false },
      accordionInnerContent
    ));
    var activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([2]); //as there are 3 tabs, with 0 based index
  });

  it('should allow setting [] defaultActiveIndex', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(
      _Accordion2.default,
      { 'data-test': 'self', defaultActiveIndex: [], transition: false },
      accordionInnerContent
    ));

    var activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([]);
  });

  it('should allow setting [] activeIndex', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(
      _Accordion2.default,
      { 'data-test': 'self', activeIndex: [], transition: false },
      accordionInnerContent
    ));

    var activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([]);
  });

  it('should allow controlling active tabs by active index', function () {
    var activeTabs = void 0;
    var component = (0, _enzyme.shallow)(_react2.default.createElement(
      _Accordion2.default,
      { 'data-test': 'self', activeIndex: [], transition: false },
      accordionInnerContent
    ));

    activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([]);

    component.setProps({
      activeIndex: [0]
    });

    activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([0]);

    component.setProps({
      activeIndex: [2]
    });
    activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([2]);
  });

  it('should call onActivate while controlled component', function () {
    var activeTabs = void 0,
        onActivateSpy = sinon.spy();
    var component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      {
        onActivate: onActivateSpy,
        'data-test': 'self',
        activeIndex: [],
        transition: false
      },
      accordionInnerContent
    ));

    component.find('[data-test="tab2"]').simulate('click');

    expect(onActivateSpy).to.have.been.calledOnce;

    component.setProps({
      multiExpand: true
    });

    component.find('[data-test="tab1"]').simulate('click');
    expect(onActivateSpy).to.have.been.calledTwice;
  });
});