import React from 'react';

import Accordion, { CLASS_NAME } from '../Accordion';
import { shallow, mount } from 'enzyme';

describe('Accordion tab style props', () => {
  let component,
    instance,
    CUSTOM_CLASS_NAME = 'CUSTOM_CLASS_NAME',
    CUSTOM_CLASS_NAME_2 = 'CUSTOM_CLASS_NAME_2',
    tabContentComponents,
    tabStyle = { padding: 20 },
    extraStyleProps = { fontSize: 13 };

  beforeEach(() => {
    component = mount(
      <Accordion
        transition={false}
        tabStyle={tabStyle}
        tabClassName={CUSTOM_CLASS_NAME}
      >
        <div data-test="tab-content-1" tabTitle="Tab 1">Tab 1</div>
        <div data-test="tab-content-2" tabTitle="Tab 2">Tab 2</div>
        <div
          tabProps={{
            style: extraStyleProps,
            className: CUSTOM_CLASS_NAME_2
          }}
          data-test="tab-content-3"
          tabTitle="Tab 3"
        >
          Tab 3
        </div>
      </Accordion>
    );

    instance = component.instance();
    tabContentComponents = component.find('ZippyAccordionTabContent');
  });

  describe('tabStyle', () => {
    it('should apply tabStyle to all tabs', () => {
      expect(tabContentComponents.at(0).prop('wrapperStyle')).toEqual(
        tabStyle
      );
      expect(tabContentComponents.at(1).prop('wrapperStyle')).toEqual(
        tabStyle
      );
      expect(tabContentComponents.at(2).prop('wrapperStyle')).toEqual({
        ...tabStyle,
        ...extraStyleProps
      });
    });
  });

  describe('tabClassName', () => {
    it('should add tabClassName to all tabs', () => {
      expect(tabContentComponents.at(0).prop('wrapperClassName')).to.equal(
        CUSTOM_CLASS_NAME
      );
      expect(tabContentComponents.at(1).prop('wrapperClassName')).to.equal(
        CUSTOM_CLASS_NAME
      );
      expect(tabContentComponents.at(2).prop('wrapperClassName')).to.equal(
        `${CUSTOM_CLASS_NAME} ${CUSTOM_CLASS_NAME_2}`
      );
    });
  });
});
