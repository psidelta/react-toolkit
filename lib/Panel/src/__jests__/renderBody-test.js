'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName;
var bodyClassName = '.' + rootClassName + '__body';

describe('renderBody', function () {
  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  it('should be caled with domProps and props', function () {
    var renderBody = jest.fn(function () {
      return _react2.default.createElement('div', { id: 'body' });
    });
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, { renderBody: renderBody }));

    expect(renderBody).toHaveBeenCalledTimes(1);
    expect(wrapper.find('#body')).toHaveLength(1);
  });

  it('should render what it returns', function () {
    var renderBody = function renderBody() {
      return _react2.default.createElement('div', { id: 'customId' });
    };
    wrapper.setProps({ renderBody: renderBody });

    expect(wrapper.find('#customId')).toHaveLength(1);
    expect(wrapper.find(bodyClassName)).toHaveLength(0);
  });

  it('should render default body with mutated domProps', function () {
    var renderBody = function renderBody(domProps) {
      domProps.id = 'mutatedId';
    };
    wrapper.setProps({ renderBody: renderBody });
    expect(wrapper.find('#mutatedId')).toHaveLength(1);
  });
});