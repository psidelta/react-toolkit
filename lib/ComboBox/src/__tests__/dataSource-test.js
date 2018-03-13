'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('dataSource', function () {
  describe('is array', function () {
    var dataSource = [{ label: 'hello world' }];
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataSource }));

    it('should have state.loading false', function () {
      expect(wrapper.state('loading')).to.be.false;
    });

    it('should have state.data the original passed array', function () {
      expect(wrapper.state('data')).to.equal(dataSource);
    });
  });

  describe('is promise', function () {
    var data = [{ label: 'promised item' }];

    it('should have loading true', function () {
      var dataPromise = new Promise(function (resolve) {
        setTimeout(function () {
          resolve(data);
        }, 20);
      });
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataPromise }));

      expect(wrapper.state('loading')).to.be.true;
    });

    it('should have loading false and data after 50ms', function (done) {
      var dataPromise = new Promise(function (resolve) {
        setTimeout(function () {
          resolve(data);
        }, 100);
      });
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataPromise }));

      setTimeout(function () {
        expect(wrapper.state('loading')).to.be.false;
        expect(wrapper.state('data')).to.equal(data);
        done();
      }, 110);
    });
  });

  describe('is a function', function () {
    var data = [{ label: 'function label' }];
    var dataFunction = function dataFunction() {
      return data;
    };
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataFunction }));

    it('should have loading false', function () {
      expect(wrapper.state('loading')).to.be.false;
    });

    it('should have state.data the original passed array', function () {
      expect(wrapper.state('data')).to.equal(data);
    });
  });

  describe('datasource load event', function () {
    it('should call event when promise rezolves', function (done) {
      var onDataSourceLoad = sinon.spy();
      var data = [{ label: 'promised item' }];
      var dataPromise = new Promise(function (resolve) {
        setTimeout(function () {
          resolve(data);
        }, 50);
      });
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { onDataSourceLoad: onDataSourceLoad, dataSource: dataPromise }));
      expect(onDataSourceLoad.called).to.be.false;
      setTimeout(function () {
        expect(onDataSourceLoad.called).to.be.true;
        done();
      }, 50);
    });
  });

  it('should update state.data when dataSource changes', function () {
    var dataSource = [{ label: 'hello world' }];
    var dataSource2 = [{ label: 'hello world2' }];
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { dataSource: dataSource }));

    expect(wrapper.state('data')).to.equal(dataSource);
    wrapper.setProps({ dataSource: dataSource2 });
    expect(wrapper.state('data')).to.equal(dataSource2);
  });
});