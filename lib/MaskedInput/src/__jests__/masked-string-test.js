'use strict';

var _maskedString = require('../../src/utils/mask/masked-string');

describe('getMaskedString utils function', function () {
  it('should return value when no mask present', function () {
    var value = 'value';
    var result = (0, _maskedString.getMaskedString)(value);
    expect(result[0]).toEqual(value);
  });

  it('should return mask when no mask definition present', function () {
    var value = 'value';
    var mask = '[abc]';
    var result = (0, _maskedString.getMaskedString)(value, { mask: mask });
    expect(result[0]).toEqual(mask);
  });

  it('should replace all positions that are not filled by value with filler char', function () {
    var value = '';
    var mask = '[aaa]';
    var maskDefinitions = { a: /./ };
    var maskFiller = '_';
    var expectedReplacedChars = mask.replace(/a/g, maskFiller);

    var result = (0, _maskedString.getMaskedString)(value, {
      mask: mask,
      maskDefinitions: maskDefinitions,
      maskFiller: maskFiller
    });
    expect(result[0]).toEqual(expectedReplacedChars);
  });

  it('should match correct value', function () {
    var value = '123';
    var mask = '^[aaa]';
    var maskDefinitions = { a: /./ };
    var maskFiller = '_';

    var result = (0, _maskedString.getMaskedString)(value, {
      mask: mask,
      maskDefinitions: maskDefinitions,
      maskFiller: maskFiller
    });
    expect(result[0]).toEqual('^[' + value + ']');
  });

  it('should match partial value', function () {
    var value = '12';
    var mask = 'xy[aaa]';
    var maskDefinitions = { a: /./ };
    var maskFiller = '_';
    var expectedReplacedChars = 'xy[12_]';

    var result = (0, _maskedString.getMaskedString)(value, {
      mask: mask,
      maskDefinitions: maskDefinitions,
      maskFiller: maskFiller
    });
    expect(result[0]).toEqual(expectedReplacedChars);
  });

  it('should stop accepting values at first incorect value', function () {
    var value = '1ca';
    var mask = '^$[999]';
    var maskDefinitions = { '9': /[0-9]/ };
    var maskFiller = '_';
    var expectedReplacedChars = '^$[1__]';

    var result = (0, _maskedString.getMaskedString)(value, {
      mask: mask,
      maskDefinitions: maskDefinitions,
      maskFiller: maskFiller
    });
    expect(result[0]).toEqual(expectedReplacedChars);
    expect(result[1]).toEqual(1);
    expect(result[2]).toEqual(4);
  });

  it('should work with fully matched mask', function () {
    var value = ' 333';
    var mask = '#hhh';
    var maskDefinitions = { '#': /./, h: /./ };
    var maskFiller = '_';
    var expectedReplacedChars = ' 333';
    var result = (0, _maskedString.getMaskedString)(value, {
      mask: mask,
      maskDefinitions: maskDefinitions,
      maskFiller: maskFiller
    });
    expect(result[0]).toEqual(expectedReplacedChars);
  });
});

describe('getPositionInMaskedStringBasedOnValue utils function', function () {
  it('should return intended caret position when value valid and less than mask available chars', function () {
    var value = '12';
    var mask = '^$[9-9x-9]';
    var maskDefinitions = { '9': /[0-9]/ };
    var expectedPosition = 8;

    var result = (0, _maskedString.getPositionInMaskedStringBasedOnValue)(value, {
      mask: mask,
      maskDefinitions: maskDefinitions
    });
    expect(result).toEqual(expectedPosition);
  });

  it('should return intended caret position when value valid and fills mask available chars', function () {
    var value = '123';
    var mask = '^$[9-9x-9]';
    var maskDefinitions = { '9': /[0-9]/ };
    var expectedPosition = 10;

    var result = (0, _maskedString.getPositionInMaskedStringBasedOnValue)(value, {
      mask: mask,
      maskDefinitions: maskDefinitions
    });
    expect(result).toEqual(expectedPosition);
  });

  it('should return intended caret position when value is null and mask has fillers at 0', function () {
    var value = '';
    var mask = '^$[9-9x-9]';
    var maskDefinitions = { '9': /[0-9]/ };
    var expectedPosition = 3;

    var result = (0, _maskedString.getPositionInMaskedStringBasedOnValue)(value, {
      mask: mask,
      maskDefinitions: maskDefinitions
    });
    expect(result).toEqual(expectedPosition);
  });

  it('should return intended caret position when value is null and mask has no fillers at 0', function () {
    var value = '';
    var mask = '9-9x-9]';
    var maskDefinitions = { '9': /[0-9]/ };
    var expectedPosition = 0;

    var result = (0, _maskedString.getPositionInMaskedStringBasedOnValue)(value, {
      mask: mask,
      maskDefinitions: maskDefinitions
    });
    expect(result).toEqual(expectedPosition);
  });
});

