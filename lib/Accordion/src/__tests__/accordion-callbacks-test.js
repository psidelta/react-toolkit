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
    onActivateSpy = sinon.spy();
    tab1OnExpandSpy = sinon.spy();
    tab1OnCollapseSpy = sinon.spy();
    tab2OnExpandSpy = sinon.spy();
    onExpandSpy = sinon.spy();
    onCollapseSpy = sinon.spy();

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
    expect(onActivateSpy.callCount, 'on mount should not call onActivate').to.equal(0);
    instance.expandAt(1);
    expect(onActivateSpy.callCount, 'after expandAt should be called once').to.equal(1);
    expect(onActivateSpy).to.have.been.calledWith(1);
    instance.expandAt(0);
    expect(onActivateSpy).to.have.been.calledWith(0);
  });

  it('should call onActivate with array on expand/collapse', function () {
    component.setProps({ multiExpand: true });
    instance.expandAt(1);
    expect(onActivateSpy).to.have.been.calledWith([0, 1]);
  });

  it('should call individual callbacks for each tab as well as accordion callbacks', function () {
    instance.expandAt(1);
    expect(onExpandSpy, 'onExpandSpy').to.have.been.calledOnce;
    expect(onExpandSpy).to.have.been.calledWith(1);
    expect(onCollapseSpy, 'onCollapseSpy').to.have.been.calledOnce;
    expect(onCollapseSpy).to.have.been.calledWith(0);

    expect(tab1OnCollapseSpy).to.have.been.calledOnce;
    expect(tab2OnExpandSpy).to.have.been.calledOnce;

    instance.expandAt(0);
    expect(onExpandSpy).to.have.been.calledWith(0);
    expect(onCollapseSpy).to.have.been.calledWith(1);
    expect(tab1OnExpandSpy).to.have.been.calledOnce;
  });

  it('should recalculate tab titles onResize', function () {
    var tabTitles = instance.tabTitles;
    var tabTitle1 = tabTitles[0];
    var tabTitle2 = tabTitles[1];
    var tabTitle3 = tabTitles[2];

    var stub1 = sinon.stub(tabTitle1, 'onResize');
    var stub2 = sinon.stub(tabTitle2, 'onResize');
    var stub3 = sinon.stub(tabTitle3, 'onResize');

    instance.onResize();

    expect(stub1).to.have.been.calledOnce;
    expect(stub2).to.have.been.calledOnce;
    expect(stub3).to.have.been.calledOnce;

    stub1.restore();
    stub2.restore();
    stub3.restore();
  });
});