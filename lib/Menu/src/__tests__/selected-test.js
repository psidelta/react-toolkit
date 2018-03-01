'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('selected', function () {
  describe('renderCheckInput', function () {
    var items = [{ name: 'name1', label: 'test1' }, { name: 'name2', label: 'test3' }, { name: 'name2', value: 'name3', label: 'test2' }];

    it('renders a custom input', function () {
      var renderCheckInput = sinon.stub().returns(_react2.default.createElement('div', { className: 'customCheckInput' }));
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, {
        items: items,
        renderCheckInput: renderCheckInput,
        enableSelection: true
      }));
      expect(renderCheckInput.called).to.be.true;
      expect(wrapper.find('.customCheckInput')).to.have.length(1);
    });
    it('renders an input with mutated props', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, {
        items: items,
        enableSelection: true,
        renderCheckInput: function renderCheckInput(_ref) {
          var domProps = _ref.domProps;

          domProps.id = 'customCheckInput';
        }
      }));
      expect(wrapper.find('#customCheckInput')).to.have.length(1);
    });
  });
  describe('renderRadioInput', function () {
    var items = [{ name: 'name1', label: 'test1' }, { name: 'name2', label: 'test3' }, { name: 'name2', value: 'name3', label: 'test2' }];

    it('renders a custom input', function () {
      var renderRadioInput = sinon.stub().returns(_react2.default.createElement('div', { className: 'customRadioInput' }));
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, {
        items: items,
        renderRadioInput: renderRadioInput,
        enableSelection: true
      }));
      expect(renderRadioInput.called).to.be.true;
      expect(wrapper.find('.customRadioInput')).to.have.length(2);
    });
    it('renders with mutated props', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, {
        items: items,
        renderRadioInput: function renderRadioInput(_ref2) {
          var domProps = _ref2.domProps;

          domProps.className = 'customRadioInput';
        },
        enableSelection: true
      }));
      expect(wrapper.find('.customRadioInput')).to.have.length(2);
    });
  });
});