import React from 'react';
import TreeView from '../TreeView';
import { shallow } from 'enzyme';

describe('dataSource', () => {
  describe('is array', () => {
    const dataSource = [{ label: 'hello world' }];
    const wrapper = shallow(<TreeView dataSource={dataSource} />);

    it('should have state.loading false', () => {
      expect(wrapper.state('loading')).toBe(false);
    });

    it('should have state.data the original passed array', () => {
      expect(wrapper.state('data')).toEqual(dataSource);
    });
  });

  describe('is promise', () => {
    const data = [{ label: 'promised item' }];

    it('should have loading true', () => {
      const dataPromise = new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 20);
      });
      const wrapper = shallow(<TreeView dataSource={dataPromise} />);

      expect(wrapper.state('loading')).toBe(true);
    });

    it('should have loading false and data after 50ms', done => {
      const dataPromise = new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 100);
      });
      const wrapper = shallow(<TreeView dataSource={dataPromise} />);

      setTimeout(() => {
<<<<<<< HEAD:src/TreeView/src/__jests__/dataSource-test.js
        expect(wrapper.state('loading')).toBe(false);
        expect(wrapper.state('data')).toEqual(data);
=======
        expect(wrapper.state('loading')).to.be.false;
        expect(wrapper.state('data')).to.equal(data);
>>>>>>> dev:src/TreeView/src/__tests__/dataSource-test.js
        done();
      }, 110);
    });
  });

  describe('is a function', () => {
    const data = [{ label: 'function label' }];
    const dataFunction = () => data;
    const wrapper = shallow(<TreeView dataSource={dataFunction} />);

    it('should have loading false', () => {
      expect(wrapper.state('loading')).toBe(false);
    });

    it('should have state.data the original passed array', () => {
      expect(wrapper.state('data')).toEqual(data);
    });
  });

  describe('datasource load event', () => {
    it('should call event when promise rezolves', done => {
      const onDataSourceLoad = jest.fn();
      const data = [{ label: 'promised item' }];
      const dataPromise = new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 50);
      });
      const wrapper = shallow(
        <TreeView
          onDataSourceLoad={onDataSourceLoad}
          dataSource={dataPromise}
        />
      );
<<<<<<< HEAD:src/TreeView/src/__jests__/dataSource-test.js
      expect(onDataSourceLoad).toHaveBeenCalledTimes(0);
      setTimeout(() => {
        expect(onDataSourceLoad).toHaveBeenCalledTimes(1);
        done();
      }, 100);
=======
      expect(onDataSourceLoad.called).to.be.false;
      setTimeout(() => {
        expect(onDataSourceLoad.called).to.be.true;
        done();
      }, 50);
>>>>>>> dev:src/TreeView/src/__tests__/dataSource-test.js
    });
  });

  it('should update state.data when dataSource changes', () => {
    const dataSource = [{ label: 'hello world' }];
    const dataSource2 = [{ label: 'hello world2' }];
    const wrapper = shallow(<TreeView dataSource={dataSource} />);

    expect(wrapper.state('data')).toEqual(dataSource);
    wrapper.setProps({ dataSource: dataSource2 });
    expect(wrapper.state('data')).toEqual(dataSource2);
  });
});
