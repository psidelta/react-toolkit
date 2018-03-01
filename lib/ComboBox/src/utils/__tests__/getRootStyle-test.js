'use strict';

var _getRootStyle = require('../getRootStyle');

var _getRootStyle2 = _interopRequireDefault(_getRootStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getRootStyle', function () {
  it('applies the correct style', function () {
    var props = {
      style: {
        color: 'red'
      }
    };
    expect((0, _getRootStyle2.default)({ props: props }).color).to.equal('red');
  });
});