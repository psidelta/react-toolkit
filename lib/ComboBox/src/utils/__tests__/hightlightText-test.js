'use strict';

var _hightlightText = require('../hightlightText');

var _hightlightText2 = _interopRequireDefault(_hightlightText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('hightlightText', function () {
  it('contains - returns a structure marking the matched text', function () {
    var test = 'hello world';
    var expected = ['hel', { match: 'lo w' }, 'orld'];
    expect((0, _hightlightText2.default)({
      queryText: 'lo w',
      text: test,
      mode: 'contains'
    })).toEqual(expected);
  });
  it('starts width - returns a structure marking the matched text', function () {
    var text = 'hello world';
    var expected = [{ match: 'hell' }, 'o world'];

    var test = (0, _hightlightText2.default)({
      text: text,
      queryText: 'hell',
      mode: 'startsWidth'
    });
    expect(test).toEqual(expected);
  });
});