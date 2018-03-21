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
      expect(test).toEqual(`${globalClassName} ${nodeClassName}`);
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
      expect(test).toEqual(`${globalClassName} ${nodeClassName}`);
    });

    it('should call className function with correct args', () => {
      const globalClassName = jest.fn();
      const nodeClassName = jest.fn();
      const dataSource = [
        {
          label: 'hello world',
          className: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} nodeClassName={globalClassName} />
      );

      expect(globalClassName).toHaveBeenCalled();
      expect(nodeClassName).toHaveBeenCalled();

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalClassName.mock.calls[0][0].path).toEqual(path);
      expect(globalClassName.mock.calls[0][0].index).toEqual(index);

      expect(nodeClassName.mock.calls[0][0].path).toEqual(path);
      expect(nodeClassName.mock.calls[0][0].index).toEqual(index);
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
      expect(test).toEqual(`${globalClassName} ${nodeClassName}`);
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
      expect(test).toEqual(`${globalClassName} ${nodeClassName}`);
    });

    it('should call className function with correct args', () => {
      const globalClassName = jest.fn();
      const nodeClassName = jest.fn();
      const dataSource = [
        {
          label: 'hello world',
          labelClassName: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} labelClassName={globalClassName} />
      );

      expect(globalClassName).toHaveBeenCalled();
      expect(nodeClassName).toHaveBeenCalled();

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalClassName.mock.calls[0][0].path).toEqual(path);
      expect(globalClassName.mock.calls[0][0].index).toEqual(index);

      expect(nodeClassName.mock.calls[0][0].path).toEqual(path);
      expect(nodeClassName.mock.calls[0][0].index).toEqual(index);
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
      expect(test).toEqual(`${globalClassName} ${nodeClassName}`);
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
      expect(test).toEqual(`${globalClassName} ${nodeClassName}`);
    });

    it('should call className function with correct args', () => {
      const globalClassName = jest.fn();
      const nodeClassName = jest.fn();
      const dataSource = [
        {
          label: 'hello world',
          contentClassName: nodeClassName
        }
      ];
      let wrapper = mount(
        <TreeView dataSource={dataSource} contentClassName={globalClassName} />
      );

      expect(globalClassName).toHaveBeenCalled();
      expect(nodeClassName).toHaveBeenCalled();

      const { index, path } = wrapper
        .find(Node)
        .first()
        .props();

      expect(globalClassName.mock.calls[0][0].path).toEqual(path);
      expect(globalClassName.mock.calls[0][0].index).toEqual(index);

      expect(nodeClassName.mock.calls[0][0].path).toEqual(path);
      expect(nodeClassName.mock.calls[0][0].index).toEqual(index);
    });
  });
});
