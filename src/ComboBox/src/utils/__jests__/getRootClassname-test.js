import getRootClassName from '../getRootClassName';

describe('getRootClassName', () => {
  it('adds correct classnames', () => {
    const props = {
      rootClassName: 'root',
      className: 'hello'
    };

    expect(getRootClassName({ props })).toContain('root hello');
  });
  it('adds rtl', () => {
    const props = {
      rtl: true,
      rootClassName: 'root'
    };

    expect(getRootClassName({ props })).toContain('root root--rtl');
  });
});
