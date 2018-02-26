import assign from '../assign';

describe('assign', () => {
  it('extends first object by mutating it and returning a reference to it', () => {
    const browserAssign = Object.assgin;
    Object.assign = null;

    const a = { a: 2, b: 3 };
    const b = { a: 3, c: 4 };

    const test = assign(a, b);
    const expected = { a: 3, b: 3, c: 4 };
    expect(a).to.equal(test);
    expect(test).to.deep.equal(expected);

    Object.assign = browserAssign;
  });
  it('throws an error when first argument is null or undefined', () => {
    expect(() => assign(null, {})).to.throw(TypeError);
    expect(() => assign(undefined, {})).to.throw(TypeError);
  });
  it('extends multiple objects, of which can be null/undefined', () => {
    const target = { a: 2 };
    const input = [target, null, undefined, { b: 3, c: null }];
    const expected = { a: 2, b: 3, c: null };
    const test = assign(...input);
    expect(test).to.deep.equal(expected);
    expect(target).to.equal(target);
  });
});
