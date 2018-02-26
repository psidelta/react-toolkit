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
import Overlay from '../Overlay';

describe('style and classnames', () => {
  describe('border', () => {
    it('should add border on outer wrapper', () => {
      const wrapper = mount(<Overlay border="1px solid red" />);
      expect(wrapper.find('.react-overlay').at(0).props().style.border).to.equal('1px solid red');
    });
  });
  describe('height', () => {
    it('should be added on inline style', () => {
      const wrapper = mount(<Overlay height={100} />);
      expect(wrapper.find('.react-overlay').at(0).props().style.height).to.equal(100);
    });
  });
  describe('width', () => {
    it('should be added on inline style', () => {
      const wrapper = mount(<Overlay width={100} />);
      expect(wrapper.find('.react-overlay').at(0).props().style.width).to.equal(100);
    });
  });
});
