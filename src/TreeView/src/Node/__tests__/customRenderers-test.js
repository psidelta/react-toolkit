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
      const renderLabel = sinon.spy();
      wrapper.setProps({ renderLabel });
      expect(renderLabel.called).to.be.true;
    });

    it('should render what renderLabel returns', () => {
      const renderLabel = () => <div id="testCustomLabel" />;
      wrapper.setProps({ renderLabel });
      expect(wrapper.find('#testCustomLabel')).to.have.length(1);
    });

    it('mutating props will change label', () => {
      const renderLabel = domProps => {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderLabel });
      expect(wrapper.find('#mutatedId')).to.have.length(1);
      expect(wrapper.find('#mutatedId').hasClass(`${CLASS_NAME}__node__label`))
        .to.be.true;
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
      const renderContent = sinon.spy();
      wrapper.setProps({ renderContent });
      expect(renderContent.called).to.be.true;
    });

    it('should render what renderContent returns', () => {
      const renderContent = () => <div id="testCustomLabel" />;
      wrapper.setProps({ renderContent });
      expect(wrapper.find('#testCustomLabel')).to.have.length(1);
    });

    it('mutating props will change content', () => {
      const renderContent = domProps => {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderContent });
      expect(wrapper.find('#mutatedId')).to.have.length(1);
      expect(
        wrapper.find('#mutatedId').hasClass(`${CLASS_NAME}__node__content`)
      ).to.be.true;
    });
  });

  describe('renderIcon', () => {
    it('should call render icon if set', () => {
      const renderIcon = sinon.spy();
      const wrapper = shallow(<Node renderIcon={renderIcon} />);
      expect(renderIcon.called).to.be.true;
    });

    it('should render what function returns', () => {
      const renderIcon = () => <div id="customIcon" />;
      const wrapper = shallow(<Node renderIcon={renderIcon} />);
      expect(wrapper.find('#customIcon')).to.have.length(1);
    });

    it('should be called with nodeProps', () => {
      const renderIcon = sinon.spy();
      const wrapper = shallow(
        <Node index={1} node={{ color: 'green' }} renderIcon={renderIcon} />
      );
      expect(renderIcon.args[0][0].index).to.equal(1);
      expect(renderIcon.args[0][0].node.color).to.equal('green');
    });
  });

  describe('renderCheck', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Node enableChecked node={{ label: 'test' }} />);
    });

    it('should call renderCheck', () => {
      const renderCheck = sinon.spy();
      wrapper.setProps({ renderCheck });
      expect(renderCheck.called).to.be.true;
    });

    it('should render what rendeCheck returns', () => {
      const renderCheck = () => <div id="customCheck" />;
      wrapper.setProps({ renderCheck });
      expect(wrapper.find('#customCheck')).to.have.length(1);
    });

    it('mutating props will change check', () => {
      const renderCheck = domProps => {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderCheck });
      expect(wrapper.find('#mutatedId')).to.have.length(1);

      expect(wrapper.find('#mutatedId').hasClass(`${CLASS_NAME}__node__check`))
        .to.be.true;
    });
  });

  describe('renderNodeText', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Node enableChecked node={{ label: 'test' }} />);
    });

    it('should be called', () => {
      const renderNodeText = sinon.spy();
      wrapper.setProps({ renderNodeText });
      expect(renderNodeText.called).to.be.true;
    });

    it('should render what rendeCheck returns', () => {
      const renderNodeText = () => <div id="customCheck" />;
      wrapper.setProps({ renderNodeText });
      expect(wrapper.find('#customCheck')).to.have.length(1);
    });

    it('mutating props will change check', () => {
      const renderNodeText = domProps => {
        domProps.id = 'mutatedId';
      };
      wrapper.setProps({ renderNodeText });
      expect(wrapper.find('#mutatedId')).to.have.length(1);
      expect(
        wrapper.find('#mutatedId').hasClass(`${CLASS_NAME}__node__label__text`)
      ).to.be.true;
    });
  });
});
