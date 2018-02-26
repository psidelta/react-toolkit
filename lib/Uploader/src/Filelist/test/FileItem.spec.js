'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _FileItem = require('../src/FileItem');

var _FileItem2 = _interopRequireDefault(_FileItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FileItem', function () {
  it('should create instance of FileItem', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileItem2.default, null));
    expect(component.instance()).to.be.instanceOf(_FileItem2.default);
  });

  describe('defaults', function () {

    it('should have default renderFileExtension', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.node.props).to.have.property('renderFileExtensionIcon');
      expect(component.node.props.renderFileExtensionIcon).to.be.instanceOf(Function);
    });

    it('should have default renderClearIcon', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.node.props).to.have.property('renderClearIcon');
      expect(component.node.props.renderClearIcon).to.be.instanceOf(Function);
    });

    it('should have default renderFileName', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.node.props).to.have.property('renderFileName');
      expect(component.node.props.renderFileName).to.be.instanceOf(Function);
    });

    it('should have default renderFileSize', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.node.props).to.have.property('renderFileSize');
      expect(component.node.props.renderFileSize).to.be.instanceOf(Function);
    });

    it('should have default renderFileErrorMessage', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.node.props).to.have.property('renderFileErrorMessage');
      expect(component.node.props.renderFileErrorMessage).to.be.instanceOf(Function);
    });

    it('should have default renderUploadButton', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.node.props).to.have.property('renderUploadButton');
      expect(component.node.props.renderUploadButton).to.be.instanceOf(Function);
    });

    it('should have default renderUploadProgress', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.node.props).to.have.property('renderUploadProgress');
      expect(component.node.props.renderUploadProgress).to.be.instanceOf(Function);
    });
  });

  describe("renderFileSize params", function () {
    it('should generate meaninful props for renderFileSize');
    it('should use fileSizeFormatter to generate file size text in renderFileSize props');
  });

  describe('uploadProgress', function () {

    it('should call renderUploadProgress when uploadProgress prop has meaningful details', function () {
      var renderUploadProgressSpy = sinon.spy(function (props) {
        return _react2.default.createElement('div', null);
      });
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, { renderUploadProgress: renderUploadProgressSpy }));

      expect(renderUploadProgressSpy).to.not.have.been.called;
      component.setProps({
        uploadProgress: {
          uploadedSize: 1000, eta: 13 * 60 * 1000,
          inProgress: true
        }
      });

      expect(renderUploadProgressSpy).to.have.been.calledOnce;
    });

    it('should generate meaningful props for renderUploadProgress', function () {
      var renderUploadProgressSpy = sinon.spy(function (props) {
        return _react2.default.createElement('div', null);
      });
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        renderUploadProgress: renderUploadProgressSpy,
        uploadProgress: { uploadedSize: 1000, eta: 13 * 60 * 1000, inProgress: true }
      }));

      expect(renderUploadProgressSpy).to.have.been.calledOnce;

      var firstCallProps = renderUploadProgressSpy.getCall(0).args[0];
      expect(firstCallProps).to.have.property('uploadedSize');
      expect(firstCallProps).to.have.property('uploadedSizeText');
      expect(firstCallProps).to.have.property('etaText');
      expect(firstCallProps).to.have.property('percentage');
      expect(firstCallProps).to.have.property('totalSize');
      expect(firstCallProps).to.have.property('totalSizeText');
    });

    it('should use fileSizeFormatter to generate file size text in renderUploadProgress props', function () {
      var fileSizeFormatterSpy = sinon.spy(function (number) {
        return number;
      });
      var renderUploadProgressSpy = sinon.spy(function (props) {
        return _react2.default.createElement('div', null);
      });
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        renderUploadProgress: renderUploadProgressSpy,
        fileSizeFormatter: fileSizeFormatterSpy,
        file: { size: 42 },
        uploadProgress: { uploadedSize: 1000, eta: 13 * 60 * 1000 }
      }));

      expect(fileSizeFormatterSpy).to.have.been.calledWith(42);
    });

    it('should use timeFormatter to generate time text in renderUploadProgress props', function () {
      var timeFormatterSpy = sinon.spy(function (time) {
        return time;
      });
      var renderUploadProgressSpy = sinon.spy(function (props) {
        return _react2.default.createElement('div', null);
      });
      var ETA = 13 * 60 * 1000;
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        renderUploadProgress: renderUploadProgressSpy,
        timeFormatter: timeFormatterSpy,
        file: { size: 42 },
        uploadProgress: { uploadedSize: 1000, eta: ETA, inProgress: true }
      }));

      expect(timeFormatterSpy).to.have.been.calledWith(ETA);
    });
  });

  describe('erorr message', function () {
    var error = void 0,
        renderFileErrorMessageSpy = void 0;
    beforeEach(function () {
      error = {
        reasson: 'meaning',
        message: 'content'
      };
      renderFileErrorMessageSpy = sinon.spy(function (props) {
        return _react2.default.createElement('div', null);
      });
    });

    it('should show error message from file.invalidDetails', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        renderFileErrorMessage: renderFileErrorMessageSpy,
        file: { size: 42, invalidDetails: [error] }
      }));

      expect(renderFileErrorMessageSpy).to.have.been.calledWith({ error: error });
    });

    it('should show error message from invalidDetails prop', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        invalidDetails: [error],
        renderFileErrorMessage: renderFileErrorMessageSpy,
        file: { size: 42 }
      }));

      expect(renderFileErrorMessageSpy).to.have.been.calledWith({ error: error });
    });

    it('should show error message from uploadProgress.error', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        renderFileErrorMessage: renderFileErrorMessageSpy,
        file: { size: 42 },
        uploadProgress: { uploadedSize: 1000, eta: 0, error: error }
      }));
      expect(renderFileErrorMessageSpy).to.have.been.calledWith({ error: error });
    });
  });

  describe("callback methods", function () {
    var component = void 0,
        onClearClickSpy = void 0,
        onUploadClickSpy = void 0;

    beforeEach('file item with callbacks initialisation', function () {

      onClearClickSpy = sinon.spy();
      onUploadClickSpy = sinon.spy();

      component = (0, _enzyme.shallow)(_react2.default.createElement(_FileItem2.default, {
        onClearClick: onClearClickSpy,
        onUploadClick: onUploadClickSpy,
        file: { size: 42 },
        uploadProgress: {}
      }));
    });

    describe('while upload not in progress for target file', function () {
      it('should call onClearClick when clicking on clear button', function () {
        var triggerClearWrapper = component.find('.' + _FileItem.CLASS_NAME + '__clear-icon__trigger');
        triggerClearWrapper.simulate('click');
        expect(onClearClickSpy).to.have.been.calledOnce;
      });
      it('should call onUploadClick when clicking on upload button', function () {
        var triggerUploadWrapper = component.find('.' + _FileItem.CLASS_NAME + '__upload-button__trigger');
        triggerUploadWrapper.simulate('click');
        expect(onUploadClickSpy).to.have.been.calledOnce;
      });
    });

    describe('while upload in progress for target file', function () {
      beforeEach('setting uploadProgress inProgress', function () {
        component.setProps({
          uploadProgress: {
            inProgress: true
          }
        });
      });

      it('should not call onClearClick when clicking on clear button', function () {
        var triggerClearWrapper = component.find('.' + _FileItem.CLASS_NAME + '__clear-icon__trigger');
        triggerClearWrapper.simulate('click');
        expect(onClearClickSpy).to.not.have.been.called;
      });

      it('should not call onUploadClick when clicking on upload button', function () {
        var triggerUploadWrapper = component.find('.' + _FileItem.CLASS_NAME + '__upload-button__trigger');
        triggerUploadWrapper.simulate('click');
        expect(onUploadClickSpy).to.not.have.been.called;
      });
    });
  });
});