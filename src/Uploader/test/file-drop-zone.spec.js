import React from 'react';
import {shallow, mount} from 'enzyme';

import FileDropZone, {CLASS_NAME} from '../src/FileDropZone';

import {hocDefaultProps} from '../src/props';

describe('FileDropZone', () => {
  it('should allow instantiation', () => {
    const component = shallow(<FileDropZone/>);
    expect(component.instance()).to.be.instanceOf(FileDropZone);
  });

  it('should have all default props supported by HOC', () => {
    const component = mount(<FileDropZone/>);
    const props = component.props();

    Object.keys(hocDefaultProps).forEach((key) => {
      expect(props, key).to.have.property(key);
    });
  });


 function assertStlyePropsExist(id, propsObject) {
    expect(propsObject, `${id}.emptyClass`).to.have.property('emptyClass');
    expect(propsObject, `${id}.emptyStyle`).to.have.property('emptyStyle');
    expect(propsObject, `${id}.emptyText`).to.have.property('emptyText');
    expect(propsObject, `${id}.overClass`).to.have.property('overClass');
    expect(propsObject, `${id}.overStyle`).to.have.property('overStyle');
    expect(propsObject, `${id}.overText`).to.have.property('overText');
    expect(propsObject, `${id}.invalidClass`).to.have.property('invalidClass');
    expect(propsObject, `${id}.invalidStyle`).to.have.property('invalidStyle');
    expect(propsObject, `${id}.invalidText`).to.have.property('invalidText');
  }

  describe('passing down props', () => {
    let component, fdzRenderer;

    it('should pass down forwardProps and normal props in hoc mode', () => {
      component = mount(<FileDropZone/>);
      fdzRenderer = component.find('FileDropZoneRenderer');
      assertStlyePropsExist('fdzRenderer in hoc mode', fdzRenderer.node.props);
    });

    it('should pass down forwardProps and normal props in normal mode', () => {
      component = mount(<FileDropZone noEvents/>);
      fdzRenderer = component.find('FileDropZoneRenderer');
      assertStlyePropsExist('fdzRenderer in normal mode', fdzRenderer.node.props);
    });

    it('should propagate FileDropZone props to FileDropZoneRenderer', () => {
      const EMPTY_TEXT = <div>empty</div>;
      component = mount(<FileDropZone emptyText={EMPTY_TEXT}/>);
      fdzRenderer = component.find('FileDropZoneRenderer');
      expect(fdzRenderer.node.props).to.have.property('emptyText', EMPTY_TEXT);
    });

  });

  describe('status classes, style and content', () => {

    it('should pass empty, over and invalid classes to wrapped component', () => {
      const component = shallow(<FileDropZone/>);

      const fdzProps = component.props();
      assertStlyePropsExist('fdzProps', fdzProps);

      const childProps = component.node.props;
      assertStlyePropsExist('childProps', childProps);

      component.setProps({
        noEvents: true
      });

      const childPropsOnNoEvents = component.node.props;
      assertStlyePropsExist('childPropsOnNoEvents', childPropsOnNoEvents);
    });
  });

  describe('public api', () => {
    it('should delegate all public api to hoc wrapper', () => {
      const component = mount(<FileDropZone/>);
      const instance = component.instance();

      const clearFiles = sinon.stub(instance._fileDZ, 'clearFiles');
      const getFiles = sinon.stub(instance._fileDZ, 'getFiles');
      const removeFile = sinon.stub(instance._fileDZ, 'removeFile');
      const getTotalFileSize = sinon.stub(instance._fileDZ, 'getTotalFileSize');
      const getFileNames = sinon.stub(instance._fileDZ, 'getFileNames');
      const removeFileAt = sinon.stub(instance._fileDZ, 'removeFileAt');


      instance.clearFiles();
      instance.getFiles();
      instance.removeFile(0);
      instance.removeFileAt(0);
      instance.getTotalFileSize();
      instance.getFileNames();

      expect(clearFiles).to.have.been.calledOnce;
      expect(getFiles).to.have.been.calledOnce;
      expect(removeFile).to.have.been.calledOnce;
      expect(removeFileAt).to.have.been.calledOnce;
      expect(getTotalFileSize).to.have.been.calledOnce;
      expect(getFileNames).to.have.been.calledOnce;

      clearFiles.restore();
      getFiles.restore();
      removeFile.restore();
      getTotalFileSize.restore();
      getFileNames.restore();
      removeFileAt.restore();
    });
  });

});
