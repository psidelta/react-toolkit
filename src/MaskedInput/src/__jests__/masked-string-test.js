import {
  getMaskedString,
  getPositionInMaskedStringBasedOnValue,
  getValueSelectionRangeFromMaskedSelectionRange,
  getNextRealValuePosition,
  getPreviousRealValuePosition
} from '../../src/utils/mask/masked-string';

describe('getMaskedString utils function', () => {
  it('should return value when no mask present', () => {
    const value = 'value';
    const result = getMaskedString(value);
    expect(result[0]).toEqual(value);
  });

  it('should return mask when no mask definition present', () => {
    const value = 'value';
    const mask = '[abc]';
    const result = getMaskedString(value, { mask });
    expect(result[0]).toEqual(mask);
  });

  it('should replace all positions that are not filled by value with filler char', () => {
    const value = '';
    const mask = '[aaa]';
    const maskDefinitions = { a: /./ };
    const maskFiller = '_';
    const expectedReplacedChars = mask.replace(/a/g, maskFiller);

    const result = getMaskedString(value, {
      mask,
      maskDefinitions,
      maskFiller
    });
    expect(result[0]).toEqual(expectedReplacedChars);
  });

  it('should match correct value', () => {
    const value = '123';
    const mask = '^[aaa]';
    const maskDefinitions = { a: /./ };
    const maskFiller = '_';

    const result = getMaskedString(value, {
      mask,
      maskDefinitions,
      maskFiller
    });
    expect(result[0]).toEqual(`^[${value}]`);
  });

  it('should match partial value', () => {
    const value = '12';
    const mask = 'xy[aaa]';
    const maskDefinitions = { a: /./ };
    const maskFiller = '_';
    const expectedReplacedChars = 'xy[12_]';

    const result = getMaskedString(value, {
      mask,
      maskDefinitions,
      maskFiller
    });
    expect(result[0]).toEqual(expectedReplacedChars);
  });

  it('should stop accepting values at first incorect value', () => {
    const value = '1ca';
    const mask = '^$[999]';
    const maskDefinitions = { '9': /[0-9]/ };
    const maskFiller = '_';
    const expectedReplacedChars = '^$[1__]';

    const result = getMaskedString(value, {
      mask,
      maskDefinitions,
      maskFiller
    });
    expect(result[0]).toEqual(expectedReplacedChars);
    expect(result[1]).toEqual(1);
    expect(result[2]).toEqual(4);
  });

  it('should work with fully matched mask', () => {
    const value = ' 333';
    const mask = '#hhh';
    const maskDefinitions = { '#': /./, h: /./ };
    const maskFiller = '_';
    const expectedReplacedChars = ' 333';
    const result = getMaskedString(value, {
      mask,
      maskDefinitions,
      maskFiller
    });
    expect(result[0]).toEqual(expectedReplacedChars);
  });
});

describe('getPositionInMaskedStringBasedOnValue utils function', () => {
  it('should return intended caret position when value valid and less than mask available chars', () => {
    const value = '12';
    const mask = '^$[9-9x-9]';
    const maskDefinitions = { '9': /[0-9]/ };
    const expectedPosition = 8;

    const result = getPositionInMaskedStringBasedOnValue(value, {
      mask,
      maskDefinitions
    });
    expect(result).toEqual(expectedPosition);
  });

  it('should return intended caret position when value valid and fills mask available chars', () => {
    const value = '123';
    const mask = '^$[9-9x-9]';
    const maskDefinitions = { '9': /[0-9]/ };
    const expectedPosition = 10;

    const result = getPositionInMaskedStringBasedOnValue(value, {
      mask,
      maskDefinitions
    });
    expect(result).toEqual(expectedPosition);
  });

  it('should return intended caret position when value is null and mask has fillers at 0', () => {
    const value = '';
    const mask = '^$[9-9x-9]';
    const maskDefinitions = { '9': /[0-9]/ };
    const expectedPosition = 3;

    const result = getPositionInMaskedStringBasedOnValue(value, {
      mask,
      maskDefinitions
    });
    expect(result).toEqual(expectedPosition);
  });

  it('should return intended caret position when value is null and mask has no fillers at 0', () => {
    const value = '';
    const mask = '9-9x-9]';
    const maskDefinitions = { '9': /[0-9]/ };
    const expectedPosition = 0;

    const result = getPositionInMaskedStringBasedOnValue(value, {
      mask,
      maskDefinitions
    });
    expect(result).toEqual(expectedPosition);
  });
});

