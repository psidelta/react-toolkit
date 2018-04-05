/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import FileExtensionIcon, { CLASS_NAME } from '../src/FileExtensionIcon';

describe('FileExtensionIcon', () => {
  it('should create instance of FileExtensionIcon', () => {
    const component = shallow(<FileExtensionIcon />);
    expect(component.instance()).toBeInstanceOf(FileExtensionIcon);
  });

  it('should render with given file object', () => {
    const component = shallow(
      <FileExtensionIcon file={{ name: 'myfile.png' }} />
    );
    expect(component.text()).toContain('PNG');
  });

  it('should render with given extension object', () => {
    const component = shallow(<FileExtensionIcon extension="torrent" />);
    expect(component.text()).toContain('TORRENT');
  });

  it('should render with given extension and file object', () => {
    const component = shallow(
      <FileExtensionIcon file={{ name: 'myfile.png' }} extension="torrent" />
    );
    expect(component.text()).toContain('TORRENT');
  });

  it('should support hidden dot for file extension', () => {
    const component = shallow(
      <FileExtensionIcon showStartingDot={false} extension=".torrent" />
    );
    expect(component.text()).toContain('TORRENT');
  });

  xit('should support custom color mapping prop for file extensions', () => {
    const colorMapping = {
      torrent: 'blue',
      '.pdf': 'red'
    };

    let component;

    component = mount(
      <FileExtensionIcon colors={colorMapping} extension=".torrent" />
    );
    expect(component.props().children.props.style).toHaveProperty(
      'backgroundColor',
      'blue'
    );

    component = mount(
      <FileExtensionIcon colors={colorMapping} extension="torrent" />
    );
    expect(component.props().children.props.style).toHaveProperty(
      'backgroundColor',
      'blue'
    );

    component = mount(
      <FileExtensionIcon colors={colorMapping} extension="somethingelse" />
    );
    expect(component.props.children.props.style || {}).not.toHaveProperty(
      'backgroundColor'
    );
  });

  it('should support custom rendering via renderExtensionBox prop', () => {
    const renderSpy = jest.fn();
    const component = shallow(
      <FileExtensionIcon renderExtensionBox={renderSpy} extension=".torrent" />
    );

    expect(renderSpy).toHaveBeenCalledTimes(1);
  });
});
