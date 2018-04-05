/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
        expect(wrapper.state('loading')).toBe(false);
        expect(wrapper.state('data')).toEqual(data);
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
    it('should call event when promise resolves', done => {
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
      expect(onDataSourceLoad).toHaveBeenCalledTimes(0);
      setTimeout(() => {
        expect(onDataSourceLoad).toHaveBeenCalledTimes(1);
        done();
      }, 100);
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