describe('getValueSelectionRangeFromMaskedSelectionRange', () => {
  it('should return selection within value', () => {
    const value = '13';
    const mask = '9-9x-9]';
    const maskDefinitions = { '9': /[0-9]/ };

    const selectionRange = getValueSelectionRangeFromMaskedSelectionRange(
      value,
      {
        maskDefinitions,
        mask,
        start: 1,
        end: 5
      }
    );

    expect(selectionRange).toEqual([1, 2]);
  });

  it('should return selection that is 0 based and not as large as value', () => {
    const value = '13';
    const mask = 'xyz9-9x-9]';
    const maskDefinitions = { '9': /[0-9]/ };

    const selectionRange = getValueSelectionRangeFromMaskedSelectionRange(
      value,
      {
        maskDefinitions,
        mask,
        start: 0,
        end: 6
      }
    );

    expect(selectionRange).toEqual([0, 2]);
  });

  it('should return selection that is no 0 based and is larger than value', () => {
    const value = '13';
    const mask = '9-9x-9]';
    const maskDefinitions = { '9': /[0-9]/ };

    const selectionRange = getValueSelectionRangeFromMaskedSelectionRange(
      value,
      {
        maskDefinitions,
        mask,
        start: 1,
        end: 6
      }
    );

    expect(selectionRange).toEqual([1, 2]);
  });

  it('should return selection that is larger than value', () => {
    const value = '133';
    const mask = '9-9x-9]';
    const maskDefinitions = { '9': /[0-9]/ };

    const selectionRange = getValueSelectionRangeFromMaskedSelectionRange(
      value,
      {
        maskDefinitions,
        mask,
        start: 0,
        end: 6
      }
    );

    expect(selectionRange).toEqual([0, 3]);
  });
});

describe('getNextRealValuePosition utils function', () => {
  const maskDefinitions = {
    a: /[A-Za-z]/,
    '9': /[0-9]/,
    h: /[A-Fa-f0-9]/
  };

  const mask1 = '#(a99)-[#hhhhhh]^x(99)';
  const mask2 = 'a99)-[#hhhhhh]^x(99)';
  const mask3 = 'xx9';
  const mask4 = '9xx';

  it('should correctly determine next position when start = 0', () => {
    const nextPosition1 = getNextRealValuePosition(0, {
      mask: mask1,
      maskDefinitions
    });
    expect(nextPosition1).toEqual(2);

    const nextPosition2 = getNextRealValuePosition(0, {
      mask: mask2,
      maskDefinitions
    });
    expect(nextPosition2).toEqual(1);

    const nextPosition3 = getNextRealValuePosition(0, {
      mask: mask3,
      maskDefinitions
    });
    expect(nextPosition3).toEqual(2);
  });

  it('should correctly determine next position when start = last el', () => {
    const nextPosition1 = getNextRealValuePosition(mask1.length - 1, {
      mask: mask1,
      maskDefinitions
    });
    expect(nextPosition1).toEqual(mask1.length);

    const nextPosition3 = getNextRealValuePosition(mask3.length - 1, {
      mask: mask3,
      maskDefinitions
    });
    expect(nextPosition3).toEqual(mask3.length);
  });

  it('sould correctly determine next position when start is somewhere in mask', () => {
    const nextPosition1 = getNextRealValuePosition(5, {
      mask: mask1,
      maskDefinitions
    });
    expect(nextPosition1).toEqual(9);

    const nextPosition2 = getNextRealValuePosition(19, {
      mask: mask2,
      maskDefinitions
    });
    expect(nextPosition2).toEqual(20);

    const nextPosition3 = getNextRealValuePosition(1, {
      mask: mask3,
      maskDefinitions
    });
    expect(nextPosition3).toEqual(2);

    const nextPosition4 = getNextRealValuePosition(2, {
      mask: mask4,
      maskDefinitions
    });
    expect(nextPosition4).toEqual(3);
  });
});

describe('getPreviousRealValuePosition utils function', () => {
  const maskDefinitions = {
    a: /[A-Za-z]/,
    '9': /[0-9]/,
    h: /[A-Fa-f0-9]/
  };

  const mask1 = '#(a99)-[#hhhhhh]^x(99)';
  const mask2 = 'a99)-[#hhhhhh]^x(99)';
  const mask3 = 'xx9';
  const mask4 = '9xx';

  it('should correctly determine previous position when start = 0', () => {
    const nextPosition1 = getPreviousRealValuePosition(0, {
      mask: mask1,
      maskDefinitions
    });
    expect(nextPosition1).toEqual(0);
  });

  it('should correctly determine previous position when start = last el', () => {
    const nextPosition1 = getPreviousRealValuePosition(mask1.length, {
      mask: mask1,
      maskDefinitions
    });
    expect(nextPosition1).toEqual(20);

    const nextPosition3 = getPreviousRealValuePosition(mask3.length, {
      mask: mask3,
      maskDefinitions
    });
    expect(nextPosition3).toEqual(2);
  });

  it('sould correctly determine previous position when start is somewhere in mask', () => {
    const nextPosition1 = getPreviousRealValuePosition(5, {
      mask: mask1,
      maskDefinitions
    });
    expect(nextPosition1).toEqual(4);

    const nextPosition2 = getPreviousRealValuePosition(5, {
      mask: mask2,
      maskDefinitions
    });
    expect(nextPosition2).toEqual(2);

    const nextPosition4 = getPreviousRealValuePosition(2, {
      mask: mask4,
      maskDefinitions
    });
    expect(nextPosition4).toEqual(0);
  });
});
