'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('arrow', function () {
  describe('arrowStyle', function () {
    it('should be used as inline style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { arrowStyle: { color: 'red' } }));
      wrapper.setState({ arrowConfig: {} });
      expect(wrapper.find('.zippy-react-toolkit-overlay__arrow').at(0).props().style.color).toEqual('red');
    });
  });
  describe('arrowClassName', function () {
    it('should be used as inline style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { arrowClassName: 'customArrow' }));
      wrapper.setState({ arrowConfig: {} });
      expect(wrapper.find('div.customArrow')).toHaveLength(1);
    });
  });
  describe('border', function () {
    it('should be added', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { border: '1px solid red' }));
      wrapper.setState({ arrowConfig: {} });
      expect(wrapper.find('.zippy-react-toolkit-overlay__arrow').at(0).props().style.border).toEqual('1px solid red');
    });
  });
  describe('arrow', function () {
    it('should be rendered only if is true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { arrow: true, border: '1px solid red' }));
      wrapper.setState({ arrowConfig: {} });
      expect(wrapper.find('div.zippy-react-toolkit-overlay__arrow')).toHaveLength(1);
      wrapper.setProps({ arrow: false });
      expect(wrapper.find('.zippy-react-toolkit-overlay__arrow')).toHaveLength(0);
    });
  });
  describe('arrowSize', function () {
    it('numeric sets both width and height to same value', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { border: '1px solid red' }));
      wrapper.setState({ arrowConfig: {} });

      wrapper.setProps({ arrowSize: 20 });
      expect(wrapper.find('.zippy-react-toolkit-overlay__arrow').at(0).props().size).toEqual(20);
    });

    it('if object is applied on style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { border: '1px solid red' }));
      wrapper.setState({ arrowConfig: {} });
      wrapper.setProps({ arrowSize: { width: 20, height: 30 } });
      expect(wrapper.find('.zippy-react-toolkit-overlay__arrow').at(0).props().size.width).toEqual(20);
      expect(wrapper.find('.zippy-react-toolkit-overlay__arrow').at(0).props().size.height).toEqual(30);
    });
  });
});