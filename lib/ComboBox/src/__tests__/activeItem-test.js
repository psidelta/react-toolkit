'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('activeItem', function () {
  it('should work controlled and uncontrolled behaviour of active tag', function () {
    var onActiveItemChange = sinon.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { defaultActiveItem: 20, onActiveItemChange: onActiveItemChange }));
    expect(wrapper.instance().getActiveItem()).to.equal(20);
    expect(onActiveItemChange.called).to.be.false;
    wrapper.instance().setActiveItem(30);
    expect(onActiveItemChange.called).to.be.true;
    expect(onActiveItemChange.args[0][0]).to.equal(30);
    expect(wrapper.instance().getActiveItem()).to.equal(30);
    wrapper.setProps({ activeItem: 25 });
    expect(wrapper.instance().getActiveItem()).to.equal(25);
    wrapper.instance().setActiveItem(30);
    expect(wrapper.instance().getActiveItem()).to.equal(25);
  });

  it('ArrowDown it should make first item active if the list is open and there is no active item', function () {
    var dataSource = [{ id: 1, label: 'test1' }, { id: 2, label: 'test2' }, { id: 3, label: 'test3' }];
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataSource, expanded: true, defaultActiveItem: null }));
    wrapper.simulate('keyDown', { key: 'ArrowDown' });
    expect(wrapper.instance().getActiveItem()).to.equal(1);
  });

  it('ArrowUp it should make first item active if the list is open and there is no active item', function () {
    var dataSource = [{ id: 1, label: 'test1' }, { id: 2, label: 'test2' }, { id: 3, label: 'test3' }];
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataSource, expanded: true, defaultActiveItem: null }));
    wrapper.simulate('keyDown', { key: 'ArrowUp' });
    expect(wrapper.instance().getActiveItem()).to.equal(3);
  });

  it('ArrowDown navigates to next item', function () {
    var dataSource = [{ id: 1, label: 'test1' }, { id: 2, label: 'test2' }, { id: 3, label: 'test3' }];
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataSource, expanded: true, defaultActiveItem: 1 }));
    wrapper.simulate('keyDown', { key: 'ArrowDown' });
    expect(wrapper.instance().getActiveItem()).to.equal(2);
  });

  it('ArrowUp navigates to previous item', function () {
    var dataSource = [{ id: 1, label: 'test1' }, { id: 2, label: 'test2' }, { id: 3, label: 'test3' }];
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataSource, expanded: true, defaultActiveItem: 2 }));
    wrapper.simulate('keyDown', { key: 'ArrowUp' });
    expect(wrapper.instance().getActiveItem()).to.equal(1);
  });

  it('highlightFirst selects first item when none is selected', function () {
    var dataSource = [{ id: 1, label: 'test1' }, { id: 2, label: 'test2' }, { id: 3, label: 'test3' }];
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataSource, expanded: false, highlightFirst: false }));
    expect(wrapper.instance().getActiveItem()).to.be.null;
    wrapper.setProps({ expanded: true });
    expect(wrapper.instance().getActiveItem()).to.be.null;
    wrapper.setProps({ expanded: false, highlightFirst: true });
    expect(wrapper.instance().getActiveItem()).to.be.null;
    wrapper.setProps({ expanded: true });
    expect(wrapper.instance().getActiveItem()).to.equal(1);
  });

  it('selects the active item with Entery key press only when the list is expanded', function () {
    var dataSource = [{ id: 1, label: 'test1' }, { id: 2, label: 'test2' }, { id: 3, label: 'test3' }];
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataSource, expanded: false, activeItem: 2 }));
    var instance = wrapper.instance();
    expect(instance.getValue()).to.be.null;
    wrapper.simulate('keyDown', { key: 'Enter' });
    expect(instance.getValue()).to.be.null;
    wrapper.setProps({ expanded: true });
    wrapper.simulate('keyDown', { key: 'Enter' });
    expect(instance.getValue()).to.equal(2);
  });
});