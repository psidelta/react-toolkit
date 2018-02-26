import React from 'react';

import Accordion, { CLASS_NAME } from '../Accordion';
import { shallow, mount } from 'enzyme';

describe('Accordion tab title style props', () => {
  let component,
    instance,
    CUSTOM_CLASS_NAME = 'CUSTOM_CLASS_NAME',
    CUSTOM_CLASS_NAME_2 = 'CUSTOM_CLASS_NAME_2',
    tabTitleComponents,
    tabTitleStyle = { padding: 20 },
    extraStyleProps = { fontSize: 13 };

  beforeEach(() => {
    component = mount(
      <Accordion
        transition={false}
        tabTitleStyle={tabTitleStyle}
        tabTitleAlign="start"
        tabTitleVerticalAlign="top"
        tabTitleEllipsis={false}
      >
        <div locked data-test="tab-content-1" tabTitle="Tab 1">Tab 1</div>
        <div disabled data-test="tab-content-2" tabTitle="Tab 2">Tab 2</div>
        <div
          tabProps={{
            titleStyle: extraStyleProps,
            className: CUSTOM_CLASS_NAME_2,
            titleAlign: 'end',
            titleVerticalAlign: 'bottom',
            titleEllipsis: true
          }}
          data-test="tab-content-3"
          tabTitle="Tab 3"
        >
          Tab 3
        </div>
      </Accordion>
    );

    instance = component.instance();
    tabTitleComponents = component.find('ZippyAccordionTabTitle');
  });

  describe('tabTitleStyle', () => {
    it('should apply tabTitleStyle to all tab titles', () => {
      expect(tabTitleComponents.at(0).prop('tabTitleStyle')).to.deep.equal(
        tabTitleStyle
      );
      expect(tabTitleComponents.at(1).prop('tabTitleStyle')).to.deep.equal(
        tabTitleStyle
      );
      expect(tabTitleComponents.at(2).prop('tabTitleStyle')).to.deep.equal({
        ...tabTitleStyle,
        ...extraStyleProps
      });
    });
  });

  describe('tabTitleAlign', () => {
    it('should apply tabTitleAlign to all tabs', () => {
      expect(tabTitleComponents.at(0).prop('tabTitleAlign')).to.equal('start');
      expect(tabTitleComponents.at(1).prop('tabTitleAlign')).to.equal('start');
      expect(tabTitleComponents.at(2).prop('tabTitleAlign')).to.equal('end');
    });

    it('should map non standard values to start and end', () => {
      component.setProps({
        tabTitleAlign: 'left'
      });
      tabTitleComponents = component.find('ZippyAccordionTabTitle');
      expect(
        tabTitleComponents.at(0).node.refs.tabWrapper.className
      ).to.contain('align-start');
      expect(
        tabTitleComponents.at(1).node.refs.tabWrapper.className
      ).to.contain('align-start');

      component.setProps({
        tabTitleAlign: 'top'
      });
      tabTitleComponents = component.find('ZippyAccordionTabTitle');

      expect(
        tabTitleComponents.at(0).node.refs.tabWrapper.className
      ).to.contain('align-start');
      expect(
        tabTitleComponents.at(1).node.refs.tabWrapper.className
      ).to.contain('align-start');

      component.setProps({
        tabTitleAlign: 'right'
      });
      tabTitleComponents = component.find('ZippyAccordionTabTitle');

      expect(
        tabTitleComponents.at(0).node.refs.tabWrapper.className
      ).to.contain('align-end');
      expect(
        tabTitleComponents.at(1).node.refs.tabWrapper.className
      ).to.contain('align-end');

      component.setProps({
        tabTitleAlign: 'bottom'
      });
      tabTitleComponents = component.find('ZippyAccordionTabTitle');

      expect(
        tabTitleComponents.at(0).node.refs.tabWrapper.className
      ).to.contain('align-end');
      expect(
        tabTitleComponents.at(1).node.refs.tabWrapper.className
      ).to.contain('align-end');
    });
  });

  describe('tabTitleVerticalAlign', () => {
    it('should apply tabTitleVerticalAlign to all tabs', () => {
      expect(tabTitleComponents.at(0).prop('tabTitleVerticalAlign')).to.equal(
        'top'
      );
      expect(tabTitleComponents.at(1).prop('tabTitleVerticalAlign')).to.equal(
        'top'
      );
      expect(tabTitleComponents.at(2).prop('tabTitleVerticalAlign')).to.equal(
        'bottom'
      );
    });
  });

  describe('tabTitleEllipsis', () => {
    it('should apply tabTitleEllipsis to all tabs', () => {
      expect(tabTitleComponents.at(0).prop('tabTitleEllipsis')).to.equal(false);
      expect(tabTitleComponents.at(1).prop('tabTitleEllipsis')).to.equal(false);
      expect(tabTitleComponents.at(2).prop('tabTitleEllipsis')).to.equal(true);
    });
  });

  describe('renderTabTitle', () => {
    it('should set renderTabTitle to AccordionTabTitle', () => {
      const renderTabTitleSpy = sinon.spy(domProps => {
        return <div {...domProps} />;
      });
      component.setProps({
        renderTabTitle: renderTabTitleSpy
      });

      expect(tabTitleComponents.at(0).prop('renderTabTitle')).to.equal(
        renderTabTitleSpy
      );
      expect(tabTitleComponents.at(1).prop('renderTabTitle')).to.equal(
        renderTabTitleSpy
      );
      expect(tabTitleComponents.at(2).prop('renderTabTitle')).to.equal(
        renderTabTitleSpy
      );

      const callArguments = renderTabTitleSpy.args[0][1];
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
        expect(callArguments).to.have.property(key);
      });
    });
  });

  describe('tabTitleRotate', () => {
    it('should support tabTitleRotate in horizontal mode', () => {
      component.setProps({
        horizontal: true,
        tabTitleRotate: -90
      });

      expect(tabTitleComponents.at(0).prop('tabTitleRotate')).to.equal(-90);
      expect(tabTitleComponents.at(1).prop('tabTitleRotate')).to.equal(-90);
      expect(tabTitleComponents.at(2).prop('tabTitleRotate')).to.equal(-90);
    });
  });
});
