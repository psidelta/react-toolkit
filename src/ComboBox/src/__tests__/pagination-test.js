import React from 'react';
import Combo from '../ComboBox';
import { mount } from 'enzyme';

describe('pagination', () => {
  it('calls loadNextPage with corret params', () => {
    const loadNextPage = sinon.spy();
    const wrapper = mount(
      <Combo loadNextPage={loadNextPage} skip={0} limit={20} />
    );

    wrapper.instance().loadNextpage();
    expect(loadNextPage.called).to.be.true;
    expect(loadNextPage.args[0][0]).to.deep.equal({
      skip: 20,
      limit: 20
    });
  });
  it('loadNextPage appends the array returned to datasource', () => {
    const initialData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const nextPageData = [{ id: 4 }, { id: 5 }, { id: 6 }];
    const finalData = [...initialData, ...nextPageData];

    const wrapper = mount(
      <Combo loadNextPage={() => nextPageData} dataSource={initialData} />
    );
    expect(wrapper.instance().getData()).to.deep.equal(initialData);
    wrapper.instance().loadNextpage();
    expect(wrapper.instance().getData()).to.deep.equal(finalData);
  });
  it('loadNextPage appends promise rezolve to dataSource', done => {
    const clock = sinon.useFakeTimers();
    const initialData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const nextPageData = [{ id: 4 }, { id: 5 }, { id: 6 }];
    const finalData = [...initialData, ...nextPageData];

    const wrapper = mount(
      <Combo
        loadNextPage={() =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve(nextPageData);
            }, 300);
          })
        }
        dataSource={initialData}
      />
    );
    expect(wrapper.instance().getData()).to.deep.equal(initialData);
    wrapper.instance().loadNextpage();
    expect(wrapper.instance().getData()).to.deep.equal(initialData);
    clock.tick(400);
    clock.restore();

    setTimeout(() => {
      expect(wrapper.instance().getData()).to.deep.equal(finalData);
      done();
    }, 0);
  });
});
