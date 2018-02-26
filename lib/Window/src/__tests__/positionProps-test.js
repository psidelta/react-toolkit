'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Window = require('../Window');

var _Window2 = _interopRequireDefault(_Window);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Window2.default.defaultProps.rootClassName;

describe('position props', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, null));
  });

  describe('draggable', function () {
    it('adds --draggalbe className', function () {
      wrapper.setProps({ draggable: true });
      expect(wrapper.find('.' + ROOT_CLASS + '--draggable')).has.length(1);
    });
  });

  describe('positon controlled and uncontrolled', function () {
    it('sets correct style', function () {
      wrapper.setProps({
        position: {
          left: 100,
          right: 200,
          bottom: 100,
          top: 50
        }
      });

      expect(wrapper.find('.' + ROOT_CLASS).props().style.left).to.equal(100);
      expect(wrapper.find('.' + ROOT_CLASS).props().style.right).to.equal(200);
      expect(wrapper.find('.' + ROOT_CLASS).props().style.bottom).to.equal(100);
      expect(wrapper.find('.' + ROOT_CLASS).props().style.top).to.equal(50);
    });

    it('controlled ovewrites uncontrolled', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { defaultPosition: { left: 10 }, position: { left: 20 } }));

      expect(wrapper.instance().getPosition().left).to.equal(20);
    });

    it('uncontrolled gets default from defaultProps', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Window2.default, { defaultPosition: { left: 10 } }));

      expect(wrapper.instance().getPosition().left).to.equal(10);
    });
  });
});