import clientUniqueFileId from '../src/utils/client-unique-file-id';

describe('client file id', () => {
  it('should generate the same file id for the same file twice', () => {
    const GIVEN_FILE = {
      name: 'some name'
    };
    expect(clientUniqueFileId(GIVEN_FILE)).to.equal(clientUniqueFileId(GIVEN_FILE));
  });

  it('should generate file based on size', () => {
    const GIVEN_FILE = {
      name: 'some name',
      size: 1234
    };
    expect(clientUniqueFileId(GIVEN_FILE)).to.contain('1234');
  });
});
