'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('../MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MenuItemCell = require('../MenuItem/MenuItemCell');

var _MenuItemCell2 = _interopRequireDefault(_MenuItemCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS_NAME = _Menu2.default.defaultProps.rootClassName;

describe('columns', function () {
  it('default should render 1 column', function () {
    var items = [{ label: 'test' }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
    expect(wrapper.find(_MenuItem2.default).find(_MenuItemCell2.default)).to.have.length(1);
  });

  it('renders custom columns', function () {
    var items = [{ label: 'label1', name: 'name2' }];
    var columns = ['label', 'name'];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items, columns: columns }));

    expect(wrapper.find(_MenuItem2.default).find(_MenuItemCell2.default)).to.have.length(2);
  });

  it('should use column.render when present', function () {
    var Flag = function Flag(_ref) {
      var name = _ref.name;

      return _react2.default.createElement(
        'div',
        null,
        'Flag for ',
        name
      );
    };

    var items = [{ country: 'United States', shortName: 'usa' }];
    var columns = ['country', {
      name: 'shortName',
      render: function render(item) {
        return _react2.default.createElement(Flag, { country: item.shortName });
      }
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items, columns: columns }));

    expect(wrapper.find(Flag)).to.have.length(1);
  });

  it('should add className', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, {
      columns: [{
        name: 'label',
        className: 'custom-class-name' // should be applied on the TD
      }],
      items: [{
        label: 'Single Cell',
        cellClassName: 'a-cell-class-name',
        // should be applied on the TR
        className: 'xxx'
      }]
    }));

    var cell = wrapper.find('.' + ROOT_CLASS_NAME + '__cell');

    expect(cell.prop('className')).to.contain('custom-class-name');
    expect(cell.prop('className')).to.contain('a-cell-class-name');
    expect(wrapper.find('tr').prop('className')).to.contain('xxx');
  });
});