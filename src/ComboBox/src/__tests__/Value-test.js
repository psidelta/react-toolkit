/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { mount } from 'enzyme';
import Value from '../Value';
import Tag from '../Tag';

describe('Value', () => {
  describe('render tag', () => {
    it('renderTag overwrites the tag render', () => {
      const wrapper = mount(
        <Value multiple value={['world']} items={[{ label: 'hello', id: 'world' }]} />
      );
      expect(wrapper.find(Tag)).to.have.length(1);

      wrapper.setProps({
        renderTag: ({ domProps }) => <div key={domProps.key} id="helloWorld" />
      });

      expect(wrapper.find(Tag)).to.have.length(1);
      expect(wrapper.find('#helloWorld')).to.have.length(1);
    });
    it('renderTag can mutate props that are applied on Tag', () => {
      const wrapper = mount(
        <Value
          multiple
          value={['world']}
          items={[{ label: 'hello', id: 'world' }]}
          renderTag={({ domProps }) => {
            domProps.id = 'mutatedId';
          }}
        />
      );
      expect(wrapper.find(Tag)).to.have.length(1);
      expect(wrapper.find('#mutatedId')).to.have.length(1);
    });
  });

  describe('renderTags', () => {
    it('overwrites render tags', () => {
      const wrapper = mount(
        <Value
          multiple
          value={['world']}
          items={[{ label: 'hello', id: 'world' }]}
          renderTags={({ tags }) => <div id="customTags" children={tags} />}
        />
      );
      expect(wrapper.find('#customTags')).to.have.length(1);
      expect(wrapper.find(Tag)).to.have.length(1);
    });
  });

  describe('renderRemainingTags', () => {
    it('overwrites combined tag render', () => {
      const wrapper = mount(
        <Value
          multiple
          value={['world']}
          renderRemainingTags={({ domProps }) => <div key={domProps.key} id="customRemainigTag" />}
          groupedItems={{
            visibleItems: [{ label: 'hello', id: 'world' }, { label: 'hello', id: 'world1' }],
            remainingItems: [{ label: 'hello', id: 'world2' }]
          }}
        />
      );
      expect(wrapper.find(Tag)).to.have.length(2);
      expect(wrapper.find('#customRemainigTag')).to.have.length(1);
    });
  });

  describe('renderDisplayValue', () => {
    it('renders custom display value', () => {
      const wrapper = mount(
        <Value
          multiple={false}
          focus={false}
          label={'hello world'}
          renderDisplayValue={() => {
            return <div id="customDisplayValue" />;
          }}
        />
      );
      expect(wrapper.find('#customDisplayValue')).to.have.length(1);
    });
    it('mutated props are added on default implmenetation', () => {
      const wrapper = mount(
        <Value
          multiple={false}
          focus={false}
          label={'hello world'}
          renderDisplayValue={({ domProps }) => {
            domProps.id = 'customDisplayValue';
          }}
        />
      );
      expect(wrapper.find('#customDisplayValue')).to.have.length(1);
    });
  });
});
