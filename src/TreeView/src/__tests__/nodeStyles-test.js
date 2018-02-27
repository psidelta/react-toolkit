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
      expect(test).to.deep.equal({
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
      expect(test).to.deep.equal({
        color: 'node color',
        background: 'global background'
      });
    });

    it('style function is called with correct arguments', () => {
      const globalStyle = sinon.spy();
      const nodeStyle = sinon.spy();
      const dataSource = [
        {
          label: 'hello world',
          style: nodeStyle
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} nodeStyle={globalStyle} />
      );

      expect(globalStyle.called).to.be.true;
      expect(nodeStyle.called).to.be.true;

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalStyle.args[0][0].path).to.equal(path);
      expect(globalStyle.args[0][0].index).to.equal(index);

      expect(nodeStyle.args[0][0].path).to.equal(path);
      expect(nodeStyle.args[0][0].index).to.equal(index);
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
      expect(test).to.deep.equal({
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
      expect(test).to.deep.equal({
        color: 'node color',
        background: 'global background'
      });
    });

    it('style function is called with correct arguments', () => {
      const globalStyle = sinon.spy();
      const nodeStyle = sinon.spy();
      const dataSource = [
        {
          label: 'hello world',
          labelStyle: nodeStyle
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} labelStyle={globalStyle} />
      );

      expect(globalStyle.called).to.be.true;
      expect(nodeStyle.called).to.be.true;

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalStyle.args[0][0].path).to.equal(path);
      expect(globalStyle.args[0][0].index).to.equal(index);

      expect(nodeStyle.args[0][0].path).to.equal(path);
      expect(nodeStyle.args[0][0].index).to.equal(index);
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
      expect(test).to.deep.equal({
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
      expect(test).to.deep.equal({
        color: 'node color',
        background: 'global background',
        paddingLeft: 20
      });
    });

    it('style function is called with correct arguments', () => {
      const globalStyle = sinon.spy();
      const nodeStyle = sinon.spy();
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

      expect(globalStyle.called).to.be.true;
      expect(nodeStyle.called).to.be.true;

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalStyle.args[0][0].path).to.equal(path);
      expect(globalStyle.args[0][0].index).to.equal(index);

      expect(nodeStyle.args[0][0].path).to.equal(path);
      expect(nodeStyle.args[0][0].index).to.equal(index);
    });
  });
});
