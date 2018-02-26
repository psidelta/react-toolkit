import getClassName from '../getClassName';

describe('list getClassName', () => {
  it('adds rootClassName', () => {
    const props = { rootClassName: 'root' };
    const test = getClassName({ props });
    expect(test).to.equal('root root--empty');
  });
  it('adds className', () => {
    const props = { className: 'list', rootClassName: 'root' };
    const test = getClassName({ props });
    expect(test).to.equal('root list root--empty');
  });
  it('adds list position', () => {
    const props = { listPosition: 'top', rootClassName: 'root' };
    const test = getClassName({ props });
    expect(test).to.equal('root root--top root--empty');
  });
  it('adds loading', () => {
    const props = { loading: true, rootClassName: 'root' };
    const test = getClassName({ props });
    expect(test).to.equal('root root--loading root--empty');
  });
  it('empty', () => {
    const props = { rootClassName: 'root' };
    const test = getClassName({ props });
    expect(test).to.equal('root root--empty');
    const props2 = { rootClassName: 'root', data: { length: 30 } };
    const test2 = getClassName({ props: props2 });
    expect(test2).to.equal('root');
  });
});
