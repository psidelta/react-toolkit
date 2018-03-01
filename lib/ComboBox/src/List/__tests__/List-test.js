'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _List = require('../List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('List', function () {
  it('adds empty text', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_List2.default, { data: [], emptyText: _react2.default.createElement('div', { id: 'emptyText' }) }));

    expect(wrapper.find('#emptyText')).to.have.length(1);
  });
  it('adds loading text', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_List2.default, { loading: true, data: [], loadingText: _react2.default.createElement('div', { id: 'loadingtext' }) }));

    expect(wrapper.find('#loadingtext')).to.have.length(1);
  });

  it('renders what renderHeader returns', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_List2.default, {
      data: [],
      emptyText: _react2.default.createElement('div', { id: 'emptyText' }),
      renderHeader: function renderHeader() {
        return _react2.default.createElement('div', { id: 'customHeader' });
      }
    }));
    expect(wrapper.find('#customHeader')).to.have.length(1);
  });

  it('renders what renderFooter returns', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_List2.default, {
      data: [],
      emptyText: _react2.default.createElement('div', { id: 'emptyText' }),
      renderFooter: function renderFooter() {
        return _react2.default.createElement('div', { id: 'customFooter' });
      }
    }));
    expect(wrapper.find('#customFooter')).to.have.length(1);
  });
});