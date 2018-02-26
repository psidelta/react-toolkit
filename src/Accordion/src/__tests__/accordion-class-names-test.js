import React from 'react';

import Accordion, { CLASS_NAME } from '../Accordion';
import { shallow, mount } from 'enzyme';

describe('Accordion Classes', () => {
  let component;

  before(() => {
    component = shallow(
      <Accordion transition={false}>
        <div tabTitle="hello world">First tab</div>
        <div tabTitle="second tab">Second tab</div>
      </Accordion>
    );
  });

  it('should be instance of Accordion', () => {
    expect(component.instance()).to.be.instanceOf(Accordion);
  });

  describe('class name assigns', () => {
    it('should contain main class', () => {
      expect(component.prop('className')).to.contain(CLASS_NAME);
    });

    it('should contain theme class', () => {
      expect(component.prop('className')).to.contain(
        `${CLASS_NAME}--theme-default`
      );
    });

    it('should contain layout class', () => {
      expect(component.prop('className')).to.contain(`${CLASS_NAME}--vertical`);
      component.setProps({
        horizontal: true
      });
      expect(component.prop('className')).to.contain(
        `${CLASS_NAME}--horizontal`
      );
    });

    it('shuold contain tooltip position class', () => {
      expect(component.prop('className')).to.contain(
        `${CLASS_NAME}--expand-tool-end`
      );
      component.setProps({
        expandToolPosition: 'start'
      });
      expect(component.prop('className')).to.not.contain(
        `${CLASS_NAME}--expand-tool-end`
      );
      expect(component.prop('className')).to.contain(
        `${CLASS_NAME}--expand-tool-start`
      );
    });

    it('shuold contain expand count class', () => {
      expect(component.prop('className')).to.contain(
        `${CLASS_NAME}--single-expand`
      );
      component.setProps({
        multiExpand: true
      });
      expect(component.prop('className')).to.not.contain(
        `${CLASS_NAME}--single-expand`
      );
      expect(component.prop('className')).to.contain(
        `${CLASS_NAME}--multi-expand`
      );
    });

    it('should contain rtl class when rtl mode true', () => {
      expect(component.prop('className')).to.not.contain(`${CLASS_NAME}--rtl`);
      component.setProps({
        rtl: true
      });
      expect(component.prop('className')).to.contain(`${CLASS_NAME}--rtl`);
    });

    it('should add focus class on focus', () => {
      expect(component.prop('className')).to.not.contain(
        `${CLASS_NAME}--focused`
      );
      component.simulate('focus');
      expect(component.prop('className')).to.contain(`${CLASS_NAME}--focused`);
    });
  });
});
