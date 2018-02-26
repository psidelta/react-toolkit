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
