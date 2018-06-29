/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';

import { files } from '../mock.files';
import FileList from '../src/FileList';
import FileItem from '../src/FileItem';

describe('FileList', () => {
  describe('basic behavior', () => {
    it('creates instance of FileList', () => {
      const component = mount(<FileList />);

      expect(component.instance()).toBeInstanceOf(FileList);
    });

    it('passes dom props to wrapper node', () => {
      const EXTRA_CLASS_NAME = 'extra-class-name';
      const STYLE = { padding: 5 };
      const TAB_INDEX = '1';
      const component = mount(
        <FileList
          className={EXTRA_CLASS_NAME}
          style={STYLE}
          tabIndex={TAB_INDEX}
        />
      );

      const props = component.props();

      expect(props.className).toContain(EXTRA_CLASS_NAME);
      expect(props.style).toEqual(STYLE);
      expect(props.tabIndex).toEqual(TAB_INDEX);
    });
  });

  describe('external api', () => {
    describe('methods', () => {
      it('getFiles', () => {
        const component = mount(<FileList defaultFiles={files} />);

        const instance = component.instance();
        expect(instance).toHaveProperty('getFiles');

        const receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual(files);
      });

      it('clearFiles', () => {
        const onChangeSpy = jest.fn(() => {});
        const component = mount(
          <FileList defaultFiles={files} onChange={onChangeSpy} />
        );

        const instance = component.instance();
        expect(instance).toHaveProperty('clearFiles');
        instance.clearFiles();
        const receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual([]);

        expect(onChangeSpy.mock.calls[0][0]).toEqual([]);
      });

      it('addFile', () => {
        const onChangeSpy = jest.fn(() => {});
        const component = mount(
          <FileList defaultFiles={files} onChange={onChangeSpy} />
        );

        const instance = component.instance();
        expect(instance).toHaveProperty('addFile');
        const newFile = {
          name: 'new file',
          size: 23,
          id: 6
        };
        instance.addFile(newFile);
        const expectedNewFiles = files.concat([newFile]);
        const receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual(expectedNewFiles);

        expect(onChangeSpy.mock.calls[0][0]).toEqual(expectedNewFiles);
      });

      it('addFiles', () => {
        const onChangeSpy = jest.fn(() => {});
        const component = mount(
          <FileList defaultFiles={files} onChange={onChangeSpy} />
        );

        const instance = component.instance();
        expect(instance).toHaveProperty('addFiles');
        const newFile = {
          name: 'new file',
          size: 23,
          id: 6
        };
        instance.addFiles([newFile]);
        const expectedNewFiles = files.concat([newFile]);
        const receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual(expectedNewFiles);

        expect(onChangeSpy.mock.calls[0][0]).toEqual(expectedNewFiles);
      });

      it('removeFile', () => {
        const onChangeSpy = jest.fn(() => {});
        const component = mount(
          <FileList defaultFiles={files} onChange={onChangeSpy} />
        );

        const instance = component.instance();
        expect(instance).toHaveProperty('removeFile');
        instance.removeFile(files[0].id);
        const expectedNewFiles = files.slice(1);
        const receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual(expectedNewFiles);

        expect(onChangeSpy.mock.calls[0][0]).toEqual(expectedNewFiles);
      });

      it('removeFileAt', () => {
        const onChangeSpy = jest.fn(() => {});
        const component = mount(
          <FileList defaultFiles={files} onChange={onChangeSpy} />
        );

        const instance = component.instance();
        expect(instance).toHaveProperty('removeFileAt');
        instance.removeFileAt(0);
        const expectedNewFiles = files.slice(1);
        const receivedFiles = instance.getFiles();
        expect(receivedFiles).toEqual(expectedNewFiles);

        expect(onChangeSpy.mock.calls[0][0]).toEqual(expectedNewFiles);
      });
    });
  });

  describe('file item ui hooks', () => {
    let component,
      fileItem,
      renderFileExtensionIconSpy,
      renderClearIconSpy,
      renderFileNameSpy,
      renderFileErrorMessageSpy,
      renderFileSizeSpy,
      renderUploadProgressSpy,
      fileSizeFormatterSpy,
      timeFormatterSpy,
      locale = 'en-GB';

    it('renderFileExtensionIcon', () => {
      renderFileExtensionIconSpy = jest.fn(() => {});
      renderClearIconSpy = jest.fn(() => {});
      renderFileNameSpy = jest.fn(() => {});
      renderFileErrorMessageSpy = jest.fn(() => {});
      renderFileSizeSpy = jest.fn(() => {});
      renderUploadProgressSpy = jest.fn(() => {});
      timeFormatterSpy = jest.fn(() => {});
      fileSizeFormatterSpy = jest.fn(() => {});

      component = mount(
        <FileList
          renderFileExtensionIcon={renderFileExtensionIconSpy}
          renderClearIcon={renderClearIconSpy}
          renderFileName={renderFileNameSpy}
          renderFileErrorMessage={renderFileErrorMessageSpy}
          renderFileSize={renderFileSizeSpy}
          renderUploadProgress={renderUploadProgressSpy}
          timeFormatter={timeFormatterSpy}
          fileSizeFormatter={fileSizeFormatterSpy}
          locale={locale}
          defaultFiles={files}
        />
      );

      fileItem = component.find(FileItem).first();
      expect(fileItem.prop('renderFileExtensionIcon')).toEqual(
        renderFileExtensionIconSpy
      );
    });

    it('renderClearIcon', () => {
      renderFileExtensionIconSpy = jest.fn(() => {});
      renderClearIconSpy = jest.fn(() => {});
      renderFileNameSpy = jest.fn(() => {});
      renderFileErrorMessageSpy = jest.fn(() => {});
      renderFileSizeSpy = jest.fn(() => {});
      renderUploadProgressSpy = jest.fn(() => {});
      timeFormatterSpy = jest.fn(() => {});
      fileSizeFormatterSpy = jest.fn(() => {});

      component = mount(
        <FileList
          renderFileExtensionIcon={renderFileExtensionIconSpy}
          renderClearIcon={renderClearIconSpy}
          renderFileName={renderFileNameSpy}
          renderFileErrorMessage={renderFileErrorMessageSpy}
          renderFileSize={renderFileSizeSpy}
          renderUploadProgress={renderUploadProgressSpy}
          timeFormatter={timeFormatterSpy}
          fileSizeFormatter={fileSizeFormatterSpy}
          locale={locale}
          defaultFiles={files}
        />
      );

      fileItem = component.find(FileItem).first();
      expect(fileItem.prop('renderClearIcon')).toEqual(renderClearIconSpy);
    });

    it('renderFileName', () => {
      renderFileExtensionIconSpy = jest.fn(() => {});
      renderClearIconSpy = jest.fn(() => {});
      renderFileNameSpy = jest.fn(() => {});
      renderFileErrorMessageSpy = jest.fn(() => {});
      renderFileSizeSpy = jest.fn(() => {});
      renderUploadProgressSpy = jest.fn(() => {});
      timeFormatterSpy = jest.fn(() => {});
      fileSizeFormatterSpy = jest.fn(() => {});

      component = mount(
        <FileList
          renderFileExtensionIcon={renderFileExtensionIconSpy}
          renderClearIcon={renderClearIconSpy}
          renderFileName={renderFileNameSpy}
          renderFileErrorMessage={renderFileErrorMessageSpy}
          renderFileSize={renderFileSizeSpy}
          renderUploadProgress={renderUploadProgressSpy}
          timeFormatter={timeFormatterSpy}
          fileSizeFormatter={fileSizeFormatterSpy}
          locale={locale}
          defaultFiles={files}
        />
      );

      fileItem = component.find(FileItem).first();
      expect(fileItem.prop('renderFileName')).toEqual(renderFileNameSpy);
    });

    it('renderFileErrorMessage', () => {
      renderFileExtensionIconSpy = jest.fn(() => {});
      renderClearIconSpy = jest.fn(() => {});
      renderFileNameSpy = jest.fn(() => {});
      renderFileErrorMessageSpy = jest.fn(() => {});
      renderFileSizeSpy = jest.fn(() => {});
      renderUploadProgressSpy = jest.fn(() => {});
      timeFormatterSpy = jest.fn(() => {});
      fileSizeFormatterSpy = jest.fn(() => {});

      component = mount(
        <FileList
          renderFileExtensionIcon={renderFileExtensionIconSpy}
          renderClearIcon={renderClearIconSpy}
          renderFileName={renderFileNameSpy}
          renderFileErrorMessage={renderFileErrorMessageSpy}
          renderFileSize={renderFileSizeSpy}
          renderUploadProgress={renderUploadProgressSpy}
          timeFormatter={timeFormatterSpy}
          fileSizeFormatter={fileSizeFormatterSpy}
          locale={locale}
          defaultFiles={files}
        />
      );

      fileItem = component.find(FileItem).first();
      expect(fileItem.prop('renderFileErrorMessage')).toEqual(
        renderFileErrorMessageSpy
      );
    });

    it('renderFileSize', () => {
      renderFileExtensionIconSpy = jest.fn(() => {});
      renderClearIconSpy = jest.fn(() => {});
      renderFileNameSpy = jest.fn(() => {});
      renderFileErrorMessageSpy = jest.fn(() => {});
      renderFileSizeSpy = jest.fn(() => {});
      renderUploadProgressSpy = jest.fn(() => {});
      timeFormatterSpy = jest.fn(() => {});
      fileSizeFormatterSpy = jest.fn(() => {});

      component = mount(
        <FileList
          renderFileExtensionIcon={renderFileExtensionIconSpy}
          renderClearIcon={renderClearIconSpy}
          renderFileName={renderFileNameSpy}
          renderFileErrorMessage={renderFileErrorMessageSpy}
          renderFileSize={renderFileSizeSpy}
          renderUploadProgress={renderUploadProgressSpy}
          timeFormatter={timeFormatterSpy}
          fileSizeFormatter={fileSizeFormatterSpy}
          locale={locale}
          defaultFiles={files}
        />
      );

      fileItem = component.find(FileItem).first();
      expect(fileItem.prop('renderFileSize')).toEqual(renderFileSizeSpy);
    });

    it('renderUploadProgress', () => {
      renderFileExtensionIconSpy = jest.fn(() => {});
      renderClearIconSpy = jest.fn(() => {});
      renderFileNameSpy = jest.fn(() => {});
      renderFileErrorMessageSpy = jest.fn(() => {});
      renderFileSizeSpy = jest.fn(() => {});
      renderUploadProgressSpy = jest.fn(() => {});
      timeFormatterSpy = jest.fn(() => {});
      fileSizeFormatterSpy = jest.fn(() => {});

      component = mount(
        <FileList
          renderFileExtensionIcon={renderFileExtensionIconSpy}
          renderClearIcon={renderClearIconSpy}
          renderFileName={renderFileNameSpy}
          renderFileErrorMessage={renderFileErrorMessageSpy}
          renderFileSize={renderFileSizeSpy}
          renderUploadProgress={renderUploadProgressSpy}
          timeFormatter={timeFormatterSpy}
          fileSizeFormatter={fileSizeFormatterSpy}
          locale={locale}
          defaultFiles={files}
        />
      );

      fileItem = component.find(FileItem).first();
      expect(fileItem.prop('renderUploadProgress')).toEqual(
        renderUploadProgressSpy
      );
    });

    describe('file item utils/props', () => {
      it('fileSizeFormatter', () => {
        renderFileExtensionIconSpy = jest.fn(() => {});
        renderClearIconSpy = jest.fn(() => {});
        renderFileNameSpy = jest.fn(() => {});
        renderFileErrorMessageSpy = jest.fn(() => {});
        renderFileSizeSpy = jest.fn(() => {});
        renderUploadProgressSpy = jest.fn(() => {});
        timeFormatterSpy = jest.fn(() => {});
        fileSizeFormatterSpy = jest.fn(() => {});

        component = mount(
          <FileList
            renderFileExtensionIcon={renderFileExtensionIconSpy}
            renderClearIcon={renderClearIconSpy}
            renderFileName={renderFileNameSpy}
            renderFileErrorMessage={renderFileErrorMessageSpy}
            renderFileSize={renderFileSizeSpy}
            renderUploadProgress={renderUploadProgressSpy}
            timeFormatter={timeFormatterSpy}
            fileSizeFormatter={fileSizeFormatterSpy}
            locale={locale}
            defaultFiles={files}
          />
        );

        fileItem = component.find(FileItem).first();
        expect(fileItem.prop('fileSizeFormatter')).toEqual(
          fileSizeFormatterSpy
        );
      });
      it('timeFormatter', () => {
        renderFileExtensionIconSpy = jest.fn(() => {});
        renderClearIconSpy = jest.fn(() => {});
        renderFileNameSpy = jest.fn(() => {});
        renderFileErrorMessageSpy = jest.fn(() => {});
        renderFileSizeSpy = jest.fn(() => {});
        renderUploadProgressSpy = jest.fn(() => {});
        timeFormatterSpy = jest.fn(() => {});
        fileSizeFormatterSpy = jest.fn(() => {});

        component = mount(
          <FileList
            renderFileExtensionIcon={renderFileExtensionIconSpy}
            renderClearIcon={renderClearIconSpy}
            renderFileName={renderFileNameSpy}
            renderFileErrorMessage={renderFileErrorMessageSpy}
            renderFileSize={renderFileSizeSpy}
            renderUploadProgress={renderUploadProgressSpy}
            timeFormatter={timeFormatterSpy}
            fileSizeFormatter={fileSizeFormatterSpy}
            locale={locale}
            defaultFiles={files}
          />
        );

        fileItem = component.find(FileItem).first();
        expect(fileItem.prop('timeFormatter')).toEqual(timeFormatterSpy);
      });
      it('locale', () => {
        renderFileExtensionIconSpy = jest.fn(() => {});
        renderClearIconSpy = jest.fn(() => {});
        renderFileNameSpy = jest.fn(() => {});
        renderFileErrorMessageSpy = jest.fn(() => {});
        renderFileSizeSpy = jest.fn(() => {});
        renderUploadProgressSpy = jest.fn(() => {});
        timeFormatterSpy = jest.fn(() => {});
        fileSizeFormatterSpy = jest.fn(() => {});

        component = mount(
          <FileList
            renderFileExtensionIcon={renderFileExtensionIconSpy}
            renderClearIcon={renderClearIconSpy}
            renderFileName={renderFileNameSpy}
            renderFileErrorMessage={renderFileErrorMessageSpy}
            renderFileSize={renderFileSizeSpy}
            renderUploadProgress={renderUploadProgressSpy}
            timeFormatter={timeFormatterSpy}
            fileSizeFormatter={fileSizeFormatterSpy}
            locale={locale}
            defaultFiles={files}
          />
        );

        fileItem = component.find(FileItem).first();
        expect(fileItem.prop('locale')).toEqual(locale);
      });
    });
  });
});
