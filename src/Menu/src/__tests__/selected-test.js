import React from 'react';
import { mount } from 'enzyme';
import Menu from '../Menu';

describe('selected', () => {
  describe('renderCheckInput', () => {
    const items = [
      { name: 'name1', label: 'test1' },
      { name: 'name2', label: 'test3' },
      { name: 'name2', value: 'name3', label: 'test2' }
    ];

    it('renders a custom input', () => {
      const renderCheckInput = sinon
        .stub()
        .returns(<div className="customCheckInput" />);
      const wrapper = mount(
        <Menu
          items={items}
          renderCheckInput={renderCheckInput}
          enableSelection
        />
      );
      expect(renderCheckInput.called).to.be.true;
      expect(wrapper.find('.customCheckInput')).to.have.length(1);
    });
    it('renders an input with mutated props', () => {
      const wrapper = mount(
        <Menu
          items={items}
          enableSelection
          renderCheckInput={({ domProps }) => {
            domProps.id = 'customCheckInput';
          }}
        />
      );
      expect(wrapper.find('#customCheckInput')).to.have.length(1);
    });
  });
  describe('renderRadioInput', () => {
    const items = [
      { name: 'name1', label: 'test1' },
      { name: 'name2', label: 'test3' },
      { name: 'name2', value: 'name3', label: 'test2' }
    ];

    it('renders a custom input', () => {
      const renderRadioInput = sinon
        .stub()
        .returns(<div className="customRadioInput" />);
      const wrapper = mount(
        <Menu
          items={items}
          renderRadioInput={renderRadioInput}
          enableSelection
        />
      );
      expect(renderRadioInput.called).to.be.true;
      expect(wrapper.find('.customRadioInput')).to.have.length(2);
    });
    it('renders with mutated props', () => {
      const wrapper = mount(
        <Menu
          items={items}
          renderRadioInput={({ domProps }) => {
            domProps.className = 'customRadioInput';
          }}
          enableSelection
        />
      );
      expect(wrapper.find('.customRadioInput')).to.have.length(2);
    });
  });
});
