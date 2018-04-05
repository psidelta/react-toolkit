/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import FileDropZone, { CLASS_NAME } from '../src/FileDropZone';

import { hocDefaultProps } from '../src/props';

describe('FileDropZone', () => {
  it('should allow instantiation', () => {
    const component = shallow(<FileDropZone />);
    expect(component.instance()).toBeInstanceOf(FileDropZone);
  });

  it('should have all default props supported by HOC', () => {
    const component = mount(<FileDropZone />);
    const props = component.props();

    Object.keys(hocDefaultProps).forEach(key => {
      expect(props).toHaveProperty(key);
    });
  });

  function assertStlyePropsExist(id, propsObject) {
    expect(propsObject).toHaveProperty('emptyClass');
    expect(propsObject).toHaveProperty('emptyStyle');
    expect(propsObject).toHaveProperty('emptyText');
    expect(propsObject).toHaveProperty('overClass');
    expect(propsObject).toHaveProperty('overStyle');
    expect(propsObject).toHaveProperty('overText');
    expect(propsObject).toHaveProperty('invalidClass');
    expect(propsObject).toHaveProperty('invalidStyle');
    expect(propsObject).toHaveProperty('invalidText');
  }

  describe('passing down props', () => {
    let component, fdzRenderer;

    it('should pass down forwardProps and normal props in hoc mode', () => {
      component = mount(<FileDropZone />);
      fdzRenderer = component.find('FileDropZoneRenderer');
      assertStlyePropsExist(
        'fdzRenderer in hoc mode',
        fdzRenderer.getElement().props
      );
    });

    it('should pass down forwardProps and normal props in normal mode', () => {
      component = mount(<FileDropZone noEvents />);
      fdzRenderer = component.find('FileDropZoneRenderer');
      assertStlyePropsExist(
        'fdzRenderer in normal mode',
        fdzRenderer.getElement().props
      );
    });

    it('should propagate FileDropZone props to FileDropZoneRenderer', () => {
      const EMPTY_TEXT = <div>empty</div>;
      component = mount(<FileDropZone emptyText={EMPTY_TEXT} />);
      fdzRenderer = component.find('FileDropZoneRenderer');
      expect(fdzRenderer.getElement().props).toHaveProperty(
        'emptyText',
        EMPTY_TEXT
      );
    });
  });

  describe('status classes, style and content', () => {
    xit('should pass empty, over and invalid classes to wrapped component', () => {
      const component = mount(<FileDropZone />);

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
      const component = mount(<FileDropZone />);
      const instance = component.instance();

      const spies = {};
      const allMethods = [
        'clearFiles',
        'getFiles',
        'removeFile',
        'getTotalFileSize',
        'getFileNames',
        'removeFileAt'
      ];
      allMethods.forEach(method => {
        instance._fileDZ[method] = spies[method] = jest.fn();
      });
      instance.clearFiles();
      instance.getFiles();
      instance.removeFile(0);
      instance.removeFileAt(0);
      instance.getTotalFileSize();
      instance.getFileNames();

      allMethods.forEach(method => {
        expect(spies[method]).toHaveBeenCalledTimes(1);
      });
    });
  });
});
