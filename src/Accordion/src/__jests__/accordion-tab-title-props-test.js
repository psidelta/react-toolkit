/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
        <div locked data-test="tab-content-1" tabTitle="Tab 1">
          Tab 1
        </div>
        <div disabled data-test="tab-content-2" tabTitle="Tab 2">
          Tab 2
        </div>
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
      expect(tabTitleComponents.at(0).prop('tabTitleStyle')).toEqual(
        tabTitleStyle
      );
      expect(tabTitleComponents.at(1).prop('tabTitleStyle')).toEqual(
        tabTitleStyle
      );
      expect(tabTitleComponents.at(2).prop('tabTitleStyle')).toEqual({
        ...tabTitleStyle,
        ...extraStyleProps
      });
    });
  });

  describe('tabTitleAlign', () => {
    it('should apply tabTitleAlign to all tabs', () => {
      expect(tabTitleComponents.at(0).prop('tabTitleAlign')).toEqual('start');
      expect(tabTitleComponents.at(1).prop('tabTitleAlign')).toEqual('start');
      expect(tabTitleComponents.at(2).prop('tabTitleAlign')).toEqual('end');
    });

    it('should map non standard values to start and end', () => {
      const component = mount(
        <Accordion
          transition={false}
          tabTitleStyle={tabTitleStyle}
          tabTitleAlign="start"
          tabTitleVerticalAlign="top"
          tabTitleEllipsis={false}
        >
          <div locked data-test="tab-content-1" tabTitle="Tab 1">
            Tab 1
          </div>
          <div disabled data-test="tab-content-2" tabTitle="Tab 2">
            Tab 2
          </div>
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

      let tabTitleComponents = component.find('ZippyAccordionTabTitle');
      expect(
        tabTitleComponents.find(
          '.zippy-react-toolkit-accordion__tab-title--align-start'
        )
      ).toHaveLength(2);
      expect(
        tabTitleComponents.find(
          '.zippy-react-toolkit-accordion__tab-title--align-end'
        )
      ).toHaveLength(1);

      component.setProps({
        tabTitleAlign: 'right'
      });

      tabTitleComponents = component.find('ZippyAccordionTabTitle');

      expect(
        tabTitleComponents.find(
          '.zippy-react-toolkit-accordion__tab-title--align-start'
        )
      ).toHaveLength(0);

      expect(
        tabTitleComponents.find(
          '.zippy-react-toolkit-accordion__tab-title--align-end'
        )
      ).toHaveLength(3);
      return;
    });
  });

  describe('tabTitleVerticalAlign', () => {
    it('should apply tabTitleVerticalAlign to all tabs', () => {
      expect(tabTitleComponents.at(0).prop('tabTitleVerticalAlign')).toEqual(
        'top'
      );
      expect(tabTitleComponents.at(1).prop('tabTitleVerticalAlign')).toEqual(
        'top'
      );
      expect(tabTitleComponents.at(2).prop('tabTitleVerticalAlign')).toEqual(
        'bottom'
      );
    });
  });

  describe('tabTitleEllipsis', () => {
    it('should apply tabTitleEllipsis to all tabs', () => {
      expect(tabTitleComponents.at(0).prop('tabTitleEllipsis')).toEqual(false);
      expect(tabTitleComponents.at(1).prop('tabTitleEllipsis')).toEqual(false);
      expect(tabTitleComponents.at(2).prop('tabTitleEllipsis')).toEqual(true);
    });
  });

  describe('renderTabTitle', () => {
    it('should set renderTabTitle to AccordionTabTitle', () => {
      const renderTabTitleSpy = jest.fn(domProps => {
        return <div {...domProps} />;
      });
      const component = mount(
        <Accordion
          transition={false}
          tabTitleStyle={tabTitleStyle}
          tabTitleAlign="start"
          tabTitleVerticalAlign="top"
          tabTitleEllipsis={false}
          renderTabTitle={renderTabTitleSpy}
        >
          <div locked data-test="tab-content-1" tabTitle="Tab 1">
            Tab 1
          </div>
          <div disabled data-test="tab-content-2" tabTitle="Tab 2">
            Tab 2
          </div>
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
      const tabTitleComponents = component.find('ZippyAccordionTabTitle');
      expect(tabTitleComponents.at(0).prop('renderTabTitle')).toEqual(
        renderTabTitleSpy
      );
      expect(tabTitleComponents.at(1).prop('renderTabTitle')).toEqual(
        renderTabTitleSpy
      );
      expect(tabTitleComponents.at(2).prop('renderTabTitle')).toEqual(
        renderTabTitleSpy
      );

      const callArguments = renderTabTitleSpy.mock.calls[0][1];
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

  describe('tabTitleRotate', () => {
    it('should support tabTitleRotate in horizontal mode', () => {
      component.setProps({
        horizontal: true,
        tabTitleRotate: -90
      });

      expect(tabTitleComponents.at(0).prop('tabTitleRotate')).toEqual(-90);
      expect(tabTitleComponents.at(1).prop('tabTitleRotate')).toEqual(-90);
      expect(tabTitleComponents.at(2).prop('tabTitleRotate')).toEqual(-90);
    });
  });
});
