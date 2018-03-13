import getClassNames from '../../utils/get-class-names';

describe('components class names logic', () => {
  it('should pass down props className', () => {
    const classString = getClassNames({ className: 'test' }, {});
    expect(classString).toContain('test');
  });

  it('should adds orientation modifier', () => {
    let props, classString, rangeClassString;

    props = {
      orientation: 'horizontal'
    };

    classString = getClassNames(props, {});
    expect(classString).toContain('horizontal-orientation');

    props = {
      orientation: 'vertical'
    };

    classString = getClassNames(props, {});
    expect(classString).toContain('vertical-orientation');
  });
});
