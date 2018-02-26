import React from 'react';
import {shallow, mount} from 'enzyme';

import FileItem, {CLASS_NAME} from '../src/FileItem';

describe('FileItem', () => {
  it('should create instance of FileItem', () => {
    const component = shallow(<FileItem/>);
    expect(component.instance()).to.be.instanceOf(FileItem);
  });


  describe('defaults', () => {

    it('should have default renderFileExtension', () => {
      const component = mount(<FileItem/>);
      expect(component.node.props).to.have.property('renderFileExtensionIcon');
      expect(component.node.props.renderFileExtensionIcon).to.be.instanceOf(Function);
    });

    it('should have default renderClearIcon', () => {
      const component = mount(<FileItem/>);
      expect(component.node.props).to.have.property('renderClearIcon');
      expect(component.node.props.renderClearIcon).to.be.instanceOf(Function);
    });

    it('should have default renderFileName', () => {
      const component = mount(<FileItem/>);
      expect(component.node.props).to.have.property('renderFileName');
      expect(component.node.props.renderFileName).to.be.instanceOf(Function);
    });

    it('should have default renderFileSize', () => {
      const component = mount(<FileItem/>);
      expect(component.node.props).to.have.property('renderFileSize');
      expect(component.node.props.renderFileSize).to.be.instanceOf(Function);
    });

    it('should have default renderFileErrorMessage', () => {
      const component = mount(<FileItem/>);
      expect(component.node.props).to.have.property('renderFileErrorMessage');
      expect(component.node.props.renderFileErrorMessage).to.be.instanceOf(Function);
    });

    it('should have default renderUploadButton', () => {
      const component = mount(<FileItem/>);
      expect(component.node.props).to.have.property('renderUploadButton');
      expect(component.node.props.renderUploadButton).to.be.instanceOf(Function);
    });

    it('should have default renderUploadProgress', () => {
      const component = mount(<FileItem/>);
      expect(component.node.props).to.have.property('renderUploadProgress');
      expect(component.node.props.renderUploadProgress).to.be.instanceOf(Function);
    });

  });

  describe("renderFileSize params", () => {
    it('should generate meaninful props for renderFileSize');
    it('should use fileSizeFormatter to generate file size text in renderFileSize props');
  })

  describe('uploadProgress', () => {

    it('should call renderUploadProgress when uploadProgress prop has meaningful details', () => {
      const renderUploadProgressSpy = sinon.spy((props)=>(<div/>));
      const component = mount(<FileItem renderUploadProgress={renderUploadProgressSpy}/>);

      expect(renderUploadProgressSpy).to.not.have.been.called;
      component.setProps({
        uploadProgress: {
          uploadedSize: 1000, eta: 13*60*1000,
          inProgress: true
        }
      });

      expect(renderUploadProgressSpy).to.have.been.calledOnce;
    });

    it('should generate meaningful props for renderUploadProgress', () => {
      const renderUploadProgressSpy = sinon.spy((props)=>(<div/>));
      const component = mount(
        <FileItem
          renderUploadProgress={renderUploadProgressSpy}
          uploadProgress={{uploadedSize: 1000, eta: 13*60*1000, inProgress:true}}
        />
      );

      expect(renderUploadProgressSpy).to.have.been.calledOnce;

      const firstCallProps = renderUploadProgressSpy.getCall(0).args[0];
      expect(firstCallProps).to.have.property('uploadedSize');
      expect(firstCallProps).to.have.property('uploadedSizeText');
      expect(firstCallProps).to.have.property('etaText');
      expect(firstCallProps).to.have.property('percentage');
      expect(firstCallProps).to.have.property('totalSize');
      expect(firstCallProps).to.have.property('totalSizeText');
    });

    it('should use fileSizeFormatter to generate file size text in renderUploadProgress props', () => {
      const fileSizeFormatterSpy = sinon.spy((number)=>(number));
      const renderUploadProgressSpy = sinon.spy((props)=>(<div/>));
      const component = mount(
        <FileItem
          renderUploadProgress={renderUploadProgressSpy}
          fileSizeFormatter={fileSizeFormatterSpy}
          file={{size:42}}
          uploadProgress={{uploadedSize: 1000, eta: 13*60*1000}}
        />
      );

      expect(fileSizeFormatterSpy).to.have.been.calledWith(42);
    });

    it('should use timeFormatter to generate time text in renderUploadProgress props', () => {
      const timeFormatterSpy = sinon.spy((time)=>(time));
      const renderUploadProgressSpy = sinon.spy((props)=>(<div/>));
      const ETA = 13*60*1000;
      const component = mount(
        <FileItem
          renderUploadProgress={renderUploadProgressSpy}
          timeFormatter={timeFormatterSpy}
          file={{size:42}}
          uploadProgress={{uploadedSize: 1000, eta: ETA, inProgress:true}}
        />
      );

      expect(timeFormatterSpy).to.have.been.calledWith(ETA);
    });
  });

  describe('erorr message', () => {
    let error, renderFileErrorMessageSpy;
    beforeEach(()=>{
      error = {
      reasson: 'meaning',
        message: 'content'
      };
      renderFileErrorMessageSpy = sinon.spy((props)=>(<div/>));
    });


    it('should show error message from file.invalidDetails', () => {
      const component = mount(
        <FileItem
          renderFileErrorMessage={renderFileErrorMessageSpy}
          file={{size:42, invalidDetails:[error]}}
        />
      );

      expect(renderFileErrorMessageSpy).to.have.been.calledWith({error});
    });

    it('should show error message from invalidDetails prop', () => {
      const component = mount(
        <FileItem
          invalidDetails={[error]}
          renderFileErrorMessage={renderFileErrorMessageSpy}
          file={{size:42}}
        />
      );

      expect(renderFileErrorMessageSpy).to.have.been.calledWith({error});
    });

    it('should show error message from uploadProgress.error', () => {
      const component = mount(
      <FileItem
        renderFileErrorMessage={renderFileErrorMessageSpy}
        file={{size:42}}
        uploadProgress={{uploadedSize: 1000, eta: 0, error}}
      />
      );
       expect(renderFileErrorMessageSpy).to.have.been.calledWith({error});
    });
  });

  describe("callback methods", () => {
    let component, onClearClickSpy, onUploadClickSpy;

    beforeEach('file item with callbacks initialisation', () => {

      onClearClickSpy = sinon.spy();
      onUploadClickSpy = sinon.spy();

      component = shallow(
        <FileItem
          onClearClick={onClearClickSpy}
          onUploadClick={onUploadClickSpy}
          file={{size:42}}
          uploadProgress={{}}
        />
      );

    });

    describe('while upload not in progress for target file', () => {
      it('should call onClearClick when clicking on clear button', () => {
        const triggerClearWrapper = component.find(`.${CLASS_NAME}__clear-icon__trigger`);
        triggerClearWrapper.simulate('click');
        expect(onClearClickSpy).to.have.been.calledOnce;
      });
      it('should call onUploadClick when clicking on upload button', () => {
        const triggerUploadWrapper = component.find(`.${CLASS_NAME}__upload-button__trigger`);
        triggerUploadWrapper.simulate('click');
        expect(onUploadClickSpy).to.have.been.calledOnce;
      });
    });

    describe('while upload in progress for target file', () => {
      beforeEach('setting uploadProgress inProgress', () => {
        component.setProps({
          uploadProgress: {
            inProgress: true
          }
        });
      });

      it('should not call onClearClick when clicking on clear button', () => {
        const triggerClearWrapper = component.find(`.${CLASS_NAME}__clear-icon__trigger`);
        triggerClearWrapper.simulate('click');
        expect(onClearClickSpy).to.not.have.been.called;
      });

      it('should not call onUploadClick when clicking on upload button', () => {
        const triggerUploadWrapper = component.find(`.${CLASS_NAME}__upload-button__trigger`);
        triggerUploadWrapper.simulate('click');
        expect(onUploadClickSpy).to.not.have.been.called;
      });

    });

  });

});
