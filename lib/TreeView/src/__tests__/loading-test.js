'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('loading', function () {
  it('should render load mask when loading is true', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { dataSource: [], loading: true }));
    expect(wrapper.text()).to.be.equal('Loading...');
  });
  it('should call renderLoader if loading and render what it returns', function () {
    var renderLoader = sinon.stub();
    renderLoader.returns(_react2.default.createElement('div', { id: 'customLoader' }));
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { renderLoader: renderLoader, dataSource: [], loading: true }));
    expect(renderLoader.called).to.be.true;
    expect(wrapper.find('#customLoader')).to.have.length(1);
  });
});