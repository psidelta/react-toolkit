import acceptsFile from '../src/utils/accepts-file';

const PNG_FILE_MOCK = {
  name: 'test.png',
  type: 'image/png'
};

describe('acceptTypes util function', () => {
  it('should not crash without params', () => {
    const executor = sinon.spy(() => {
      acceptsFile();
    });

    executor();

    expect(executor).to.not.have.thrown;

  });

  describe('string argument', () => {
    it('should validate via extension', () => {
      const validity = acceptsFile(PNG_FILE_MOCK,'.png');
      expect(validity).to.be.ok;
      const rejection = acceptsFile(PNG_FILE_MOCK,'.jpg');
      expect(rejection).to.not.be.ok;
    });
    it('should validate via mine type', () => {
      const validity = acceptsFile(PNG_FILE_MOCK,'image/*');
      expect(validity).to.be.ok;
      const rejection = acceptsFile(PNG_FILE_MOCK,'audio/*');
      expect(rejection).to.not.be.ok;
    });
    it('should validate via comma separated conditions', () => {
      const validity = acceptsFile(PNG_FILE_MOCK,'audio/*, .png');
      expect(validity).to.be.ok;

      const rejection = acceptsFile(PNG_FILE_MOCK,'audio/*, .jpg');
      expect(rejection).to.not.be.ok;
    });
  });

  describe('array of strings argument', () => {
    it('should validate via mine type or extension', () => {
        const validity = acceptsFile(PNG_FILE_MOCK,['image/*', 'audio/*, .png']);
        expect(validity).to.be.ok;
    });
  });

  describe('function argument', () => {
    it('should call validation function', () => {
      const acceptSpy = sinon.spy();
      const validity = acceptsFile(PNG_FILE_MOCK,acceptSpy, [], 1, {});
      expect(acceptSpy).to.have.been.calledOnce;
      expect(acceptSpy).to.have.been.calledWith(PNG_FILE_MOCK, [], 1, {});
    });
    it('should return validate status from function', () => {
      const validity = acceptsFile(PNG_FILE_MOCK,()=>(true));
      expect(validity).to.be.ok;
      const rejection = acceptsFile(PNG_FILE_MOCK,()=>(false));
      expect(rejection).to.not.be.ok;
    });
  });
});
