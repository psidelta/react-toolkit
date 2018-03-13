import getClassName from '../getClassName';

describe('list getClassName', () => {
  it('adds rootClassName', () => {
    const props = { rootClassName: 'root' };
    const test = getClassName({ props });
<<<<<<< HEAD
    expect(test).toEqual('root root--empty');
=======
    expect(test).to.equal('root root--empty');
>>>>>>> dev
  });
  it('adds className', () => {
    const props = { className: 'list', rootClassName: 'root' };
    const test = getClassName({ props });
<<<<<<< HEAD
    expect(test).toEqual('root list root--empty');
=======
    expect(test).to.equal('root list root--empty');
>>>>>>> dev
  });
  it('adds list position', () => {
    const props = { listPosition: 'top', rootClassName: 'root' };
    const test = getClassName({ props });
<<<<<<< HEAD
    expect(test).toEqual('root root--top root--empty');
=======
    expect(test).to.equal('root root--top root--empty');
>>>>>>> dev
  });
  it('adds loading', () => {
    const props = { loading: true, rootClassName: 'root' };
    const test = getClassName({ props });
<<<<<<< HEAD
    expect(test).toEqual('root root--loading root--empty');
=======
    expect(test).to.equal('root root--loading root--empty');
>>>>>>> dev
  });
  it('empty', () => {
    const props = { rootClassName: 'root' };
    const test = getClassName({ props });
<<<<<<< HEAD
    expect(test).toEqual('root root--empty');
    const props2 = { rootClassName: 'root', data: { length: 30 } };
    const test2 = getClassName({ props: props2 });
    expect(test2).toEqual('root');
=======
    expect(test).to.equal('root root--empty');
    const props2 = { rootClassName: 'root', data: { length: 30 } };
    const test2 = getClassName({ props: props2 });
    expect(test2).to.equal('root');
>>>>>>> dev
  });
});
