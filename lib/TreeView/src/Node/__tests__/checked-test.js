'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Node = require('../../Node');

var _Node2 = _interopRequireDefault(_Node);

var _TreeView = require('../../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

var _CheckBox = require('../../../../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassname;

describe('checked', function () {
  describe('enableChecked', function () {
    it('should render not render checkboxes if false', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, null));
      expect(wrapper.find(_CheckBox2.default)).to.have.length(0);
    });

    it('should render checkboxes if true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { enableChecked: true }));
      expect(wrapper.find(_CheckBox2.default)).to.have.length(1);
    });
  });

  describe('onCheckedChange', function () {
    it('is called when checked changes', function () {
      var onCheckedChange = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { enableChecked: true, debug: true, onCheckedChange: onCheckedChange }));

      wrapper.find(_CheckBox2.default).simulate('change', {
        target: {
          checked: true
        }
      });

      expect(onCheckedChange.called).to.be.true;
    });
  });
});