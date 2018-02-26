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
import { shallow } from 'enzyme';
import Combo from '../ComboBox';

xdescribe('loadAsyncDataSource', () => {
  it('it is called list expands', () => {
    const loadAsyncDataSource = sinon.spy();
    const wrapper = shallow(
      <Combo
        defaultExpanded={false}
        loadAsyncDataSource={loadAsyncDataSource}
      />
    );
    wrapper.instance().expand();
    expect(loadAsyncDataSource.called).to.be.true;
  });
  it('is called when length of text is more than filterMinLength', () => {
    const loadAsyncDataSource = sinon.spy();
    const wrapper = shallow(
      <Combo
        defaultText={''}
        filterMinLength={3}
        loadAsyncDataSource={loadAsyncDataSource}
      />
    );
    expect(loadAsyncDataSource.called).to.be.false;
    wrapper.instance().setText('12');
    expect(loadAsyncDataSource.called).to.be.false;
    wrapper.instance().setText('123');
    expect(loadAsyncDataSource.called).to.be.true;
  });
  it('replaces datasource when called', () => {
    const data = [{ id: 'hello world' }];
    const wrapper = shallow(<Combo loadAsyncDataSource={() => data} />);
    expect(wrapper.instance().getData()).to.be.falsey;
    wrapper.instance().loadAsyncDataSource({ action: 'fake' });
    expect(wrapper.instance().getData()).to.equal(data);
  });
});
