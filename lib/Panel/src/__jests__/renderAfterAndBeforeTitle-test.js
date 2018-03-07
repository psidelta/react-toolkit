'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName;
var titleBarClassName = rootClassName + '__title-bar';
var titleClassName = rootClassName + '__title';

describe('renderAfterAndBeforeTitle', function () {
  describe('renderBeforeTitle', function () {
    var wrapper = void 0;

    beforeEach(function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
    });

    it('should be called with props', function () {
      var renderBeforeTitle = jest.fn();
      wrapper.setProps({ renderBeforeTitle: renderBeforeTitle });
      expect(renderBeforeTitle).toHaveBeenCalledTimes(1);
    });

    it('should render what it returns', function () {
      var renderBeforeTitle = jest.fn(function () {
        return _react2.default.createElement('div', { id: 'customId2' });
      });
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Panel2.default, { renderBeforeTitle: renderBeforeTitle }));
      expect(wrapper.find('#customId2')).toHaveLength(1);
    });

    it('should be rendered before title', function () {
      var renderBeforeTitle = jest.fn(function () {
        return _react2.default.createElement('div', { id: 'renderedBeforeTitleId' });
      });
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Panel2.default, { renderBeforeTitle: renderBeforeTitle }));
      var titleBarWrapper = wrapper.find('.' + titleBarClassName);

      expect(titleBarWrapper.childAt(0).props().id).toEqual('renderedBeforeTitleId');

      expect(titleBarWrapper.props().className).toContain(titleClassName);
    });
  });

  describe('renderAfterTitle', function () {
    var wrapper = void 0;

    beforeEach(function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
    });

    it('should be called with props', function () {
      var renderAfterTitle = jest.fn();
      wrapper.setProps({ id: 'customId' });
      wrapper.setProps({ renderAfterTitle: renderAfterTitle });
      expect(renderAfterTitle).toHaveBeenCalledTimes(1);
      expect(renderAfterTitle.mock.calls[0][0].id).toEqual('customId');
    });

    it('should render what it returns', function () {
      var renderAfterTitle = jest.fn(function () {
        return _react2.default.createElement('div', { id: 'customId2' });
      });
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Panel2.default, { renderAfterTitle: renderAfterTitle }));
      expect(wrapper.find('#customId2')).toHaveLength(1);
    });

    it('should be rendered after title', function () {
      var renderAfterTitle = jest.fn(function () {
        return _react2.default.createElement('div', { id: 'renderedAfterTitleId' });
      });
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Panel2.default, { renderAfterTitle: renderAfterTitle }));

      var titleBar = wrapper.find('.' + titleBarClassName);

      expect(titleBar.childAt(1).props().id).toEqual('renderedAfterTitleId');
      expect(titleBar.props().className).toContain(titleClassName);
    });
  });
});