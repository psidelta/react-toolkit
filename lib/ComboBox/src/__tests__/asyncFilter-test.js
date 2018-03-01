'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

xdescribe('loadAsyncDataSource', function () {
  it('it is called list expands', function () {
    var loadAsyncDataSource = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
      defaultExpanded: false,
      loadAsyncDataSource: loadAsyncDataSource
    }));
    wrapper.instance().expand();
    expect(loadAsyncDataSource.called).to.be.true;
  });
  it('is called when length of text is more than filterMinLength', function () {
    var loadAsyncDataSource = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
      defaultText: '',
      filterMinLength: 3,
      loadAsyncDataSource: loadAsyncDataSource
    }));
    expect(loadAsyncDataSource.called).to.be.false;
    wrapper.instance().setText('12');
    expect(loadAsyncDataSource.called).to.be.false;
    wrapper.instance().setText('123');
    expect(loadAsyncDataSource.called).to.be.true;
  });
  it('replaces datasource when called', function () {
    var data = [{ id: 'hello world' }];
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { loadAsyncDataSource: function loadAsyncDataSource() {
        return data;
      } }));
    expect(wrapper.instance().getData()).to.be.falsey;
    wrapper.instance().loadAsyncDataSource({ action: 'fake' });
    expect(wrapper.instance().getData()).to.equal(data);
  });
});