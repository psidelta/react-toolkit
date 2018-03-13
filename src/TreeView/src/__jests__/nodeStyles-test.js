import React from 'react';
import TreeView from '../TreeView';
import Node from '../Node';
import { mount } from 'enzyme';

describe('nodeStyles', () => {
  describe('nodeStyle and node.style', () => {
    it('correct style is computed with style objects', () => {
      const dataSource = [
        {
          label: 'hello world',
          style: { color: 'node color' }
        }
      ];
      let wrapper = mount(
        <TreeView
          dataSource={dataSource}
          nodeStyle={{ color: 'global color', background: 'global background' }}
        />
      );
      const test = wrapper
        .find(Node)
        .first()
        .props().domProps.style;
<<<<<<< HEAD:src/TreeView/src/__jests__/nodeStyles-test.js
      expect(test).toEqual({
=======
      expect(test).to.deep.equal({
>>>>>>> dev:src/TreeView/src/__tests__/nodeStyles-test.js
        color: 'node color',
        background: 'global background'
      });
    });

    it('correct style is computed using functions', () => {
      const dataSource = [
        {
          label: 'hello world',
          style: () => ({ color: 'node color' })
        }
      ];
      let wrapper = mount(
        <TreeView
          dataSource={dataSource}
          nodeStyle={() => ({
            color: 'global color',
            background: 'global background'
          })}
        />
      );
      const test = wrapper
        .find(Node)
        .first()
        .props().domProps.style;
<<<<<<< HEAD:src/TreeView/src/__jests__/nodeStyles-test.js
      expect(test).toEqual({
=======
      expect(test).to.deep.equal({
>>>>>>> dev:src/TreeView/src/__tests__/nodeStyles-test.js
        color: 'node color',
        background: 'global background'
      });
    });

    it('style function is called with correct arguments', () => {
      const globalStyle = jest.fn();
      const nodeStyle = jest.fn();
      const dataSource = [
        {
          label: 'hello world',
          style: nodeStyle
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} nodeStyle={globalStyle} />
      );

      expect(globalStyle).toHaveBeenCalled();
      expect(nodeStyle).toHaveBeenCalled();

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalStyle.mock.calls[0][0].path).toEqual(path);
      expect(globalStyle.mock.calls[0][0].index).toEqual(index);

      expect(nodeStyle.mock.calls[0][0].path).toEqual(path);
      expect(nodeStyle.mock.calls[0][0].index).toEqual(index);
    });
  });

  describe('labelStyle and node.labelStyle', () => {
    it('correct style is computed with style objects', () => {
      const dataSource = [
        {
          label: 'hello world',
          labelStyle: { color: 'node color' }
        }
      ];
      let wrapper = mount(
        <TreeView
          dataSource={dataSource}
          labelStyle={{
            color: 'global color',
            background: 'global background'
          }}
        />
      );
      const test = wrapper
        .find(Node)
        .first()
        .props().labelStyle;
<<<<<<< HEAD:src/TreeView/src/__jests__/nodeStyles-test.js
      expect(test).toEqual({
=======
      expect(test).to.deep.equal({
>>>>>>> dev:src/TreeView/src/__tests__/nodeStyles-test.js
        color: 'node color',
        background: 'global background'
      });
    });

    it('correct style is computed using functions', () => {
      const dataSource = [
        {
          label: 'hello world',
          labelStyle: () => ({ color: 'node color' })
        }
      ];
      let wrapper = mount(
        <TreeView
          dataSource={dataSource}
          labelStyle={() => ({
            color: 'global color',
            background: 'global background'
          })}
        />
      );
      const test = wrapper
        .find(Node)
        .first()
        .props().labelStyle;
<<<<<<< HEAD:src/TreeView/src/__jests__/nodeStyles-test.js
      expect(test).toEqual({
=======
      expect(test).to.deep.equal({
>>>>>>> dev:src/TreeView/src/__tests__/nodeStyles-test.js
        color: 'node color',
        background: 'global background'
      });
    });

    it('style function is called with correct arguments', () => {
      const globalStyle = jest.fn();
      const nodeStyle = jest.fn();
      const dataSource = [
        {
          label: 'hello world',
          labelStyle: nodeStyle
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} labelStyle={globalStyle} />
      );

      expect(globalStyle).toHaveBeenCalled();
      expect(nodeStyle).toHaveBeenCalled();

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalStyle.mock.calls[0][0].path).toEqual(path);
      expect(globalStyle.mock.calls[0][0].index).toEqual(index);

      expect(nodeStyle.mock.calls[0][0].path).toEqual(path);
      expect(nodeStyle.mock.calls[0][0].index).toEqual(index);
    });
  });

  describe('contentStyle and node.contentStyle', () => {
    it('correct style is computed with style objects', () => {
      const dataSource = [
        {
          label: 'hello world',
          nodes: [],
          contentStyle: { color: 'node color' }
        }
      ];
      let wrapper = mount(
        <TreeView
          rtl={false}
          dataSource={dataSource}
          contentStyle={{
            color: 'global color',
            background: 'global background'
          }}
        />
      );
      const test = wrapper
        .find(Node)
        .first()
        .props().contentStyle;
<<<<<<< HEAD:src/TreeView/src/__jests__/nodeStyles-test.js
      expect(test).toEqual({
=======
      expect(test).to.deep.equal({
>>>>>>> dev:src/TreeView/src/__tests__/nodeStyles-test.js
        color: 'node color',
        background: 'global background',
        paddingLeft: 20
      });
    });

    it('correct style is computed using functions', () => {
      const dataSource = [
        {
          label: 'hello world',
          nodes: [],
          contentStyle: () => ({ color: 'node color' })
        }
      ];
      let wrapper = mount(
        <TreeView
          dataSource={dataSource}
          rtl={false}
          contentStyle={() => ({
            color: 'global color',
            background: 'global background'
          })}
        />
      );
      const test = wrapper
        .find(Node)
        .first()
        .props().contentStyle;
<<<<<<< HEAD:src/TreeView/src/__jests__/nodeStyles-test.js
      expect(test).toEqual({
=======
      expect(test).to.deep.equal({
>>>>>>> dev:src/TreeView/src/__tests__/nodeStyles-test.js
        color: 'node color',
        background: 'global background',
        paddingLeft: 20
      });
    });

    it('style function is called with correct arguments', () => {
      const globalStyle = jest.fn();
      const nodeStyle = jest.fn();
      const dataSource = [
        {
          label: 'hello world',
          nodes: [],
          contentStyle: nodeStyle
        }
      ];
      let wrapper = mount(
        <TreeView
          dataSource={dataSource}
          rtl={false}
          contentStyle={globalStyle}
        />
      );

      expect(globalStyle).toHaveBeenCalled();
      expect(nodeStyle).toHaveBeenCalled();

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalStyle.mock.calls[0][0].path).toEqual(path);
      expect(globalStyle.mock.calls[0][0].index).toEqual(index);

      expect(nodeStyle.mock.calls[0][0].path).toEqual(path);
      expect(nodeStyle.mock.calls[0][0].index).toEqual(index);
    });
  });
});
