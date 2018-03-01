'use strict';

var _getListProps = require('../getListProps');

var _getListProps2 = _interopRequireDefault(_getListProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('listProps', function () {
  it('select correct props for lsit', function () {
    var props = {
      listClassName: 'listClassName',
      listEmptyText: 'emptyText',
      listLoadingText: 'loading',
      selectedStyle: 'selectedStyle',
      selectedClassName: 'selectedClassName'
    };

    var computed = {
      data: [],
      idProperty: 'idProperty',
      displayProperty: 'displayProperty'
    };

    var test = (0, _getListProps2.default)({ props: props, computed: computed });

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