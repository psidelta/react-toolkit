'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion Layout', function () {
  var component = void 0,
      instance = void 0;
  beforeEach(function () {
    component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      { transition: false },
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
        { tabTitle: 'tab3' },
        'Tab 3'
      )
    ));

    instance = component.instance();
  });

  it('should only have on tab expanded in single expand mode', function () {
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([1]);
  });

  it('should have multiple tabs expanded in multi expand mode', function () {
    component.setProps({ multiExpand: true });
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([0, 1]);
  });

  it('should handle switch between multi to single expand', function () {
    component.setProps({ multiExpand: true });
    component.find('[data-test="tab2"]').simulate('click');
    component.setProps({ multiExpand: false });
    var activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).to.have.property('length', 1);
  });

  it('should not collapse last open tab in collapsible=false', function () {
    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([0]);
  });

  it('should collapse last open tab in collapsible=true', function () {
    component.setProps({ collapsible: true });
    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([]);
  });

  it('should support horizontal interaction', function () {
    component.setProps({ horizontal: true });
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([1]);

    component.setProps({ collapsible: true });
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([]);

    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).to.deep.equal([0]);
  });
});