describe('getValueSelectionRangeFromMaskedSelectionRange', function () {
  it('should return selection within value', function () {
    var value = '13';
    var mask = '9-9x-9]';
    var maskDefinitions = { '9': /[0-9]/ };

    var selectionRange = (0, _maskedString.getValueSelectionRangeFromMaskedSelectionRange)(value, {
      maskDefinitions: maskDefinitions,
      mask: mask,
      start: 1,
      end: 5
    });

    expect(selectionRange).toEqual([1, 2]);
  });

  it('should return selection that is 0 based and not as large as value', function () {
    var value = '13';
    var mask = 'xyz9-9x-9]';
    var maskDefinitions = { '9': /[0-9]/ };

    var selectionRange = (0, _maskedString.getValueSelectionRangeFromMaskedSelectionRange)(value, {
      maskDefinitions: maskDefinitions,
      mask: mask,
      start: 0,
      end: 6
    });

    expect(selectionRange).toEqual([0, 2]);
  });

  it('should return selection that is no 0 based and is larger than value', function () {
    var value = '13';
    var mask = '9-9x-9]';
    var maskDefinitions = { '9': /[0-9]/ };

    var selectionRange = (0, _maskedString.getValueSelectionRangeFromMaskedSelectionRange)(value, {
      maskDefinitions: maskDefinitions,
      mask: mask,
      start: 1,
      end: 6
    });

    expect(selectionRange).toEqual([1, 2]);
  });

  it('should return selection that is larger than value', function () {
    var value = '133';
    var mask = '9-9x-9]';
    var maskDefinitions = { '9': /[0-9]/ };

    var selectionRange = (0, _maskedString.getValueSelectionRangeFromMaskedSelectionRange)(value, {
      maskDefinitions: maskDefinitions,
      mask: mask,
      start: 0,
      end: 6
    });

    expect(selectionRange).toEqual([0, 3]);
  });
});

describe('getNextRealValuePosition utils function', function () {
  var maskDefinitions = {
    a: /[A-Za-z]/,
    '9': /[0-9]/,
    h: /[A-Fa-f0-9]/
  };

  var mask1 = '#(a99)-[#hhhhhh]^x(99)';
  var mask2 = 'a99)-[#hhhhhh]^x(99)';
  var mask3 = 'xx9';
  var mask4 = '9xx';

  it('should correctly determine next position when start = 0', function () {
    var nextPosition1 = (0, _maskedString.getNextRealValuePosition)(0, {
      mask: mask1,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition1).toEqual(2);

    var nextPosition2 = (0, _maskedString.getNextRealValuePosition)(0, {
      mask: mask2,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition2).toEqual(1);

    var nextPosition3 = (0, _maskedString.getNextRealValuePosition)(0, {
      mask: mask3,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition3).toEqual(2);
  });

  it('should correctly determine next position when start = last el', function () {
    var nextPosition1 = (0, _maskedString.getNextRealValuePosition)(mask1.length - 1, {
      mask: mask1,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition1).toEqual(mask1.length);

    var nextPosition3 = (0, _maskedString.getNextRealValuePosition)(mask3.length - 1, {
      mask: mask3,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition3).toEqual(mask3.length);
  });

  it('sould correctly determine next position when start is somewhere in mask', function () {
    var nextPosition1 = (0, _maskedString.getNextRealValuePosition)(5, {
      mask: mask1,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition1).toEqual(9);

    var nextPosition2 = (0, _maskedString.getNextRealValuePosition)(19, {
      mask: mask2,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition2).toEqual(20);

    var nextPosition3 = (0, _maskedString.getNextRealValuePosition)(1, {
      mask: mask3,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition3).toEqual(2);

    var nextPosition4 = (0, _maskedString.getNextRealValuePosition)(2, {
      mask: mask4,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition4).toEqual(3);
  });
});

describe('getPreviousRealValuePosition utils function', function () {
  var maskDefinitions = {
    a: /[A-Za-z]/,
    '9': /[0-9]/,
    h: /[A-Fa-f0-9]/
  };

  var mask1 = '#(a99)-[#hhhhhh]^x(99)';
  var mask2 = 'a99)-[#hhhhhh]^x(99)';
  var mask3 = 'xx9';
  var mask4 = '9xx';

  it('should correctly determine previous position when start = 0', function () {
    var nextPosition1 = (0, _maskedString.getPreviousRealValuePosition)(0, {
      mask: mask1,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition1).toEqual(0);
  });

  it('should correctly determine previous position when start = last el', function () {
    var nextPosition1 = (0, _maskedString.getPreviousRealValuePosition)(mask1.length, {
      mask: mask1,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition1).toEqual(20);

    var nextPosition3 = (0, _maskedString.getPreviousRealValuePosition)(mask3.length, {
      mask: mask3,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition3).toEqual(2);
  });

  it('sould correctly determine previous position when start is somewhere in mask', function () {
    var nextPosition1 = (0, _maskedString.getPreviousRealValuePosition)(5, {
      mask: mask1,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition1).toEqual(4);

    var nextPosition2 = (0, _maskedString.getPreviousRealValuePosition)(5, {
      mask: mask2,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition2).toEqual(2);

    var nextPosition4 = (0, _maskedString.getPreviousRealValuePosition)(2, {
      mask: mask4,
      maskDefinitions: maskDefinitions
    });
    expect(nextPosition4).toEqual(0);
  });
});