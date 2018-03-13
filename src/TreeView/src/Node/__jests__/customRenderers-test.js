import React from 'react';
import { shallow, mount } from 'enzyme';

import Node from '../index';
import TreeView from '../../TreeView';

const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('custom renderers', () => {
  describe('renderLabel', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Node node={{ label: 'test' }} />);
    });

    it('should call renderLabel', () => {
      const renderLabel = jest.fn();
      wrapper.setProps({ renderLabel });
      expect(renderLabel).toHaveBeenCalledTimes(1);
    });

    it('should render what renderLabel returns', () => {
      const renderLabel = () => <div id="testCustomLabel" />;
      wrapper.setProps({ renderLabel });
      expect(wrapper.find('#testCustomLabel')).toHaveLength(1);
    });

    it('mutating props will change label', () => {
      const renderLabel = domProps => {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderLabel });
      expect(wrapper.find('#mutatedId')).toHaveLength(1);
      expect(
        wrapper.find('#mutatedId').hasClass(`${CLASS_NAME}__node__label`)
      ).toBe(true);
    });
  });

  describe('renderContent', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <Node hasChildren node={{ label: 'test' }} children={[]} />
      );
    });

    it('should call renderLabel', () => {
      const renderContent = jest.fn();
      wrapper.setProps({ renderContent });
      expect(renderContent).toHaveBeenCalledTimes(1);
    });

    it('should render what renderContent returns', () => {
      const renderContent = () => <div id="testCustomLabel" />;
      wrapper.setProps({ renderContent });
      expect(wrapper.find('#testCustomLabel')).toHaveLength(1);
    });

    it('mutating props will change content', () => {
      const renderContent = domProps => {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderContent });
      expect(wrapper.find('#mutatedId')).toHaveLength(1);
      expect(
        wrapper.find('#mutatedId').hasClass(`${CLASS_NAME}__node__content`)
      ).toBe(true);
    });
  });

  describe('renderIcon', () => {
    it('should call render icon if set', () => {
      const renderIcon = jest.fn();
      const wrapper = shallow(<Node renderIcon={renderIcon} />);
      expect(renderIcon).toHaveBeenCalledTimes(1);
    });

    it('should render what function returns', () => {
      const renderIcon = () => <div id="customIcon" />;
      const wrapper = shallow(<Node renderIcon={renderIcon} />);
      expect(wrapper.find('#customIcon')).toHaveLength(1);
    });

    it('should be called with nodeProps', () => {
      const renderIcon = jest.fn();
      const wrapper = shallow(
        <Node index={1} node={{ color: 'green' }} renderIcon={renderIcon} />
      );
      expect(renderIcon.mock.calls[0][0].index).toEqual(1);
      expect(renderIcon.mock.calls[0][0].node.color).toEqual('green');
    });
  });

  describe('renderCheck', () => {
    it('should call renderCheck', () => {
      const renderCheck = jest.fn();
      let wrapper = mount(
        <Node
          enableChecked
          node={{ label: 'test' }}
          renderCheck={renderCheck}
        />
      );
      expect(renderCheck).toHaveBeenCalledTimes(1);
    });

    it('should render what rendeCheck returns', () => {
      const renderCheck = () => <div id="customCheck" />;
      let wrapper = mount(
        <Node
          enableChecked
          node={{ label: 'test' }}
          renderCheck={renderCheck}
        />
      );
      expect(wrapper.find('#customCheck')).toHaveLength(1);
    });

    it('mutating props will change check', () => {
      const renderCheck = domProps => {
        domProps.id = 'mutatedIdx';
      };

      let wrapper = shallow(
        <Node
          enableChecked
          node={{ label: 'test' }}
          renderCheck={renderCheck}
        />
      );

      expect(wrapper.find('#mutatedIdx').length).toBe(1);
      expect(
        wrapper.find('#mutatedIdx').hasClass(`${CLASS_NAME}__node__checkbox`)
      ).toBe(true);
    });
  });

  describe('renderNodeText', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Node enableChecked node={{ label: 'test' }} />);
    });

    it('should be called', () => {
      const renderNodeText = jest.fn();
      wrapper.setProps({ renderNodeText });
      expect(renderNodeText).toHaveBeenCalledTimes(1);
    });

    it('should render what rendeCheck returns', () => {
      const renderNodeText = () => <div id="customCheck" />;
      wrapper.setProps({ renderNodeText });
      expect(wrapper.find('#customCheck')).toHaveLength(1);
    });

    it('mutating props will change check', () => {
      const renderNodeText = domProps => {
        domProps.id = 'mutatedId1';
      };
      wrapper.setProps({ renderNodeText });
      expect(wrapper.find('#mutatedId1')).toHaveLength(1);
      expect(
        wrapper.find('#mutatedId1').hasClass(`${CLASS_NAME}__node__label__text`)
      ).toBe(true);
    });
  });
});
