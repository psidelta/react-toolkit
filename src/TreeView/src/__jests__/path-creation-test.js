import React from 'react';
import { mount } from 'enzyme';
import Node from '../Node';
import TreeView from '../TreeView';

describe('path creation', () => {
  const dataSource = [
    {
      id: 'node_1',
      idFn: 'node_fn_1',
      pathId: 'node_path_1',
      pathIdFn: 'node_fn_path_1',
      nodes: [
        {
          id: 'node_2',
          idFn: 'node_fn_2',
          pathId: 'node_path_2',
          pathIdFn: 'node_fn_path_2'
        }
      ]
    }
  ];
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<TreeView dataSource={dataSource} />);
  });

  it('by default it uses index', () => {
    // first level
    expect(
      wrapper
        .find(Node)
        .first()
        .prop('path')
<<<<<<< HEAD:src/TreeView/src/__jests__/path-creation-test.js
    ).toEqual('0');
=======
    ).to.equal('0');
>>>>>>> dev:src/TreeView/src/__tests__/path-creation-test.js
    // second node
    expect(
      wrapper
        .find(Node)
        .at(1)
        .prop('path')
<<<<<<< HEAD:src/TreeView/src/__jests__/path-creation-test.js
    ).toEqual('0/0');
=======
    ).to.equal('0/0');
>>>>>>> dev:src/TreeView/src/__tests__/path-creation-test.js
  });

  describe('pathProperty', () => {
    describe('is a string', () => {
      it('constructs correct path', () => {
        wrapper.setProps({ pathProperty: 'pathId' });
        // first level
        expect(
          wrapper
            .find(Node)
            .first()
            .prop('path')
<<<<<<< HEAD:src/TreeView/src/__jests__/path-creation-test.js
        ).toEqual('node_path_1');
=======
        ).to.equal('node_path_1');
>>>>>>> dev:src/TreeView/src/__tests__/path-creation-test.js
        // second node
        expect(
          wrapper
            .find(Node)
            .at(1)
            .prop('path')
<<<<<<< HEAD:src/TreeView/src/__jests__/path-creation-test.js
        ).toEqual('node_path_1/node_path_2');
=======
        ).to.equal('node_path_1/node_path_2');
>>>>>>> dev:src/TreeView/src/__tests__/path-creation-test.js
      });
    });
    describe('as a function', () => {
      it('constructs the corrent path', () => {
        wrapper.setProps({ pathProperty: () => 'pathIdFn' });
        // first level
        expect(
          wrapper
            .find(Node)
            .first()
            .prop('path')
<<<<<<< HEAD:src/TreeView/src/__jests__/path-creation-test.js
        ).toEqual('node_fn_path_1');
=======
        ).to.equal('node_fn_path_1');
>>>>>>> dev:src/TreeView/src/__tests__/path-creation-test.js
        // second node
        expect(
          wrapper
            .find(Node)
            .at(1)
            .prop('path')
<<<<<<< HEAD:src/TreeView/src/__jests__/path-creation-test.js
        ).toEqual('node_fn_path_1/node_fn_path_2');
=======
        ).to.equal('node_fn_path_1/node_fn_path_2');
>>>>>>> dev:src/TreeView/src/__tests__/path-creation-test.js
      });
    });
  });

  describe('idProperty', () => {
    describe('it is a string', () => {
      it('idProperty overwrites pathProperty, and constructs correct path', () => {
        wrapper.setProps({ pathProperty: 'pathId' });
        wrapper.setProps({ idProperty: 'id' });
        // first level
        expect(
          wrapper
            .find(Node)
            .first()
            .prop('path')
<<<<<<< HEAD:src/TreeView/src/__jests__/path-creation-test.js
        ).toEqual('node_1');
=======
        ).to.equal('node_1');
>>>>>>> dev:src/TreeView/src/__tests__/path-creation-test.js
        // second node
        expect(
          wrapper
            .find(Node)
            .at(1)
            .prop('path')
<<<<<<< HEAD:src/TreeView/src/__jests__/path-creation-test.js
        ).toEqual('node_2');
=======
        ).to.equal('node_2');
>>>>>>> dev:src/TreeView/src/__tests__/path-creation-test.js
      });
    });
    describe('it is a function', () => {
      it('constructs correct path', () => {
        wrapper.setProps({ idProperty: () => 'idFn' });
        expect(
          wrapper
            .find(Node)
            .first()
            .prop('path')
<<<<<<< HEAD:src/TreeView/src/__jests__/path-creation-test.js
        ).toEqual('node_fn_1');
=======
        ).to.equal('node_fn_1');
>>>>>>> dev:src/TreeView/src/__tests__/path-creation-test.js
        // second node
        expect(
          wrapper
            .find(Node)
            .at(1)
            .prop('path')
<<<<<<< HEAD:src/TreeView/src/__jests__/path-creation-test.js
        ).toEqual('node_fn_2');
=======
        ).to.equal('node_fn_2');
>>>>>>> dev:src/TreeView/src/__tests__/path-creation-test.js
      });
    });
  });
});
