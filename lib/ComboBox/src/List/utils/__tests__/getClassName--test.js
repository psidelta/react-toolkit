'use strict';

var _getClassName = require('../getClassName');

var _getClassName2 = _interopRequireDefault(_getClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('list getClassName', function () {
  it('adds rootClassName', function () {
    var props = { rootClassName: 'root' };
    var test = (0, _getClassName2.default)({ props: props });
    expect(test).to.equal('root root--empty');
  });
  it('adds className', function () {
    var props = { className: 'list', rootClassName: 'root' };
    var test = (0, _getClassName2.default)({ props: props });
    expect(test).to.equal('root list root--empty');
  });
  it('adds list position', function () {
    var props = { listPosition: 'top', rootClassName: 'root' };
    var test = (0, _getClassName2.default)({ props: props });
    expect(test).to.equal('root root--top root--empty');
  });
  it('adds loading', function () {
    var props = { loading: true, rootClassName: 'root' };
    var test = (0, _getClassName2.default)({ props: props });
    expect(test).to.equal('root root--loading root--empty');
  });
  it('empty', function () {
    var props = { rootClassName: 'root' };
    var test = (0, _getClassName2.default)({ props: props });
    expect(test).to.equal('root root--empty');
    var props2 = { rootClassName: 'root', data: { length: 30 } };
    var test2 = (0, _getClassName2.default)({ props: props2 });
    expect(test2).to.equal('root');
  });
});