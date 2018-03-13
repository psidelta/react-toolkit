'use strict';

var _getRootClassName = require('../getRootClassName');

var _getRootClassName2 = _interopRequireDefault(_getRootClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getRootClassName', function () {
  it('adds correct classnames', function () {
    var props = {
      rootClassName: 'root',
      className: 'hello'
    };

    expect((0, _getRootClassName2.default)({ props: props })).to.equal('root hello');
  });
  it('adds rtl', function () {
    var props = {
      rtl: true,
      rootClassName: 'root'
    };

    expect((0, _getRootClassName2.default)({ props: props })).to.equal('root root--rtl');
  });
});