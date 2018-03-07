'use strict';

var _matchesSelector = require('../matchesSelector');

var _matchesSelector2 = _interopRequireDefault(_matchesSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('matchesSelector', function () {
  it('returns true when it node matches a selector', function () {
    var fixture = '<div id="fixture1">\n        <div id="target1" class="tooltip">\n          target 1\n        </div>\n        <div id="target2" class="tooltip"> target 2 </div>\n        <div id="target3"> target 3 </div>\n        <div id="tooltip">\n          Hello world from tooltip\n        </div>\n      </div>\n    ';
    document.body.insertAdjacentHTML('afterbegin', fixture);

    var target = document.getElementById('target2');
    expect((0, _matchesSelector2.default)(target, '.tooltip')).toBe(true);
    expect((0, _matchesSelector2.default)(target, '.tooltip2')).toBe(false);

    document.body.removeChild(document.getElementById('fixture1'));
  });
});