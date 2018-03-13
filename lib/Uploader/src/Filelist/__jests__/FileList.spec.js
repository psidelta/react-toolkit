'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _mock = require('../mock.files');

var _FileList = require('../src/FileList');

var _FileList2 = _interopRequireDefault(_FileList);

var _FileItem = require('../src/FileItem');

var _FileItem2 = _interopRequireDefault(_FileItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FileList', function () {
  describe('basic behavior', function () {
    it('creates instance of FileList', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, null));

      expect(component.instance()).toBeInstanceOf(_FileList2.default);
    });

    it('passes dom props to wrapper node', function () {
      var EXTRA_CLASS_NAME = 'extra-class-name';
      var STYLE = { padding: 5 };
      var TAB_INDEX = '1';
      var component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, {
        className: EXTRA_CLASS_NAME,
        style: STYLE,
        tabIndex: TAB_INDEX
      }));

      var props = component.props();

      expect(props.className).toContain(EXTRA_CLASS_NAME);
      expect(props.style).toEqual(STYLE);
      expect(props.tabIndex).toEqual(TAB_INDEX);
    });
  });

  describe('external api', function () {
    // describe('callbacks', () => {
    //   xit('onChange');
    //   xit('onClearClick');
    //   xit('onUploadClick');
    // });

    describe('methods', function () {
      it('getFiles', function () {
        var component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, { defaultFiles: _mock.files }));

        var instance = component.instance();
        expect(instance).toHaveProperty('getFiles');

        var receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual(_mock.files);
      });

      it('clearFiles', function () {
        var onChangeSpy = jest.fn(function () {});
        var component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, { defaultFiles: _mock.files, onChange: onChangeSpy }));

        var instance = component.instance();
        expect(instance).toHaveProperty('clearFiles');
        instance.clearFiles();
        var receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual([]);

        expect(onChangeSpy.mock.calls[0][0]).toEqual([]);
      });

      it('addFile', function () {
        var onChangeSpy = jest.fn(function () {});
        var component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, { defaultFiles: _mock.files, onChange: onChangeSpy }));

        var instance = component.instance();
        expect(instance).toHaveProperty('addFile');
        var newFile = {
          name: 'new file',
          size: 23,
          id: 6
        };
        instance.addFile(newFile);
        var expectedNewFiles = _mock.files.concat([newFile]);
        var receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual(expectedNewFiles);

        expect(onChangeSpy.mock.calls[0][0]).toEqual(expectedNewFiles);
      });

      it('addFiles', function () {
        var onChangeSpy = jest.fn(function () {});
        var component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, { defaultFiles: _mock.files, onChange: onChangeSpy }));

        var instance = component.instance();
        expect(instance).toHaveProperty('addFiles');
        var newFile = {
          name: 'new file',
          size: 23,
          id: 6
        };
        instance.addFiles([newFile]);
        var expectedNewFiles = _mock.files.concat([newFile]);
        var receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual(expectedNewFiles);

        expect(onChangeSpy.mock.calls[0][0]).toEqual(expectedNewFiles);
      });

      it('removeFile', function () {
        var onChangeSpy = jest.fn(function () {});
        var component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, { defaultFiles: _mock.files, onChange: onChangeSpy }));

        var instance = component.instance();
        expect(instance).toHaveProperty('removeFile');
        instance.removeFile(_mock.files[0].id);
        var expectedNewFiles = _mock.files.slice(1);
        var receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual(expectedNewFiles);

        expect(onChangeSpy.mock.calls[0][0]).toEqual(expectedNewFiles);
      });

      it('removeFileAt', function () {
        var onChangeSpy = jest.fn(function () {});
        var component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, { defaultFiles: _mock.files, onChange: onChangeSpy }));

        var instance = component.instance();
        expect(instance).toHaveProperty('removeFileAt');
        instance.removeFileAt(0);
        var expectedNewFiles = _mock.files.slice(1);
        var receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual(expectedNewFiles);

        expect(onChangeSpy.mock.calls[0][0]).toEqual(expectedNewFiles);
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

    it('renderFileExtensionIcon', function () {
      renderFileExtensionIconSpy = jest.fn(function () {});
      renderClearIconSpy = jest.fn(function () {});
      renderFileNameSpy = jest.fn(function () {});
      renderFileErrorMessageSpy = jest.fn(function () {});
      renderFileSizeSpy = jest.fn(function () {});
      renderUploadProgressSpy = jest.fn(function () {});
      timeFormatterSpy = jest.fn(function () {});
      fileSizeFormatterSpy = jest.fn(function () {});

      component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, {
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

      fileItem = component.find(_FileItem2.default).first();
      expect(fileItem.prop('renderFileExtensionIcon')).toEqual(renderFileExtensionIconSpy);
    });

    it('renderClearIcon', function () {
      renderFileExtensionIconSpy = jest.fn(function () {});
      renderClearIconSpy = jest.fn(function () {});
      renderFileNameSpy = jest.fn(function () {});
      renderFileErrorMessageSpy = jest.fn(function () {});
      renderFileSizeSpy = jest.fn(function () {});
      renderUploadProgressSpy = jest.fn(function () {});
      timeFormatterSpy = jest.fn(function () {});
      fileSizeFormatterSpy = jest.fn(function () {});

      component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, {
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

      fileItem = component.find(_FileItem2.default).first();
      expect(fileItem.prop('renderClearIcon')).toEqual(renderClearIconSpy);
    });

    it('renderFileName', function () {
      renderFileExtensionIconSpy = jest.fn(function () {});
      renderClearIconSpy = jest.fn(function () {});
      renderFileNameSpy = jest.fn(function () {});
      renderFileErrorMessageSpy = jest.fn(function () {});
      renderFileSizeSpy = jest.fn(function () {});
      renderUploadProgressSpy = jest.fn(function () {});
      timeFormatterSpy = jest.fn(function () {});
      fileSizeFormatterSpy = jest.fn(function () {});

      component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, {
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

      fileItem = component.find(_FileItem2.default).first();
      expect(fileItem.prop('renderFileName')).toEqual(renderFileNameSpy);
    });

    it('renderFileErrorMessage', function () {
      renderFileExtensionIconSpy = jest.fn(function () {});
      renderClearIconSpy = jest.fn(function () {});
      renderFileNameSpy = jest.fn(function () {});
      renderFileErrorMessageSpy = jest.fn(function () {});
      renderFileSizeSpy = jest.fn(function () {});
      renderUploadProgressSpy = jest.fn(function () {});
      timeFormatterSpy = jest.fn(function () {});
      fileSizeFormatterSpy = jest.fn(function () {});

      component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, {
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

      fileItem = component.find(_FileItem2.default).first();
      expect(fileItem.prop('renderFileErrorMessage')).toEqual(renderFileErrorMessageSpy);
    });

    it('renderFileSize', function () {
      renderFileExtensionIconSpy = jest.fn(function () {});
      renderClearIconSpy = jest.fn(function () {});
      renderFileNameSpy = jest.fn(function () {});
      renderFileErrorMessageSpy = jest.fn(function () {});
      renderFileSizeSpy = jest.fn(function () {});
      renderUploadProgressSpy = jest.fn(function () {});
      timeFormatterSpy = jest.fn(function () {});
      fileSizeFormatterSpy = jest.fn(function () {});

      component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, {
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

      fileItem = component.find(_FileItem2.default).first();
      expect(fileItem.prop('renderFileSize')).toEqual(renderFileSizeSpy);
    });

    it('renderUploadProgress', function () {
      renderFileExtensionIconSpy = jest.fn(function () {});
      renderClearIconSpy = jest.fn(function () {});
      renderFileNameSpy = jest.fn(function () {});
      renderFileErrorMessageSpy = jest.fn(function () {});
      renderFileSizeSpy = jest.fn(function () {});
      renderUploadProgressSpy = jest.fn(function () {});
      timeFormatterSpy = jest.fn(function () {});
      fileSizeFormatterSpy = jest.fn(function () {});

      component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, {
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

      fileItem = component.find(_FileItem2.default).first();
      expect(fileItem.prop('renderUploadProgress')).toEqual(renderUploadProgressSpy);
    });

    describe('file item utils/props', function () {
      it('fileSizeFormatter', function () {
        renderFileExtensionIconSpy = jest.fn(function () {});
        renderClearIconSpy = jest.fn(function () {});
        renderFileNameSpy = jest.fn(function () {});
        renderFileErrorMessageSpy = jest.fn(function () {});
        renderFileSizeSpy = jest.fn(function () {});
        renderUploadProgressSpy = jest.fn(function () {});
        timeFormatterSpy = jest.fn(function () {});
        fileSizeFormatterSpy = jest.fn(function () {});

        component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, {
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

        fileItem = component.find(_FileItem2.default).first();
        expect(fileItem.prop('fileSizeFormatter')).toEqual(fileSizeFormatterSpy);
      });
      it('timeFormatter', function () {
        renderFileExtensionIconSpy = jest.fn(function () {});
        renderClearIconSpy = jest.fn(function () {});
        renderFileNameSpy = jest.fn(function () {});
        renderFileErrorMessageSpy = jest.fn(function () {});
        renderFileSizeSpy = jest.fn(function () {});
        renderUploadProgressSpy = jest.fn(function () {});
        timeFormatterSpy = jest.fn(function () {});
        fileSizeFormatterSpy = jest.fn(function () {});

        component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, {
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

        fileItem = component.find(_FileItem2.default).first();
        expect(fileItem.prop('timeFormatter')).toEqual(timeFormatterSpy);
      });
      it('locale', function () {
        renderFileExtensionIconSpy = jest.fn(function () {});
        renderClearIconSpy = jest.fn(function () {});
        renderFileNameSpy = jest.fn(function () {});
        renderFileErrorMessageSpy = jest.fn(function () {});
        renderFileSizeSpy = jest.fn(function () {});
        renderUploadProgressSpy = jest.fn(function () {});
        timeFormatterSpy = jest.fn(function () {});
        fileSizeFormatterSpy = jest.fn(function () {});

        component = (0, _enzyme.mount)(_react2.default.createElement(_FileList2.default, {
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

        fileItem = component.find(_FileItem2.default).first();
        expect(fileItem.prop('locale')).toEqual(locale);
      });
    });

    // describe('file item props', () => {
    //   xit('internal onClearClick');
    //   xit('internal onUploadClick');
    // });
  });

  // describe('controlled mode behavior', () => {
  //   xit('only calls on change when removing');
  //   xit('ignores add file methods');
  // });
});