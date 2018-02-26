'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _mock = require('./mock.files');

var _FileList = require('../src/FileList');

var _FileList2 = _interopRequireDefault(_FileList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FileList', function () {

  describe('basic behavior', function () {
    it('creates instance of FileList', function () {
      var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileList2.default, null));

      expect(component.instance()).to.be.instanceOf(_FileList2.default);
    });

    it('passes dom props to wrapper node', function () {
      var EXTRA_CLASS_NAME = 'extra-class-name';
      var STYLE = { padding: 5 };
      var TAB_INDEX = '1';
      var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileList2.default, {
        className: EXTRA_CLASS_NAME,
        style: STYLE,
        tabIndex: TAB_INDEX
      }));

      var props = component.props();

      expect(props.className).to.contain(EXTRA_CLASS_NAME);
      expect(props.style).to.equal(STYLE);
      expect(props.tabIndex).to.equal(TAB_INDEX);
    });
  });

  describe('external api', function () {

    describe('callbacks', function () {
      it('onChange');
      it('onClearClick');
      it('onUploadClick');
    });

    describe('methods', function () {
      it('getFiles', function () {
        var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileList2.default, {
          defaultFiles: _mock.files
        }));

        var instance = component.instance();
        expect(instance).to.have.property('getFiles');

        var receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal(_mock.files);
      });

      it('clearFiles', function () {
        var onChangeSpy = sinon.spy();
        var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileList2.default, {
          defaultFiles: _mock.files,
          onChange: onChangeSpy
        }));

        var instance = component.instance();
        expect(instance).to.have.property('clearFiles');
        instance.clearFiles();
        var receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal([]);

        expect(onChangeSpy).to.have.been.calledWith([]);
      });

      it('addFile', function () {
        var onChangeSpy = sinon.spy();
        var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileList2.default, {
          defaultFiles: _mock.files,
          onChange: onChangeSpy
        }));

        var instance = component.instance();
        expect(instance).to.have.property('addFile');
        var newFile = {
          name: 'new file',
          size: 23,
          id: 6
        };
        instance.addFile(newFile);
        var expectedNewFiles = _mock.files.concat([newFile]);
        var receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal(expectedNewFiles);

        expect(onChangeSpy).to.have.been.calledWith(expectedNewFiles);
      });

      it('addFiles', function () {
        var onChangeSpy = sinon.spy();
        var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileList2.default, {
          defaultFiles: _mock.files,
          onChange: onChangeSpy
        }));

        var instance = component.instance();
        expect(instance).to.have.property('addFiles');
        var newFile = {
          name: 'new file',
          size: 23,
          id: 6
        };
        instance.addFiles([newFile]);
        var expectedNewFiles = _mock.files.concat([newFile]);
        var receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal(expectedNewFiles);

        expect(onChangeSpy).to.have.been.calledWith(expectedNewFiles);
      });

      it('removeFile', function () {
        var onChangeSpy = sinon.spy();
        var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileList2.default, {
          defaultFiles: _mock.files,
          onChange: onChangeSpy
        }));

        var instance = component.instance();
        expect(instance).to.have.property('removeFile');
        instance.removeFile(_mock.files[0].id);
        var expectedNewFiles = _mock.files.slice(1);
        var receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal(expectedNewFiles);

        expect(onChangeSpy).to.have.been.calledWith(expectedNewFiles);
      });

      it('removeFileAt', function () {
        var onChangeSpy = sinon.spy();
        var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileList2.default, {
          defaultFiles: _mock.files,
          onChange: onChangeSpy
        }));

        var instance = component.instance();
        expect(instance).to.have.property('removeFileAt');
        instance.removeFileAt(0);
        var expectedNewFiles = _mock.files.slice(1);
        var receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal(expectedNewFiles);

        expect(onChangeSpy).to.have.been.calledWith(expectedNewFiles);
      });
    });
  });

  describe('file item ui hooks', function () {
    var component = void 0,
        fileItem = void 0,
        renderFileExtensionIconSpy = void 0,
        renderClearIconSpy = void 0,
        renderFileNameSpy = void 0,
        renderFileErrorMessageSpy = void 0,
        renderFileSizeSpy = void 0,
        renderUploadProgressSpy = void 0,
        fileSizeFormatterSpy = void 0,
        timeFormatterSpy = void 0,
        locale = 'en-GB';

    beforeEach('instantiate file list with file item hooks', function () {
      renderFileExtensionIconSpy = sinon.spy();
      renderClearIconSpy = sinon.spy();
      renderFileNameSpy = sinon.spy();
      renderFileErrorMessageSpy = sinon.spy();
      renderFileSizeSpy = sinon.spy();
      renderUploadProgressSpy = sinon.spy();
      timeFormatterSpy = sinon.spy();
      fileSizeFormatterSpy = sinon.spy();

      component = (0, _enzyme.shallow)(_react2.default.createElement(_FileList2.default, {
        renderFileExtensionIcon: renderFileExtensionIconSpy,
        renderClearIcon: renderClearIconSpy,
        renderFileName: renderFileNameSpy,
        renderFileErrorMessage: renderFileErrorMessageSpy,
        renderFileSize: renderFileSizeSpy,
        renderUploadProgress: renderUploadProgressSpy,
        timeFormatter: timeFormatterSpy,
        fileSizeFormatter: fileSizeFormatterSpy,
        locale: locale,
        defaultFiles: _mock.files
      }));

      fileItem = component.find('FileItem').first();
    });

    it('renderFileExtensionIcon', function () {
      expect(fileItem.prop('renderFileExtensionIcon')).to.equal(renderFileExtensionIconSpy);
    });

    it('renderClearIcon', function () {
      expect(fileItem.prop('renderClearIcon')).to.equal(renderClearIconSpy);
    });

    it('renderFileName', function () {
      expect(fileItem.prop('renderFileName')).to.equal(renderFileNameSpy);
    });

    it('renderFileErrorMessage', function () {
      expect(fileItem.prop('renderFileErrorMessage')).to.equal(renderFileErrorMessageSpy);
    });

    it('renderFileSize', function () {
      expect(fileItem.prop('renderFileSize')).to.equal(renderFileSizeSpy);
    });

    it('renderUploadProgress', function () {
      expect(fileItem.prop('renderUploadProgress')).to.equal(renderUploadProgressSpy);
    });

    describe('file item utils/props', function () {
      it('fileSizeFormatter', function () {
        expect(fileItem.prop('fileSizeFormatter')).to.equal(fileSizeFormatterSpy);
      });
      it('timeFormatter', function () {
        expect(fileItem.prop('timeFormatter')).to.equal(timeFormatterSpy);
      });
      it('locale', function () {
        expect(fileItem.prop('locale')).to.equal(locale);
      });
    });

    describe('file item props', function () {
      it('internal onClearClick');
      it('internal onUploadClick');
    });
  });

  describe('controlled mode behavior', function () {
    it('only calls on change when removing');
    it('ignores add file methods');
  });
});