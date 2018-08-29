/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import ImageFilePreview from '../src/ImageFilePreview';

describe('image file preview', () => {
  let component, instance;

  describe('basic instantiation', () => {
    it('should allow instantiation without props', () => {
      component = shallow(<ImageFilePreview />);
      instance = component.instance();
      expect(instance).toBeInstanceOf(ImageFilePreview);
    });
  });

  describe('defaultPreview', () => {
    describe('when string', () => {
      it('should render given defaultPreview as image', () => {
        const PATH_TO_IMAGE = 'path/to/image';
        component = shallow(
          <ImageFilePreview defaultPreview={PATH_TO_IMAGE} />
        );
        expect(component.find('img').getElement().props.src).toEqual(
          PATH_TO_IMAGE
        );
      });
    });

    describe('when function', () => {
      it('should call function and render given result', () => {
        const fun = () => <span />;
        component = shallow(<ImageFilePreview defaultPreview={fun} />);
        expect(component.find('span')).toHaveLength(1);
      });
    });

    describe('when jsx', () => {
      it('should render given jsx', () => {
        const jsx = <span />;
        component = shallow(<ImageFilePreview defaultPreview={jsx} />);
        expect(component.find('span')).toHaveLength(1);
      });
    });
  });

  describe('thumbSize', () => {
    describe('default value', () => {
      it('should have default thumbSize', () => {
        component = shallow(<ImageFilePreview />);
        expect(component.prop('style')).toHaveProperty('width');
        expect(component.prop('style')).toHaveProperty('height');
      });
    });

    describe('setting null', () => {
      it('should not set any thumbSize', () => {
        component = shallow(<ImageFilePreview thumbSize={null} />);
        expect(component.prop('style')).not.toHaveProperty('width');
        expect(component.prop('style')).not.toHaveProperty('height');
      });
    });

    describe('when number', () => {
      it('should set thumb size dimensions to provided value', () => {
        component = shallow(<ImageFilePreview thumbSize={20} />);
        expect(component.prop('style')).toHaveProperty('width', 20);
        expect(component.prop('style')).toHaveProperty('height', 20);
      });
    });

    describe('when object', () => {
      it('should set thumb size dimensions to provided {width, height} values', () => {
        const thumbSize = { width: 20, height: 30 };
        component = shallow(<ImageFilePreview thumbSize={thumbSize} />);
        expect(component.prop('style')).toHaveProperty(
          'width',
          thumbSize.width
        );
        expect(component.prop('style')).toHaveProperty(
          'height',
          thumbSize.height
        );
      });
    });

    describe('when array', () => {
      it('should set thumb size dimensions to provided [width, height] values', () => {
        const thumbSize = [20, 30];
        component = shallow(<ImageFilePreview thumbSize={thumbSize} />);
        expect(component.prop('style')).toHaveProperty('width', thumbSize[0]);
        expect(component.prop('style')).toHaveProperty('height', thumbSize[1]);
      });
    });
  });

  describe('file', () => {
    it('should set loadedPreview as image when present', () => {
      component = mount(<ImageFilePreview />);
      const DATA_URL_STRING_RECEIVED_FROM_UTILS_FN = 'some content';
      component.setProps({
        file: { name: 'stuff' }
      });
      component.setState({
        loadedPreview: DATA_URL_STRING_RECEIVED_FROM_UTILS_FN
      });

      expect(
        component
          .find('img')
          .at(0)
          .getElement().props.src
      ).toEqual(DATA_URL_STRING_RECEIVED_FROM_UTILS_FN);
    });

    it('should call read as data url function when setting the file prop', () => {
      const RESULTING_DATA_URL_STRING = 'some content';
      const asyncOp = Promise.resolve(RESULTING_DATA_URL_STRING);
      const fileReadAsDataUrlSpy = jest.fn(() => asyncOp);
      const file = { name: 'stuff' };

      component = mount(
        <ImageFilePreview
          file={file}
          fileReadAsDataUrl={fileReadAsDataUrlSpy}
        />
      );

      instance = component.instance();

      expect(fileReadAsDataUrlSpy).toHaveBeenCalledTimes(1);

      component.setProps({
        file: { name: 'stuff-stuff' }
      });

      expect(fileReadAsDataUrlSpy).toHaveBeenCalledTimes(2);
    });

    xit('should set loadedPreview to value returned by utils fucntion', () => {
      const RESULTING_DATA_URL_STRING = 'some content';
      const file = { name: 'stuff' };
      component = shallow(
        <ImageFilePreview
          file={file}
          fileReadAsDataUrl={() => Promise.resolve(RESULTING_DATA_URL_STRING)}
        />
      );
      expect(component.find('img').props().src).toEqual(
        RESULTING_DATA_URL_STRING
      );
    });
  });
});
