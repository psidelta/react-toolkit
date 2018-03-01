'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName;
var titleBarClassName = '.' + rootClassName + '__title-bar';
var titleClassName = rootClassName + '__title';

describe('renderAfterAndBeforeTitle', function () {
  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  describe('renderBeforeTitle', function () {
    it('should be called with props', function () {
      var renderBeforeTitle = sinon.spy();
      wrapper.setProps({ id: 'customId' });
      wrapper.setProps({ renderBeforeTitle: renderBeforeTitle });
      expect(renderBeforeTitle.called).to.be.true;
      expect(renderBeforeTitle.args[0][0].id).to.equal('customId');
    });

    it('should render what it returns', function () {
      var renderBeforeTitle = function renderBeforeTitle() {
        return _react2.default.createElement('div', { id: 'customId2' });
      };
      wrapper.setProps({ renderBeforeTitle: renderBeforeTitle });
      expect(wrapper.find('#customId2')).to.have.length(1);
    });

    it('should be rendered before title', function () {
      var renderBeforeTitle = function renderBeforeTitle() {
        return _react2.default.createElement('div', { id: 'renderedBeforeTitleId' });
      };
      wrapper.setProps({ renderBeforeTitle: renderBeforeTitle });
      var titleBarWrapper = wrapper.find(titleBarClassName);
      expect(titleBarWrapper.childAt(0).props().id).to.equal('renderedBeforeTitleId');

      expect(titleBarWrapper.childAt(1).hasClass(titleClassName)).to.be.true;
    });
  });

  describe('renderAfterTitle', function () {
    it('should be called with props', function () {
      var renderAfterTitle = sinon.spy();
      wrapper.setProps({ id: 'customId' });
      wrapper.setProps({ renderAfterTitle: renderAfterTitle });
      expect(renderAfterTitle.called).to.be.true;
      expect(renderAfterTitle.args[0][0].id).to.equal('customId');
    });

    it('should render what it returns', function () {
      var renderAfterTitle = function renderAfterTitle() {
        return _react2.default.createElement('div', { id: 'customId2' });
      };
      wrapper.setProps({ renderAfterTitle: renderAfterTitle });
      expect(wrapper.find('#customId2')).to.have.length(1);
    });

    it('should be rendered after title', function () {
      var renderAfterTitle = function renderAfterTitle() {
        return _react2.default.createElement('div', { id: 'renderedAfterTitleId' });
      };
      wrapper.setProps({ renderAfterTitle: renderAfterTitle });
      var titleBarWrapper = wrapper.find(titleBarClassName);
      expect(titleBarWrapper.childAt(1).props().id).to.equal('renderedAfterTitleId');

      expect(titleBarWrapper.childAt(0).hasClass(titleClassName)).to.be.true;
    });
  });
});