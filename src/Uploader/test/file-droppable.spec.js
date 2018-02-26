import React from 'react';
import {shallow, mount} from 'enzyme';

import FileDroppable from '../src/FileDroppable';

describe('FileDroppable', () => {

  let component, instance, innerClassComponent, InnerClass, WrappedClass;

  describe('basic HOC', () => {
    it('should expose FileDroppable wrapper function', () => {
      expect(FileDroppable).to.be.instanceOf(Function);
    });
    it('should return react class and wrapp inner class', () => {
      InnerClass = ()=>{
        return <div/>;
      };
      WrappedClass = FileDroppable(InnerClass);
      expect(WrappedClass).to.be.instanceOf(Function);
      component = shallow(<WrappedClass/>);
      expect(component.first().is(InnerClass)).to.be.true;
    });
  });

  describe('interaction events', () => {

    beforeEach(()=>{
      InnerClass = (props) => {
        const {forwardProp:{events}} = props;
        return <div {...events}/>
      };
      WrappedClass = FileDroppable(InnerClass);
      const flagDirPromise = Promise.resolve(false);
      component = mount(<WrappedClass flagDirectories={()=>(flagDirPromise)}/>);
      instance = component.instance();
      innerClassComponent = component.find(InnerClass);
    });

    it('should pass down drop zone events to the instance of inner class', () => {
      const {
        onDrop,
        onDragEnter,
        onDragOver,
        onDragStart
      } = innerClassComponent.node.props.forwardProp.events;

      expect(onDrop).to.be.instanceOf(Function);
      expect(onDragEnter).to.be.instanceOf(Function);
      expect(onDragOver).to.be.instanceOf(Function);
      expect(onDragStart).to.be.instanceOf(Function);
    });

    describe('callback methods', () => {
      it('should call onDragEnter calback when onDragEnter event hanlder ran', () => {
        const onDragEnterSpy = sinon.spy();
        component.setProps({
          onDragEnter: onDragEnterSpy
        });

        innerClassComponent.simulate('dragenter', {dataTransfer:{files:[]}});
        expect(onDragEnterSpy).to.have.been.calledOnce;

        expect(innerClassComponent.prop('forwardProp')).to.have.property('isOver', true);
        expect(innerClassComponent.prop('forwardProp')).to.have.property('isEmpty', true);
        expect(innerClassComponent.prop('forwardProp')).to.have.property('isValid', null);
      });

      it('should call onDragLeave callback when onDragLeave event handler ran', () => {
        const onDragLeaveSpy = sinon.spy();
        component.setProps({
          onDragLeave: onDragLeaveSpy
        });

        innerClassComponent.simulate('dragleave', {nativeEvent:{x:-1, y:-1}, dataTransfer:{files:[]}});
        expect(onDragLeaveSpy).to.have.been.calledOnce;

        expect(innerClassComponent.prop('forwardProp')).to.have.property('isOver', false);
        expect(innerClassComponent.prop('forwardProp')).to.have.property('isValid', null);
        expect(innerClassComponent.prop('forwardProp')).to.have.property('isEmpty', true);
      });

      it('should call onDrop and onChange calbacks onDrop event', (done) => {
        const onChangeSpy = sinon.spy();
        const onDropSpy = sinon.spy();

        component.setProps({
          onChange: onChangeSpy,
          onDrop: onDropSpy
        });

        instance
          .onPick({dataTransfer:{files:[]}})
          .then(()=>{
            expect(onChangeSpy).to.have.been.calledOnce;
            expect(onDropSpy).to.have.been.calledOnce;

            expect(onDropSpy).to.have.been.calledWith({
              files: [], isValid: true, validFiles: [], invalidFiles: []
            });

            const callArgs = onChangeSpy.getCall(0).args[0];
            expect(callArgs).to.have.property('files');
            expect(callArgs.files).to.deep.equal([]);
            expect(callArgs).to.have.property('event');
            expect(callArgs.event).to.have.property('dataTransfer');

            expect(innerClassComponent.prop('forwardProp')).to.have.property('isOver', false);
            expect(innerClassComponent.prop('forwardProp')).to.have.property('isValid', true);
            expect(innerClassComponent.prop('forwardProp')).to.have.property('isEmpty', true);
            done();
          })
          .catch(done);
      });

      it('should split files into valid and invalid files', (done) => {
        const onDragEnterSpy = sinon.spy();
        const onDragLeaveSpy = sinon.spy();
        const onDropSpy = sinon.spy();
        const onChangeSpy = sinon.spy();

        const files = [
          {id:1, name:'a', willPass:true},
          {id:2, name:'b', willPass:true},
          {id:3, name:'c', willPass:false},
          {id:4, name:'d', willPass:true}
        ];

        const expectedValidFiles = files.filter((file)=>(file.willPass));
        const expectedInValidFiles = files.filter((file)=>(!file.willPass));

        component.setProps({
          onDrop: onDropSpy,
          onChange: onChangeSpy,
          accept: (file) => (!!file.willPass)
        });

        function assertProperValidAndInvalidFilesOnSpy(spyEntity) {
          expect(spyEntity.getCall(0).args[0]).to.have.property('validFiles');
          expect(spyEntity.getCall(0).args[0].validFiles).to.deep.equal(expectedValidFiles);

          expect(spyEntity.getCall(0).args[0]).to.have.property('invalidFiles');
          expect(spyEntity.getCall(0).args[0].invalidFiles).to.deep.equal(expectedInValidFiles);

          expect(spyEntity.getCall(0).args[0]).to.have.property('isValid', false);

          expect(innerClassComponent.prop('forwardProp')).to.have.property('isOver', false);
          expect(innerClassComponent.prop('forwardProp')).to.have.property('isValid', false);
          expect(innerClassComponent.prop('forwardProp')).to.have.property('isEmpty', false);
        }

        innerClassComponent.simulate('dragenter', {dataTransfer:{files:files}});
        innerClassComponent.simulate('dragleave', {nativeEvent:{x:-1, y:-1}, dataTransfer:{files:files}});

        instance
          .onPick({dataTransfer:{files:files}})
          .then(()=>{
            assertProperValidAndInvalidFilesOnSpy(onDropSpy);

            // TODO split into onChange test
            expect(onChangeSpy.getCall(0).args[0]).to.have.property('files');
            expect(onChangeSpy.getCall(0).args[0].files).to.deep.equal(expectedValidFiles);

            component.setProps({
              acceptInvalid: true,
              appendOnDrop: false
            });

            instance.onPick({dataTransfer:{files:files}})
              .then(()=>{
                expect(onChangeSpy.getCall(1).args[0].files).to.deep.equal(files);
                done();
              })
          })
          .catch(done);

      });

      describe('onChange behavior', () => {
        let onChangeSpy;

        describe('when component is uncontrolled', () => {
          beforeEach(()=>{
            onChangeSpy = sinon.spy();
            component.setProps({
              onChange: onChangeSpy,
              acceptDuplicates: true
            });
          });

          describe('when appendOnDrop=true', () => {
            it('should call onChange with appended items', (done) => {

              const pickedFiles = [{a:1}, {b:2}];
              const moreFiles = [{c:1}, {d:2}];

              const event1 = {dataTransfer:{files:pickedFiles}};
              const event2 = {dataTransfer:{files:moreFiles}};

              const firstPick = instance
                .onPick({dataTransfer:{files:pickedFiles}})
                .then(()=>{
                  const callArgs1 = onChangeSpy.getCall(0).args[0];
                  expect(callArgs1).to.have.property('files');
                  expect(callArgs1.files).to.deep.equal(pickedFiles);
                  return instance.onPick(event2);
                })
                .then(() => {
                  const callArgs2 = onChangeSpy.getCall(1).args[0];
                  expect(callArgs2).to.have.property('files');
                  expect(callArgs2.files, 'should have appended files').to.deep.equal([...pickedFiles, ...moreFiles]);
                  done();
                })
                .catch(done);
            });
          });

          describe('when appendOnDrop=false', () => {
            it('should call onChange with new items', (done) => {

              component.setProps({
                appendOnDrop: false
              });

              const pickedFiles = [{a:1}, {b:2}];
              const moreFiles = [{c:1}, {d:2}];

              const event1 = {dataTransfer:{files:pickedFiles}};
              const event2 = {dataTransfer:{files:moreFiles}};

              const firstPick = instance
                .onPick({dataTransfer:{files:pickedFiles}})
                .then(()=>{
                  const callArgs1 = onChangeSpy.getCall(0).args[0];
                  expect(callArgs1).to.have.property('files');
                  expect(callArgs1.files).to.deep.equal(pickedFiles);
                })
                .catch(done);

              firstPick
                .then(()=>(instance.onPick(event2)))
                .then(() => {
                  const callArgs2 = onChangeSpy.getCall(1).args[0];
                  expect(callArgs2).to.have.property('files');
                  expect(callArgs2.files, 'should have appended files').to.deep.equal(moreFiles);
                  done();
                })
                .catch(done);
            });
          });
        });

        describe('when component is controlled', () => {
          let initialFiles = [{a:1}, {b:2}];
          beforeEach(()=>{
            onChangeSpy = sinon.spy();
            component.setProps({
              onChange: onChangeSpy,
              files: initialFiles,
              acceptDuplicates: true
            });
          });

          it('should call onChange with appended items to controlled source', (done) => {
            const moreFiles = [{c:1}, {d:2}];
            const event1 = {dataTransfer:{files:moreFiles}};
            instance.onPick(event1).then(()=>{
              const callArgs = onChangeSpy.getCall(0).args[0];
              expect(callArgs).to.have.property('files');
              expect(callArgs.files).to.deep.equal([...initialFiles, ...moreFiles]);
              done();
            })
            .catch(done);
          });
        });

      });

    });
  });

  describe('configurable forwardProp param', () => {
    it('should send props to wrapped component in set forwardProp key', () => {

      const CUSTOM_KEY = 'customKey';

      InnerClass = (props) => {
        const {[CUSTOM_KEY]:{events}} = props;
        return <div {...events}/>
      };

      WrappedClass = FileDroppable(InnerClass, {forwardProp: CUSTOM_KEY});

      component = mount(<WrappedClass/>);
      instance = component.instance();
      innerClassComponent = component.find(InnerClass);

      expect(innerClassComponent.node.props).to.have.property(CUSTOM_KEY);
      expect(innerClassComponent.node.props[CUSTOM_KEY].events).to.have.property('onDrop');
    });

    // very useful for fileDropZone where we want the same component to be
    // used in both HOCed and pure way
    it('should mix all keys with normal props is forwardProp is null', () => {

      InnerClass = (props) => {
        const {events} = props;
        return <div {...events}/>
      };

      WrappedClass = FileDroppable(InnerClass, {forwardProp: null});

      component = mount(<WrappedClass/>);
      instance = component.instance();
      innerClassComponent = component.find(InnerClass);

      expect(innerClassComponent.node.props).to.have.property('events');
      expect(innerClassComponent.node.props.events).to.have.property('onDrop');
    });

  });

  describe('defaultFiles params', () => {
    it('should set default files', () => {
      InnerClass = (props) => {
        const {forwardProp:{events}} = props;
        return <div {...events}/>
      };

      WrappedClass = FileDroppable(InnerClass);

      const initialFiles = [{a:1}, {b:2}];
      component = mount(<WrappedClass defaultFiles={initialFiles}/>);
      instance = component.instance();
      innerClassComponent = component.find(InnerClass);

      expect(instance.getFiles()).to.deep.equal(initialFiles);
    });
  });

  describe('accept flag/param', () => {
    const STATIC_ACCEPT = "*";
    beforeEach(()=>{
      InnerClass = (props) => {
        const {forwardProp:{events}} = props;
        return <div {...events}/>
      };

      WrappedClass = FileDroppable(InnerClass, {accept:STATIC_ACCEPT});
      const flagDirPromise = Promise.resolve(false);
      component = mount(<WrappedClass flagDirectories={()=>(flagDirPromise)}/>);
      instance = component.instance();
      innerClassComponent = component.find(InnerClass);
    });

    describe('overwrite behavior', () => {

      it('should send static accept param comming from hoc configuration', () => {
        expect(innerClassComponent.node.props.forwardProp.accept).to.equal(STATIC_ACCEPT);
      });

      it('should overwrite static accept param with hoc prop', () => {
        const DYNAMIC_ACCEPT = '*.jpg';
        component.setProps({accept:DYNAMIC_ACCEPT});
        expect(innerClassComponent.node.props.forwardProp.accept).to.equal(DYNAMIC_ACCEPT);
      });

      it('should call acceptFile utility function when dropping files', (done) => {
        const acceptsFileStub = sinon.stub().returns(true);
        const dropFiles = [{a:1}, {b:1}];
        component.setProps({acceptsFile:acceptsFileStub});

        instance.onPick({
          dataTransfer: {
            files: dropFiles
          }
        }).then(()=>{
          expect(acceptsFileStub).to.have.callCount(dropFiles.length);
          expect(acceptsFileStub).to.have.been.calledWith(dropFiles[0], STATIC_ACCEPT);
          expect(acceptsFileStub).to.have.been.calledWith(dropFiles[1], STATIC_ACCEPT);
          done();
        })
        .catch(done);
      });

      it('should call acceptFile utility function when receiving files', () => {
        const acceptsFileStub = sinon.stub().returns(true);
        const dropFiles = [{a:1}, {b:1}];
        component.setProps({acceptsFile:acceptsFileStub});

        component.setProps({
          files: dropFiles
        });

        expect(acceptsFileStub).to.have.callCount(dropFiles.length);
        expect(acceptsFileStub).to.have.been.calledWith(dropFiles[0], STATIC_ACCEPT);
        expect(acceptsFileStub).to.have.been.calledWith(dropFiles[1], STATIC_ACCEPT);
      });

      it('should call acceptFile utility function with intial files', ()=>{
        const dropFiles = [{a:1}, {b:1}];
        const acceptsFileStub = sinon.stub().returns(true);
        component = mount(<WrappedClass defaultFiles={dropFiles} acceptsFile={acceptsFileStub}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        expect(acceptsFileStub).to.have.callCount(dropFiles.length);
        expect(acceptsFileStub).to.have.been.calledWith(dropFiles[0], STATIC_ACCEPT);
        expect(acceptsFileStub).to.have.been.calledWith(dropFiles[1], STATIC_ACCEPT);
      });

      it('should receive proper params in accept function', ()=>{
        const dropFiles = [{a:1}, {b:1}];
        const acceptsFileStub = sinon.stub().returns(true);
        const acceptSpy = sinon.spy(()=>(true));
        component = mount(
          <WrappedClass
            accept={acceptSpy}
            defaultFiles={dropFiles}
          />);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        expect(acceptSpy).to.have.callCount(dropFiles.length);
        expect(acceptSpy).to.have.been.calledWith(dropFiles[0], 0, dropFiles);
        expect(acceptSpy).to.have.been.calledWith(dropFiles[1], 1, dropFiles);
      });

    });
  });

  describe('getFiles* methods', () => {
    describe('in controlled mode', (done) => {
      it('should allways return files prop array with getFiles', () => {
        InnerClass = (props) => {
          const {forwardProp:{events}} = props;
          return <div {...events}/>
        };

        WrappedClass = FileDroppable(InnerClass);

        const initialFiles = [{a:1}, {b:2}];
        const flagDirPromise = Promise.resolve(false);
        component = mount(<WrappedClass flagDirectories={()=>(flagDirPromise)} files={initialFiles}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        expect(instance.getFiles()).to.deep.equal(initialFiles);

        const anotherFile = [{c:1}];
        const event1 = {dataTransfer:{files:anotherFile}};
        instance.onPick(event1)
          .then(()=>{
            expect(instance.getFiles()).to.deep.equal(initialFiles);
            done();
          })
          .catch(done)
      });

      it('should call onChange with empty file array', () => {
        InnerClass = (props) => {
          const {forwardProp:{events}} = props;
          return <div {...events}/>
        };

        WrappedClass = FileDroppable(InnerClass);

        const initialFiles = [{a:1}, {b:2}];
        component = mount(<WrappedClass files={initialFiles}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        const changeSpy = sinon.spy();
        component.setProps({
          onChange: changeSpy
        });

        instance.clearFiles();

        expect(changeSpy).to.have.been.calledOnce;
        expect(changeSpy.getCall(0).args[0].files).to.deep.equal([]);

      });

      it('should removeFileAt by calling onChange', () => {
        InnerClass = (props) => {
          const {forwardProp:{events}} = props;
          return <div {...events}/>
        };

        WrappedClass = FileDroppable(InnerClass);

        const initialFiles = [{a:1}, {b:2}];
        component = mount(<WrappedClass files={initialFiles}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        const changeSpy = sinon.spy();
        component.setProps({
          onChange: changeSpy
        });

        instance.removeFileAt(0);

        expect(changeSpy).to.have.been.calledOnce;
        expect(changeSpy.getCall(0).args[0].files, 'changeSpy').to.have.length(1);

        expect(instance.getFiles(), 'getFiles').to.have.length(2);
      });

    });

    describe('in uncontrolled mode', () => {
      it('should get current dropped files with getFiles', (done) => {
        InnerClass = (props) => {
          const {forwardProp:{events}} = props;
          return <div {...events}/>
        };

        WrappedClass = FileDroppable(InnerClass, {acceptDuplicates:true});

        const initialFiles = [{a:1}, {b:2}];
        const flagDirPromise = Promise.resolve(false);
        component = mount(<WrappedClass flagDirectories={()=>(flagDirPromise)} defaultFiles={initialFiles}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        expect(instance.getFiles()).to.deep.equal(initialFiles);

        const anotherFile = [{c:1}];
        const anotherFile2= [{c:2}];
        const event1 = {dataTransfer:{files:anotherFile}};
        instance.onPick(event1)
          .then(()=>{
            expect(instance.getFiles()).to.deep.equal([...initialFiles, ...anotherFile]);

            component.setProps({
              appendOnDrop: false
            });

            const event2 = {dataTransfer:{files:anotherFile2}};
            return instance.onPick(event2);
          })
          .then(()=>{
            expect(instance.getFiles()).to.deep.equal(anotherFile2);
            done();
          })
          .catch(done);

      });

      it('should clear files and call onChange', () => {
        InnerClass = (props) => {
          const {forwardProp:{events}} = props;
          return <div {...events}/>
        };

        WrappedClass = FileDroppable(InnerClass);

        const initialFiles = [{a:1}, {b:2}];
        component = mount(<WrappedClass defaultFiles={initialFiles}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        const changeSpy = sinon.spy();
        component.setProps({
          onChange: changeSpy
        });

        instance.clearFiles();

        expect(changeSpy).to.have.been.calledOnce;
        expect(changeSpy.getCall(0).args[0].files, 'changeSpy').to.deep.equal([]);

        expect(instance.getFiles(), 'getFiles').to.deep.equal([]);
      });

      it('should removeFileAt and call onChange', () => {
        InnerClass = (props) => {
          const {forwardProp:{events}} = props;
          return <div {...events}/>
        };

        WrappedClass = FileDroppable(InnerClass);

        const initialFiles = [{a:1}, {b:2}];
        component = mount(<WrappedClass defaultFiles={initialFiles}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        const changeSpy = sinon.spy();
        component.setProps({
          onChange: changeSpy
        });

        instance.removeFileAt(0);

        expect(changeSpy).to.have.been.calledOnce;
        expect(changeSpy.getCall(0).args[0].files, 'changeSpy').to.have.length(1);
        expect(instance.getFiles(), 'getFiles').to.have.length(1);
      });
    });

    describe('in both modes', () => {
      it('should return file names with getFileNames', () => {
        InnerClass = (props) => {
          const {forwardProp:{events}} = props;
          return <div {...events}/>
        };

        WrappedClass = FileDroppable(InnerClass);

        const initialFiles = [{name:'a'}, {name:'b'}, {noName:'value'}];
        component = mount(<WrappedClass defaultFiles={initialFiles}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        expect(instance.getFileNames()).to.deep.equal(['a', 'b', '']);
      });

      it('should return file types with getFileTypes');

      it('should return total size of files with getTotalFileSize', () => {
        InnerClass = (props) => {
          const {forwardProp:{events}} = props;
          return <div {...events}/>
        };

        WrappedClass = FileDroppable(InnerClass);

        const initialFiles = [{size:10}, {size:10}, {someInvalidFile:'key'}];
        component = mount(<WrappedClass defaultFiles={initialFiles}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        expect(instance.getTotalFileSize()).to.deep.equal(20);
      });

    });

  });

  describe('file identifier', () => {

    describe('default values', () => {
      it('should have default file identifier', () => {
        InnerClass = ()=>{
          return <div/>;
        };
        WrappedClass = FileDroppable(InnerClass);
        component = shallow(<WrappedClass/>);
        expect(component.first().is(InnerClass)).to.be.true;
        instance = component.instance();

        component.setProps({
          files: [{name:'a', size:1}]
        });

        expect(component.instance().getFiles()[0]).to.have.property('id');
      });

      it('should have file identifier set by class configuration', () => {
        const CLASS_LEVEL_FILE_IDENTIFIER = () => ('SOMETHING');
        InnerClass = ()=>{
          return <div/>;
        };
        WrappedClass = FileDroppable(InnerClass, {
          generateUniqueFileIdentifier: CLASS_LEVEL_FILE_IDENTIFIER
        });
        component = shallow(<WrappedClass/>);
        expect(component.first().is(InnerClass)).to.be.true;
        instance = component.instance();
        component.setProps({
          files: [{name:'a', size:1}]
        });

        expect(instance.getFiles()[0]).to.have.property('id', 'SOMETHING');
      });

      it('should have overwritable file identifier', () => {
        const CLASS_LEVEL_FILE_IDENTIFIER = () => ('CLASS_LEVEL');
        const INSTANCE_LEVEL_FILE_IDENTIFIER = () => ('INSRANCE_LEVEL');
        InnerClass = ()=>{
          return <div/>;
        };
        WrappedClass = FileDroppable(InnerClass, {
          generateUniqueFileIdentifier: CLASS_LEVEL_FILE_IDENTIFIER
        });
        component = shallow(<WrappedClass/>);
        expect(component.first().is(InnerClass)).to.be.true;
        instance = component.instance();
        component.setProps({
          generateUniqueFileIdentifier: INSTANCE_LEVEL_FILE_IDENTIFIER
        });
        component.setProps({
          files: [{name:'a', size:1}]
        });
        expect(instance.getFiles()[0]).to.have.property('id', 'INSRANCE_LEVEL');
      })
    });;

    describe('file identifier behavior', () => {

      it('should call given generateUniqueFileIdentifier for all dropped files', (done) => {
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        WrappedClass = FileDroppable(InnerClass);
        component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))}/>);

        const idFuctionSpy = sinon.spy((file) => (file.name));
        const FILES = [{name:'first', size:2}, {name:'second', size:3}];
        component.setProps({
          generateUniqueFileIdentifier: idFuctionSpy
        });

        innerClassComponent = component.find(InnerClass);

        component.instance().onPick({
          dataTransfer: {
            files: FILES
          }
        }).then(()=>{
          expect(idFuctionSpy).to.have.been.calledTwice;
          expect(idFuctionSpy).to.have.been.calledWith(FILES[0]);
          expect(idFuctionSpy).to.have.been.calledWith(FILES[1]);
          done();
        }).catch(done);


      });

      it('should assign ids to files', (done) => {
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        WrappedClass = FileDroppable(InnerClass);
        component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))}/>);

        const idFuctionSpy = sinon.spy((file) => (file.name));
        const FILES = [{name:'first', size:2}, {name:'second', size:3}];
        component.setProps({
          generateUniqueFileIdentifier: idFuctionSpy
        });

        innerClassComponent = component.find(InnerClass);

        component.instance().onPick({
          dataTransfer: {
            files: FILES
          }
        }).then(()=>{
          expect(FILES[0]).to.have.property('id');
          expect(FILES[1]).to.have.property('id');
          done();
        }).catch(done);
      });

      it('should call given generateUniqueFileIdentifier for all initail files', () => {
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };

        const idFuctionSpy = sinon.spy((file) => (file.name));
        const FILES = [{name:'first', size:2}, {name:'second', size:3}];


        WrappedClass = FileDroppable(InnerClass);
        component = shallow(
          <WrappedClass
            generateUniqueFileIdentifier={idFuctionSpy}
            defaultFiles={FILES}/>
        );

        expect(idFuctionSpy).to.have.been.calledTwice;
        expect(idFuctionSpy).to.have.been.calledWith(FILES[0]);
        expect(idFuctionSpy).to.have.been.calledWith(FILES[1]);

        idFuctionSpy.reset();

        component = shallow(
          <WrappedClass
            generateUniqueFileIdentifier={idFuctionSpy}
            files={FILES}/>
        );

        expect(idFuctionSpy).to.have.been.calledTwice;
        expect(idFuctionSpy).to.have.been.calledWith(FILES[0]);
        expect(idFuctionSpy).to.have.been.calledWith(FILES[1]);
      });
    });

    describe('removing file by id', (done) => {
      it('should allow removeFile by id', () => {
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        WrappedClass = FileDroppable(InnerClass);
        const component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))}/>);

        const FILES = [{name:'first', size:2}, {name:'second', size:3}];
        innerClassComponent = component.find(InnerClass);
        const instance = component.instance();
        instance.onPick({
          dataTransfer: {
            files: FILES
          }
        }).then(()=>{
          let componentFiles = instance.getFiles();

          instance.removeFile(componentFiles[0].id);

          componentFiles = instance.getFiles();
          expect(componentFiles.length).to.equal(1);
          expect(componentFiles[0].name, 'checking file name').to.equal(FILES[1].name);
          done();
        }).catch(done);
      });
    });

  });

  describe('file max/min size and count', () => {
    describe('default values', () => {
      it('should have default max/min file sizes, and no max file count', ()=>{
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        WrappedClass = FileDroppable(InnerClass);
        const component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))}/>);
        innerClassComponent = component.find(InnerClass);

        const fdzProps = innerClassComponent.prop('forwardProp');

        expect(fdzProps).to.have.property('fileMaxSize', Infinity);
        expect(fdzProps).to.have.property('fileMinSize', 0);
        expect(fdzProps).to.have.property('fileMaxCount', Infinity);
      });

      it('should have file min/max and count set by class configuration', () => {
        const CLASS_LEVEL_PROPS = {
          fileMaxCount: 5,
          fileMaxSize: 1024*1024*10,
          fileMinSize: 1024*1024
        };

        InnerClass = ()=>{
          return <div/>;
        };
        WrappedClass = FileDroppable(InnerClass, CLASS_LEVEL_PROPS);
        const component = shallow(<WrappedClass flagDirectories={()=>(Promise.resolve(false))}/>);
        innerClassComponent = component.find(InnerClass);

        const fdzProps = innerClassComponent.prop('forwardProp');

        expect(fdzProps).to.have.property('fileMaxSize', CLASS_LEVEL_PROPS.fileMaxSize);
        expect(fdzProps).to.have.property('fileMinSize', CLASS_LEVEL_PROPS.fileMinSize);
        expect(fdzProps).to.have.property('fileMaxCount', CLASS_LEVEL_PROPS.fileMaxCount);

      });

      it('should have overwritable file identifier', () => {
        const CLASS_LEVEL_PROPS = {
          fileMaxCount: 5,
          fileMaxSize: 1024*1024*10,
          fileMinSize: 1024*1024
        };

        const INSTANCE_MAX_COUNT = 6;
        const INSTANCE_MAX_SIZE = 1024*1024*5;

        InnerClass = ()=>{
          return <div/>;
        };
        WrappedClass = FileDroppable(InnerClass, CLASS_LEVEL_PROPS);
        const component = shallow(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} fileMaxCount={INSTANCE_MAX_COUNT}/>);
        innerClassComponent = component.find(InnerClass);

        let fdzProps = innerClassComponent.prop('forwardProp');

        expect(fdzProps).to.have.property('fileMaxSize', CLASS_LEVEL_PROPS.fileMaxSize);
        expect(fdzProps).to.have.property('fileMinSize', CLASS_LEVEL_PROPS.fileMinSize);
        expect(fdzProps).to.have.property('fileMaxCount', INSTANCE_MAX_COUNT);

        component.setProps({
          fileMaxSize: INSTANCE_MAX_SIZE
        });

        innerClassComponent = component.find(InnerClass);
        fdzProps = innerClassComponent.prop('forwardProp');

        expect(fdzProps).to.have.property('fileMaxSize', INSTANCE_MAX_SIZE);
      })
    });

    describe('min file behavior', () => {

      it('should mark files smaller than fileMinSize as invalid', (done) => {
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        WrappedClass = FileDroppable(InnerClass, {fileMinSize: 1024});
        const component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} acceptInvalid/>);
        const instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        const files = [{name:'file1x', size:2048}, {name:'file2x', size:512}];

        instance.onPick({dataTransfer:{files}})
          .then(()=>{
            const componentFiles = instance.getFiles();
            expect(componentFiles[0]).to.have.property('valid', true);
            expect(componentFiles[1]).to.have.property('valid', false);
            done();
          }).catch(done);
      });

      it('should update validity of files based on fileMinSize prop change', (done)=>{
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        WrappedClass = FileDroppable(InnerClass, {fileMinSize: 1024});
        const component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} acceptInvalid/>);
        const instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        const files = [{name:'file1y', size:2048}, {name:'file2y', size:512}];
        instance.onPick({dataTransfer:{files}})
          .then(()=>{
            component.setProps({
              fileMinSize: 128
            });

            instance.revalidateFiles();
            const componentFiles = instance.getFiles();

            expect(componentFiles[0]).to.have.property('valid', true);
            expect(componentFiles[1]).to.have.property('valid', true);
            done();
          })
          .catch(done);
      });

    });

    describe('max file behavior', () => {
      beforeEach(()=>{
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        WrappedClass = FileDroppable(InnerClass, {fileMaxSize: 1024});
        component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} acceptInvalid/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);
      });

      it('should mark files larger than fileMaxSize as invalid', (done) => {
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        instance.onPick({dataTransfer:{files}})
          .then(()=>{
            const componentFiles = instance.getFiles();
            expect(componentFiles[0]).to.have.property('valid', false);
            expect(componentFiles[1]).to.have.property('valid', true);
            done();
          })
          .catch(done);
      });

      it('should update validity of files based on fileMaxSize prop change', (done) => {
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        instance.onPick({dataTransfer:{files}})
          .then(()=>{
            component.setProps({
              fileMaxSize: 2048
            });

            instance.revalidateFiles();
            const componentFiles = instance.getFiles();

            expect(componentFiles[0]).to.have.property('valid', true);
            expect(componentFiles[1]).to.have.property('valid', true);
            done();
          })
          .catch(done)
      });

    });

    describe('max count behavior', () => {
      beforeEach(()=>{
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        WrappedClass = FileDroppable(InnerClass, {fileMaxCount: 1});
        component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} acceptInvalid/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);
      });

      it('should mark files that appear later than fileMaxCount in the file drop array as invalid', (done) => {
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        instance.onPick({dataTransfer:{files}})
          .then(()=>{
            const componentFiles = instance.getFiles();
            expect(componentFiles[0]).to.have.property('valid', true);
            expect(componentFiles[1]).to.have.property('valid', false);
            done();
          })
          .catch(done);
      });

      it('should update validity of files based on fileMaxCount prop change', (done) => {
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        instance.onPick({dataTransfer:{files}})
          .then(()=>{
            component.setProps({
              fileMaxCount: 10
            });

            instance.revalidateFiles();
            const componentFiles = instance.getFiles();

            expect(componentFiles[0]).to.have.property('valid', true);
            expect(componentFiles[1]).to.have.property('valid', true);
            done();
          })
          .catch(done);
      });

      it('should work with appendOnDrop', (done) => {
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        instance.onPick({dataTransfer:{files}})
          .then(()=>{
            component.setProps({
              appendOnDrop: true,
              fileMaxCount: 3
            });

            const files2 = [{name:'file3', size:2048}, {name:'file4', size:512}];
            return instance.onPick({dataTransfer:{files:files2}})
              .then(()=>{
                instance.revalidateFiles();
                const componentFiles = instance.getFiles();

                expect(componentFiles[0]).to.have.property('valid', true);
                expect(componentFiles[1]).to.have.property('valid', true);
                expect(componentFiles[2]).to.have.property('valid', true);
                expect(componentFiles[3]).to.have.property('valid', false);
                done();
              });
          })
          .catch(done);
      });
    });

    describe('file size and count constraints on controlled and initial files', () => {
      it('should apply valid/invalid status on initial files', () => {
         InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        WrappedClass = FileDroppable(InnerClass, {fileMaxCount: 1});
        component = mount(<WrappedClass defaultFiles={files}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        const componentFiles = instance.getFiles();
        expect(componentFiles[0]).to.have.property('valid', true);
        expect(componentFiles[1]).to.have.property('valid', false);
      });
      it('should apply valid/invalid status on controlled initial files', () => {
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        WrappedClass = FileDroppable(InnerClass, {fileMaxCount: 1});
        component = mount(<WrappedClass files={files}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        const componentFiles = instance.getFiles();

        expect(componentFiles[0]).to.have.property('valid', true);
        expect(componentFiles[1]).to.have.property('valid', false);
      });
      it('should apply valid/invalid status on controlled set files', () => {
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        WrappedClass = FileDroppable(InnerClass, {fileMaxCount: 1});
        component = mount(<WrappedClass files={files}/>);
        instance = component.instance();
        innerClassComponent = component.find(InnerClass);

        const componentFiles = instance.getFiles();
        expect(componentFiles[0]).to.have.property('valid', true);
        expect(componentFiles[1]).to.have.property('valid', false);

        component.setProps({
          files: [...files, {name:'file3', size:128}]
        });

        const componentFiles2 = instance.getFiles();
        expect(componentFiles2[0]).to.have.property('valid', true);
        expect(componentFiles2[1]).to.have.property('valid', false);
        expect(componentFiles2[2]).to.have.property('valid', false);
      });
    });

  });

  describe('isFileValid hook', () => {
    describe('default values', () => {
      it('should allow isFileValid to be set by class configuration', ()=>{
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        const isFileValidStub = sinon.stub().returns(true);
        WrappedClass = FileDroppable(InnerClass, {
          isFileValid: isFileValidStub
        });
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        component = mount(<WrappedClass files={files}/>);
        innerClassComponent = component.find(InnerClass);

        expect(isFileValidStub).to.have.been.calledTwice;
        const args1 = isFileValidStub.getCall(0).args[0];
        const args2 = isFileValidStub.getCall(1).args[0];

        expect(args1).to.have.property('file', files[0]);
        expect(args1).to.have.property('files', files);
        expect(args2).to.have.property('file', files[1]);
        expect(args2).to.have.property('files', files);
      });

      it('should have overwritable isFileValid on instance props', () => {
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        const isFileValidStub = sinon.stub().returns(true);
        WrappedClass = FileDroppable(InnerClass, {
          isFileValid: isFileValidStub
        });
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        component = mount(<WrappedClass defaultFiles={files}/>);
        innerClassComponent = component.find(InnerClass);

        expect(isFileValidStub).to.have.been.calledTwice;

        const isFileValidStub2 = sinon.stub().returns(true);
        component.setProps({
          isFileValid: isFileValidStub2
        });

        component.setProps({
          files: files
        });

        expect(isFileValidStub).to.have.been.calledTwice;
      })
    });

    describe('isFileValid behavior', (done) => {
      it('should have last say in file validity', () => {
        InnerClass = (props)=>{
          return <div {...props.forwardProp.events}/>;
        };
        const isFileValidStub = sinon.spy(({file, valid, files, index})=>(index%2===0));
        WrappedClass = FileDroppable(InnerClass, {
          isFileValid: isFileValidStub
        });
        const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
        component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} acceptInvalid/>);
        innerClassComponent = component.find(InnerClass);
        instance.onPick({dataTransfer:{files}})
          .then(()=>{
            const componentFiles = component.instance().getFiles();
            expect(componentFiles[0]).to.have.property('valid', true);
            expect(componentFiles[1]).to.have.property('valid', false);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('propagation of props', () => {
    it('should set all PropTypes as default props if provided in HOC second argument');
  });

  describe('acceptDuplicates', () => {
    it('should mark all but the first occurence of a file as invalid', (done) => {
      InnerClass = (props)=>{
        return <div {...props.forwardProp.events}/>;
      };

      WrappedClass = FileDroppable(InnerClass);

      const files = [{name:'file1', size:2048}, {name:'file2', size:512}, {name:'file1', size:2048}, {name:'file1', size:2048}];
      component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} acceptInvalid/>);
      innerClassComponent = component.find(InnerClass);
      component.instance().onPick({dataTransfer:{files}})
        .then(()=>{
          const componentFiles = component.instance().getFiles();
          expect(componentFiles[0]).to.have.property('valid', true);
          expect(componentFiles[1]).to.have.property('valid', true);
          expect(componentFiles[2]).to.have.property('valid', false);
          expect(componentFiles[3]).to.have.property('valid', false);
          done();
        })
        .catch(done);
    });

    it('should allow duplicates when acceptDuplicates=true', (done) => {
      InnerClass = (props)=>{
        return <div {...props.forwardProp.events}/>;
      };

      WrappedClass = FileDroppable(InnerClass, {acceptDuplicates: true});

      const files = [{name:'file1', size:2048}, {name:'file2', size:512}, {name:'file1', size:2048}, {name:'file1', size:2048}];
      component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} acceptDuplicates/>);
      innerClassComponent = component.find(InnerClass);
      component.instance().onPick({dataTransfer:{files}})
        .then(()=>{
          const componentFiles = component.instance().getFiles();
          expect(componentFiles[0]).to.have.property('valid', true);
          expect(componentFiles[1]).to.have.property('valid', true);
          expect(componentFiles[2]).to.have.property('valid', true);
          expect(componentFiles[3]).to.have.property('valid', true);
          done();
        })
        .catch(done);
    });

    it('should apply duplication check to previously added files', (done) => {
      InnerClass = (props)=>{
        return <div {...props.forwardProp.events}/>;
      };

      WrappedClass = FileDroppable(InnerClass);

      const files = [{name:'file1', size:2048}, {name:'file2', size:512}];
      const files2 = [{name:'file1', size:2048}];
      component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} acceptInvalid appendOnDrop/>);
      innerClassComponent = component.find(InnerClass);
      const instance = component.instance();
      instance.onPick({dataTransfer:{files}})
        .then(()=>(instance.onPick({dataTransfer:{files:files2}})))
        .then(()=>{
          const componentFiles = instance.getFiles();
          expect(componentFiles[0]).to.have.property('valid', true);
          expect(componentFiles[1]).to.have.property('valid', true);
          expect(componentFiles[2]).to.have.property('valid', false);
          done();
        })
        .catch(done);
    });
  });

  describe('multiple prop', () => {
    it('should allow multiple by default', (done) => {
      InnerClass = (props)=>{
        return <div {...props.forwardProp.events}/>;
      };

      WrappedClass = FileDroppable(InnerClass);

      const files = [{name:'file1', size:2048}, {name:'file2', size:512}, {name:'file1', size:2048}, {name:'file1', size:2048}];
      component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} acceptInvalid/>);
      innerClassComponent = component.find(InnerClass);
      component.instance().onPick({dataTransfer:{files}})
        .then(()=>{
          const componentFiles = component.instance().getFiles();
          expect(componentFiles[0]).to.have.property('valid', true);
          expect(componentFiles[1]).to.have.property('valid', true);
          done();
        })
        .catch(done)
    });

    it('should only allow one item if multiple=false', (done) => {
      InnerClass = (props)=>{
        return <div {...props.forwardProp.events}/>;
      };

      WrappedClass = FileDroppable(InnerClass, {multiple:false});

      const files = [{name:'file1', size:2048}, {name:'file2', size:512}, {name:'file1', size:2048}, {name:'file1', size:2048}];
      component = mount(<WrappedClass flagDirectories={()=>(Promise.resolve(false))} acceptInvalid/>);
      innerClassComponent = component.find(InnerClass);
      component.instance().onPick({dataTransfer:{files}})
        .then(()=>{
          const componentFiles = component.instance().getFiles();
          expect(componentFiles[0]).to.have.property('valid', true);
          expect(componentFiles[1]).to.have.property('valid', false);
          done();
        })
        .catch(done);
    });
  });

  describe('passing down children',()=>{
    it('should pass down children to inner component', () => {
      InnerClass = (props) => {
        return <div {...props.forwardProp.events} children={props.children}/>;
      };

      WrappedClass = FileDroppable(InnerClass);

      const children = <div>Children</div>;

      component = mount(<WrappedClass>{children}</WrappedClass>);
      innerClassComponent = component.find(InnerClass);

      const childrenProp = innerClassComponent.prop('children');
      expect(childrenProp).to.equal(children);

    });

  });

  describe('invalidity reassons', () => {

    it('should expose invalidty reassons in invalid files', () => {
      InnerClass = (props) => {
        return <div {...props.forwardProp.events}/>;
      };

      const MIN_SIZE = 1024*1024;
      const MAX_SIZE = MIN_SIZE * 5;

      WrappedClass = FileDroppable(InnerClass, {
        fileMaxSize: MAX_SIZE,
        fileMinSize: MIN_SIZE,
        accept: '.png',
        acceptInvalid: true
      });

      const FILES = [
        //  will fail on type and size
        {name:'first', size:MAX_SIZE+1},
        // will not fail
        {name:'accepted.png', size:MIN_SIZE+1},
        // will fail on size
        {name:'second.png', size:MIN_SIZE-1},
        // will fail on duplicate
        {name:'accepted.png', size:MIN_SIZE+1}
      ];

      component = mount(<WrappedClass defaultFiles={FILES}/>);
      innerClassComponent = component.find(InnerClass);

      let componentFiles;
      componentFiles = component.instance().getFiles();

      expect(componentFiles[0]).to.have.property('valid', false);
      expect(componentFiles[0], 'type and size invalidDetails').to.have.property('invalidDetails');
      expect(componentFiles[0].invalidDetails).to.have.length(2);

      expect(componentFiles[1]).to.have.property('valid', true);
      expect(componentFiles[1], 'valid file').to.not.have.property('invalidDetails');

      expect(componentFiles[2]).to.have.property('valid', false);
      expect(componentFiles[2].invalidDetails, 'size invalidDetails').to.have.length(1);

      expect(componentFiles[3]).to.have.property('valid', false);
      expect(componentFiles[3].invalidDetails, 'duplicate invalidDetails').to.have.length(1);

    });

    it('should support isFileValid extra invalidDetails reasson via string value', () => {
      InnerClass = (props) => {
        return <div {...props.forwardProp.events}/>;
      };

      const CUSTOM_RESSSON = 'My Custom Reasson';

      const MIN_SIZE = 1024*1024;
      const MAX_SIZE = MIN_SIZE * 5;

      WrappedClass = FileDroppable(InnerClass, {
        fileMaxSize: MAX_SIZE,
        fileMinSize: MIN_SIZE,
        accept: '.png',
        acceptInvalid: true,
        isFileValid: ()=> {
          return CUSTOM_RESSSON;
        }
      });

      const FILES = [
        //  will fail on type and size
        {name:'first', size:MAX_SIZE+1},
        // will not fail
        {name:'accepted.png', size:MIN_SIZE+1},
        // will fail on size
        {name:'second.png', size:MIN_SIZE-1},
        // will fail on duplicate
        {name:'accepted.png', size:MIN_SIZE+1}
      ];

      component = mount(<WrappedClass defaultFiles={FILES}/>);
      innerClassComponent = component.find(InnerClass);

      let componentFiles;
      componentFiles = component.instance().getFiles();

      expect(componentFiles[0]).to.have.property('valid', false);
      expect(componentFiles[0], 'type and size invalidDetails').to.have.property('invalidDetails');
      expect(componentFiles[0].invalidDetails).to.have.length(3);
      expect(componentFiles[0].invalidDetails[2]).to.have.property('message', CUSTOM_RESSSON);

      expect(componentFiles[1]).to.have.property('valid', false);
      expect(componentFiles[1], 'valid file').to.have.property('invalidDetails');
      expect(componentFiles[1].invalidDetails).to.have.length(1);
      expect(componentFiles[1].invalidDetails[0]).to.have.property('message', CUSTOM_RESSSON);

      const CUSTOM_RESSSON_2 = 'ANOTHER_ONE';
      component.setProps({
        isFileValid: () => {
          return {
            message: CUSTOM_RESSSON_2,
            reasson: 'meh'
          }
        }
      });

      component.instance().revalidateFiles();
      componentFiles = component.instance().getFiles();
      expect(componentFiles[0]).to.have.property('valid', false);
      expect(componentFiles[0], 'type and size invalidDetails').to.have.property('invalidDetails');
      expect(componentFiles[0].invalidDetails).to.have.length(3);
      expect(componentFiles[0].invalidDetails[2]).to.have.property('message', CUSTOM_RESSSON_2);

      expect(componentFiles[1]).to.have.property('valid', false);
      expect(componentFiles[1], 'valid file').to.have.property('invalidDetails');
      expect(componentFiles[1].invalidDetails).to.have.length(1);
      expect(componentFiles[1].invalidDetails[0]).to.have.property('message', CUSTOM_RESSSON_2);

    });

    // changed in https://github.com/zippyui/react-uploader/issues/26
    it.skip('should keep invalidity reassons when isFileValid returns true', () => {
      InnerClass = (props) => {
        return <div {...props.forwardProp.events}/>;
      };

      const CUSTOM_RESSSON = 'My Custom Reasson';

      const MIN_SIZE = 1024*1024;
      const MAX_SIZE = MIN_SIZE * 5;

      WrappedClass = FileDroppable(InnerClass, {
        fileMaxSize: MAX_SIZE,
        fileMinSize: MIN_SIZE,
        accept: '.png',
        acceptInvalid: true,
        isFileValid: ()=> {
          return true
        }
      });

      const FILES = [
        //  will fail on type and size
        {name:'first', size:MAX_SIZE+1},
        // will not fail
        {name:'accepted.png', size:MIN_SIZE+1},
        // will fail on size
        {name:'second.png', size:MIN_SIZE-1},
        // will fail on duplicate
        {name:'accepted.png', size:MIN_SIZE+1}
      ];

      component = mount(<WrappedClass defaultFiles={FILES}/>);
      innerClassComponent = component.find(InnerClass);

      let componentFiles;
      componentFiles = component.instance().getFiles();

      expect(componentFiles[0]).to.have.property('valid', true);
      expect(componentFiles[0], 'type and size invalidDetails').to.have.property('invalidDetails');
      expect(componentFiles[0].invalidDetails).to.have.length(2);

      expect(componentFiles[1]).to.have.property('valid', true);
      expect(componentFiles[1], 'valid file').to.not.have.property('invalidDetails');
    });

  });

});
