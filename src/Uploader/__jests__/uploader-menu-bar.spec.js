import React from 'react';
import { shallow, mount } from 'enzyme';
import Uploader from '../src';

describe('Uploader menu bar', () => {
  it('should create uploader instance', () => {
    const component = shallow(<Uploader targetUrl="http://localhost:3000" />);
    const instance = component.instance();

    expect(instance).toBeInstanceOf(Uploader);
  });

  it('should support custom rendering for clear files button', () => {
    const renderClearAllButtonSpy = jest.fn(({ domProps, files }) => {
      <button {...domProps} />;
    });

    const component = shallow(
      <Uploader
        targetUrl="http://localhost:3000"
        renderClearAllButton={renderClearAllButtonSpy}
      />
    );

    expect(renderClearAllButtonSpy).toHaveBeenCalledTimes(1);

    const callArgs = renderClearAllButtonSpy.mock.calls[0][0];
    expect(callArgs).toHaveProperty('domProps');
    expect(callArgs.domProps).toHaveProperty('children');
    expect(callArgs.domProps).toHaveProperty('disabled');
    expect(callArgs.domProps).toHaveProperty('onClick');
    expect(callArgs).toHaveProperty('files');
  });

  it('should support custom rendering for select files button', () => {
    const renderFilePickButtonSpy = jest.fn(({ domProps, files }) => {
      <button {...domProps} />;
    });

    const component = shallow(
      <Uploader
        targetUrl="http://localhost:3000"
        renderFilePickButton={renderFilePickButtonSpy}
      />
    );

    expect(renderFilePickButtonSpy).toHaveBeenCalledTimes(1);

    const callArgs = renderFilePickButtonSpy.mock.calls[0][0];
    expect(callArgs).toHaveProperty('domProps');
    expect(callArgs.domProps).toHaveProperty('children');
    expect(callArgs).toHaveProperty('onSelectFiles');
    expect(callArgs).toHaveProperty('files');
  });

  xit('should support custom rendering for upload all button', () => {
    const renderUploadAllButtonSpy = jest.fn(({ domProps, files }) => {
      <button {...domProps} />;
    });

    const component = mount(
      <Uploader
        targetUrl="http://localhost:3000"
        renderUploadAllButton={renderUploadAllButtonSpy}
      />
    );

    expect(renderUploadAllButtonSpy).toHaveBeenCalledTimes(1);

    const callArgs = renderUploadAllButtonSpy.mock.calls[0][0];
    expect(callArgs).toHaveProperty('domProps');
    expect(callArgs.domProps).toHaveProperty('children');
    expect(callArgs.domProps).toHaveProperty('disabled');
    expect(callArgs.domProps).toHaveProperty('onClick');
    expect(callArgs).toHaveProperty('files');
  });

  it('should support custom rendering for global progress bar', () => {
    const renderGlobalProgressBarSpy = jest.fn(({ domProps, files }) => {
      <button {...domProps} />;
    });

    const component = shallow(
      <Uploader
        targetUrl="http://localhost:3000"
        renderGlobalProgressBar={renderGlobalProgressBarSpy}
      />
    );

    expect(renderGlobalProgressBarSpy).toHaveBeenCalledTimes(1);

    const callArgs = renderGlobalProgressBarSpy.mock.calls[0][0];
    expect(callArgs).toHaveProperty('files');
    expect(callArgs).toHaveProperty('totalUploaded');
    expect(callArgs).toHaveProperty('totalUploadedText');
    expect(callArgs).toHaveProperty('totalSize');
    expect(callArgs).toHaveProperty('totalSizeText');
    expect(callArgs).toHaveProperty('percentage');
    expect(callArgs).toHaveProperty('percentageText');
    expect(callArgs).toHaveProperty('eta');
    expect(callArgs).toHaveProperty('etaText');
  });
});
