import React from 'react';
import { shallow, mount } from 'enzyme';
import Overlay from '../Overlay';

describe('children', () => {
  // inject the HTML fixture for the tests
  beforeEach(() => {
    const fixture = `
      <div id="fixture">
        <div id="target1" class="childrenTooltip" data-tooltip="<div id='customId'></div>">
          target 1
        </div>
        <div id="target2" class="childrenTooltip"> target 2 </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  // remove the html fixture from the DOM
  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('should render jsx', () => {
    const wrapper = shallow(<Overlay children={<div id="child" />} />);
    expect(wrapper.find('#child')).to.have.length(1);
  });

  describe('function', () => {
    it('accepts a function as children and it is called with activeTargetNode', () => {
      const children = sinon.spy();
      const wrapper = shallow(<Overlay children={children} />);
      expect(children.called).to.be.true;
    });
    it('called with correct param', () => {
      const children = sinon.spy();
      const mouseenterEvent = new CustomEvent('mouseenter', { bubbles: true });
      const target1 = document.getElementById('target1');
      const wrapper = mount(
        <Overlay children={children} target=".childrenTooltip" />
      );
      target1.dispatchEvent(mouseenterEvent);

      expect(children.args[1][0].targetNode).to.equal(target1);
    });
  });

  describe('defaults to data-tooltip', () => {
    it('renders what data-tooltip from active target', () => {
      const target1 = document.getElementById('target1');
      const mouseenterEvent = new CustomEvent('mouseenter', { bubbles: true });
      const wrapper = mount(<Overlay target=".childrenTooltip" />);
      target1.dispatchEvent(mouseenterEvent);
      const test = wrapper.instance().getChildrenProps();

      expect(test.dangerouslySetInnerHTML.__html).to.contain('customId');
    });
  });
});
