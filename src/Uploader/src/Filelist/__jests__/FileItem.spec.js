/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import FileItem, { CLASS_NAME } from '../src/FileItem';

describe('FileItem', () => {
  it('should create instance of FileItem', () => {
    const component = shallow(<FileItem />);
    expect(component.instance()).toBeInstanceOf(FileItem);
  });

  describe('defaults', () => {
    it('should have default renderFileExtension', () => {
      const component = mount(<FileItem />);
      expect(component.getElement().props).toHaveProperty(
        'renderFileExtensionIcon'
      );
      expect(
        component.getElement().props.renderFileExtensionIcon
      ).toBeInstanceOf(Function);
    });

    it('should have default renderClearIcon', () => {
      const component = mount(<FileItem />);
      expect(component.getElement().props).toHaveProperty('renderClearIcon');
      expect(component.getElement().props.renderClearIcon).toBeInstanceOf(
        Function
      );
    });

    it('should have default renderFileName', () => {
      const component = mount(<FileItem />);
      expect(component.getElement().props).toHaveProperty('renderFileName');
      expect(component.getElement().props.renderFileName).toBeInstanceOf(
        Function
      );
    });

    it('should have default renderFileSize', () => {
      const component = mount(<FileItem />);
      expect(component.getElement().props).toHaveProperty('renderFileSize');
      expect(component.getElement().props.renderFileSize).toBeInstanceOf(
        Function
      );
    });

    it('should have default renderFileErrorMessage', () => {
      const component = mount(<FileItem />);
      expect(component.getElement().props).toHaveProperty(
        'renderFileErrorMessage'
      );
      expect(
        component.getElement().props.renderFileErrorMessage
      ).toBeInstanceOf(Function);
    });

    it('should have default renderUploadButton', () => {
      const component = mount(<FileItem />);
      expect(component.getElement().props).toHaveProperty('renderUploadButton');
      expect(component.getElement().props.renderUploadButton).toBeInstanceOf(
        Function
      );
    });

    it('should have default renderUploadProgress', () => {
      const component = mount(<FileItem />);
      expect(component.getElement().props).toHaveProperty(
        'renderUploadProgress'
      );
      expect(component.getElement().props.renderUploadProgress).toBeInstanceOf(
        Function
      );
    });
  });

  describe('renderFileSize params', () => {
    it('should generate meaninful props for renderFileSize');
    it(
      'should use fileSizeFormatter to generate file size text in renderFileSize props'
    );
  });

  describe('uploadProgress', () => {
    it('should call renderUploadProgress when uploadProgress prop has meaningful details', () => {
      const renderUploadProgressSpy = jest.fn(props => <div />);
      const component = mount(
        <FileItem renderUploadProgress={renderUploadProgressSpy} />
      );

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

    it('should generate meaningful props for renderUploadProgress', () => {
      const renderUploadProgressSpy = jest.fn(props => <div />);
      const component = mount(
        <FileItem
          renderUploadProgress={renderUploadProgressSpy}
          uploadProgress={{
            uploadedSize: 1000,
            eta: 13 * 60 * 1000,
            inProgress: true
          }}
        />
      );

      expect(renderUploadProgressSpy).toHaveBeenCalledTimes(1);

      const firstCallProps = renderUploadProgressSpy.mock.calls[0][0];
      expect(firstCallProps).toHaveProperty('uploadedSize');
      expect(firstCallProps).toHaveProperty('uploadedSizeText');
      expect(firstCallProps).toHaveProperty('etaText');
      expect(firstCallProps).toHaveProperty('percentage');
      expect(firstCallProps).toHaveProperty('totalSize');
      expect(firstCallProps).toHaveProperty('totalSizeText');
    });

    xit('should use fileSizeFormatter to generate file size text in renderUploadProgress props', () => {
      const fileSizeFormatterSpy = jest.fn(number => number);
      const renderUploadProgressSpy = jest.fn(props => <div />);
      const component = mount(
        <FileItem
          renderUploadProgress={renderUploadProgressSpy}
          fileSizeFormatter={fileSizeFormatterSpy}
          file={{ size: 42 }}
          uploadProgress={{ uploadedSize: 1000, eta: 13 * 60 * 1000 }}
        />
      );

      expect(fileSizeFormatterSpy.mock.calls[0][0]).toEqual(42);
    });

    it('should use timeFormatter to generate time text in renderUploadProgress props', () => {
      const timeFormatterSpy = jest.fn(time => time);
      const renderUploadProgressSpy = jest.fn(props => <div />);
      const ETA = 13 * 60 * 1000;
      const component = mount(
        <FileItem
          renderUploadProgress={renderUploadProgressSpy}
          timeFormatter={timeFormatterSpy}
          file={{ size: 42 }}
          uploadProgress={{ uploadedSize: 1000, eta: ETA, inProgress: true }}
        />
      );

      expect(timeFormatterSpy.mock.calls[0][0]).toEqual(ETA);
    });
  });

  describe('erorr message', () => {
    let error, renderFileErrorMessageSpy;
    beforeEach(() => {
      error = {
        reasson: 'meaning',
        message: 'content'
      };
      renderFileErrorMessageSpy = jest.fn(props => <div />);
    });

    it('should show error message from file.invalidDetails', () => {
      const component = mount(
        <FileItem
          renderFileErrorMessage={renderFileErrorMessageSpy}
          file={{ size: 42, invalidDetails: [error] }}
        />
      );

      expect(renderFileErrorMessageSpy.mock.calls[0][0]).toEqual({ error });
    });

    it('should show error message from invalidDetails prop', () => {
      const component = mount(
        <FileItem
          invalidDetails={[error]}
          renderFileErrorMessage={renderFileErrorMessageSpy}
          file={{ size: 42 }}
        />
      );

      expect(renderFileErrorMessageSpy.mock.calls[0][0]).toEqual({ error });
    });

    it('should show error message from uploadProgress.error', () => {
      const component = mount(
        <FileItem
          renderFileErrorMessage={renderFileErrorMessageSpy}
          file={{ size: 42 }}
          uploadProgress={{ uploadedSize: 1000, eta: 0, error }}
        />
      );
      expect(renderFileErrorMessageSpy.mock.calls[0][0]).toEqual({ error });
    });
  });

  describe('callback methods', () => {
    let component, onClearClickSpy, onUploadClickSpy;

    describe('while upload not in progress for target file', () => {
      it('should call onClearClick when clicking on clear button', () => {
        onClearClickSpy = jest.fn();
        onUploadClickSpy = jest.fn();

        component = mount(
          <FileItem
            onClearClick={onClearClickSpy}
            onUploadClick={onUploadClickSpy}
            file={{ size: 42 }}
            uploadProgress={{}}
          />
        );

        const triggerClearWrapper = component.find(
          `.${CLASS_NAME}__clear-icon__trigger`
        );
        triggerClearWrapper.simulate('click');
        expect(onClearClickSpy).toHaveBeenCalledTimes(1);
      });
      xit('should call onUploadClick when clicking on upload button', () => {
        onClearClickSpy = jest.fn();
        onUploadClickSpy = jest.fn();

        component = mount(
          <FileItem
            onClearClick={onClearClickSpy}
            onUploadClick={onUploadClickSpy}
            file={{ size: 42 }}
            uploadProgress={{}}
          />
        );
        const triggerUploadWrapper = component.find(
          `div.${CLASS_NAME}__upload-button__trigger`
        );

        triggerUploadWrapper.simulate('click');
        expect(onUploadClickSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('while upload in progress for target file', () => {
      xit('should not call onClearClick when clicking on clear button', () => {
        const onClearClickSpy = jest.fn();
        const onUploadClickSpy = jest.fn();

        component = mount(
          <FileItem
            onClearClick={onClearClickSpy}
            onUploadClick={onUploadClickSpy}
            file={{ size: 42 }}
            uploadProgress={{
              inProgress: true
            }}
          />
        );
        const triggerClearWrapper = component.find(
          `.${CLASS_NAME}__clear-icon__trigger`
        );
        triggerClearWrapper.simulate('click');
        expect(onClearClickSpy).toHaveBeenCalledTimes(0);
      });

      xit('should not call onUploadClick when clicking on upload button', () => {
        onClearClickSpy = jest.fn();
        onUploadClickSpy = jest.fn();

        component = mount(
          <FileItem
            onClearClick={onClearClickSpy}
            onUploadClick={onUploadClickSpy}
            file={{ size: 42 }}
            uploadProgress={{
              inProgress: true
            }}
          />
        );
        const triggerUploadWrapper = component.find(
          `.${CLASS_NAME}__upload-button__trigger`
        );
        triggerUploadWrapper.simulate('click');
        expect(onUploadClickSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
