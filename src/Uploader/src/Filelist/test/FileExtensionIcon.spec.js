import React from 'react';
import {shallow} from 'enzyme';

import FileExtensionIcon, {CLASS_NAME} from '../src/FileExtensionIcon';

describe('FileExtensionIcon', () => {
  it('should create instance of FileExtensionIcon', () => {
    const component = shallow(<FileExtensionIcon/>);
    expect(component.instance()).to.be.instanceOf(FileExtensionIcon);
  });

  it('should render with given file object', () => {
    const component = shallow(<FileExtensionIcon file={{name:'myfile.png'}}/>);
    expect(component.text()).to.contain('png');
  });

  it('should render with given extension object', () => {
    const component = shallow(<FileExtensionIcon extension='torrent'/>);
    expect(component.text()).to.contain('torrent');
  });

  it('should render with given extension and file object', () => {
    const component = shallow(<FileExtensionIcon file={{name:'myfile.png'}} extension='torrent'/>);
    expect(component.text()).to.contain('torrent');
  });

  it('should support hidden dot for file extension', () => {
    const component = shallow(<FileExtensionIcon showStartingDot={false} extension='.torrent'/>);
    expect(component.text()).to.contain('torrent');
  });

  it('should support custom color mapping prop for file extensions', () => {
    const colorMapping = {
      'torrent': 'blue',
      '.pdf': 'red'
    };

    let component;

    component = shallow(<FileExtensionIcon colors={colorMapping} extension='.torrent'/>);
    expect(component.node.props.children.props.style).to.have.property('backgroundColor', 'blue');

    component = shallow(<FileExtensionIcon colors={colorMapping} extension='torrent'/>);
    expect(component.node.props.children.props.style).to.have.property('backgroundColor', 'blue');

    component = shallow(<FileExtensionIcon colors={colorMapping} extension='somethingelse'/>);
    expect(component.node.props.children.props.style||{}).to.not.have.property('backgroundColor');
  });

  it('should support custom rendering via renderExtensionBox prop', () => {
    const renderSpy = sinon.spy();
    const component = shallow(<FileExtensionIcon renderExtensionBox={renderSpy} extension='.torrent'/>);

    expect(renderSpy).to.have.been.calledOnce;
  });

});
