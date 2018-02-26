import React from 'react';
import {shallow} from 'enzyme';
import Uploader from '../src/Uploader';

describe('Uploader menu bar', () => {

  it('should create uploader instance', () => {
    const component = shallow(<Uploader targetUrl='http://localhost:3000'/>);
    const instance = component.instance();

    expect(instance).to.be.instanceOf(Uploader);
  });

  it('should support custom rendering for clear files button', () => {

    const renderClearAllButtonSpy = sinon.spy(({domProps, files}) => {
      <button {...domProps}/>
    });

    const component = shallow(
      <Uploader
        targetUrl='http://localhost:3000'
        renderClearAllButton={renderClearAllButtonSpy}
      />
    );

    expect(renderClearAllButtonSpy).to.have.been.calledOnce;

    const callArgs = renderClearAllButtonSpy.getCall(0).args[0];
    expect(callArgs).to.have.property('domProps');
    expect(callArgs.domProps).to.have.property('children');
    expect(callArgs.domProps).to.have.property('disabled');
    expect(callArgs.domProps).to.have.property('onClick');
    expect(callArgs).to.have.property('files');
  });

  it('should support custom rendering for select files button', () => {

    const renderFilePickButtonSpy = sinon.spy(({domProps, files}) => {
      <button {...domProps}/>
    });

    const component = shallow(
      <Uploader
        targetUrl='http://localhost:3000'
        renderFilePickButton={renderFilePickButtonSpy}
      />
    );

    expect(renderFilePickButtonSpy).to.have.been.calledOnce;

    const callArgs = renderFilePickButtonSpy.getCall(0).args[0];
    expect(callArgs).to.have.property('domProps');
    expect(callArgs.domProps).to.have.property('children');
    expect(callArgs).to.have.property('onSelectFiles');
    expect(callArgs).to.have.property('files');
  });

  it('should support custom rendering for upload all button', () => {

    const renderUploadAllButtonSpy = sinon.spy(({domProps, files}) => {
      <button {...domProps}/>
    });

    const component = shallow(
      <Uploader
        targetUrl='http://localhost:3000'
        renderUploadAllButton={renderUploadAllButtonSpy}
      />
    );

    expect(renderUploadAllButtonSpy).to.have.been.calledOnce;

    const callArgs = renderUploadAllButtonSpy.getCall(0).args[0];
    expect(callArgs).to.have.property('domProps');
    expect(callArgs.domProps).to.have.property('children');
    expect(callArgs.domProps).to.have.property('disabled');
    expect(callArgs.domProps).to.have.property('onClick');
    expect(callArgs).to.have.property('files');
  });

  it('should support custom rendering for global progress bar', () => {
    const renderGlobalProgressBarSpy = sinon.spy(({domProps, files}) => {
      <button {...domProps}/>
    });

    const component = shallow(
      <Uploader
        targetUrl='http://localhost:3000'
        renderGlobalProgressBar={renderGlobalProgressBarSpy}
      />
    );

    expect(renderGlobalProgressBarSpy).to.have.been.calledOnce;

    const callArgs = renderGlobalProgressBarSpy.getCall(0).args[0];
    expect(callArgs).to.have.property('files');
    expect(callArgs).to.have.property('totalUploaded');
    expect(callArgs).to.have.property('totalUploadedText');
    expect(callArgs).to.have.property('totalSize');
    expect(callArgs).to.have.property('totalSizeText');
    expect(callArgs).to.have.property('percentage');
    expect(callArgs).to.have.property('percentageText');
    expect(callArgs).to.have.property('eta');
    expect(callArgs).to.have.property('etaText');
  });

});
