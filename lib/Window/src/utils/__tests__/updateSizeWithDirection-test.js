'use strict';

var _updateSizeWithDirection = require('../updateSizeWithDirection');

var _updateSizeWithDirection2 = _interopRequireDefault(_updateSizeWithDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('updateSizeWithDirection', function () {
  it('updates corect for direction top', function () {
    expect((0, _updateSizeWithDirection2.default)({
      position: { top: 0, left: 0 },
      size: { width: 10, height: 10 },
      direction: 'up',
      step: 10
    })).to.deep.equal({
      size: { height: 0, width: 10 },
      position: { top: 0, left: 0 }
    });
    expect((0, _updateSizeWithDirection2.default)({
      position: { bottom: 0, left: 0 },
      size: { width: 10, height: 10 },
      direction: 'up',
      step: 10
    })).to.deep.equal({
      size: { height: 0, width: 10 },
      position: { bottom: 10, left: 0 }
    });
  });
  it('updates corect for direction down', function () {
    expect((0, _updateSizeWithDirection2.default)({
      position: { top: 0, left: 0 },
      size: { width: 10, height: 10 },
      direction: 'down',
      step: 10
    })).to.deep.equal({
      size: { height: 20, width: 10 },
      position: { top: 0, left: 0 }
    });
    expect((0, _updateSizeWithDirection2.default)({
      position: { bottom: 0, left: 0 },
      size: { width: 10, height: 10 },
      direction: 'down',
      step: 10
    })).to.deep.equal({
      size: { height: 20, width: 10 },
      position: { bottom: -10, left: 0 }
    });
  });
  it('updates corect for direction left', function () {
    expect((0, _updateSizeWithDirection2.default)({
      position: { top: 0, left: 0 },
      size: { width: 10, height: 10 },
      direction: 'left',
      step: 10
    })).to.deep.equal({
      size: { height: 10, width: 0 },
      position: { top: 0, left: 0 }
    });
    expect((0, _updateSizeWithDirection2.default)({
      position: { bottom: 0, right: 0 },
      size: { width: 10, height: 10 },
      direction: 'left',
      step: 10
    })).to.deep.equal({
      size: { height: 10, width: 0 },
      position: { bottom: 0, right: 10 }
    });
  });
  it('updates corect for direction right', function () {
    expect((0, _updateSizeWithDirection2.default)({
      position: { top: 0, left: 0 },
      size: { width: 10, height: 10 },
      direction: 'right',
      step: 10
    })).to.deep.equal({
      size: { height: 10, width: 20 },
      position: { top: 0, left: 0 }
    });
    expect((0, _updateSizeWithDirection2.default)({
      position: { bottom: 0, right: 0 },
      size: { width: 10, height: 10 },
      direction: 'right',
      step: 10
    })).to.deep.equal({
      size: { height: 10, width: 20 },
      position: { bottom: 0, right: -10 }
    });
  });
});