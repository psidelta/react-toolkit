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
    expect(component.instance()).toBeInstanceOf(_FileItem2.default);
  });

  describe('defaults', function () {
    it('should have default renderFileExtension', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.getElement().props).toHaveProperty('renderFileExtensionIcon');
      expect(component.getElement().props.renderFileExtensionIcon).toBeInstanceOf(Function);
    });

    it('should have default renderClearIcon', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.getElement().props).toHaveProperty('renderClearIcon');
      expect(component.getElement().props.renderClearIcon).toBeInstanceOf(Function);
    });

    it('should have default renderFileName', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.getElement().props).toHaveProperty('renderFileName');
      expect(component.getElement().props.renderFileName).toBeInstanceOf(Function);
    });

    it('should have default renderFileSize', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.getElement().props).toHaveProperty('renderFileSize');
      expect(component.getElement().props.renderFileSize).toBeInstanceOf(Function);
    });

    it('should have default renderFileErrorMessage', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.getElement().props).toHaveProperty('renderFileErrorMessage');
      expect(component.getElement().props.renderFileErrorMessage).toBeInstanceOf(Function);
    });

    it('should have default renderUploadButton', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.getElement().props).toHaveProperty('renderUploadButton');
      expect(component.getElement().props.renderUploadButton).toBeInstanceOf(Function);
    });

    it('should have default renderUploadProgress', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, null));
      expect(component.getElement().props).toHaveProperty('renderUploadProgress');
      expect(component.getElement().props.renderUploadProgress).toBeInstanceOf(Function);
    });
  });

  describe('renderFileSize params', function () {
    it('should generate meaninful props for renderFileSize');
    it('should use fileSizeFormatter to generate file size text in renderFileSize props');
  });

  describe('uploadProgress', function () {
    it('should call renderUploadProgress when uploadProgress prop has meaningful details', function () {
      var renderUploadProgressSpy = jest.fn(function (props) {
        return _react2.default.createElement('div', null);
      });
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, { renderUploadProgress: renderUploadProgressSpy }));

      expect(renderUploadProgressSpy).toHaveBeenCalledTimes(0);
      component.setProps({
        uploadProgress: {
          uploadedSize: 1000,
          eta: 13 * 60 * 1000,
          inProgress: true
        }
      });

      expect(renderUploadProgressSpy).toHaveBeenCalledTimes(1);
    });

    it('should generate meaningful props for renderUploadProgress', function () {
      var renderUploadProgressSpy = jest.fn(function (props) {
        return _react2.default.createElement('div', null);
      });
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        renderUploadProgress: renderUploadProgressSpy,
        uploadProgress: {
          uploadedSize: 1000,
          eta: 13 * 60 * 1000,
          inProgress: true
        }
      }));

      expect(renderUploadProgressSpy).toHaveBeenCalledTimes(1);

      var firstCallProps = renderUploadProgressSpy.mock.calls[0][0];
      expect(firstCallProps).toHaveProperty('uploadedSize');
      expect(firstCallProps).toHaveProperty('uploadedSizeText');
      expect(firstCallProps).toHaveProperty('etaText');
      expect(firstCallProps).toHaveProperty('percentage');
      expect(firstCallProps).toHaveProperty('totalSize');
      expect(firstCallProps).toHaveProperty('totalSizeText');
    });

    xit('should use fileSizeFormatter to generate file size text in renderUploadProgress props', function () {
      var fileSizeFormatterSpy = jest.fn(function (number) {
        return number;
      });
      var renderUploadProgressSpy = jest.fn(function (props) {
        return _react2.default.createElement('div', null);
      });
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        renderUploadProgress: renderUploadProgressSpy,
        fileSizeFormatter: fileSizeFormatterSpy,
        file: { size: 42 },
        uploadProgress: { uploadedSize: 1000, eta: 13 * 60 * 1000 }
      }));

      expect(fileSizeFormatterSpy.mock.calls[0][0]).toEqual(42);
    });

    it('should use timeFormatter to generate time text in renderUploadProgress props', function () {
      var timeFormatterSpy = jest.fn(function (time) {
        return time;
      });
      var renderUploadProgressSpy = jest.fn(function (props) {
        return _react2.default.createElement('div', null);
      });
      var ETA = 13 * 60 * 1000;
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        renderUploadProgress: renderUploadProgressSpy,
        timeFormatter: timeFormatterSpy,
        file: { size: 42 },
        uploadProgress: { uploadedSize: 1000, eta: ETA, inProgress: true }
      }));

      expect(timeFormatterSpy.mock.calls[0][0]).toEqual(ETA);
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
      renderFileErrorMessageSpy = jest.fn(function (props) {
        return _react2.default.createElement('div', null);
      });
    });

    it('should show error message from file.invalidDetails', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        renderFileErrorMessage: renderFileErrorMessageSpy,
        file: { size: 42, invalidDetails: [error] }
      }));

      expect(renderFileErrorMessageSpy.mock.calls[0][0]).toEqual({ error: error });
    });

    it('should show error message from invalidDetails prop', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        invalidDetails: [error],
        renderFileErrorMessage: renderFileErrorMessageSpy,
        file: { size: 42 }
      }));

      expect(renderFileErrorMessageSpy.mock.calls[0][0]).toEqual({ error: error });
    });

    it('should show error message from uploadProgress.error', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
        renderFileErrorMessage: renderFileErrorMessageSpy,
        file: { size: 42 },
        uploadProgress: { uploadedSize: 1000, eta: 0, error: error }
      }));
      expect(renderFileErrorMessageSpy.mock.calls[0][0]).toEqual({ error: error });
    });
  });

  describe('callback methods', function () {
    var component = void 0,
        onClearClickSpy = void 0,
        onUploadClickSpy = void 0;

    describe('while upload not in progress for target file', function () {
      it('should call onClearClick when clicking on clear button', function () {
        onClearClickSpy = jest.fn();
        onUploadClickSpy = jest.fn();

        component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
          onClearClick: onClearClickSpy,
          onUploadClick: onUploadClickSpy,
          file: { size: 42 },
          uploadProgress: {}
        }));

        var triggerClearWrapper = component.find('.' + _FileItem.CLASS_NAME + '__clear-icon__trigger');
        triggerClearWrapper.simulate('click');
        expect(onClearClickSpy).toHaveBeenCalledTimes(1);
      });
      xit('should call onUploadClick when clicking on upload button', function () {
        onClearClickSpy = jest.fn();
        onUploadClickSpy = jest.fn();

        component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
          onClearClick: onClearClickSpy,
          onUploadClick: onUploadClickSpy,
          file: { size: 42 },
          uploadProgress: {}
        }));
        var triggerUploadWrapper = component.find('div.' + _FileItem.CLASS_NAME + '__upload-button__trigger');
        // .first();

        triggerUploadWrapper.simulate('click');
        expect(onUploadClickSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('while upload in progress for target file', function () {
      xit('should not call onClearClick when clicking on clear button', function () {
        var onClearClickSpy = jest.fn();
        var onUploadClickSpy = jest.fn();

        component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
          onClearClick: onClearClickSpy,
          onUploadClick: onUploadClickSpy,
          file: { size: 42 },
          uploadProgress: {
            inProgress: true
          }
        }));
        var triggerClearWrapper = component.find('.' + _FileItem.CLASS_NAME + '__clear-icon__trigger');
        triggerClearWrapper.simulate('click');
        expect(onClearClickSpy).toHaveBeenCalledTimes(0);
      });

      xit('should not call onUploadClick when clicking on upload button', function () {
        onClearClickSpy = jest.fn();
        onUploadClickSpy = jest.fn();

        component = (0, _enzyme.mount)(_react2.default.createElement(_FileItem2.default, {
          onClearClick: onClearClickSpy,
          onUploadClick: onUploadClickSpy,
          file: { size: 42 },
          uploadProgress: {
            inProgress: true
          }
        }));
        var triggerUploadWrapper = component.find('.' + _FileItem.CLASS_NAME + '__upload-button__trigger');
        triggerUploadWrapper.simulate('click');
        expect(onUploadClickSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});