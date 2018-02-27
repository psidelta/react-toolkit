import React from 'react';
import Node from '../../Node';
import { mount } from 'enzyme';

import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('icons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Node />);
  });

  describe('nodeIcon', () => {
    it('should render img if a string', () => {
      wrapper.setProps({
        nodeIcon: 'test'
      });
      expect(wrapper.find(`.${CLASS_NAME}__node__icon-img`)).to.have.length(1);
    });

    it('it should render jsx', () => {
      wrapper.setProps({
        nodeIcon: <div id="customIcon" />
      });
      expect(wrapper.find('#customIcon')).to.have.length(1);
    });
  });

  describe('leafNodeIcon', () => {
    it('should render if it is collapsed jsx and overwrite nodeIcon', () => {
      wrapper.setProps({
        collapsed: true,
        nodeIcon: <div id="customIcon" />,
        leafNodeIcon: <div id="customIcon2" />
      });
      expect(wrapper.find('#customIcon2')).to.have.length(1);
      expect(wrapper.find('#customIcon')).to.have.length(0);
    });
    it('should render img if a string', () => {
      wrapper.setProps({
        leafNodeIcon: 'test'
      });
      expect(wrapper.find(`.${CLASS_NAME}__node__icon-img`)).to.have.length(1);
    });
  });

  describe('nodeCollapsedIcon', () => {
    it('should render if it is collapsed jsx and overwrite nodeIcon', () => {
      wrapper.setProps({
        hasChildren: true,
        collapsed: true,
        nodeIcon: <div id="customIcon" />,
        nodeCollapsedIcon: <div id="customIcon2" />
      });
      expect(wrapper.find('#customIcon2')).to.have.length(1);
      expect(wrapper.find('#customIcon')).to.have.length(0);
    });
    it('should render img if a string', () => {
      wrapper.setProps({
        collapsed: true,
        hasChildren: true,
        nodeCollapsedIcon: 'test'
      });
      expect(wrapper.find(`.${CLASS_NAME}__node__icon-img`)).to.have.length(1);
    });
  });
});
