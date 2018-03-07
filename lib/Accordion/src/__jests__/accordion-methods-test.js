'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _enzyme = require('enzyme');

var _testUtils = require('../../../common/testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

describe('Accordion Methods - Expanding and Collapsing', function () {
  var classOfExpandedTab = '.zippy-react-toolkit-accordion__tab-title--expanded';

  /* test method using DOM */
  it('should only expand valid tabs', function () {
    var accordionInstance = (0, _testUtils.render)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false },
      _react2.default.createElement(
        'div',
        { disabled: true, tabTitle: 'disabled tab' },
        'content'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: 'Enabled tab' },
        'content'
      ),
      _react2.default.createElement(
        'div',
        { tabProps: { disabled: true }, tabTitle: 'Second disabled tab' },
        'content'
      )
    ));
    accordionInstance.expandAll();

    var accordionNode = (0, _reactDom.findDOMNode)(accordionInstance);
    var expandedNodes = [].concat(_toConsumableArray(accordionNode.querySelectorAll('.zippy-react-toolkit-accordion__tab-title--expanded')));

    expect(expandedNodes.length).toEqual(1);
    expect(expandedNodes[0].innerHTML.indexOf('Enabled tab')).not.toBe(-1);

    accordionInstance.unmount();
  });

  it('should auto expand a locked tab', function () {
    var accordionInstance = (0, _testUtils.render)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false, multiExpand: true, defaultActiveIndex: [0, 1, 2] },
      _react2.default.createElement(
        'div',
        { tabTitle: 'unlocked tab' },
        'Locked tab 1'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: 'Enabled tab' },
        'Second unlocked tab...'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: 'Second disabled tab', tabProps: { locked: true } },
        'Locked through props tab'
      )
    ));
    var accordionNode = (0, _reactDom.findDOMNode)(accordionInstance);
    var expandedNodes = [].concat(_toConsumableArray(accordionNode.querySelectorAll('.zippy-react-toolkit-accordion__tab-title--expanded')));
    expect(expandedNodes.length).toEqual(3);
    accordionInstance.unmount();
  });

  it('should expand automatically at first tab if no defaultActiveIndex is set', function () {
    var component = (0, _testUtils.render)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false },
      _react2.default.createElement(
        'div',
        { tabTitle: 'Expanded tab' },
        'Tab 1'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: 'second tab' },
        'Tab 2'
      )
    ));

    var accordionNode = (0, _reactDom.findDOMNode)(component);
    var expandedNodes = [].concat(_toConsumableArray(accordionNode.querySelectorAll(classOfExpandedTab)));

    expect(expandedNodes.length).toEqual(1);
    expect(expandedNodes[0].innerHTML.indexOf('Expanded tab')).not.toBe(-1);
    component.unmount();
  });

  it('should expand automatically at defaultActiveIndex', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { defaultActiveIndex: 1, transition: false },
      _react2.default.createElement(
        'div',
        { tabTitle: 'valid tab' },
        'Tab 1'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: 'this tab will be expanded by default' },
        'Tab 2'
      )
    ));
    expect(component.instance().getActiveTabs()).toEqual([1]);
  });

  it('should skip expanding disabled tabs', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false, multiExpand: true },
      _react2.default.createElement(
        'div',
        { tabProps: { disabled: true }, tabTitle: 'valid tab' },
        'Tab 1'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: 'another valid tab' },
        'Tab 2'
      ),
      _react2.default.createElement(
        'div',
        { disabled: true, tabTitle: 'this is the default tab' },
        'Tab 3'
      )
    ));
    component.instance().expandAll();
    expect(component.instance().getActiveTabs()).toEqual([1]);
  });

  it('should expand at specific index', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false },
      _react2.default.createElement(
        'div',
        null,
        'tab 1'
      ),
      _react2.default.createElement(
        'div',
        null,
        'tab 2'
      )
    ));
    var instance = component.instance();
    instance.expandAt(1);
    expect(instance.getActiveTabs()).toEqual([1]);
  });

  it('should not be able to expand a locked tab', function () {
    var accordionInstance = (0, _testUtils.render)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false },
      _react2.default.createElement(
        'div',
        { tabTitle: 'enabled tab' },
        'enabled tab 1'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: 'Enabled tab' },
        'enabled tab 2...'
      ),
      _react2.default.createElement(
        'div',
        { tabTitle: 'Second disabled tab', tabProps: { locked: true } },
        'locked tab'
      )
    ));
    accordionInstance.expandAt(2);
    var accordionNode = (0, _reactDom.findDOMNode)(accordionInstance);
    var expandedNodes = [].concat(_toConsumableArray(accordionNode.querySelectorAll('.zippy-react-toolkit-accordion__tab-title--expanded')));
    expect(expandedNodes[0].innerHTML.indexOf('locked tab')).toBe(-1);
    expect(expandedNodes[0].innerHTML.indexOf('enabled tab')).not.toBe(-1);
    accordionInstance.unmount();
  });

  it('should not expand a disabled through props tab', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false },
      _react2.default.createElement(
        'div',
        null,
        'tab 1'
      ),
      _react2.default.createElement(
        'div',
        { tabProps: { disabled: true } },
        'tab 2'
      )
    ));
    var instance = component.instance();
    instance.expandAt(1);
    expect(instance.getActiveTabs()).not.toContain(1);
  });

  it('should not expand a disabled tab', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false },
      _react2.default.createElement(
        'div',
        null,
        'tab 1'
      ),
      _react2.default.createElement(
        'div',
        { disabled: true },
        'tab 2'
      )
    ));
    var instance = component.instance();
    instance.expandAt(1);
    expect(instance.getActiveTabs()).not.toContain(1);
  });

  it('should collapse when expanding another tab', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false },
      _react2.default.createElement(
        'div',
        null,
        'tab 1'
      ),
      _react2.default.createElement(
        'div',
        null,
        'tab 2'
      )
    ));
    var instance = component.instance();
    expect(instance.getActiveTabs()).toEqual([0]);
    instance.expandAt(1);
    expect(instance.getActiveTabs()).toEqual([1]);
  });

  it('should not collapse when expanding another tab and multiexpand', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false, multiExpand: true },
      _react2.default.createElement(
        'div',
        null,
        'tab 1'
      ),
      _react2.default.createElement(
        'div',
        null,
        'tab 2'
      )
    ));
    var instance = component.instance();
    expect(instance.getActiveTabs()).toEqual([0]);
    instance.expandAt(1);
    expect(instance.getActiveTabs()).toEqual([0, 1]);
  });

  it('should collapse all when collapsible', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { collapsible: true, multiExpand: true, transition: false },
      _react2.default.createElement(
        'div',
        null,
        'tab 1'
      ),
      _react2.default.createElement(
        'div',
        null,
        'tab 2'
      )
    ));
    var instance = component.instance();
    instance.expandAll();
    expect(instance.getActiveTabs()).toEqual([0, 1]);
    instance.collapseAll();
    expect(instance.getActiveTabs()).toEqual([]);
  });

  it('should not collapse all when not collapsible', function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { multiExpand: true, transition: false },
      _react2.default.createElement(
        'div',
        null,
        'tab 1'
      ),
      _react2.default.createElement(
        'div',
        null,
        'tab 2'
      )
    ));
    var instance = component.instance();
    instance.expandAll();
    expect(instance.getActiveTabs()).toEqual([0, 1]);
    instance.collapseAll();
    //first tab should collapse, but the second should remain uncollapsed
    expect(instance.getActiveTabs()).toEqual([1]);
  });
});