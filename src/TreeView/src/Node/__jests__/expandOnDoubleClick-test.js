/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import Node from '../index';
import ExpandTool from '../ExpandTool';
import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('expandOnDoubleClick', () => {
  describe('default =  false', () => {
    describe('click', () => {
      let wrapper;
      let onCollapsedChange;
      let label;
      let expandTool;

      beforeEach(() => {
        onCollapsedChange = jest.fn();
        wrapper = shallow(
          <Node hasChildren onCollapsedChange={onCollapsedChange} />
        );
        label = wrapper.find(`.${CLASS_NAME}__node__label`);
        expandTool = wrapper.find(ExpandTool);
      });

      it('should call onCollapsedChange onClick on label', () => {
        label.simulate('click', { stopPropagation: () => {} });
        expect(onCollapsedChange).toHaveBeenCalled();
      });

      it('should call onCollapsedChange onClick on expandTool', () => {
        expandTool.simulate('click', { stopPropagation: () => {} });
        expect(onCollapsedChange).toHaveBeenCalled();
      });

      it('should not call onCollapsedChange on doubleClick on label', () => {
        expandTool.simulate('doubleClick', { stopPropagation: () => {} });
        expect(onCollapsedChange).not.toHaveBeenCalled();
      });

      it('should not call onCollapsedChange on doubleClick on expandTool', () => {
        expandTool.simulate('doubleClick', { stopPropagation: () => {} });
        expect(onCollapsedChange).toHaveBeenCalledTimes(0);
      });
    });
  });
  describe('=true', () => {
    describe('click', () => {
      let wrapper;
      let onCollapsedChange;
      let label;
      let expandTool;

      beforeEach(() => {
        onCollapsedChange = jest.fn();
        wrapper = shallow(
          <Node
            hasChildren
            expandOnDoubleClick
            onCollapsedChange={onCollapsedChange}
          />
        );
        label = wrapper.find(`.${CLASS_NAME}__node__label`);
        expandTool = wrapper.find(ExpandTool);
      });

      it('should not call onCollapsedChange onClick on label', () => {
        label.simulate('click', { stopPropagation: () => {} });
        expect(onCollapsedChange).toHaveBeenCalledTimes(0);
      });

      it('should not call onCollapsedChange onClick on expandTool', () => {
        expandTool.simulate('click', { stopPropagation: () => {} });
        expect(onCollapsedChange).toHaveBeenCalledTimes(0);
      });

      it('should call onCollapsedChange on doubleClick on label', () => {
        expandTool.simulate('doubleClick', { stopPropagation: () => {} });
        expect(onCollapsedChange).toHaveBeenCalledTimes(1);
      });

      it('should call onCollapsedChange on doubleClick on expandTool', () => {
        expandTool.simulate('doubleClick', { stopPropagation: () => {} });
        expect(onCollapsedChange).toHaveBeenCalledTimes(1);
      });
    });
  });
});
