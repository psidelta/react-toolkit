'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('nodeStyles', function () {
  describe('nodeStyle and node.style', function () {
    it('correct style is computed with style objects', function () {
      var dataSource = [{
        label: 'hello world',
        style: { color: 'node color' }
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: dataSource,
        nodeStyle: { color: 'global color', background: 'global background' }
      }));
      var test = wrapper.find(_Node2.default).first().props().domProps.style;
      expect(test).to.deep.equal({
        color: 'node color',
        background: 'global background'
      });
    });

    it('correct style is computed using functions', function () {
      var dataSource = [{
        label: 'hello world',
        style: function style() {
          return { color: 'node color' };
        }
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: dataSource,
        nodeStyle: function nodeStyle() {
          return {
            color: 'global color',
            background: 'global background'
          };
        }
      }));
      var test = wrapper.find(_Node2.default).first().props().domProps.style;
      expect(test).to.deep.equal({
        color: 'node color',
        background: 'global background'
      });
    });

    it('style function is called with correct arguments', function () {
      var globalStyle = sinon.spy();
      var nodeStyle = sinon.spy();
      var dataSource = [{
        label: 'hello world',
        style: nodeStyle
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, nodeStyle: globalStyle }));

      expect(globalStyle.called).to.be.true;
      expect(nodeStyle.called).to.be.true;

      var _wrapper$find$first$p = wrapper.find(_Node2.default).first().props(),
          index = _wrapper$find$first$p.index,
          path = _wrapper$find$first$p.path;

      expect(globalStyle.args[0][0].path).to.equal(path);
      expect(globalStyle.args[0][0].index).to.equal(index);

      expect(nodeStyle.args[0][0].path).to.equal(path);
      expect(nodeStyle.args[0][0].index).to.equal(index);
    });
  });

  describe('labelStyle and node.labelStyle', function () {
    it('correct style is computed with style objects', function () {
      var dataSource = [{
        label: 'hello world',
        labelStyle: { color: 'node color' }
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: dataSource,
        labelStyle: {
          color: 'global color',
          background: 'global background'
        }
      }));
      var test = wrapper.find(_Node2.default).first().props().labelStyle;
      expect(test).to.deep.equal({
        color: 'node color',
        background: 'global background'
      });
    });

    it('correct style is computed using functions', function () {
      var dataSource = [{
        label: 'hello world',
        labelStyle: function labelStyle() {
          return { color: 'node color' };
        }
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: dataSource,
        labelStyle: function labelStyle() {
          return {
            color: 'global color',
            background: 'global background'
          };
        }
      }));
      var test = wrapper.find(_Node2.default).first().props().labelStyle;
      expect(test).to.deep.equal({
        color: 'node color',
        background: 'global background'
      });
    });

    it('style function is called with correct arguments', function () {
      var globalStyle = sinon.spy();
      var nodeStyle = sinon.spy();
      var dataSource = [{
        label: 'hello world',
        labelStyle: nodeStyle
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, labelStyle: globalStyle }));

      expect(globalStyle.called).to.be.true;
      expect(nodeStyle.called).to.be.true;

      var _wrapper$find$first$p2 = wrapper.find(_Node2.default).first().props(),
          index = _wrapper$find$first$p2.index,
          path = _wrapper$find$first$p2.path;

      expect(globalStyle.args[0][0].path).to.equal(path);
      expect(globalStyle.args[0][0].index).to.equal(index);

      expect(nodeStyle.args[0][0].path).to.equal(path);
      expect(nodeStyle.args[0][0].index).to.equal(index);
    });
  });

  describe('contentStyle and node.contentStyle', function () {
    it('correct style is computed with style objects', function () {
      var dataSource = [{
        label: 'hello world',
        nodes: [],
        contentStyle: { color: 'node color' }
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        rtl: false,
        dataSource: dataSource,
        contentStyle: {
          color: 'global color',
          background: 'global background'
        }
      }));
      var test = wrapper.find(_Node2.default).first().props().contentStyle;
      expect(test).to.deep.equal({
        color: 'node color',
        background: 'global background',
        paddingLeft: 20
      });
    });

    it('correct style is computed using functions', function () {
      var dataSource = [{
        label: 'hello world',
        nodes: [],
        contentStyle: function contentStyle() {
          return { color: 'node color' };
        }
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: dataSource,
        rtl: false,
        contentStyle: function contentStyle() {
          return {
            color: 'global color',
            background: 'global background'
          };
        }
      }));
      var test = wrapper.find(_Node2.default).first().props().contentStyle;
      expect(test).to.deep.equal({
        color: 'node color',
        background: 'global background',
        paddingLeft: 20
      });
    });

    it('style function is called with correct arguments', function () {
      var globalStyle = sinon.spy();
      var nodeStyle = sinon.spy();
      var dataSource = [{
        label: 'hello world',
        nodes: [],
        contentStyle: nodeStyle
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: dataSource,
        rtl: false,
        contentStyle: globalStyle
      }));

      expect(globalStyle.called).to.be.true;
      expect(nodeStyle.called).to.be.true;

      var _wrapper$find$first$p3 = wrapper.find(_Node2.default).first().props(),
          index = _wrapper$find$first$p3.index,
          path = _wrapper$find$first$p3.path;

      expect(globalStyle.args[0][0].path).to.equal(path);
      expect(globalStyle.args[0][0].index).to.equal(index);

      expect(nodeStyle.args[0][0].path).to.equal(path);
      expect(nodeStyle.args[0][0].index).to.equal(index);
    });
  });
});