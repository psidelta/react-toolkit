import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const bodyClassName = `.${rootClassName}__body`;

describe('renderFooter', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  it('should be called with props', () => {
    const renderFooter = sinon.spy();
    wrapper.setProps({ data: 'footerData' });
    wrapper.setProps({ renderFooter });

    expect(renderFooter.called).to.be.true;
    expect(renderFooter.args[0][0].data).to.equal('footerData');
  });

  it('should render what it returns', () => {
    const renderFooter = () => <div id="customFooterId" />;
    wrapper.setProps({ renderFooter });

    expect(wrapper.find('#customFooterId')).to.have.length(1);
  });

  it('should be rendered after body', () => {
    const renderFooter = () => <div id="customFooterId" />;
    wrapper.setProps({ renderFooter });

    /**
     * 0 - title
     * 1 - body
     * 2 - footer
     */
    expect(wrapper.childAt(2).props().id).to.equal('customFooterId');
  });
});
