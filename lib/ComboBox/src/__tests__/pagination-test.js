'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('pagination', function () {
  it('calls loadNextPage with corret params', function () {
    var loadNextPage = sinon.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { loadNextPage: loadNextPage, skip: 0, limit: 20 }));

    wrapper.instance().loadNextpage();
    expect(loadNextPage.called).to.be.true;
    expect(loadNextPage.args[0][0]).to.deep.equal({
      skip: 20,
      limit: 20
    });
  });
  it('loadNextPage appends the array returned to datasource', function () {
    var initialData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    var nextPageData = [{ id: 4 }, { id: 5 }, { id: 6 }];
    var finalData = [].concat(initialData, nextPageData);

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { loadNextPage: function loadNextPage() {
        return nextPageData;
      }, dataSource: initialData }));
    expect(wrapper.instance().getData()).to.deep.equal(initialData);
    wrapper.instance().loadNextpage();
    expect(wrapper.instance().getData()).to.deep.equal(finalData);
  });
  it('loadNextPage appends promise rezolve to dataSource', function (done) {
    var clock = sinon.useFakeTimers();
    var initialData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    var nextPageData = [{ id: 4 }, { id: 5 }, { id: 6 }];
    var finalData = [].concat(initialData, nextPageData);

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
      loadNextPage: function loadNextPage() {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(nextPageData);
          }, 300);
        });
      },
      dataSource: initialData
    }));
    expect(wrapper.instance().getData()).to.deep.equal(initialData);
    wrapper.instance().loadNextpage();
    expect(wrapper.instance().getData()).to.deep.equal(initialData);
    clock.tick(400);
    clock.restore();

    setTimeout(function () {
      expect(wrapper.instance().getData()).to.deep.equal(finalData);
      done();
    }, 0);
  });
});