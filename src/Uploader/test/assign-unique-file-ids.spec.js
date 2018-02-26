import assignFileUniqueIds from '../src/utils/assign-unique-file-ids';

describe('assignFileUniqueIds', () => {
  it('should walk the array of file objects and call UID function', () => {
    const FILES = [{name:'a', size:1}, {name:'b', size:2}];
    const uidFunction = (file)=>(file.name);
    const uidFnSpy = sinon.spy(uidFunction);
    const result = assignFileUniqueIds(FILES, uidFnSpy);

    expect(uidFnSpy).to.have.been.calledTwice;
    expect(uidFnSpy).to.have.been.calledWith(FILES[0]);
    expect(uidFnSpy).to.have.been.calledWith(FILES[1]);

    expect(uidFnSpy.getCall(0)).to.have.returned(result[0].id);
    expect(uidFnSpy.getCall(1)).to.have.returned(result[1].id);
  });

  it('should pass relevant info to uuid function', () => {
    const FILES = [{name:'a', size:1}, {name:'b', size:2}];
    const uidFnSpy = sinon.spy((file)=>(file.name));
    const EXTRA_PARAMS = {
      extraParam1: '1'
    };
    const result = assignFileUniqueIds(FILES, uidFnSpy, EXTRA_PARAMS);

    expect(uidFnSpy).to.have.been.calledTwice;
    expect(uidFnSpy).to.have.been.calledWith(FILES[0], 0, FILES, EXTRA_PARAMS);
    expect(uidFnSpy).to.have.been.calledWith(FILES[1], 1, FILES, EXTRA_PARAMS);
  });
});
