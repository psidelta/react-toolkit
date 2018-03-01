'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NESTED_DATA_STRUCTURE = [{
  label: 'test 1'
}, {
  label: 'test 2',
  nodes: [{
    label: 'test 3'
  }, {
    label: 'test 4'
  }, {
    label: 'test 5'
  }]
}];

describe('selection props', function () {
  describe('enableSelection', function () {
    it('should default to false', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));
      expect(wrapper.props().enableSelection).to.be.false;
    });

    it('nodes should not be selected when if false and there is a selection', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { selected: { 0: true }, dataSource: NESTED_DATA_STRUCTURE }));

      expect(wrapper.find(_Node2.default).first().props().selected).to.be.falsey;
    });
  });

  describe('selection change by click', function () {
    it('should update selected state correct', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { enableSelection: true, dataSource: NESTED_DATA_STRUCTURE }));
      wrapper.find(_Node2.default).get(0).onLabelClick({ stopPropagation: function stopPropagation() {} });
      wrapper.find(_Node2.default).get(1).onLabelClick({ stopPropagation: function stopPropagation() {} });
      expect(wrapper.state().selected).to.deep.equal({
        '0': true,
        '1': true
      });
    });
  });

  describe('defaultSelected', function () {
    it('should be used as initial state for selected', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        defaultSelected: { '0': true },
        dataSource: NESTED_DATA_STRUCTURE
      }));
      expect(wrapper.state().selected['0']).to.be.true;
    });
  });

  describe('selected', function () {
    it('should not update this.state.selected', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { selected: { '0': true }, dataSource: NESTED_DATA_STRUCTURE }));
      var initialState = wrapper.state().selected;
      wrapper.find(_Node2.default).get(1).onLabelClick({ stopPropagation: function stopPropagation() {} });
      expect(wrapper.state().selected).to.be.deep.equal(initialState);
    });

    it('should use correct selected state', function () {
      var selected = { '2': true };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        dataSource: NESTED_DATA_STRUCTURE,
        selected: selected,
        defaultSelected: { '1': true }
      }));

      expect(wrapper.instance().getCurrentSelectedState()).to.deep.equal(selected);
    });
  });

  describe('singleSelect', function () {
    it('should update state correctly', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        singleSelect: true,
        enableSelection: true,
        defaultSelected: { '0': true },
        dataSource: NESTED_DATA_STRUCTURE
      }));

      wrapper.find(_Node2.default).get(1).onLabelClick({ stopPropagation: function stopPropagation() {} });
      expect(wrapper.state().selected).to.deep.equal({
        '1': true
      });
    });
  });

  describe('onSelectionChange', function () {
    it('should not call onSelectionChange when enableSelection is false', function () {
      var onSelectionChange = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: NESTED_DATA_STRUCTURE,
        onSelectionChange: onSelectionChange
      }));

      wrapper.find(_Node2.default).get(0).onLabelClick({ stopPropagation: function stopPropagation() {} });

      expect(onSelectionChange.called).to.be.false;
    });

    it('should call onSelectionChange when is enabled', function () {
      var onSelectionChange = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableSelection: true,
        dataSource: NESTED_DATA_STRUCTURE,
        onSelectionChange: onSelectionChange
      }));

      wrapper.find(_Node2.default).get(0).onLabelClick({ stopPropagation: function stopPropagation() {} });
      expect(onSelectionChange.called).to.be.true;
    });

    it('should call onSelectionChange with correct new selected', function () {
      var onSelectionChange = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableSelection: true,
        dataSource: NESTED_DATA_STRUCTURE,
        onSelectionChange: onSelectionChange
      }));
      wrapper.setProps({ enableSelection: true, onSelectionChange: onSelectionChange });
      wrapper.find(_Node2.default).get(0).onLabelClick({ stopPropagation: function stopPropagation() {} });
      wrapper.find(_Node2.default).get(1).onLabelClick({ stopPropagation: function stopPropagation() {} });

      var test = onSelectionChange.args[1][0];

      expect(test.selected).to.be.true;
      expect(test.path).to.be.equal('1');
      expect(test.selectedMap).to.deep.equal({
        '0': true,
        '1': true
      });
    });

    describe('getUpdatedDataSource', function () {
      it('should update correctly dataSource', function () {
        var newDataSource = void 0;
        var onSelectionChange = function onSelectionChange(_ref) {
          var getUpdatedDataSource = _ref.getUpdatedDataSource;

          newDataSource = getUpdatedDataSource(function (_ref2) {
            var node = _ref2.node,
                nodeProps = _ref2.nodeProps,
                selected = _ref2.selected;

            node.customPropertyInjecter = true;
          });
        };
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
          enableSelection: true,
          dataSource: NESTED_DATA_STRUCTURE,
          onSelectionChange: onSelectionChange
        }));

        wrapper.find(_Node2.default).get(0).onLabelClick({ stopPropagation: function stopPropagation() {} });

        expect(newDataSource).to.be.ok;
        expect(wrapper.state().data).to.not.equal(newDataSource);
        expect(newDataSource[0].customPropertyInjecter).to.be.true;
      });
    });
  });

  describe('isNodeSelected', function () {
    it('should be called with correct props', function () {
      var isNodeSelected = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableSelection: true,
        isNodeSelected: isNodeSelected,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      var args = isNodeSelected.args[0][0];

      expect(isNodeSelected.called).to.be.true;
      expect(args.index).to.be.equal(0);
    });

    it('should overwrite selection', function () {
      var isNodeSelected = function isNodeSelected() {
        return false;
      };

      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableSelection: true,
        selected: { 0: true },
        isNodeSelected: isNodeSelected,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      var test = wrapper.find(_Node2.default).get(0).props.selected;
      expect(test).to.be.false;
    });

    it('should take into account isNodeSelected state when selected changes', function () {
      var isNodeSelected = function isNodeSelected() {
        return false;
      };
      var onSelectionChange = sinon.spy();

      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableSelection: true,
        selected: { 0: true },
        isNodeSelected: isNodeSelected,
        dataSource: NESTED_DATA_STRUCTURE,
        onSelectionChange: onSelectionChange
      }));

      wrapper.find(_Node2.default).get(0).onLabelClick({ stopPropagation: function stopPropagation() {} });
      expect(onSelectionChange.args[0][0].selectedMap).to.be.deep.equal({
        0: true
      });
    });
  });
});