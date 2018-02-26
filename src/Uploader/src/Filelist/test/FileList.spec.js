import React from 'react';
import {shallow, mount} from 'enzyme';

import {files} from './mock.files';
import FileList from '../src/FileList';


describe('FileList', () => {

  describe('basic behavior', () => {
    it('creates instance of FileList', () => {
      const component = shallow(<FileList/>);

      expect(component.instance()).to.be.instanceOf(FileList);
    });

    it('passes dom props to wrapper node', () => {
      const EXTRA_CLASS_NAME = 'extra-class-name';
      const STYLE = {padding:5};
      const TAB_INDEX = '1';
      const component = shallow(<FileList
        className={EXTRA_CLASS_NAME}
        style={STYLE}
        tabIndex={TAB_INDEX}
      />);

      const props = component.props();

      expect(props.className).to.contain(EXTRA_CLASS_NAME);
      expect(props.style).to.equal(STYLE);
      expect(props.tabIndex).to.equal(TAB_INDEX);

    });
  });

  describe('external api', () => {

    describe('callbacks', () => {
      it('onChange');
      it('onClearClick');
      it('onUploadClick');
    });

    describe('methods', () => {
      it('getFiles', () => {
        const component = shallow(<FileList
          defaultFiles={files}
        />);

        const instance = component.instance();
        expect(instance).to.have.property('getFiles');

        const receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal(files);
      });

      it('clearFiles', () => {
        const onChangeSpy = sinon.spy();
        const component = shallow(<FileList
          defaultFiles={files}
          onChange={onChangeSpy}
        />);

        const instance = component.instance();
        expect(instance).to.have.property('clearFiles');
        instance.clearFiles();
        const receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal([]);

        expect(onChangeSpy).to.have.been.calledWith([]);

      });

      it('addFile', () => {
        const onChangeSpy = sinon.spy();
        const component = shallow(<FileList
          defaultFiles={files}
          onChange={onChangeSpy}
        />);

        const instance = component.instance();
        expect(instance).to.have.property('addFile');
        const newFile = {
          name: 'new file',
          size: 23,
          id: 6
        };
        instance.addFile(newFile);
        const expectedNewFiles = files.concat([newFile]);
        const receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal(expectedNewFiles);

        expect(onChangeSpy).to.have.been.calledWith(expectedNewFiles);
      });

      it('addFiles', () => {
        const onChangeSpy = sinon.spy();
        const component = shallow(<FileList
          defaultFiles={files}
          onChange={onChangeSpy}
        />);

        const instance = component.instance();
        expect(instance).to.have.property('addFiles');
        const newFile = {
          name: 'new file',
          size: 23,
          id: 6
        };
        instance.addFiles([newFile]);
        const expectedNewFiles = files.concat([newFile]);
        const receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal(expectedNewFiles);

        expect(onChangeSpy).to.have.been.calledWith(expectedNewFiles);
      });

      it('removeFile', () => {
        const onChangeSpy = sinon.spy();
        const component = shallow(<FileList
          defaultFiles={files}
          onChange={onChangeSpy}
        />);

        const instance = component.instance();
        expect(instance).to.have.property('removeFile');
        instance.removeFile(files[0].id);
        const expectedNewFiles = files.slice(1);
        const receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal(expectedNewFiles);

        expect(onChangeSpy).to.have.been.calledWith(expectedNewFiles);
      });

      it('removeFileAt', () => {
        const onChangeSpy = sinon.spy();
        const component = shallow(<FileList
          defaultFiles={files}
          onChange={onChangeSpy}
        />);

        const instance = component.instance();
        expect(instance).to.have.property('removeFileAt');
        instance.removeFileAt(0);
        const expectedNewFiles = files.slice(1);
        const receivedFiles = instance.getFiles();
        expect(receivedFiles).to.deep.equal(expectedNewFiles);

        expect(onChangeSpy).to.have.been.calledWith(expectedNewFiles);
      });
    });

  });

  describe('file item ui hooks', () => {
    let
      component,
      fileItem,
      renderFileExtensionIconSpy,
      renderClearIconSpy,
      renderFileNameSpy,
      renderFileErrorMessageSpy,
      renderFileSizeSpy,
      renderUploadProgressSpy,
      fileSizeFormatterSpy,
      timeFormatterSpy,
      locale='en-GB'
      ;

    beforeEach('instantiate file list with file item hooks', () => {
      renderFileExtensionIconSpy = sinon.spy();
      renderClearIconSpy = sinon.spy();
      renderFileNameSpy = sinon.spy();
      renderFileErrorMessageSpy = sinon.spy();
      renderFileSizeSpy = sinon.spy();
      renderUploadProgressSpy = sinon.spy();
      timeFormatterSpy = sinon.spy();
      fileSizeFormatterSpy = sinon.spy();

      component = shallow(<FileList
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
        />);

      fileItem = component.find('FileItem').first();
    });

    it('renderFileExtensionIcon', () => {
      expect(fileItem.prop('renderFileExtensionIcon')).to.equal(renderFileExtensionIconSpy);
    });

    it('renderClearIcon', () => {
      expect(fileItem.prop('renderClearIcon')).to.equal(renderClearIconSpy);
    });

    it('renderFileName', () => {
      expect(fileItem.prop('renderFileName')).to.equal(renderFileNameSpy);
    });

    it('renderFileErrorMessage', () => {
      expect(fileItem.prop('renderFileErrorMessage')).to.equal(renderFileErrorMessageSpy);
    });

    it('renderFileSize', () => {
      expect(fileItem.prop('renderFileSize')).to.equal(renderFileSizeSpy);
    });

    it('renderUploadProgress', () => {
      expect(fileItem.prop('renderUploadProgress')).to.equal(renderUploadProgressSpy);
    });

    describe('file item utils/props', () => {
      it('fileSizeFormatter', () => {
        expect(fileItem.prop('fileSizeFormatter')).to.equal(fileSizeFormatterSpy);
      });
      it('timeFormatter', () => {
        expect(fileItem.prop('timeFormatter')).to.equal(timeFormatterSpy);
      });
      it('locale', () => {
        expect(fileItem.prop('locale')).to.equal(locale);
      });
    });

    describe('file item props', () => {
      it('internal onClearClick');
      it('internal onUploadClick');
    });

  });

  describe('controlled mode behavior', () => {
    it('only calls on change when removing');
    it('ignores add file methods');
  });

});
