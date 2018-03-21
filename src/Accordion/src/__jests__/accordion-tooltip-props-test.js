import React from 'react';

import Accordion, { CLASS_NAME } from '../Accordion';
import AccordionTabTitle, {
  CLASS_NAME as TITLE_CLASS_NAME
} from '../AccordionTabTitle';
import { shallow, mount } from 'enzyme';

describe('Accordion tooltip props', () => {
  let component, instance;

  beforeEach(() => {
    component = mount(
      <Accordion transition={false}>
        <div locked data-test="tab-content-1" tabTitle="Tab 1">
          Tab 1
        </div>
        <div disabled data-test="tab-content-2" tabTitle="Tab 2">
          Tab 2
        </div>
        <div data-test="tab-content-3" tabTitle="Tab 3">
          Tab 3
        </div>
      </Accordion>
    );

    instance = component.instance();
  });

  describe('expandTool', () => {
    it('should render expandTool by default', () => {
      const titleComponent = component.find('ZippyAccordionTabTitle').at(0);
      expect(typeof titleComponent.prop('expandTool')).toBe('function');
      expect(titleComponent.prop('expandTool')).toEqual(
        AccordionTabTitle.defaultProps.expandTool
      );
    });

    it('should disabled expandTool with expandTool=null', () => {
      component.setProps({
        expandTool: null
      });
      const titleComponent = component.find('ZippyAccordionTabTitle').at(0);
      expect(titleComponent.prop('expandTool')).toEqual(null);
    });

    it('should support jsx/string as expandTool', () => {
      const expandTool1 = 'a';
      const expandTool2 = <div>ok</div>;
      component.setProps({
        expandTool: expandTool1
      });
      expect(
        component
          .find('ZippyAccordionTabTitle')
          .at(0)
          .prop('expandTool')
      ).toEqual(expandTool1);
      component.setProps({
        expandTool: expandTool2
      });
      expect(
        component
          .find('ZippyAccordionTabTitle')
          .at(0)
          .prop('expandTool')
      ).toEqual(expandTool2);
    });

    it('should support function as expandTool', () => {
      const expandToolStub = jest.fn(() => <div />);
      component.setProps({
        expandTool: expandToolStub
      });

      expect(
        component
          .find('ZippyAccordionTabTitle')
          .at(0)
          .prop('expandTool')
      ).toEqual(expandToolStub);
      expect(expandToolStub).toHaveBeenCalledTimes(3);
    });
  });

  describe('expandOnToolOnly', () => {
    it('should set expandOnToolOnly to tab titles', () => {
      component.setProps({
        expandOnToolOnly: true
      });
      expect(
        component
          .find('ZippyAccordionTabTitle')
          .at(0)
          .prop('expandOnToolOnly')
      ).toEqual(true);
    });
  });

  it('should warn on props.expandOnToolOnly && props.expandTool === null', () => {
    component = mount(
      <Accordion transition={false} expandOnToolOnly={true} expandTool={null}>
        <div locked data-test="tab-content-1" tabTitle="Tab 1">
          Tab 1
        </div>
        <div disabled data-test="tab-content-2" tabTitle="Tab 2">
          Tab 2
        </div>
        <div data-test="tab-content-3" tabTitle="Tab 3">
          Tab 3
        </div>
      </Accordion>
    );
    expect(
      component
        .find('ZippyAccordionTabTitle')
        .at(0)
        .prop('expandOnToolOnly')
    ).toEqual(false);
  });
});

describe('AccordionTabTitle expandTool props', () => {
  describe('AccordionTabTitle expandTool', () => {
    let component;
    beforeEach(() => {
      component = shallow(<AccordionTabTitle tabTitle="title" />);
    });

    it('should render default expandTool', () => {
      expect(
        component.find(`.${TITLE_CLASS_NAME}__expand-tool-wrapper`)
      ).toHaveProperty('length', 1);
    });

    it('should not render if expandTool=null', () => {
      component.setProps({
        expandTool: null
      });
      expect(
        component.find(`.${TITLE_CLASS_NAME}__expand-tool-wrapper`)
      ).toHaveProperty('length', 0);
    });

    it('should render custom expandTool calling renderer with proper params', () => {
      const expandToolStub = jest.fn(() => <div />);
      component.setProps({
        expandTool: expandToolStub
      });

      const callArguments = expandToolStub.mock.calls[0][0];
      [
        'expanded',
        'index',
        'activeIndex',
        'disabled',
        'multiExpand',
        'collapsible',
        'focused',
        'transition'
      ].forEach(key => {
        expect(callArguments).toHaveProperty(key);
      });
    });
  });

  describe('expandOnToolOnly', () => {
    it('binds even listener on wrapper', () => {
      const onToggleSpy = jest.fn();
      const component = shallow(
        <AccordionTabTitle onToggle={onToggleSpy} tabTitle="title" />
      );
      const toolWrapper = component.find(
        `.${TITLE_CLASS_NAME}__expand-tool-wrapper`
      );
      expect(toolWrapper.prop('onClick')).toBe(undefined);

      component.find(`.${TITLE_CLASS_NAME}`).simulate('click');
      expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });

    it('binds even listener only on tooltip when expandOnToolOnly=true', () => {
      const onToggleSpy = jest.fn();
      const component = shallow(
        <AccordionTabTitle
          expandOnToolOnly
          onToggle={onToggleSpy}
          tabTitle="title"
        />
      );
      const toolWrapper = component.find(
        `.${TITLE_CLASS_NAME}__expand-tool-wrapper`
      );
      expect(toolWrapper.prop('onClick')).toEqual(onToggleSpy);

      component.simulate('click');
      expect(onToggleSpy).toHaveBeenCalledTimes(0);
      toolWrapper.simulate('click');
      expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });
  });
});
