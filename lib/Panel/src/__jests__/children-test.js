'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('children', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  it('should render jsx', function () {
    wrapper.setProps({ children: _react2.default.createElement('div', { id: 'childrenId' }) });
    expect(wrapper.find('#childrenId')).toHaveLength(1);
  });

  it('should be called when it function with props and state', function () {
    var children = jest.fn(function () {
      return _react2.default.createElement('div', { id: 'childrenFunctionId' });
    });
    wrapper.setProps({ id: 'propsId' });
    wrapper.setState({ stateId: 'stateId' });
    wrapper.setProps({ children: children });

    expect(children).toHaveBeenCalled();
    expect(wrapper.find('#childrenFunctionId')).toHaveLength(1);

    expect(children.mock.calls[0][0].id).toEqual('propsId');
    expect(children.mock.calls[0][1].stateId).toEqual('stateId');
  });
});