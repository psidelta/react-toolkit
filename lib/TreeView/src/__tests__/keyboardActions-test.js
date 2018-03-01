'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;
var LABEL_CLASS_NAME = '.' + CLASS_NAME + '__node__label';
var BASIC_DATA_SOURCE = [{
  label: 'test 1'
}, {
  label: 'test 2',
  nodes: [{
    label: 'test 3'
  }]
}];

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

describe('keyboard actions ', function () {
  describe('keyboard actions', function () {
    describe('arrrow navigation', function () {
      var wrapper = void 0;
      beforeEach(function () {
        wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: BASIC_DATA_SOURCE }));
      });

      describe('arrowUp', function () {
        it('should update correct state', function () {
          wrapper.setState({ activeNode: '0' });

          wrapper.find('.' + CLASS_NAME).simulate('keyDown', { key: 'ArrowUp' });
          expect(wrapper.state().activeNode).to.equal('0');

          wrapper.setState({ activeNode: '1' });
          wrapper.find('.' + CLASS_NAME).simulate('keyDown', { key: 'ArrowUp' });
          expect(wrapper.state().activeNode).to.equal('0');

          wrapper.setState({ activeNode: '1/0' });
          wrapper.find('.' + CLASS_NAME).simulate('keyDown', { key: 'ArrowUp' });
          expect(wrapper.state().activeNode).to.equal('1');
        });

        it('should call onActiveNodeChange', function () {
          var onActiveNodeChange = sinon.spy();
          wrapper.setProps({ onActiveNodeChange: onActiveNodeChange });
          wrapper.setState({ activeNode: '1' });

          wrapper.find('.' + CLASS_NAME).simulate('keyDown', { key: 'ArrowUp' });

          expect(onActiveNodeChange.called).to.be.true;
          expect(onActiveNodeChange.args[0][0].path).to.equal('0');
        });
      });

      describe('arrowDown', function () {
        it('should update correct state', function () {
          wrapper.setState({ activeNode: '0' });

          wrapper.find('.' + CLASS_NAME).simulate('keyDown', { key: 'ArrowDown' });
          expect(wrapper.state().activeNode).to.equal('1');

          wrapper.setState({ activeNode: '1' });
          wrapper.find('.' + CLASS_NAME).simulate('keyDown', { key: 'ArrowDown' });
          expect(wrapper.state().activeNode).to.equal('1/0');

          wrapper.setState({ activeNode: '1/0' });
          wrapper.find('.' + CLASS_NAME).simulate('keyDown', { key: 'ArrowDown' });
          expect(wrapper.state().activeNode).to.equal('1/0');
        });

        it('should call onSelectionChange', function () {
          var onActiveNodeChange = sinon.spy();
          wrapper.setProps({ onActiveNodeChange: onActiveNodeChange });
          wrapper.setState({ activeNode: '1' });

          wrapper.find('.' + CLASS_NAME).simulate('keyDown', { key: 'ArrowDown' });

          expect(onActiveNodeChange.called).to.be.true;
          expect(onActiveNodeChange.args[0][0].path).to.equal('1/0');
        });
      });

      describe('ArrowRight', function () {
        var wrapper = void 0;
        beforeEach(function () {
          wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: BASIC_DATA_SOURCE }));
        });

        it('expand node when it is collapsed', function () {
          wrapper.setState({
            collapsed: {
              '1': true
            },
            activeNode: '1'
          });

          expect(wrapper.state().collapsed['1']).to.be.true;
          wrapper.simulate('keyDown', { key: 'ArrowRight' });
          expect(wrapper.state().collapsed['1']).to.be.falsey;
        });

        it('navigate to next sibling if is already expanded', function () {
          wrapper.setState({
            activeNode: '1'
          });

          wrapper.simulate('keyDown', { key: 'ArrowRight' });
          expect(wrapper.state().activeNode).to.equal('1/0');
        });

        describe('rtl', function () {
          it('should collapsed node when it is expanded', function () {
            wrapper.setProps({ rtl: true });
            wrapper.setState({
              activeNode: '1'
            });

            expect(wrapper.state().collapsed['1']).to.be.falsey;
            wrapper.simulate('keyDown', { key: 'ArrowRight' });
            expect(wrapper.state().collapsed['1']).to.be.true;
          });

          it('navigate to previous sibling if is already collapsed', function () {
            wrapper.setProps({ rtl: true });
            wrapper.setState({
              activeNode: '1',
              collapsed: {
                '1': true
              }
            });

            wrapper.simulate('keyDown', { key: 'ArrowRight' });
            expect(wrapper.state().activeNode).to.equal('0');
          });
        });
      });

      describe('ArrowLeft', function () {
        var wrapper = void 0;
        beforeEach(function () {
          wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: BASIC_DATA_SOURCE }));
        });

        it('should collapsed node when it is expanded', function () {
          wrapper.setState({
            activeNode: '1'
          });

          expect(wrapper.state().collapsed['1']).to.be.falsey;
          wrapper.simulate('keyDown', { key: 'ArrowLeft' });
          expect(wrapper.state().collapsed['1']).to.be.true;
        });

        it('navigate to previous sibling if is already collapsed', function () {
          wrapper.setState({
            activeNode: '1',
            collapsed: {
              '1': true
            }
          });

          wrapper.simulate('keyDown', { key: 'ArrowLeft' });
          expect(wrapper.state().activeNode).to.equal('0');
        });
      });

      describe('rtl', function () {
        it('expand node when it is collapsed', function () {
          wrapper.setProps({ rtl: true });
          wrapper.setState({
            collapsed: {
              '1': true
            },
            activeNode: '1'
          });

          expect(wrapper.state().collapsed['1']).to.be.true;
          wrapper.simulate('keyDown', { key: 'ArrowLeft' });
          expect(wrapper.state().collapsed['1']).to.be.falsey;
        });

        it('navigate to next sibling if is already expanded', function () {
          wrapper.setProps({ rtl: true });
          wrapper.setState({
            activeNode: '1'
          });

          wrapper.simulate('keyDown', { key: 'ArrowLeft' });
          expect(wrapper.state().activeNode).to.equal('1/0');
        });
      });
    });

    describe('space on activeNode', function () {
      it('should check it', function () {
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: BASIC_DATA_SOURCE }));

        wrapper.setState({
          activeNode: '0'
        });

        expect(wrapper.state().checked['0']).to.be.falsey;
        wrapper.simulate('keyDown', { key: ' ' });
        expect(wrapper.state().checked['0']).to.be.true;
      });
    });

    describe('PageUp', function () {
      it('should set active last sibling', function () {
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));

        wrapper.setState({ activeNode: '1/2' });
        wrapper.simulate('keyDown', { key: 'PageUp' });
        expect(wrapper.state().activeNode).to.equal('1/0');
      });

      it('should work on root nodes', function () {
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));
        wrapper.setState({ activeNode: '1' });
        wrapper.simulate('keyDown', { key: 'PageUp' });
        expect(wrapper.state().activeNode).to.equal('0');
      });
    });

    describe('PageDown', function () {
      it('should set active first sibling', function () {
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));

        wrapper.setState({ activeNode: '1/0' });
        wrapper.simulate('keyDown', { key: 'PageDown' });
        expect(wrapper.state().activeNode).to.equal('1/2');
      });
    });

    describe('Home', function () {
      it('should set active first rendered node', function () {
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));

        wrapper.setState({ activeNode: '1/2' });
        wrapper.simulate('keyDown', { key: 'Home' });
        expect(wrapper.state().activeNode).to.equal('0');
      });
    });

    describe('End', function () {
      it('should set active first rendered node', function () {
        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));

        wrapper.setState({ activeNode: '0' });
        wrapper.simulate('keyDown', { key: 'End' });
        expect(wrapper.state().activeNode).to.equal('1/2');
      });
    });

    describe('Enter', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));
      wrapper.setState({ activeNode: '0' });

      expect(wrapper.state().collapsed).to.deep.equal({});
      wrapper.simulate('keyDown', { key: 'Enter' });
      expect(wrapper.state().collapsed).to.deep.equal({ 0: true });
      wrapper.simulate('keyDown', { key: 'Enter' });
      expect(wrapper.state().collapsed).to.deep.equal({});
    });
  });

  describe('onClick', function () {
    var wrapper = void 0;
    beforeEach(function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: BASIC_DATA_SOURCE }));
    });

    it('should change activeNode when a node is clicked', function () {
      var test = wrapper
      // .find(Node)
      .find(LABEL_CLASS_NAME).last().simulate('click');

      expect(wrapper.state().activeNode).to.be.ok;
      expect(wrapper.state().activeNode).to.equal('1/0');
    });

    it('should call onSelectionChange when a node is clicked', function () {
      var onActiveNodeChange = sinon.spy();
      wrapper.setProps({ onActiveNodeChange: onActiveNodeChange });
      var test = wrapper.find('.' + CLASS_NAME + '__node__label').last().simulate('click');

      expect(onActiveNodeChange.called).to.be.true;
      expect(onActiveNodeChange.args[0][0].path).to.equal('1/0');
    });
  });

  describe('defaultActiveNode', function () {
    it("should have it's initial sate equal to defaultActiveNode", function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { defaultActiveNode: 'test', dataSource: [] }));
      expect(wrapper.state().activeNode).to.equal('test');
    });
  });

  describe('enableKeyboardNavigation false', function () {
    var wrapper = void 0;
    beforeEach(function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: BASIC_DATA_SOURCE }));
    });

    describe('onClick', function () {
      it('should not change state', function () {
        wrapper.setProps({
          enableKeyboardNavigation: false
        });
        wrapper.find(LABEL_CLASS_NAME).last().simulate('click');

        expect(wrapper.state().activeNode).to.be.null;
      });

      it('should not call onSelectionChange', function () {
        var onActiveNodeChange = sinon.spy();
        wrapper.setProps({
          onActiveNodeChange: onActiveNodeChange,
          enableKeyboardNavigation: false
        });
        wrapper.find(LABEL_CLASS_NAME).last().simulate('click');

        expect(onActiveNodeChange.called).to.be.false;
      });
    });
  });

  describe('activeNode', function () {
    var wrapper = void 0;
    beforeEach(function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { activeNode: '1/0', dataSource: BASIC_DATA_SOURCE }));
    });

    /**
     * This covers all ui iteractions that might change
     * activeNode, all of them call onActiveNodeChange
     * when thy want to change state
     */
    it("when onActiveNodeChange is triggered it doesn't change state", function () {
      wrapper.instance().onActiveNodeChange({ props: {}, path: '0' });
      expect(wrapper.state().activeNode).to.be.null;
    });

    it('calls onSelectionChange, with right args', function () {
      var onActiveNodeChange = sinon.spy();
      wrapper.setProps({ onActiveNodeChange: onActiveNodeChange });
      wrapper.find(LABEL_CLASS_NAME).last().simulate('click');

      expect(onActiveNodeChange.called).to.be.true;
      expect(onActiveNodeChange.args[0][0].path).to.equal('1/0');
    });
  });
});