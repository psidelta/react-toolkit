import React from 'react';
import { mount } from 'enzyme';
import TreeView from '../TreeView';
import Node from '../Node';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('node classNames', () => {
  describe('nodeClassName and node.className', () => {
    it('should compute correct classname using strings', () => {
      const nodeClassName = 'node className';
      const globalClassName = 'global className';
      const dataSource = [
        {
          label: 'hello world',
          className: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} nodeClassName={globalClassName} />
      );

      const test = wrapper
        .find(Node)
        .first()
        .props().domProps.className;
      expect(test).to.equal(`${globalClassName} ${nodeClassName}`);
    });

    it('should compute correct classname using a function', () => {
      const nodeClassName = 'node className';
      const globalClassName = 'global className';
      const dataSource = [
        {
          label: 'hello world',
          className: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView
          dataSource={() => dataSource}
          nodeClassName={() => globalClassName}
        />
      );

      const test = wrapper
        .find(Node)
        .first()
        .props().domProps.className;
      expect(test).to.equal(`${globalClassName} ${nodeClassName}`);
    });

    it('should call className function with correct args', () => {
      const globalClassName = sinon.spy();
      const nodeClassName = sinon.spy();
      const dataSource = [
        {
          label: 'hello world',
          className: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} nodeClassName={globalClassName} />
      );

      expect(globalClassName.called).to.be.true;
      expect(nodeClassName.called).to.be.true;

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalClassName.args[0][0].path).to.equal(path);
      expect(globalClassName.args[0][0].index).to.equal(index);

      expect(nodeClassName.args[0][0].path).to.equal(path);
      expect(nodeClassName.args[0][0].index).to.equal(index);
    });
  });

  describe('labelClassName and node.labelClassName', () => {
    it('should compute correct classname using strings', () => {
      const nodeClassName = 'node className';
      const globalClassName = 'global className';
      const dataSource = [
        {
          label: 'hello world',
          labelClassName: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} labelClassName={globalClassName} />
      );

      const test = wrapper
        .find(Node)
        .first()
        .props().labelClassName;
      expect(test).to.equal(`${globalClassName} ${nodeClassName}`);
    });

    it('shoud compute correct classname using a function', () => {
      const nodeClassName = 'node className';
      const globalClassName = 'global className';
      const dataSource = [
        {
          label: 'hello world',
          labelClassName: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView
          dataSource={() => dataSource}
          labelClassName={() => globalClassName}
        />
      );

      const test = wrapper
        .find(Node)
        .first()
        .props().labelClassName;
      expect(test).to.equal(`${globalClassName} ${nodeClassName}`);
    });

    it('should call className function with correct args', () => {
      const globalClassName = sinon.spy();
      const nodeClassName = sinon.spy();
      const dataSource = [
        {
          label: 'hello world',
          labelClassName: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} labelClassName={globalClassName} />
      );

      expect(globalClassName.called).to.be.true;
      expect(nodeClassName.called).to.be.true;

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalClassName.args[0][0].path).to.equal(path);
      expect(globalClassName.args[0][0].index).to.equal(index);

      expect(nodeClassName.args[0][0].path).to.equal(path);
      expect(nodeClassName.args[0][0].index).to.equal(index);
    });
  });

  describe('contentClassName and node.contentClassName', () => {
    it('should compute correct classname using strings', () => {
      const nodeClassName = 'node className';
      const globalClassName = 'global className';
      const dataSource = [
        {
          label: 'hello world',
          contentClassName: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} contentClassName={globalClassName} />
      );

      const test = wrapper
        .find(Node)
        .first()
        .props().contentClassName;
      expect(test).to.equal(`${globalClassName} ${nodeClassName}`);
    });

    it('shoud compute correct classname using a function', () => {
      const nodeClassName = 'node className';
      const globalClassName = 'global className';
      const dataSource = [
        {
          label: 'hello world',
          contentClassName: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView
          dataSource={() => dataSource}
          contentClassName={() => globalClassName}
        />
      );

      const test = wrapper
        .find(Node)
        .first()
        .props().contentClassName;
      expect(test).to.equal(`${globalClassName} ${nodeClassName}`);
    });

    it('should call className function with correct args', () => {
      const globalClassName = sinon.spy();
      const nodeClassName = sinon.spy();
      const dataSource = [
        {
          label: 'hello world',
          contentClassName: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} contentClassName={globalClassName} />
      );

      expect(globalClassName.called).to.be.true;
      expect(nodeClassName.called).to.be.true;

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalClassName.args[0][0].path).to.equal(path);
      expect(globalClassName.args[0][0].index).to.equal(index);

      expect(nodeClassName.args[0][0].path).to.equal(path);
      expect(nodeClassName.args[0][0].index).to.equal(index);
    });
  });
});
