'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _TreeView = require('../../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('custom renderers', function () {
  describe('renderLabel', function () {
    var wrapper = void 0;

    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { node: { label: 'test' } }));
    });

    it('should call renderLabel', function () {
      var renderLabel = jest.fn();
      wrapper.setProps({ renderLabel: renderLabel });
      expect(renderLabel).toHaveBeenCalledTimes(1);
    });

    it('should render what renderLabel returns', function () {
      var renderLabel = function renderLabel() {
        return _react2.default.createElement('div', { id: 'testCustomLabel' });
      };
      wrapper.setProps({ renderLabel: renderLabel });
      expect(wrapper.find('#testCustomLabel')).toHaveLength(1);
    });

    it('mutating props will change label', function () {
      var renderLabel = function renderLabel(domProps) {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderLabel: renderLabel });
      expect(wrapper.find('#mutatedId')).toHaveLength(1);
      expect(wrapper.find('#mutatedId').hasClass(CLASS_NAME + '__node__label')).toBe(true);
    });
  });

  describe('renderContent', function () {
    var wrapper = void 0;
    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { hasChildren: true, node: { label: 'test' }, children: [] }));
    });

    it('should call renderLabel', function () {
      var renderContent = jest.fn();
      wrapper.setProps({ renderContent: renderContent });
      expect(renderContent).toHaveBeenCalledTimes(1);
    });

    it('should render what renderContent returns', function () {
      var renderContent = function renderContent() {
        return _react2.default.createElement('div', { id: 'testCustomLabel' });
      };
      wrapper.setProps({ renderContent: renderContent });
      expect(wrapper.find('#testCustomLabel')).toHaveLength(1);
    });

    it('mutating props will change content', function () {
      var renderContent = function renderContent(domProps) {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderContent: renderContent });
      expect(wrapper.find('#mutatedId')).toHaveLength(1);
      expect(wrapper.find('#mutatedId').hasClass(CLASS_NAME + '__node__content')).toBe(true);
    });
  });

  describe('renderIcon', function () {
    it('should call render icon if set', function () {
      var renderIcon = jest.fn();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { renderIcon: renderIcon }));
      expect(renderIcon).toHaveBeenCalledTimes(1);
    });

    it('should render what function returns', function () {
      var renderIcon = function renderIcon() {
        return _react2.default.createElement('div', { id: 'customIcon' });
      };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { renderIcon: renderIcon }));
      expect(wrapper.find('#customIcon')).toHaveLength(1);
    });

    it('should be called with nodeProps', function () {
      var renderIcon = jest.fn();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { index: 1, node: { color: 'green' }, renderIcon: renderIcon }));
      expect(renderIcon.mock.calls[0][0].index).toEqual(1);
      expect(renderIcon.mock.calls[0][0].node.color).toEqual('green');
    });
  });

  describe('renderCheck', function () {
    it('should call renderCheck', function () {
      var renderCheck = jest.fn();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, {
        enableChecked: true,
        node: { label: 'test' },
        renderCheck: renderCheck
      }));
      expect(renderCheck).toHaveBeenCalledTimes(1);
    });

    it('should render what rendeCheck returns', function () {
      var renderCheck = function renderCheck() {
        return _react2.default.createElement('div', { id: 'customCheck' });
      };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, {
        enableChecked: true,
        node: { label: 'test' },
        renderCheck: renderCheck
      }));
      expect(wrapper.find('#customCheck')).toHaveLength(1);
    });

    it('mutating props will change check', function () {
      var renderCheck = function renderCheck(domProps) {
        domProps.id = 'mutatedIdx';
      };

      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, {
        enableChecked: true,
        node: { label: 'test' },
        renderCheck: renderCheck
      }));

      expect(wrapper.find('#mutatedIdx').length).toBe(1);
      expect(wrapper.find('#mutatedIdx').hasClass(CLASS_NAME + '__node__checkbox')).toBe(true);
    });
  });

  describe('renderNodeText', function () {
    var wrapper = void 0;

    beforeEach(function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, { enableChecked: true, node: { label: 'test' } }));
    });

    it('should be called', function () {
      var renderNodeText = jest.fn();
      wrapper.setProps({ renderNodeText: renderNodeText });
      expect(renderNodeText).toHaveBeenCalledTimes(1);
    });

    it('should render what rendeCheck returns', function () {
      var renderNodeText = function renderNodeText() {
        return _react2.default.createElement('div', { id: 'customCheck' });
      };
      wrapper.setProps({ renderNodeText: renderNodeText });
      expect(wrapper.find('#customCheck')).toHaveLength(1);
    });

    it('mutating props will change check', function () {
      var renderNodeText = function renderNodeText(domProps) {
        domProps.id = 'mutatedId1';
      };
      wrapper.setProps({ renderNodeText: renderNodeText });
      expect(wrapper.find('#mutatedId1')).toHaveLength(1);
      expect(wrapper.find('#mutatedId1').hasClass(CLASS_NAME + '__node__label__text')).toBe(true);
    });
  });
});