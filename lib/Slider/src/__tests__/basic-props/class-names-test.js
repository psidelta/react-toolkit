'use strict';

var _getClassNames = require('../../utils/get-class-names');

var _getClassNames2 = _interopRequireDefault(_getClassNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('components class names logic', function () {
  it('should pass down props className', function () {
    var classString = (0, _getClassNames2.default)({ className: 'test' }, {});
    expect(classString).to.contain('test');
  });

  it('should adds orientation modifier', function () {
    var props = void 0,
        classString = void 0,
        rangeClassString = void 0;

    props = {
      orientation: 'horizontal'
    };

    classString = (0, _getClassNames2.default)(props, {});
    expect(classString).to.contain('horizontal-orientation');

    props = {
      orientation: 'vertical'
    };

    classString = (0, _getClassNames2.default)(props, {});
    expect(classString).to.contain('vertical-orientation');
  });
});