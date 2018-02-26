import React from 'react';
import {shallow} from 'enzyme';

import ImageFilePreview from '../src/ImageFilePreview';

describe('image file preview', () => {
  let component, instance;

  describe('basic instantiation', () => {

    it('should allow instantiation without props', () => {
      component = shallow(<ImageFilePreview/>);
      instance = component.instance();
      expect(instance).to.be.instanceOf(ImageFilePreview);
    });

  });

  describe('defaultPreview', () => {
    describe('when string', () => {
      it('should render given defaultPreview as image', () => {
        const PATH_TO_IMAGE = 'path/to/image';
        component = shallow(<ImageFilePreview defaultPreview={PATH_TO_IMAGE}/>);
        expect(component.find('img').node.props.src).to.equal(PATH_TO_IMAGE);
      });
    });

    describe('when function', () => {
      it('should call function and render given result', () => {
        const fun = () => <span/>;
        component = shallow(<ImageFilePreview defaultPreview={fun}/>);
        expect(component.find('span')).to.have.length(1);
      });
    });

    describe('when jsx', () => {
      it('should render given jsx', () => {
        const jsx = <span/>;
        component = shallow(<ImageFilePreview defaultPreview={jsx}/>);
        expect(component.find('span')).to.have.length(1);
      });
    });
  });

  describe('thumbSize', () => {

    describe('default value', () => {
       it('should have default thumbSize', () => {
        component = shallow(<ImageFilePreview/>);
        expect(component.prop('style')).to.have.property('width');
        expect(component.prop('style')).to.have.property('height');
      })
    });

    describe('setting null', () => {
      it('should not set any thumbSize', () => {
        component = shallow(<ImageFilePreview thumbSize={null}/>);
        expect(component.prop('style')).to.not.have.property('width');
        expect(component.prop('style')).to.not.have.property('height');
      })
    });

    describe('when number', () => {
      it('should set thumb size dimensions to provided value', () => {
        component = shallow(<ImageFilePreview thumbSize={20}/>);
        expect(component.prop('style')).to.have.property('width', 20);
        expect(component.prop('style')).to.have.property('height', 20);
      });
    });

    describe('when object', () => {
      it('should set thumb size dimensions to provided {width, height} values', () => {
        const thumbSize = {width: 20, height: 30};
        component = shallow(<ImageFilePreview thumbSize={thumbSize}/>);
        expect(component.prop('style')).to.have.property('width', thumbSize.width);
        expect(component.prop('style')).to.have.property('height', thumbSize.height);
      });
    });

    describe('when array', () => {
      it('should set thumb size dimensions to provided [width, height] values', () => {
        const thumbSize = [20, 30];
        component = shallow(<ImageFilePreview thumbSize={thumbSize}/>);
        expect(component.prop('style')).to.have.property('width', thumbSize[0]);
        expect(component.prop('style')).to.have.property('height', thumbSize[1]);
      });
    });
  });

  describe('file', () => {
    it('should set loadedPreview as image when present', () => {
      component = shallow(<ImageFilePreview/>);
      const DATA_URL_STRING_RECEIVED_FROM_UTILS_FN = 'some content';
      component.setProps({
        file: {name:'stuff'}
      });
      component.setState({
        loadedPreview: DATA_URL_STRING_RECEIVED_FROM_UTILS_FN
      });

      expect(component.find('img').node.props.src).to.equal(DATA_URL_STRING_RECEIVED_FROM_UTILS_FN);
    });

    it('should call read as data url function when setting the file prop', () => {
      const RESULTING_DATA_URL_STRING = 'some content';
      const asyncOp = Promise.resolve(RESULTING_DATA_URL_STRING);
      const fileReadAsDataUrlSpy = sinon.spy(()=>(asyncOp));
      const file = {name:'stuff'};
      component = shallow(<ImageFilePreview file={file} fileReadAsDataUrl={fileReadAsDataUrlSpy}/>);

      instance = component.instance();
      instance.componentDidMount();

      expect(fileReadAsDataUrlSpy).to.have.been.calledOnce;

      component.setProps({
        file: {name:'stuff-stuff'}
      })

      expect(fileReadAsDataUrlSpy).to.have.been.calledTwice;

    });

    // it.only('should set loadedPreview to value returned by utils fucntion', () => {
    //   const RESULTING_DATA_URL_STRING = 'some content';
    //   const file = {name:'stuff'};
    //   component = shallow(<ImageFilePreview file={file} fileReadAsDataUrl={()=>(Promise.resolve(RESULTING_DATA_URL_STRING))}/>);
    //   expect(component.find('img').node.props.src).to.equal(RESULTING_DATA_URL_STRING);
    // })
  });

  // describe('onReady', () => {
    // it('should call onReady when image loaded');
  // });

});
