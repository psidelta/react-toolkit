'use strict';

var _getPositionsRelativeToBottomRight = require('../getPositionsRelativeToBottomRight');

var _getPositionsRelativeToBottomRight2 = _interopRequireDefault(_getPositionsRelativeToBottomRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractPosition = function extractPosition(_ref) {
  var top = _ref.top,
      left = _ref.left;
  return { top: top, left: left };
};

describe('getPositionsRelativeToBottomRight', function () {
  it('stacks boxes in correct position when vertical dominaint', function () {
    /**
    +------------------------>
    | +----+ +----+ +----+
    | | 1  | |    | |    |
    | +----+ |    | | 4  |
    | +----+ |    | |    |
    | |    | | 3  | +----+
    | | 2  | |    |
    | +----+ |    |
    |        |    |
    |        +----+
    |
    v 60
     */

    var expected = [{ top: 0, left: 0 }, { top: 20, left: 0 }, { top: 0, left: 20 }, { top: 0, left: 50 }];

    var input = [{ height: 20, width: 10 }, { height: 30, width: 20 }, { height: 40, width: 30 }, { height: 25, width: 25 }];

    var test = (0, _getPositionsRelativeToBottomRight2.default)({
      boxes: input,
      height: 60,
      width: 100, // doesn't count
      isVertical: true
    }).map(extractPosition);

    expect(expected).to.deep.equal(test);
  });
  it('stacks boxes in correct position when horizontal dominaint', function () {
    /**
    +------------------------>
    | +----+ +----+  +----+ 60
    | | 1  | |    |  |    |
    | +----+ | 2  |  |    |
    |        +----+  |    |
    |                | 3  |
    |                |    |
    |                |    |
    |                |    |
    | +----+         +----+
    | |    |
    v | 4  |
      |    |
      +----+
       */

    var expected = [{ top: 0, left: 0 }, { top: 0, left: 10 }, { top: 0, left: 30 }, { top: 40, left: 0 }];

    var input = [{ height: 20, width: 10 }, { height: 30, width: 20 }, { height: 40, width: 30 }, { height: 25, width: 25 }];

    var test = (0, _getPositionsRelativeToBottomRight2.default)({
      boxes: input,
      height: 60, // doesn't count
      width: 60,
      isVertical: false
    }).map(extractPosition);

    expect(expected).to.deep.equal(test);
  });

  it('stacks correct when stacking is only vertical', function () {
    var input = [{ height: 20, width: 10 }, { height: 30, width: 20 }, { height: 40, width: 30 }, { height: 25, width: 25 }];

    var expected = [{ top: 0, left: 0 }, { top: 20, left: 0 }, { top: 50, left: 0 }, { top: 90, left: 0 }];

    var test = (0, _getPositionsRelativeToBottomRight2.default)({
      boxes: input,
      height: 60, // doesn't count
      width: 60,
      isVertical: true,
      stackingWrap: false
    }).map(extractPosition);

    expect(expected).to.deep.equal(test);
  });

  it('stacks correct when stacking is only horizontal', function () {
    var input = [{ height: 20, width: 10 }, { height: 30, width: 20 }, { height: 40, width: 30 }, { height: 25, width: 25 }];

    var expected = [{ top: 0, left: 0 }, { top: 0, left: 10 }, { top: 0, left: 30 }, { top: 0, left: 60 }];

    var test = (0, _getPositionsRelativeToBottomRight2.default)({
      boxes: input,
      height: 60, // doesn't count
      width: 60,
      stacking: ['horizontal'],
      stackingWrap: false
    }).map(extractPosition);

    expect(expected).to.deep.equal(test);
  });
});