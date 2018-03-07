'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion Callbacks', function () {
  var component = void 0,
      instance = void 0,
      onActivateSpy = void 0,
      onExpandSpy = void 0,
      onCollapseSpy = void 0,
      tab1OnExpandSpy = void 0,
      tab1OnCollapseSpy = void 0,
      tab2OnExpandSpy = void 0;

  beforeEach(function () {
    onActivateSpy = jest.fn();
    tab1OnExpandSpy = jest.fn();
    tab1OnCollapseSpy = jest.fn();
    tab2OnExpandSpy = jest.fn();
    onExpandSpy = jest.fn();
    onCollapseSpy = jest.fn();

    component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      {
        onExpand: onExpandSpy,
        onCollapse: onCollapseSpy,
        onActivate: onActivateSpy,
        transition: false
      },
      _react2.default.createElement(
        'div',
        {
          tabProps: {
            onExpand: tab1OnExpandSpy,
            onCollapse: tab1OnCollapseSpy
          },
          tabTitle: 'valid tab'
        },
        'Tab 1'
      ),
      _react2.default.createElement(
        'div',
        {
          tabProps: {
            onExpand: tab2OnExpandSpy
          },
          tabTitle: 'another valid tab'
        },
        'Tab 2'
      ),
      _react2.default.createElement(
        'div',
        { ref: 'lockedTab', locked: true, tabTitle: 'locked tab' },
        'Tab 3'
      ),
      _react2.default.createElement(
        'div',
        { disabled: true, tabTitle: 'disabled tab' },
        'Tab 4'
      )
    ));
    instance = component.instance();
  });

  it('should call onActivate with number on expand/collapse', function () {
    //should not activate on mount
    expect(onActivateSpy).toHaveBeenCalledTimes(0);
    instance.expandAt(1);
    expect(onActivateSpy).toHaveBeenCalledTimes(1);
    expect(onActivateSpy).toHaveBeenCalledWith(1);
    instance.expandAt(0);
    expect(onActivateSpy).toHaveBeenCalledWith(0);
  });

  it('should call onActivate with array on expand/collapse', function () {
    component.setProps({ multiExpand: true });
    instance.expandAt(1);
    expect(onActivateSpy).toHaveBeenCalledWith([0, 1]);
  });

  it('should call individual callbacks for each tab as well as accordion callbacks', function () {
    instance.expandAt(1);
    expect(onExpandSpy).toHaveBeenCalledTimes(1);
    expect(onExpandSpy).toHaveBeenCalledWith(1);
    expect(onCollapseSpy).toHaveBeenCalledTimes(1);
    expect(onCollapseSpy).toHaveBeenCalledWith(0);

    expect(tab1OnCollapseSpy).toHaveBeenCalledTimes(1);
    expect(tab2OnExpandSpy).toHaveBeenCalledTimes(1);

    instance.expandAt(0);
    expect(onExpandSpy).toHaveBeenCalledWith(0);
    expect(onCollapseSpy).toHaveBeenCalledWith(1);
    expect(tab1OnExpandSpy).toHaveBeenCalledTimes(1);
  });

  it('should recalculate tab titles onResize', function () {
    var tabTitles = instance.tabTitles;
    var tabTitle1 = tabTitles[0];
    var tabTitle2 = tabTitles[1];
    var tabTitle3 = tabTitles[2];

    var onResize1 = jest.spyOn(tabTitle1, 'onResize');
    var onResize2 = jest.spyOn(tabTitle2, 'onResize');
    var onResize3 = jest.spyOn(tabTitle3, 'onResize');

    instance.onResize();

    expect(onResize1).toHaveBeenCalledTimes(1);
    expect(onResize2).toHaveBeenCalledTimes(1);
    expect(onResize3).toHaveBeenCalledTimes(1);
  });
});