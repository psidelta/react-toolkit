import getListProps from '../getListProps';

describe('listProps', () => {
  it('select correct props for lsit', () => {
    const props = {
      listClassName: 'listClassName',
      listEmptyText: 'emptyText',
      listLoadingText: 'loading',
      selectedStyle: 'selectedStyle',
      selectedClassName: 'selectedClassName'
    };

    const computed = {
      data: [],
      idProperty: 'idProperty',
      displayProperty: 'displayProperty'
    };

    const test = getListProps({ props, computed });

    expect(test.className).to.equal(props.listClassName);

    expect(test.emptyText).to.equal(props.listEmptyText);
    expect(test.loadingText).to.equal(props.listLoadingText);

    expect(test.emptyText).to.equal(props.listEmptyText);
    expect(test.loadingText).to.equal(props.listLoadingText);

    expect(test.data).to.equal(computed.data);
    expect(test.getIdProperty).to.equal(computed.getIdProperty);
    expect(test.getDisplayProperty).to.equal(computed.getDisplayProperty);
  });
});
