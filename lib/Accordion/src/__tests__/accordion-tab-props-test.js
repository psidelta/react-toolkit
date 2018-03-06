'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion tab style props', function () {
  var component = void 0,
      instance = void 0,
      CUSTOM_CLASS_NAME = 'CUSTOM_CLASS_NAME',
      CUSTOM_CLASS_NAME_2 = 'CUSTOM_CLASS_NAME_2',
      tabContentComponents = void 0,
      tabStyle = { padding: 20 },
      extraStyleProps = { fontSize: 13 };

  beforeEach(function () {
    component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      {
        transition: false,
        tabStyle: tabStyle,
        tabClassName: CUSTOM_CLASS_NAME
      },
      _react2.default.createElement(
        'div',
        { 'data-test': 'tab-content-1', tabTitle: 'Tab 1' },
        'Tab 1'
      ),
      _react2.default.createElement(
        'div',
        { 'data-test': 'tab-content-2', tabTitle: 'Tab 2' },
        'Tab 2'
      ),
      _react2.default.createElement(
        'div',
        {
          tabProps: {
            style: extraStyleProps,
            className: CUSTOM_CLASS_NAME_2
          },
          'data-test': 'tab-content-3',
          tabTitle: 'Tab 3'
        },
        'Tab 3'
      )
    ));

    instance = component.instance();
    tabContentComponents = component.find('ZippyAccordionTabContent');
  });

  describe('tabStyle', function () {
    it('should apply tabStyle to all tabs', function () {
      expect(tabContentComponents.at(0).prop('wrapperStyle')).toEqual(tabStyle);
      expect(tabContentComponents.at(1).prop('wrapperStyle')).toEqual(tabStyle);
      expect(tabContentComponents.at(2).prop('wrapperStyle')).toEqual(_extends({}, tabStyle, extraStyleProps));
    });
  });

  describe('tabClassName', function () {
    it('should add tabClassName to all tabs', function () {
      expect(tabContentComponents.at(0).prop('wrapperClassName')).to.equal(CUSTOM_CLASS_NAME);
      expect(tabContentComponents.at(1).prop('wrapperClassName')).to.equal(CUSTOM_CLASS_NAME);
      expect(tabContentComponents.at(2).prop('wrapperClassName')).to.equal(CUSTOM_CLASS_NAME + ' ' + CUSTOM_CLASS_NAME_2);
    });
  });
});